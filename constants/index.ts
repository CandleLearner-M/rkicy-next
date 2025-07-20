import { NavItem, ServiceType } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { title: "About", href: "/about" },
  { title: "Services", href: "/services" },
  { title: "Partners", href: "/partners" },
  { title: "Testimonials", href: "/testimonials" },
  { title: "Contact", href: "/contact" },
];

export const SERVICES: ServiceType[] = [
  {
    title: "AI Solutions",
    description: "Enterprise-grade AI solutions to transform your business operations.",
    icon: "brain-circuit",
  },
  {
    title: "Hardware Infrastructure",
    description: "Robust hardware solutions for modern enterprise needs.",
    icon: "server",
  },
  {
    title: "IT Consulting",
    description: "Expert guidance to navigate digital transformation.",
    icon: "lightbulb",
  },
];