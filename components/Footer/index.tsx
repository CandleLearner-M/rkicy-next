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
  ArrowRight,
  ArrowUp
} from 'lucide-react';
import styles from './Footer.module.scss';
import Logo from '../Navbar/Logo';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Here you would implement API call to subscribe
      console.log('Subscribing:', email);
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
      
      
      {/* Main content */}
      <div className={styles.container}>
        <div className={styles.topSection}>
          {/* Company info */}
          <div className={styles.companyInfo}>
            {/* <div className={styles.logoWrapper}>
              <Image 
                src="/icons/logo.svg" 
                alt="Rkicy Technology"
                width={140}
                height={40}
                className={styles.logo}
              />
            </div> */}
            <div className={styles.logo}>
              <Image
                src="/logo.svg"
                alt="Rkicy Technology"
                width={120}
                height={40}
                draggable={false}
                className={styles.logoImage}
              />
              <span className={styles.logospan}>Tech</span>
            </div>
            <p className={styles.companyDescription}>
              Leading Morocco's digital transformation with enterprise-grade IT solutions,
              from AI to hardware. Empowering businesses across Morocco and beyond.
            </p>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={18} className={styles.contactIcon} />
                <span>+212 522 123 456</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} className={styles.contactIcon} />
                <span>contact@rkicy.tech</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={18} className={styles.contactIcon} />
                <span>Casablanca, Morocco</span>
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
              <h3 className={styles.linkHeader}>Company</h3>
              <ul className={styles.linkList}>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/team">Our Team</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/news">News</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            
            {/* Services links */}
            <div className={styles.linkColumn}>
              <h3 className={styles.linkHeader}>Services</h3>
              <ul className={styles.linkList}>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/services/ai-solutions">AI Solutions</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/services/enterprise-it">Enterprise IT</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/services/cloud-solutions">Cloud Solutions</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/services/digital-transformation">Digital Transformation</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/services/hardware">Hardware</Link>
                </li>
              </ul>
            </div>
            
            {/* Resources links */}
            <div className={styles.linkColumn}>
              <h3 className={styles.linkHeader}>Resources</h3>
              <ul className={styles.linkList}>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/case-studies">Case Studies</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/whitepapers">Whitepapers</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/partners">Partners</Link>
                </li>
                <li>
                  <ChevronRight size={16} className={styles.linkIcon} />
                  <Link href="/testimonials">Testimonials</Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter section */}
          <div className={styles.newsletterSection}>
            <h3 className={styles.newsletterHeader}>Subscribe to Our Newsletter</h3>
            <p className={styles.newsletterText}>
              Stay updated with our latest news, insights, and tech innovations.
            </p>
            
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address" 
                  className={styles.emailInput}
                  required 
                />
                <button type="submit" className={styles.submitButton}>
                  <ArrowRight size={18} />
                </button>
              </div>
              
              {subscribeStatus === 'success' && (
                <p className={styles.statusMessage + ' ' + styles.success}>
                  Thank you for subscribing!
                </p>
              )}
              
              {subscribeStatus === 'error' && (
                <p className={styles.statusMessage + ' ' + styles.error}>
                  Please enter a valid email address.
                </p>
              )}
            </form>
            
            <div className={styles.certifications}>
              <div className={styles.certBadge}>
                <div className={styles.certContent}>
                  <span>ISO</span>
                  27001
                </div>
              </div>
              <div className={styles.certBadge}>
                <div className={styles.certContent}>
                  <span>CMMI</span>
                  Level 3
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Partners section */}
        <div className={styles.partnersSection}>
          <h3 className={styles.partnerHeader}>Trusted by Industry Leaders</h3>
          <div className={styles.partnerLogos}>
            <Image src="/icons/zebra.svg" alt="Zebra" width={120} height={40} />
            <Image src="/icons/openai.svg" alt="OpenAI" width={120} height={40} />
            <Image src="/icons/sap.svg" alt="SAP" width={120} height={40} />
            <Image src="/icons/microsoft.svg" alt="Microsoft" width={120} height={40} />
          </div>
        </div>
        
        <div className={styles.divider} />
        
        {/* Bottom section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © {currentYear} Rkicy Technology. All rights reserved.
          </div>
          
          <div className={styles.legalLinks}>
            <Link href="/terms">Terms of Service</Link>
            <span className={styles.dot}>•</span>
            <Link href="/privacy">Privacy Policy</Link>
            <span className={styles.dot}>•</span>
            <Link href="/cookies">Cookies</Link>
          </div>
          
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;