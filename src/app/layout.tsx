import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AiXHealthProvider } from "../context/HealthOSContext";
import { GlobalLayout } from "../components/GlobalLayout";
import { VisitorTracker } from "../components/VisitorTracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aixhealth.cristianvaduva.com"),
  title: {
    template: "%s | AiX Health",
    default: "AiX Health – Premium Digital Health Education & Intelligence",
  },
  description: "AiX Health provides premium education on skin health, longevity, fitness, nutrition, supplements, and body optimization.",
  keywords: [
    "health education",
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
  authors: [{ name: "AiX Health Science & Research Board" }],
  creator: "AiX Health",
  publisher: "AiX Health",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "AiX Health – Premium Digital Health Education & Intelligence",
    description: "Educational platform for skin health, longevity, fitness, nutrition, supplements, and human optimization.",
    url: "https://aixhealth.cristianvaduva.com",
    siteName: "AiX Health",
    images: [
      {
        url: "/images/healthos_hero_products_1784918027747.png",
        width: 1200,
        height: 630,
        alt: "AiX Health Platform Overview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AiX Health – Premium Digital Health Education & Intelligence",
    description: "The complete ecosystem for skincare, fitness, nutrition, supplements, and biohacking.",
    images: ["/images/healthos_hero_products_1784918027747.png"],
    creator: "@aixhealth",
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
  name: "AiX Health",
  url: "https://aixhealth.cristianvaduva.com",
  logo: "https://aixhealth.cristianvaduva.com/favicon.ico",
  description: "AiX Health provides premium education on skin health, longevity, fitness, nutrition, supplements, and body optimization.",
  sameAs: [
    "https://twitter.com/aixhealth",
    "https://instagram.com/aixhealth"
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
        <AiXHealthProvider>
          <VisitorTracker />
          <GlobalLayout>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
          </GlobalLayout>
        </AiXHealthProvider>
      </body>
    </html>
  );
}
