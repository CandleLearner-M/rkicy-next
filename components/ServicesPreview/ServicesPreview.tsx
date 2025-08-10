'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, Brain, Code, Database, Server } from 'lucide-react';
import styles from './ServicesPreview.module.scss';

export default function ServicesPreview() {
  const locale = useLocale();
  const t = useTranslations('duplicate');
  const containerRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const serviceCardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.2 + (i * 0.1),
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

  const services = [
    {
      id: '01',
      title: t('services.ai.title'),
      description: t('services.ai.description'),
      icon: <Brain className={styles.serviceIcon} />,
    },
    {
      id: '02',
      title: t('services.web.title'),
      description: t('services.web.description'),
      icon: <Code className={styles.serviceIcon} />,
    },
    {
      id: '03',
      title: t('services.sap.title'),
      description: t('services.sap.description'),
      icon: <Database className={styles.serviceIcon} />,
    },
    {
      id: '04',
      title: t('services.hardware.title'),
      description: t('services.hardware.description'),
      icon: <Server className={styles.serviceIcon} />,
    }
  ];

  return (
    <section className={styles.servicesSection} ref={containerRef}>
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
                {t('services.label')}
              </motion.span>
            </div>
            <h2 className={styles.heading}>
              {t('services.title')}{' '}
              <span className={styles.highlightTxt}>{t('services.highlighted')}</span>{' '}
              {t('services.title2')}
            </h2>
            <p className={styles.subheading}>{t('services.subtitle')}</p>
          </motion.div>

          <div className={styles.servicesContainer}>
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                className={styles.serviceCard}
                custom={index}
                variants={serviceCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.serviceHeader}>
                  {service.icon}
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <div className={styles.serviceGlow} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className={styles.ctaContainer}
            variants={itemVariants}
          >
            <Link href={`/${locale}/services`} className={styles.servicesCta}>
              <span>{t('services.exploreAll')}</span>
              <ArrowUpRight className={styles.ctaIcon} size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}