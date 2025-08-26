"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Brain, Code, Database, Server, Cpu, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import styles from './ServiceCategories.module.scss';

export default function ServiceCategories() {
  const [activeService, setActiveService] = useState(0);
  const t = useTranslations('services.hero');
  
  const services = [
    {
      id: 'ai',
      icon: <Brain size={24} />,
      color: '#4F46E5',
      titleKey: 'services.ai.title',
      descriptionKey: 'services.ai.description',
      features: [
        'services.ai.features.custom',
        'services.ai.features.nlp',
        'services.ai.features.automation',
        'services.ai.features.analytics'
      ],
      technologies: ['TensorFlow', 'PyTorch', 'Azure AI', 'OpenAI', 'Scikit-Learn'],
    },
    {
      id: 'enterprise',
      icon: <Database size={24} />,
      color: '#0EA5E9',
      titleKey: 'services.enterprise.title',
      descriptionKey: 'services.enterprise.description',
      features: [
        'services.enterprise.features.erp',
        'services.enterprise.features.crm',
        'services.enterprise.features.integration',
        'services.enterprise.features.cloud'
      ],
      technologies: ['SAP', 'Oracle', 'Microsoft Dynamics', 'Salesforce', 'AWS'],
    },
    {
      id: 'software',
      icon: <Code size={24} />,
      color: '#F6351C',
      titleKey: 'services.software.title',
      descriptionKey: 'services.software.description',
      features: [
        'services.software.features.web',
        'services.software.features.mobile',
        'services.software.features.custom',
        'services.software.features.ux'
      ],
      technologies: ['React', 'Next.js', 'Flutter', 'Node.js', 'Laravel'],
    },
    {
      id: 'hardware',
      icon: <Server size={24} />,
      color: '#059669',
      titleKey: 'services.hardware.title',
      descriptionKey: 'services.hardware.description',
      features: [
        'services.hardware.features.infrastructure',
        'services.hardware.features.networking',
        'services.hardware.features.security',
        'services.hardware.features.maintenance'
      ],
      technologies: ['Cisco', 'Zebra', 'Dell', 'HP', 'IBM'],
    }
  ];

  return (
    <section className={styles.heroSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>{t('badge')}</div>
          <h1 className={styles.sectionTitle}>
            {t('titleStart')} <span className={styles.highlight}>{t('titleHighlight')}</span> {t('titleEnd')}
          </h1>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>

        <div className={styles.servicesGrid}>
          <div className={styles.servicesTabs}>
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                className={`${styles.serviceTab} ${activeService === index ? styles.active : ''}`}
                onClick={() => setActiveService(index)}
                whileHover={{ translateX: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                style={{
                  '--service-color': service.color
                } as React.CSSProperties}
              >
                <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, ${service.color}22, ${service.color}11)` }}>
                  {service.icon}
                </div>
                <span>{t(service.titleKey)}</span>
                <div className={styles.tabIndicator} />
              </motion.button>
            ))}
          </div>

          <div className={styles.serviceDetails}>
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`${styles.serviceDetail} ${activeService === index ? styles.active : ''}`}
                initial={false}
                animate={activeService === index ? 
                  { opacity: 1, x: 0, height: 'auto' } : 
                  { opacity: 0, x: 30, height: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                <div className={styles.serviceContent}>
                  <h2>{t(service.titleKey)}</h2>
                  <p>{t(service.descriptionKey)}</p>

                  <div className={styles.serviceFeatures}>
                    {service.features.map((feature, idx) => (
                      <div key={idx} className={styles.featureItem}>
                        <div className={styles.featureIcon}>
                          <ArrowRight size={16} />
                        </div>
                        <span>{t(feature)}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.techTags}>
                    <h4>{t('technologies')}</h4>
                    <div className={styles.tags}>
                      {service.technologies.map((tech, idx) => (
                        <span key={idx} className={styles.tag}>{tech}</span>
                      ))}
                    </div>
                  </div>

              
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.decorElements}>
        <div className={styles.decorCircle1} />
        <div className={styles.decorCircle2} />
        <div className={styles.decorPattern} />
      </div>
    </section>
  );
}