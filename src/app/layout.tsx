import type { Metadata } from "next";
import { BeautyOSProvider } from "../context/BeautyOSContext";
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
    <html lang="ro" className="h-full bg-black">
      <body className="h-full overflow-hidden antialiased bg-black text-zinc-100 selection:bg-amber-500/30 selection:text-white">
        <BeautyOSProvider>
          {children}
        </BeautyOSProvider>
      </body>
    </html>
  );
}
