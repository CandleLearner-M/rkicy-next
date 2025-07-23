import { useState, useCallback, useEffect, useRef } from 'react';
import { throttle } from 'lodash-es';

interface UseSmartScrollOptions {
  threshold?: number;
  throttleDelay?: number;
  staticNavbarHeight?: number;
  topOffset?: number;
  initiallyVisible?: boolean;
}

/**
 * Enhanced Smart Scroll hook that:
 * 1. Keeps navbar hidden initially
 * 2. Shows navbar only when scrolling up AND not at top of page
 * 3. Hides navbar when at top (where static navbar is)
 * 4. Hides navbar when scrolling down
 */
export function useSmartScroll({
  threshold = 10,
  throttleDelay = 100,
  staticNavbarHeight = 80, // Height of your static navbar
  topOffset = 20, // Buffer zone
  initiallyVisible = false, // Default to hidden
}: UseSmartScrollOptions = {}) {
  const [visible, setVisible] = useState<boolean>(initiallyVisible);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const hasScrolledPast = useRef<boolean>(false);

  const throttledScrollHandler = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollY;
      
      // Only show when ALL conditions are met:
      // 1. Scrolling up
      // 2. Not too close to the top (where static navbar is)
      // 3. Has scrolled past the threshold at least once before
      
      // Check if we've scrolled past threshold
      if (currentScrollY > staticNavbarHeight + threshold) {
        hasScrolledPast.current = true;
      }
      
      // Very close to top - always hide
      if (currentScrollY < staticNavbarHeight) {
        setVisible(false);
      } 
      // Scrolling down - hide
      else if (!isScrollingUp) {
        setVisible(false);
      }
      // Scrolling up AND has scrolled down enough before - show
      else if (isScrollingUp && hasScrolledPast.current) {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollY);
    }, throttleDelay),
    [prevScrollPos, threshold, throttleDelay, staticNavbarHeight]
  );

  const handleScroll = useCallback(() => {
    throttledScrollHandler();
  }, [throttledScrollHandler]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      throttledScrollHandler.cancel();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, throttledScrollHandler]);

  return { visible };
}