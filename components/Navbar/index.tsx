"use client"; // Important for client components in App Router

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Use usePathname instead of useRouter
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './Navbar.module.scss';

type Language = 'en' | 'fr' | 'ar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname(); // Use pathname instead of router
  const { theme, setTheme } = useTheme();
  
  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
    // Here you would implement actual language switching logic
  };

  // Theme toggle handler
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Navbar animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: 'auto',
      transition: { duration: 0.2 } 
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.2 }
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
    <motion.nav 
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
      variants={navbarVariants}
      initial="initial"
      animate="animate"
    >
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        
        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <ul className={styles.navLinks}>
            {navLinks.map(link => (
              <motion.li 
                key={link.name}
                whileHover={{ scale: 1.05 }}
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
            <div className={styles.languageSwitcher}>
              <motion.button 
                whileTap={{ scale: 0.95 }}
                className={styles.languageButton}
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                aria-label="Change language"
              >
                <Globe size={18} />
                <span>{languageLabels[language]}</span>
                <ChevronDown size={16} className={isLanguageDropdownOpen ? styles.rotated : ''} />
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
                      <button 
                        key={langCode}
                        onClick={() => handleLanguageChange(langCode as Language)}
                        className={language === langCode ? styles.activeLanguage : ''}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Theme Switcher */}
            {mounted && (
              <motion.button 
                className={styles.themeToggle}
                whileTap={{ scale: 0.9, rotate: 15 }}
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className={styles.mobileNav}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className={styles.mobileNavLinks}>
                {navLinks.map(link => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className={pathname === link.href ? styles.active : ''}
                  >
                    <Link 
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              
              <div className={styles.mobileNavActions}>
                <div className={styles.mobileLangButtons}>
                  {Object.entries(languageLabels).map(([langCode, label]) => (
                    <button 
                      key={langCode}
                      onClick={() => handleLanguageChange(langCode as Language)}
                      className={language === langCode ? styles.activeLanguage : ''}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                
                {mounted && (
                  <button 
                    className={styles.mobileThemeToggle}
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun size={18} />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={18} />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;