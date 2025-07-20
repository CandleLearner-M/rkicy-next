"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./PartnerLogos.module.scss";

const PARTNER_LOGOS = [
  { name: "Zebra", src: "/icons/zebra.svg", width: 120 },
  { name: "OpenAI", src: "/icons/openai.svg", width: 130 },
  { name: "SAP", src: "/icons/sap.svg", width: 90 },
  { name: "Microsoft", src: "/icons/microsoft.svg", width: 130 },
];

export default function PartnerLogos() {
  return (
    <div className={styles.partnersSection}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className={styles.partnersContainer}
      >
        <p className={styles.partnersTitle}>
          We are proud partners of world-class brands
        </p>
        
        <div className={styles.logoGrid}>
          {PARTNER_LOGOS.map((logo) => (
            <div key={logo.name} className={styles.logoWrapper}>
              <Image
                src={logo.src}
                alt={`${logo.name} logo`}
                width={logo.width}
                height={40}
                className={styles.logo}
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}