"use client";

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../projects';
import { 
  X, 
  ArrowRight,
  CheckCircle,
  Clock,
  Sparkle,
  Construction,
  BarChart2
} from 'lucide-react';
import styles from './QuickViewModal.module.scss';

interface QuickViewModalProps {
  project: Project | null;
  onClose: () => void;
  isOpen: boolean;
}

// Component for displaying projects under construction
export function UnderConstructionDisplay({ percentage = 35 }) {
  const t = useTranslations('projects');
  
  return (
    <div className={styles.underConstruction}>
      <div className={styles.decorCircle1} />
      <div className={styles.decorCircle2} />
      <div className={styles.decorPattern} />
      
      <div className={styles.constructionContent}>
        <div className={styles.constructionIcon}>
          <Construction size={40} />
        </div>
        <h3 className={styles.constructionTitle}>{t('modal.underConstruction')}</h3>
        <p className={styles.constructionText}>{t('modal.comingSoon')}</p>
        
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
          />
        </div>
        <div className={styles.progressPercent}>{percentage}% {t('modal.complete')}</div>
      </div>
    </div>
  );
}

export default function QuickViewModal({ project, onClose, isOpen }: QuickViewModalProps) {
  const t = useTranslations('projects');
  const [isMounted, setIsMounted] = useState(false);

  // Ensure we only mount the portal on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // If not mounted or no project, don't render
  if (!isMounted || !project) return null;

  // Helper to get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'ongoing': return <Clock size={16} />;
      case 'upcoming': return <Sparkle size={16} />;
      default: return null;
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };

  const content = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.modalOverlay}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={onClose} aria-label={t('modal.close')}>
              <X size={24} />
            </button>
            
            <div className={styles.modalHeader}>
              {project.image ? (
                <div className={styles.modalImage}>
                  <Image
                    src={project.image}
                    alt={t(project.titleKey)}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    style={{ objectFit: "cover" }}
                  />
                  <div className={styles.headerOverlay}>
                    <div className={`${styles.statusBadge} ${styles[project.status]}`}>
                      {getStatusIcon(project.status)}
                      <span>{t(`grid.status.${project.status}`)}</span>
                    </div>
                    <h2 className={styles.modalTitle}>{t(project.titleKey)}</h2>
                    <div className={styles.categoryLine}>
                      {t(`grid.categories.${project.category}`, { fallback: project.category })}
                    </div>
                  </div>
                </div>
              ) : (
                <UnderConstructionDisplay 
                  percentage={project.status === 'upcoming' ? 20 : project.status === 'ongoing' ? 65 : 90}
                />
              )}
              
              {project.logo && (
                <div className={styles.logoDisplay}>
                  <Image
                    src={project.logo}
                    alt={`${project.id} logo`}
                    width={50}
                    height={50}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
            
            <div className={styles.modalBody}>
              <p className={styles.description}>{t(project.descriptionKey)}</p>
              
              <div>
                <h3 className={styles.sectionTitle}>{t('modal.technologies')}</h3>
                <div className={styles.techStack}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.techPill}>{tech}</span>
                  ))}
                </div>
              </div>
              
              {project.stats && project.stats.length > 0 && (
                <div>
                  <h3 className={styles.sectionTitle}>{t('modal.keyMetrics')}</h3>
                  <div className={styles.statsGrid}>
                    {project.stats.map((stat, i) => (
                      <div key={i} className={styles.statItem}>
                        <div className={styles.statIcon}>
                          {stat.icon || <BarChart2 size={20} />}
                        </div>
                        <div className={styles.statContent}>
                          <span className={styles.statValue}>{t(stat.valueKey)}</span>
                          <span className={styles.statLabel}>{t(stat.labelKey)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.modalFooter}>
              <Link href={project.slug} className={styles.viewFullButton}>
                <span>{t('modal.viewFullDetails')}</span>
                <ArrowRight size={16} className={styles.arrowIcon} />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Use portal to render outside the normal DOM hierarchy
  return createPortal(content, document.body);
}