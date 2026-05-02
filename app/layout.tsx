import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import BackgroundGrid from "@/components/BackgroundGrid";
import LiveTicker from "@/components/LiveTicker";

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

export const metadata: Metadata = {
  title: "Argos Labs — All-in-One AI Execution Platform",
  description:
    "Agents · Cloud · Growth · BlockChain. The platform behind execution.",
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
      <body className="relative min-h-dvh">
        <BackgroundGrid />
        {children}
        <LiveTicker />
      </body>
    </html>
  );
}
