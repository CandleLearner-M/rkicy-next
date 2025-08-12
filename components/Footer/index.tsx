"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './Footer.module.scss';

const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribeStatus('success');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
      setEmail('');
    } else {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Company info */}
          <div className={styles.companyInfo}>
            <div className={styles.logo}>
              <Image
                src="/rkicy-logo.svg"
                alt="Rkicy Technology"
                width={120}
                height={40}
                draggable={false}
                className={styles.logoImage}
              />
              <span className={styles.logospan}>Tech</span>
            </div>
            <p className={styles.companyDescription}>
              {t('company.description')}
            </p>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <span>{t('company.contact.phone')}</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <span>{t('company.contact.email')}</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>{t('company.contact.location')}</span>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className={styles.socialLink}>
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialLink}>
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={styles.socialLink}>
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          {/* Link sections */}
          <div className={styles.linksSection}>
            {/* Company links */}
            <div className={styles.linkColumn}>
              <h3 className={styles.linkHeader}>{t('links.company.title')}</h3>
              <ul className={styles.linkList}>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/about`}>{t('links.company.about')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/projects`}>{t('links.company.projects')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/contact`}>{t('links.company.contact')}</Link>
                </li>
              </ul>
            </div>
            
            {/* Services links */}
            <div className={styles.linkColumn}>
              <h3 className={styles.linkHeader}>{t('links.services.title')}</h3>
              <ul className={styles.linkList}>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/services`}>{t('links.services.ai')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/services`}>{t('links.services.enterprise')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/services`}>{t('links.services.webMobile')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/services`}>{t('links.services.sap')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/hardware`}>{t('links.services.hardware')}</Link>
                </li>
              </ul>
            </div>
            
            {/* Resources links */}
            <div className={styles.linkColumn}>
              <h3 className={styles.linkHeader}>{t('links.resources.title')}</h3>
              <ul className={styles.linkList}>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="#">{t('links.resources.caseStudies')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/#partners`}>{t('links.resources.partners')}</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href={`/${locale}/#testimonials`}>{t('links.resources.testimonials')}</Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter section */}
          <div className={styles.newsletterSection}>
            <h3 className={styles.newsletterHeader}>{t('newsletter.title')}</h3>
            <p className={styles.newsletterText}>
              {t('newsletter.description')}
            </p>
            
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('newsletter.placeholder')} 
                  className={styles.emailInput}
                  required 
                />
                <button type="submit" className={styles.submitButton}>
                  <ArrowRight size={18} />
                </button>
              </div>
              
              {subscribeStatus === 'success' && (
                <p className={styles.statusMessage + ' ' + styles.success}>
                  {t('newsletter.success')}
                </p>
              )}
              
              {subscribeStatus === 'error' && (
                <p className={styles.statusMessage + ' ' + styles.error}>
                  {t('newsletter.error')}
                </p>
              )}
            </form>
            
            <div className={styles.certifications}>
              <div className={styles.certBadge}>
                <div className={styles.certContent}>
                  <span>{t('certifications.iso.prefix')}</span>
                  {t('certifications.iso.value')}
                </div>
              </div>
              <div className={styles.certBadge}>
                <div className={styles.certContent}>
                  <span>{t('certifications.cmmi.prefix')}</span>
                  {t('certifications.cmmi.value')}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partners section */}
        <div className={styles.partnersSection}>
          <h3 className={styles.partnerHeader}>{t('partners.title')}</h3>
          <div className={styles.partnerLogos}>
            <Image src="/icons/zebra.svg" alt="Zebra" width={120} height={40} />
            <Image src="/icons/openai.svg" alt="OpenAI" width={120} height={40} />
            <Image src="/icons/sap.svg" alt="SAP" width={120} height={40} />
          </div>
        </div>
        
        <div className={styles.divider} />
        
        {/* Bottom section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            {t.rich('bottom.copyright', { year: currentYear })}
          </div>
          
          <div className={styles.legalLinks}>
            <Link href={`/${locale}/terms`}>{t('bottom.terms')}</Link>
            <span className={styles.dot}>•</span>
            <Link href={`/${locale}/privacy`}>{t('bottom.privacy')}</Link>
            <span className={styles.dot}>•</span>
            <Link href={`/${locale}/cookies`}>{t('bottom.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;