import type { Metadata } from "next";
import { BeautyOSProvider } from "../context/BeautyOSContext";
import { GlobalLayout } from "../components/GlobalLayout";
import "./globals.css";
export const metadata: Metadata = {
  title: "BeautyOS™ – Skincare Intelligence System",
  description: "Advanced skincare diagnostics, ingredients fit score metrics, progress photo capture, and daily routine management inspired by Oura & Apple Health.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en" className="h-full bg-[#0A0A0A]">
      <body className="h-full antialiased bg-[#0A0A0A] text-white selection:bg-[#D4AF37]/30 selection:text-white">
        <BeautyOSProvider>
          <GlobalLayout>
            {children}
          </GlobalLayout>
        </BeautyOSProvider>
      </body>
    </html>
  );
}
