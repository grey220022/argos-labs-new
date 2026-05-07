import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundGrid from "@/components/BackgroundGrid";
import LiveTicker from "@/components/LiveTicker";
import ScrollProgress from "@/components/ScrollProgress";
import CTAFeedback from "@/components/CTAFeedback";

const dinish = localFont({
  src: "./fonts/DINish-VF.woff2",
  variable: "--font-din",
  display: "swap",
  weight: "100 900",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL = "https://argos-labs-wine.vercel.app";
const SITE_NAME = "Argos Labs";
const SITE_DESCRIPTION =
  "Agents · Cloud · Growth · BlockChain. The platform behind execution.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Argos Labs — All-in-One AI Execution Platform",
  description: SITE_DESCRIPTION,
  // Stop WeChat / iOS Safari from auto-linkifying numbers like "100+", "99.99%"
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Argos Labs — All-in-One AI Execution Platform",
    description: SITE_DESCRIPTION,
    // app/opengraph-image.tsx is auto-picked up by Next.js for the / route
  },
  twitter: {
    card: "summary_large_image",
    title: "Argos Labs — All-in-One AI Execution Platform",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dinish.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="relative min-h-screen [@supports(min-height:100dvh)]:min-h-dvh">
        <ScrollProgress />
        <BackgroundGrid />
        {children}
        <LiveTicker />
        <CTAFeedback />
      </body>
    </html>
  );
}
