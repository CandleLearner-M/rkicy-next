"use client";

import styles from "./FixedBackground.module.scss";

export default function FixedBackground() {
  return (
    <div className={styles.fixedBackground}>
      {/* Static gradients */}
      <div className={styles.gradient1} />
      <div className={styles.gradient2} />
      
      {/* Static elements */}
      <div className={styles.backgroundElements}>
        {/* Grid pattern for tech aesthetic */}
        <div className={styles.grid} />
        
        {/* Subtle dots */}
        <div className={styles.dotsContainer}>
          {[...Array(8)].map((_, i) => (
            <div
              key={`dot-${i}`}
              className={styles.dot}
              style={{
                top: `${10 + (i * 12)}%`,
                left: `${5 + (i * 12)}%`,
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
              }}
            />
          ))}
        </div>
        
        {/* Noise texture overlay for depth */}
        <div className={styles.noise} />
      </div>
    </div>
  );
}