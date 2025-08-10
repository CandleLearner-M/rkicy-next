"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useTranslations } from 'next-intl';
import styles from "./PartnerLogos.module.scss";

const PARTNER_LOGOS = [
  { name: "zebra", src: "/icons/zebra.svg", width: 130 },
  { name: "openai", src: "/icons/openai.svg", width: 140 },
  { name: "sap", src: "/icons/sap.svg", width: 100 },
  // { name: "microsoft", src: "/icons/microsoft.svg", width: 140 },
];

export default function PartnerLogos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const t = useTranslations('home.partners');
  
  return (
    <div className={styles.partnersSection} ref={ref}>
      <motion.div
        className={styles.contentContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className={styles.partnersTitleWrapper}>
          <div className={styles.titleLine} />
          <h3 className={styles.partnersTitle}>
            {t('title')}
          </h3>
          <div className={styles.titleLine} />
        </div>
        
        <div className={styles.logosContainer}>
          {PARTNER_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              className={styles.logoWrapper}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Image
                src={logo.src}
                alt={t('logos.' + logo.name)}
                width={logo.width}
                height={40}
                className={styles.logoImage}
                draggable={false}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}