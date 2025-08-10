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
import ThemeSwitcher from '../ThemeSwitcher';

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

  // Theme toggle handler
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

  // Navbar container variants for the transformation with minimal animation
  const navbarVariants = {
    hero: {
      borderRadius: 0,
      backgroundColor: "rgba(255, 255, 255, 0)",
      backdropFilter: "none",
      boxShadow: "none",
      border: "none",
      y: 0,
      opacity: 1,
      width: "100%"
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
      width: "94%"
    },
    hidden: {
      y: -100,
      opacity: 0
    }
  };
  
  // Theme icon animation variants - keeping in Framer Motion as it's a complex state transition
  const themeIconVariants = {
    initial: { 
      rotate: -30,
      opacity: 0,
      scale: 0.8,
    },
    animate: { 
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1], // Subtle cubic ease
      }
    },
    exit: { 
      rotate: 30,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: [0.23, 1, 0.32, 1],
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
              type: "tween",
              ease: [0.23, 1, 0.32, 1], // Professional cubic easing
              duration: 0.4
            }}
            role="navigation"
            aria-label={t('navigation.mainNavigation')}
            layout
          >
            {/* Logo */}
            <div 
              className={styles.logoContainer}
              layout
            >
              <Link href={`/${locale}`} className={styles.logo} aria-label={t('navigation.home')}>
                <Logo />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div 
              className={styles.desktopNav}
            >
              <ul className={styles.navLinks}>
                {navLinks.map((link) => (
                  <motion.li
                    key={link.name}
                    className={`${styles.navItem} ${pathname === link.href ? styles.active : ''}`}
                    // layout
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
                          // layoutId="activeIndicator"
                          // transition={{ 
                            // duration: 0.3, 
                            // ease: [0.23, 1, 0.32, 1] // Professional cubic easing
                          // }}
                        />
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
            
            {/* Right Actions */}
            <div 
              className={styles.navActions}
            >
              {/* Language Switcher - Desktop */}
              <div className={styles.languageSwitcher}>
                <LanguageSwitcher variant="premium" />
              </div>
              
              {/* Direct Language Toggle - Mobile */}
              <button
                className={styles.languageToggle}
                onClick={toggleLanguage}
                aria-label={t('language.switch')}
              >
                <Globe size={18} className={styles.globeIcon} />
                <span className={styles.currentLanguage}>{locale.toUpperCase()}</span>
              </button>
              
              {/* Theme Toggle - Complex animation kept in Framer Motion */}
              {/* <button 
                className={styles.themeToggle}
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
              </button> */}

              <ThemeSwitcher duration={350} />
            </div>
          </motion.nav>
        </LayoutGroup>
      </div>
    </div>
  );
}