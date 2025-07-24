'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react';
import ProjectTabs from '@/components/projects/ProjectTabs';
import ProjectTimeline from '@/components/projects/ProjectTimeline';
import ProjectGallery from '@/components/projects/ProjectGallery';
import ProjectTestimonial from '@/components/projects/ProjectTestimonial';
import styles from './ProjectDetail.module.scss';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const t = useTranslations(`projects.${slug}`);
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  // For demonstration purposes, let's check if the slug is 'paycov'
  if (typeof slug !== 'string' || slug !== 'paycov') {
    notFound();
  }
  
  // Tabs data
  const tabs = [
    { id: 'overview', label: t('tabs.overview') },
    { id: 'features', label: t('tabs.features') },
    { id: 'technology', label: t('tabs.technology') },
    { id: 'journey', label: t('tabs.journey') },
  ];
  
  // Project features
  const features = [
    {
      id: 'p2p',
      icon: '/images/projects/paycov/icons/transfer.svg',
      title: t('features.p2p.title'),
      description: t('features.p2p.description'),
    },
    {
      id: 'qr',
      icon: '/images/projects/paycov/icons/qr-code.svg',
      title: t('features.qr.title'),
      description: t('features.qr.description'),
    },
    {
      id: 'chat',
      icon: '/images/projects/paycov/icons/chat.svg',
      title: t('features.chat.title'),
      description: t('features.chat.description'),
    },
    {
      id: 'card',
      icon: '/images/projects/paycov/icons/card.svg',
      title: t('features.card.title'),
      description: t('features.card.description'),
    },
  ];
  
  // Project gallery
  const gallery = [
    {
      id: 'screen1',
      image: '/images/projects/paycov/screens/dashboard.webp',
      alt: t('gallery.dashboard'),
    },
    {
      id: 'screen2',
      image: '/images/projects/paycov/screens/payments.webp',
      alt: t('gallery.payments'),
    },
    {
      id: 'screen3',
      image: '/images/projects/paycov/screens/chat.webp',
      alt: t('gallery.chat'),
    },
  ];
  
  return (
    <main className={styles.projectDetailPage}>
      {/* Hero Section */}
      <section className={styles.projectHero} ref={heroRef}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href={`/${locale}/projects`} className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>{t('backToProjects')}</span>
            </Link>
          </div>
          
          <div className={styles.heroContent}>
            <motion.div 
              className={styles.logoWrapper}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image 
                src="/images/projects/paycov/logo.svg"
                alt="Paycov Logo"
                width={80}
                height={80}
                className={styles.projectLogo}
              />
            </motion.div>
            
            <motion.h1 
              className={styles.projectTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('title')}
            </motion.h1>
            
            <motion.p 
              className={styles.projectDescription}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t('description')}
            </motion.p>
            
            <motion.div 
              className={styles.heroActions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a 
                href="https://paycov.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.primaryButton}
              >
                {t('visitWebsite')}
                <ExternalLink size={16} />
              </a>
              
              <Link href="#overview" className={styles.secondaryButton}>
                {t('learnMore')}
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className={styles.heroImageWrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className={styles.heroImage}>
            <Image 
              src="/images/projects/paycov/hero.webp"
              alt="Paycov App"
              fill
              priority
              sizes="100vw"
              className={styles.image}
            />
          </div>
        </motion.div>
      </section>
      
      {/* Navigation Tabs */}
      <ProjectTabs 
        tabs={tabs} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {/* Content Sections */}
      <div className={styles.contentSections}>
        {/* Overview Section */}
        <section 
          id="overview" 
          className={`${styles.section} ${activeTab === 'overview' ? styles.activeSection : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.sectionGrid}>
              <div className={styles.sectionContent}>
                <h2 className={styles.sectionTitle}>{t('overview.title')}</h2>
                <p className={styles.sectionDescription}>
                  {t('overview.description1')}
                </p>
                <p className={styles.sectionDescription}>
                  {t('overview.description2')}
                </p>
                
                <div className={styles.keyPoints}>
                  <div className={styles.keyPoint}>
                    <div className={styles.keyPointIcon}>✓</div>
                    <div className={styles.keyPointText}>
                      {t('overview.keyPoints.point1')}
                    </div>
                  </div>
                  <div className={styles.keyPoint}>
                    <div className={styles.keyPointIcon}>✓</div>
                    <div className={styles.keyPointText}>
                      {t('overview.keyPoints.point2')}
                    </div>
                  </div>
                  <div className={styles.keyPoint}>
                    <div className={styles.keyPointIcon}>✓</div>
                    <div className={styles.keyPointText}>
                      {t('overview.keyPoints.point3')}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={styles.founderStory}>
                <div className={styles.founderImage}>
                  <Image 
                    src="/images/projects/paycov/founder.jpg"
                    alt={t('founder.name')}
                    width={120}
                    height={120}
                    className={styles.founderPhoto}
                  />
                </div>
                
                <div className={styles.storyContent}>
                  <h3 className={styles.founderName}>{t('founder.name')}</h3>
                  <p className={styles.founderTitle}>{t('founder.title')}</p>
                  <p className={styles.founderQuote}>"{t('founder.quote')}"</p>
                </div>
              </div>
            </div>
            
            <ProjectGallery gallery={gallery} />
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          id="features" 
          className={`${styles.section} ${activeTab === 'features' ? styles.activeSection : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('featuresSection.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('featuresSection.subtitle')}</p>
            </div>
            
            <div className={styles.featuresGrid}>
              {features.map((feature) => (
                <div key={feature.id} className={styles.featureCard}>
                  <div className={styles.featureIconWrapper}>
                    <Image 
                      src={feature.icon}
                      alt={feature.title}
                      width={32}
                      height={32}
                      className={styles.featureIcon}
                    />
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className={styles.securitySection}>
              <div className={styles.securityContent}>
                <h3 className={styles.securityTitle}>{t('security.title')}</h3>
                <p className={styles.securityDescription}>{t('security.description')}</p>
                
                <div className={styles.securityFeatures}>
                  <div className={styles.securityFeature}>
                    <div className={styles.securityIcon}>🔒</div>
                    <div className={styles.securityText}>{t('security.features.encryption')}</div>
                  </div>
                  <div className={styles.securityFeature}>
                    <div className={styles.securityIcon}>🛡️</div>
                    <div className={styles.securityText}>{t('security.features.fraud')}</div>
                  </div>
                  <div className={styles.securityFeature}>
                    <div className={styles.securityIcon}>🏦</div>
                    <div className={styles.securityText}>{t('security.features.regulatory')}</div>
                  </div>
                </div>
              </div>
              
              <div className={styles.securityImage}>
                <Image 
                  src="/images/projects/paycov/security.svg"
                  alt="Security"
                  width={300}
                  height={300}
                  className={styles.securityIllustration}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Technology Section */}
        <section 
          id="technology" 
          className={`${styles.section} ${activeTab === 'technology' ? styles.activeSection : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('technology.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('technology.subtitle')}</p>
            </div>
            
            <div className={styles.techStackGrid}>
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>{t('technology.categories.frontend')}</h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/react.svg"
                      alt="React Native"
                      width={40}
                      height={40}
                    />
                    <span>React Native</span>
                  </div>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/typescript.svg"
                      alt="TypeScript"
                      width={40}
                      height={40}
                    />
                    <span>TypeScript</span>
                  </div>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/redux.svg"
                      alt="Redux"
                      width={40}
                      height={40}
                    />
                    <span>Redux</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>{t('technology.categories.backend')}</h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/node.svg"
                      alt="Node.js"
                      width={40}
                      height={40}
                    />
                    <span>Node.js</span>
                  </div>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/graphql.svg"
                      alt="GraphQL"
                      width={40}
                      height={40}
                    />
                    <span>GraphQL</span>
                  </div>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/mongodb.svg"
                      alt="MongoDB"
                      width={40}
                      height={40}
                    />
                    <span>MongoDB</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.techCategory}>
                <h3 className={styles.techCategoryTitle}>{t('technology.categories.devops')}</h3>
                <div className={styles.techItems}>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/aws.svg"
                      alt="AWS"
                      width={40}
                      height={40}
                    />
                    <span>AWS</span>
                  </div>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/docker.svg"
                      alt="Docker"
                      width={40}
                      height={40}
                    />
                    <span>Docker</span>
                  </div>
                  <div className={styles.techItem}>
                    <Image 
                      src="/images/tech/github.svg"
                      alt="GitHub Actions"
                      width={40}
                      height={40}
                    />
                    <span>GitHub Actions</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.architectureSection}>
              <h3 className={styles.architectureTitle}>{t('technology.architecture.title')}</h3>
              <p className={styles.architectureDescription}>
                {t('technology.architecture.description')}
              </p>
              
              <div className={styles.architectureImage}>
                <Image 
                  src="/images/projects/paycov/architecture.svg"
                  alt="Paycov Architecture"
                  width={900}
                  height={500}
                  className={styles.architectureDiagram}
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Journey Section */}
        <section 
          id="journey" 
          className={`${styles.section} ${activeTab === 'journey' ? styles.activeSection : ''}`}
        >
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{t('journey.title')}</h2>
              <p className={styles.sectionSubtitle}>{t('journey.subtitle')}</p>
            </div>
            
            <ProjectTimeline />
            
            <ProjectTestimonial />
            
            <div className={styles.nextStepsSection}>
              <h3 className={styles.nextStepsTitle}>{t('journey.nextSteps.title')}</h3>
              <p className={styles.nextStepsDescription}>
                {t('journey.nextSteps.description')}
              </p>
              
              <div className={styles.roadmapItems}>
                <div className={styles.roadmapItem}>
                  <div className={styles.roadmapMarker}>Q3 2025</div>
                  <div className={styles.roadmapContent}>
                    <h4>{t('journey.nextSteps.items.launch.title')}</h4>
                    <p>{t('journey.nextSteps.items.launch.description')}</p>
                  </div>
                </div>
                <div className={styles.roadmapItem}>
                  <div className={styles.roadmapMarker}>Q4 2025</div>
                  <div className={styles.roadmapContent}>
                    <h4>{t('journey.nextSteps.items.expansion.title')}</h4>
                    <p>{t('journey.nextSteps.items.expansion.description')}</p>
                  </div>
                </div>
                <div className={styles.roadmapItem}>
                  <div className={styles.roadmapMarker}>Q1 2026</div>
                  <div className={styles.roadmapContent}>
                    <h4>{t('journey.nextSteps.items.international.title')}</h4>
                    <p>{t('journey.nextSteps.items.international.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
            <p className={styles.ctaDescription}>{t('cta.description')}</p>
            
            <div className={styles.ctaButtons}>
              <a 
                href="https://paycov.com/waitlist" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.ctaPrimaryButton}
              >
                {t('cta.primaryButton')}
              </a>
              
              <Link href={`/${locale}/contact`} className={styles.ctaSecondaryButton}>
                {t('cta.secondaryButton')}
              </Link>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaBackgroundDecoration}></div>
      </section>
    </main>
  );
}