import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BeautyOSProvider } from "../context/BeautyOSContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
import { GlobalLayout } from "../components/GlobalLayout";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://beautyos.com"),
  title: {
    template: "%s | BeautyOS Infinity",
    default: "BeautyOS Infinity – The World's Best Skincare & Longevity Platform",
  },
  description: "The world's most premium operating system for skin health, beauty, wellness, fitness, nutrition, supplements, longevity, and body optimization. Inspired by the clinical rigor of Oura, WHOOP, and Apple Health.",
  keywords: ["skincare", "longevity", "wellness", "fitness", "supplements", "beauty tech", "health optimization"],
  authors: [{ name: "BeautyOS Clinical Board" }],
  creator: "BeautyOS",
  publisher: "BeautyOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "BeautyOS Infinity – Optimize Your Biology",
    description: "Clinical-grade protocols for skin health, longevity, and metabolic fitness.",
    url: "https://beautyos.com",
    siteName: "BeautyOS Infinity",
    images: [
      {
        url: "/images/beautyos_hero_products_1784918027747.png",
        width: 1200,
        height: 630,
        alt: "BeautyOS Infinity Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeautyOS Infinity",
    description: "The World's Best Skincare & Longevity Platform.",
    images: ["/images/beautyos_hero_products_1784918027747.png"],
    creator: "@beautyos",
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
  name: "BeautyOS",
  url: "https://beautyos.com",
  logo: "https://beautyos.com/favicon.ico",
  description: "The world's most premium operating system for skin health, beauty, wellness, fitness, nutrition, supplements, longevity, and body optimization.",
  sameAs: [
    "https://twitter.com/beautyos",
    "https://instagram.com/beautyos"
  ]
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en" className="h-full bg-[#0A0A0A]">
      <body className={`${inter.variable} font-sans h-full antialiased bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 selection:text-white`}>
        <BeautyOSProvider>
          <GlobalLayout>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
          </GlobalLayout>
        </BeautyOSProvider>
      </body>
    </html>
  );
}
