"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  Building2, 
  ShoppingBag, 
  Hospital, 
  GraduationCap, 
  Briefcase, 
  Truck, 
  Factory,
  Banknote
} from 'lucide-react';
import styles from './IndustriesSection.module.scss';

export default function IndustriesSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations('projects.industries');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const industries = [
    {
      id: 'retail',
      icon: <ShoppingBag size={24} />,
      titleKey: 'items.retail.title',
      descriptionKey: 'items.retail.description',
    },
    {
      id: 'healthcare',
      icon: <Hospital size={24} />,
      titleKey: 'items.healthcare.title',
      descriptionKey: 'items.healthcare.description',
    },
    {
      id: 'finance',
      icon: <Banknote size={24} />,
      titleKey: 'items.finance.title',
      descriptionKey: 'items.finance.description',
    },
    {
      id: 'education',
      icon: <GraduationCap size={24} />,
      titleKey: 'items.education.title',
      descriptionKey: 'items.education.description',
    },
    {
      id: 'corporate',
      icon: <Building2 size={24} />,
      titleKey: 'items.corporate.title',
      descriptionKey: 'items.corporate.description',
    },
    {
      id: 'logistics',
      icon: <Truck size={24} />,
      titleKey: 'items.logistics.title',
      descriptionKey: 'items.logistics.description',
    },
    {
      id: 'government',
      icon: <Briefcase size={24} />,
      titleKey: 'items.government.title',
      descriptionKey: 'items.government.description',
    },
    {
      id: 'manufacturing',
      icon: <Factory size={24} />,
      titleKey: 'items.manufacturing.title',
      descriptionKey: 'items.manufacturing.description',
    }
  ];

  return (
    <section className={styles.industriesSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <span className={styles.sectionBadge}>{t('badge')}</span>
          <h2 className={styles.sectionTitle}>
            {t('title.start')} <span className={styles.highlight}>{t('title.highlight')}</span> {t('title.end')}
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>
        
        <div className={styles.industriesGrid}>
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              className={styles.industryCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              viewport={{ once: true }}
            >
              <div className={styles.iconContainer}>
                {industry.icon}
              </div>
              <h3 className={styles.industryTitle}>{t(industry.titleKey)}</h3>
              <p className={styles.industryDescription}>{t(industry.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.decorativeElements}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorPattern}></div>
        </motion.div>
      </div>
    </section>
  );
}