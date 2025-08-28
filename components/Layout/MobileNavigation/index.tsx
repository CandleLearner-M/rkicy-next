"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { 
  Home, 
  Info, 
  LayoutGrid, 
  HardDrive, 
  Briefcase, 
  PhoneCall,
  Plus,
  X
} from "lucide-react";
import styles from "./MobileNavigation.module.scss";
import Image from "next/image";

// Map icons to nav items
const iconMap = {
  home: <Home size={18} />,
  about: <Info size={18} />,
  services: <LayoutGrid size={18} />,
  hardware: <HardDrive size={18} />,
  projects: <Briefcase size={18} />,
  contact: <PhoneCall size={18} />
};

export default function MobileNavigation() {
  const [visible, setVisible] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("navigation");

  // Nav links with active state - now using translation keys
  const navLinks = [
    { name: "home", href: "/" },
    { name: "about", href: "/about" },
    { name: "services", href: "/services" },
    { name: "projects", href: "/projects" },
    { name: "contact", href: "/contact" },
  ];

  // Left and right items
  const leftNavItems = [0, 1];   // Home, About
  const rightNavItems = [2, 4];  // Services, Contact

  // Track chat state from assistant
  useEffect(() => {
    const onChatState = (e) => {
      const open = !!e?.detail?.open;
      setChatOpen(open);
      if (open) setVisible(true); // ensure nav is shown when chat opens
    };
    window.addEventListener("rkicy:chat-state", onChatState as any);
    return () => window.removeEventListener("rkicy:chat-state", onChatState as any);
  }, []);

  // Handle scroll behavior; do not hide when chat is open
  useEffect(() => {
    let ticking = false;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

    const updateNavVisibility = () => {
      ticking = false;
      if (chatOpen) {
        // Keep visible while chat is open
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setVisible(true);
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
        window.requestAnimationFrame(updateNavVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [chatOpen]);

  // Center button toggles AI chat
  const toggleAIChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("rkicy:toggle-chat", { detail: { source: "mobile-nav" } }));
    }
  };

  const centerAria = chatOpen
    ? t("accessibility.closeAssistant", { default: "Close AI Assistant" })
    : t("accessibility.openAssistant", { default: "Open AI Assistant" });

  return (
    <motion.nav
      className={styles.mobileNavigation}
      initial={{ transform: "translateY(0)" }}
      animate={{ transform: visible ? "translateY(0)" : "translateY(115%)" }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], type: "tween" }}
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
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
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

        {/* Center AI button: logo when closed, X when open */}
        <div className={styles.centerSection}>
          <button
            className={styles.centerButton}
            onClick={toggleAIChat}
            aria-label={centerAria}
          >
            <div className={styles.buttonBackground}>
              <div className={styles.iconContainer}>
                {chatOpen ? (
                  <X size={22} />
                ) : (
                  <Image src="/ai/logo.svg" alt="AI Assistant" width={32} height={32} />
                )}
              </div>
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
                className={`${styles.navItem} ${isActive ? styles.active : ""}`}
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
    </motion.nav>
  );
}