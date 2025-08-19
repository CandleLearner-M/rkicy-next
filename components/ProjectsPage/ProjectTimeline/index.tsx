"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  FileSearch, 
  LayoutPanelTop, 
  Code, 
  TestTube, 
  Rocket, 
  HeartHandshake
} from 'lucide-react';
import styles from './ProjectTimeline.module.scss';

export default function ProjectTimeline() {
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations('projects.timeline');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const timelineSteps = [
    {
      icon: <FileSearch size={24} />,
      titleKey: 'steps.discovery.title',
      descriptionKey: 'steps.discovery.description',
      durationKey: 'steps.discovery.duration'
    },
    {
      icon: <LayoutPanelTop size={24} />,
      titleKey: 'steps.planning.title',
      descriptionKey: 'steps.planning.description',
      durationKey: 'steps.planning.duration'
    },
    {
      icon: <Code size={24} />,
      titleKey: 'steps.development.title',
      descriptionKey: 'steps.development.description',
      durationKey: 'steps.development.duration'
    },
    {
      icon: <TestTube size={24} />,
      titleKey: 'steps.testing.title',
      descriptionKey: 'steps.testing.description',
      durationKey: 'steps.testing.duration'
    },
    {
      icon: <Rocket size={24} />,
      titleKey: 'steps.deployment.title',
      descriptionKey: 'steps.deployment.description',
      durationKey: 'steps.deployment.duration'
    },
    {
      icon: <HeartHandshake size={24} />,
      titleKey: 'steps.support.title',
      descriptionKey: 'steps.support.description',
      durationKey: 'steps.support.duration'
    }
  ];

  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <span className={styles.sectionBadge}>{t('badge')}</span>
          <h2 className={styles.sectionTitle}>
            {t('title.start')} <span className={styles.highlight}>{t('title.highlight')}</span> {t('title.end')}
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>
        
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          
          {timelineSteps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.timelineStep}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className={styles.timelinePoint}></div>
              
              <div className={`${styles.timelineCard} ${index % 2 !== 0 ? styles.right : styles.left}`}>
                <div className={styles.timelineIcon}>
                  {step.icon}
                </div>
                <h3 className={styles.timelineTitle}>{t(step.titleKey)}</h3>
                <p className={styles.timelineDescription}>
                  {t(step.descriptionKey)}
                </p>
                <div className={styles.timelineDuration}>
                  <span>{t(step.durationKey)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.timelineNote}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p>{t('note')}</p>
        </motion.div>
      </div>
    </section>
  );
}