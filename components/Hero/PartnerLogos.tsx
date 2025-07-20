"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import styles from "./PartnerLogos.module.scss";

const PARTNER_LOGOS = [
  { name: "Zebra", src: "/icons/zebra.svg", width: 130 },
  { name: "OpenAI", src: "/icons/openai.svg", width: 140 },
  { name: "SAP", src: "/icons/sap.svg", width: 100 },
  { name: "Microsoft", src: "/icons/microsoft.svg", width: 140 },
];

export default function PartnerLogos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
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
            Trusted by Industry Leaders
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
                alt={`${logo.name} logo`}
                width={logo.width}
                height={40}
                className={styles.logoImage}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}