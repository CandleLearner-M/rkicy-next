"use client";

import { useEffect, useState } from "react";
import styles from './FixedBackground.module.scss'
import Background from "./Background";

function FixedBackground() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={styles.fixedBackground}>
      {mounted && <Background />}
    </div>
  )
}
export default FixedBackground;