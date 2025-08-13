'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './SectionBackground.module.scss';

type BackgroundStyle = 'minimal' | 'subtle' | 'accent' | 'gradient';
type BackgroundPosition = 'left' | 'center' | 'right';

interface SectionBackgroundProps {
  children: ReactNode;
  style?: BackgroundStyle;
  position?: BackgroundPosition;
  className?: string;
  animate?: boolean;
}

export default function SectionBackground({
  children,
  style = 'minimal',
  position = 'center',
  className = '',
  animate = true,
}: SectionBackgroundProps) {
  const backgroundClasses = [
    styles.sectionBackground,
    styles[`style-${style}`],
    styles[`position-${position}`],
    className
  ].join(' ');

  return (
    <section className={backgroundClasses}>
      {animate && style === 'gradient' && (
        <motion.div
          className={styles.gradientEffect}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      )}
      
      {animate && style === 'accent' && (
        <motion.div
          className={styles.accentLine}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        />
      )}
      
      <div className={styles.content}>
        {children}
      </div>
    </section>
  );
}