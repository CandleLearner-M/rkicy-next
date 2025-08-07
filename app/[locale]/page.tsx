import AboutPreview from "@/components/AboutPreview";
import ContactPreview from "@/components/ContactPreview";
import Hero from "@/components/Hero";
import DesktopHero from "@/components/Hero/DesktopHero";
import PartnersPreview from "@/components/PartnersPreview";
import ServicesPreview from "@/components/ServicesPreview/ServicesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <main>
      <DesktopHero />
      <AboutPreview />
      <ServicesPreview />
      <PartnersPreview />
      <TestimonialsSection />
      <ContactPreview />
    </main>
  );
}