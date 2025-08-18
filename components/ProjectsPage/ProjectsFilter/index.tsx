"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Filter, ChevronDown, Check, X } from 'lucide-react';
import { projects } from '@/components/ProjectsPage/projects';
import styles from './ProjectsFilter.module.scss';

interface ProjectsFilterProps {
  totalProjects: number;
  filteredCount: number;
  onFilterChange: (filters: {[key: string]: string}) => void;
  activeFilters: {[key: string]: string};
}

export default function ProjectsFilter({
  totalProjects,
  filteredCount,
  onFilterChange,
  activeFilters
}: ProjectsFilterProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('projects');

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll for sticky filter bar
  useEffect(() => {
    const handleScroll = () => {
      if (!filterRef.current) return;
      
      const filterPos = filterRef.current.getBoundingClientRect().top;
      setIsSticky(filterPos <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle dropdown
  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  // Handle filter selection
  const handleFilterSelect = (type: string, value: string) => {
    const newFilters = { ...activeFilters };
    
    if (activeFilters[type] === value) {
      // If clicking the same filter value, remove it
      delete newFilters[type];
    } else {
      // Otherwise set the new filter value
      newFilters[type] = value;
    }
    
    onFilterChange(newFilters);
    setOpenDropdown(null);
  };

  // Get unique categories from projects
  const getUniqueCategories = () => {
    const categories = Array.from(new Set(projects.map(project => project.category)));
    return categories.sort();
  };

  // Get unique years from projects
  const getUniqueYears = () => {
    const years = Array.from(new Set(projects.map(project => project.year)));
    return years.sort((a, b) => b - a); // Sort descending
  };

  // Check if a filter is active
  const isFilterActive = (type: string, value: string) => {
    return activeFilters[type] === value;
  };

  return (
    <div 
      className={`${styles.filterContainer} ${isSticky ? styles.stickyFilter : ''}`}
      ref={filterRef}
    >
      <div className={styles.container}>
        <div className={styles.filterBar}>
          <div className={styles.filterStats}>
            <span className={styles.projectCount}>
              {filteredCount === totalProjects ? (
                t('filter.showingAll', { count: totalProjects })
              ) : (
                t('filter.showing', { count: filteredCount, total: totalProjects })
              )}
            </span>
          </div>
          
          <div className={styles.filterControls}>
            <div className={styles.filterDropdowns}>
              {/* Category filter */}
              <div className={styles.filterDropdown}>
                <button 
                  className={`${styles.dropdownButton} ${activeFilters.category ? styles.activeFilter : ''}`}
                  onClick={() => toggleDropdown('category')}
                  aria-expanded={openDropdown === 'category'}
                >
                  <span>{t('filter.category')}</span>
                  <motion.div
                    animate={{ rotate: openDropdown === 'category' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
                
                {openDropdown === 'category' && (
                  <div className={styles.dropdownMenu}>
                    {getUniqueCategories().map(category => (
                      <button 
                        key={category}
                        className={`${styles.dropdownItem} ${isFilterActive('category', category) ? styles.active : ''}`}
                        onClick={() => handleFilterSelect('category', category)}
                      >
                        <span>{t(`filter.categories.${category}`)}</span>
                        {isFilterActive('category', category) && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Status filter */}
              <div className={styles.filterDropdown}>
                <button 
                  className={`${styles.dropdownButton} ${activeFilters.status ? styles.activeFilter : ''}`}
                  onClick={() => toggleDropdown('status')}
                  aria-expanded={openDropdown === 'status'}
                >
                  <span>{t('filter.status.label')}</span>
                  <motion.div
                    animate={{ rotate: openDropdown === 'status' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
                
                {openDropdown === 'status' && (
                  <div className={styles.dropdownMenu}>
                    {['completed', 'ongoing', 'upcoming'].map(status => (
                      <button 
                        key={status}
                        className={`${styles.dropdownItem} ${isFilterActive('status', status) ? styles.active : ''}`}
                        onClick={() => handleFilterSelect('status', status)}
                      >
                        <span>{t(`filter.status.${status}`)}</span>
                        {isFilterActive('status', status) && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Year filter */}
              <div className={styles.filterDropdown}>
                <button 
                  className={`${styles.dropdownButton} ${activeFilters.year ? styles.activeFilter : ''}`}
                  onClick={() => toggleDropdown('year')}
                  aria-expanded={openDropdown === 'year'}
                >
                  <span>{t('filter.year')}</span>
                  <motion.div
                    animate={{ rotate: openDropdown === 'year' ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
                
                {openDropdown === 'year' && (
                  <div className={styles.dropdownMenu}>
                    {getUniqueYears().map(year => (
                      <button 
                        key={year}
                        className={`${styles.dropdownItem} ${isFilterActive('year', year.toString()) ? styles.active : ''}`}
                        onClick={() => handleFilterSelect('year', year.toString())}
                      >
                        <span>{year}</span>
                        {isFilterActive('year', year.toString()) && (
                          <Check size={16} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Clear filters button */}
            {Object.keys(activeFilters).length > 0 && (
              <button 
                className={styles.clearFiltersButton}
                onClick={() => onFilterChange({})}
              >
                <X size={16} />
                <span>{t('filter.clear')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}