'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './UnifiedNavbar.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';
import { useSmartScroll } from './hooks/useSmartScroll';

// TypeScript interface definitions
interface NavLink {
  name: string;
  href: string;
}

export default function UnifiedNavbar(): JSX.Element | null {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  // Smart scroll behavior for floating navbar
  const { visible } = useSmartScroll({ 
    threshold: 50, 
    throttleDelay: 100, 
    staticNavbarHeight: 80,
    initiallyVisible: false
  });
  
  // Get scroll position with improved performance
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          setIsAtTop(scrollPosition < 10);
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    // Set initial value
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Language toggle handler for mobile
  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  // Theme toggle handler with improved animation
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Nav links with active state and translations
  const navLinks: NavLink[] = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.partners'), href: `/${locale}/partners` },
    { name: t('navigation.hardware'), href: `/${locale}/hardware` },
    { name: t('navigation.projects'), href: `/${locale}/projects` },
    { name: t('navigation.contact'), href: `/${locale}/contact` }
  ];

  // Navbar container variants for the transformation
  const navbarVariants = {
    hero: {
      borderRadius: 0,
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "none",
      boxShadow: "none",
      border: "none",
      y: 0,
      opacity: 1,
      width: "100%",
      height: "80px",
    },
    floating: {
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
      width: "94%",
      height: "68px",
    },
    hidden: {
      y: -100,
      opacity: 0
    }
  };
  
  // Improved animation for navbar items
  const navItemVariants = {
    hidden: { 
      opacity: 0, 
      y: -10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1] // Custom ease curve
      }
    }
  };
  
  // Enhanced theme icon animation variants
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

  // Active indicator variants for smooth navigation
  const activeIndicatorVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.25, 
        ease: "easeOut" 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0,
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      }
    }
  };

  if (!mounted) return null;

  // Determine the current navbar state
  let currentVariant = 'hidden';
  if (isAtTop) {
    currentVariant = 'hero';
  } else if (visible) {
    currentVariant = 'floating';
  }

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.container}>
        <LayoutGroup>
          <motion.nav
            className={`${styles.navbar} ${isAtTop ? styles.heroNavbar : styles.floatingNavbar}`}
            initial={isAtTop ? "hero" : "floating"}
            animate={currentVariant}
            variants={navbarVariants}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
              staggerChildren: 0.05,
              delayChildren: 0.02
            }}
            role="navigation"
            aria-label={t('navigation.mainNavigation')}
            layout
          >
            {/* Logo */}
            <motion.div 
              className={styles.logoContainer}
              layout
              initial="hidden"
              animate="visible"
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
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              <ul className={styles.navLinks}>
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    className={`${styles.navItem} ${pathname === link.href ? styles.active : ''}`}
                    layout
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
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
                          initial="initial"
                          animate="animate"
                          exit="exit"
                          variants={activeIndicatorVariants}
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
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
            >
              {/* Language Switcher - Desktop */}
              <motion.div 
                className={styles.languageSwitcher}
                layout
                whileHover={{ y: -2 }}
              >
                <LanguageSwitcher variant="premium" />
              </motion.div>
              
              {/* Direct Language Toggle - Mobile */}
              <motion.button
                className={styles.languageToggle}
                onClick={toggleLanguage}
                aria-label={t('language.switch')}
                whileHover={{ y: -2, boxShadow: "0 5px 15px rgba(37, 99, 235, 0.15)" }}
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
                whileHover={{ y: -2, boxShadow: theme === 'dark' ? 
                  "0 5px 15px rgba(255, 215, 0, 0.15)" : 
                  "0 5px 15px rgba(37, 99, 235, 0.15)" 
                }}
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
            </motion.div>
          </motion.nav>
        </LayoutGroup>
      </div>
    </div>
  );
}