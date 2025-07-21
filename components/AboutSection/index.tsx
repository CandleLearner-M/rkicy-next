import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Users, 
  Globe, 
  Award, 
  TrendingUp, 
  Shield 
} from "lucide-react";
import styles from "./AboutSection.module.scss";

const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={styles.decorGrid}></div>
        <div className={styles.decorCircle}></div>
        <div className={styles.decorBlur1}></div>
        <div className={styles.decorBlur2}></div>
        
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <h6 className={styles.overline}>About Rkicy Technology</h6>
          <h2 className={styles.heading}>
            Pioneering Morocco's <span className={styles.highlight}>Digital Evolution</span>
          </h2>
          <div className={styles.separator}></div>
        </div>
        
        {/* Introduction */}
        <div className={styles.introduction}>
          <div className={styles.introContent}>
            <p className={styles.introPrimary}>
              Founded in 2018, Rkicy Technology has rapidly established itself as Morocco's leading enterprise IT solutions provider, combining deep technical expertise with an unwavering commitment to excellence.
            </p>
            <p className={styles.introSecondary}>
              We're on a mission to accelerate the digital transformation of Moroccan businesses through cutting-edge technology solutions that drive growth, efficiency, and innovation across industries.
            </p>
          </div>
          <div className={styles.statsContainer}>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>Clients Served</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>95%</span>
              <span className={styles.statLabel}>Client Retention</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>IT Experts</span>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className={styles.missionVision}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <span className={styles.cardIcon}>
                <Globe size={24} />
              </span>
              Our Mission
            </h3>
            <p className={styles.cardContent}>
              To empower Moroccan businesses with enterprise-grade technology solutions that drive digital transformation, enhance operational efficiency, and foster sustainable growth in an increasingly connected world.
            </p>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <span className={styles.cardIcon}>
                <TrendingUp size={24} />
              </span>
              Our Vision
            </h3>
            <p className={styles.cardContent}>
              To be the cornerstone of Morocco's digital future, recognized for our technical excellence, innovative solutions, and commitment to making advanced technology accessible to businesses of all sizes.
            </p>
          </div>
        </div>
        
        {/* Core values */}
        <div className={styles.valuesSection}>
          <h3 className={styles.valuesSectionTitle}>Our Core Values</h3>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <Shield size={28} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Integrity</h4>
              <p className={styles.valueDescription}>
                We uphold the highest standards of honesty, transparency, and ethical conduct in every interaction.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <Award size={28} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Excellence</h4>
              <p className={styles.valueDescription}>
                We strive for excellence in all aspects of our work, consistently exceeding expectations.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <Users size={28} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Collaboration</h4>
              <p className={styles.valueDescription}>
                We believe in the power of collaboration, working closely with clients as true partners.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIconWrapper}>
                <Calendar size={28} className={styles.valueIcon} />
              </div>
              <h4 className={styles.valueTitle}>Innovation</h4>
              <p className={styles.valueDescription}>
                We embrace continuous learning and innovation to stay at the forefront of technology.
              </p>
            </div>
          </div>
        </div>
        
        {/* Company journey */}
        <div className={styles.journeySection}>
          <div className={styles.journeyContent}>
            <h3 className={styles.journeySectionTitle}>Our Journey</h3>
            <p className={styles.journeyText}>
              Since our founding, we've grown from a small team of passionate technologists to Morocco's leading IT solutions provider. Our journey has been defined by continuous innovation, strategic partnerships, and an unwavering commitment to our clients' success.
            </p>
            <div className={styles.timelineContainer}>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>2018</span>
                  <h5 className={styles.timelineTitle}>Founded in Casablanca</h5>
                  <p className={styles.timelineText}>Rkicy Technology was established with a vision to transform Morocco's IT landscape.</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>2020</span>
                  <h5 className={styles.timelineTitle}>Strategic Partnerships</h5>
                  <p className={styles.timelineText}>Formed key partnerships with global technology leaders to enhance our service offerings.</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>2022</span>
                  <h5 className={styles.timelineTitle}>Expansion & Growth</h5>
                  <p className={styles.timelineText}>Expanded our team to 50+ IT experts and opened a second office in Rabat.</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelinePoint}></div>
                <div className={styles.timelineContent}>
                  <span className={styles.timelineYear}>2024</span>
                  <h5 className={styles.timelineTitle}>Innovation Hub</h5>
                  <p className={styles.timelineText}>Launched our Innovation Hub focused on AI, cloud solutions, and digital transformation.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.journeyImage}>
            <div className={styles.imageWrapper}>
              <Image 
                src="/about-company.jpg" 
                alt="Rkicy Technology team working together" 
                width={540} 
                height={680}
                className={styles.image}
              />
              <div className={styles.imageAccent}></div>
            </div>
          </div>
        </div>
        
        {/* Leadership */}
        <div className={styles.leadershipSection}>
          <h3 className={styles.leadershipTitle}>Meet Our Leadership</h3>
          <div className={styles.leadershipGrid}>
            {[1, 2, 3].map((index) => (
              <div key={index} className={styles.leaderCard}>
                <div className={styles.leaderImageContainer}>
                  <Image
                    src={`/team/leader-${index}.jpg`}
                    alt={`Rkicy Technology team leader ${index}`}
                    width={300}
                    height={340}
                    className={styles.leaderImage}
                  />
                  <div className={styles.leaderImageOverlay}></div>
                </div>
                <div className={styles.leaderInfo}>
                  <h4 className={styles.leaderName}>
                    {index === 1 ? 'Youssef Rkaissi' : index === 2 ? 'Karim Alaoui' : 'Fatima Zohra'}
                  </h4>
                  <p className={styles.leaderTitle}>
                    {index === 1 ? 'CEO & Co-Founder' : index === 2 ? 'CTO & Co-Founder' : 'Head of Operations'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.teamCta}>
            <Link href="/team" className={styles.teamLink}>
              Meet our entire team
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
        
        {/* Certifications */}
        <div className={styles.certificationsSection}>
          <div className={styles.certifications}>
            <div className={styles.certCard}>
              <div className={styles.certBadge}>
                <span>ISO</span>
                27001
              </div>
              <p className={styles.certText}>
                Information Security Management
              </p>
            </div>
            <div className={styles.certCard}>
              <div className={styles.certBadge}>
                <span>CMMI</span>
                Level 3
              </div>
              <p className={styles.certText}>
                Process Capability Maturity
              </p>
            </div>
          </div>
        </div>
        
        {/* CTA section */}
        <div className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaHeading}>Ready to start your digital transformation journey?</h3>
            <p className={styles.ctaText}>
              Let's discuss how Rkicy Technology can help your business thrive in the digital age.
            </p>
          </div>
          <Link href="/contact" className={styles.ctaButton}>
            Contact Our Team
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;