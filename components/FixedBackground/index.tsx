"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./FixedBackground.module.scss";

export default function FixedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.1,
        ease: [0.22, 1, 0.36, 1],
        duration: 0.8,
      },
    },
  };

  const gradientVariants = {
    hidden: (i) => ({ 
      opacity: 0,
      scale: 0.8,
      x: i === 1 ? 100 : i === 2 ? -100 : 0,
      y: i === 3 ? -50 : 0,
    }),
    visible: {
      opacity: [0, 0.4, 1],
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 1.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const shapeVariants = {
    hidden: (i) => ({
      opacity: 0,
      scale: 0.5,
      y: i % 2 === 0 ? 20 : -20,
    }),
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const gridVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      rotate: i => i === 1 ? -25 : 25,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: i => i === 1 ? -15 : 15,
      transition: {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const dotsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.8,
      },
    },
  };

  const dotVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 0.4,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!mounted) return null;

  return (
    <motion.div 
      className={styles.fixedBackground}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Main gradients */}
      <motion.div 
        className={styles.gradient1}
        custom={1}
        initial="hidden"
        animate="visible"
        variants={gradientVariants}
      />
      <motion.div 
        className={styles.gradient2}
        custom={2}
        initial="hidden"
        animate="visible"
        variants={gradientVariants}
      />
      <motion.div 
        className={styles.gradient3}
        custom={3}
        initial="hidden"
        animate="visible"
        variants={gradientVariants}
      />
      
      {/* Animated shapes container */}
      <motion.div 
        className={styles.shapesContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={styles.circle1}
          custom={1}
          variants={shapeVariants}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
            repeatDelay: 0.5,
            // Delay the infinite animation until entrance completes
            delay: 1.5,
          }}
        />
        
        <motion.div
          className={styles.circle2}
          custom={2}
          variants={shapeVariants}
          animate={{
            y: [0, 25, 0],
            scale: [1, 0.95, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
            delay: 1.8,
          }}
        />
        
        <motion.div
          className={styles.square}
          custom={3}
          variants={shapeVariants}
          animate={{
            rotate: [0, 25, 0],
            scale: [1, 0.98, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className={styles.circle3}
          custom={4}
          variants={shapeVariants}
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
            delay: 2.2,
          }}
        />
        
        <motion.div 
          className={styles.grid}
          custom={1}
          variants={gridVariants}
        />
        <motion.div 
          className={styles.grid2}
          custom={2}
          variants={gridVariants}
        />
        
        {/* Subtle floating dots */}
        <motion.div 
          className={styles.dotsContainer}
          variants={dotsVariants}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className={styles.dot}
              style={{
                top: `${10 + (i * 15)}%`,
                left: `${5 + (i * 15)}%`,
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
              }}
              variants={dotVariants}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i * 2,
                ease: "easeInOut",
                delay: 2.5 + i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Noise texture with fade-in */}
        <motion.div 
          className={styles.noise}
          initial={{ opacity: 0 }}
          animate={{ opacity: theme => theme === 'dark' ? 0.03 : 0.015 }}
          transition={{ duration: 2, delay: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}