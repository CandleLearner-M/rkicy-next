import AboutPreview from "@/components/HomePage/AboutPreview";
import ContactPreview from "@/components/HomePage/ContactPreview";
import Hero from "@/components/HomePage/Hero";
import PartnersPreview from "@/components/HomePage/PartnersPreview";
import ProjectsSection from "@/components/HomePage/ProjectsSection";
import SectionBackground from "@/components/Layout/SectionBackground/SectionBackground";
import ServicesPreview from "@/components/HomePage/ServicesPreview/ServicesPreview";
import TestimonialsSection from "@/components/HomePage/TestimonialsSection";


export default function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />

      <SectionBackground style="subtle" >
        <ServicesPreview />
      </SectionBackground>

      <PartnersPreview />
      <SectionBackground style="subtle" >
        <ProjectsSection />
      </SectionBackground>

      <TestimonialsSection />
      <ContactPreview />
    </main>
  );
}