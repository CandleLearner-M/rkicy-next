"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  UserCheck, 
  ClipboardCheck, 
  Brush, 
  Code, 
  Rocket, 
  LifeBuoy,
  ChevronRight
} from 'lucide-react';
import styles from './ProcessSection.module.scss';

export default function ProcessSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const t = useTranslations('projects.process');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const processSteps = [
    {
      icon: <UserCheck size={24} />,
      titleKey: 'steps.requirements.title',
      descriptionKey: 'steps.requirements.description',
      deliverableKey: 'steps.requirements.deliverable'
    },
    {
      icon: <ClipboardCheck size={24} />,
      titleKey: 'steps.planning.title',
      descriptionKey: 'steps.planning.description',
      deliverableKey: 'steps.planning.deliverable'
    },
    {
      icon: <Brush size={24} />,
      titleKey: 'steps.design.title',
      descriptionKey: 'steps.design.description',
      deliverableKey: 'steps.design.deliverable'
    },
    {
      icon: <Code size={24} />,
      titleKey: 'steps.development.title',
      descriptionKey: 'steps.development.description',
      deliverableKey: 'steps.development.deliverable'
    },
    {
      icon: <Rocket size={24} />,
      titleKey: 'steps.launch.title',
      descriptionKey: 'steps.launch.description',
      deliverableKey: 'steps.launch.deliverable'
    },
    {
      icon: <LifeBuoy size={24} />,
      titleKey: 'steps.support.title',
      descriptionKey: 'steps.support.description',
      deliverableKey: 'steps.support.deliverable'
    }
  ];

  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <span className={styles.sectionBadge}>{t('badge')}</span>
          <h2 className={styles.sectionTitle}>
            {t('title.start')} <span className={styles.highlight}>{t('title.highlight')}</span> {t('title.end')}
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>
        
        <div className={styles.processContent}>
          <div className={styles.processStepsList}>
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                className={`${styles.processStepItem} ${activeStep === index ? styles.active : ''}`}
                onClick={() => setActiveStep(index)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className={styles.stepNumber}>{index + 1}</div>
                <div className={styles.stepInfo}>
                  <h3 className={styles.stepTitle}>{t(step.titleKey)}</h3>
                  <ChevronRight className={styles.stepArrow} size={16} />
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className={styles.processDetail}
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.detailCard}>
              <div className={styles.cardHeader}>
                <div className={styles.stepIconContainer}>
                  {processSteps[activeStep].icon}
                </div>
                <h3 className={styles.detailTitle}>{t(processSteps[activeStep].titleKey)}</h3>
              </div>
              <div className={styles.cardContent}>
                <p className={styles.detailDescription}>
                  {t(processSteps[activeStep].descriptionKey)}
                </p>
                <div className={styles.deliverableBox}>
                  <h4 className={styles.deliverableTitle}>{t('deliverableTitle')}</h4>
                  <p className={styles.deliverableText}>
                    {t(processSteps[activeStep].deliverableKey)}
                  </p>
                </div>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                ></div>
              </div>
              <div className={styles.progressLabel}>
                <span>{t('progressLabel', { current: activeStep + 1, total: processSteps.length })}</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.processNote}
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