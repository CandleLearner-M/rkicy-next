"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Expand } from '@theme-toggles/react';
import "@theme-toggles/react/css/Expand.css"; 

interface Props {
  className?: string;
  ariaLabel?: string;
  iconSize?: number | string;
  duration?: number;
}

export default function ThemeSwitcher({ className, ariaLabel = 'Toggle Theme', iconSize = 24, duration = 250 }: Props) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  const isDarkMode = (theme === 'system' ? resolvedTheme : theme) === 'dark'

  return (
   <Expand
      className={className}
      aria-label={ariaLabel}
      toggled={isDarkMode}
      toggle={() => setTheme(isDarkMode ? 'light': 'dark')}
      duration={duration}  
      style={{
        fontSize: typeof iconSize === 'number' ? `${iconSize}px` : iconSize,
      }}
    />
  );
}