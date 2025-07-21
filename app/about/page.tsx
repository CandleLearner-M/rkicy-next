"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
// import PageHeader from "@/components/PageHeader";
import styles from "./page.module.scss";

// Team data
const leadershipTeam = [
  {
    id: 1,
    name: "Mohammed Alami",
    position: "Founder & CEO",
    bio: "With over 15 years of experience in enterprise IT solutions, Mohammed founded Rkicy Technology with a vision to transform Morocco's technological landscape. His expertise spans AI implementation, digital transformation, and strategic partnerships with global tech leaders.",
    areas: ["Strategic Leadership", "Technology Vision", "Global Partnerships"]
  },
  {
    id: 2,
    name: "Leila Bensouda",
    position: "Chief Technology Officer",
    bio: "Leading our technical strategy, Leila brings 12+ years of software architecture and AI development experience. Her background includes senior roles at international tech firms and a passion for applying cutting-edge solutions to real-world business challenges.",
    areas: ["AI & Machine Learning", "Cloud Architecture", "Technical Leadership"]
  },
  {
    id: 3,
    name: "Karim Idrissi",
    position: "Director of Consulting",
    bio: "Karim heads our consulting practice, bringing deep expertise in digital transformation and enterprise system integration. With experience serving clients across North Africa and Europe, he ensures our solutions deliver measurable business impact.",
    areas: ["Digital Strategy", "Business Process Optimization", "Enterprise Solutions"]
  }
];

// Core values
const coreValues = [
  {
    icon: <Shield size={28} />,
    title: "Integrity",
    description: "We uphold the highest standards of honesty, transparency, and ethical conduct in every interaction with clients, partners, and colleagues."
  },
  {
    icon: <Award size={28} />,
    title: "Excellence",
    description: "We are committed to delivering exceptional quality in everything we do, from technology solutions to client service and support."
  },
  {
    icon: <Users size={28} />,
    title: "Collaboration",
    description: "We believe in the power of partnership—working closely with clients as true partners to achieve transformative results together."
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Innovation",
    description: "We embrace continuous learning and innovative thinking, staying at the forefront of technology to deliver forward-looking solutions."
  }
];

// Timeline milestones
const milestones = [
  {
    year: 2023,
    title: "Founding of Rkicy Technology",
    description: "Established in Rabat with a vision to transform Morocco's IT landscape through innovative solutions and services."
  },
  {
    year: 2023,
    title: "Strategic Partnership with Zebra Technologies",
    description: "Became an official partner and distributor for Zebra Technologies hardware in Morocco."
  },
  {
    year: 2024,
    title: "SAP Partnership",
    description: "Formalized partnership with SAP to deliver enterprise-grade ERP solutions to Moroccan businesses."
  },
  {
    year: 2024,
    title: "Launch of AI Consulting Practice",
    description: "Expanded service offerings with dedicated AI consulting and implementation services."
  },
  {
    year: 2025,
    title: "Government Sector Expansion",
    description: "Began serving key government agencies with specialized IT solutions and digital transformation services."
  }
];

// Partnership logos
const partners = [
  { name: "Zebra Technologies", logo: "/icons/zebra.svg" },
  { name: "SAP", logo: "/icons/sap.svg" },
  { name: "Microsoft", logo: "/icons/microsoft.svg" },
  { name: "OpenAI", logo: "/icons/openai.svg" }
];

export default function AboutPage() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState(false);
  const { scrollYProgress } = useScroll();
  const timelineRef = useRef(null);
  const timelineOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const timelineY = useTransform(scrollYProgress, [0.4, 0.5], [100, 0]);
  
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
      {/* <PageHeader 
        title="About Us" 
        subtitle="Morocco's Leading IT Solutions Provider"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about", active: true }
        ]}
      /> */}
      
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
              Our <span className={styles.highlight}>Vision</span> & <span className={styles.highlight}>Mission</span>
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
                <h3>Our Vision</h3>
                <p>
                  To be the cornerstone of Morocco's digital future, recognized for our technical excellence, 
                  innovative solutions, and commitment to making advanced technology accessible to businesses of all sizes.
                </p>
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
                <h3>Our Mission</h3>
                <p>
                  To empower Moroccan businesses with enterprise-grade technology solutions that drive digital transformation, 
                  enhance operational efficiency, and foster sustainable growth in an increasingly connected world.
                </p>
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
              <h2 className={styles.sectionTitle}>Our Story</h2>
              <p className={styles.leadText}>
                Founded in 2023 in Rabat, Rkicy Technology was born from a vision to bridge the technology gap for Moroccan enterprises.
              </p>
              <p>
                Rkicy Technology was established to provide cutting-edge IT services in artificial intelligence, software development, and strategic consulting, while also serving as a trusted distributor of enterprise-grade hardware through our partnerships with global technology leaders.
              </p>
              <p>
                Our founding team brings decades of combined experience from leading global technology firms, with deep expertise in enterprise solutions, AI implementation, and digital transformation. This unique combination of local insight and international experience allows us to deliver world-class solutions tailored to the specific needs of our Moroccan clients.
              </p>
              <p>
                Today, we're rapidly establishing ourselves as Morocco's premier technology partner, helping organizations of all sizes navigate their digital transformation journeys with confidence and clarity.
              </p>
              
              <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>10+</span>
                  <span className={styles.statLabel}>Technology Experts</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>4</span>
                  <span className={styles.statLabel}>Global Partnerships</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>20+</span>
                  <span className={styles.statLabel}>Clients Served</span>
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
                    aria-label="Play company video"
                  >
                    <Play size={24} fill="currentColor" />
                  </button>
                  <span>Watch our story</span>
                </div>
                <div className={styles.mediaBadge}>
                  <span>Est.</span>
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
            Our Core Values
          </motion.h2>
          
          <div className={styles.valuesGrid}>
            {coreValues.map((value, index) => (
              <motion.div 
                key={value.title} 
                className={styles.valueCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={styles.valueIconWrapper}>
                  {value.icon}
                </div>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Timeline */}
        <motion.section 
          className={styles.timelineSection}
          ref={timelineRef}
          style={{ opacity: timelineOpacity, y: timelineY }}
        >
          <h2 className={styles.sectionTitle + ' ' + styles.centeredTitle}>Our Journey</h2>
          
          <div className={styles.timeline}>
            <div className={styles.timelineLine}></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineYear}>{milestone.year}</div>
                <div className={styles.timelineContent}>
                  <h3 className={styles.timelineTitle}>{milestone.title}</h3>
                  <p className={styles.timelineDescription}>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
        
        {/* Team Section */}
        <section className={styles.teamSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            Meet Our Leadership
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
                <h3 className={styles.teamMemberName}>{leader.name}</h3>
                <p className={styles.teamMemberPosition}>{leader.position}</p>
                
                <div className={styles.teamCardFooter}>
                  <span className={styles.viewProfileText}>
                    {selectedLeader === leader.id ? "Hide Profile" : "View Profile"}
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
                      <h3 className={styles.detailsName}>{leader.name}</h3>
                      <p className={styles.detailsPosition}>{leader.position}</p>
                      <p className={styles.detailsBio}>{leader.bio}</p>
                      
                      <div className={styles.expertiseAreas}>
                        <h4>Areas of Expertise</h4>
                        <ul>
                          {leader.areas.map((area, idx) => (
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
            Our Strategic Partners
          </motion.h2>
          
          <motion.p 
            className={styles.partnerIntro}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            We collaborate with leading global technology providers to deliver the most advanced solutions to our clients.
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
        <section className={styles.ctaSection}>
          <motion.div 
            className={styles.ctaContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className={styles.ctaTitle}>Ready to transform your business?</h2>
            <p className={styles.ctaText}>
              Let's discuss how Rkicy Technology can help your organization thrive in the digital age.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaPrimaryButton}>
                Get in Touch
              </Link>
              <Link href="/services" className={styles.ctaSecondaryButton}>
                Explore Our Services
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
      
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
                aria-label="Close video"
              >
                <X size={24} />
              </button>
              <div className={styles.videoWrapper}>
                {/* Replace this with an actual video embed */}
                <div className={styles.videoPlaceholder}>
                  <p>Company introduction video would play here.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}