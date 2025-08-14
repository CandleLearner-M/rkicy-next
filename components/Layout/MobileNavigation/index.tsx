"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  Info, 
  LayoutGrid, 
  Handshake, 
  HardDrive, 
  Briefcase, 
  PhoneCall,
  Plus,
  X
} from "lucide-react";
import styles from "./MobileNavigation.module.scss";

// Map icons to nav items
const iconMap = {
  'home': <Home size={18} />,
  'about': <Info size={18} />,
  'services': <LayoutGrid size={18} />,
  'partners': <Handshake size={18} />,
  'hardware': <HardDrive size={18} />,
  'projects': <Briefcase size={18} />,
  'contact': <PhoneCall size={18} />
};

export default function MobileNavigation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const t = useTranslations('navigation');

  // Nav links with active state - now using translation keys
  const navLinks = [
    { name: 'home', href: '/' },
    { name: 'about', href: '/about' },
    { name: 'services', href: '/services' },
    { name: 'partners', href: '/partners' },
    { name: 'hardware', href: '/hardware' },
    { name: 'projects', href: '/projects' },
    { name: 'contact', href: '/contact' }
  ];

  // First and second half of nav items to show on either side of the center button
  const leftNavItems = [0, 2]; // Home, Services
  const rightNavItems = [5, 6]; // Projects, Contact
  const secondaryNavItems = [1, 3, 4]; // About, Partners, Hardware

  // Handle scroll behavior to hide/show nav bar
  useEffect(() => {
  let ticking = false;
  let lastScrollY = window.scrollY;
  
  const updateNavVisibility = () => {
    ticking = false;
    const currentScrollY = window.scrollY;
    
    // If at top of page, always show
    if (currentScrollY < 50) {
      setVisible(true);
      lastScrollY = currentScrollY;
      return;
    }
    
    // If menu is expanded, don't hide
    if (isExpanded) {
      lastScrollY = currentScrollY;
      return;
    }
    
    const isScrollingDown = lastScrollY < currentScrollY;
    const scrollDifference = Math.abs(lastScrollY - currentScrollY);
    
    if (scrollDifference > 10) {
      setVisible(!isScrollingDown);
      lastScrollY = currentScrollY;
    }
  };
  
  const handleScroll = () => {
    if (!ticking) {
      // Use requestAnimationFrame to limit updates
      window.requestAnimationFrame(updateNavVisibility);
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, [isExpanded]);

  // Toggle expanded menu
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Close expanded menu when a link is clicked
  const handleNavClick = () => {
    setIsExpanded(false);
  };

  return (
    <motion.nav 
      className={styles.mobileNavigation}
      initial={{ transform: "translateY(0)" }}
      animate={{ transform: visible ? "translateY(0)" : "translateY(114%)" }}
      transition={{ 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1],
        type: "tween"
       }}
       style={{ willChange: "transform" }}
    >
      <div className={styles.primaryNav}>
        <div className={styles.leftSection}>
          {leftNavItems.map((index) => {
            const link = navLinks[index];
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={handleNavClick}
              >
                <div className={styles.navIcon}>
                  {iconMap[link.name as keyof typeof iconMap]}
                </div>
                <span className={styles.navLabel}>{t(`items.${link.name}`)}</span>
                {isActive && <div className={styles.activeIndicator} />}
              </Link>
            );
          })}
        </div>
        
        {/* Center button */}
        <div className={styles.centerSection}>
          <button 
            className={`${styles.centerButton} ${isExpanded ? styles.active : ''}`}
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
          >
            <div className={styles.buttonBackground}>
              <motion.div 
                className={styles.iconContainer}
                animate={{ rotate: isExpanded ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isExpanded ? <X size={20} /> : <Plus size={20} />}
              </motion.div>
            </div>
          </button>
        </div>
        
        <div className={styles.rightSection}>
          {rightNavItems.map((index) => {
            const link = navLinks[index];
            const isActive = pathname === link.href;
            
            return (
              <Link 
                key={link.name}
                href={link.href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={handleNavClick}
              >
                <div className={styles.navIcon}>
                  {iconMap[link.name as keyof typeof iconMap]}
                </div>
                <span className={styles.navLabel}>{t(`items.${link.name}`)}</span>
                {isActive && <div className={styles.activeIndicator} />}
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Expanded menu overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className={styles.expandedMenuContainer}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.19, 1.0, 0.22, 1.0] }}
          >
            <div className={styles.expandedMenu}>
              {secondaryNavItems.map((index, i) => {
                const link = navLinks[index];
                const isActive = pathname === link.href;
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, delay: i * 0.07 }}
                  >
                    <Link 
                      href={link.href}
                      className={`${styles.expandedNavItem} ${isActive ? styles.active : ''}`}
                      onClick={handleNavClick}
                    >
                      <div className={styles.expandedNavIcon}>
                        {iconMap[link.name as keyof typeof iconMap]}
                      </div>
                      <span className={styles.expandedNavLabel}>{t(`items.${link.name}`)}</span>
                      {isActive && <div className={styles.expandedActiveIndicator} />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Backdrop for expanded menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}