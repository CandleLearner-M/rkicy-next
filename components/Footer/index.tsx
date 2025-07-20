"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  ChevronRight,
  Send,
  ArrowUp
} from 'lucide-react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
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
      <div className={styles.waveBackground}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,176C960,181,1056,171,1152,144C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          {/* Company info section */}
          <div className={styles.companySection}>
            <div className={styles.logoWrapper}>
              <div className={styles.logoIcon}>
                <img src='/icons/logo.svg' />
              </div>
              <h3 className={styles.logoText}>Rkicy Technology</h3>
            </div>
            
            <p className={styles.description}>
              Empowering Morocco's digital future with enterprise-grade IT solutions, from AI to hardware.
            </p>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <MapPin size={18} />
                <span>Casablanca, Morocco</span>
              </div>
              <div className={styles.contactItem}>
                <Phone size={18} />
                <span>+212 522 123 456</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={18} />
                <span>contact@rkicy-tech.ma</span>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          
          {/* Links sections */}
          <div className={styles.linksContainer}>
            {/* Company links */}
            <div className={styles.linksColumn}>
              <h4>Company</h4>
              <ul>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/team">Our Team</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/blog">Blog</Link>
                </li>
              </ul>
            </div>
            
            {/* Services links */}
            <div className={styles.linksColumn}>
              <h4>Services</h4>
              <ul>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/services/ai-solutions">AI Solutions</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/services/cloud-services">Cloud Services</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/services/cybersecurity">Cybersecurity</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/services/hardware-solutions">Hardware Solutions</Link>
                </li>
              </ul>
            </div>
            
            {/* Support links */}
            <div className={styles.linksColumn}>
              <h4>Support</h4>
              <ul>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/support">Technical Support</Link>
                </li>
                <li>
                  <ChevronRight size={16} />
                  <Link href="/resources">Resources</Link>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter section */}
          <div className={styles.newsletterSection}>
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest tech insights and company news.</p>
            
            <form onSubmit={handleSubscribe} className={styles.subscribeForm}>
              <div className={styles.inputWrapper}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  aria-label="Email address"
                />
                <button type="submit" aria-label="Subscribe">
                  <Send size={18} />
                  Subscribe
                </button>
              </div>
              
              {subscribeStatus === 'success' && (
                <p className={styles.successMessage}>
                  Thank you for subscribing!
                </p>
              )}
              
              {subscribeStatus === 'error' && (
                <p className={styles.errorMessage}>
                  Please enter a valid email.
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
      </div>
      
      {/* Partners section */}
      <div className={styles.partnersSection}>
        <div className={styles.contentContainer}>
          <h4>Trusted by World-Class Brands</h4>
          <div className={styles.partnerLogos}>
            <img className={styles.helpBrand} src="/icons/zebra.svg" alt="Zebra" draggable='false' />
            <img className={styles.helpBrand} src="/icons/openai.svg" alt="OpenAI" draggable='false' />
            <img className={styles.helpBrand} src="/icons/sap.svg" alt="SAP"  draggable='false' />
            <img className={styles.helpBrand} src="/icons/microsoft.svg" alt="Microsoft" draggable='false' />
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className={styles.copyrightSection}>
        <div className={styles.contentContainer}>
          <div className={styles.copyrightWrapper}>
            <p>© {currentYear} Rkicy Technology. All rights reserved.</p>
            
            <div className={styles.legalLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/cookies">Cookie Policy</Link>
            </div>
            
            <button 
              onClick={scrollToTop}
              className={styles.scrollTopButton}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;