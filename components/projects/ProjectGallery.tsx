'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './ProjectGallery.module.scss';

interface GalleryImage {
  id: string;
  image: string;
  alt: string;
}

interface ProjectGalleryProps {
  gallery: GalleryImage[];
}

export default function ProjectGallery({ gallery }: ProjectGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  return (
    <motion.div 
      className={styles.gallerySection}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      ref={galleryRef}
    >
      <h3 className={styles.galleryTitle}>Gallery</h3>
      
      <div className={styles.galleryGrid}>
        {gallery.map((item, index) => (
          <motion.div 
            key={item.id} 
            className={styles.galleryItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
            onClick={() => openLightbox(index)}
          >
            <div className={styles.imageWrapper}>
              <Image 
                src={item.image} 
                alt={item.alt}
                width={400}
                height={250}
                className={styles.galleryImage}
              />
              <div className={styles.overlay}>
                <div className={styles.viewButton}>View</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Lightbox */}
      {isLightboxOpen && (
        <motion.div 
          className={styles.lightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button 
            className={styles.closeButton} 
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>
          
          <div className={styles.lightboxContent}>
            <button 
              className={`${styles.navButton} ${styles.prevButton}`} 
              onClick={prevImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={30} />
            </button>
            
            <div className={styles.lightboxImageWrapper}>
              <Image 
                src={gallery[currentIndex].image} 
                alt={gallery[currentIndex].alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className={styles.lightboxImage}
                priority
              />
              <div className={styles.caption}>{gallery[currentIndex].alt}</div>
            </div>
            
            <button 
              className={`${styles.navButton} ${styles.nextButton}`} 
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={30} />
            </button>
          </div>
          
          <div className={styles.lightboxCounter}>
            {currentIndex + 1} / {gallery.length}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}