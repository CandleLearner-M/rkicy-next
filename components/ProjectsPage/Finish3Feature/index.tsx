"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Calendar, Zap, Smartphone, Layout } from "lucide-react";
import styles from "./Finish3Feature.module.scss";
import { useScreenSize } from "@/utils/useScreenSize";

export default function Finish3Feature() {
  const [isLoaded, setIsLoaded] = useState(false);
  const t = useTranslations("projects");

  const {isMobile, isDesktop} = useScreenSize();

  // Features for the feature list
  const features = [
    {
      id: "elegant-simplicity",
      title: "Elegant Simplicity",
      description: "At its core, Finish3 champions a minimalist interface that displays only what matters most: the three tasks that will define your day. No distractions, no clutter—just pure focus.",
      icon: <Layout size={20} />
    },
    {
      id: "habit-formation",
      title: "Intentional Habit Formation",
      description: "By limiting choices to three, Finish3 combats overwhelm and promotes a healthy sense of accomplishment. The app refreshes each morning, intelligently rolling unfinished tasks forward to ensure nothing slips through.",
      icon: <Calendar size={20} />
    },
    {
      id: "synchronization",
      title: "Seamless Synchronization",
      description: "Whether you're on the go or at your desktop, your task list stays in harmony across all devices. From the first tap until your final checkmark, the experience stays consistent.",
      icon: <Smartphone size={20} />
    },
    {
      id: "insight-driven",
      title: "Insight-Driven Progress",
      description: "Finish3 doesn't just help you do things—it helps you understand your productivity. View your completion streaks, task success rates, and progress trends to adapt and level up your routine.",
      icon: <Zap size={20} />
    }
  ];

  const stats = [
    { value: "100%", label: "Task Completion" },
    { value: "Daily", label: "Auto Refresh" },
    { value: "Real-time", label: "Synchronization" }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <section className={styles.finish3Section}>
      <div className={styles.gradientBackground}></div>
      <div className={styles.container}>
        <div className={styles.badgeContainer}>
          <motion.div 
            className={styles.featureBadge}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span>Featured Project</span>
          </motion.div>
        </div>
        
        <div className={styles.content}>
          {/* Left Side - Project Info */}
          <motion.div 
            className={styles.projectInfo}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <motion.h2 variants={itemVariants} className={styles.projectTitle}>
              Introducing <span className={styles.highlight}>Finish3</span> — Your Daily "Top 3" Task Mastery Tool
            </motion.h2>

            {!isDesktop && <motion.div variants={itemVariants} className={styles.mockupContainer}>
              <div className={styles.mockupImage}>
                <Image
                  src="/projects/finish3/mockup.jpg" 
                  alt="Finish3 App Interface"
                  width={600}
                  height={300}
                  className={styles.phoneMockup}

                  style={{marginBottom: "2rem"}}
                />
                <div className={styles.reflectionEffect}></div>
                <div className={styles.glowEffect}></div>
              </div>
            </motion.div>}
            
            <motion.p variants={itemVariants} className={styles.projectDescription}>
              Built from the ground up by Rkicy Technology, Finish3 is more than just a productivity 
              app—it's a distillation of focused design, behavioral science, and daily habit-building.
              Born from countless hours of development, user research, and iterative design,
              Finish3 helps users consistently "finish their top three daily tasks—every day."
            </motion.p>

            {/* Stats display */}
            <motion.div variants={itemVariants} className={styles.statsContainer}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.statItem}>
                  <div className={styles.statValue}>{stat.value}</div>
                  <div className={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </motion.div>
            
            {isDesktop && <motion.div variants={itemVariants} className={styles.ctaContainer}>
              <Link href="/projects/finish3" className={styles.primaryCta}>
                <span>Explore Project</span>
                <ArrowRight size={16} />
              </Link>
              <a href="https://finish3.app" target="_blank" rel="noopener noreferrer" className={styles.secondaryCta}>
                <span>Visit Website</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>}
          </motion.div>

          {/* Right Side - Mockup and Features */}
          <motion.div 
            className={styles.projectShowcase}
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {isDesktop && <motion.div variants={itemVariants} className={styles.mockupContainer}>
              <div className={styles.mockupImage}>
                <Image
                  src="/projects/finish3/mockup.jpg" 
                  alt="Finish3 App Interface"
                  width={600}
                  height={300}
                  className={styles.phoneMockup}
                />
                <div className={styles.reflectionEffect}></div>
                <div className={styles.glowEffect}></div>
              </div>
            </motion.div>}

            <motion.div variants={itemVariants} className={styles.featuresContainer}>
              <div className={styles.featureList}>
                {features.map((feature, index) => (
                  <motion.div 
                    key={feature.id} 
                    className={styles.featureItem}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 15 }}
                    transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className={styles.featureIcon}>
                      {feature.icon}
                    </div>
                    <div className={styles.featureContent}>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {!isDesktop && <motion.div variants={itemVariants} className={styles.ctaContainer} style={{marginTop: "2rem", justifyContent: "center", alignItems: "center"}}>
              <Link href="/projects/finish3" className={styles.primaryCta}>
                <span>Explore Project</span>
                <ArrowRight size={16} />
              </Link>
              <a href="https://finish3.app" target="_blank" rel="noopener noreferrer" className={styles.secondaryCta}>
                <span>Visit Website</span>
                <ArrowRight size={16} />
              </a>
            </motion.div>}
              <div className={styles.tagline}>
                <span>Built with Care by Rkicy Technology</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}