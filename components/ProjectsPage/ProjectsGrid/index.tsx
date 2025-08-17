"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Search, RefreshCw } from "lucide-react";
import styles from "./ProjectsGrid.module.scss";

interface ProjectTag {
  id: string;
  name: string;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  client: string;
  description: string;
  image: string;
  industry: string;
  technology: string;
  type: string;
  tags: ProjectTag[];
}

interface ProjectsGridProps {
  projects: Project[];
  filters: { [key: string]: string };
  onResetFilters: () => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  projects,
  filters,
  onResetFilters,
}) => {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [visibleProjects, setVisibleProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [visibleCount, setVisibleCount] = useState(6);
  
  // Apply filters when they change
  useEffect(() => {
    const filtered = projects.filter(project => {
      // Check if project matches all active filters
      for (const [key, value] of Object.entries(filters)) {
        if (project[key] !== value) {
          return false;
        }
      }
      return true;
    });
    
    setFilteredProjects(filtered);
    setVisibleCount(6); // Reset visible count when filters change
  }, [filters, projects]);
  
  // Update visible projects
  useEffect(() => {
    setVisibleProjects(filteredProjects.slice(0, visibleCount));
  }, [filteredProjects, visibleCount]);
  
  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1]
      }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
  };

  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <AnimatePresence mode="wait">
          {filteredProjects.length === 0 ? (
            <motion.div 
              key="no-results"
              className={styles.noResults}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles.noResultsIcon}>
                <Search size={32} />
              </div>
              <h3 className={styles.noResultsTitle}>{t("noResults.title")}</h3>
              <p className={styles.noResultsText}>{t("noResults.message")}</p>
              <button 
                className={styles.resetButton} 
                onClick={onResetFilters}
              >
                <RefreshCw size={18} />
                {t("noResults.reset")}
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="results"
              initial="hidden" 
              animate="visible"
              className={styles.projectsGrid}
            >
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  custom={index}
                  variants={cardVariants}
                  className={styles.projectCard}
                >
                  <div className={styles.imageContainer}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      className={styles.projectImage}
                      width={400}
                      height={220}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                    />
                  </div>
                  
                  <div className={styles.projectContent}>
                    <span className={styles.clientName}>{project.client}</span>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.projectTags}>
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag.id} className={styles.projectTag}>
                          {tag.name}
                        </span>
                      ))}
                    </div>
                    
                    <Link href={`/${locale}/projects/${project.slug}`} passHref>
                      <button className={styles.viewDetailsButton}>
                        {t("viewDetails")}
                        <ArrowRight size={16} />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
        {visibleProjects.length < filteredProjects.length && (
          <div className={styles.loadMoreContainer}>
            <motion.button
              className={styles.loadMoreButton}
              onClick={loadMore}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("loadMore")}
              <ArrowRight size={16} />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;