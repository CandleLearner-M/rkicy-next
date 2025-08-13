import { useEffect, useRef, useState } from 'react';

type Options = {
  threshold?: number;        // how far down before floating can appear
  upTolerance?: number;      // pixels you must scroll up before showing
  downTolerance?: number;    // pixels you must scroll down before hiding
  topEpsilon?: number;       // y <= topEpsilon counts as "at top"
  initiallyVisible?: boolean;
};

export function useSmartScroll({
  threshold = 80,
  upTolerance = 6,
  downTolerance = 10,
  topEpsilon = 8,
  initiallyVisible = false,
}: Options = {}) {
  const [atTop, setAtTop] = useState(true);
  const [visible, setVisible] = useState(initiallyVisible);

  const lastY = useRef(0);
  const ticking = useRef(false);
  const prevAtTop = useRef<boolean>(true);
  const prevVisible = useRef<boolean>(initiallyVisible);

  useEffect(() => {
    const update = () => {
      ticking.current = false;

      const y = window.scrollY;
      const delta = y - lastY.current;
      const dirDown = delta > 0;

      // compute atTop
      const nextAtTop = y <= topEpsilon;

      let nextVisible = prevVisible.current;

      if (nextAtTop) {
        // when near top, always hide floating navbar
        nextVisible = false;
      } else if (dirDown && Math.abs(delta) > downTolerance) {
        // scrolling down: hide
        nextVisible = false;
      } else if (!dirDown && Math.abs(delta) > upTolerance && y > threshold) {
        // scrolling up after passing threshold: show
        nextVisible = true;
      }

      lastY.current = y;

      if (nextAtTop !== prevAtTop.current) {
        prevAtTop.current = nextAtTop;
        setAtTop(nextAtTop);
      }
      if (nextVisible !== prevVisible.current) {
        prevVisible.current = nextVisible;
        setVisible(nextVisible);
      }
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    // initialize
    lastY.current = window.scrollY;
    prevAtTop.current = window.scrollY <= topEpsilon;
    setAtTop(prevAtTop.current);
    setVisible(initiallyVisible);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [downTolerance, upTolerance, threshold, topEpsilon, initiallyVisible]);

  return { atTop, visible };
}