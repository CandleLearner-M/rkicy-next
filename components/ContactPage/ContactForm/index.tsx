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
  Cpu,
  Cloud,
  Shield,
  Code,
  Database,
  Monitor
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./ContactForm.module.scss";

// Service options with icons for visual selection
const serviceOptions = [
  { id: 'ai-solutions', icon: <Cpu size={24} /> },
  { id: 'cloud-solutions', icon: <Cloud size={24} /> },
  { id: 'cybersecurity', icon: <Shield size={24} /> },
  { id: 'software-development', icon: <Code size={24} /> },
  { id: 'enterprise-it', icon: <Database size={24} /> },
  { id: 'hardware-solutions', icon: <Monitor size={24} /> }
];

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const tService = useTranslations("contact.services");
  
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
  
  // Effect for form animation
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
      errors.name = t("validation.nameRequired");
    }
    
    if (!formState.email.trim()) {
      errors.email = t("validation.emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.email = t("validation.emailInvalid");
    }
    
    if (!formState.service) {
      errors.service = t("validation.serviceRequired");
    }
    
    if (!formState.message.trim()) {
      errors.message = t("validation.messageRequired");
    }
    
    return errors;
  };

  // Form submission - UPDATED to use API route
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
      // Send data to our API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Set the reference number from the response
      setReferenceNumber(data.referenceNumber);
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
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    }
  };

  return (
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
            <h2>{t("contactInfo.title")}</h2>
            <div className={styles.headerAccent}></div>
          </div>
          
          <div className={styles.contactDetails}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <MapPin size={20} />
              </div>
              <div className={styles.contactText}>
                <h3>{t("contactInfo.visit.title")}</h3>
                <p>{t("contactInfo.visit.text")}</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Phone size={20} />
              </div>
              <div className={styles.contactText}>
                <h3>{t("contactInfo.call.title")}</h3>
                <p>{t("contactInfo.call.text")}</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Mail size={20} />
              </div>
              <div className={styles.contactText}>
                <h3>{t("contactInfo.email.title")}</h3>
                <p>{t("contactInfo.email.text")}</p>
              </div>
            </div>
            
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>
                <Clock size={20} />
              </div>
              <div className={styles.contactText}>
                <h3>{t("contactInfo.hours.title")}</h3>
                <p>{t("contactInfo.hours.text")}</p>
              </div>
            </div>
          </div>
          
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              {/* Replace with actual Google Maps embed */}
              <div className={styles.mapOverlay}>
                <MapPin size={32} />
                <p>{t("contactInfo.mapLabel")}</p>
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
            <h2>{t("title")}</h2>
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
                <h3>{t("success.title")}</h3>
                <p>{t("success.message")}</p>
                
                <div className={styles.referenceNumber}>
                  <span>{t("success.referenceLabel")}</span>
                  <strong>{referenceNumber}</strong>
                </div>
                
                <button 
                  onClick={() => setSubmitStatus('idle')}
                  className={styles.newMessageButton}
                >
                  {t("success.newMessage")}
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
                    <label htmlFor="name">{t("fields.name.label")} <span className={styles.required}>*</span></label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={fieldErrors.name ? styles.errorInput : ''}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      placeholder={t("fields.name.placeholder")}
                    />
                    {fieldErrors.name && (
                      <div id="name-error" className={styles.errorText}>{fieldErrors.name}</div>
                    )}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">{t("fields.email.label")} <span className={styles.required}>*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={fieldErrors.email ? styles.errorInput : ''}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      placeholder={t("fields.email.placeholder")}
                    />
                    {fieldErrors.email && (
                      <div id="email-error" className={styles.errorText}>{fieldErrors.email}</div>
                    )}
                  </div>
                </div>
                
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company">{t("fields.company.label")}</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      placeholder={t("fields.company.placeholder")}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="phone">{t("fields.phone.label")}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder={t("fields.phone.placeholder")}
                    />
                  </div>
                </div>
                
                <div className={styles.formGroup}>
                  <label>{t("fields.service.label")} <span className={styles.required}>*</span></label>
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
                        <span>{tService(option.id)}</span>
                      </div>
                    ))}
                  </div>
                  {fieldErrors.service && (
                    <div id="service-error" className={styles.errorText}>{fieldErrors.service}</div>
                  )}
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">{t("fields.message.label")} <span className={styles.required}>*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className={fieldErrors.message ? styles.errorInput : ''}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    placeholder={t("fields.message.placeholder")}
                  ></textarea>
                  {fieldErrors.message && (
                    <div id="message-error" className={styles.errorText}>{fieldErrors.message}</div>
                  )}
                </div>
                
                {submitStatus === 'error' && (
                  <div className={styles.errorMessage}>
                    <AlertCircle size={16} />
                    <span>{t("error")}</span>
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
                    <span className={styles.loadingText}>{t("sending")}</span>
                  ) : (
                    <>
                      <span>{t("submit")}</span>
                      <Send size={16} />
                    </>
                  )}
                </motion.button>
                
                <p className={styles.formDisclaimer}>
                  {t("disclaimer")} <Link href="/privacy">{t("privacyPolicy")}</Link>.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}