"use client";

import { useTranslations } from 'next-intl';
import { Globe, TrendingUp, Award } from "lucide-react";
import styles from "./VisionMission.module.scss";

const VisionMission: React.FC = () => {
  const t = useTranslations('about.vision');
  
  return (
    <section className={styles.visionSection}>
      <div className={styles.visionContent}>
        <h2 className={styles.sectionTitle}>
          {t('sectionTitle')}
        </h2>
        
        <div className={styles.visionCards}>
          <div className={styles.visionCard}>
            <div className={styles.cardIconWrapper}>
              <Globe size={32} className={styles.cardIcon} />
            </div>
            <h3>{t('vision.title')}</h3>
            <p>{t('vision.description')}</p>
          </div>
          
          <div className={styles.visionCard}>
            <div className={styles.cardIconWrapper}>
              <TrendingUp size={32} className={styles.cardIcon} />
            </div>
            <h3>{t('mission.title')}</h3>
            <p>{t('mission.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisionMission;