'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import styles from './ProjectCard.module.scss';

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

export default function ProjectCard({ 
  project, 
  index 
}: { 
  project: ProjectProps;
  index: number;
}) {
  const t = useTranslations('projects');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div 
      className={styles.projectCard}
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
    >
      <div className={styles.imageWrapper}>
        <Image 
          src={project.coverImage} 
          alt={project.title}
          width={400}
          height={225}
          className={styles.projectImage}
        />
        
        <div className={styles.logoOverlay}>
          <Image 
            src={project.logo} 
            alt={`${project.title} logo`}
            width={32}
            height={32}
            className={styles.projectLogo}
          />
        </div>
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.subtitle}</p>
        
        <div className={styles.tagsContainer}>
          {project.tags.slice(0, 2).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
          {project.tags.length > 2 && (
            <span className={styles.tagCount}>+{project.tags.length - 2}</span>
          )}
        </div>
        
        <Link href={`/projects/${project.id}`} className={styles.projectLink}>
          <span>{t('viewDetails')}</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}