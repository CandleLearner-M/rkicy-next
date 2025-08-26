"use client";

import { useTranslations } from 'next-intl';
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  Zap,
  CheckCircle
} from 'lucide-react';
import styles from './BusinessBenefits.module.scss';

export default function BusinessBenefits() {
  const t = useTranslations('services.benefits');
  
  const benefits = [
    {
      icon: <TrendingUp size={24} />,
      colorClass: styles.growthColor,
      id: 'growth'
    },
    {
      icon: <Shield size={24} />,
      colorClass: styles.securityColor,
      id: 'security'
    },
    {
      icon: <Clock size={24} />,
      colorClass: styles.efficiencyColor,
      id: 'efficiency'
    },
    {
      icon: <Zap size={24} />,
      colorClass: styles.innovationColor,
      id: 'innovation'
    }
  ];
  
  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>{t('badge')}</span>
          <h2 className={styles.sectionTitle}>{t('title')}</h2>
          <div className={styles.accentLine}></div>
          <p className={styles.sectionSubtitle}>{t('subtitle')}</p>
        </div>
        
        <div className={styles.benefitsGrid}>
          {benefits.map((benefit) => (
            <div key={benefit.id} className={styles.benefitCard}>
              <div className={`${styles.iconContainer} ${benefit.colorClass}`}>
                {benefit.icon}
              </div>
              
              <h3 className={styles.benefitTitle}>{t(`items.${benefit.id}.title`)}</h3>
              <p className={styles.benefitDescription}>{t(`items.${benefit.id}.description`)}</p>
              
              <ul className={styles.benefitList}>
                {[1, 2, 3].map((num) => (
                  <li key={num} className={styles.benefitItem}>
                    <CheckCircle size={16} className={styles.checkIcon} />
                    <span>{t(`items.${benefit.id}.points.${num}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}