"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./AboutPreview.module.scss";

export default function AboutPreview() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    setIsInView(true);
  }, []);
  
  return (
    <section className={styles.aboutPreview}>
      <div className={styles.container}>
        <div className={styles.decorCircle}></div>
        
        <div className={styles.aboutContent}>
          <motion.div 
            className={styles.aboutText}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={styles.sectionTitle}>
              Who <span className={styles.highlight}>We Are</span>
            </h2>
            
            <p className={styles.leadText}>
              Morocco's leading IT solutions provider, delivering enterprise-grade technology 
              that bridges local expertise with global innovation.
            </p>
            
            <p className={styles.bodyText}>
              Founded in 2023, Rkicy Technology combines deep industry knowledge with cutting-edge
              solutions to transform how Moroccan businesses leverage technology. From AI implementation
              to hardware distribution, we're committed to making advanced technology accessible to
              businesses of all sizes.
            </p>
            
            <div className={styles.valueProps}>
              <div className={styles.valueProp}>
                <div className={styles.valueIcon}>
                  <Globe size={24} />
                </div>
                <div>
                  <h3>Our Vision</h3>
                  <p>To be the cornerstone of Morocco's digital future.</p>
                </div>
              </div>
              
              <div className={styles.valueProp}>
                <div className={styles.valueIcon}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h3>Our Mission</h3>
                  <p>Empowering businesses with technology that drives growth.</p>
                </div>
              </div>
            </div>
            
            <Link href="/about" className={styles.learnMoreButton}>
              <span>Discover Our Story</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
          
          <motion.div 
            className={styles.aboutImage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.95 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className={styles.imageFrame}>
              <Image 
                src="/about-company.jpg" 
                alt="Rkicy Technology team"
                width={500}
                height={350}
                className={styles.mainImage}
              />
              <div className={styles.statBadge}>
                <span>Est.</span>
                <strong>2023</strong>
              </div>
              <div className={styles.statsOverlay}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>10+</span>
                  <span className={styles.statLabel}>Tech Experts</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>20+</span>
                  <span className={styles.statLabel}>Clients Served</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}