"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import styles from "./TestimonialsSection.module.scss";

// Testimonials data
const testimonials = [
  {
    id: 1,
    quote: "Rkicy Technology helped us implement an AI-driven customer service solution that reduced response times by 60% while improving customer satisfaction scores significantly.",
    author: "Mohammed El Fassi",
    title: "CIO, MarocTel",
    image: "/images/testimonial-1.jpg",
    company: "MarocTel",
    logo: "/logos/client-1.svg"
  },
  {
    id: 2,
    quote: "The SAP implementation by Rkicy's team was the most efficient we've experienced. Their deep knowledge of both the technology and Moroccan business requirements was invaluable to our digital transformation.",
    author: "Leila Benani",
    title: "Operations Director, Casablanca Logistics",
    image: "/images/testimonial-2.jpg",
    company: "Casablanca Logistics",
    logo: "/logos/client-2.svg"
  },
  {
    id: 3,
    quote: "Working with Rkicy Technology gave us access to enterprise-grade solutions tailored specifically for our needs. Their team's expertise bridged the gap between global best practices and local market conditions.",
    author: "Karim Benchekroun",
    title: "CEO, Atlas Financial Group",
    image: "/images/testimonial-3.jpg",
    company: "Atlas Financial Group",
    logo: "/logos/client-3.svg"
  }
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);
  
  // Initialize when component mounts
  useEffect(() => {
    setIsLoaded(true);
    
    // Auto-advance slides
    const interval = setInterval(() => {
      if (!isAnimating) {
        goToNextSlide();
      }
    }, 7000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);
  
  const goToPrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return;
    
    setIsAnimating(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.container}>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        
        <div className={styles.sectionHeader}>
          <motion.h2 
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            What Our <span className={styles.highlight}>Clients Say</span>
          </motion.h2>
        </div>
        
        <motion.div 
          className={styles.testimonialSlider}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.sliderContainer} ref={slideRef}>
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className={styles.testimonialCard}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : 20,
                  display: currentSlide === index ? 'flex' : 'none'
                }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.quoteContainer}>
                  <div className={styles.quoteIcon}>
                    <Quote size={32} />
                  </div>
                  <blockquote className={styles.quoteText}>
                    {testimonial.quote}
                  </blockquote>
                </div>
                
                <div className={styles.authorInfo}>
                  <div className={styles.authorImage}>
                    <div className={styles.imagePlaceholder}>
                      {testimonial.author.charAt(0)}
                    </div>
                  </div>
                  <div className={styles.authorDetails}>
                    <p className={styles.authorName}>{testimonial.author}</p>
                    <p className={styles.authorTitle}>{testimonial.title}</p>
                  </div>
                  <div className={styles.companyLogo}>
                    <p className={styles.companyName}>{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className={styles.sliderControls}>
            <div className={styles.navigationControls}>
              <button 
                className={styles.navButton}
                onClick={goToPrevSlide}
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <div className={styles.indicators}>
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.indicator} ${currentSlide === index ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  ></button>
                ))}
              </div>
              <button 
                className={styles.navButton}
                onClick={goToNextSlide}
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}