import { Analytics } from "@vercel/analytics/react";
import { Outfit } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "@/theme/ThemeProvider";
import Footer from "@/components/Footer";
import FixedBackground from "@/components/FixedBackground";
import NextTopLoader from "nextjs-toploader";
import AiChatAssistant from "@/components/AiChatAssistant";
import MobileNavigation from "@/components/MobileNavigation";
import HeroNav from "@/components/Navbar/HeroNav";
import Navbar from "@/components/Navbar";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { SpeedInsights } from "@vercel/speed-insights/next";
import UnifiedNavbar from "@/components/Navbar/UnifiedNavbar";
import CookieConsent from "@/components/CookieConsent/CookieConsent";


const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const metadata = {
  title: "Rkicy Technology | Empowering Morocco's Digital Future",
  description:
    "From AI to hardware, Rkicy Technology delivers powerful, enterprise-grade IT solutions for modern businesses.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
 
  return (
    <html lang={locale} suppressHydrationWarning >
      <body className={outfit.variable}>
        <NextIntlClientProvider>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <NextTopLoader showSpinner={false} />
            <CookieConsent />
            <UnifiedNavbar />
            <FixedBackground />
            {children}
            {/* <AiChatAssistant /> */}
            <MobileNavigation />
            <Footer />
            <Analytics />
            <SpeedInsights />             
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


