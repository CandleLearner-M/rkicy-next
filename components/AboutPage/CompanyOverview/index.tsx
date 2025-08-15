import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './CompanyOverview.module.scss';

export default function CompanyOverview() {
  const t = useTranslations('about.overview');
  
  return (
    <section className={styles.overviewSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <div className={styles.overline}>{t('badge')}</div>
            
            <h2 className={styles.sectionTitle}>
              {t('title.start')} <span className={styles.highlightTxt}>{t('title.highlight')}</span> {t('title.end')}
            </h2>
            
            <p className={styles.description}>
              {t('description1')}
            </p>
            <p className={styles.description}>
              {t('description2')}
            </p>
            
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{t('stats.clients')}</span>
                <span className={styles.statLabel}>{t('stats.clientsLabel')}</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{t('stats.projects')}</span>
                <span className={styles.statLabel}>{t('stats.projectsLabel')}</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>{t('stats.experts')}</span>
                <span className={styles.statLabel}>{t('stats.expertsLabel')}</span>
              </div>
            </div>
          </div>
          
          <div className={styles.visualElement}>
            <div className={styles.colorBlock}></div>
            <div className={styles.patternBlock}></div>
            <div className={styles.gradientCircle}></div>
            <div className={styles.outlineBox}>
              <div className={styles.innerContent}>
                <div className={styles.valueProposition}>
                  <span className={styles.valueNumber}>90%</span>
                  <span className={styles.valueText}>{t('clientRetention')}</span>
                </div>
                <div className={styles.accentBar}></div>
                <div className={styles.valueProposition}>
                  <span className={styles.valueNumber}>10+</span>
                  <span className={styles.valueText}>{t('techPartners')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}