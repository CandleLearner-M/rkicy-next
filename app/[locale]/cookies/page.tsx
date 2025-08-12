import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import styles from '../Legal.module.scss';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'legal.cookies' });
  
  return {
    title: t('title'),
  };
}

export default function CookiesPage() {
  const t = useTranslations('legal.cookies');
  
  return (
    <div className={styles.legalPage}>
      <div className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.badge}>{t('title')}</div>
          <h1 className={styles.pageTitle}>
            Cookie <span className={styles.highlight}>Policy</span>
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
                <h2 className={styles.sectionTitle}>{t('sections.what.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.what.content')}</p>
              </div>
            </div>
            
            
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>02</span>
                <h2 className={styles.sectionTitle}>{t('sections.control.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.control.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>03</span>
                <h2 className={styles.sectionTitle}>{t('sections.thirdParty.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.thirdParty.content')}</p>
              </div>
            </div>
            
            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>04</span>
                <h2 className={styles.sectionTitle}>{t('sections.updates.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.updates.content')}</p>
              </div>
            </div>

            <div className={styles.legalCard}>
              <div className={styles.cardHeader}>
                <span className={styles.sectionNumber}>05</span>
                <h2 className={styles.sectionTitle}>{t('sections.types.title').substring(3)}</h2>
              </div>
              <div className={styles.cardContent}>
                <p>{t('sections.types.content')}</p>
                
                <div className={styles.cookieTypesGrid}>
                  <div className={styles.cookieTypeCard}>
                    <h3>Essential Cookies</h3>
                    <p>Required for basic website functionality. Cannot be disabled.</p>
                  </div>
                  
                  <div className={styles.cookieTypeCard}>
                    <h3>Performance Cookies</h3>
                    <p>Help us improve by collecting anonymous usage information.</p>
                  </div>
                  
                  <div className={styles.cookieTypeCard}>
                    <h3>Marketing Cookies</h3>
                    <p>Used to personalize ads and share information with third parties.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}