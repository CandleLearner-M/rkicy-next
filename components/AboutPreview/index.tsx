'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Zap, Users } from 'lucide-react';
import styles from './AboutPreview.module.scss';

export default function AboutPreview() {
  const locale = useLocale();
  const t = useTranslations('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.3 + (i * 0.1),
      }
    }),
    hover: {
      y: -8,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    }
  };

  const pillars = [
    {
      id: '01',
      title: 'Expertise',
      description: t('aboutHero.expertise'),
      icon: <Brain className={styles.pillarIcon} />,
    },
    {
      id: '02',
      title: 'Innovation',
      description: t('aboutHero.innovation'),
      icon: <Zap className={styles.pillarIcon} />,
    },
    {
      id: '03',
      title: 'Partnership',
      description: t('aboutHero.partnership'),
      icon: <Users className={styles.pillarIcon} />,
    }
  ];

  return (
    <section className={styles.aboutUsSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div
          className={styles.contentWrapper}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className={styles.headingWrapper} variants={itemVariants}>
            <div className={styles.labelWrapper}>
              <motion.span 
                className={styles.overline}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              >
                {t('aboutHero.label')}
              </motion.span>
            </div>
            <h2 className={styles.heading}>{t('aboutHero.title')}
            <span className={styles.highlightTxt}>{t('aboutHero.highlighted')}</span>{' '}
            {t('aboutHero.title2')}
            </h2>
            <p className={styles.subheading}>{t('aboutHero.subtitle')}</p>
          </motion.div>

        
          <motion.div variants={itemVariants} className={styles.description}>
            <p>{t('aboutHero.description')}</p>
            <motion.div
              className={styles.highlight}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>

          <div className={styles.pillarsContainer}>
            {pillars.map((pillar, index) => (
              <motion.div 
                key={pillar.id}
                className={styles.pillarCard}
                custom={index}
                variants={cardVariants}
                whileHover="hover"
              >
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarId}>{pillar.id}</span>
                  {pillar.icon}
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
                <div className={styles.pillarGlow} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className={styles.ctaContainer}
            variants={itemVariants}
          >
            <Link href={`/${locale}/about`} className={styles.aboutCta}>
              <span>{t('aboutHero.learnMore')}</span>
              <ArrowUpRight className={styles.ctaIcon} size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}