'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import styles from './LanguageSwitcher.module.scss';

export default function LanguageSwitcher({ 
  variant = 'default', 
  buttonClassName,
  dropdownClassName
}) {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('common');
  const menuRef = useRef(null);
  
  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
  // Available languages
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
  ];
  
  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      height: 0,
      transition: { 
        duration: 0.2, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      height: 'auto',
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { 
        duration: 0.2, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };
  
  // Handle language change
  const handleLanguageChange = (langCode) => {
    // Replace the locale segment in the pathname
    const newPathname = pathname.replace(`/${locale}`, `/${langCode}`);
    router.push(newPathname);
    setIsOpen(false);
  };
  
  // Get current language label
  const currentLanguage = languages.find(lang => lang.code === locale)?.label || 'English';



  return (
    <div 
      className={`${styles.languageSwitcher} ${styles[variant]}`}
      ref={menuRef}
    >
      <motion.button 
        className={`${styles.languageButton} ${buttonClassName || ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        initial="rest"
      >
        <Globe 
          size={variant === 'compact' ? 16 : 18} 
          strokeWidth={variant === 'compact' ? 2 : 1.5} 
        />
        <span>{currentLanguage}</span>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
          }}
        >
          <ChevronDown 
            size={variant === 'compact' ? 14 : 16} 
            strokeWidth={variant === 'compact' ? 2.5 : 2} 
          />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`${styles.languageDropdown} ${dropdownClassName || ''}`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {languages.map((lang) => (
              <motion.button 
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${styles.languageOption} ${locale === lang.code ? styles.activeLanguage : ''}`}
               
              >
                <span>{lang.label}</span>
                {locale === lang.code && (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      transition: { delay: 0.1, duration: 0.3 }  
                    }}
                  >
                    <Check size={16} />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}