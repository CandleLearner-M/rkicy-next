'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './ProjectsHero.module.scss';

export default function ProjectsHero() {
  const t = useTranslations('projects.hero');
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, 100]);
  
  return (
    <div className={styles.heroWrapper} ref={heroRef}>
      <motion.div 
        className={styles.heroContent}
        style={{ opacity, scale, y }}
      >
        <div className={styles.container}>
          <motion.div 
            className={styles.preHeadingWrapper}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className={styles.preHeadingPill}>
              {t('badge')}
            </span>
          </motion.div>
          
          <motion.h1 
            className={styles.heading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('title')}
            {/* {t.rich('title', {
              highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
            })} */}
          </motion.h1>
          
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>
        
        <motion.div 
          className={styles.backgroundDecoration}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
}