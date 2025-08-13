'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';
import styles from './ProjectTestimonial.module.scss';

export default function ProjectTestimonial() {
  const t = useTranslations('projects.paycov.testimonial');
  const testimonialRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(testimonialRef, { once: true, margin: "-100px" });
  
  return (
    <motion.div 
      className={styles.testimonialSection}
      ref={testimonialRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className={styles.testimonialWrapper}>
        <div className={styles.quoteIconTop}>
          <Quote size={32} />
        </div>
        
        <div className={styles.testimonialContent}>
          <p className={styles.testimonialQuote}>
            {t('quote')}
          </p>
          
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorImageWrapper}>
              <Image 
                src="/images/projects/paycov/testimonial.jpg"
                alt={t('author.name')}
                width={60}
                height={60}
                className={styles.authorImage}
              />
            </div>
            
            <div className={styles.authorInfo}>
              <h4 className={styles.authorName}>{t('author.name')}</h4>
              <p className={styles.authorRole}>{t('author.role')}</p>
            </div>
          </div>
        </div>
        
        <div className={styles.quoteIconBottom}>
          <Quote size={32} />
        </div>
      </div>
    </motion.div>
  );
}