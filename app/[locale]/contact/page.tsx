"use client";

import PageHeader from "@/components/Layout/PageHeader";
import styles from "./contact.module.scss";
import ContactCards from "@/components/ContactPage/ContactCards";
import ContactForm from "@/components/ContactPage/ContactForm";
import ContactFAQ from "@/components/ContactPage/ContactFAQ";

export default function ContactPage() {
  return (
    <main className={styles.contactPage}>
      {/* Page header */}
      <PageHeader 
        titleKey="title"
        subtitleKey="subtitle"
        badgeKey="badge"
        namespace="contact"
        highlightKey="title"
        breadcrumbs={[
          { labelKey: "home", href: "/" },
          { labelKey: "page", href: "/contact", active: true }
        ]}
      />
      
      <div className={styles.contactContent}>
        <div className={styles.container}>
          {/* Decorative elements */}
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorPattern}></div>
          <div className={styles.decorGrid}></div>
          
          {/* Top section: Info cards */}
          <ContactCards />
          
          {/* Contact form and info section */}
          <ContactForm />
          
          {/* FAQ section */}
          <ContactFAQ />
        </div>
      </div>
    </main>
  );
}