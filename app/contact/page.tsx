"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import styles from "./contact.module.scss";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    
    // Simulate form submission
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
      <div className={styles.pageHeader}>
        <div className={styles.headerContainer}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <span className={styles.current}>Contact</span>
          </div>
          <h1 className={styles.pageTitle}>Contact Us</h1>
          <p className={styles.pageSubtitle}>Get in touch with our team of experts to discuss your technology needs</p>
        </div>
        <div className={styles.headerBackground}></div>
      </div>
      
      <div className={styles.contactContent}>
        <div className={styles.container}>
          {/* Decorative elements */}
          <div className={styles.decorCircle}></div>
          <div className={styles.decorPattern}></div>
          
          <div className={styles.contactLayout}>
            {/* Contact information */}
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className={styles.infoCard}>
                <h2 className={styles.infoTitle}>Contact Information</h2>
                <p className={styles.infoSubtitle}>
                  Our team is ready to answer your questions and help you find the right technology solutions for your business.
                </p>
                
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
                    <p>Interactive Map</p>
                    <span>Google Maps integration would appear here</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Contact form */}
            <motion.div 
              className={styles.contactForm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={styles.formCard}>
                <h2 className={styles.formTitle}>Send Us a Message</h2>
                <p className={styles.formSubtitle}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                
                {submitStatus === 'success' ? (
                  <motion.div 
                    className={styles.successMessage}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle size={40} />
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. Our team will get back to you shortly.</p>
                    <button 
                      onClick={() => setSubmitStatus('idle')}
                      className={styles.newMessageButton}
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                        />
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
                      <label htmlFor="service">Service of Interest</label>
                      <select
                        id="service"
                        name="service"
                        value={formState.service}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="ai-solutions">AI Solutions</option>
                        <option value="cloud-solutions">Cloud Solutions</option>
                        <option value="cybersecurity">Cybersecurity</option>
                        <option value="software-development">Software Development</option>
                        <option value="enterprise-it">Enterprise IT</option>
                        <option value="hardware-solutions">Hardware Solutions</option>
                        <option value="other">Other / Not Sure</option>
                      </select>
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label htmlFor="message">Your Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleChange}
                        required
                      ></textarea>
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
                      whileHover={{ y: -2 }}
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
                  </form>
                )}
              </div>
            </motion.div>
          </div>
          
          {/* FAQ section */}
          <motion.div 
            className={styles.faqSection}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <div className={styles.faqGrid}>
              <div className={styles.faqItem}>
                <h3>What is your typical response time?</h3>
                <p>We aim to respond to all inquiries within 24 business hours. For urgent matters, we recommend including "URGENT" in your subject line.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you offer services outside of Morocco?</h3>
                <p>Yes, while we're based in Morocco, we serve clients throughout North Africa and can provide remote consulting services globally.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>How can I request a quote?</h3>
                <p>You can request a quote by filling out our contact form with details about your project requirements or by calling us directly.</p>
              </div>
              <div className={styles.faqItem}>
                <h3>Do you offer maintenance services?</h3>
                <p>Yes, we provide ongoing maintenance and support for all our solutions. We offer various service level agreements to meet your specific needs.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}