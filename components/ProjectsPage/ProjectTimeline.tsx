'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import styles from './ProjectTimeline.module.scss';

export default function ProjectTimeline() {
  const t = useTranslations('projects.paycov.timeline');
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-100px" });
  
  // Timeline events
  const timelineEvents = [
    {
      id: 'ideation',
      date: t('events.ideation.date'),
      title: t('events.ideation.title'),
      description: t('events.ideation.description'),
      icon: '💡',
    },
    {
      id: 'research',
      date: t('events.research.date'),
      title: t('events.research.title'),
      description: t('events.research.description'),
      icon: '🔍',
    },
    {
      id: 'prototype',
      date: t('events.prototype.date'),
      title: t('events.prototype.title'),
      description: t('events.prototype.description'),
      icon: '⚙️',
    },
    {
      id: 'development',
      date: t('events.development.date'),
      title: t('events.development.title'),
      description: t('events.development.description'),
      icon: '👨‍💻',
    },
    {
      id: 'testing',
      date: t('events.testing.date'),
      title: t('events.testing.title'),
      description: t('events.testing.description'),
      icon: '🧪',
    },
    {
      id: 'regulatory',
      date: t('events.regulatory.date'),
      title: t('events.regulatory.title'),
      description: t('events.regulatory.description'),
      icon: '📝',
    },
  ];
  
  return (
    <div className={styles.timelineSection} ref={timelineRef}>
      <div className={styles.timelineContainer}>
        <div className={styles.timelineTrack}>
          <motion.div 
            className={styles.progressLine}
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          
          {timelineEvents.map((event, index) => (
            <motion.div 
              key={event.id}
              className={styles.timelineEvent}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className={`${styles.eventContent} ${index % 2 === 0 ? styles.left : styles.right}`}>
                <div className={styles.eventDate}>{event.date}</div>
                <div className={styles.eventCard}>
                  <div className={styles.eventIcon}>{event.icon}</div>
                  <h4 className={styles.eventTitle}>{event.title}</h4>
                  <p className={styles.eventDescription}>{event.description}</p>
                </div>
                <div className={styles.connector}>
                  <div className={styles.dot} />
                  <div className={styles.line} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}