import AboutPreview from "@/components/Home/AboutPreview";
import ContactPreview from "@/components/Home/ContactPreview";
import Hero from "@/components/Home/Hero";
import PartnersPreview from "@/components/Home/PartnersPreview";
import ProjectsSection from "@/components/Home/ProjectsSection";
import SectionBackground from "@/components/Layout/SectionBackground/SectionBackground";
import ServicesPreview from "@/components/Home/ServicesPreview/ServicesPreview";
import TestimonialsSection from "@/components/Home/TestimonialsSection";


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