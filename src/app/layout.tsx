import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { HealthOSProvider } from "../context/HealthOSContext";
import { GlobalLayout } from "../components/GlobalLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://health.cristianvaduva.com"),
  title: {
    template: "%s | HealthOS∞",
    default: "HealthOS∞ – Complete Digital Health, Longevity & Performance Platform",
  },
  description: "The world's leading operating system for skin health, longevity, fitness, nutrition, supplements, recovery, hormones, and body optimization. Engineered for both women and men.",
  keywords: [
    "health platform",
    "longevity",
    "fitness",
    "nutrition",
    "supplements",
    "skincare",
    "biohacking",
    "recovery",
    "hormones",
    "health optimization"
  ],
  authors: [{ name: "HealthOS Science & Clinical Board" }],
  creator: "HealthOS",
  publisher: "HealthOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "HealthOS∞ – Complete Digital Health Ecosystem",
    description: "Clinical-grade protocols for skin health, cellular longevity, fitness, and human optimization.",
    url: "https://health.cristianvaduva.com",
    siteName: "HealthOS",
    images: [
      {
        url: "/images/healthos_hero_products_1784918027747.png",
        width: 1200,
        height: 630,
        alt: "HealthOS Platform Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthOS∞ – Human Health & Longevity Platform",
    description: "The complete ecosystem for skincare, fitness, nutrition, supplements, and biohacking.",
    images: ["/images/healthos_hero_products_1784918027747.png"],
    creator: "@healthos",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "HealthOS",
  url: "https://health.cristianvaduva.com",
  logo: "https://health.cristianvaduva.com/favicon.ico",
  description: "The world's leading operating system for skin health, longevity, fitness, nutrition, supplements, recovery, hormones, and body optimization.",
  sameAs: [
    "https://twitter.com/healthos",
    "https://instagram.com/healthos"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-[#0A0A0A]">
      <body className={`${inter.variable} font-sans h-full antialiased bg-[#0A0A0A] text-white selection:bg-emerald-500/30 selection:text-white`}>
        <HealthOSProvider>
          <GlobalLayout>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
          </GlobalLayout>
        </HealthOSProvider>
      </body>
    </html>
  );
}
