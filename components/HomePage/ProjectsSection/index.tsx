'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import styles from './ProjectsSection.module.scss';

export default function ProjectsSection() {
  const locale = useLocale();
  const t = useTranslations('duplicate.projects');
  const containerRef = useRef(null);

  // Hover animation variant
  const projectCardVariants = {
    hover: {
      y: -5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 20
      }
    }
  };

  const projects = [
    {
      id: '01',
      title: 'Paycov',
      description: t('projects.paycov.description'),
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.projectIcon}>
          <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 10H21" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 15H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      logo: '/projects/paycov-logo.png',
      background: "#ffffff",
      filter: "none",
      tags: [t('tags.fintech'), t('tags.payments')],
      link: 'https://www.paycov.com/'
    },
    {
      id: '02',
      title: 'Finish3',
      description: t('projects.finish3.description'),
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.projectIcon}>
          <circle cx="12" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="5" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="19" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M10.5 6.5L6.5 10.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M17.5 10.5L13.5 6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13.5 17.5L17.5 13.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6.5 13.5L10.5 17.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      logo: '/projects/finish3/logo.png',
      filter: "invert(100%) sepia(0%) saturate(7491%) hue-rotate(127deg) brightness(102%) contrast(99%)",
      tags: [t('tags.productivity'), t('tags.task')],
      link: 'https://www.finish3.com/'
    },
    {
      id: '03',
      title: 'UFC Countdown',
      description: t('projects.ufcCountdown.description'),
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.projectIcon}>
          <path d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      logo: '/projects/ufc.png',
      filter: "none",
      tags: [t('tags.sports'), t('tags.media')],
      link: 'https://www.ufccountdown.com/'
    },
    {
      id: '04',
      title: 'Nounours',
      description: t('projects.nounours.description'),
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.projectIcon}>
          <path d="M8 3V6C8 7.10457 8.89543 8 10 8H14C15.1046 8 16 7.10457 16 6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M6 21H18C19.1046 21 20 20.1046 20 19V8C20 6.89543 19.1046 6 18 6H6C4.89543 6 4 6.89543 4 8V19C4 20.1046 4.89543 21 6 21Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M16 11.5C16 11.5 14 14 12 14C10 14 8 11.5 8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
      logo: '/projects/nounours.png',
      filter: "none",
      tags: [t('tags.ecommerce'), t('tags.retail'), t('tags.toys')],
      link: 'https://nounours.ma/'
    }
  ];

  return (
    <section className={styles.projectsSection} ref={containerRef}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.labelWrapper}>
              <span className={styles.overline}>
                {t('badge')}
              </span>
            </div>
            <h2 className={styles.heading}>
              {t('title')}{' '}
              <span className={styles.highlightTxt}>{t('highlighted')}</span>{' '}
              {t('title2')}
            </h2>
            <p className={styles.subheading}>{t('description')}</p>
          </div>

          <div className={styles.projectsContainer}>
            {projects.map((project) => (
              <motion.div 
                key={project.id}
                className={`${styles.projectCard} ${project.logo ? styles.hasLogo : ''}`}
                variants={projectCardVariants}
                whileHover="hover"
                >
                {project.logo && (

                  <div className={styles.projectLogo} style={{background: project.background}}>
                    <Image 
                      src={project.logo}
                      alt={`${project.title} logo`}
                      width={48}
                      height={48}
                      draggable='false'
                      />
                    </div>
                )}
                <div className={styles.projectHeader}>
                  {project.iconSvg}
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.projectTags}>
                  {project.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <Link 
                  href={project.link} 
                  className={styles.projectLink}
                  target={project.link.startsWith('http') ? '_blank' : '_self'} 
                  rel={project.link.startsWith('http') ? 'noopener noreferrer' : ''}
                >
                  <span>{project.link.startsWith('http') ? t('visitSite') : t('viewProject')}</span>
                  <ArrowUpRight className={styles.linkIcon} size={16} />
                </Link>
                <div className={styles.projectGlow} />
              </motion.div>
            ))}
          </div>

          <div className={styles.ctaContainer}>
            <Link href={`/${locale}/projects`} className={styles.projectsCta}>
              <span>{t('viewAllProjects')}</span>
              <ArrowUpRight className={styles.ctaIcon} size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}