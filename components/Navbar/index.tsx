"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './Navbar.module.scss';

type Language = 'en' | 'fr' | 'ar';

const Navbar: React.FC = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const navRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(navRef, { once: true });
  
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

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
  
  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: 'auto',
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" }
    }
  };

  // Nav links with active state
  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Partners', href: '/partners' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' }
  ];

  const languageLabels = {
    en: 'English',
    fr: 'Français',
    ar: 'العربية'
  };
  
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
              <motion.button 
                whileHover={{
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
                className={styles.languageButton}
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                aria-label="Change language"
              >
                <Globe size={18} />
                <span>{languageLabels[language]}</span>
                <motion.div
                  animate={{
                    rotate: isLanguageDropdownOpen ? 180 : 0,
                    transition: { duration: 0.3, ease: "easeInOut" }
                  }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.div 
                    className={styles.languageDropdown}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {Object.entries(languageLabels).map(([langCode, label]) => (
                      <motion.button 
                        key={langCode}
                        onClick={() => handleLanguageChange(langCode as Language)}
                        className={language === langCode ? styles.activeLanguage : ''}
                        whileHover={{
                          backgroundColor: language === langCode 
                            ? "rgba(59, 130, 246, 0.15)" 
                            : "rgba(0, 0, 0, 0.05)",
                          x: 2,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.9, rotate: 15 }}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                <motion.div
                  key={theme}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
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
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
            >
              <motion.div
                key={theme}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 30, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Navbar;