"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./ContactFAQ.module.scss";

export default function ContactFAQ() {
  const t = useTranslations("contact.faq");
  
  return (
    <motion.div 
      className={styles.faqSection}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={styles.sectionHeader}>
        <h2>{t("title")}</h2>
        <div className={styles.headerAccent}></div>
      </div>
      
      <div className={styles.faqGrid}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={styles.faqItem}>
            <h3>{t(`q${item}.question`)}</h3>
            <p>{t(`q${item}.answer`)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}