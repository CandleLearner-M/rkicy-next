import { useEffect, useRef, useState } from 'react';

type Options = {
  threshold?: number;        // how far down before floating can appear
  upTolerance?: number;      // pixels you must scroll up before showing
  downTolerance?: number;    // pixels you must scroll down before hiding
  topEpsilon?: number;       // y <= topEpsilon counts as "at top"
  initiallyVisible?: boolean;
};

export function useSmartScroll({
  threshold = 100,
  upTolerance = 20,
  downTolerance = 30,
  initiallyVisible = true,
  topEpsilon = 10
}: Options) {
  const [visible, setVisible] = useState(initiallyVisible);
  const [atTop, setAtTop] = useState(true);
  
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let upDistance = 0;
    let downDistance = 0;
    
    const updateScrollDirection = () => {
      ticking = false;
      const currentScrollY = window.scrollY;
      
      // Always show navbar at top of page
      if (currentScrollY <= topEpsilon) {
        setAtTop(true);
        setVisible(true);
        lastScrollY = currentScrollY;
        return;
      } else {
        setAtTop(false);
      }
      
      // Calculate scroll direction and distance
      const isScrollingDown = currentScrollY > lastScrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      
      // Reset counters when direction changes
      if (isScrollingDown) {
        upDistance = 0;
        downDistance += scrollDifference;
      } else {
        downDistance = 0;
        upDistance += scrollDifference;
      }
      
      // Update visibility based on accumulated scroll distance
      if (downDistance > downTolerance && currentScrollY > threshold) {
        setVisible(false);
      } else if (upDistance > upTolerance) {
        setVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };
    
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };
    
    // Passive true improves scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold, upTolerance, downTolerance, topEpsilon]);
  
  return { visible, atTop };
}