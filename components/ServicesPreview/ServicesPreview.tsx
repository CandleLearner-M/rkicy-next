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

  // Only keeping hover animation variant
  const serviceCardVariants = {
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
        <div className={styles.contentWrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.labelWrapper}>
              <span className={styles.overline}>
                {t('services.label')}
              </span>
            </div>
            <h2 className={styles.heading}>
              {t('services.title')}{' '}
              <span className={styles.highlightTxt}>{t('services.highlighted')}</span>{' '}
              {t('services.title2')}
            </h2>
            <p className={styles.subheading}>{t('services.subtitle')}</p>
          </div>

          <div className={styles.servicesContainer}>
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                className={styles.serviceCard}
                variants={serviceCardVariants}
                whileHover="hover"
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

          <div className={styles.ctaContainer}>
            <Link href={`/${locale}/services`} className={styles.servicesCta}>
              <span>{t('services.exploreAll')}</span>
              <ArrowUpRight className={styles.ctaIcon} size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}