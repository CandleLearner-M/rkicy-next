import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import styles from '../Legal.module.scss';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  
  return {
    title: t('title'),
  };
}

export default function PrivacyPage() {
  const t = useTranslations('legal.privacy');
  
  return (
    <div className={styles.legalPage}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.badge}>{t('title')}</div>
          <h1 className={styles.pageTitle}>
            Privacy <span className={styles.highlight}>Policy</span>
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
                <h2 className={styles.sectionTitle}>{t('sections.information.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.information.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>{t('sections.usage.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.usage.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>03</span>
                <h2 className={styles.sectionTitle}>{t('sections.sharing.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.sharing.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>04</span>
                <h2 className={styles.sectionTitle}>{t('sections.security.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.security.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>05</span>
                <h2 className={styles.sectionTitle}>{t('sections.rights.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.rights.content')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}