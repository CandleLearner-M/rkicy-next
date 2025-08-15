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
import VisionMission from "@/components/AboutPage/VisionMission";
import CompanyOverview from "@/components/AboutPage/CompanyOverview";
import SectionBackground from "@/components/Layout/SectionBackground/SectionBackground";

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


export default function AboutPage() {
  const [selectedLeader, setSelectedLeader] = useState<number | null>(null);
  const [videoModal, setVideoModal] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const t = useTranslations('about');

  // Team data with translation keys
  
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

      <CompanyOverview />
      <ContactPreview />

      <SectionBackground style="subtle" >
              {/* <ServicesPreview /> */}
      </SectionBackground>
    </main>
  );
}