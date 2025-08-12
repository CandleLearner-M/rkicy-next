import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import styles from '../Legal.module.scss';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'legal.terms' });
  
  return {
    title: t('title'),
  };
}

export default function TermsPage() {
  const t = useTranslations('legal.terms');
  
  return (
    <div className={styles.legalPage}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.badge}>{t('title')}</div>
          <h1 className={styles.pageTitle}>
            Terms <span className={styles.highlight}>of Service</span>
          </h1>
          <p className={styles.lastUpdated}>{t('lastUpdated')}</p>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.container}>
          <p className={styles.introduction}>{t('introduction')}</p>
          
          <div className={styles.sectionsGrid}>
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>01</span>
                <h2 className={styles.sectionTitle}>{t('sections.acceptance.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.acceptance.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>{t('sections.services.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.services.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>03</span>
                <h2 className={styles.sectionTitle}>{t('sections.intellectualProperty.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.intellectualProperty.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>04</span>
                <h2 className={styles.sectionTitle}>{t('sections.limitation.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.limitation.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>05</span>
                <h2 className={styles.sectionTitle}>{t('sections.governing.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.governing.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}