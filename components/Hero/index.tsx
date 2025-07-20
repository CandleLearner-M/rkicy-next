"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import styles from "./Hero.module.scss";
import HeroBackground from "./HeroBackground";
import PartnerLogos from "./PartnerLogos";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <section className={styles.heroSection} ref={ref}>
      <HeroBackground />
      
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <motion.div className={styles.headingWrapper}>
            <motion.h2 
              className={styles.preHeading}
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              Leading Morocco&apos;s Digital Transformation
            </motion.h2>
            
            <motion.h1 
              className={styles.mainHeading}
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              Empowering Morocco&apos;s
              <span className={styles.highlight}> Digital Future</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            className={styles.description}
            custom={2}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            From AI to hardware, Rkicy Technology delivers powerful, enterprise-grade 
            IT solutions for modern businesses across Morocco and beyond.
          </motion.p>
          
          <motion.div 
            className={styles.buttonGroup}
            custom={3}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <motion.div 
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              className={styles.primaryButtonWrapper}
            >
              <Link href="/services" className={styles.primaryButton}>
                Explore Our Services 
                <ChevronRight className={styles.buttonIcon} />
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              className={styles.secondaryButtonWrapper}
            >
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.9,
          }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Image
            src="/hero-image.png"
            alt="Digital Transformation Visualization"
            width={600}
            height={500}
            className={styles.heroImage}
            priority
          />
          
          <motion.div 
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              y: isInView ? 0 : 20 
            }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className={styles.statIcon}>
              <Image 
                src="/icons/clients-icon.svg" 
                alt="Client icon" 
                width={32} 
                height={32} 
              />
            </div>
            <div className={styles.statContent}>
              <p className={styles.statNumber}>200+</p>
              <p className={styles.statLabel}>Happy Clients</p>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.expertiseCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isInView ? 1 : 0, 
              y: isInView ? 0 : 20 
            }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className={styles.expertiseIcon}>
              <Image 
                src="/icons/tech-icon.svg" 
                alt="Technology icon" 
                width={32} 
                height={32} 
              />
            </div>
            <p className={styles.expertiseLabel}>Enterprise Solutions</p>
          </motion.div>
        </motion.div>
      </div>
      
      <PartnerLogos />
    </section>
  );
}