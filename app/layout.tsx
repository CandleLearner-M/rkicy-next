import { Analytics } from "@vercel/analytics/react";
import { Outfit } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "@/theme/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedBackground from "@/components/FixedBackground";
import NextTopLoader from "nextjs-toploader";
import AiChatAssistant from "@/components/AiChatAssistant";
import MobileNavigation from "@/components/MobileNavigation";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.variable}>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <NextTopLoader showSpinner={false} />
          <Navbar />
          <FixedBackground />
          {children}
          {/* <AiChatAssistant /> */}
          <MobileNavigation />
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}