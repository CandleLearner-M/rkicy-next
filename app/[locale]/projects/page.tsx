'use client';

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
  const t = useTranslations('projects');
  
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
        <ProjectsGrid 
          projects={projects}
        />
      </SectionBackground>
     
      <ContactPreview />
    </main>
  );
}