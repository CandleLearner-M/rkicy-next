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
      link: '/projects/paycov'
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
      logo: '/projects/finish3.svg',
      background: "#000000",
      filter: "invert(100%) sepia(0%) saturate(7491%) hue-rotate(127deg) brightness(102%) contrast(99%)",
      tags: [t('tags.productivity'), t('tags.task')],
      link: '/projects/finish3'
    },
    {
      id: '03',
      title: 'Bato.ma',
      description: t('projects.bato.description'),
      iconSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.projectIcon}>
          <path d="M4 7L4.8 16.4C4.93333 18.4 5 19.4 5.87868 20C6.75736 20.6 7.95975 20.6 10.3645 20.6H13.6355C16.0403 20.6 17.2426 20.6 18.1213 20C19 19.4 19.0667 18.4 19.2 16.4L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 9V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V9" stroke="currentColor" strokeWidth="1.5" />
          <path d="M2 7H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M15 11C15 11.5523 14.5523 12 14 12C13.4477 12 13 11.5523 13 11C13 10.4477 13.4477 10 14 10C14.5523 10 15 10.4477 15 11Z" fill="currentColor" />
          <path d="M11 11C11 11.5523 10.5523 12 10 12C9.44772 12 9 11.5523 9 11C9 10.4477 9.44772 10 10 10C10.5523 10 11 10.4477 11 11Z" fill="currentColor" />
        </svg>
      ),
      logo: '/projects/bato.png',
      background: "#ffffff",
      filter: "none",
      tags: [t('tags.rentals'), t('tags.tourism')],
      link: '/projects/bato'
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
      background: "#ffffff",
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
                  <Image 
                  style={{ backgroundColor: project.background }}
                    src={project.logo}
                    alt={`${project.title} logo`}
                    width={48}
                    height={48}
                    className={styles.projectLogo}
                    draggable='false'
                  />
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