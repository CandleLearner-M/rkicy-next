"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  ChevronRight 
} from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';
import styles from "./ContactPreview.module.scss";

export default function ContactPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: "-100px",
  });
  
  const t = useTranslations('contact');
  const locale = useLocale();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className={styles.contactPreview} ref={ref}>
      <div className={styles.container}>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorPattern}></div>
        
        <motion.div 
          className={styles.contentWrapper}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div className={styles.textContent}>
            <motion.h2 
              className={styles.title}
              custom={0}
              variants={fadeInUp}
            >
              {t('preview.title')}{' '}
              <span className={styles.highlight}>{t('preview.highlighted')}</span>{' '}
              {t('preview.title2')}
            </motion.h2>
            
            <motion.p 
              className={styles.subtitle}
              custom={1}
              variants={fadeInUp}
            >
              {t('preview.subtitle')}
            </motion.p>
            
            <motion.div 
              className={styles.ctaButton}
              custom={2}
              variants={fadeInUp}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/${locale}/contact`} className={styles.primaryButton}>
                <span>{t('preview.getInTouch')}</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
          
          <div className={styles.contactOptions}>
            <motion.div 
              className={styles.optionsGrid}
              variants={staggerCards}
            >
              <motion.div variants={cardVariants}>
                <Link href={`tel:${t('preview.phoneNumber')}`} className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <PhoneCall size={22} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{t('preview.cards.call.title')}</h3>
                    <p>{t('preview.cards.call.text')}</p>
                  </div>
                  <ChevronRight size={18} className={styles.cardArrow} />
                </Link>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Link href={`mailto:${t('preview.emailAddress')}`} className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <Mail size={22} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{t('preview.cards.email.title')}</h3>
                    <p>{t('preview.cards.email.text')}</p>
                  </div>
                  <ChevronRight size={18} className={styles.cardArrow} />
                </Link>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Link href={`/${locale}/contact#chat`} className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <MessageSquare size={22} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{t('preview.cards.chat.title')}</h3>
                    <p>{t('preview.cards.chat.text')}</p>
                  </div>
                  <ChevronRight size={18} className={styles.cardArrow} />
                </Link>
              </motion.div>
              
              <motion.div variants={cardVariants}>
                <Link href={`/${locale}/contact#schedule`} className={styles.contactCard}>
                  <div className={styles.cardIcon}>
                    <Calendar size={22} />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{t('preview.cards.schedule.title')}</h3>
                    <p>{t('preview.cards.schedule.text')}</p>
                  </div>
                  <ChevronRight size={18} className={styles.cardArrow} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}