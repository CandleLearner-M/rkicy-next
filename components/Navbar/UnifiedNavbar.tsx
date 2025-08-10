'use client';

import { useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import styles from './UnifiedNavbar.module.scss';
import LanguageSwitcher from '../LanguageSwitcher';
import { useSmartScroll } from './hooks/useSmartScroll';
import ThemeSwitcher from '../ThemeSwitcher';

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
    { name: t('navigation.partners'), href: `/${locale}/partners` },
    { name: t('navigation.hardware'), href: `/${locale}/hardware` },
    { name: t('navigation.projects'), href: `/${locale}/projects` },
    { name: t('navigation.contact'), href: `/${locale}/contact` },
  ];

  // Motion variants simplified to transform/opacity only (no width/backdropFilter)
  const navbarVariants = {
    hero: {
      y: 0,
      opacity: 1,
      boxShadow: 'none',
    },
    floating: {
      y: 0,
      opacity: 1,
    },
    hidden: {
      y: -20, // less jumpy than -100
      opacity: 0,
    },
  } as const;

  const currentVariant = atTop ? 'hero' : visible ? 'floating' : 'hidden';

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.container}>
        <LayoutGroup>
          <motion.nav
            className={`${styles.navbar} ${atTop ? styles.heroNavbar : styles.floatingNavbar}`}
            initial={false} // avoid mount animation flicker
            animate={currentVariant}
            variants={navbarVariants}
            transition={{ type: 'tween', duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            role="navigation"
            aria-label={t('navigation.mainNavigation')}
            // layout removed to reduce reflow work
            style={{ transform: 'translateZ(0)' }} // promote to its own layer
          >
            <div className={styles.logoContainer}>
              <Link href={`/${locale}`} className={styles.logo} aria-label={t('navigation.home')}>
                <Logo />
              </Link>
            </div>

            <div className={styles.desktopNav}>
              <ul className={styles.navLinks}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.name} className={`${styles.navItem} ${active ? styles.active : ''}`}>
                      <Link
                        href={link.href}
                        className={`${styles.navLink} ${active ? styles.active : ''}`}
                        aria-current={active ? 'page' : undefined}
                      >
                        <span>{link.name}</span>
                        {active && <div className={styles.activeIndicator} />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className={styles.navActions}>
              <div className={styles.languageSwitcher}>
                <LanguageSwitcher variant="premium" />
              </div>

              <button
                className={styles.languageToggle}
                onClick={toggleLanguage}
                aria-label={t('language.switch')}
              >
                <Globe size={18} className={styles.globeIcon} />
                <span className={styles.currentLanguage}>{locale.toUpperCase()}</span>
              </button>

              <ThemeSwitcher
                className={styles.themeToggle}
                ariaLabel={theme === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
                iconSize={22}
                duration={500}
              />
            </div>
          </motion.nav>
        </LayoutGroup>
      </div>
    </div>
  );
}