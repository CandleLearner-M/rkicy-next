import { useState, useCallback, useEffect } from 'react';
import { throttle } from 'lodash-es';

interface UseSmartScrollOptions {
  threshold?: number;
  throttleDelay?: number;
}

/**
 * Custom hook that handles smart scroll behavior
 * Shows/hides UI elements based on scroll direction
 */
export function useSmartScroll({
  threshold = 10,
  throttleDelay = 100,
}: UseSmartScrollOptions = {}) {
  const [visible, setVisible] = useState<boolean>(true);
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

  const throttledScrollHandler = useCallback(
    throttle(() => {
      const newScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > newScrollPos;

      setVisible(isScrollingUp || newScrollPos < threshold);
      setPrevScrollPos(newScrollPos);
    }, throttleDelay),
    [prevScrollPos, threshold, throttleDelay]
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
