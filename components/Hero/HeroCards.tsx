"use client";

import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';
import styles from "./Hero.module.scss";

interface HeroCardsProps {
  isInView: boolean;
}

export default function HeroCards({ isInView }: HeroCardsProps) {
  const t = useTranslations('home.hero');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.2),
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };
  
  return (
    <>
      <motion.div 
        className={`${styles.floatingCard} ${styles.statCard}`}
        custom={0}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
      >
        <div className={styles.statIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.statContent}>
          <div className={styles.statNumber}>200+</div>
          <div className={styles.statLabel}>{t('stats.clients')}</div>
        </div>
      </motion.div>
      
      <motion.div 
        className={`${styles.floatingCard} ${styles.expertiseCard}`}
        custom={1}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
      >
        <div className={styles.expertiseIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.expertiseLabel}>{t('stats.enterprise')}</div>
      </motion.div>
      
      <motion.div 
        className={`${styles.floatingCard} ${styles.techCard}`}
        custom={2}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
      >
        <div className={styles.techIcon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.7273 14.7273C18.6063 15.0909 18.6273 15.4909 18.8018 15.8364C18.9764 16.1818 19.2836 16.4455 19.6545 16.5818L19.6891 16.5936C20.0055 16.7118 20.2743 16.9208 20.458 17.1915C20.6417 17.4623 20.7329 17.7828 20.7195 18.1082C20.7061 18.4335 20.5886 18.7454 20.3829 19.0023C20.1771 19.2592 19.8921 19.4488 19.5673 19.5455C19.2425 19.6421 18.8964 19.6409 18.5723 19.5419C18.2482 19.4429 17.9645 19.2513 17.7607 18.9927C17.5569 18.7342 17.4417 18.4213 17.4308 18.0959C17.4198 17.7704 17.5137 17.4503 17.7 17.18L17.7118 17.1455C17.8482 16.7745 17.8373 16.3582 17.6836 15.9945C17.53 15.6309 17.2427 15.3536 16.8791 15.2L16.38 15C16.0164 14.8464 15.6 14.8355 15.2291 14.9718C14.8582 15.1082 14.5536 15.3955 14.4 15.7591L14.3882 15.7936C14.27 16.11 14.061 16.3788 13.7903 16.5625C13.5195 16.7462 13.199 16.8374 12.8736 16.8239C12.5483 16.8105 12.2364 16.693 11.9796 16.4873C11.7227 16.2815 11.533 15.9966 11.4364 15.6718C11.3397 15.347 11.341 15.0009 11.44 14.6768C11.539 14.3527 11.7306 14.069 11.9891 13.8652C12.2477 13.6613 12.5606 13.5462 12.8861 13.5353C13.2115 13.5243 13.5316 13.6182 13.8018 13.8045L13.8364 13.8164C14.2073 13.9527 14.6236 13.9418 14.9873 13.7882C15.3509 13.6345 15.6282 13.3473 15.7818 12.9836L15.8836 12.5036C16.0373 12.14 16.0482 11.7236 15.9118 11.3527C15.7755 10.9818 15.4882 10.6773 15.1245 10.5236L15.09 10.5118C14.7736 10.3937 14.5048 10.1846 14.3211 9.91386C14.1374 9.64309 14.0462 9.32261 14.0597 8.99723C14.0731 8.67185 14.1905 8.36 14.3963 8.10306C14.6021 7.84612 14.887 7.65648 15.2118 7.55982C15.5367 7.46315 15.8827 7.46438 16.2068 7.56338C16.531 7.66238 16.8147 7.85399 17.0185 8.11257C17.2223 8.37114 17.3375 8.68396 17.3485 9.00945C17.3595 9.33494 17.2655 9.65502 17.0791 9.92727L17.0673 9.96182C16.9309 10.3327 16.9418 10.7491 17.0955 11.1127C17.2491 11.4764 17.5364 11.7536 17.9 11.9073H18C18.3636 12.0609 18.78 12.0718 19.1509 11.9355C19.5218 11.7991 19.8264 11.5118 19.98 11.1482L19.9918 11.1136C20.11 10.7973 20.319 10.5284 20.5898 10.3447C20.8605 10.161 21.181 10.0699 21.5064 10.0833C21.8318 10.0967 22.1436 10.2142 22.4005 10.42C22.6575 10.6257 22.8471 10.9107 22.9438 11.2355C23.0404 11.5603 23.0392 11.9064 22.9402 12.2305C22.8412 12.5546 22.6496 12.8383 22.391 13.0421C22.1325 13.246 21.8196 13.3611 21.4941 13.3721C21.1686 13.3831 20.8485 13.2891 20.5764 13.1027L20.5418 13.0909C20.1709 12.9545 19.7545 12.9655 19.3909 13.1191C19.0273 13.2727 18.75 13.56 18.5964 13.9236L18.5945 13.9273L18.7273 14.7273Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 12C9 12.7956 8.68393 13.5587 8.12132 14.1213C7.55871 14.6839 6.79565 15 6 15C5.20435 15 4.44129 14.6839 3.87868 14.1213C3.31607 13.5587 3 12.7956 3 12C3 11.2044 3.31607 10.4413 3.87868 9.87868C4.44129 9.31607 5.20435 9 6 9C6.79565 9 7.55871 9.31607 8.12132 9.87868C8.68393 10.4413 9 11.2044 9 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.5 15.5L3 20L6 19L9 20L7.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.techLabel}>{t('stats.powered')}</div>
      </motion.div>
    </>
  );
}