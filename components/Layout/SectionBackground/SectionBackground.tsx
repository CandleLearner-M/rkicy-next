'use client';

import { ReactNode } from 'react';
import styles from './SectionBackground.module.scss';

interface SectionBackgroundProps {
  children: ReactNode;
  className?: string;
  showGrid?: boolean;
}

export default function SectionBackground({
  children,
  className = '',
  showGrid = true,
}: SectionBackgroundProps) {
  const backgroundClasses = [
    styles.sectionBackground,
    className
  ].join(' ');

  return (
    <section className={backgroundClasses}>
      {showGrid && <div className={styles.gridPattern} />}
      
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}