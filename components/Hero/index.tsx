"use client";

import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";
import { useScreenSize } from "@/utils/useScreenSize";
import styles from './Hero.module.scss';

export default function Hero() {
  const { isDesktop, isMobile, isTablet, isMounted } = useScreenSize();
  
  // Show a placeholder with similar height during mounting
  if (!isMounted) {
    return <div className={styles.hero} aria-hidden="true">
      <div className={styles.backgroundElements}>
        <div className={styles.gridOverlay}></div>
      </div>
    </div>;
  }
  
  return (
    <>
      {(isMobile || isTablet) && <MobileHero />}
      {isDesktop && <DesktopHero />}
    </>
  );
}