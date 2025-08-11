'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUpRight, Brain, Zap, Users } from 'lucide-react';
import styles from './AboutPreview.module.scss';

export default function AboutPreview() {
  const locale = useLocale();
  const t = useTranslations('');
  const containerRef = useRef<HTMLDivElement>(null);

  const pillars = [
    {
      id: '01',
      title: 'Expertise',
      description: t('aboutHero.expertise'),
      icon: <Brain className={styles.pillarIcon} />,
    },
    {
      id: '02',
      title: 'Innovation',
      description: t('aboutHero.innovation'),
      icon: <Zap className={styles.pillarIcon} />,
    },
    {
      id: '03',
      title: 'Partnership',
      description: t('aboutHero.partnership'),
      icon: <Users className={styles.pillarIcon} />,
    }
  ];

  return (
    <section className={styles.aboutUsSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.labelWrapper}>
              <span className={styles.overline}>
                {t('aboutHero.label')}
              </span>
            </div>
            <h2 className={styles.heading}>{t('aboutHero.title')}{' '}
              <span className={styles.highlightTxt}>{t('aboutHero.highlighted')}</span>{' '}
              {t('aboutHero.title2')}
            </h2>
            <p className={styles.subheading}>{t('aboutHero.subtitle')}</p>
          </div>

          <div className={styles.description}>
            <p>{t('aboutHero.description')}</p>
            <div className={styles.highlight} />
          </div>

          <div className={styles.pillarsContainer}>
            {pillars.map((pillar) => (
              <div 
                key={pillar.id}
                className={styles.pillarCard}
              >
                <div className={styles.pillarHeader}>
                  <span className={styles.pillarId}>{pillar.id}</span>
                  {pillar.icon}
                </div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
                <div className={styles.pillarGlow} />
              </div>
            ))}
          </div>

          <div className={styles.ctaContainer}>
            <Link href={`/${locale}/about`} className={styles.aboutCta}>
              <span>{t('aboutHero.learnMore')}</span>
              <ArrowUpRight className={styles.ctaIcon} size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}