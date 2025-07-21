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
import styles from "./ServicesSection.module.scss";

const ServicesSection = () => {
  const services = [
    {
      id: 'ai-solutions',
      icon: <Cpu size={32} />,
      name: 'AI Solutions',
      description: 'Transforming business operations with intelligent automation, data analytics, and machine learning solutions tailored for Moroccan enterprises.',
      features: [
        'Natural Language Processing',
        'Predictive Analytics',
        'Computer Vision Systems',
        'AI-powered Decision Support',
      ]
    },
    {
      id: 'enterprise-it',
      icon: <Database size={32} />,
      name: 'Enterprise IT',
      description: 'Comprehensive enterprise IT infrastructure solutions that power modern businesses with scalable, secure, and efficient technology systems.',
      features: [
        'IT Infrastructure Design',
        'System Integration',
        'Enterprise Resource Planning',
        'Legacy System Modernization',
      ]
    },
    {
      id: 'cloud-solutions',
      icon: <Cloud size={32} />,
      name: 'Cloud Solutions',
      description: 'Accelerate your digital transformation with our enterprise-grade cloud solutions designed for scalability, security, and performance.',
      features: [
        'Cloud Migration Strategy',
        'Hybrid Cloud Architecture',
        'Cloud-native Applications',
        'Serverless Computing',
      ]
    },
    {
      id: 'cybersecurity',
      icon: <Shield size={32} />,
      name: 'Cybersecurity',
      description: 'Protect your business with advanced cybersecurity solutions that safeguard your data, infrastructure, and digital assets from evolving threats.',
      features: [
        'Security Assessment',
        'Threat Detection & Response',
        'Data Protection',
        'Compliance Management',
      ]
    },
    {
      id: 'digital-transformation',
      icon: <BarChart3 size={32} />,
      name: 'Digital Transformation',
      description: 'Strategic digital transformation services that help Moroccan businesses innovate, adapt, and thrive in an increasingly digital marketplace.',
      features: [
        'Digital Strategy Consulting',
        'Process Automation',
        'Customer Experience Design',
        'Digital Workforce Enablement',
      ]
    },
    {
      id: 'hardware-solutions',
      icon: <Monitor size={32} />,
      name: 'Hardware Solutions',
      description: 'Enterprise-grade hardware solutions and infrastructure deployments customized to meet the specific needs of your organization.',
      features: [
        'Server Infrastructure',
        'Network Equipment',
        'End-user Computing',
        'IoT Device Management',
      ]
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.container}>
        {/* Decorative elements */}
        <div className={styles.decorPattern}></div>
        <div className={styles.decorCircle1}></div>
        <div className={styles.decorCircle2}></div>
        <div className={styles.decorGradient}></div>
        
        {/* Section header */}
        <div className={styles.sectionHeader}>
          <h6 className={styles.overline}>Our Services</h6>
          <h2 className={styles.heading}>
            Comprehensive <span className={styles.highlight}>IT Solutions</span> for Modern Enterprises
          </h2>
          <p className={styles.subheading}>
            From artificial intelligence to hardware infrastructure, we offer end-to-end technology 
            solutions that empower Moroccan businesses to thrive in the digital era.
          </p>
        </div>
        
        {/* Featured service */}
        <div className={styles.featuredService}>
          <div className={styles.featuredContent}>
            <div className={styles.featuredIconWrapper}>
              <BrainCircuit size={42} className={styles.featuredIcon} />
            </div>
            <h3 className={styles.featuredTitle}>AI Solutions</h3>
            <p className={styles.featuredDescription}>
              Our flagship AI solutions leverage cutting-edge machine learning, natural language processing, and 
              computer vision to solve complex business challenges and unlock new opportunities for growth.
            </p>
            <ul className={styles.featuredFeatures}>
              <li>
                <span className={styles.checkmark}>✓</span>
                Intelligent data analytics and predictive modeling
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                AI-powered process automation
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                Custom machine learning solutions
              </li>
              <li>
                <span className={styles.checkmark}>✓</span>
                Computer vision for quality control and monitoring
              </li>
            </ul>
            <Link href="/services/ai-solutions" className={styles.featuredLink}>
              Learn more about our AI Solutions
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
              <span>Flagship</span>
              Service
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
                <h4 className={styles.serviceName}>{service.name}</h4>
                <p className={styles.serviceDescription}>
                  {service.description}
                </p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <li key={index}>
                      <span className={styles.bullet}>•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.serviceCardFooter}>
                <Link href={`/services/${service.id}`} className={styles.serviceLink}>
                  Explore {service.name}
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Service process */}
        <div className={styles.processSection}>
          <h3 className={styles.processTitle}>Our Service Delivery Approach</h3>
          <div className={styles.processSteps}>
            <div className={styles.processStep}>
              <div className={styles.processStepNumber}>1</div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>Consultation</h4>
                <p className={styles.processStepDescription}>
                  We begin with a comprehensive consultation to understand your business needs, challenges, and objectives.
                </p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processStepNumber}>2</div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>Strategic Planning</h4>
                <p className={styles.processStepDescription}>
                  Our experts develop a tailored strategy and roadmap aligned with your business goals and technology requirements.
                </p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processStepNumber}>3</div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>Implementation</h4>
                <p className={styles.processStepDescription}>
                  Our technical team delivers the solution with precision, ensuring minimal disruption to your operations.
                </p>
              </div>
            </div>
            <div className={styles.processStep}>
              <div className={styles.processStepNumber}>4</div>
              <div className={styles.processStepContent}>
                <h4 className={styles.processStepTitle}>Ongoing Support</h4>
                <p className={styles.processStepDescription}>
                  We provide continuous monitoring, maintenance, and optimization to ensure lasting success.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customized solutions */}
        <div className={styles.customSection}>
          <div className={styles.customContent}>
            <h3 className={styles.customTitle}>Need a Customized Solution?</h3>
            <p className={styles.customDescription}>
              Every business is unique. Our team of experts will work with you to develop 
              tailored technology solutions that address your specific challenges and goals.
            </p>
            <Link href="/contact" className={styles.customButton}>
              Schedule a Consultation
            </Link>
          </div>
          <div className={styles.customIconGrid}>
            <div className={styles.customIconWrapper}>
              <Settings size={38} className={styles.customIcon} />
              <span>Custom Development</span>
            </div>
            <div className={styles.customIconWrapper}>
              <Users size={38} className={styles.customIcon} />
              <span>Expert Consultation</span>
            </div>
            <div className={styles.customIconWrapper}>
              <Lock size={38} className={styles.customIcon} />
              <span>Secure Implementation</span>
            </div>
            <div className={styles.customIconWrapper}>
              <ClipboardCheck size={38} className={styles.customIcon} />
              <span>Ongoing Support</span>
            </div>
          </div>
        </div>
        
        {/* Industry expertise */}
        <div className={styles.industriesSection}>
          <h3 className={styles.industriesTitle}>Industries We Serve</h3>
          <div className={styles.industriesGrid}>
            {[
              { name: 'Finance', icon: <LayoutGrid size={28} /> },
              { name: 'Healthcare', icon: <Shield size={28} /> },
              { name: 'Manufacturing', icon: <Settings size={28} /> },
              { name: 'Retail', icon: <ShoppingBag size={28} /> },
              { name: 'Education', icon: <GraduationCap size={28} /> },
              { name: 'Government', icon: <Building size={28} /> },
            ].map((industry, index) => (
              <div key={index} className={styles.industryCard}>
                <div className={styles.industryIconWrapper}>
                  {industry.icon}
                </div>
                <h4 className={styles.industryName}>{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA section */}
        <div className={styles.ctaSection}>
          <h3 className={styles.ctaTitle}>Ready to transform your business?</h3>
          <p className={styles.ctaDescription}>
            Let's discuss how our services can help your organization thrive in the digital age.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/services" className={styles.ctaPrimaryButton}>
              View All Services
            </Link>
            <Link href="/contact" className={styles.ctaSecondaryButton}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;