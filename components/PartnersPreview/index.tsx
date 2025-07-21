"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./PartnersPreview.module.scss";

// Featured partners data
const featuredPartners = [
  { id: "zebra", name: "Zebra Technologies", logo: "/icons/zebra.svg" },
  { id: "sap", name: "SAP", logo: "/icons/sap.svg" },
  { id: "microsoft", name: "Microsoft", logo: "/icons/microsoft.svg" },
  { id: "openai", name: "OpenAI", logo: "/icons/openai.svg" }
];

export default function PartnersPreview() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    setIsInView(true);
  }, []);

  return (
    <section className={styles.partnersPreview}>
      <div className={styles.container}>
        <div className={styles.decorPattern}></div>
        
        <motion.div 
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.sectionTitle}>
            Our Strategic <span className={styles.highlight}>Partners</span>
          </h2>
          <p className={styles.sectionSubtitle}>
            We collaborate with global technology leaders to deliver world-class solutions to the Moroccan market
          </p>
        </motion.div>
        
        <div className={styles.partnersContainer}>
          {featuredPartners.map((partner, index) => (
            <motion.div 
              key={partner.id}
              className={styles.partnerCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
            >
              <div className={styles.logoContainer}>
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  width={120} 
                  height={60} 
                  className={styles.partnerLogo}
                />
              </div>
              <h3 className={styles.partnerName}>{partner.name}</h3>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className={styles.ctaText}>
            Our partnerships enable us to provide cutting-edge solutions tailored to your needs
          </p>
          <Link href="/partners" className={styles.viewAllButton}>
            <span>Explore All Partners</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}