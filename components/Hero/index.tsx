"use client";

import { useEffect, useState } from "react";
import MobileHero from "./MobileHero";
import DesktopHero from "./DesktopHero";

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  if (!isMounted) return null;
  
  return isMobile ? <MobileHero /> : <DesktopHero />;
}