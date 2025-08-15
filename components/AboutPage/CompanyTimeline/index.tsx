import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './CompanyTimeline.module.scss';
import { Calendar, Award, Rocket, Users, BarChart3 } from 'lucide-react';

export default function CompanyTimeline() {
  const t = useTranslations('about.timeline');
  
  const timelineEvents = [
    {
      date: t('events.founding.date'),
      title: t('events.founding.title'),
      description: t('events.founding.description'),
      icon: <Calendar size={20} />
    },
    {
      date: t('events.firstClient.date'),
      title: t('events.firstClient.title'),
      description: t('events.firstClient.description'),
      icon: <Users size={20} />
    },
    {
      date: t('events.expansion.date'),
      title: t('events.expansion.title'),
      description: t('events.expansion.description'),
      icon: <Rocket size={20} />
    },
    {
      date: t('events.award.date'),
      title: t('events.award.title'),
      description: t('events.award.description'),
      icon: <Award size={20} />
    },
    {
      date: t('events.growth.date'),
      title: t('events.growth.title'),
      description: t('events.growth.description'),
      icon: <BarChart3 size={20} />
    }
  ];
  
  return (
    <section className={styles.timelineSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>{t('badge')}</div>
          <h2 className={styles.sectionTitle}>
            <span className={styles.highlight}>{t('title.highlight')}</span> {t('title.end')}
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>
        
        <div className={styles.timelineContainer}>
          <div className={styles.timelineLine}></div>
          
          {timelineEvents.map((event, index) => (
            <div 
              className={`${styles.timelineEvent} ${index % 2 !== 0 ? styles.eventRight : ''}`} 
              key={event.title}
            >
              <div className={styles.eventIconContainer}>
                <div className={styles.eventIcon}>{event.icon}</div>
              </div>
              
              <div className={styles.eventCard}>
                <div className={styles.eventDate}>{event.date}</div>
                <h3 className={styles.eventTitle}>{event.title}</h3>
                <p className={styles.eventDescription}>{event.description}</p>
              </div>
              
              <div className={styles.eventDot}></div>
            </div>
          ))}
        </div>
        
        <div className={styles.futureBox}>
          <div className={styles.futureContent}>
            <h3 className={styles.futureTitle}>{t('future.title')}</h3>
            <p className={styles.futureDescription}>{t('future.description')}</p>
          </div>
          <div className={styles.futureDecor}></div>
        </div>
      </div>
    </section>
  );
}