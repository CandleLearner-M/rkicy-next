"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import styles from "./ProjectsFilter.module.scss";

interface FilterOption {
  id: string;
  labelKey: string;
}

interface FilterGroup {
  id: string;
  titleKey: string;
  options: FilterOption[];
}

interface ProjectsFilterProps {
  totalProjects: number;
  filteredCount: number;
  onFilterChange: (filters: { [key: string]: string }) => void;
  activeFilters: { [key: string]: string };
}

const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
  totalProjects,
  filteredCount,
  onFilterChange,
  activeFilters,
}) => {
  const t = useTranslations("projects.filters");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeFilterNames, setActiveFilterNames] = useState<Record<string, string>>({});

  // Filter groups definition
  const filterGroups: FilterGroup[] = [
    {
      id: "industry",
      titleKey: "industry.title",
      options: [
        { id: "all", labelKey: "industry.all" },
        { id: "retail", labelKey: "industry.retail" },
        { id: "healthcare", labelKey: "industry.healthcare" },
        { id: "finance", labelKey: "industry.finance" },
        { id: "manufacturing", labelKey: "industry.manufacturing" },
        { id: "government", labelKey: "industry.government" },
      ],
    },
    {
      id: "technology",
      titleKey: "technology.title",
      options: [
        { id: "all", labelKey: "technology.all" },
        { id: "ai", labelKey: "technology.ai" },
        { id: "hardware", labelKey: "technology.hardware" },
        { id: "enterprise", labelKey: "technology.enterprise" },
        { id: "cloud", labelKey: "technology.cloud" },
        { id: "mobile", labelKey: "technology.mobile" },
      ],
    },
    {
      id: "type",
      titleKey: "type.title",
      options: [
        { id: "all", labelKey: "type.all" },
        { id: "implementation", labelKey: "type.implementation" },
        { id: "consulting", labelKey: "type.consulting" },
        { id: "development", labelKey: "type.development" },
        { id: "support", labelKey: "type.support" },
      ],
    },
  ];

  // Update active filter names for display
  useEffect(() => {
    const names: Record<string, string> = {};
    
    Object.entries(activeFilters).forEach(([groupId, optionId]) => {
      const group = filterGroups.find(g => g.id === groupId);
      if (group) {
        const option = group.options.find(o => o.id === optionId);
        if (option) {
          names[groupId] = t(option.labelKey);
        }
      }
    });
    
    setActiveFilterNames(names);
  }, [activeFilters, filterGroups, t]);

  // Handle filter button click
  const handleFilterClick = (groupId: string, optionId: string) => {
    const newFilters = { ...activeFilters };
    
    // If "all" is selected or clicking the already active option, reset this filter
    if (optionId === "all" || newFilters[groupId] === optionId) {
      delete newFilters[groupId];
    } else {
      newFilters[groupId] = optionId;
    }
    
    onFilterChange(newFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    onFilterChange({});
    setIsMobileFilterOpen(false);
  };

  // Count active filters
  const activeFiltersCount = Object.keys(activeFilters).length;

  return (
    <section className={styles.filterSection}>
      <div className={styles.filterContainer}>
        {/* Filter summary bar */}
        <motion.div 
          className={styles.filterSummary}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.filterSummaryLeft}>
            <h2 className={styles.filterTitle}>{t("title")}</h2>
            <div className={styles.filterCounter}>
              <span className={styles.filterCountBadge}>{filteredCount}</span> 
              {t("of")} {totalProjects} {t("projects")}
            </div>
          </div>

          <div className={styles.filterActions}>
            {activeFiltersCount > 0 && (
              <motion.button 
                className={styles.clearFilters}
                onClick={clearAllFilters}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <X size={16} /> {t("clearAll")}
              </motion.button>
            )}

            <button 
              className={`${styles.toggleFiltersButton} ${isMobileFilterOpen ? styles.active : ''}`}
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              aria-expanded={isMobileFilterOpen}
            >
              <Filter size={18} />
              <span>{t("filterProjects")}</span>
              <ChevronDown size={16} className={styles.chevron} />
            </button>
          </div>
        </motion.div>
        
        {/* Active filters chips */}
        {activeFiltersCount > 0 && (
          <motion.div 
            className={styles.activeFiltersRow}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {Object.entries(activeFilterNames).map(([groupId, name]) => (
              <div key={groupId} className={styles.activeFilterChip}>
                <span>{name}</span>
                <button 
                  onClick={() => handleFilterClick(groupId, activeFilters[groupId])} 
                  aria-label={`Remove ${name} filter`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </motion.div>
        )}
        
        {/* Filter groups panel */}
        <AnimatePresence>
          {(isMobileFilterOpen || window?.innerWidth >= 1024) && (
            <motion.div 
              className={styles.filterGroupsPanel}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className={styles.filterGroups}>
                {filterGroups.map((group) => (
                  <div key={group.id} className={styles.filterGroup}>
                    <h3 className={styles.filterGroupTitle}>{t(group.titleKey)}</h3>
                    <div className={styles.filterOptions}>
                      {group.options.map((option) => {
                        const isActive = activeFilters[group.id] === option.id || 
                                       (!activeFilters[group.id] && option.id === "all");
                        
                        return (
                          <motion.button
                            key={option.id}
                            className={`${styles.filterOption} ${isActive ? styles.active : ""}`}
                            onClick={() => handleFilterClick(group.id, option.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {t(option.labelKey)}
                            {isActive && option.id !== "all" && <span className={styles.activeIndicator} />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.filterPanelFooter}>
                <button 
                  className={styles.closePanelButton} 
                  onClick={() => setIsMobileFilterOpen(false)}
                >
                  {t("filterProjects")}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsFilter;