import AboutPreview from "@/components/AboutPreview";
import ContactPreview from "@/components/ContactPreview";
import Hero from "@/components/Hero";
import MobileHero from "@/components/Hero/MobileHero";
import PartnersPreview from "@/components/PartnersPreview";
import SectionBackground from "@/components/SectionBackground/SectionBackground";
import ServicesPreview from "@/components/ServicesPreview/ServicesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";


export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <MobileHero />

      <AboutPreview />

      <SectionBackground style="subtle" >
        <ServicesPreview />
      </SectionBackground>

      <PartnersPreview />

      <TestimonialsSection />
      <ContactPreview />
    </main>
  );
}