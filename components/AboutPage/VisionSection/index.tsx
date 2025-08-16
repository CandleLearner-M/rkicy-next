import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './VisionSection.module.scss';
import { Target, Compass, Lightbulb, BarChart3, Check } from 'lucide-react';

export default function VisionSection() {
  const t = useTranslations('about.vision');
  
  const methodologySteps = [
    {
      icon: <Lightbulb size={24} />,
      title: t('methodology.steps.discovery.title'),
      description: t('methodology.steps.discovery.description')
    },
    {
      icon: <Compass size={24} />,
      title: t('methodology.steps.strategy.title'),
      description: t('methodology.steps.strategy.description')
    },
    {
      icon: <BarChart3 size={24} />,
      title: t('methodology.steps.implementation.title'),
      description: t('methodology.steps.implementation.description')
    }
  ];
  
  return (
    <section className={styles.visionSection}>
      <div className={styles.container}>
        <div className={styles.twoColumnLayout}>
          <div className={styles.visionColumn}>
            <div className={styles.sectionBadge}>{t('badge')}</div>
            <h2 className={styles.sectionTitle}>
              {t('title.start')} <span className={styles.highlight}>{t('title.highlight')}</span>
            </h2>
            
            <div className={styles.visionCard}>
              <div className={styles.visionIconContainer}>
                <Target size={28} className={styles.visionIcon} />
              </div>
              <h3 className={styles.visionTitle}>{t('vision.title')}</h3>
              <p className={styles.visionText}>{t('vision.text')}</p>
            </div>
            
            <div className={styles.principlesList}>
              <h3 className={styles.principlesTitle}>{t('principles.title')}</h3>
              
              <ul className={styles.principles}>
                <li className={styles.principleItem}>
                  <div className={styles.principleCheck}><Check size={16} /></div>
                  <span>{t('principles.items.first')}</span>
                </li>
                <li className={styles.principleItem}>
                  <div className={styles.principleCheck}><Check size={16} /></div>
                  <span>{t('principles.items.second')}</span>
                </li>
                <li className={styles.principleItem}>
                  <div className={styles.principleCheck}><Check size={16} /></div>
                  <span>{t('principles.items.third')}</span>
                </li>
                <li className={styles.principleItem}>
                  <div className={styles.principleCheck}><Check size={16} /></div>
                  <span>{t('principles.items.fourth')}</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className={styles.methodologyColumn}>
            <div className={styles.methodologyCard}>
              <h3 className={styles.methodologyTitle}>{t('methodology.title')}</h3>
              <p className={styles.methodologyIntro}>{t('methodology.intro')}</p>
              
              <div className={styles.stepsList}>
                {methodologySteps.map((step, index) => (
                  <div className={styles.methodologyStep} key={step.title}>
                    <div className={styles.stepNumber}>
                      <span>{index + 1}</span>
                    </div>
                    <div className={styles.stepContent}>
                      <div className={styles.stepIconContainer}>
                        {step.icon}
                      </div>
                      <h4 className={styles.stepTitle}>{step.title}</h4>
                      <p className={styles.stepDescription}>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.methodologyBottom}>
                <div className={styles.methodologyQuote}>
                  <div className={styles.quoteIcon}>"</div>
                  <blockquote className={styles.quoteText}>
                    {t('methodology.quote')}
                  </blockquote>
                  <div className={styles.quoteName}>
                    {t('methodology.quoteName')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.decorativeElements}>
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorGrid}></div>
        </div>
      </div>
    </section>
  );
}