'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ProjectsHero from '@/components/projects/ProjectsHero';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectCard from '@/components/projects/ProjectCard';
import styles from './Projects.module.scss';

export default function ProjectsPage() {
  const t = useTranslations('projects');
  
  // List of projects
  const projects = [
    {
      id: 'paycov',
      title: 'Paycov',
      subtitle: t('paycov.subtitle'),
      description: t('paycov.shortDescription'),
      coverImage: '/projects/paycov/cover.png',
      logo: '/projects/paycov/logo.svg',
      tags: ['Fintech', 'Mobile App', 'Payments'],
      featured: true,
    },
    // Add more projects here
  ];
  
  const featuredProject = projects.find(project => project.featured);
  const regularProjects = projects.filter(project => !project.featured);
  
  return (
    <main className={styles.projectsPage}>
      <ProjectsHero />
      
      <section className={styles.projectsContainer}>
        <div className={styles.container}>
          <motion.div 
            className={styles.sectionHeading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>{t('featuredWork')}</h2>
            <p>{t('featuredWorkSubtitle')}</p>
          </motion.div>
          
          {featuredProject && (
            <FeaturedProject project={featuredProject} />
          )}
        </div>
      </section>
      
      {regularProjects.length > 0 && (
        <section className={styles.allProjectsSection}>
          <div className={styles.container}>
            <motion.div 
              className={styles.sectionHeading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2>{t('allProjects')}</h2>
              <p>{t('allProjectsSubtitle')}</p>
            </motion.div>
            
            <div className={styles.projectsGrid}>
              {regularProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}