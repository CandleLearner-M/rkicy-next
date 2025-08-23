"use client";

import { ArrowRight, Calendar, CheckCircle, CreditCard, Globe, Shield, ShoppingBag, Users, Wallet, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './FeaturedProjects.module.scss';
import { projects } from '../projects';

export default function FeaturedProjects() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const t = useTranslations('projects');

  // Featured projects (unchanged from your original)
  const featuredProjects = projects;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <span className={styles.sectionBadge}>{t('featured.badge')}</span>
          <h2 className={styles.sectionTitle}>
            {t('featured.title')} <span className={styles.highlight}>{t('featured.highlight')}</span>
          </h2>
          <p className={styles.sectionSubtitle}>{t('featured.subtitle')}</p>
        </div>

        <div className={styles.featuredProjects}>
          {/* Left selectors (unchanged) */}
                   <div className={styles.projectSelectors}>
            {featuredProjects.map((project, index) => {
              const limited = project.technologies.slice(0, 2);
              const remaining = project.technologies.length - limited.length;
              return (
                <button
                  key={project.id}
                  className={`${styles.projectSelector} ${
                    activeProject === index ? styles.active : ""
                  } ${isLoaded ? styles.loaded : ""}`}
                  onClick={() => setActiveProject(index)}
                  style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                  aria-label={`${t(project.titleKey)} selector`}
                >
                  {project.logo && (
                    <Image
                      src={project.logo}
                      alt={`${project.id} logo`}
                      width={48}
                      height={48}
                      className={styles.projectLogo}
                      draggable="false"
                    />
                  )}
                  <div className={styles.selectorContent}>
                    <h3>{t(project.titleKey)}</h3>
                    <span className={styles.projectCategory}>
                      {t(project.categoryKey)}
                    </span>

                    <div className={styles.techTags}>
                      {limited.map((tech, i) => (
                        <span key={i} className={styles.techTag}>
                          {tech}
                        </span>
                      ))}
                      {remaining > 0 && (
                        <span
                          className={`${styles.techTag} ${styles.moreTag}`}
                          title={project.technologies.slice(2).join(", ")}
                          aria-label={t("featured.remainingTechnologies", {
                            count: remaining
                          })}
                        >
                          +{remaining}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right showcase */}
          <div className={`${styles.projectShowcase} ${isLoaded ? styles.loaded : ''}`}>
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`${styles.projectDetails} ${activeProject === index ? styles.active : ''}`}
              >
                <div className={styles.projectImageContainer}>
                  {project.image ? (
                    <div className={styles.projectImage}>
                      <Image
                        src={project.image}
                        alt={t(project.titleKey)}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover", objectPosition: "top center" }}
                      />
                    </div>
                  ) : (
                    <div className={`${styles.projectImage} ${styles.inProgress}`}>
                      <div className={styles.inProgressContent}>
                        <div className={styles.inProgressBadge}>
                          <span>{t('featured.inProgressLabel')}</span>
                        </div>
                        <h3>{t('featured.comingSoon')}</h3>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className={styles.projectInfo}>
                  <h2>{t(project.titleKey)}</h2>
                  <p className={styles.projectDescription}>{t(project.descriptionKey)}</p>

                  {/* Added: full technology stack pills (from the version you liked) */}
                  <div className={styles.techStackFull} aria-label="Full tech stack">
                    {project.technologies.map(tech => (
                      <span key={tech} className={styles.techPill}>{tech}</span>
                    ))}
                  </div>
                  
                  {/* Stats block you liked (unchanged) */}
                   <div className={styles.projectStats}>
                        {project.stats.map((stat, i) => (
                          <div key={i} className={styles.statItem}>
                            <div className={styles.statIcon}>{stat.icon}</div>
                            <div className={styles.statContent}>
                              <span className={styles.statValue}>
                                {t(stat.valueKey)}
                              </span>
                              <span className={styles.statLabel}>
                                {t(stat.labelKey)}
                              </span>
                            </div>
                          </div>
                        ))}
                    </div>
                  
                  <Link href={project.slug} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    <span>{t('featured.viewProject')}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}