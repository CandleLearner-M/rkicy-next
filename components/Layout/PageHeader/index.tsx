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
      {/* Background elements covering the full hero */}
      <div className={styles.background}>
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2 }}
        ></motion.div>
        
        <motion.div 
          className={styles.pattern}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 0.8 : 0, scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className={styles.patternInner}
            animate={{ 
              backgroundPosition: isLoaded ? "20px 20px" : "0px 0px" 
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        
        <motion.div 
          className={styles.glow}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? [0, 0.3, 0.1] : 0 }}
          transition={{ 
            duration: 3, 
            times: [0, 0.5, 1], 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
      </div>

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
                    delay: 0.3 + index * 0.1,
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.6,
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.7,
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
              delay: 0.8,
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