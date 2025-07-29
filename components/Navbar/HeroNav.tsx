"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './HeroNav.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';

const HeroNav = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const locale = useLocale();
  const t = useTranslations('common');
  
  const navRef = useRef(null);
  const isInView = useInView(navRef, { once: true });
  
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Handle scroll events to show/hide navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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

  // Mobile menu animations
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      x: "100%",
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
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
    <>
      {/* Main navbar */}
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
            <Link href={`/${locale}`}>
              <Logo />
            </Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link, i) => (
                <motion.li 
                  key={link.name}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -2,
                    transition: { duration: 0.2 }
                  }}
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
                <LanguageSwitcher variant="premium" />
              </motion.div>
              
              {/* Theme Switcher */}
              {mounted && (
                <motion.button 
                  className={styles.themeToggle}
                  variants={itemVariants}
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
                          <Sun size={20} />
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
                          <Moon size={20} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              )}
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className={styles.mobileNav}>
            {mounted && (
              <motion.button 
                className={styles.themeToggle}
                variants={itemVariants}
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
                        <Sun size={20} />
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
                        <Moon size={20} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            )}
            
            <motion.button
              className={styles.mobileMenuButton}
              variants={itemVariants}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t('navigation.openMenu')}
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      {/* Sticky navbar that appears on scroll */}
      <div className={`${styles.scrolledNav} ${scrolled ? styles.visible : ''}`}>
        <div className={styles.container}>
          <div className={styles.logoContainer}>
            <Link href={`/${locale}`}>
              <Logo />
            </Link>
          </div>
          
          <div className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link) => (
                <li 
                  key={link.name}
                  className={pathname === link.href ? styles.active : ''}
                >
                  <Link href={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className={styles.navActions}>
              <div className={styles.languageSwitcher}>
                <LanguageSwitcher variant="premium" />
              </div>
              
              {mounted && (
                <button 
                  className={styles.themeToggle}
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
                >
                  <div className={styles.themeIconWrapper}>
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  </div>
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.mobileNav}>
            {mounted && (
              <button 
                className={styles.themeToggle}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
              >
                <div className={styles.themeIconWrapper}>
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </div>
              </button>
            )}
            
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t('navigation.openMenu')}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-white dark:bg-gray-900 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <div className={styles.logoContainer}>
                <Logo />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t('navigation.closeMenu')}
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.3,
                        ease: "easeOut"
                      }
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 px-4 text-lg font-medium rounded-lg transition-colors ${
                        pathname === link.href
                          ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                  {t('navigation.switchLanguage')}
                </p>
                <LanguageSwitcher variant="mobile" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeroNav;