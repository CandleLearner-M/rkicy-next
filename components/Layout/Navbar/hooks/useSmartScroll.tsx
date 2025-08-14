import { useState, useCallback, useEffect, useRef } from 'react';
import { throttle } from 'lodash-es';

interface UseSmartScrollOptions {
  threshold?: number;         // How far to scroll before navbar can hide
  topEpsilon?: number;        // How far from top to still consider "at top"
  throttleDelay?: number;     // Throttle delay in ms
  animationDuration?: number; // Duration of navbar animations
}

/**
 * Custom hook that handles smart scroll behavior
 * Shows/hides UI elements based on scroll direction with improved performance
 */
export function useSmartScroll({
  threshold = 80,
  topEpsilon = 10,
  throttleDelay = 150,
  animationDuration = 400,
}: UseSmartScrollOptions = {}) {
  const [visible, setVisible] = useState<boolean>(true);
  const [atTop, setAtTop] = useState<boolean>(true);
  const lastChangeTimeRef = useRef<number>(0);
  
  // Track accumulated scroll distance to prevent sensitivity issues
  const upScrollDistanceRef = useRef<number>(0);
  const downScrollDistanceRef = useRef<number>(0);
  const lastScrollYRef = useRef<number>(0);
  
  // Constants for scroll tolerance
  const upTolerance = 30;   // How far to scroll up before showing navbar
  const downTolerance = 40; // How far to scroll down before hiding navbar
  
  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      const scrollDifference = Math.abs(currentScrollY - lastScrollYRef.current);
      
      // Don't allow state changes if animation is in progress
      if (currentTime - lastChangeTimeRef.current < animationDuration) {
        lastScrollYRef.current = currentScrollY;
        return;
      }
      
      // Always show navbar at top of page
      if (currentScrollY <= topEpsilon) {
        setAtTop(true);
        setVisible(true);
        lastChangeTimeRef.current = currentTime;
        lastScrollYRef.current = currentScrollY;
        return;
      } else {
        setAtTop(false);
      }
      
      // Reset counters when direction changes
      if (isScrollingDown) {
        upScrollDistanceRef.current = 0;
        downScrollDistanceRef.current += scrollDifference;
      } else {
        downScrollDistanceRef.current = 0;
        upScrollDistanceRef.current += scrollDifference;
      }
      
      // Update visibility based on accumulated distance
      if (downScrollDistanceRef.current > downTolerance && currentScrollY > threshold) {
        setVisible(false);
        lastChangeTimeRef.current = currentTime;
      } else if (upScrollDistanceRef.current > upTolerance) {
        setVisible(true);
        lastChangeTimeRef.current = currentTime;
      }
      
      lastScrollYRef.current = currentScrollY;
    }, throttleDelay),
    [threshold, topEpsilon, animationDuration, throttleDelay]
  );
  
  useEffect(() => {
    // Initialize last scroll position
    lastScrollYRef.current = window.scrollY;
    
    // Initial state
    setAtTop(window.scrollY <= topEpsilon);
    
    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      handleScroll.cancel(); // Cancel any pending throttled calls
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, topEpsilon]);
  
  return { visible, atTop };
}