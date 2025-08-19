"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { 
  MonitorSmartphone, 
  Server, 
  Database, 
  Cloud, 
  LineChart, 
  Shield, 
  Smartphone,
  Cpu
} from 'lucide-react';
import styles from './TechStackShowcase.module.scss';

export default function TechStackShowcase() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState('frontend');
  const t = useTranslations('projects.techstack');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = [
    { id: 'frontend', icon: <MonitorSmartphone size={22} />, labelKey: 'categories.frontend' },
    { id: 'backend', icon: <Server size={22} />, labelKey: 'categories.backend' },
    { id: 'database', icon: <Database size={22} />, labelKey: 'categories.database' },
    { id: 'cloud', icon: <Cloud size={22} />, labelKey: 'categories.cloud' },
    { id: 'ai', icon: <Cpu size={22} />, labelKey: 'categories.ai' },
    { id: 'mobile', icon: <Smartphone size={22} />, labelKey: 'categories.mobile' },
    { id: 'analytics', icon: <LineChart size={22} />, labelKey: 'categories.analytics' },
    { id: 'security', icon: <Shield size={22} />, labelKey: 'categories.security' }
  ];

  const technologies = {
    frontend: [
      'React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 
      'Tailwind CSS', 'SCSS', 'GraphQL', 'Redux', 'Framer Motion'
    ],
    backend: [
      'Node.js', 'Express', 'NestJS', 'Django', 'Laravel', 
      'Spring Boot', 'ASP.NET Core', 'Ruby on Rails', 'GraphQL', 'REST'
    ],
    database: [
      'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 
      'Cassandra', 'Firebase', 'DynamoDB', 'SQLite', 'Oracle'
    ],
    cloud: [
      'AWS', 'Azure', 'Google Cloud', 'Heroku', 'Netlify', 
      'Vercel', 'Digital Ocean', 'Firebase', 'Kubernetes', 'Docker'
    ],
    ai: [
      'TensorFlow', 'PyTorch', 'OpenAI', 'Scikit-learn', 'Pandas', 
      'NLTK', 'Computer Vision', 'NLP', 'Predictive Analytics', 'Machine Learning Ops'
    ],
    mobile: [
      'React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic', 
      'Capacitor', 'PWA', 'Android', 'iOS', 'Cross-platform'
    ],
    analytics: [
      'Google Analytics', 'Mixpanel', 'Amplitude', 'Segment', 'Tableau', 
      'Power BI', 'Looker', 'Data Lake', 'ETL', 'Big Data'
    ],
    security: [
      'OAuth 2.0', 'JWT', 'HTTPS', 'SSL/TLS', 'WAF', 
      'Penetration Testing', 'OWASP', 'SSO', 'GDPR Compliance', 'Data Encryption'
    ]
  };

  return (
    <section className={styles.techStackSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <span className={styles.sectionBadge}>{t('badge')}</span>
          <h2 className={styles.sectionTitle}>
            {t('title.start')} <span className={styles.highlight}>{t('title.highlight')}</span> {t('title.end')}
          </h2>
          <p className={styles.sectionDescription}>{t('description')}</p>
        </div>
        
        <div className={styles.techStackContent}>
          <div className={styles.categoriesContainer}>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                onClick={() => setActiveCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: categories.findIndex(c => c.id === category.id) * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -3, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.97 }}
              >
                <div className={styles.categoryIcon}>
                  {category.icon}
                </div>
                <span className={styles.categoryLabel}>{t(category.labelKey)}</span>
              </motion.button>
            ))}
          </div>
          
          <motion.div 
            className={styles.technologiesContainer}
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.technologiesGrid}>
              {technologies[activeCategory].map((tech, index) => (
                <motion.div 
                  key={tech}
                  className={styles.technologyCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <span>{tech}</span>
                </motion.div>
              ))}
            </div>
            
            <div className={styles.techCaption}>
              <p>{t('caption')}</p>
            </div>
          </motion.div>
        </div>
        
        <div className={styles.decorElements}>
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorGrid}></div>
          <div className={styles.decorGradient}></div>
        </div>
      </div>
    </section>
  );
}