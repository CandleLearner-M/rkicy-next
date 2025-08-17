'use client';

import ContactPreview from '@/components/HomePage/ContactPreview';
import PageHeader from '@/components/Layout/PageHeader';
import FeaturedProjects from '@/components/ProjectsPage/FeaturedProjects';
import styles from './Projects.module.scss';

export default function ProjectsPage() {


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

      <ContactPreview />
    </main>
  );
}