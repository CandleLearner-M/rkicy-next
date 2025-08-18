'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './Projects.module.scss';
import PageHeader from '@/components/Layout/PageHeader';
import ContactPreview from '@/components/HomePage/ContactPreview';
import ProjectsFilter from '@/components/ProjectsPage/ProjectsFilter';
import ProjectsGrid from '@/components/ProjectsPage/ProjectsGrid';
import { projects } from '@/components/ProjectsPage/projects';
import FeaturedProjects from '@/components/ProjectsPage/FeaturedProjects';
import SectionBackground from '@/components/Layout/SectionBackground/SectionBackground';

export default function ProjectsPage() {
  const [filters, setFilters] = useState<{[key: string]: string}>({});
  const t = useTranslations('projects');
  
  // Apply filters to projects
  const filteredProjects = projects.filter(project => {
    // Check if project matches all active filters
    for (const [key, value] of Object.entries(filters)) {
      if (project[key] !== value) {
        return false;
      }
    }
    return true;
  });
  
  // Handle filter changes
  const handleFilterChange = (newFilters: {[key: string]: string}) => {
    setFilters(newFilters);
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({});
  };

  return (
    <main className={styles.projectsPage}>
      <PageHeader 
        titleKey="title"
        subtitleKey="subtitle"
        badgeKey="badge"
        namespace="projects"
        highlightKey="title"
        breadcrumbs={[
          { labelKey: "home", href: "/" },
          { labelKey: "page", href: "/projects", active: true }
        ]}
      />

      <FeaturedProjects />
      
      <SectionBackground style="subtle">
        <ProjectsFilter 
          totalProjects={projects.length}
          filteredCount={filteredProjects.length}
          onFilterChange={handleFilterChange}
          activeFilters={filters}
        />
        
        <ProjectsGrid 
          projects={filteredProjects}
          filters={filters}
          onResetFilters={resetFilters}
        />
      </SectionBackground>
     
      <ContactPreview />
    </main>
  );
}