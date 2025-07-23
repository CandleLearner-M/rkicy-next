'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useSmartScroll } from './hooks/useSmartScroll';
import { Menu, X, ChevronRight, Globe, Sun, Moon } from 'lucide-react';
import styles from './Navbar.module.scss';

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
  const { visible } = useSmartScroll({ threshold: 100, throttleDelay: 100 });
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Mobile menu animations
  const mobileMenuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const mobileItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { 
      x: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Wait for theme to be available to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      <motion.header
        className={styles.navbarWrapper}
        initial="visible"
        animate={visible ? "visible" : "hidden"}
        variants={navbarVariants}
      >
        <div className={styles.container}>
          <motion.div 
            className={styles.navbar}
            ref={navbarRef}
          >
            {/* Progress indicator bar */}
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressIndicator}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.max(0, Math.min(100, window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100))}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            {/* Logo */}
            <Link href="/" className={styles.logo}>
              <Image 
                src="/logo.svg" 
                alt="Rkicy Tech" 
                width={120} 
                height={40} 
                className={styles.logoImage}
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              <div className={styles.navLinks}>
                {navLinks.map((link, i) => (
                  <motion.div
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
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                    >
                      {link.name}
                    </Link>
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
                  </motion.div>
                ))}
              </div>
            </nav>
            
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
                <button className={styles.langButton}>
                  <Globe size={16} />
                  <span>English</span>
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight size={14} className={styles.chevron} />
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
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  initial={false}
                  animate={{ rotateY: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                  style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                </motion.div>
              </motion.button>
              
              {/* Mobile Menu Button */}
              <motion.button
                className={styles.mobileMenuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                custom={navLinks.length + 2}
                initial="initial"
                animate="animate"
                variants={navItemVariants}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div 
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileMenu}
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className={styles.mobileMenuHeader}>
                <Image 
                  src="/logo.svg" 
                  alt="Rkicy Tech" 
                  width={100} 
                  height={30} 
                />
                <motion.button
                  className={styles.closeButton}
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={24} />
                </motion.button>
              </div>
              <nav className={styles.mobileNavLinks}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    variants={mobileItemVariants}
                    custom={i}
                    className={styles.mobileNavItem}
                  >
                    <Link
                      href={link.href}
                      className={`${styles.mobileNavLink} ${pathname === link.href ? styles.mobileActive : ''}`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.name}</span>
                      {pathname === link.href && (
                        <motion.span 
                          className={styles.activeMobileIndicator}
                          layoutId="mobileActiveIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div 
                className={styles.mobileActions}
                variants={mobileItemVariants}
                custom={navLinks.length}
              >
                <Link href="/contact" className={styles.mobileCtaButton}>
                  Contact Us
                  <ChevronRight size={16} />
                </Link>
                <div className={styles.mobileToggleRow}>
                  <button className={styles.mobileLangButton}>
                    <Globe size={16} />
                    <span>English</span>
                  </button>
                  <button 
                    className={styles.mobileThemeToggle}
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}