"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  ChevronRight 
} from "lucide-react";
import styles from "./ContactPreview.module.scss";

export default function ContactPreview() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    setIsInView(true);
  }, []);

  return (
    <section className={styles.contactPreview}>
      <div className={styles.container}>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorPattern}></div>
        
        <motion.div 
          className={styles.contentWrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.textContent}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Ready to <span className={styles.highlight}>transform</span> your business?
            </motion.h2>
            
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Let's discuss how Rkicy Technology can help your organization thrive in the digital age
            </motion.p>
            
            <motion.div 
              className={styles.ctaButton}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href="/contact" className={styles.primaryButton}>
                <span>Get in Touch</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
          
          <div className={styles.contactOptions}>
            <motion.div 
              className={styles.optionsGrid}
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Link href="tel:+212522000000" className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <PhoneCall size={22} />
                </div>
                <div className={styles.cardContent}>
                  <h3>Call Us</h3>
                  <p>+212 5XX-XXXXXX</p>
                </div>
                <ChevronRight size={18} className={styles.cardArrow} />
              </Link>
              
              <Link href="mailto:info@rkicy.com" className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <Mail size={22} />
                </div>
                <div className={styles.cardContent}>
                  <h3>Email Us</h3>
                  <p>info@rkicy.com</p>
                </div>
                <ChevronRight size={18} className={styles.cardArrow} />
              </Link>
              
              <Link href="/contact#chat" className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <MessageSquare size={22} />
                </div>
                <div className={styles.cardContent}>
                  <h3>Live Chat</h3>
                  <p>Chat with our team</p>
                </div>
                <ChevronRight size={18} className={styles.cardArrow} />
              </Link>
              
              <Link href="/contact#schedule" className={styles.contactCard}>
                <div className={styles.cardIcon}>
                  <Calendar size={22} />
                </div>
                <div className={styles.cardContent}>
                  <h3>Schedule a Call</h3>
                  <p>Book a consultation</p>
                </div>
                <ChevronRight size={18} className={styles.cardArrow} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}