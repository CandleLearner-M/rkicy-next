"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Cloud, 
  Shield, 
  ChevronRight, 
  Code 
} from "lucide-react";
import Link from "next/link";
import styles from "./ServicesPreview.module.scss";

const ServicesPreview = () => {
  const [isInView, setIsInView] = useState(false);
  
  // Set isInView after component mount to trigger animations
  useEffect(() => {
    setIsInView(true);
  }, []);
  
  // Featured services (subset of all services)
  const featuredServices = [
    {
      id: 'ai-solutions',
      icon: <BrainCircuit size={32} />,
      name: 'AI Solutions',
      description: 'Transforming business operations with intelligent automation, data analytics, and machine learning solutions tailored for Moroccan enterprises.',
      popular: true
    },
    {
      id: 'cloud-solutions',
      icon: <Cloud size={32} />,
      name: 'Cloud Solutions',
      description: 'Accelerate your digital transformation with our enterprise-grade cloud solutions designed for scalability, security, and performance.',
      popular: true
    },
    {
      id: 'cybersecurity',
      icon: <Shield size={32} />,
      name: 'Cybersecurity',
      description: 'Protect your business with advanced cybersecurity solutions that safeguard your data, infrastructure, and digital assets from evolving threats.',
      popular: false
    },
    {
      id: 'software-development',
      icon: <Code size={32} />,
      name: 'Software Development',
      description: 'Custom software solutions designed and developed to address your unique business challenges and opportunities.',
      popular: false
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section className={styles.servicesPreview}>
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={styles.decorPattern}></div>
        <div className={styles.decorBlur}></div>
        
        {/* Section header */}
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h6 className={styles.overline} variants={itemVariants}>
            Our Expertise
          </motion.h6>
          <motion.h2 className={styles.heading} variants={itemVariants}>
            Comprehensive <span className={styles.highlight}>IT Solutions</span> for Business Success
          </motion.h2>
          <motion.p className={styles.subheading} variants={itemVariants}>
            We deliver enterprise-grade technology services and solutions tailored to your specific business needs.
          </motion.p>
        </motion.div>
        
        {/* Services grid */}
        <motion.div 
          className={styles.servicesGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {featuredServices.map((service, index) => (
            <motion.div 
              key={service.id}
              className={styles.serviceCard}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className={styles.serviceHeader}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                {service.popular && (
                  <span className={styles.popularBadge}>Popular</span>
                )}
              </div>
              <h3 className={styles.serviceName}>{service.name}</h3>
              <p className={styles.serviceDescription}>
                {service.description}
              </p>
              <Link href={`/services/${service.id}`} className={styles.serviceLink}>
                <span>Learn more</span>
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all services CTA */}
        <motion.div 
          className={styles.viewAllContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/services" className={styles.viewAllButton}>
            <span>Explore All Services</span>
            <ChevronRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesPreview;