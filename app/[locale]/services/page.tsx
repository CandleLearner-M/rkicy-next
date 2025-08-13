"use client";

import Link from "next/link";
import { 
  ChevronRight, 
  Cpu, 
  Cloud, 
  Shield, 
  BarChart3, 
  Monitor, 
  Database,
  BrainCircuit,
  Code,
  Settings,
  Users,
  LineChart,
  Network,
  Lock,
  LayoutGrid,
  ClipboardCheck,
  ShoppingBag,
  GraduationCap,
  Building
} from "lucide-react";
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import styles from "./page.module.scss";
import PageHeader from "@/components/Layout/PageHeader";

export default function ServicesPage() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  // Define services with translation keys
  const services = [
    {
      id: 'ai-solutions',
      icon: <Cpu size={32} />,
      nameKey: 'servicesList.ai.name',
      descriptionKey: 'servicesList.ai.description',
      featuresKey: 'servicesList.ai.features',
    },
    {
      id: 'enterprise-it',
      icon: <Database size={32} />,
      nameKey: 'servicesList.enterpriseIT.name',
      descriptionKey: 'servicesList.enterpriseIT.description',
      featuresKey: 'servicesList.enterpriseIT.features',
    },
    {
      id: 'cloud-solutions',
      icon: <Cloud size={32} />,
      nameKey: 'servicesList.cloud.name',
      descriptionKey: 'servicesList.cloud.description',
      featuresKey: 'servicesList.cloud.features',
    },
    {
      id: 'cybersecurity',
      icon: <Shield size={32} />,
      nameKey: 'servicesList.cybersecurity.name',
      descriptionKey: 'servicesList.cybersecurity.description',
      featuresKey: 'servicesList.cybersecurity.features',
    },
    {
      id: 'digital-transformation',
      icon: <BarChart3 size={32} />,
      nameKey: 'servicesList.digitalTransformation.name',
      descriptionKey: 'servicesList.digitalTransformation.description',
      featuresKey: 'servicesList.digitalTransformation.features',
    },
    {
      id: 'hardware-solutions',
      icon: <Monitor size={32} />,
      nameKey: 'servicesList.hardware.name',
      descriptionKey: 'servicesList.hardware.description',
      featuresKey: 'servicesList.hardware.features',
    }
  ];

  // Define industries with translation keys
  const industries = [
    { nameKey: 'industries.finance', icon: <LayoutGrid size={28} /> },
    { nameKey: 'industries.healthcare', icon: <Shield size={28} /> },
    { nameKey: 'industries.manufacturing', icon: <Settings size={28} /> },
    { nameKey: 'industries.retail', icon: <ShoppingBag size={28} /> },
    { nameKey: 'industries.education', icon: <GraduationCap size={28} /> },
    { nameKey: 'industries.government', icon: <Building size={28} /> },
  ];

  return (
    <section className={styles.servicesSection}>
       <PageHeader 
          titleKey="title"
          subtitleKey="subtitle"
          badgeKey="badge"
          namespace="services"
          highlightKey="title"
          breadcrumbs={[
            { labelKey: "home", href: "/" },
            { labelKey: "page", href: "/services", active: true }
          ]}
        />
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={styles.decorPattern}></div>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorGradient}></div>
        
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <h6 className={styles.overline}>{t('section.overline')}</h6>
          <h2 className={styles.heading}>
            {t.rich('section.heading', {
              highlight: (chunks) => <span className={styles.highlight}>{chunks}</span>
            })}
          </h2>
          <p className={styles.subheading}>
            {t('section.subheading')}
          </p>
        </div>
        
        {/* Featured service - AI Solutions */}
        <div className={styles.featuredService}>
          <div className={styles.featuredContent}>
            <div className={styles.featuredIconWrapper}>
              <BrainCircuit size={42} className={styles.featuredIcon} />
            </div>
            <h3 className={styles.featuredTitle}>{t('featured.title')}</h3>
            <p className={styles.featuredDescription}>
              {t('featured.description')}
            </p>
            <ul className={styles.featuredFeatures}>
              {t.raw('featured.features').map((feature, index) => (
                <li key={index}>
                  <span className={styles.checkmark}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/services/ai-solutions`} className={styles.featuredLink}>
              {t('featured.learnMore')}
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className={styles.featuredIconSection}>
            <div className={styles.iconGrid}>
              <div className={styles.iconCircle} style={{ top: '10%', left: '20%' }}>
                <BrainCircuit size={40} />
              </div>
              <div className={styles.iconCircle} style={{ top: '25%', right: '15%' }}>
                <Code size={40} />
              </div>
              <div className={styles.iconCircle} style={{ bottom: '30%', left: '10%' }}>
                <Network size={40} />
              </div>
              <div className={styles.iconCircle} style={{ bottom: '15%', right: '25%' }}>
                <LineChart size={40} />
              </div>
            </div>
            <div className={styles.featuredBadge}>
              <span>{t('featured.badge.highlighted')}</span>
              {t('featured.badge.service')}
            </div>
          </div>
        </div>
        
        {/* Services grid */}
        <div className={styles.servicesGrid}>
          {services.filter(service => service.id !== 'ai-solutions').map((service) => (
            <div key={service.id} className={styles.serviceCard}>
              <div className={styles.serviceCardInner}>
                <div className={styles.serviceIcon}>
                  {service.icon}
                </div>
                <h4 className={styles.serviceName}>{t(service.nameKey)}</h4>
                <p className={styles.serviceDescription}>
                  {t(service.descriptionKey)}
                </p>
                <ul className={styles.serviceFeatures}>
                  {t.raw(service.featuresKey).map((feature, index) => (
                    <li key={index}>
                      <span className={styles.bullet}>•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.serviceCardFooter}>
                <Link href={`/${locale}/services/${service.id}`} className={styles.serviceLink}>
                  {t('serviceCard.explore', { serviceName: t(service.nameKey) })}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Service process */}
        <div className={styles.processSection}>
          <h3 className={styles.processTitle}>{t('process.title')}</h3>
          <div className={styles.processSteps}>
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className={styles.processStep}>
                <div className={styles.processStepNumber}>{step}</div>
                <div className={styles.processStepContent}>
                  <h4 className={styles.processStepTitle}>{t(`process.steps.${step}.title`)}</h4>
                  <p className={styles.processStepDescription}>
                    {t(`process.steps.${step}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Customized solutions */}
        <div className={styles.customSection}>
          <div className={styles.customContent}>
            <h3 className={styles.customTitle}>{t('custom.title')}</h3>
            <p className={styles.customDescription}>
              {t('custom.description')}
            </p>
            <Link href={`/${locale}/contact`} className={styles.customButton}>
              {t('custom.ctaButton')}
            </Link>
          </div>
          <div className={styles.customIconGrid}>
            {t.raw('custom.features').map((feature, index) => (
              <div key={index} className={styles.customIconWrapper}>
                {index === 0 && <Settings size={38} className={styles.customIcon} />}
                {index === 1 && <Users size={38} className={styles.customIcon} />}
                {index === 2 && <Lock size={38} className={styles.customIcon} />}
                {index === 3 && <ClipboardCheck size={38} className={styles.customIcon} />}
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Industry expertise */}
        <div className={styles.industriesSection}>
          <h3 className={styles.industriesTitle}>{t('industries.title')}</h3>
          <div className={styles.industriesGrid}>
            {industries.map((industry, index) => (
              <div key={index} className={styles.industryCard}>
                <div className={styles.industryIconWrapper}>
                  {industry.icon}
                </div>
                <h4 className={styles.industryName}>{t(industry.nameKey)}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA section */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>{t('cta.title')}</h3>
          <p className={styles.ctaDescription}>
            {t('cta.description')}
          </p>
          <div className={styles.ctaButtons}>
            <Link href={`/${locale}/services`} className={styles.ctaPrimaryButton}>
              {t('cta.primaryButton')}
            </Link>
            <Link href={`/${locale}/contact`} className={styles.ctaSecondaryButton}>
              {t('cta.secondaryButton')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}