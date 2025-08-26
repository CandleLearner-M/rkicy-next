"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Settings, 
  BarChart3, 
  BookOpen, 
  Users,
  Server
} from "lucide-react";
import styles from "./Partnerships.module.scss";
import PageHeader from "@/components/Layout/PageHeader";
import ContactPreview from "@/components/HomePage/ContactPreview";
import SectionBackground from "@/components/Layout/SectionBackground/SectionBackground";

export default function PartnershipsPage() {
  const t = useTranslations('partnerships');
  const [activeTab, setActiveTab] = useState("zebra");
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  return (
    <main className={styles.partnershipsPage}>
      <PageHeader 
        titleKey="title"
        subtitleKey="subtitle"
        badgeKey="badge"
        namespace="partnerships"
        highlightKey="title"
        breadcrumbs={[
          { labelKey: "home", href: "/" },
          { labelKey: "page", href: "/partnerships", active: true }
        ]}
      />
      
      <section className={styles.partnershipsContent}>
        <div className={styles.container}>
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'zebra' ? styles.active : ''}`}
                onClick={() => handleTabChange('zebra')}
              >
                <Image 
                  src="/icons/zebra.svg" 
                  alt="Zebra Technologies" 
                  width={32} 
                  height={32}
                  className={styles.tabIcon}
                />
                <span>{t('tabs.zebra')}</span>
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'sap' ? styles.active : ''}`}
                onClick={() => handleTabChange('sap')}
              >
                <Image 
                  src="/icons/sap.svg" 
                  alt="SAP" 
                  width={32} 
                  height={32}
                  className={styles.tabIcon}
                />
                <span>{t('tabs.sap')}</span>
              </button>
            </div>
          </div>
          
          {activeTab === 'zebra' && (
            <div className={styles.partnershipDetails}>
              <div className={styles.partnerHeader}>
                <div className={styles.partnerBadge}>
                  <CheckCircle size={16} />
                  <span>{t('zebra.badge')}</span>
                </div>
                <h2>{t('zebra.title')}</h2>
                <p className={styles.partnerDescription}>{t('zebra.description')}</p>
              </div>
              
              <div className={styles.partnerContent}>
                <div className={styles.contentLeft}>
                  <div className={styles.partnerFeatures}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <Globe size={28} />
                      </div>
                      <h3>{t('zebra.features.supply.title')}</h3>
                      <p>{t('zebra.features.supply.description')}</p>
                    </div>
                    
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <Settings size={28} />
                      </div>
                      <h3>{t('zebra.features.support.title')}</h3>
                      <p>{t('zebra.features.support.description')}</p>
                    </div>
                    
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <BarChart3 size={28} />
                      </div>
                      <h3>{t('zebra.features.efficiency.title')}</h3>
                      <p>{t('zebra.features.efficiency.description')}</p>
                    </div>
                  </div>
                  
                  <div className={styles.partnerCommitment}>
                    <h3>{t('zebra.commitment.title')}</h3>
                    <p>{t('zebra.commitment.description')}</p>
                    
                    <Link href="/contact" className={styles.contactButton}>
                      <span>{t('zebra.cta')}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                
                <div className={styles.contentRight}>
                  <div className={styles.partnerShowcase}>
                    <div className={styles.showcaseHeader}>
                      <h3>{t('zebra.showcase.title')}</h3>
                      <div className={styles.officialBadge}>
                        <Shield size={14} />
                        <span>{t('zebra.showcase.badge')}</span>
                      </div>
                    </div>
                    
                    <div className={styles.showcaseContent}>
                      <div className={styles.logoContainer}>
                        <Image 
                          src="/icons/zebra.svg" 
                          alt="Zebra Technologies" 
                          width={200} 
                          height={80}
                          className={styles.partnerLogo}
                        />
                      </div>
                      
                      <div className={styles.productCategories}>
                        {['scanners', 'computers', 'printers', 'rfid'].map((category) => (
                          <div key={category} className={styles.productCategory}>
                            <CheckCircle size={18} />
                            <span>{t(`zebra.products.${category}`)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className={styles.partnerStats}>
                        <div className={styles.statItem}>
                          <div className={styles.statValue}>100+</div>
                          <div className={styles.statLabel}>{t('zebra.stats.products')}</div>
                        </div>
                        <div className={styles.statItem}>
                          <div className={styles.statValue}>24/7</div>
                          <div className={styles.statLabel}>{t('zebra.stats.support')}</div>
                        </div>
                        <div className={styles.statItem}>
                          <div className={styles.statValue}>5+</div>
                          <div className={styles.statLabel}>{t('zebra.stats.experience')}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'sap' && (
            <div className={styles.partnershipDetails}>
              <div className={styles.partnerHeader}>
                <div className={styles.partnerBadge}>
                  <Zap size={16} />
                  <span>{t('sap.badge')}</span>
                </div>
                <h2>{t('sap.title')}</h2>
                <p className={styles.partnerDescription}>{t('sap.description')}</p>
              </div>
              
              <div className={styles.partnerContent}>
                <div className={styles.contentLeft}>
                  <div className={styles.partnerFeatures}>
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <Server size={28} />
                      </div>
                      <h3>{t('sap.features.implementation.title')}</h3>
                      <p>{t('sap.features.implementation.description')}</p>
                    </div>
                    
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <Zap size={28} />
                      </div>
                      <h3>{t('sap.features.development.title')}</h3>
                      <p>{t('sap.features.development.description')}</p>
                    </div>
                    
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <BookOpen size={28} />
                      </div>
                      <h3>{t('sap.features.training.title')}</h3>
                      <p>{t('sap.features.training.description')}</p>
                    </div>
                    
                    <div className={styles.featureCard}>
                      <div className={styles.featureIcon}>
                        <Users size={28} />
                      </div>
                      <h3>{t('sap.features.insight.title')}</h3>
                      <p>{t('sap.features.insight.description')}</p>
                    </div>
                  </div>
                  
                  <div className={styles.partnerCommitment}>
                    <h3>{t('sap.commitment.title')}</h3>
                    <p>{t('sap.commitment.description')}</p>
                    
                    <Link href="/contact" className={styles.contactButton}>
                      <span>{t('sap.cta')}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                
                <div className={styles.contentRight}>
                  <div className={styles.partnerShowcase}>
                    <div className={styles.showcaseHeader}>
                      <h3>{t('sap.showcase.title')}</h3>
                    </div>
                    
                    <div className={styles.showcaseContent}>
                      <div className={styles.logoContainer}>
                        <Image 
                          src="/icons/sap.svg" 
                          alt="SAP" 
                          width={200} 
                          height={80}
                          className={styles.partnerLogo}
                        />
                      </div>
                      
                      <div className={styles.sapSolutions}>
                        {['businessOne', 's4hana', 'fiori'].map((solution) => (
                          <div key={solution} className={styles.sapSolution}>
                            <div className={styles.solutionLabel}>
                              <span>{t(`sap.solutions.${solution}.name`)}</span>
                            </div>
                            <div className={styles.solutionDesc}>
                              <p>{t(`sap.solutions.${solution}.description`)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className={styles.industriesGrid}>
                        <div className={styles.industryTitle}>{t('sap.industries.title')}</div>
                        <div className={styles.industries}>
                          {['finance', 'retail', 'manufacturing', 'government'].map((industry) => (
                            <div key={industry} className={styles.industryTag}>
                              {t(`sap.industries.${industry}`)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactPreview />
    </main>
  );
}