"use client";

import { motion } from "framer-motion";
import styles from "./HeroBackground.module.scss";

export default function HeroBackground() {
  return (
    <>
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      
      <div className={styles.shapesContainer}>
        <motion.div
          className={styles.circle1}
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className={styles.circle2}
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.95, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className={styles.square}
          animate={{
            rotate: [0, 20, 0],
            scale: [1, 0.98, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
          }}
        />
        
        <div className={styles.grid} />
      </div>
    </>
  );
}