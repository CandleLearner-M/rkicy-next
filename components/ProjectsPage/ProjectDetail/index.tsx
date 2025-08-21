"use client";

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle, 
  ExternalLink, 
  Github, 
  Globe, 
  Users, 
  ChevronLeft
} from 'lucide-react';
import { Project } from '../projects';
import PageHeader from '@/components/Layout/PageHeader';
import SectionBackground from '@/components/Layout/SectionBackground/SectionBackground';
import ContactPreview from '@/components/HomePage/ContactPreview';
import styles from './ProjectDetail.module.scss';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const t = useTranslations();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className={styles.projectDetailPage}>
      <PageHeader 
        titleKey="title"
        subtitleKey="subtitle"
        badgeKey="badge"
        namespace="projectDetail"
        breadcrumbs={[
          { labelKey: "home", href: "/" },
          { labelKey: "projects", href: "/projects" },
          { labelKey: "project", href: `/projects/${project.id}`, active: true }
        ]}
      />

      {/* Project Hero Section */}
      <section className={styles.projectHero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.projectInfo}>
              <div className={`${styles.backLink} ${isLoaded ? styles.loaded : ''}`}>
                <Link href="/projects" className={styles.backButton}>
                  <ChevronLeft size={18} />
                  <span>Back to Projects</span>
                </Link>
              </div>
              
              <div className={`${styles.projectMeta} ${isLoaded ? styles.loaded : ''}`}>
                <span className={styles.projectBadge}>
                  {t(project.categoryKey)}
                </span>
                <span className={styles.projectYear}>{project.year}</span>
                <span className={styles.projectStatus}>
                  {project.status}
                </span>
              </div>

              <h1 className={`${styles.projectTitle} ${isLoaded ? styles.loaded : ''}`}>
                {t(project.titleKey)}
              </h1>

              <p className={`${styles.projectDescription} ${isLoaded ? styles.loaded : ''}`}>
                {project.detailedDescriptionKey ? 
                  t(project.detailedDescriptionKey) : 
                  t(project.descriptionKey)
                }
              </p>

              <div className={`${styles.projectDetails} ${isLoaded ? styles.loaded : ''}`}>
                {project.client && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Client</span>
                    <span className={styles.detailValue}>{project.client}</span>
                  </div>
                )}
                {project.duration && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Duration</span>
                    <span className={styles.detailValue}>{project.duration}</span>
                  </div>
                )}
                {project.teamSize && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Team Size</span>
                    <span className={styles.detailValue}>{project.teamSize} members</span>
                  </div>
                )}
                {project.industry && (
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Industry</span>
                    <span className={styles.detailValue}>{project.industry}</span>
                  </div>
                )}
              </div>

              <div className={`${styles.projectActions} ${isLoaded ? styles.loaded : ''}`}>
                {project.externalUrl ? (
                  <a 
                    href={project.externalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.primaryButton}
                  >
                    <span>View Live Project</span>
                    <ExternalLink size={18} />
                  </a>
                ) : (
                  <Link href={project.slug} className={styles.primaryButton}>
                    <span>View Project</span>
                    <ArrowRight size={18} />
                  </Link>
                )}
              </div>
            </div>

            <div className={styles.projectVisual}>
              <div className={`${styles.projectImageContainer} ${isLoaded ? styles.loaded : ''}`}>
                <div className={styles.projectImage}>
                  <Image
                    src={project.image}
                    alt={t(project.titleKey)}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div className={styles.imageOverlay} />
                </div>
                {project.logo && (
                  <div className={styles.projectLogo}>
                    <Image
                      src={project.logo}
                      alt={`${project.id} logo`}
                      width={60}
                      height={60}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <SectionBackground style="subtle">
        <section className={styles.projectStats}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              {project.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={styles.statItem}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.statIcon}>
                    {stat.icon}
                  </div>
                  <div className={styles.statContent}>
                    <div className={styles.statValue}>
                      {t(stat.valueKey)}
                    </div>
                    <div className={styles.statLabel}>
                      {t(stat.labelKey)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </SectionBackground>

      {/* Technologies Used */}
      <section className={styles.technologiesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Technologies Used</h2>
          <div className={styles.technologiesGrid}>
            {project.technologies.map((tech, index) => (
              <motion.div
                key={index}
                className={styles.technologyItem}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span>{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <SectionBackground style="subtle">
          <section className={styles.projectGallery}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Project Gallery</h2>
              <div className={styles.galleryContainer}>
                <div className={styles.mainImage}>
                  <Image
                    src={project.gallery[activeImageIndex]}
                    alt={`${t(project.titleKey)} screenshot ${activeImageIndex + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className={styles.thumbnails}>
                  {project.gallery.map((image, index) => (
                    <button
                      key={index}
                      className={`${styles.thumbnail} ${
                        activeImageIndex === index ? styles.active : ''
                      }`}
                      onClick={() => setActiveImageIndex(index)}
                    >
                      <Image
                        src={image}
                        alt={`${t(project.titleKey)} thumbnail ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionBackground>
      )}

      {/* Challenges, Solutions & Outcomes */}
      {(project.challenges || project.solutions || project.outcomes) && (
        <section className={styles.projectProcess}>
          <div className={styles.container}>
            <div className={styles.processGrid}>
              {project.challenges && (
                <div className={styles.processSection}>
                  <h3 className={styles.processTitle}>Challenges</h3>
                  <ul className={styles.processList}>
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className={styles.processItem}>
                        {t(challenge)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.solutions && (
                <div className={styles.processSection}>
                  <h3 className={styles.processTitle}>Solutions</h3>
                  <ul className={styles.processList}>
                    {project.solutions.map((solution, index) => (
                      <li key={index} className={styles.processItem}>
                        {t(solution)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.outcomes && (
                <div className={styles.processSection}>
                  <h3 className={styles.processTitle}>Outcomes</h3>
                  <ul className={styles.processList}>
                    {project.outcomes.map((outcome, index) => (
                      <li key={index} className={styles.processItem}>
                        {t(outcome)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <SectionBackground style="subtle">
          <section className={styles.testimonialSection}>
            <div className={styles.container}>
              <div className={styles.testimonial}>
                <blockquote className={styles.testimonialQuote}>
                  "{t(project.testimonial.quoteKey)}"
                </blockquote>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.authorName}>
                    {t(project.testimonial.authorKey)}
                  </div>
                  <div className={styles.authorRole}>
                    {t(project.testimonial.roleKey)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SectionBackground>
      )}

      <ContactPreview />
    </main>
  );
};

export default ProjectDetail;