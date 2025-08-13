"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight,
  Globe,
  Briefcase,
  Award,
  Users,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import PageHeader from "@/components/Layout/PageHeader";
import styles from "./partners.module.scss";

// Strategic partners data
const strategicPartners = [
  {
    id: "zebra",
    name: "Zebra Technologies",
    logo: "/icons/zebra.svg",
    description: "Official partner and distributor for Zebra Technologies hardware in Morocco, bringing enterprise-grade scanning, printing, and mobile computing solutions to North African businesses.",
    since: 2023,
    partnerType: "Hardware Solutions",
    website: "https://www.zebra.com",
    featured: true,
    offerings: [
      "Enterprise Mobile Computers",
      "RFID Systems & Barcode Scanners",
      "Industrial Printers & Supplies",
      "Data Capture Solutions"
    ],
    benefits: [
      "Direct access to Zebra's enterprise hardware catalog",
      "Certified technical support and maintenance",
      "Tailored supply chain and retail solutions",
      "Competitive pricing and local warranty services"
    ],
    caseStudy: {
      title: "Modernizing Logistics for Major Retailer",
      excerpt: "Implemented Zebra mobile computing solutions across 50+ locations, reducing inventory management time by 65% and improving accuracy to 99.8%."
    }
  },
  {
    id: "sap",
    name: "SAP",
    logo: "/icons/sap.svg",
    description: "As an SAP partner, Rkicy Technology delivers enterprise-grade ERP solutions tailored specifically for the Moroccan market, providing local expertise with global standards.",
    since: 2024,
    partnerType: "Enterprise Software",
    website: "https://www.sap.com",
    featured: true,
    offerings: [
      "SAP S/4HANA Implementation",
      "Business Intelligence Solutions",
      "Cloud Migration Services",
      "SAP Integration & Development"
    ],
    benefits: [
      "Locally certified SAP consultants and developers",
      "Industry-specific ERP configurations for Moroccan businesses",
      "Compliance with local regulatory requirements",
      "Integrated business process optimization"
    ],
    caseStudy: {
      title: "Digital Transformation for Manufacturing Leader",
      excerpt: "SAP S/4HANA implementation reduced month-end closing time from 15 days to 3 days while increasing operational visibility across all departments."
    }
  },
  {
    id: "microsoft",
    name: "Microsoft",
    logo: "/icons/microsoft.svg",
    description: "Microsoft Cloud Solution Provider offering comprehensive Azure services, Microsoft 365, and Power Platform solutions with local support and expertise.",
    since: 2024,
    partnerType: "Cloud Services",
    website: "https://www.microsoft.com",
    featured: true,
    offerings: [
      "Microsoft Azure Cloud Infrastructure",
      "Microsoft 365 & Teams Deployment",
      "Power BI & Analytics Solutions",
      "Azure DevOps Implementation"
    ],
    benefits: [
      "Microsoft certified cloud architects and developers",
      "Seamless migration to Microsoft cloud platforms",
      "Local billing and technical support in Morocco",
      "Customized Microsoft solutions for business needs"
    ],
    caseStudy: {
      title: "Cloud Modernization for Financial Services",
      excerpt: "Microsoft Azure migration reduced IT infrastructure costs by 40% while enhancing security posture and enabling remote work capabilities."
    }
  },
  {
    id: "openai",
    name: "OpenAI",
    logo: "/icons/openai.svg",
    description: "Certified implementation partner for OpenAI technologies, bringing advanced AI capabilities to Moroccan businesses through customized GPT applications.",
    since: 2024,
    partnerType: "Artificial Intelligence",
    website: "https://www.openai.com",
    featured: false,
    offerings: [
      "Custom GPT Model Implementation",
      "AI-Powered Business Solutions",
      "Natural Language Processing Systems",
      "Intelligent Document Processing"
    ],
    benefits: [
      "Expertise in OpenAI API integration and fine-tuning",
      "Localized AI solutions for Arabic and French language processing",
      "AI solution development for specific business challenges",
      "Training and support for internal AI adoption"
    ]
  }
];

// Technology areas
const technologyAreas = [
  {
    name: "Hardware Solutions",
    icon: <Briefcase size={24} />,
    partners: ["Zebra Technologies", "Dell Technologies"]
  },
  {
    name: "Enterprise Software",
    icon: <Globe size={24} />,
    partners: ["SAP", "Oracle", "Salesforce"]
  },
  {
    name: "Cloud Services",
    icon: <Users size={24} />,
    partners: ["Microsoft", "Amazon Web Services", "Google Cloud"]
  },
  {
    name: "Artificial Intelligence",
    icon: <Award size={24} />,
    partners: ["OpenAI", "IBM Watson", "Hugging Face"]
  }
];

// Benefits of partnering
const partnershipBenefits = [
  {
    title: "Best-in-Class Solutions",
    description: "Access world-leading technology platforms customized for the Moroccan market"
  },
  {
    title: "Local Expertise",
    description: "Implementation by certified experts with deep understanding of regional business needs"
  },
  {
    title: "Integrated Services",
    description: "Seamless integration of multiple partner technologies for comprehensive solutions"
  },
  {
    title: "Ongoing Support",
    description: "Local technical support and maintenance services in Arabic, French, and English"
  },
  {
    title: "Competitive Pricing",
    description: "Direct partnership relationships enable favorable pricing models for our clients"
  },
  {
    title: "Regulatory Compliance",
    description: "Solutions configured to meet Moroccan and North African regulatory requirements"
  }
];

export default function PartnersPage() {
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handlePartnerSelect = (partnerId: string) => {
    setSelectedPartner(partnerId === selectedPartner ? null : partnerId);
  };

  return (
    <main className={styles.partnersPage}>
      {/* Page header */}
      <PageHeader 
        title="Our Partners" 
        subtitle="Strategic alliances with global technology leaders to serve the Moroccan market"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Partners", href: "/partners", active: true }
        ]}
      />
      
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorPattern}></div>
        
        {/* Introduction Section */}
        <section className={styles.introSection}>
          <motion.div 
            className={styles.introContent}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className={styles.sectionTitle}>
              Global Technology, <span className={styles.highlight}>Local Expertise</span>
            </h2>
            <p className={styles.introParagraph}>
              At Rkicy Technology, we've established strategic partnerships with leading global technology providers to bring world-class solutions to the Moroccan market. These alliances allow us to combine international best practices with deep local knowledge, delivering powerful and relevant technology solutions to our clients.
            </p>
            <p className={styles.introParagraph}>
              Our certified experts work directly with our partners' technologies to ensure seamless implementation, localization, and ongoing support for businesses across Morocco and North Africa.
            </p>
          </motion.div>
          
          <motion.div 
            className={styles.statsContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className={styles.statItem}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Global Partners</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Certified Experts</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>100+</span>
              <span className={styles.statLabel}>Successful Projects</span>
            </div>
          </motion.div>
        </section>
        
        {/* Strategic Partners */}
        <section className={styles.strategicPartnersSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Strategic Partners
          </motion.h2>
          
          <div className={styles.partnersList}>
            {strategicPartners.map((partner, index) => (
              <motion.div 
                key={partner.id}
                className={`${styles.partnerCard} ${selectedPartner === partner.id ? styles.selected : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)" }}
                onClick={() => handlePartnerSelect(partner.id)}
              >
                <div className={styles.partnerLogo}>
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    width={120} 
                    height={60}
                    objectFit="contain"
                  />
                </div>
                
                <h3 className={styles.partnerName}>{partner.name}</h3>
                <p className={styles.partnerType}>{partner.partnerType}</p>
                <p className={styles.partnerDescription}>{partner.description}</p>
                
                <div className={styles.partnerMeta}>
                  <div className={styles.partnerSince}>
                    <span>Partner since</span>
                    <strong>{partner.since}</strong>
                  </div>
                  
                  {partner.featured && (
                    <div className={styles.featuredBadge}>
                      <CheckCircle size={14} /> Featured Partner
                    </div>
                  )}
                </div>
                
                <div className={styles.partnerCardFooter}>
                  <span className={styles.viewDetailsText}>
                    {selectedPartner === partner.id ? "Hide Details" : "View Details"}
                    <ChevronRight 
                      size={16} 
                      className={`${styles.detailArrow} ${selectedPartner === partner.id ? styles.rotated : ''}`} 
                    />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Partner Details Panels */}
          {strategicPartners.map((partner) => (
            <motion.div 
              key={`details-${partner.id}`}
              className={styles.partnerDetails}
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: selectedPartner === partner.id ? 'auto' : 0,
                opacity: selectedPartner === partner.id ? 1 : 0
              }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {selectedPartner === partner.id && (
                <div className={styles.detailsContent}>
                  <div className={styles.detailsHeader}>
                    <div className={styles.detailsLogoArea}>
                      <Image 
                        src={partner.logo} 
                        alt={partner.name} 
                        width={150} 
                        height={75}
                        objectFit="contain"
                      />
                      <h3>{partner.name}</h3>
                    </div>
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={styles.partnerWebsite}
                    >
                      Visit Website <ExternalLink size={14} />
                    </a>
                  </div>
                  
                  <div className={styles.detailsBody}>
                    <div className={styles.detailsColumn}>
                      <div className={styles.detailsSection}>
                        <h4>Solutions & Offerings</h4>
                        <ul className={styles.offeringsList}>
                          {partner.offerings.map((offering, idx) => (
                            <li key={idx}>{offering}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={styles.detailsSection}>
                        <h4>Why Choose This Partnership</h4>
                        <ul className={styles.benefitsList}>
                          {partner.benefits.map((benefit, idx) => (
                            <li key={idx}>
                              <CheckCircle size={16} />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    {partner.caseStudy && (
                      <div className={styles.detailsColumn}>
                        <div className={styles.caseStudyBox}>
                          <div className={styles.caseStudyHeader}>
                            <h4>Success Story</h4>
                          </div>
                          <h5>{partner.caseStudy.title}</h5>
                          <p>{partner.caseStudy.excerpt}</p>
                          <Link href={`/case-studies/${partner.id}`} className={styles.caseStudyLink}>
                            Read Full Case Study <ArrowRight size={16} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.detailsFooter}>
                    <Link href="/contact" className={styles.contactButton}>
                      Inquire About {partner.name} Solutions
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </section>
        
        {/* Technology Areas */}
        <section className={styles.technologyAreasSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            Technology Areas
          </motion.h2>
          
          <div className={styles.technologyGrid}>
            {technologyAreas.map((area, index) => (
              <motion.div 
                key={area.name} 
                className={styles.technologyCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
              >
                <div className={styles.technologyIcon}>
                  {area.icon}
                </div>
                <h3 className={styles.technologyName}>{area.name}</h3>
                <div className={styles.technologyPartners}>
                  {area.partners.map((partner, idx) => (
                    <span key={idx} className={styles.partnerPill}>
                      {partner}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Partnership Benefits */}
        <section className={styles.benefitsSection}>
          <motion.h2 
            className={styles.sectionTitle + ' ' + styles.centeredTitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            The Advantage of Our Partnerships
          </motion.h2>
          
          <div className={styles.benefitsGrid}>
            {partnershipBenefits.map((benefit, index) => (
              <motion.div 
                key={benefit.title} 
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDescription}>{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Become a Partner CTA */}
        <section className={styles.becomePartnerSection}>
          <motion.div 
            className={styles.becomePartnerContent}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={styles.ctaTitle}>Become a Technology Partner</h2>
            <p className={styles.ctaText}>
              Interested in partnering with Rkicy Technology to expand your reach in the Moroccan market? We're always looking for innovative technology providers to join our ecosystem.
            </p>
            <div className={styles.ctaButtons}>
              <Link href="/partner-program" className={styles.primaryButton}>
                Learn About Our Partner Program
              </Link>
              <Link href="/contact" className={styles.secondaryButton}>
                Contact Our Partnership Team
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}