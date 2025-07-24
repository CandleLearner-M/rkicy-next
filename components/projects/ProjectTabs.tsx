'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './ProjectTabs.module.scss';

interface Tab {
  id: string;
  label: string;
}

interface ProjectTabsProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProjectTabs({ tabs, activeTab, setActiveTab }: ProjectTabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  
  // Scroll to selected tab section when tab changes
  useEffect(() => {
    const element = document.getElementById(activeTab);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [activeTab]);
  
  // Handle scroll behavior for sticky tabs
  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        if (window.scrollY > 500) {
          tabsRef.current.classList.add(styles.sticky);
        } else {
          tabsRef.current.classList.remove(styles.sticky);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className={styles.tabsContainer} ref={tabsRef}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              aria-selected={activeTab === tab.id}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div 
                  className={styles.activeIndicator}
                  layoutId="activeTabIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}