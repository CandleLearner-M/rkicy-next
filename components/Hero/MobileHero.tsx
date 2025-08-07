"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import styles from "./MobileHero.module.scss";
import PartnerLogos from "./PartnerLogos";

export default function MobileHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const t = useTranslations('home.hero');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const shapeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2 + 0.3,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className={styles.mobileHero} ref={ref}>
      {/* Background Elements */}
      <div className={styles.backgroundElements}>
        <motion.div 
          className={styles.backgroundShape1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0}
          variants={shapeVariants}
        />
        <motion.div 
          className={styles.backgroundShape2}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={1}
          variants={shapeVariants}
        />
        <motion.div 
          className={styles.backgroundShape3}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={2}
          variants={shapeVariants}
        />
        <div className={styles.gridOverlay}></div>
      </div>
      
      <div className={styles.heroContainer}>
        {/* Badge */}
        <motion.div 
          className={styles.heroBadge}
          custom={0}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          {t('badge')}
        </motion.div>
        
        {/* Main Title */}
        <motion.h1 
          className={styles.title}
          custom={1}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          {t.rich('title', {
            break: () => <br />,
            highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
          })}
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          className={styles.description}
          custom={2}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={textVariants}
        >
          {t('subtitle')}
        </motion.p>
      </div>
      
      {/* Stats Section */}
      <motion.div 
        className={styles.statsContainer}
        custom={3}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textVariants}
      >
        <div className={styles.statBox}>
          <span className={styles.statValue}>98%</span>
          <span className={styles.statLabel}>{t('satisfactionRate')}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>10+</span>
          <span className={styles.statLabel}>{t('yearsOfExperience')}</span>
        </div>
        <div className={styles.statBox}>
          <span className={styles.statValue}>200+</span>
          <span className={styles.statLabel}>{t('clientsServed')}</span>
        </div>
      </motion.div>
      
      {/* Trust Badge */}
      {/* <motion.div 
        className={styles.trustBadge}
        custom={4}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textVariants}
      >
        <Star className={styles.starIcon} size={16} fill="currentColor" />
        <span>{t('trust')}</span>
      </motion.div> */}
      {/* <div></div> */}
      
      {/* CTA Buttons - Now at bottom */}
      <motion.div 
        className={styles.ctaContainer}
        custom={5}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={textVariants}
      >
        <Link href={`/${locale}/services`} className={styles.primaryCta}>
          <span>{tCommon('actions.exploreServices')}</span>
          <ChevronRight className={styles.ctaIcon} />
        </Link>
        
        <Link href={`/${locale}/contact`} className={styles.secondaryCta}>
          <span>{tCommon('actions.contactUs')}</span>
        </Link>
      </motion.div>
    </section>
  );
}