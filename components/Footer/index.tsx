"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  ChevronRight,
  MessageSquare,
  ArrowUpCircle
} from 'lucide-react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Email validation
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      // Here you would typically send this to your API
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
      {/* Decorative wave shape at the top */}
      <div className={styles.waveContainer}>
        <svg className={styles.wave} viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64L40,69.3C80,75,160,85,240,80C320,75,400,53,480,58.7C560,64,640,96,720,96C800,96,880,64,960,48C1040,32,1120,32,1200,37.3C1280,43,1360,53,1400,58.7L1440,64L1440,120L1400,120C1360,120,1280,120,1200,120C1120,120,1040,120,960,120C880,120,800,120,720,120C640,120,560,120,480,120C400,120,320,120,240,120C160,120,80,120,40,120L0,120Z"></path>
        </svg>
      </div>
      
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.companyInfo}>
            <div className={styles.logoSection}>
              <svg className={styles.footerLogo} width="42" height="42" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0L29.8564 8V24L16 32L2.14359 24V8L16 0Z" fill="#3B82F6" />
                <path d="M16 6L24.7846 11V21L16 26L7.21539 21V11L16 6Z" fill="white" />
                <path d="M16 12L19.4641 14V18L16 20L12.5359 18V14L16 12Z" fill="#3B82F6" />
              </svg>
              <h3>Rkicy Technology</h3>
            </div>
            <p>Empowering Morocco's digital future with enterprise-grade IT solutions, from AI to hardware.</p>
            
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
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </motion.a>
            </div>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linksColumn}>
              <h4>Company</h4>
              <ul>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/about">About Us</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/team">Our Team</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/careers">Careers</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/blog">Blog</Link>
                </motion.li>
              </ul>
            </div>
            
            <div className={styles.linksColumn}>
              <h4>Services</h4>
              <ul>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/services/ai-solutions">AI Solutions</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/services/cloud-services">Cloud Services</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/services/cybersecurity">Cybersecurity</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/services/hardware">Hardware Solutions</Link>
                </motion.li>
              </ul>
            </div>
            
            <div className={styles.linksColumn}>
              <h4>Support</h4>
              <ul>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/contact">Contact Us</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/faq">FAQ</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/support">Technical Support</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                  <ChevronRight size={14} />
                  <Link href="/resources">Resources</Link>
                </motion.li>
              </ul>
            </div>
          </div>
          
          <div className={styles.subscribeSection}>
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
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Subscribe"
                >
                  <MessageSquare size={18} />
                  Subscribe
                </motion.button>
              </div>
              
              {subscribeStatus === 'success' && (
                <motion.p 
                  className={styles.successMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Thank you for subscribing!
                </motion.p>
              )}
              
              {subscribeStatus === 'error' && (
                <motion.p 
                  className={styles.errorMessage}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Please enter a valid email.
                </motion.p>
              )}
            </form>
            
            <div className={styles.certification}>
              <div className={styles.certBadge}>
                <span>ISO</span>
                27001
              </div>
              <div className={styles.certBadge}>
                <span>CMMI</span>
                Level 3
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.middleSection}>
          <div className={styles.partnersContainer}>
            <h4>Trusted by World-Class Brands</h4>
            <div className={styles.partnersLogos}>
              <img src="/icons/zebra.svg" alt="Zebra" />
              <img src="/icons/openai.svg" alt="OpenAI" />
              <img src="/icons/sap.svg" alt="SAP" />
              <img src="/icons/microsoft.svg" alt="Microsoft" />
            </div>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            <p>© {currentYear} Rkicy Technology. All rights reserved.</p>
          </div>
          
          <div className={styles.legalLinks}>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/cookies">Cookie Policy</Link>
          </div>
          
          <motion.button 
            className={styles.scrollTop}
            onClick={scrollToTop}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUpCircle size={24} />
          </motion.button>
        </div>
      </div>
      
      {/* Digital circuit decoration */}
      <div className={styles.circuitDecoration}>
        <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,50 L50,50 L50,20 L80,20 L80,80 L120,80 L120,40 L160,40 L160,60 L200,60 L200,30 L230,30" 
                stroke="rgba(59, 130, 246, 0.3)" 
                strokeWidth="2"
                strokeLinecap="round" 
                className={styles.circuitPath} />
          <circle cx="50" cy="50" r="4" className={styles.circuitNode} />
          <circle cx="80" cy="20" r="4" className={styles.circuitNode} />
          <circle cx="120" cy="80" r="4" className={styles.circuitNode} />
          <circle cx="160" cy="40" r="4" className={styles.circuitNode} />
          <circle cx="200" cy="60" r="4" className={styles.circuitNode} />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;