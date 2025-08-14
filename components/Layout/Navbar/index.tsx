'use client';

import { useState, useEffect } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './UnifiedNavbar.module.scss';
import LanguageSwitcher from '../../Common/LanguageSwitcher';
import { useSmartScroll } from './hooks/useSmartScroll';
import ThemeSwitcher from '../../Common/ThemeSwitcher';

  // Motion variants with entrance animation
  const navbarVariants = {
  initial: {
    transform: "translateY(-115%)",
  },
  hero: {
    transform: "translateY(0)",
    boxShadow: 'none',
  },
  floating: {
    transform: "translateY(0)",
  },
  hidden: {
    transform: "translateY(-115%)",
  },
} as const;

  // Logo variants for entrance animation
  const logoVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  } as const;

  // Navigation links staggered entrance
  const navLinksContainerVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  } as const;

  const navLinkItemVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  } as const;

  // Actions container variants
  const navActionsVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  } as const;

  const navActionItemVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4, 
        ease: [0.23, 1, 0.32, 1] 
      }
    }
  } as const;

interface NavLink {
  name: string;
  href: string;
}

export default function UnifiedNavbar(): JSX.Element | null {
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();
  const t = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();

  // One source of truth for scroll-driven state
  const { atTop, visible } = useSmartScroll({
    threshold: 80,
    upTolerance: 6,
    downTolerance: 10,
    topEpsilon: 8,
    initiallyVisible: false,
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'fr' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const navLinks: NavLink[] = [
    { name: t('navigation.home'), href: `/${locale}` },
    { name: t('navigation.about'), href: `/${locale}/about` },
    { name: t('navigation.services'), href: `/${locale}/services` },
    // { name: t('navigation.partners'), href: `/${locale}/partners` },
    { name: t('navigation.hardware'), href: `/${locale}/hardware` },
    { name: t('navigation.projects'), href: `/${locale}/projects` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ];



  const currentVariant = atTop ? 'hero' : visible ? 'floating' : 'hidden';

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.container}>
        <LayoutGroup>
          <AnimatePresence>
            <motion.nav
              className={`${styles.navbar} ${atTop ? styles.heroNavbar : styles.floatingNavbar}`}
              initial="initial"
              animate={currentVariant}
              variants={navbarVariants}
              transition={{ 
                duration: 0.5,
                ease: [0.23, 1, 0.32, 1],
                type: "tween"
              }}
              role="navigation"
              aria-label={t('navigation.mainNavigation')}
              //  style={{ transform: 'translateZ(0)' }}
              style={{ willChange: "transform" }}
            >
              <motion.div 
                className={styles.logoContainer}
                variants={logoVariants}
                initial="initial"
                animate="animate"
              >
                <Link href={`/${locale}`} className={styles.logo} aria-label={t('navigation.home')}>
                  <Logo />
                </Link>
              </motion.div>

              <div className={styles.desktopNav}>
                <motion.ul 
                  className={styles.navLinks}
                  variants={navLinksContainerVariants}
                  initial="initial"
                  animate="animate"
                >
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <motion.li 
                        key={link.name} 
                        className={`${styles.navItem} ${active ? styles.active : ''}`}
                        variants={navLinkItemVariants}
                      >
                        <Link
                          href={link.href}
                          className={`${styles.navLink} ${active ? styles.active : ''}`}
                          aria-current={active ? 'page' : undefined}
                        >
                          <span>{link.name}</span>
                          {active && <div className={styles.activeIndicator} />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>

              <motion.div 
                className={styles.navActions}
                variants={navActionsVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div 
                  className={styles.languageSwitcher}
                  variants={navActionItemVariants}
                >
                  <LanguageSwitcher variant="premium" />
                </motion.div>

                <motion.button
                  className={styles.languageToggle}
                  onClick={toggleLanguage}
                  aria-label={t('language.switch')}
                  variants={navActionItemVariants}
                >
                  <Globe size={18} className={styles.globeIcon} />
                  <span className={styles.currentLanguage}>{locale.toUpperCase()}</span>
                </motion.button>

                <motion.div
                  variants={navActionItemVariants}
                >
                  <ThemeSwitcher
                    className={styles.themeToggle}
                    ariaLabel={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
                    iconSize={22}
                    duration={500}
                  />
                </motion.div>
              </motion.div>
            </motion.nav>
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </div>
  );
}