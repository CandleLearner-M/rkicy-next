"use client";

import { ArrowRight, BarChart, Calendar, CheckCircle, Code, CreditCard, Globe, Shield, ShoppingBag, Users, Wallet, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './FeaturedProjects.module.scss';

// Sample data - in a real implementation this would come from a CMS or API
const featuredProjects = [
  {
    id: "paycov",
    title: "Paycov Digital Payment Platform",
    description: "Moroccan-born digital payment platform enabling seamless, instant and secure peer-to-peer transactions, designed to integrate with all banks and simplify daily payments.",
    image: "/projects/paycov/cover.png",
    category: "Fintech",
    technologies: ["Node.js", "PostgreSQL", "React Native", "Mobile"],
    stats: [
      { icon: <Shield size={18} />, value: "Bank-Level", label: "End-to-End Encryption" },
      { icon: <Globe size={18} />, value: "Multi-Channel", label: "Payment Access Methods" },
      { icon: <Wallet size={18} />, value: "All Banks", label: "Universal Interoperability" }
    ],
    slug: "/projects/paycov"
  },
  {
    id: "nounours-ma",
    title: "Nounours.ma E-Commerce Platform",
    description: "Modern e-commerce platform for premium plush toys and collectible figurines, offering a seamless shopping experience with efficient catalog management across multiple product lines.",
    image: "/projects/nounours/cover.png",
    category: "E-Commerce",
    technologies: ["Shopify", "Web Development", "Payment Integration", "Inventory Management"],
    stats: [
      { icon: <ShoppingBag size={18} />, value: "5+", label: "Product Collections" },
      { icon: <Users size={18} />, value: "Morocco", label: "Market Coverage" },
      { icon: <CreditCard size={18} />, value: "Multi", label: "Payment Methods" }
    ],
    slug: "/projects/nounours-ma"
  },
  {
    id: "finish3",
    title: "Finish3 Task Management App",
    description: "Clean, modern to-do list app built on one unwavering principle: 'Finish your top 3 daily tasks—every day', helping users focus on what's most important.",
    image: "/images/projects/finish3.jpg",
    category: "Productivity",
    technologies: ["React", "Node.js", "Firebase", "Mobile"],
    stats: [
      { icon: <CheckCircle size={18} />, value: "3", label: "Daily Focus Tasks" },
      { icon: <Zap size={18} />, value: "Real-Time", label: "Cross-Platform Sync" },
      { icon: <Calendar size={18} />, value: "Daily", label: "Reset & Task Rollover" }
    ],
    slug: "/projects/finish3"
  },
];

export default function FeaturedProjects() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const t = useTranslations('projects');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.featuredSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${isLoaded ? styles.loaded : ''}`}>
          <span className={styles.sectionBadge}>{t('featured.badge')}</span>
          <h2 className={styles.sectionTitle}>
            {t('featured.title')} <span className={styles.highlight}>{t('featured.highlight')}</span>
          </h2>
          <p className={styles.sectionSubtitle}>{t('featured.subtitle')}</p>
        </div>

        <div className={styles.featuredProjects}>
          <div className={styles.projectSelectors}>
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                className={`${styles.projectSelector} ${activeProject === index ? styles.active : ''} ${isLoaded ? styles.loaded : ''}`}
                onClick={() => setActiveProject(index)}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className={styles.selectorContent}>
                  <h3>{project.title}</h3>
                  <span className={styles.projectCategory}>{project.category}</span>
                  
                  <div className={styles.techTags}>
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                </div>
                {activeProject === index && (
                  <div className={styles.activeIndicator} />
                )}
              </button>
            ))}
          </div>

          <div className={`${styles.projectShowcase} ${isLoaded ? styles.loaded : ''}`}>
            {featuredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={`${styles.projectDetails} ${activeProject === index ? styles.active : ''}`}
              >
                <div className={styles.projectImageContainer}>
                  <div className={styles.projectImage}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover", objectPosition: "top center" }}
                    />
                  </div>
                </div>
                
                <div className={styles.projectInfo}>
                  <h2>{project.title}</h2>
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.projectStats}>
                    {project.stats.map((stat, i) => (
                      <div key={i} className={styles.statItem}>
                        <div className={styles.statIcon}>
                          {stat.icon}
                        </div>
                        <div className={styles.statContent}>
                          <span className={styles.statValue}>{stat.value}</span>
                          <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Link href={project.slug} className={styles.projectLink}>
                    <span>{t('featured.viewProject')}</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}