'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Shield, Award } from 'lucide-react';
import styles from './PartnersSection.module.scss';

export default function PartnersSection() {
  const t = useTranslations('duplicate');
  const containerRef = useRef<HTMLDivElement>(null);

  const partners = [
    {
      id: '01',
      name: 'Zebra Technologies',
      description: t('partners.zebra.description'),
      logo: '/icons/zebra.svg',
      badge: t('partners.zebra.badge'),
      icon: <Shield className={styles.partnerIcon} />,
    },
    {
      id: '02',
      name: 'OpenAI',
      description: t('partners.openai.description'),
      logo: '/icons/openai.svg',
      badge: t('partners.openai.badge'),
      icon: <Award className={styles.partnerIcon} />,
    },
    {
      id: '03',
      name: 'SAP',
      description: t('partners.sap.description'),
      logo: '/icons/sap.svg',
      badge: t('partners.sap.badge'),
      icon: <Award className={styles.partnerIcon} />,
    }
  ];

  return (
    <section className={styles.partnersSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.labelWrapper}>
              <span className={styles.overline}>
                {t('partners.label')}
              </span>
            </div>
            <h2 className={styles.heading}>
              {t('partners.title')}{' '}
              <span className={styles.highlightTxt}>{t('partners.highlighted')}</span>{' '}
              {t('partners.title2')}
            </h2>
            <p className={styles.subheading}>{t('partners.subtitle')}</p>
          </div>
        
          <div className={styles.description}>
            <p>{t('partners.description')}</p>
            <div className={styles.highlight} />
          </div>

          <div className={styles.featuredPartner}>
            <div className={styles.featuredCard}>
              <div className={styles.featuredContent}>
                <div className={styles.badgeWrapper}>
                  <span className={styles.badge}>
                    <Shield size={14} />
                    {t('partners.featuredBadge')}
                  </span>
                </div>
                <h3 className={styles.featuredTitle}>{t('partners.zebra.title')}</h3>
                <p className={styles.featuredDescription}>{t('partners.zebra.longDescription')}</p>
              </div>
              <div className={styles.featuredLogo}>
                <div className={styles.logoWrapper}>
                  <Image 
                    src="/icons/zebra.svg" 
                    alt="Zebra Technologies Logo" 
                    width={180} 
                    height={60} 
                    className={styles.logo}
                  />
                </div>
              </div>
              <div className={styles.featuredGlow} />
            </div>
          </div>

          <h3 className={styles.partnersSectionTitle}>
            {t('partners.trustedPartners')}
          </h3>

          <div className={styles.partnersLogosContainer}>
            {partners.map((partner) => (
              <div 
                key={partner.id}
                className={styles.partnerLogoCard}
              >
                <div className={styles.logoContainer}>
                  <Image 
                    src={partner.logo} 
                    alt={`${partner.name} Logo`} 
                    width={140} 
                    height={50}
                    className={styles.partnerLogo} 
                  />
                </div>
                <div className={styles.logoGlow} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}