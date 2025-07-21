"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./FixedBackground.module.scss";

export default function FixedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.fixedBackground}>
      {/* Main gradients */}
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      <div className={styles.gradient3} />
      
      {/* Animated shapes */}
      <div className={styles.shapesContainer}>
        <motion.div
          className={styles.circle1}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className={styles.circle2}
          animate={{
            y: [0, 25, 0],
            scale: [1, 0.95, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className={styles.square}
          animate={{
            rotate: [0, 25, 0],
            scale: [1, 0.98, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className={styles.circle3}
          animate={{
            x: [0, 15, 0],
            y: [0, -15, 0],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "easeInOut",
          }}
        />
        
        <div className={styles.grid} />
        <div className={styles.grid2} />
        
        {/* Subtle floating dots */}
        <div className={styles.dotsContainer}>
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
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i * 2,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Optional: Noise texture overlay */}
        <div className={styles.noise} />
      </div>
    </div>
  );
}