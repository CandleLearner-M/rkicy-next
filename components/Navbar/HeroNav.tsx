"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './HeroNav.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';

const HeroNav = () => {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const t = useTranslations('common');
  
  const navRef = useRef(null);
  const isInView = useInView(navRef, { once: true });
  
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Staggered animation for navbar elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Theme toggle animation variants
  const themeIconVariants = {
    initial: { 
      rotate: -90,
      opacity: 0,
      scale: 0.5,
    },
    animate: { 
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: "backOut",
      }
    },
    exit: { 
      rotate: 90,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.35,
        ease: "backIn",
      }
    }
  };

  // Nav links with active state and translations
  const navLinks = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.partners'), href: `/${locale}/partners` },
    { name: t('navigation.hardware'), href: `/${locale}/hardware` },
    { name: t('navigation.projects'), href: `/${locale}/projects` },
    { name: t('navigation.contact'), href: `/${locale}/contact` }
  ];
  
  return (
    <div className={styles.navbar} ref={navRef}>
      <motion.div 
        className={styles.container}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className={styles.logoContainer}
          variants={itemVariants}
        >
          <Logo />
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  color: "#3B82F6",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={pathname === link.href ? styles.active : ''}
              >
                <Link href={link.href}>
                  {link.name}
                </Link>
              </motion.li>
            ))}
          </ul>
          
          <div className={styles.navActions}>
            {/* Language Switcher */}
            <motion.div 
              className={styles.languageSwitcher}
              variants={itemVariants}
            >
              <LanguageSwitcher variant="default" />
            </motion.div>
            
            {/* Theme Switcher */}
            {mounted && (
              <motion.button 
                className={styles.themeToggle}
                variants={itemVariants}
                whileHover={{ 
                  backgroundColor: theme === 'dark' 
                    ? "rgba(255, 215, 0, 0.15)" 
                    : "rgba(0, 0, 0, 0.08)",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
              >
                <div className={styles.themeIconWrapper}>
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                      <motion.div
                        key="sun"
                        variants={themeIconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={styles.themeIcon}
                      >
                        <Sun size={18} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        variants={themeIconVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className={styles.themeIcon}
                      >
                        <Moon size={18} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Mobile View - Just Logo and Theme Toggle */}
        <div className={styles.mobileNav}>
          {mounted && (
            <motion.button 
              className={styles.themeToggle}
              variants={itemVariants}
              whileHover={{ 
                backgroundColor: theme === 'dark' 
                  ? "rgba(255, 215, 0, 0.15)" 
                  : "rgba(0, 0, 0, 0.08)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
            >
              <div className={styles.themeIconWrapper}>
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.div
                      key="sun"
                      variants={themeIconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={styles.themeIcon}
                    >
                      <Sun size={18} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      variants={themeIconVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className={styles.themeIcon}
                    >
                      <Moon size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroNav;