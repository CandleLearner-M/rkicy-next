'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Brain, Database, Code, Server } from 'lucide-react';
import styles from './TestimonialsSection.module.scss';

export default function TestimonialsSection() {
  const t = useTranslations('duplicate');
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  // Icons mapping for testimonials based on their role/company
  const iconMapping = {
    'AtlasMed Technologies': <Brain size={20} className={styles.serviceIcon} />,
    'Maroc Digital Ventures': <Code size={20} className={styles.serviceIcon} />,
    'Casablanca Logistics': <Server size={20} className={styles.serviceIcon} />,
    'Banque Centrale du Maroc': <Database size={20} className={styles.serviceIcon} />,
    'Tanger Med Port': <Server size={20} className={styles.serviceIcon} />,
  };

  const testimonials = [
    {
      id: '01',
      name: 'Karim Idrissi',
      title: t('testimonials.roles.operations'),
      company: 'Tanger Med Port',
      location: 'Tanger',
      accentColor: '#4f46e5',
      quote: t('testimonials.quotes.karim'),
      rating: 5,
    },
    {
      id: '02',
      name: 'Amina Berrada',
      title: t('testimonials.roles.it'),
      company: 'Banque Centrale du Maroc',
      location: 'Rabat',
      accentColor: '#8b5cf6',
      quote: t('testimonials.quotes.amina'),
      rating: 5,
    },
    {
      id: '03',
      name: 'Mohammed Benjelloun',
      title: t('testimonials.roles.cto'),
      company: 'AtlasMed Technologies',
      location: 'Casablanca',
      accentColor: '#2563eb',
      quote: t('testimonials.quotes.mohammed'),
      rating: 5,
    },
    {
      id: '04',
      name: 'Leila Tazi',
      title: t('testimonials.roles.director'),
      company: 'Maroc Digital Ventures',
      location: 'Marrakech',
      accentColor: '#06b6d4',
      quote: t('testimonials.quotes.leila'),
      rating: 5,
    },
    {
      id: '05',
      name: 'Omar El Fassi',
      title: t('testimonials.roles.ceo'),
      company: 'Casablanca Logistics',
      location: 'Casablanca',
      accentColor: '#0ea5e9',
      quote: t('testimonials.quotes.omar'),
      rating: 5,
    }
  ];

  // Handle autoplay
  useEffect(() => {
    if (isAutoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 8000);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [isAutoplay, testimonials.length]);

  // Pause autoplay on interaction
  const pauseAutoplay = () => {
    setIsAutoplay(false);
    // Resume after 30 seconds
    setTimeout(() => setIsAutoplay(true), 30000);
  };

  const nextTestimonial = () => {
    pauseAutoplay();
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    pauseAutoplay();
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    pauseAutoplay();
    setActiveTestimonial(index);
  };

  const renderStars = (rating: number) => {
    return (
      <div className={styles.starRating}>
        {Array(5).fill(0).map((_, i) => (
          <span 
            key={i} 
            className={`${styles.star} ${i < rating ? styles.filled : ''}`}
          >★</span>
        ))}
      </div>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('');
  };

  return (
    <section className={styles.testimonialsSection} ref={containerRef}>
      <div className={styles.container}>
        <motion.div
          className={styles.contentWrapper}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className={styles.headingWrapper} variants={itemVariants}>
            <div className={styles.labelWrapper}>
              <motion.span 
                className={styles.overline}
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
              >
                {t('testimonials.label')}
              </motion.span>
            </div>
            <h2 className={styles.heading}>
              {t('testimonials.title')}{' '}
              <span className={styles.highlightTxt}>{t('testimonials.highlighted')}</span>{' '}
              {t('testimonials.title2')}
            </h2>
            <p className={styles.subheading}>{t('testimonials.subtitle')}</p>
          </motion.div>

          <div className={styles.testimonialCarousel}>
            <div className={styles.testimonialNavigation}>
              <button 
                className={styles.navArrow}
                onClick={prevTestimonial}
                aria-label={t('testimonials.previous')}
              >
                <ChevronLeft size={20} />
              </button>
              <div className={styles.navIndicators}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.navDot} ${index === activeTestimonial ? styles.active : ''}`}
                    onClick={() => goToTestimonial(index)}
                    aria-label={`${t('testimonials.goto')} ${index + 1}`}
                    aria-current={index === activeTestimonial}
                  />
                ))}
              </div>
              <button 
                className={styles.navArrow}
                onClick={nextTestimonial}
                aria-label={t('testimonials.next')}
              >
                <ChevronRight size={20} />
              </button>
            </div>
            
            <div className={styles.testimonialCardWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className={styles.testimonialCard}
                  style={{
                    '--accent-color': testimonials[activeTestimonial].accentColor,
                    '--testimonial-number': `'${testimonials[activeTestimonial].id}'`
                  } as React.CSSProperties}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className={styles.cardTopLine}></div>
                  
                  <div className={styles.cardHeader}>
                    <div className={styles.testimonialNumber}>
                      {testimonials[activeTestimonial].id}
                    </div>
                    {iconMapping[testimonials[activeTestimonial].company as keyof typeof iconMapping]}
                  </div>
                  
                  <blockquote className={styles.quoteText}>
                    {testimonials[activeTestimonial].quote}
                  </blockquote>
                  
                  <div className={styles.testimonialFooter}>
                    <div className={styles.authorBlock}>
                      <div className={styles.authorInitials}>
                        {getInitials(testimonials[activeTestimonial].name)}
                      </div>
                      <div className={styles.authorInfo}>
                        <h4 className={styles.authorName}>
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className={styles.authorTitle}>
                          {testimonials[activeTestimonial].title},<br />
                          <strong>{testimonials[activeTestimonial].company}</strong>
                        </p>
                      </div>
                    </div>
                    
                    <div className={styles.footerRight}>
                      {renderStars(testimonials[activeTestimonial].rating)}
                      <div className={styles.locationBadge}>
                        {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <motion.div 
            className={styles.trustedBySection}
            variants={itemVariants}
          >
            <div className={styles.trustedLine}>
              <div className={styles.trustedLineBefore} />
              <h3 className={styles.trustedTitle}>{t('testimonials.trustedBy')}</h3>
              <div className={styles.trustedLineAfter} />
            </div>
            
            <div className={styles.organizationsList}>
              {[
                'Bank Al-Maghrib', 
                'Office Chérifien des Phosphates', 
                'Maroc Telecom', 
                'Royal Air Maroc', 
                'Attijariwafa Bank', 
                'Groupe Renault Maroc'
              ].map((org, index) => (
                <motion.div 
                  key={index} 
                  className={styles.organizationItem}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.3 + index * 0.1,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }}
                  viewport={{ once: true }}
                >
                  {org}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}