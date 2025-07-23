'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
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
  
  // Available languages
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'ar', label: 'العربية' }
  ];
  
  // Animation variants for dropdown
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: 'auto',
      transition: { duration: 0.3, ease: "easeOut" } 
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: { duration: 0.2, ease: "easeIn" }
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
    <div className={`${styles.languageSwitcher} ${styles[variant]}`}>
      <button 
        className={`${styles.languageButton} ${buttonClassName || ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Globe size={variant === 'compact' ? 16 : 18} strokeWidth={variant === 'compact' ? 2 : 1.5} />
        <span>{currentLanguage}</span>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            transition: { duration: 0.3, ease: "easeInOut" }
          }}
        >
          <ChevronDown size={variant === 'compact' ? 14 : 16} strokeWidth={variant === 'compact' ? 2.5 : 2} />
        </motion.div>
      </button>
      
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
              <button 
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`${styles.languageOption} ${locale === lang.code ? styles.activeLanguage : ''}`}
              >
                {lang.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}