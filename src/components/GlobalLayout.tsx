"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, User, Menu, X, ChevronDown, ChevronRight, Home } from "lucide-react";

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Discover", href: "/discover" },
    { label: "Products", href: "/products" },
    { label: "Ingredients", href: "/ingredients" },
    { label: "Skin", href: "/skin" },
    { label: "Hair", href: "/hair" },
    { label: "Body", href: "/body" },
    { label: "Nutrition", href: "/nutrition" },
    { label: "Supplements", href: "/supplements" },
    { label: "Fitness", href: "/fitness" },
    { label: "Science", href: "/science" },
    { label: "AI Coach", href: "/ai-coach" }
  ];

  const megaMenuData: Record<string, { title: string; links: { label: string; href: string }[] }> = {
    Skin: {
      title: "Skincare Encyclopedia",
      links: [
        { label: "Skin Barrier", href: "/science#barrier" },
        { label: "Acne", href: "/skin#acne" },
        { label: "Rosacea", href: "/skin#rosacea" },
        { label: "Hyperpigmentation", href: "/skin#pigmentation" },
        { label: "Anti-Aging", href: "/skin#aging" }
      ]
    },
    Nutrition: {
      title: "Nutrition & Gut Health",
      links: [
        { label: "Calories & Macros", href: "/nutrition#macros" },
        { label: "Protein", href: "/nutrition#protein" },
        { label: "Micronutrients", href: "/nutrition#micros" },
        { label: "Gut Microbiome", href: "/nutrition#gut" }
      ]
    },
    Fitness: {
      title: "Fitness & Optimization",
      links: [
        { label: "Build Muscle", href: "/fitness#muscle" },
        { label: "Lose Fat", href: "/fitness#fat" },
        { label: "Strength Training", href: "/fitness#strength" },
        { label: "Recovery", href: "/fitness#recovery" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D4AF37]/30 selection:text-white flex flex-col">
      
      {/* HEADER */}
      <header 
        className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.08] transition-all"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#101114] to-[#1F2023] text-[#D4AF37] flex items-center justify-center font-bold shadow-[0_4px_20px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight font-mono text-white">
              BeautyOS<span className="text-[#D4AF37]">∞</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-6 text-[11px] font-bold tracking-widest uppercase font-mono">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(megaMenuData[link.label] ? link.label : null)}
              >
                <Link
                  href={link.href}
                  className={`py-6 transition-colors flex items-center gap-1 ${pathname === link.href ? "text-[#D4AF37]" : "text-zinc-400 hover:text-white"}`}
                >
                  {link.label}
                  {megaMenuData[link.label] && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>
                
                {/* Active Indicator */}
                {pathname === link.href && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/dashboard" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
            <button 
              className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer xl:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* MEGA MENU (DESKTOP) */}
        <AnimatePresence>
          {activeMegaMenu && megaMenuData[activeMegaMenu] && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-3xl border-b border-white/[0.08] shadow-2xl z-40 p-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#101114]/50 to-transparent pointer-events-none" />
              <div className="max-w-[1440px] mx-auto grid grid-cols-12 gap-12 relative z-10">
                <div className="col-span-3 border-r border-white/[0.08] pr-8">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-6">{activeMegaMenu} Domain</h4>
                  <h3 className="text-2xl font-bold text-white mb-2">{megaMenuData[activeMegaMenu].title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">Explore our comprehensive scientific guides and expert protocols tailored for {activeMegaMenu.toLowerCase()} optimization.</p>
                  <Link href={`/${activeMegaMenu.toLowerCase()}`} className="text-xs font-bold text-white flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                    Explore All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="col-span-9 grid grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Key Topics</h4>
                    <div className="space-y-3">
                      {megaMenuData[activeMegaMenu].links.map(link => (
                        <Link key={link.label} href={link.href} className="block text-sm text-zinc-300 hover:text-white hover:translate-x-1 transition-all">
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="h-full rounded-[24px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] p-6 relative overflow-hidden group cursor-pointer">
                      <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Featured AI</span>
                          <h4 className="text-lg font-bold text-white mt-2">Personalized {activeMegaMenu} Coach</h4>
                          <p className="text-xs text-zinc-400 mt-2 max-w-sm">Analyze your current protocols and get scientifically-backed recommendations tailored to your unique biology.</p>
                        </div>
                        <div className="flex items-center gap-2 mt-6">
                          <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-black" />
                          </div>
                          <span className="text-xs font-bold text-white">Launch AI Assistant</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0A0A0A] flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-white/[0.08]">
              <span className="text-xl font-bold tracking-tight font-mono text-white">
                BeautyOS<span className="text-[#D4AF37]">∞</span>
              </span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ecosystem..."
                  className="w-full bg-[#101114] border border-white/[0.08] rounded-2xl pl-10 pr-4 py-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <Search className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
              </div>
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xl font-bold text-zinc-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xl font-bold text-[#D4AF37]"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BREADCRUMBS & CONTEXT BAR (Except on Home) */}
      {pathname !== "/" && (
        <div className="bg-[#101114] border-b border-white/[0.05] py-2 px-6">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white flex items-center gap-1">
                <Home className="w-3 h-3" /> Home
              </Link>
              <span>/</span>
              <span className="text-[#D4AF37]">
                {pathname.substring(1).replace("-", " ")}
              </span>
            </div>
            <button onClick={() => window.history.back()} className="hover:text-white">
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full bg-[#0A0A0A]">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#0A0A0A] pt-24 pb-12 px-6">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-6 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#101114] to-[#1F2023] text-[#D4AF37] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight font-mono text-white">
                BeautyOS<span className="text-[#D4AF37]">∞</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The world&apos;s most premium operating system for skin health, beauty, wellness, fitness, nutrition, supplements, longevity, and body optimization.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Ecosystem</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/discover" className="block hover:text-[#D4AF37]">Discover</Link>
              <Link href="/products" className="block hover:text-[#D4AF37]">Products</Link>
              <Link href="/ingredients" className="block hover:text-[#D4AF37]">Ingredients</Link>
              <Link href="/science" className="block hover:text-[#D4AF37]">Science</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Optimization</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/fitness" className="block hover:text-[#D4AF37]">Fitness</Link>
              <Link href="/nutrition" className="block hover:text-[#D4AF37]">Nutrition</Link>
              <Link href="/supplements" className="block hover:text-[#D4AF37]">Supplements</Link>
              <Link href="/body" className="block hover:text-[#D4AF37]">Body</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Demographics</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/men" className="block hover:text-[#D4AF37]">Men&apos;s Grooming</Link>
              <Link href="/women" className="block hover:text-[#D4AF37]">Women&apos;s Health</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Account</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/dashboard" className="block hover:text-[#D4AF37]">Dashboard</Link>
              <Link href="/ai-coach" className="block hover:text-[#D4AF37]">AI Coach</Link>
              <Link href="/progress" className="block hover:text-[#D4AF37]">Progress</Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} BeautyOS Infinity. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
