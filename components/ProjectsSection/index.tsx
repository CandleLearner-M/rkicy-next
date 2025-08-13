"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, Globe, ShoppingCart, CreditCard, Boxes, Shirt } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProjectsSection.module.scss';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const t = useTranslations('home.projects');
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className={styles.projectsSection} ref={ref}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.div 
            className={styles.badge}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            {t('badge')}
          </motion.div>
          
          <motion.h2 
            className={styles.title}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            {t.rich('title', {
              highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
            })}
          </motion.h2>
          
          <motion.p 
            className={styles.description}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={itemVariants}
          >
            {t('description')}
          </motion.p>
        </div>

        <motion.div 
          className={styles.projectsGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Project 1 */}
          <motion.div className={styles.projectCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <span className={styles.projectNumber}>01</span>
              <CreditCard className={styles.projectIcon} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>Paycov</h3>
              <p className={styles.projectDescription}>
                {t('projects.paycov.description')}
              </p>
              <div className={styles.projectTags}>
                <span className={styles.tag}>{t('tags.fintech')}</span>
                <span className={styles.tag}>{t('tags.payments')}</span>
              </div>
            </div>
            <Link href="/projects/paycov" className={styles.cardLink}>
              <span>{t('viewProject')}</span>
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          
          {/* Project 2 */}
          <motion.div className={styles.projectCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <span className={styles.projectNumber}>02</span>
              <Boxes className={styles.projectIcon} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>Finish3</h3>
              <p className={styles.projectDescription}>
                {t('projects.finish3.description')}
              </p>
              <div className={styles.projectTags}>
                <span className={styles.tag}>{t('tags.manufacturing')}</span>
                <span className={styles.tag}>{t('tags.logistics')}</span>
              </div>
            </div>
            <Link href="/projects/finish3" className={styles.cardLink}>
              <span>{t('viewProject')}</span>
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          
          {/* Project 3 */}
          <motion.div className={styles.projectCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <span className={styles.projectNumber}>03</span>
              <ShoppingCart className={styles.projectIcon} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>Bato.ma</h3>
              <p className={styles.projectDescription}>
                {t('projects.bato.description')}
              </p>
              <div className={styles.projectTags}>
                <span className={styles.tag}>{t('tags.ecommerce')}</span>
                <span className={styles.tag}>{t('tags.marketplace')}</span>
              </div>
            </div>
            <Link href="/projects/bato" className={styles.cardLink}>
              <span>{t('viewProject')}</span>
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
          
          {/* Project 4 */}
          <motion.div className={styles.projectCard} variants={itemVariants}>
            <div className={styles.cardHeader}>
              <span className={styles.projectNumber}>04</span>
              <Shirt className={styles.projectIcon} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.projectTitle}>Nounours</h3>
              <p className={styles.projectDescription}>
                {t('projects.nounours.description')}
              </p>
              <div className={styles.projectTags}>
                <span className={styles.tag}>{t('tags.ecommerce')}</span>
                <span className={styles.tag}>{t('tags.retail')}</span>
              </div>
            </div>
            <Link href="https://nounours.ma/" target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              <span>{t('visitSite')}</span>
              <Globe size={16} />
            </Link>
          </motion.div>
          
          {/* More Projects Button */}
          <motion.div className={styles.moreProjectsWrapper} variants={itemVariants}>
            <Link href="/projects" className={styles.moreProjectsButton}>
              <span>{t('viewAllProjects')}</span>
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;