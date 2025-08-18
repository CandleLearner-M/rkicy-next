"use client";

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/components/ProjectsPage/projects';
import styles from './ProjectsGrid.module.scss';

interface ProjectsGridProps {
  projects: typeof projects;
  filters: {[key: string]: string};
  onResetFilters: () => void;
}

export default function ProjectsGrid({ projects, filters, onResetFilters }: ProjectsGridProps) {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations('projects');

  // Filter projects based on applied filters
  useEffect(() => {
    let result = [...projects];
    
    // Apply each filter
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        result = result.filter(project => {
          if (key === 'category') {
            return project.category === value;
          }
          if (key === 'status') {
            return project.status === value;
          }
          if (key === 'year') {
            return project.year.toString() === value;
          }
          return true;
        });
      }
    }
    
    setFilteredProjects(result);
  }, [projects, filters]);

  // Animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Get unique years for filtering
  const getUniqueYears = () => {
    return Array.from(new Set(projects.map(project => project.year))).sort((a, b) => b - a);
  };

  // Status badge display
  const renderStatusBadge = (status: string) => {
    const statusClasses = {
      completed: styles.statusCompleted,
      ongoing: styles.statusOngoing,
      upcoming: styles.statusUpcoming,
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusClasses[status]}`}>
        {status === 'ongoing' && <Clock size={14} />}
        {t(`filter.status.${status}`)}
      </span>
    );
  };

  return (
    <section className={styles.projectsGridSection}>
      <div className={styles.container}>
        {/* Results header */}
        <div className={styles.resultsHeader}>
          <div className={styles.resultsCount}>
            <span className={styles.resultsText}>
              {filteredProjects.length === 1
                ? t('grid.showingSingular')
                : t('grid.showingPlural', { count: filteredProjects.length })}
            </span>
            
            {Object.keys(filters).length > 0 && (
              <button 
                className={styles.resetButton}
                onClick={onResetFilters}
              >
                {t('grid.resetFilters')}
              </button>
            )}
          </div>

          {/* Applied filters display */}
          {Object.keys(filters).length > 0 && (
            <div className={styles.appliedFilters}>
              {Object.entries(filters).map(([key, value]) => (
                <div key={key} className={styles.filterTag}>
                  <span className={styles.filterLabel}>{t(`filter.${key}`)}</span>
                  <span className={styles.filterValue}>
                    {key === 'category' && t(`filter.categories.${value}`)}
                    {key === 'status' && t(`filter.status.${value}`)}
                    {key === 'year' && value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className={styles.projectsGrid}>
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={styles.projectCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + (index * 0.05),
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link href={project.slug} className={styles.projectLink}>
                    <div className={styles.imageContainer}>
                      {project.image ? (
                        <div className={styles.projectImage}>
                          <Image
                            src={project.image}
                            alt={t(project.titleKey)}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            style={{ objectFit: "cover" }}
                          />
                          {renderStatusBadge(project.status)}
                          
                          <div className={styles.projectOverlay}>
                            <div className={styles.overlayContent}>
                              <span className={styles.viewDetails}>
                                {t('grid.viewDetails')}
                                <ArrowRight size={16} />
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={`${styles.projectImage} ${styles.placeholderImage}`}>
                          <div className={styles.placeholderContent}>
                            {renderStatusBadge(project.status)}
                          </div>
                        </div>
                      )}
                      
                      {project.logo && (
                        <div className={styles.projectLogo}>
                          <Image 
                            src={project.logo}
                            alt={`${project.id} logo`}
                            width={40}
                            height={40}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className={styles.projectContent}>
                      <div className={styles.projectMeta}>
                        <span className={styles.projectCategory}>
                          {t(project.categoryKey)}
                        </span>
                        <span className={styles.projectYear}>
                          {project.year}
                        </span>
                      </div>
                      
                      <h3 className={styles.projectTitle}>{t(project.titleKey)}</h3>
                      
                      <p className={styles.projectDescription}>
                        {t(project.descriptionKey)}
                      </p>
                      
                      <div className={styles.projectTags}>
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className={styles.techTag}>{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className={styles.moreTag}>
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className={styles.projectFooter}>
                        <div className={styles.clientInfo}>
                          {project.client && (
                            <span className={styles.clientName}>
                              {project.client}
                            </span>
                          )}
                        </div>
                        <span className={styles.viewButton}>
                          <ExternalLink size={16} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
                <path d="M8 11h6" />
              </svg>
            </div>
            <h3 className={styles.noResultsTitle}>{t('grid.noResults.title')}</h3>
            <p className={styles.noResultsText}>{t('grid.noResults.message')}</p>
            <button 
              className={styles.resetFiltersButton}
              onClick={onResetFilters}
            >
              {t('grid.resetFilters')}
            </button>
          </div>
        )}
        
        {/* Load more button (optional) */}
        {filteredProjects.length > 6 && (
          <div className={styles.loadMoreContainer}>
            <button className={styles.loadMoreButton}>
              {t('grid.loadMore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}