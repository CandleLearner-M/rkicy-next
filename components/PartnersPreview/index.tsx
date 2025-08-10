'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Award } from 'lucide-react';
import styles from './PartnersSection.module.scss';

export default function PartnersSection() {
  const t = useTranslations('duplicate');
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

  const logoVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.3 + (i * 0.1),
      }
    }),
    hover: {
      y: -5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    }
  };

  const partners = [
    {
      id: '01',
      name: 'Zebra Technologies',
      description: t('partners.zebra.description'),
      logo: '/icons/zebra.svg',
      badge: t('partners.zebra.badge'),
      icon: <Shield className={styles.partnerIcon} />,
    },
    {
      id: '02',
      name: 'OpenAI',
      description: t('partners.openai.description'),
      logo: '/icons/openai.svg',
      badge: t('partners.openai.badge'),
      icon: <Award className={styles.partnerIcon} />,
    },
    {
      id: '03',
      name: 'SAP',
      description: t('partners.sap.description'),
      logo: '/icons/sap.svg',
      badge: t('partners.sap.badge'),
      icon: <Award className={styles.partnerIcon} />,
    }
  ];

  return (
    <section className={styles.partnersSection} ref={containerRef}>
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
                {t('partners.label')}
              </motion.span>
            </div>
            <h2 className={styles.heading}>
              {t('partners.title')}{' '}
              <span className={styles.highlightTxt}>{t('partners.highlighted')}</span>{' '}
              {t('partners.title2')}
            </h2>
            <p className={styles.subheading}>{t('partners.subtitle')}</p>
          </motion.div>
        
          <motion.div variants={itemVariants} className={styles.description}>
            <p>{t('partners.description')}</p>
            <motion.div
              className={styles.highlight}
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.5 }}
            />
          </motion.div>

          <div className={styles.featuredPartner}>
            <motion.div 
              className={styles.featuredCard}
              variants={itemVariants}
            >
              <div className={styles.featuredContent}>
                <div className={styles.badgeWrapper}>
                  <span className={styles.badge}>
                    <Shield size={14} />
                    {t('partners.featuredBadge')}
                  </span>
                </div>
                <h3 className={styles.featuredTitle}>{t('partners.zebra.title')}</h3>
                <p className={styles.featuredDescription}>{t('partners.zebra.longDescription')}</p>
              </div>
              <motion.div 
                className={styles.featuredLogo}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className={styles.logoWrapper}>
                  <Image 
                    src="/icons/zebra.svg" 
                    alt="Zebra Technologies Logo" 
                    width={180} 
                    height={60} 
                    className={styles.logo}
                  />
                </div>
              </motion.div>
              <div className={styles.featuredGlow} />
            </motion.div>
          </div>

          <motion.h3 
            className={styles.partnersSectionTitle}
            variants={itemVariants}
          >
            {t('partners.trustedPartners')}
          </motion.h3>

          <div className={styles.partnersLogosContainer}>
            {partners.map((partner, index) => (
              <motion.div 
                key={partner.id}
                className={styles.partnerLogoCard}
                custom={index}
                variants={logoVariants}
                whileHover="hover"
              >
                <div className={styles.logoContainer}>
                  <Image 
                    src={partner.logo} 
                    alt={`${partner.name} Logo`} 
                    width={140} 
                    height={50}
                    className={styles.partnerLogo} 
                  />
                </div>
                <div className={styles.logoGlow} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}