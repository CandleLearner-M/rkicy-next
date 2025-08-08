import { useState, useCallback, useEffect, useRef } from 'react';
import { throttle } from 'lodash-es';

/**
 * Enhanced Smart Scroll hook with improved performance
 * Controls the visibility of the floating navbar based on scroll behavior
 */
export function useSmartScroll({
  threshold = 10,
  throttleDelay = 100,
  staticNavbarHeight = 80,
  initiallyVisible = false,
}) {
  const [visible, setVisible] = useState(initiallyVisible);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const hasScrolledPast = useRef(false);
  const lastScrollTime = useRef(Date.now());

  const throttledScrollHandler = useCallback(
    throttle(() => {
      const now = Date.now();
      const currentScrollY = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollY;
      
      // Update time of last scroll
      lastScrollTime.current = now;
      
      // Check if we've scrolled past threshold
      if (currentScrollY > staticNavbarHeight + threshold) {
        hasScrolledPast.current = true;
      }
      
      // Very close to top - always hide floating navbar (show static)
      if (currentScrollY < 10) {
        setVisible(false);
      } 
      // Scrolling down - hide
      else if (!isScrollingUp && currentScrollY > staticNavbarHeight) {
        setVisible(false);
      }
      // Scrolling up AND has scrolled down enough before - show
      else if (isScrollingUp && hasScrolledPast.current && currentScrollY > staticNavbarHeight) {
        setVisible(true);
      }
      
      setPrevScrollPos(currentScrollY);
    }, throttleDelay),
    [prevScrollPos, threshold, throttleDelay, staticNavbarHeight]
  );

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler, { passive: true });

    return () => {
      throttledScrollHandler.cancel();
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [throttledScrollHandler]);

  return { visible };
}