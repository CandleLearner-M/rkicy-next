'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useSmartScroll } from './hooks/useSmartScroll';
import { Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import styles from './Navbar.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';

export default function Navbar() {
  // Get translations
  const t = useTranslations('common');
  const locale = useLocale();
  
  // Navigation links using translations
  const navLinks = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    { name: t('navigation.partners'), href: `/${locale}/partners` },
    { name: t('navigation.hardware'), href: `/${locale}/hardware` },
    { name: t('navigation.projects'), href: `/${locale}/projects` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ];

  // Smart scroll and other hooks
  const { visible } = useSmartScroll({ 
    threshold: 100, 
    throttleDelay: 100, 
    staticNavbarHeight: 90,
    initiallyVisible: false 
  });
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navbarRef = useRef(null);

  // Handle theme initialization
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants - keep only the essential ones
  const navbarVariants = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
      }
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 1,
      }
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: i => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: i * 0.05,
      }
    })
  };

  // Handle theme toggle with animation
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Wait for theme to be available to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <motion.header
      className={styles.navbarWrapper}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={navbarVariants}
    >
      <div className={styles.container}>
        <nav className={styles.navbar} ref={navbarRef}>
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link href={`/${locale}`} className={styles.logo}>
              <Logo />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  custom={i}
                  initial="initial"
                  animate="animate"
                  variants={navItemVariants}
                  className={styles.navItemContainer}
                >
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
                  >
                    <span>{link.name}</span>
                    {pathname === link.href && (
                      <div className={styles.activeIndicator} />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Right Actions */}
          <div className={styles.actions}>
            {/* Language Selector */}
            <motion.div 
              custom={navLinks.length}
              initial="initial"
              animate="animate"
              variants={navItemVariants}
            >
              <LanguageSwitcher buttonClassName={styles.customLanguageButton} />
            </motion.div>
            
            {/* Theme Toggle */}
            <motion.button
              className={styles.themeToggle}
              onClick={toggleTheme}
              custom={navLinks.length + 1}
              initial="initial"
              animate="animate"
              variants={navItemVariants}
              aria-label={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
            >
              <div className={styles.themeIcon}>
                {theme === 'dark' ? <Moon size={16} strokeWidth={2.5} /> : <Sun size={16} strokeWidth={2.5} />}
              </div>
            </motion.button>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}