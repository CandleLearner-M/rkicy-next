'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowUpRight, CreditCard, Boxes, ShoppingCart, Shirt } from 'lucide-react';
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
      icon: <CreditCard className={styles.projectIcon} />,
      tags: [t('tags.fintech'), t('tags.payments')],
      link: '/projects/paycov'
    },
    {
      id: '02',
      title: 'Finish3',
      description: t('projects.finish3.description'),
      icon: <Boxes className={styles.projectIcon} />,
      tags: [t('tags.manufacturing'), t('tags.logistics')],
      link: '/projects/finish3'
    },
    {
      id: '03',
      title: 'Bato.ma',
      description: t('projects.bato.description'),
      icon: <ShoppingCart className={styles.projectIcon} />,
      tags: [t('tags.ecommerce'), t('tags.marketplace')],
      link: '/projects/bato'
    },
    {
      id: '04',
      title: 'Nounours',
      description: t('projects.nounours.description'),
      icon: <Shirt className={styles.projectIcon} />,
      tags: [t('tags.ecommerce'), t('tags.retail')],
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
                className={styles.projectCard}
                variants={projectCardVariants}
                whileHover="hover"
              >
                <div className={styles.projectHeader}>
                  {project.icon}
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