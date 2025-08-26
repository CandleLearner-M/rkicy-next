"use client";

import ContactPreview from "@/components/HomePage/ContactPreview";
import PageHeader from "@/components/Layout/PageHeader";
import styles from "./page.module.scss";
import ServiceCategories from "@/components/ServicesPage/ServiceCategories";
import SectionBackground from "@/components/Layout/SectionBackground/SectionBackground";
import ClientTestimonials from "@/components/ServicesPage/ServiceFeatures";
import BusinessBenefits from "@/components/ServicesPage/BusinessBenefits";
import ServiceFeatures from "@/components/ServicesPage/ServiceFeatures";

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
      
        <ServiceCategories />
      
        <SectionBackground style="subtle">
          <ServiceFeatures />
        </SectionBackground>
      
        <BusinessBenefits />

        <ContactPreview />
    </main>
  );
}