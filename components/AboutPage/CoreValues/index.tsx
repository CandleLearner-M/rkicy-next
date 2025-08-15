import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './CoreValues.module.scss';
import { Brain, Zap, Users } from 'lucide-react';

export default function CoreValues() {
  const t = useTranslations('about.values');
  
  const values = [
    {
      id: '01',
      icon: <Brain size={24} />,
      title: t('items.expertise.title'),
      description: t('items.expertise.description')
    },
    {
      id: '02',
      icon: <Zap size={24} />,
      title: t('items.innovation.title'),
      description: t('items.innovation.description')
    },
    {
      id: '03',
      icon: <Users size={24} />,
      title: t('items.partnership.title'),
      description: t('items.partnership.description')
    }
  ];
  
  return (
    <section className={styles.valuesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.overline}>{t('badge')}</div>
          <h2 className={styles.sectionTitle}>
            {t('title.start')} <span className={styles.highlightTxt}>{t('title.highlight')}</span>
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
          <div className={styles.accentLine}></div>
        </div>
        
        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <div className={styles.valueCard} key={value.id}>
              <div className={styles.cardHeader}>
                <span className={styles.valueId}>{value.id}</span>
                <div className={styles.iconContainer}>
                  {value.icon}
                </div>
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </div>
          ))}
        </div>
        
        <div className={styles.decorElements}>
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorPattern}></div>
        </div>
      </div>
    </section>
  );
}