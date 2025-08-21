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
    externalUrl?: string; // For live project links
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
        { icon: <Shield size={18} />, valueKey: 'paycov.stats.security.value', labelKey: 'paycov.stats.security.label' },
        { icon: <Globe size={18} />, valueKey: 'paycov.stats.channels.value', labelKey: 'paycov.stats.channels.label' },
        { icon: <Wallet size={18} />, valueKey: 'paycov.stats.banks.value', labelKey: 'paycov.stats.banks.label' }
      ],
      slug: "/projects/paycov",
      externalUrl: "https://www.paycov.com/",
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
        quoteKey: 'paycov.testimonial.quote',
        authorKey: 'paycov.testimonial.author',
        roleKey: 'paycov.testimonial.role'
      },
      challenges: [
        "paycov.challenges.1",
        "paycov.challenges.2",
        "paycov.challenges.3"
      ],
      solutions: [
        "paycov.solutions.1",
        "paycov.solutions.2",
        "paycov.solutions.3"
      ],
      outcomes: [
        "paycov.outcomes.1",
        "paycov.outcomes.2",
        "paycov.outcomes.3"
      ]
    },
    {
      id: "nounours",
      titleKey: 'featured.projects.nounours.title',
      descriptionKey: 'featured.projects.nounours.description',
      detailedDescriptionKey: 'featured.projects.nounours.detailedDescription',
      image: "/projects/nounours/cover.png",
      categoryKey: 'featured.projects.nounours.category',
      category: "ecommerce",
      technologies: ["Shopify", "Web Development", "Payment Integration", "Inventory Management"],
      stats: [
        { icon: <ShoppingBag size={18} />, valueKey: 'nounours.stats.collections.value', labelKey: 'nounours.stats.collections.label' },
        { icon: <Users size={18} />, valueKey: 'nounours.stats.market.value', labelKey: 'nounours.stats.market.label' },
        { icon: <CreditCard size={18} />, valueKey: 'nounours.stats.payment.value', labelKey: 'nounours.stats.payment.label' }
      ],
      slug: "/projects/nounours",
      externalUrl: "https://nounours.ma/",
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
        quoteKey: 'nounours.testimonial.quote',
        authorKey: 'nounours.testimonial.author',
        roleKey: 'nounours.testimonial.role'
      },
      challenges: [
        "nounours.challenges.1",
        "nounours.challenges.2",
        "nounours.challenges.3"
      ],
      solutions: [
        "nounours.solutions.1",
        "nounours.solutions.2",
        "nounours.solutions.3"
      ],
      outcomes: [
        "nounours.outcomes.1",
        "nounours.outcomes.2",
        "nounours.outcomes.3"
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
        { icon: <CheckCircle size={18} />, valueKey: 'finish3.stats.tasks.value', labelKey: 'finish3.stats.tasks.label' },
        { icon: <Zap size={18} />, valueKey: 'finish3.stats.sync.value', labelKey: 'finish3.stats.sync.label' },
        { icon: <Calendar size={18} />, valueKey: 'finish3.stats.rollover.value', labelKey: 'finish3.stats.rollover.label' }
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
        "finish3.challenges.1",
        "finish3.challenges.2",
        "finish3.challenges.3"
      ],
      solutions: [
        "finish3.solutions.1",
        "finish3.solutions.2",
        "finish3.solutions.3"
      ],
      outcomes: [
        "finish3.outcomes.1",
        "finish3.outcomes.2",
        "finish3.outcomes.3"
      ]
    }
  ];