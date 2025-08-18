"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '../projects';
import {
  Filter,
  ChevronDown,
  X,
  CheckCircle,
  Clock,
  Sparkle,
  Layers,
  Cpu,
  BadgeCheck,
  ArrowRight,
  Construction
} from 'lucide-react';
import styles from './ProjectsGrid.module.scss';
import QuickViewModal from '../QuickViewModal';

type FilterCategory = 'industry' | 'technology' | 'status';

const filterCategories: Record<FilterCategory, string[]> = {
  industry: ['all', 'fintech', 'ecommerce', 'productivity', 'healthcare', 'education'],
  technology: ['all', 'React', 'Node.js', 'Mobile', 'Shopify', 'PostgreSQL', 'Firebase'],
  status: ['all', 'completed', 'ongoing', 'upcoming']
};

interface ProjectGridProps {
  projects: Project[];
  filters: {[key: string]: string};
  onResetFilters: () => void;
}

export default function ProjectsGrid({ projects, filters, onResetFilters }: ProjectGridProps) {
  const t = useTranslations('projects');
  const [activeFilters, setActiveFilters] = useState({
    industry: 'all',
    technology: 'all',
    status: 'all'
  });
  const [openDropdown, setOpenDropdown] = useState<FilterCategory | null>(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRefs = {
    industry: useRef<HTMLDivElement | null>(null),
    technology: useRef<HTMLDivElement | null>(null),
    status: useRef<HTMLDivElement | null>(null)
  };

  useEffect(() => setIsLoaded(true), []);
  
  // Update activeFilters when external filters change
useEffect(() => {
  if (filters && typeof filters === 'object') { // Add this check
    const newFilters = {...activeFilters};
    let changed = false;
    
    Object.entries(filters).forEach(([key, value]) => {
      if (key in activeFilters && activeFilters[key as FilterCategory] !== value) {
        newFilters[key as FilterCategory] = value;
        changed = true;
      }
    });
    
    if (changed) {
      setActiveFilters(newFilters);
    }
  }
}, [filters]);

  /* Filtering */
  useEffect(() => {
    const filtered = projects.filter(p => {
      const industryMatch =
        activeFilters.industry === 'all' ||
        p.industry?.toLowerCase() === activeFilters.industry ||
        p.category === activeFilters.industry;

      const techMatch =
        activeFilters.technology === 'all' ||
        p.technologies.some(tech =>
          tech.toLowerCase().includes(activeFilters.technology.toLowerCase())
        );

      const statusMatch =
        activeFilters.status === 'all' || p.status === activeFilters.status;

      return industryMatch && techMatch && statusMatch;
    });
    setFilteredProjects(filtered);
  }, [activeFilters, projects]);

  const handleFilterChange = (category: FilterCategory, value: string) => {
    setActiveFilters(prev => ({ ...prev, [category]: value }));
    setOpenDropdown(null);
  };

  const clearFilter = (category: FilterCategory) =>
    setActiveFilters(prev => ({ ...prev, [category]: 'all' }));

  const clearAll = () => {
    setActiveFilters({ industry: 'all', technology: 'all', status: 'all' });
    onResetFilters();
  };

  const toggleDropdown = (cat: FilterCategory) =>
    setOpenDropdown(prev => (prev === cat ? null : cat));

  const getFilterLabel = (category: FilterCategory, value: string) => {
    if (value === 'all') return t('grid.filters.all');
    if (category === 'industry' || category === 'status')
      return t(`grid.filters.${category}.${value}`);
    return value;
  };
  
  // Modal handlers
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  const closeProjectModal = () => {
    setIsModalOpen(false);
    // Clear selected project after animation completes
    setTimeout(() => setSelectedProject(null), 300);
  };

  /* Outside click for dropdowns */
  const outsideClickHandler = useCallback(
    (e: MouseEvent) => {
      if (!openDropdown) return;
      const ref = dropdownRefs[openDropdown].current;
      if (ref && !ref.contains(e.target as Node)) setOpenDropdown(null);
    },
    [openDropdown]
  );

  useEffect(() => {
    document.addEventListener('mousedown', outsideClickHandler);
    return () => document.removeEventListener('mousedown', outsideClickHandler);
  }, [outsideClickHandler]);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={14} />;
      case 'ongoing':
        return <Clock size={14} />;
      default:
        return <Sparkle size={14} />;
    }
  };

  const dropdownMotion = {
    initial: { opacity: 0, y: -6, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.98 },
    transition: { duration: 0.18, ease: 'easeOut' }
  };

  return (
    <section className={styles.projectGridSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <div className={styles.sectionBadge}>{t('grid.badge')}</div>
          <h2 className={styles.sectionTitle}>
            {t('grid.title.start')}{' '}
            <span className={styles.highlight}>{t('grid.title.highlight')}</span>{' '}
            {t('grid.title.end')}
          </h2>
          <p className={styles.sectionDescription}>{t('grid.description')}</p>
        </div>

        {/* Filter Bar */}
        <div className={styles.filtersShell}>
          <div className={styles.filterRow}>
            {(Object.keys(filterCategories) as FilterCategory[]).map(category => {
              const activeValue = activeFilters[category];
              const isActive = activeValue !== 'all';
              const icon =
                category === 'industry' ? (
                  <Layers size={14} />
                ) : category === 'technology' ? (
                  <Cpu size={14} />
                ) : (
                  <BadgeCheck size={14} />
                );
              return (
                <div
                  key={category}
                  className={`${styles.filterControl} ${
                    openDropdown === category ? styles.open : ''
                  }`}
                  ref={dropdownRefs[category]}
                >
                  <button
                    type="button"
                    className={`${styles.filterTrigger} ${
                      isActive ? styles.filled : ''
                    }`}
                    onClick={() => toggleDropdown(category)}
                    aria-haspopup="listbox"
                    aria-expanded={openDropdown === category}
                  >
                    <span className={styles.triggerIcon}>{icon}</span>
                    <span className={styles.triggerLabel}>
                      {t(`grid.filterCategories.${category}`)}
                    </span>
                    {isActive && (
                      <span className={styles.triggerValue}>
                        {getFilterLabel(category, activeValue)}
                      </span>
                    )}
                    <ChevronDown
                      size={16}
                      className={styles.chevron}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence>
                    {openDropdown === category && (
                      <motion.ul
                        className={styles.dropdown}
                        role="listbox"
                        aria-label={t(`grid.filterCategories.${category}`)}
                        {...dropdownMotion}
                      >
                        {filterCategories[category].map(value => {
                          const selected = activeFilters[category] === value;
                          return (
                            <li key={value}>
                              <button
                                type="button"
                                role="option"
                                aria-selected={selected}
                                className={`${styles.dropdownItem} ${
                                  selected ? styles.selected : ''
                                }`}
                                onClick={() =>
                                  handleFilterChange(category, value)
                                }
                              >
                                <span className={styles.optionText}>
                                  {getFilterLabel(category, value)}
                                </span>
                                {selected && (
                                  <span className={styles.tick}>
                                    <CheckCircle size={14} />
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <button
                      type="button"
                      className={styles.clearSingle}
                      onClick={() => clearFilter(category)}
                      aria-label={t('grid.clearAllFilters')}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              );
            })}
            {Object.values(activeFilters).some(v => v !== 'all') && (
              <button
                type="button"
                className={styles.clearAll}
                onClick={clearAll}
              >
                {t('grid.clearAllFilters')}
              </button>
            )}
          </div>

            <div className={styles.resultsBar}>
              <div className={styles.resultsInfo}>
                <Filter size={14} />
                <span>
                  {t('grid.showingResults', { count: filteredProjects.length })}
                </span>
              </div>
              <div className={styles.activeChips}>
                {(Object.keys(activeFilters) as FilterCategory[])
                  .filter(cat => activeFilters[cat] !== 'all')
                  .map(cat => (
                    <motion.div
                      key={cat}
                      className={styles.activeChip}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                    >
                      <span className={styles.chipLabel}>
                        {t(`grid.filterCategories.${cat}`)}:
                      </span>
                      <span className={styles.chipValue}>
                        {getFilterLabel(cat, activeFilters[cat])}
                      </span>
                      <button
                        className={styles.chipClose}
                        onClick={() => clearFilter(cat)}
                        aria-label={`Clear ${cat}`}
                      >
                        <X size={12} />
                      </button>
                    </motion.div>
                  ))}
                <AnimatePresence>
                  {Object.values(activeFilters).every(v => v === 'all') && (
                    <motion.span
                      className={styles.noActive}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                    >
                      {t('grid.noActiveFilters')}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className={`${styles.projectsGrid} ${isLoaded ? styles.loaded : ''}`}
          layout
        >
          <AnimatePresence>
            {filteredProjects.map(project => (
              <motion.div
                key={project.id}
                className={styles.projectCard}
                layoutId={`card-${project.id}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
              >
                <div className={styles.cardMedia}>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.id}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className={styles.mediaPlaceholder}>
                      <Construction size={32} />
                      <span>{t('grid.underConstruction')}</span>
                    </div>
                  )}
                  <div
                    className={`${styles.statusBadge} ${styles[project.status]}`}
                  >
                    {statusIcon(project.status)}
                    <span>{t(`grid.status.${project.status}`)}</span>
                  </div>
                  {project.logo && (
                    <div className={styles.logoBadge}>
                      <Image
                        src={project.logo}
                        alt={`${project.id} logo`}
                        fill
                        sizes="64px"
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.categoryLine}>
                    {t(`grid.categories.${project.category}`, {
                      fallback: project.category
                    })}
                  </div>
                  <h3 className={styles.cardTitle}>{t(project.titleKey)}</h3>
                  <p className={styles.cardExcerpt}>
                    {t(project.descriptionKey)}
                  </p>

                  <div className={styles.stackRow}>
                    {project.technologies.slice(0, 4).map(tech => (
                      <span key={tech} className={styles.stackPill}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className={styles.stackMore}>
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardFooter}>
                    <button
                      type="button"
                      className={styles.actionGhost}
                      onClick={() => openProjectModal(project)}
                      aria-label={t('grid.quickViewAriaLabel', { project: t(project.titleKey) })}
                    >
                      {t('grid.quickView')}
                    </button>
                    <Link
                      href={project.slug}
                      className={styles.actionPrimary}
                    >
                      <span>{t('grid.viewDetails')}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <Filter size={32} />
              </div>
              <h3>{t('grid.noResultsTitle')}</h3>
              <p>{t('grid.noResultsText')}</p>
              <button className={styles.resetBtn} onClick={clearAll}>
                {t('grid.resetFilters')}
              </button>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Quick View Modal */}
      <QuickViewModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeProjectModal} 
      />
    </section>
  );
}