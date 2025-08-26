"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import styles from "./PageHeader.module.scss";

interface Breadcrumb {
  labelKey: string;
  href: string;
  active?: boolean;
}

interface PageHeaderProps {
  titleKey: string;
  subtitleKey: string;
  badgeKey: string;
  breadcrumbs: Breadcrumb[];
  namespace: string;
  highlightKey?: string; // Optional key for highlighted text within title
}

const PageHeader: React.FC<PageHeaderProps> = ({
  titleKey,
  subtitleKey,
  badgeKey,
  breadcrumbs,
  namespace,
  highlightKey,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = useLocale();
  const t = useTranslations(`pageHeader.${namespace}`);
  
  // Trigger animations after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to handle rich text with highlighting
  const renderTitle = () => {
    if (!highlightKey) {
      return <span>{t(titleKey)}</span>;
    }
    
    // Handle highlighted portion of text
    return t.rich(titleKey, {
      highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
    });
  };

  return (
    <div className={styles.heroWrapper}>
      {/* Enhanced background gradient animation */}
      <motion.div 
        className={styles.backgroundGradient}
        initial={{ 
          opacity: 0,
          scale: 0.8,
          rotateX: 10
        }}
        animate={{ 
          opacity: 1,
          scale: 1,
          rotateX: 0
        }}
        transition={{ 
          duration: 1.8, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.2
        }}
      />

      <motion.div className={styles.heroContent}>
        <div className={styles.container}>
          {/* Breadcrumbs Navigation */}
          <nav className={styles.breadcrumbs} aria-label="breadcrumb">
            <ol>
              {breadcrumbs.map((crumb, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -10 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.8 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  {crumb.active ? (
                    <span className={styles.activeCrumb}>
                      {t(crumb.labelKey)}
                    </span>
                  ) : (
                    <Link href={`/${locale}${crumb.href}`}>
                      {t(crumb.labelKey)}
                    </Link>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className={styles.separator}>
                      <ChevronRight size={14} />
                    </span>
                  )}
                </motion.li>
              ))}
            </ol>
          </nav>

          {/* Badge */}
          <motion.div 
            className={styles.preHeadingWrapper}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20, scale: isLoaded ? 1 : 0.9 }}
            transition={{ 
              duration: 0.6, 
              delay: 1.1,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <span className={styles.preHeadingPill}>
              {t(badgeKey)}
            </span>
          </motion.div>
          
          {/* Main Title */}
          <motion.h1 
            className={styles.heading}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30, scale: isLoaded ? 1 : 0.95 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {renderTitle()}
          </motion.h1>
          
          {/* Subtitle/Description */}
          <motion.p 
            className={styles.description}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ 
              duration: 0.7, 
              delay: 1.4,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {t(subtitleKey)}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default PageHeader;