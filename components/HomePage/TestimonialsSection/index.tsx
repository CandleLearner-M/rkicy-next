'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import styles from './TestimonialsSection.module.scss';
import { useScreenSize } from '@/utils/useScreenSize';


 // Animation variants removed for scroll triggers
  
  // We'll keep the exit animation for testimonial cards (not scroll-based)
  const cardVariants = {
    exit: { 
      opacity: 0,
      y: -20,
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  } as const;

  


export default function TestimonialsSection() {
  const t = useTranslations('duplicate');
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const {isDesktop} = useScreenSize();

const testimonials = [
    {
      id: '01',
      name: 'Karim Ben Said',
      title: t('testimonials.roles.operations'),
      company: 'IndusTech Maroc',
      location: 'Tangier',
      accentColor: '#4f46e5',
      quote: t('testimonials.quotes.karim'),
      rating: 5,
    },
    {
      id: '02',
      name: 'Amina El-Khadim',
      title: t('testimonials.roles.it'),
      company: 'LogiMaroc',
      location: 'Rabat',
      accentColor: '#8b5cf6',
      quote: t('testimonials.quotes.amina'),
      rating: 5,
    },
    {
      id: '03',
      name: 'Mohammed El Hajjouji',
      title: t('testimonials.roles.cto'),
      company: 'AtlasMed Technologies',
      location: 'Casablanca',
      accentColor: '#2563eb',
      quote: t('testimonials.quotes.mohammed'),
      rating: 5,
    },
    {
      id: '04',
      name: 'Leila El Bouraqadi',
      title: t('testimonials.roles.director'),
      company: 'Chamal Retail Solutions',
      location: 'Marrakech',
      accentColor: '#06b6d4',
      quote: t('testimonials.quotes.leila'),
      rating: 5,
    },
    {
      id: '05',
      name: 'Omar El Bouhati',
      title: t('testimonials.roles.ceo'),
      company: 'Casablanca Luxe',
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
          <Star 
            key={i} 
            className={`${styles.starIcon} ${i < rating ? styles.filled : ''}`} 
            size={18}
            fill={i < rating ? "currentColor" : "none"}
          />
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
    <section className={styles.testimonialsSection} ref={containerRef} id='testimonials'>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.headingWrapper}>
            <div className={styles.labelWrapper}>
              <span className={styles.overline}>
                {t('testimonials.label')}
              </span>
            </div>
            <h2 className={styles.heading}>
              {t('testimonials.title')}{' '}
              <span className={styles.highlightTxt}>{t('testimonials.highlighted')}</span>{' '}
              {t('testimonials.title2')}
            </h2>
            <p className={styles.subheading}>{t('testimonials.subtitle')}</p>
          </div>

          <div className={styles.testimonialCarousel}>
            <div className={styles.testimonialCardWrapper}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  className={styles.testimonialCard}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{
                    '--accent-color': testimonials[activeTestimonial].accentColor
                  } as React.CSSProperties}
                >
                  <div className={styles.quoteIconWrapper}>
                    <Quote className={styles.quoteIcon} size={28} />
                  </div>
                  
                  <div className={styles.cardHeader}>
                    <div className={styles.testimonialId}>
                      {testimonials[activeTestimonial].id}
                    </div>
                  </div>
                  
                  <blockquote className={styles.quoteText}>
                    {testimonials[activeTestimonial].quote}
                  </blockquote>
                  
                  <div className={styles.testimonialFooter}>
                    <div className={styles.authorSection}>
                      <div className={styles.authorInitials}>
                        {getInitials(testimonials[activeTestimonial].name)}
                      </div>
                      <div className={styles.authorInfo}>
                        <h4 className={styles.authorName}>
                          {testimonials[activeTestimonial].name}
                        </h4>
                        <p className={styles.authorTitle}>
                          {testimonials[activeTestimonial].title}, <span className={styles.authorCompany}>{testimonials[activeTestimonial].company}</span>
                        </p>
                      </div>
                    </div>

                    <div className={styles.metaInfo}>
                      {renderStars(testimonials[activeTestimonial].rating)}
                      <div className={styles.locationBadge}>
                        {testimonials[activeTestimonial].location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className={styles.navigationControls}>
              <button 
                className={styles.navArrow}
                onClick={prevTestimonial}
                aria-label={t('testimonials.previous')}
              >
                <ChevronLeft size={18} />
              </button>
              <div className={styles.navDots}>
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
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* {isDesktop && <div className={styles.trustedBySection}>
            <div className={styles.trustedLine}>
              <div className={styles.trustedLineBefore} />
              <h3 className={styles.trustedTitle}>{t('testimonials.trustedBy')}</h3>
              <div className={styles.trustedLineAfter} />
            </div>
            
            <div className={styles.organizationsList}>
              {[
                'Office Chérifien des Phosphates', 
                'Maroc Telecom', 
                'Royal Air Maroc', 
                'Attijariwafa Bank', 
                'Groupe Renault Maroc'
              ].map((org, index) => (
                <div 
                  key={index} 
                  className={styles.organizationItem}
                >
                  {org}
                </div>
              ))}
            </div>
          </div> } */}
        </div>
      </div>
    </section>
  );
}