"use client";

import ContactPreview from "@/components/HomePage/ContactPreview";
import PageHeader from "@/components/Layout/PageHeader";
import styles from "./page.module.scss";

export default function ServicesPage() {
  

  return (
    <main className={styles.servicesSection}>
       <PageHeader 
          titleKey="title"
          subtitleKey="subtitle"
          badgeKey="badge"
          namespace="services"
          highlightKey="title"
          breadcrumbs={[
            { labelKey: "home", href: "/" },
            { labelKey: "page", href: "/services", active: true }
          ]}
        />
      
        <ContactPreview />
    </main>
  );
}