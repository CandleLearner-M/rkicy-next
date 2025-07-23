'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useSmartScroll } from './hooks/useSmartScroll';
import { ChevronDown, Globe, Sun, Moon } from 'lucide-react';
import styles from './Navbar.module.scss';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Partners', href: '/partners' },
  { name: 'Hardware', href: '/hardware' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  // Configure SmartScroll with initiallyVisible: false
  const { visible } = useSmartScroll({ 
    threshold: 100, 
    throttleDelay: 100, 
    staticNavbarHeight: 90,
    initiallyVisible: false 
  });
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);
  const navbarRef = useRef(null);

  // Handle theme initialization
  useEffect(() => {
    setMounted(true);
    
    // Find active nav link index
    const index = navLinks.findIndex(link => link.href === pathname);
    setActiveIndex(index >= 0 ? index : 0);
  }, [pathname]);

  // Animation variants
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
    }),
    exit: { opacity: 0, y: -10 }
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
      initial="hidden" // Start hidden
      animate={visible ? "visible" : "hidden"}
      variants={navbarVariants}
    >
      <div className={styles.container}>
        <motion.nav 
          className={styles.navbar}
          ref={navbarRef}
        >
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logo}>
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
                  onMouseEnter={() => setHoverIndex(i)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
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
                    {hoverIndex === i && pathname !== link.href && (
                      <motion.div 
                        className={styles.hoverIndicator}
                        layoutId="hoverIndicator"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '100%' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25
                        }}
                      />
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
              className={styles.langSelector}
              custom={navLinks.length}
              initial="initial"
              animate="animate"
              variants={navItemVariants}
            >
              <button className={styles.langButton} aria-label="Change language">
                <Globe size={16} strokeWidth={2} />
                <span>English</span>
                <motion.div
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} className={styles.chevron} strokeWidth={2.5} />
                </motion.div>
              </button>
            </motion.div>
            
            {/* Theme Toggle */}
            <motion.button
              className={styles.themeToggle}
              onClick={toggleTheme}
              custom={navLinks.length + 1}
              initial="initial"
              animate="animate"
              variants={navItemVariants}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                className={styles.themeIcon}
                initial={false}
                animate={{ 
                  rotateY: theme === 'dark' ? 180 : 0,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 0.5, 
                  scale: { duration: 0.3 }
                }}
              >
                {theme === 'dark' ? <Moon size={16} strokeWidth={2.5} /> : <Sun size={16} strokeWidth={2.5} />}
              </motion.div>
            </motion.button>
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
}