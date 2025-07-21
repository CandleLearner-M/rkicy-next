"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  'Home': <Home size={18} />,
  'About': <Info size={18} />,
  'Services': <LayoutGrid size={18} />,
  'Partners': <Handshake size={18} />,
  'Hardware': <HardDrive size={18} />,
  'Projects': <Briefcase size={18} />,
  'Contact': <PhoneCall size={18} />
};

// Nav links with active state
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Partners', href: '/partners' },
  { name: 'Hardware', href: '/hardware' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' }
];

// First and second half of nav items to show on either side of the center button
const leftNavItems = [0, 2]; // Home, Services
const rightNavItems = [5, 6]; // Projects, Contact
const secondaryNavItems = [1, 3, 4]; // About, Partners, Hardware

export default function MobileNavigation() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

  // Handle scroll behavior to hide/show nav bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollThreshold = 10;
      
      // If at top of page, always show
      if (currentScrollPos < 50) {
        setVisible(true);
        return;
      }
      
      // If menu is expanded, don't hide
      if (isExpanded) {
        return;
      }
      
      const isScrollingDown = prevScrollPos < currentScrollPos;
      const scrollDifference = Math.abs(prevScrollPos - currentScrollPos);
      
      if (scrollDifference > scrollThreshold) {
        setVisible(!isScrollingDown);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, isExpanded]);

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
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : 100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
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
                <span className={styles.navLabel}>{link.name}</span>
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
            aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
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
                <span className={styles.navLabel}>{link.name}</span>
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
                      <span className={styles.expandedNavLabel}>{link.name}</span>
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