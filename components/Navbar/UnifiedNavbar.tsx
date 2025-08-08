'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './UnifiedNavbar.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';
import { useSmartScroll } from './hooks/useSmartScroll';

export default function UnifiedNavbar() {
  const [mounted, setMounted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // References for measuring navbar dimensions
  const navbarRef = useRef(null);
  
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Smart scroll behavior with enhanced options
  const { visible } = useSmartScroll({ 
    threshold: 50, 
    throttleDelay: 100, 
    staticNavbarHeight: 80,
    initiallyVisible: true,
    scrollUpTolerance: 20  // More forgiving scroll up detection
  });
  
  // Get scroll position with debounced handling
  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      // Clear any existing timeout
      if (timeoutId) clearTimeout(timeoutId);
      
      // Set a new timeout for performance
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        setIsAtTop(scrollPosition < 10);
      }, 10);
    };
    
    // Set initial value
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Language toggle handler
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // Theme toggle handler with added effect
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Toggle mobile menu with animation
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Nav links with active state and translations
  const navLinks = [
    { name: t('navigation.home'), href: `/${locale}`, icon: 'home' },
    { name: t('navigation.about'), href: `/${locale}/about`, icon: 'info' },
    { name: t('navigation.services'), href: `/${locale}/services`, icon: 'layers' },
    { name: t('navigation.partners'), href: `/${locale}/partners`, icon: 'users' },
    { name: t('navigation.hardware'), href: `/${locale}/hardware`, icon: 'cpu' },
    { name: t('navigation.projects'), href: `/${locale}/projects`, icon: 'folder' },
    { name: t('navigation.contact'), href: `/${locale}/contact`, icon: 'mail' }
  ];

  // Enhanced navbar variants with layout transition properties
  const navbarVariants = {
    initial: {
      y: -100,
      opacity: 0,
    },
    hero: {
      width: '100%',
      borderRadius: 0,
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "none",
      boxShadow: "none",
      border: "none",
      y: 0,
      opacity: 1,
      height: '80px',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1
      }
    },
    floating: {
      width: '94%',
      borderRadius: 24,
      backgroundColor: theme === 'dark' 
        ? "rgba(20, 20, 30, 0.85)" 
        : "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(12px)",
      boxShadow: theme === 'dark'
        ? "0 10px 35px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(150, 150, 200, 0.1) inset"
        : "0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.5) inset",
      border: theme === 'dark'
        ? "1px solid rgba(255, 255, 255, 0.1)"
        : "1px solid rgba(0, 0, 0, 0.06)",
      y: 0,
      opacity: 1,
      height: '68px',
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
        delayChildren: 0.1,
        staggerChildren: 0.05
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40
      }
    }
  };
  
  // Animation for navbar content items
  const navItemVariants = {
    initial: { 
      opacity: 0,
      y: -10,
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Enhanced theme icon animation
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
        ease: [0.34, 1.56, 0.64, 1], // Custom spring-like curve
      }
    },
    exit: { 
      rotate: 90,
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.25,
        ease: "backIn",
      }
    }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.05,
        delayChildren: 0.05,
        when: "beforeChildren"
      }
    }
  };

  // Mobile menu item animation
  const mobileMenuItemVariants = {
    closed: { 
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 }
    },
    open: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  if (!mounted) return <div className={styles.navbarPlaceholder} />;

  // Determine the current navbar state
  let currentVariant = 'hidden';
  if (isAtTop) {
    currentVariant = 'hero';
  } else if (visible) {
    currentVariant = 'floating';
  }

  return (
    <>
      <div className={styles.navbarWrapper}>
        <div className={styles.container}>
          <LayoutGroup id="navbar">
            <motion.nav
              ref={navbarRef}
              className={`${styles.navbar} ${isAtTop ? styles.heroNavbar : styles.floatingNavbar}`}
              initial="initial"
              animate={currentVariant}
              variants={navbarVariants}
              layout
              layoutRoot
              role="navigation"
              aria-label={t('navigation.mainNavigation')}
            >
              {/* Logo */}
              <motion.div 
                className={styles.logoContainer}
                layout
                variants={navItemVariants}
              >
                <Link href={`/${locale}`} className={styles.logo} aria-label={t('navigation.home')}>
                  <Logo />
                </Link>
              </motion.div>
              
              {/* Desktop Navigation */}
              <motion.div 
                className={styles.desktopNav}
                layout
                variants={navItemVariants}
              >
                <ul className={styles.navLinks}>
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      className={`${styles.navItem} ${pathname === link.href ? styles.active : ''}`}
                      layout
                    >
                      <Link 
                        href={link.href} 
                        className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        <span>{link.name}</span>
                        {pathname === link.href && (
                          <motion.div 
                            className={styles.activeIndicator}
                            layoutId="activeIndicator"
                            transition={{ 
                              type: "spring",
                              stiffness: 500, 
                              damping: 30 
                            }}
                          />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              {/* Right Actions */}
              <motion.div 
                className={styles.navActions}
                layout
                variants={navItemVariants}
              >
                {/* Language Switcher - Desktop */}
                <motion.div 
                  className={styles.languageSwitcher}
                  layout
                  variants={navItemVariants}
                >
                  <LanguageSwitcher variant="premium" />
                </motion.div>
                
                {/* Direct Language Toggle - Mobile */}
                <motion.button
                  className={styles.languageToggle}
                  onClick={toggleLanguage}
                  aria-label={t('language.switch')}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <Globe size={18} className={styles.globeIcon} />
                  <span className={styles.currentLanguage}>{locale.toUpperCase()}</span>
                </motion.button>
                
                {/* Theme Toggle */}
                <motion.button 
                  className={styles.themeToggle}
                  onClick={toggleTheme}
                  aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  layout
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
                
                {/* Mobile Menu Button */}
                <motion.button
                  className={styles.mobileMenuButton}
                  onClick={toggleMobileMenu}
                  aria-label={mobileMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
                  aria-expanded={mobileMenuOpen}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </motion.nav>
          </LayoutGroup>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className={styles.mobileMenuOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <motion.div
              className={styles.mobileMenu}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className={styles.mobileMenuContent}>
                <ul className={styles.mobileNavLinks}>
                  {navLinks.map((link) => (
                    <motion.li
                      key={link.name}
                      variants={mobileMenuItemVariants}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link 
                        href={link.href} 
                        className={`${styles.mobileNavLink} ${pathname === link.href ? styles.active : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        <span>{link.name}</span>
                        {pathname === link.href && (
                          <div className={styles.mobileActiveIndicator} />
                        )}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div 
                  className={styles.mobileActions}
                  variants={mobileMenuItemVariants}
                >
                  <div className={styles.mobileActionsTitle}>
                    {t('preferences.title')}
                  </div>
                  
                  <div className={styles.mobileActionsButtons}>
                    <button 
                      className={`${styles.mobileActionButton} ${theme === 'dark' ? styles.active : ''}`}
                      onClick={() => setTheme('dark')}
                      aria-pressed={theme === 'dark'}
                    >
                      <Moon size={18} />
                      <span>{t('theme.dark')}</span>
                    </button>
                    
                    <button 
                      className={`${styles.mobileActionButton} ${theme === 'light' ? styles.active : ''}`}
                      onClick={() => setTheme('light')}
                      aria-pressed={theme === 'light'}
                    >
                      <Sun size={18} />
                      <span>{t('theme.light')}</span>
                    </button>
                    
                    <button 
                      className={`${styles.mobileActionButton} ${locale === 'en' ? styles.active : ''}`}
                      onClick={() => {
                        const newPath = pathname.replace(`/${locale}`, '/en');
                        router.push(newPath);
                        setMobileMenuOpen(false);
                      }}
                      aria-pressed={locale === 'en'}
                    >
                      <span>EN</span>
                    </button>
                    
                    <button 
                      className={`${styles.mobileActionButton} ${locale === 'fr' ? styles.active : ''}`}
                      onClick={() => {
                        const newPath = pathname.replace(`/${locale}`, '/fr');
                        router.push(newPath);
                        setMobileMenuOpen(false);
                      }}
                      aria-pressed={locale === 'fr'}
                    >
                      <span>FR</span>
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}