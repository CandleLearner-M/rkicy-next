  // This file defines the projects data structure used across the site
  import { Calendar, CheckCircle, CreditCard, Globe, Shield, ShoppingBag, Users, Wallet, Zap } from 'lucide-react';
  import { JSX } from 'react';

  export interface Project {
    id: string;
    titleKey: string;
    descriptionKey: string;
    detailedDescriptionKey?: string;
    image: string;
    categoryKey: string;
    category: string; // For filtering
    technologies: string[];
    stats: {
      icon: JSX.Element;
      valueKey: string;
      labelKey: string;
    }[];
    slug: string;
    logo?: string;
    client?: string;
    duration?: string;
    year: number;
    featured?: boolean;
    status: 'completed' | 'ongoing' | 'upcoming';
    industry?: string;
    teamSize?: number;
    gallery?: string[];
    testimonial?: {
      quoteKey: string;
      authorKey: string;
      roleKey: string;
    };
    challenges?: string[];
    solutions?: string[];
    outcomes?: string[];
  }

  export const projects: Project[] = [
    {
      id: "paycov",
      titleKey: 'featured.projects.paycov.title',
      descriptionKey: 'featured.projects.paycov.description',
      detailedDescriptionKey: 'featured.projects.paycov.detailedDescription',
      image: "/projects/paycov/cover.png",
      categoryKey: 'featured.projects.paycov.category',
      category: "fintech",
      technologies: ["Node.js", "PostgreSQL", "React Native", "Mobile"],
      stats: [
        { icon: <Shield size={18} />, valueKey: 'featured.projects.paycov.stats.security.value', labelKey: 'featured.projects.paycov.stats.security.label' },
        { icon: <Globe size={18} />, valueKey: 'featured.projects.paycov.stats.channels.value', labelKey: 'featured.projects.paycov.stats.channels.label' },
        { icon: <Wallet size={18} />, valueKey: 'featured.projects.paycov.stats.banks.value', labelKey: 'featured.projects.paycov.stats.banks.label' }
      ],
      slug: "https://www.paycov.com/",
      logo: '/projects/paycov-logo.png',
      client: "PayCov Inc.",
      duration: "8 months",
      year: 2023,
      featured: true,
      status: 'completed',
      industry: "Financial Services",
      teamSize: 6,
      gallery: [
        "/projects/paycov/screen1.png",
        "/projects/paycov/screen2.png",
        "/projects/paycov/screen3.png"
      ],
      testimonial: {
        quoteKey: 'featured.projects.paycov.testimonial.quote',
        authorKey: 'featured.projects.paycov.testimonial.author',
        roleKey: 'featured.projects.paycov.testimonial.role'
      },
      challenges: [
        "featured.projects.paycov.challenges.1",
        "featured.projects.paycov.challenges.2",
        "featured.projects.paycov.challenges.3"
      ],
      solutions: [
        "featured.projects.paycov.solutions.1",
        "featured.projects.paycov.solutions.2",
        "featured.projects.paycov.solutions.3"
      ],
      outcomes: [
        "featured.projects.paycov.outcomes.1",
        "featured.projects.paycov.outcomes.2",
        "featured.projects.paycov.outcomes.3"
      ]
    },
    {
      id: "nounours-ma",
      titleKey: 'featured.projects.nounours.title',
      descriptionKey: 'featured.projects.nounours.description',
      detailedDescriptionKey: 'featured.projects.nounours.detailedDescription',
      image: "/projects/nounours/cover.png",
      categoryKey: 'featured.projects.nounours.category',
      category: "ecommerce",
      technologies: ["Shopify", "Web Development", "Payment Integration", "Inventory Management"],
      stats: [
        { icon: <ShoppingBag size={18} />, valueKey: 'featured.projects.nounours.stats.collections.value', labelKey: 'featured.projects.nounours.stats.collections.label' },
        { icon: <Users size={18} />, valueKey: 'featured.projects.nounours.stats.market.value', labelKey: 'featured.projects.nounours.stats.market.label' },
        { icon: <CreditCard size={18} />, valueKey: 'featured.projects.nounours.stats.payment.value', labelKey: 'featured.projects.nounours.stats.payment.label' }
      ],
      slug: "https://nounours.ma/",
      logo: '/projects/nounours.png',
      client: "Nounours Morocco",
      duration: "3 months",
      year: 2024,
      featured: true,
      status: 'completed',
      industry: "Retail & E-commerce",
      teamSize: 4,
      gallery: [
        "/projects/nounours/product.png",
        "/projects/nounours/checkout.png",
        "/projects/nounours/mobile.png"
      ],
      testimonial: {
        quoteKey: 'featured.projects.nounours.testimonial.quote',
        authorKey: 'featured.projects.nounours.testimonial.author',
        roleKey: 'featured.projects.nounours.testimonial.role'
      },
      challenges: [
        "featured.projects.nounours.challenges.1",
        "featured.projects.nounours.challenges.2",
        "featured.projects.nounours.challenges.3"
      ],
      solutions: [
        "featured.projects.nounours.solutions.1",
        "featured.projects.nounours.solutions.2",
        "featured.projects.nounours.solutions.3"
      ],
      outcomes: [
        "featured.projects.nounours.outcomes.1",
        "featured.projects.nounours.outcomes.2",
        "featured.projects.nounours.outcomes.3"
      ]
    },
    {
      id: "finish3",
      titleKey: 'featured.projects.finish3.title',
      descriptionKey: 'featured.projects.finish3.description',
      detailedDescriptionKey: 'featured.projects.finish3.detailedDescription',
      image: "/projects/finish3/cover.png",
      categoryKey: 'featured.projects.finish3.category',
      category: "productivity",
      technologies: ["React", "Node.js", "Firebase", "Mobile"],
      stats: [
        { icon: <CheckCircle size={18} />, valueKey: 'featured.projects.finish3.stats.tasks.value', labelKey: 'featured.projects.finish3.stats.tasks.label' },
        { icon: <Zap size={18} />, valueKey: 'featured.projects.finish3.stats.sync.value', labelKey: 'featured.projects.finish3.stats.sync.label' },
        { icon: <Calendar size={18} />, valueKey: 'featured.projects.finish3.stats.rollover.value', labelKey: 'featured.projects.finish3.stats.rollover.label' }
      ],
      slug: "/projects/finish3",
      logo: '/projects/finish3.png',
      client: "Finish3 App",
      duration: "6 months",
      year: 2023,
      featured: false,
      status: 'ongoing',
      industry: "Productivity Software",
      teamSize: 5,
      gallery: [
        "/projects/finish3/dashboard.png",
        "/projects/finish3/tasks.png",
        "/projects/finish3/analytics.png"
      ],
      challenges: [
        "featured.projects.finish3.challenges.1",
        "featured.projects.finish3.challenges.2",
        "featured.projects.finish3.challenges.3"
      ],
      solutions: [
        "featured.projects.finish3.solutions.1",
        "featured.projects.finish3.solutions.2",
        "featured.projects.finish3.solutions.3"
      ],
      outcomes: [
        "featured.projects.finish3.outcomes.1",
        "featured.projects.finish3.outcomes.2",
        "featured.projects.finish3.outcomes.3"
      ]
    }
  ];