"use client";

import { motion } from "framer-motion";
import { MessageCircle, FileText, Mail, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./ContactCards.module.scss";

export default function ContactCards() {
  const t = useTranslations("contact.cards");
  
  return (
    <div className={styles.contactCards}>
      <motion.div 
        className={styles.contactCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.cardIcon}>
          <MessageCircle size={24} />
        </div>
        <h3>{t("chat.title")}</h3>
        <p>{t("chat.description")}</p>
        <Link href="#" className={styles.cardAction}>
          {t("chat.action")} <ChevronRight size={16} />
        </Link>
      </motion.div>
      
      <motion.div 
        className={styles.contactCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className={styles.cardIcon}>
          <FileText size={24} />
        </div>
        <h3>{t("quote.title")}</h3>
        <p>{t("quote.description")}</p>
        <Link href="/quote" className={styles.cardAction}>
          {t("quote.action")} <ChevronRight size={16} />
        </Link>
      </motion.div>
      
      <motion.div 
        className={styles.contactCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className={styles.cardIcon}>
          <Mail size={24} />
        </div>
        <h3>{t("email.title")}</h3>
        <p>{t("email.description")}</p>
        <a href="mailto:info@rkicy.com" className={styles.cardAction}>
          info@rkicy.com <ChevronRight size={16} />
        </a>
      </motion.div>
    </div>
  );
}