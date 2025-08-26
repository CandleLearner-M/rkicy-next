"use client";

import { useTranslations } from 'next-intl';
import { Zap, Shield, Cpu, BarChart, Layers, Code, Server, Globe } from 'lucide-react';
import styles from './ServiceFeatures.module.scss';
import Link from 'next/link';

export default function ServiceFeatures() {
  const t = useTranslations('services.features');

  // Service feature cards
  const features = [
    {
      icon: <Cpu size={28} />,
      color: '#4F46E5',
      titleKey: 'ai.title',
      descriptionKey: 'ai.description',
    },
    {
      icon: <Server size={28} />,
      color: '#0EA5E9',
      titleKey: 'enterprise.title',
      descriptionKey: 'enterprise.description',
    },
    {
      icon: <Code size={28} />,
      color: '#F6351C',
      titleKey: 'software.title',
      descriptionKey: 'software.description',
    },
    {
      icon: <Globe size={28} />,
      color: '#059669',
      titleKey: 'hardware.title',
      descriptionKey: 'hardware.description',
    }
  ];

  // Additional benefits of our services
  const benefits = [
    {
      icon: <Zap size={24} />,
      titleKey: 'benefits.efficiency.title',
      descriptionKey: 'benefits.efficiency.description',
    },
    {
      icon: <Shield size={24} />,
      titleKey: 'benefits.security.title',
      descriptionKey: 'benefits.security.description',
    },
    {
      icon: <BarChart size={24} />,
      titleKey: 'benefits.analytics.title',
      descriptionKey: 'benefits.analytics.description',
    },
    {
      icon: <Layers size={24} />,
      titleKey: 'benefits.integration.title',
      descriptionKey: 'benefits.integration.description',
    }
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>{t('badge')}</div>
          <h2 className={styles.sectionTitle}>
            {t('titleStart')} <span className={styles.highlight}>{t('titleHighlight')}</span> {t('titleEnd')}
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>

        <div className={styles.contentGrid}>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div
                key={index}
                className={styles.featureCard}
                style={{
                  '--card-color': feature.color
                } as React.CSSProperties}
              >
                <div
                  className={styles.iconContainer}
                  style={{ background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)` }}
                >
                  {feature.icon}
                </div>
                <h3>{t(feature.titleKey)}</h3>
                <p>{t(feature.descriptionKey)}</p>

                <div className={styles.cardDecoration}>
                  <div className={styles.cardGlow} />
                  <div className={styles.cardCorner} />
                </div>
              </div>
            ))}
          </div>

          <div className={styles.benefitsContainer}>
            <div className={styles.benefitsHeader}>
              <h3>{t('benefits.title')}</h3>
              <div className={styles.accentLine}></div>
            </div>

            <div className={styles.benefitsList}>
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <div className={styles.benefitIcon}>
                    {benefit.icon}
                  </div>
                  <div className={styles.benefitContent}>
                    <h4>{t(benefit.titleKey)}</h4>
                    <p>{t(benefit.descriptionKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.ctaContainer}>
              <Link href="/contact" className={styles.ctaButton}>
                {t('contactCta')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.decorElements}>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        <div className={styles.decorGrid} />
        <div className={styles.decorPattern} />
      </div>
    </section>
  );
}
