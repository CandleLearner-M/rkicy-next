"use client";

import { ArrowRight, BarChart, Calendar, CheckCircle, Code, CreditCard, Globe, Shield, ShoppingBag, Users, Wallet, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './FeaturedProjects.module.scss';

export default function FeaturedProjects() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const t = useTranslations('projects');

  // Fetch project data with translations
  const featuredProjects = [
    {
      id: "paycov",
      titleKey: 'featured.projects.paycov.title',
      descriptionKey: 'featured.projects.paycov.description',
      image: "/projects/paycov/cover.png",
      categoryKey: 'featured.projects.paycov.category',
      technologies: ["Node.js", "PostgreSQL", "React Native", "Mobile"],
      stats: [
        { icon: <Shield size={18} />, valueKey: 'featured.projects.paycov.stats.security.value', labelKey: 'featured.projects.paycov.stats.security.label' },
        { icon: <Globe size={18} />, valueKey: 'featured.projects.paycov.stats.channels.value', labelKey: 'featured.projects.paycov.stats.channels.label' },
        { icon: <Wallet size={18} />, valueKey: 'featured.projects.paycov.stats.banks.value', labelKey: 'featured.projects.paycov.stats.banks.label' }
      ],
      slug: "/projects/paycov",
      logo: '/projects/paycov-logo.png',
    },
    {
      id: "nounours-ma",
      titleKey: 'featured.projects.nounours.title',
      descriptionKey: 'featured.projects.nounours.description',
      image: "/projects/nounours/cover.png",
      categoryKey: 'featured.projects.nounours.category',
      technologies: ["Shopify", "Web Development", "Payment Integration", "Inventory Management"],
      stats: [
        { icon: <ShoppingBag size={18} />, valueKey: 'featured.projects.nounours.stats.collections.value', labelKey: 'featured.projects.nounours.stats.collections.label' },
        { icon: <Users size={18} />, valueKey: 'featured.projects.nounours.stats.market.value', labelKey: 'featured.projects.nounours.stats.market.label' },
        { icon: <CreditCard size={18} />, valueKey: 'featured.projects.nounours.stats.payment.value', labelKey: 'featured.projects.nounours.stats.payment.label' }
      ],
      slug: "/projects/nounours-ma",
      logo: '/projects/nounours.png',

    },
    {
      id: "finish3",
      titleKey: 'featured.projects.finish3.title',
      descriptionKey: 'featured.projects.finish3.description',
      image: "",
      logo: '/projects/finish3.png',
      categoryKey: 'featured.projects.finish3.category',
      technologies: ["React", "Node.js", "Firebase", "Mobile"],
      stats: [
        { icon: <CheckCircle size={18} />, valueKey: 'featured.projects.finish3.stats.tasks.value', labelKey: 'featured.projects.finish3.stats.tasks.label' },
        { icon: <Zap size={18} />, valueKey: 'featured.projects.finish3.stats.sync.value', labelKey: 'featured.projects.finish3.stats.sync.label' },
        { icon: <Calendar size={18} />, valueKey: 'featured.projects.finish3.stats.rollover.value', labelKey: 'featured.projects.finish3.stats.rollover.label' }
      ],
      slug: "/projects/finish3"
    },
  ];

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
          <div className={styles.projectSelectors}>
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                className={`${styles.projectSelector} ${activeProject === index ? styles.active : ''} ${isLoaded ? styles.loaded : ''}`}
                onClick={() => setActiveProject(index)}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >

                {project.logo && (
                  <Image 
                    src={project.logo}
                    alt={`${project.id} logo`}
                    width={48}
                    height={48}
                    className={styles.projectLogo}
                    draggable='false'
                  />
                )}
                <div className={styles.selectorContent}>
                  <h3>{t(project.titleKey)}</h3>
                  <span className={styles.projectCategory}>{t(project.categoryKey)}</span>
                  
                  <div className={styles.techTags}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

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
                  
                  <div className={styles.projectStats}>
                    {project.stats.map((stat, i) => (
                      <div key={i} className={styles.statItem}>
                        <div className={styles.statIcon}>
                          {stat.icon}
                        </div>
                        <div className={styles.statContent}>
                          <span className={styles.statValue}>{t(stat.valueKey)}</span>
                          <span className={styles.statLabel}>{t(stat.labelKey)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={project.slug} className={styles.projectLink}>
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