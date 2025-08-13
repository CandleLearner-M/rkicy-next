"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import styles from "./DesktopHero.module.scss";
import PartnerLogos from "./PartnerLogos";

export default function DesktopHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 25px rgba(66, 153, 225, 0.35)",
      transition: { duration: 0.2, ease: "easeOut" } 
    },
  };
  

  return (
    <section className={styles.heroSection} ref={ref}>
      
      <div className={styles.backgroundElements}>
        <div className={styles.gridOverlay}></div>
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <motion.div 
            className={styles.preHeadingWrapper}
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <span className={styles.preHeadingPill}>
              {t('badge')}
            </span>
          </motion.div>
          
          <motion.h1 
            className={styles.mainHeading}
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
          
          <motion.p 
            className={styles.description}
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            {t('subtitle')}
          </motion.p>
          
          <motion.div 
            className={styles.buttonGroup}
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <Link href={`/${locale}/services`} className={styles.primaryButton}>
              <motion.span
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                className={styles.buttonInner}
              >
                {tCommon('actions.exploreServices')}
                <ChevronRight className={styles.buttonIcon} />
              </motion.span>
            </Link>

            <Link href={`/${locale}/contact`} className={styles.secondaryButton}>
              <motion.span
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                className={styles.buttonInner}
              >
                {tCommon('actions.contactUs')}
              </motion.span>
            </Link>
          </motion.div>

          <motion.div 
            className={styles.statsRow}
            custom={4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className={styles.statItem}>
              <span className={styles.statValue}>98%</span>
              <span className={styles.statLabel}>{t('satisfactionRate')}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>10+</span>
              <span className={styles.statLabel}>{t('yearsOfExperience')}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statValue}>200+</span>
              <span className={styles.statLabel}>{t('clientsServed')}</span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <PartnerLogos />
    </section>
  );
}