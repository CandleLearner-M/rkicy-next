"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import styles from "./Hero.module.scss";
import PartnerLogos from "./PartnerLogos";
import HeroCards from "./HeroCards";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03, 
      boxShadow: "0 10px 25px rgba(66, 153, 225, 0.35)",
      transition: { 
        duration: 0.2,
        ease: "easeOut"
      } 
    },
  };

  return (
    <section className={styles.heroSection} ref={ref}>
      
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <motion.div className={styles.headingWrapper}>
            <motion.div 
              className={styles.preHeadingWrapper}
              custom={0}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              <span className={styles.preHeadingPill}>
                Leading Morocco&apos;s Digital Transformation
              </span>
            </motion.div>
            
            <motion.h1 
              className={styles.mainHeading}
              custom={1}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={textVariants}
            >
              Empowering Morocco&apos;s{" "}
              <span className={styles.highlight}>Digital Future</span>
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
              className={styles.secondaryButtonWrapper}
            >
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            className={styles.trustBadge}
            custom={4}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={textVariants}
          >
            <div className={styles.trustIcon}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 0L10.2 5.37L16 5.88L11.73 9.8L12.97 15.52L8 12.5L3.03 15.52L4.27 9.8L0 5.88L5.8 5.37L8 0Z" fill="currentColor"/>
              </svg>
            </div>
            <span>Trusted by Industry Leaders</span>
          </motion.div>
        </div>
        
        <motion.div 
          className={styles.imageContainer}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.95,
          }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.imageWrapper}>
            <div className={styles.glowEffect}></div>
            <Image
              src="/hero-image.webp"
              alt="Digital Transformation Visualization"
              width={660}
              height={550}
              className={styles.heroImage}
              priority
            />
          </div>
          
          <HeroCards isInView={isInView} />
        </motion.div>
      </div>
      
      <PartnerLogos />
    </section>
  );
}