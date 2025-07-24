'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import styles from './FeaturedProject.module.scss';

interface ProjectProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  logo: string;
  tags: string[];
  featured: boolean;
}

export default function FeaturedProject({ project }: { project: ProjectProps }) {
  const t = useTranslations('projects');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <div className={styles.featuredProject} ref={ref}>
      <motion.div 
        className={styles.projectContent}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className={styles.projectHeader}>
          <div className={styles.logoContainer}>
            <Image 
              src={project.logo} 
              alt={project.title} 
              width={48}
              height={48}
              className={styles.projectLogo}
            />
          </div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
        </div>
        
        <p className={styles.projectSubtitle}>{project.subtitle}</p>
        
        <div className={styles.tagsContainer}>
          {project.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
        
        <p className={styles.projectDescription}>{project.description}</p>
        
        <Link href={`/projects/${project.id}`} className={styles.projectLink}>
          <span>{t('viewProject')}</span>
          <ArrowRight size={18} />
        </Link>
      </motion.div>
      
      <motion.div 
        className={styles.projectImageContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={styles.imageWrapper}>
          <div className={styles.glowEffect}></div>
          <Image 
            src={project.coverImage} 
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.projectImage}
          />
        </div>
      </motion.div>
    </div>
  );
}