"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import styles from './PageHeader.module.scss';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  
  // Create parallax effect based on scroll
  const backgroundY = useTransform(scrollY, [0, 300], [0, 100]);
  const patternY = useTransform(scrollY, [0, 300], [0, 50]);
  const titleOpacity = useTransform(scrollY, [0, 150], [1, 0.6]);
  
  // Initialize animations after component mounts to ensure smooth entrance
  useEffect(() => {
    setIsLoaded(true);
    controls.start('visible');
  }, [controls]);
  
  // Split the title into words for individual animation
  const titleWords = title.split(' ');

  return (
    <motion.div 
      className={styles.pageHeader}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className={styles.container}
        style={{ opacity: titleOpacity }}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav 
            className={styles.breadcrumbs}
            aria-label="Breadcrumbs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ol>
              {breadcrumbs.map((crumb, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  {crumb.active ? (
                    <motion.span 
                      aria-current="page"
                      className={styles.activeCrumb}
                      whileHover={{ scale: 1.03 }}
                    >
                      {crumb.label}
                    </motion.span>
                  ) : (
                    <motion.div whileHover={{ scale: 1.03 }}>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </motion.div>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className={styles.separator}>/</span>
                  )}
                </motion.li>
              ))}
            </ol>
          </motion.nav>
        )}
        
        <div className={styles.titleContainer}>
          <div className={styles.titleWrapper}>
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className={styles.titleWord}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isLoaded ? 1 : 0,
                  y: isLoaded ? 0 : 20
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
                {i < titleWords.length - 1 && " "}
              </motion.span>
            ))}
            <motion.span
              className={styles.titleAccent}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        
        {subtitle && (
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
      
      <div className={styles.background}>
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          style={{ y: backgroundY }}
        ></motion.div>
        <motion.div 
          className={styles.pattern}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 0.8 : 0, scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 1.5 }}
          style={{ y: patternY }}
        >
          <motion.div 
            className={styles.patternInner}
            animate={{ 
              backgroundPosition: isLoaded ? "20px 20px" : "0px 0px" 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <motion.div 
          className={styles.glow}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? [0, 0.3, 0.1] : 0 }}
          transition={{ duration: 3, times: [0, 0.5, 1], repeat: Infinity, repeatType: "reverse" }}
        />
      </div>
    </motion.div>
  );
};

export default PageHeader;