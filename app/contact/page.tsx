"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  MessageCircle,
  FileText,
  Cpu,
  Cloud,
  Shield,
  Code,
  Database,
  Monitor
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import styles from "./contact.module.scss";

// Service options with icons for visual selection
const serviceOptions = [
  { id: 'ai-solutions', name: 'AI Solutions', icon: <Cpu size={24} /> },
  { id: 'cloud-solutions', name: 'Cloud Solutions', icon: <Cloud size={24} /> },
  { id: 'cybersecurity', name: 'Cybersecurity', icon: <Shield size={24} /> },
  { id: 'software-development', name: 'Software Development', icon: <Code size={24} /> },
  { id: 'enterprise-it', name: 'Enterprise IT', icon: <Database size={24} /> },
  { id: 'hardware-solutions', name: 'Hardware Solutions', icon: <Monitor size={24} /> }
];

export default function ContactPage() {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  // Field validation state
  const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [referenceNumber, setReferenceNumber] = useState<string>("");
  
  // Refs for animation and scrolling
  const formRef = useRef<HTMLFormElement>(null);
  const [isFormInView, setIsFormInView] = useState(false);
  
  // Effect to generate reference number
  useEffect(() => {
    if (submitStatus === 'success') {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      setReferenceNumber(`RKY-${timestamp.toString().substr(-6)}-${random}`);
    }
  }, [submitStatus]);

  // Intersection observer for form animations
  useEffect(() => {
    if (!formRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFormInView(true);
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(formRef.current);
    
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // Handle input change with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when field is changed
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle service selection
  const handleServiceSelect = (serviceId: string) => {
    setFormState(prev => ({ ...prev, service: serviceId }));
    setFieldErrors(prev => ({ ...prev, service: '' }));
  };

  // Form validation
  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formState.service) {
      errors.service = 'Please select a service';
    }
    
    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    
    setSubmitStatus('loading');
    
    try {
      // In a real app, replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormState({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  return (
    <main className={styles.contactPage}>
      {/* Page header */}
      <PageHeader 
        title="Contact Us" 
        subtitle="Let's collaborate on your next digital transformation project"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact", href: "/contact", active: true }
        ]}
      />
      
      <div className={styles.contactContent}>
        <div className={styles.container}>
          {/* Decorative elements */}
          <div className={styles.decorCircle1}></div>
          <div className={styles.decorCircle2}></div>
          <div className={styles.decorPattern}></div>
          <div className={styles.decorGrid}></div>
          
          {/* Top section: Info cards */}
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
              <h3>Chat with Us</h3>
              <p>Have a quick question? Our team is available via chat during business hours.</p>
              <Link href="#" className={styles.cardAction}>
                Start Chat <ChevronRight size={16} />
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
              <h3>Request a Quote</h3>
              <p>Need a detailed proposal for your project? Fill out our quote request form.</p>
              <Link href="/quote" className={styles.cardAction}>
                Get a Quote <ChevronRight size={16} />
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
              <h3>Email Us</h3>
              <p>Send us an email directly and we'll respond within 24 business hours.</p>
              <a href="mailto:info@rkicy.com" className={styles.cardAction}>
                info@rkicy.com <ChevronRight size={16} />
              </a>
            </motion.div>
          </div>
          
          <div className={styles.contactLayout}>
            {/* Contact information */}
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.infoCard}>
                <div className={styles.infoCardHeader}>
                  <h2>Contact Information</h2>
                  <div className={styles.headerAccent}></div>
                </div>
                
                <div className={styles.contactDetails}>
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <MapPin size={20} />
                    </div>
                    <div className={styles.contactText}>
                      <h3>Visit Us</h3>
                      <p>123 Technology Street, Rabat, Morocco</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Phone size={20} />
                    </div>
                    <div className={styles.contactText}>
                      <h3>Call Us</h3>
                      <p>+212 5XX-XXXXXX</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Mail size={20} />
                    </div>
                    <div className={styles.contactText}>
                      <h3>Email Us</h3>
                      <p>info@rkicy.com</p>
                    </div>
                  </div>
                  
                  <div className={styles.contactItem}>
                    <div className={styles.contactIcon}>
                      <Clock size={20} />
                    </div>
                    <div className={styles.contactText}>
                      <h3>Business Hours</h3>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div className={styles.mapContainer}>
                  <div className={styles.mapPlaceholder}>
                    {/* Replace with actual Google Maps embed */}
                    <div className={styles.mapOverlay}>
                      <MapPin size={32} />
                      <p>Our Office Location</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div 
              className={styles.contactForm}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className={styles.formCard}>
                <div className={styles.formCardHeader}>
                  <h2>Send Us a Message</h2>
                  <div className={styles.headerAccent}></div>
                </div>
                
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div 
                      className={styles.successMessage}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className={styles.successIcon}>
                        <CheckCircle size={48} />
                      </div>
                      <h3>Message Sent Successfully!</h3>
                      <p>Thank you for contacting us. Our team will get back to you shortly.</p>
                      
                      <div className={styles.referenceNumber}>
                        <span>Reference Number:</span>
                        <strong>{referenceNumber}</strong>
                      </div>
                      
                      <button 
                        onClick={() => setSubmitStatus('idle')}
                        className={styles.newMessageButton}
                      >
                        Send Another Message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      ref={formRef}
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.form}
                    >
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="name">Full Name <span className={styles.required}>*</span></label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className={fieldErrors.name ? styles.errorInput : ''}
                            aria-invalid={!!fieldErrors.name}
                            aria-describedby={fieldErrors.name ? "name-error" : undefined}
                          />
                          {fieldErrors.name && (
                            <div id="name-error" className={styles.errorText}>{fieldErrors.name}</div>
                          )}
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor="email">Email Address <span className={styles.required}>*</span></label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={fieldErrors.email ? styles.errorInput : ''}
                            aria-invalid={!!fieldErrors.email}
                            aria-describedby={fieldErrors.email ? "email-error" : undefined}
                          />
                          {fieldErrors.email && (
                            <div id="email-error" className={styles.errorText}>{fieldErrors.email}</div>
                          )}
                        </div>
                      </div>
                      
                      <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                          <label htmlFor="company">Company Name</label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formState.company}
                            onChange={handleChange}
                          />
                        </div>
                        <div className={styles.formGroup}>
                          <label htmlFor="phone">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label>Service of Interest <span className={styles.required}>*</span></label>
                        <div 
                          className={`${styles.serviceSelector} ${fieldErrors.service ? styles.errorBorder : ''}`}
                          aria-invalid={!!fieldErrors.service}
                          aria-describedby={fieldErrors.service ? "service-error" : undefined}
                        >
                          {serviceOptions.map(option => (
                            <div 
                              key={option.id}
                              className={`${styles.serviceOption} ${formState.service === option.id ? styles.selected : ''}`}
                              onClick={() => handleServiceSelect(option.id)}
                            >
                              <div className={styles.serviceOptionIcon}>
                                {option.icon}
                              </div>
                              <span>{option.name}</span>
                            </div>
                          ))}
                        </div>
                        {fieldErrors.service && (
                          <div id="service-error" className={styles.errorText}>{fieldErrors.service}</div>
                        )}
                      </div>
                      
                      <div className={styles.formGroup}>
                        <label htmlFor="message">Your Message <span className={styles.required}>*</span></label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formState.message}
                          onChange={handleChange}
                          className={fieldErrors.message ? styles.errorInput : ''}
                          aria-invalid={!!fieldErrors.message}
                          aria-describedby={fieldErrors.message ? "message-error" : undefined}
                        ></textarea>
                        {fieldErrors.message && (
                          <div id="message-error" className={styles.errorText}>{fieldErrors.message}</div>
                        )}
                      </div>
                      
                      {submitStatus === 'error' && (
                        <div className={styles.errorMessage}>
                          <AlertCircle size={16} />
                          <span>There was an error sending your message. Please try again.</span>
                        </div>
                      )}
                      
                      <motion.button 
                        type="submit"
                        className={styles.submitButton}
                        disabled={submitStatus === 'loading'}
                        whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {submitStatus === 'loading' ? (
                          <span className={styles.loadingText}>Sending...</span>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={16} />
                          </>
                        )}
                      </motion.button>
                      
                      <p className={styles.formDisclaimer}>
                        By submitting this form, you agree to our <Link href="/privacy">Privacy Policy</Link>.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
          
          {/* FAQ section */}
          <motion.div 
            className={styles.faqSection}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className={styles.sectionHeader}>
              <h2>Frequently Asked Questions</h2>
              <div className={styles.headerAccent}></div>
            </div>
            
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>What is your typical response time?</h3>
                <p>We aim to respond to all inquiries within 24 business hours. For urgent matters, we recommend including "URGENT" in your subject line or using our priority support channels.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you offer services outside of Morocco?</h3>
                <p>Yes, while we're headquartered in Morocco, we serve clients throughout North Africa and can provide remote consulting and implementation services globally for select projects.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>How can I request a quote?</h3>
                <p>You can request a quote by filling out our contact form with details about your project requirements, using our dedicated quote request form, or by calling us directly for immediate assistance.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you offer maintenance services?</h3>
                <p>Yes, we provide ongoing maintenance and support for all our solutions. We offer various service level agreements (SLAs) to meet your specific needs, from basic support to 24/7 premium assistance.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}