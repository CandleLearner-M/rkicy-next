"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTranslations } from 'next-intl';
import { 
  Award, 
  Globe, 
  TrendingUp, 
  Shield, 
  Users, 
  Calendar,
  ChevronRight,
  Play,
  CheckCircle,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import PageHeader from "@/components/Layout/PageHeader";
import ContactPreview from "@/components/HomePage/ContactPreview";

export default function AboutPage() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const timelineRef = useRef(null);
  const timelineOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const timelineY = useTransform(scrollYProgress, [0.4, 0.5], [100, 0]);
  
  const t = useTranslations('about');
  const tCommon = useTranslations('common');

  // Team data with translation keys
  const leadershipTeam = [
    {
      id: 1,
      nameKey: "team.members.mohammed.name",
      positionKey: "team.members.mohammed.position",
      bioKey: "team.members.mohammed.bio",
      areasKey: "team.members.mohammed.areas"
    },
    {
      id: 2,
      nameKey: "team.members.leila.name",
      positionKey: "team.members.leila.position",
      bioKey: "team.members.leila.bio",
      areasKey: "team.members.leila.areas"
    },
    {
      id: 3,
      nameKey: "team.members.karim.name",
      positionKey: "team.members.karim.position",
      bioKey: "team.members.karim.bio",
      areasKey: "team.members.karim.areas"
    }
  ];

  // Core values with translation keys
  const coreValues = [
    {
      icon: <Shield size={28} />,
      titleKey: "values.integrity.title",
      descriptionKey: "values.integrity.description"
    },
    {
      icon: <Award size={28} />,
      titleKey: "values.excellence.title",
      descriptionKey: "values.excellence.description"
    },
    {
      icon: <Users size={28} />,
      titleKey: "values.collaboration.title",
      descriptionKey: "values.collaboration.description"
    },
    {
      icon: <TrendingUp size={28} />,
      titleKey: "values.innovation.title",
      descriptionKey: "values.innovation.description"
    }
  ];

  // Timeline milestones with translation keys
  const milestones = [
    {
      year: 2023,
      titleKey: "timeline.founding.title",
      descriptionKey: "timeline.founding.description"
    },
    {
      year: 2023,
      titleKey: "timeline.zebra.title",
      descriptionKey: "timeline.zebra.description"
    },
    {
      year: 2024,
      titleKey: "timeline.sap.title",
      descriptionKey: "timeline.sap.description"
    },
    {
      year: 2024,
      titleKey: "timeline.ai.title",
      descriptionKey: "timeline.ai.description"
    },
    {
      year: 2025,
      titleKey: "timeline.government.title",
      descriptionKey: "timeline.government.description"
    }
  ];

  // Partnership logos
  const partners = [
    { name: "Zebra Technologies", logo: "/icons/zebra.svg" },
    { name: "SAP", logo: "/icons/sap.svg" },
    { name: "Microsoft", logo: "/icons/microsoft.svg" },
    { name: "OpenAI", logo: "/icons/openai.svg" }
  ];
  
  // Handle scroll restoration on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle team member selection
  const handleLeaderClick = (id: number) => {
    setSelectedLeader(selectedLeader === id ? null : id);
  };

  return (
    <main className={styles.aboutPage}>
      {/* Page header */}
      <PageHeader 
        titleKey="title"
        subtitleKey="subtitle"
        badgeKey="badge"
        namespace="about"
        highlightKey="title"
        breadcrumbs={[
          { labelKey: "home", href: "/" },
          { labelKey: "page", href: "/about", active: true }
        ]}
      />
      
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={styles.decorGrid}></div>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorBlur1}></div>
        
        {/* Vision & Mission */}
        <section className={styles.visionSection}>
          <div className={styles.visionContent}>
            <motion.h2 
              className={styles.sectionTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('vision.sectionTitle')}
            </motion.h2>
            
            <div className={styles.visionCards}>
              <motion.div 
                className={styles.visionCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.cardIconWrapper}>
                  <Globe size={32} className={styles.cardIcon} />
                </div>
                <h3>{t('vision.vision.title')}</h3>
                <p>{t('vision.vision.description')}</p>
              </motion.div>
              
              <motion.div 
                className={styles.visionCard}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className={styles.cardIconWrapper}>
                  <TrendingUp size={32} className={styles.cardIcon} />
                </div>
                <h3>{t('vision.mission.title')}</h3>
                <p>{t('vision.mission.description')}</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Company Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewContent}>
            <motion.div 
              className={styles.overviewText}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h2 className={styles.sectionTitle}>{t('story.title')}</h2>
              <p className={styles.leadText}>{t('story.lead')}</p>
              <p>{t('story.paragraph1')}</p>
              <p>{t('story.paragraph2')}</p>
              <p>{t('story.paragraph3')}</p>
              
              <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>{t('stats.experts')}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>4</span>
                  <span className={styles.statLabel}>{t('stats.partnerships')}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>20+</span>
                  <span className={styles.statLabel}>{t('stats.clients')}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className={styles.overviewMedia}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.mediaFrame}>
                <div className={styles.videoPlaceholder}>
                  <button 
                    className={styles.playButton}
                    onClick={() => setVideoModal(true)}
                    aria-label={t('video.playButton')}
                  >
                    <Play size={24} fill="currentColor" />
                  </button>
                  <span>{t('video.watchStory')}</span>
                </div>
                <div className={styles.mediaBadge}>
                  <span>{t('video.established')}</span>
                  2023
                </div>
              </div>
              <div className={styles.mediaAccent}></div>
            </motion.div>
          </div>
        </section>
        
        {/* Core Values */}
        <section className={styles.valuesSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {t('values.title')}
          </motion.h2>
          
          <div className={styles.valuesGrid}>
            {coreValues.map((value, index) => (
              <motion.div 
                key={value.titleKey} 
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.valueIconWrapper}>
                  {value.icon}
                </div>
                <h3 className={styles.valueTitle}>{t(value.titleKey)}</h3>
                <p className={styles.valueDescription}>{t(value.descriptionKey)}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Timeline */}
        <section className={styles.timelineSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {t('timeline.title')}
          </motion.h2>
          
          <div className={styles.timeline}>
            <motion.div 
              className={styles.timelineLine}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            ></motion.div>
            
            {milestones.map((milestone, index) => (
              <motion.div 
                key={index} 
                className={styles.timelineItem}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + (index * 0.15) }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className={styles.timelineYear}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + (index * 0.15) }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {milestone.year}
                </motion.div>
                
                <motion.div 
                  className={styles.timelineContent}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + (index * 0.15) }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <h3 className={styles.timelineTitle}>{t(milestone.titleKey)}</h3>
                  <p className={styles.timelineDescription}>{t(milestone.descriptionKey)}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Team Section */}
        <section className={styles.teamSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {t('team.title')}
          </motion.h2>
          
          <div className={styles.teamGrid}>
            {leadershipTeam.map((leader) => (
              <motion.div 
                key={leader.id}
                className={`${styles.teamCard} ${selectedLeader === leader.id ? styles.selected : ''}`}
                onClick={() => handleLeaderClick(leader.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={styles.teamMemberIcon}>
                  <Users size={32} />
                </div>
                <h3 className={styles.teamMemberName}>{t(leader.nameKey)}</h3>
                <p className={styles.teamMemberPosition}>{t(leader.positionKey)}</p>
                
                <div className={styles.teamCardFooter}>
                  <span className={styles.viewProfileText}>
                    {selectedLeader === leader.id ? t('team.hideProfile') : t('team.viewProfile')}
                    <ChevronRight 
                      size={16} 
                      className={`${styles.profileArrow} ${selectedLeader === leader.id ? styles.rotated : ''}`} 
                    />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <AnimatePresence>
            {selectedLeader && (
              <motion.div 
                className={styles.teamMemberDetails}
                initial={{ opacity: 0, y: 20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const leader = leadershipTeam.find(l => l.id === selectedLeader);
                  if (!leader) return null;
                  
                  return (
                    <div className={styles.detailsContent}>
                      <h3 className={styles.detailsName}>{t(leader.nameKey)}</h3>
                      <p className={styles.detailsPosition}>{t(leader.positionKey)}</p>
                      <p className={styles.detailsBio}>{t(leader.bioKey)}</p>
                      
                      <div className={styles.expertiseAreas}>
                        <h4>{t('team.expertiseAreas')}</h4>
                        <ul>
                          {t.raw(leader.areasKey).map((area: string, idx: number) => (
                            <li key={idx}>
                              <CheckCircle size={16} />
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
        
        {/* Partners Section */}
        <section className={styles.partnersSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {t('partners.title')}
          </motion.h2>
          
          <motion.p 
            className={styles.partnerIntro}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {t('partners.description')}
          </motion.p>
          
          <div className={styles.partnersGrid}>
            {partners.map((partner, index) => (
              <motion.div 
                key={partner.name}
                className={styles.partnerCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 } 
                }}
              >
                <Image 
                  src={partner.logo} 
                  alt={partner.name} 
                  width={150} 
                  height={60} 
                  className={styles.partnerLogo}
                />
                <p className={styles.partnerName}>{partner.name}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Call to Action */}
      </div>
      <ContactPreview />
      
      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div 
            className={styles.videoModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoModal(false)}
          >
            <motion.div 
              className={styles.videoContainer}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeModalButton}
                onClick={() => setVideoModal(false)}
                aria-label={t('video.closeVideo')}
              >
                <X size={24} />
              </button>
              <div className={styles.videoWrapper}>
                <div className={styles.videoPlaceholder}>
                  <p>{t('video.placeholder')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}