"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import styles from "./MobileHero.module.scss";
import PartnerLogos from "./PartnerLogos";

export default function MobileHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <section className={styles.mobileHero} ref={ref}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <div className={styles.topGradient}></div>
        <div className={styles.bottomGradient}></div>
        <div className={styles.gridOverlay}></div>
      </div>
      
      {/* Main Content */}
      <div className={styles.contentWrapper}>
        {/* Hero Badge */}
        <motion.div 
          className={styles.heroBadge}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
        >
          {t('badge')}
        </motion.div>
        
        {/* Main Title */}
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t.rich('title', {
            break: () => <br />,
            highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
          })}
        </motion.h1>
        
        {/* Feature Cards Row */}
        <motion.div 
          className={styles.featureCards}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" />
                <path d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M6.34 17.66L4.93 19.07M19.07 4.93L17.66 6.34" />
              </svg>
            </div>
            <span className={styles.featureText}>{t('stats.powered')}</span>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <span className={styles.featureText}>{t('stats.enterprise')}</span>
          </div>
          
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className={styles.featureText}>{t.rich('stats.clients', {
              strong: (chunks) => <strong>{chunks}</strong>
            })}</span>
          </div>
        </motion.div>
        
        {/* Interactive Image Area */}
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Image
            src="/hero-image.webp"
            alt={t('imageAlt')}
            width={450}
            height={300}
            className={styles.mainImage}
            priority
          />
        </motion.div>
        
        {/* Short Description */}
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {t('subtitle')}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href={`/${locale}/services`} className={styles.primaryCta}>
            <span>{tCommon('actions.exploreServices')}</span>
            <ChevronRight size={16} />
          </Link>
          
          <Link href={`/${locale}/contact`} className={styles.secondaryCta}>
            {tCommon('actions.contactUs')}
          </Link>
        </motion.div>
        
        {/* Trust Badge */}
        <motion.div 
          className={styles.trustBadge}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0L10.2 5.37L16 5.88L11.73 9.8L12.97 15.52L8 12.5L3.03 15.52L4.27 9.8L0 5.88L5.8 5.37L8 0Z" />
          </svg>
          <span>{t('trust')}</span>
        </motion.div>
      </div>
      <PartnerLogos />
    </section>
  );
}