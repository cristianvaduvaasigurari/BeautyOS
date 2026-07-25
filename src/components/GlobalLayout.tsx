"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, User, Menu, X, ChevronDown, ChevronRight, Home, ShoppingBag, LayoutDashboard } from "lucide-react";
import { FloatingActionButton } from "./FloatingActionButton";
import { NewsletterBlock } from "./NewsletterBlock";

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const navLinks = [
    { label: "Skin", href: "/skin" },
    { label: "Hair", href: "/hair" },
    { label: "Body", href: "/body" },
    { label: "Fitness", href: "/fitness" },
    { label: "Nutrition", href: "/nutrition" },
    { label: "Supplements", href: "/supplements" },
    { label: "Longevity", href: "/longevity" },
    { label: "Science", href: "/science" },
    { label: "Guides", href: "/guides" },
    { label: "Community", href: "/community" }
  ];

  const megaMenuData: Record<string, { title: string; subtitle: string; columns: { title: string; links: { label: string; href: string }[] }[] }> = {
    Skin: {
      title: "Skincare Encyclopedia",
      subtitle: "Medical-grade protocols for biological youth.",
      columns: [
        {
          title: "Top Concerns",
          links: [
            { label: "Acne", href: "/skin/acne" },
            { label: "Rosacea", href: "/skin/rosacea" },
            { label: "Dry Skin", href: "/skin/dry-skin" },
            { label: "Oily Skin", href: "/skin/oily-skin" },
            { label: "Sensitive Skin", href: "/skin/sensitive-skin" },
            { label: "Combination Skin", href: "/skin/combination-skin" },
            { label: "Anti Aging", href: "/skin/anti-aging" },
            { label: "Pigmentation", href: "/skin/pigmentation" },
            { label: "Barrier Repair", href: "/skin/barrier-repair" },
            { label: "Sun Damage", href: "/skin/sun-damage" }
          ]
        },
        {
          title: "Key Ingredients",
          links: [
            { label: "Retinol Guide", href: "/ingredients/retinol" },
            { label: "Vitamin C Guide", href: "/ingredients/vitamin-c" },
            { label: "Ceramides", href: "/ingredients/ceramides" },
            { label: "Niacinamide", href: "/ingredients/niacinamide" },
            { label: "Azelaic Acid", href: "/ingredients/azelaic-acid" },
            { label: "Peptides", href: "/ingredients/peptides" },
            { label: "Hyaluronic Acid", href: "/ingredients/hyaluronic-acid" },
            { label: "SPF Guide", href: "/ingredients/spf" }
          ]
        }
      ]
    },
    Hair: {
      title: "Hair & Scalp Science",
      subtitle: "Molecular repair and follicle optimization.",
      columns: [
        {
          title: "Hair Concerns",
          links: [
            { label: "Hair Loss", href: "/hair/hair-loss" },
            { label: "Hair Growth", href: "/hair/hair-growth" },
            { label: "Scalp Health", href: "/hair/scalp" },
            { label: "Dandruff", href: "/hair/dandruff" }
          ]
        },
        {
          title: "Hair Types",
          links: [
            { label: "Curly Hair", href: "/hair/curly" },
            { label: "Straight Hair", href: "/hair/straight" },
            { label: "Hair Oils", href: "/hair/oils" }
          ]
        }
      ]
    },
    Body: {
      title: "Body Optimization",
      subtitle: "Total physical restoration and maintenance.",
      columns: [
        {
          title: "Body Care",
          links: [
            { label: "Stretch Marks", href: "/body/stretch-marks" },
            { label: "Cellulite", href: "/body/cellulite" },
            { label: "Hydration", href: "/body/hydration" },
            { label: "General Body Care", href: "/body/care" },
            { label: "Hands", href: "/body/hands" },
            { label: "Feet", href: "/body/feet" }
          ]
        }
      ]
    },
    Fitness: {
      title: "Fitness & Performance",
      subtitle: "Protocols for progressive overload and metabolic health.",
      columns: [
        {
          title: "Training Goals",
          links: [
            { label: "Build Muscle", href: "/fitness/build-muscle" },
            { label: "Lose Fat", href: "/fitness/lose-fat" },
            { label: "Strength", href: "/fitness/strength" },
            { label: "Hypertrophy", href: "/fitness/hypertrophy" }
          ]
        },
        {
          title: "Cardio & Recovery",
          links: [
            { label: "Running", href: "/fitness/running" },
            { label: "HIIT", href: "/fitness/hiit" },
            { label: "Recovery", href: "/fitness/recovery" },
            { label: "Mobility", href: "/fitness/mobility" },
            { label: "Cardio Base", href: "/fitness/cardio" }
          ]
        }
      ]
    },
    Nutrition: {
      title: "Clinical Nutrition",
      subtitle: "Fueling metabolic flexibility and gut health.",
      columns: [
        {
          title: "Macronutrients",
          links: [
            { label: "Calories", href: "/nutrition/calories" },
            { label: "Protein", href: "/nutrition/protein" },
            { label: "Carbohydrates", href: "/nutrition/carbs" },
            { label: "Fats", href: "/nutrition/fats" }
          ]
        },
        {
          title: "Diet & Wellness",
          links: [
            { label: "Meal Plans", href: "/nutrition/meal-plans" },
            { label: "Healthy Recipes", href: "/nutrition/recipes" },
            { label: "Hydration", href: "/nutrition/hydration" },
            { label: "Micronutrients", href: "/nutrition/micronutrients" }
          ]
        }
      ]
    },
    Supplements: {
      title: "Supplement Ecosystem",
      subtitle: "Evidence-based protocols for biological enhancement.",
      columns: [
        {
          title: "Core Stack",
          links: [
            { label: "Protein", href: "/supplements/protein" },
            { label: "Creatine", href: "/supplements/creatine" },
            { label: "Omega 3", href: "/supplements/omega-3" },
            { label: "Vitamin D", href: "/supplements/vitamin-d" },
            { label: "Magnesium", href: "/supplements/magnesium" },
            { label: "Electrolytes", href: "/supplements/electrolytes" }
          ]
        },
        {
          title: "Advanced Stack",
          links: [
            { label: "Collagen", href: "/supplements/collagen" },
            { label: "Ashwagandha", href: "/supplements/ashwagandha" },
            { label: "Pre Workout", href: "/supplements/pre-workout" },
            { label: "Post Workout", href: "/supplements/post-workout" },
            { label: "Fiber", href: "/supplements/fiber" },
            { label: "Probiotics", href: "/supplements/probiotics" }
          ]
        }
      ]
    },
    Longevity: {
      title: "Longevity & Anti-Aging",
      subtitle: "Strategies for healthspan extension.",
      columns: [
        {
          title: "Metrics & Markers",
          links: [
            { label: "Blood Sugar", href: "/longevity/blood-sugar" },
            { label: "VO2 Max", href: "/longevity/vo2-max" },
            { label: "Heart Health", href: "/longevity/heart-health" },
            { label: "Hormones", href: "/longevity/hormones" }
          ]
        },
        {
          title: "Lifestyle Protocols",
          links: [
            { label: "Sleep", href: "/longevity/sleep" },
            { label: "Stress Management", href: "/longevity/stress" },
            { label: "Healthy Aging", href: "/longevity/healthy-aging" },
            { label: "Recovery", href: "/longevity/recovery" }
          ]
        }
      ]
    },
    Science: {
      title: "Scientific Research",
      subtitle: "The clinical evidence behind BeautyOS.",
      columns: [
        {
          title: "Databases",
          links: [
            { label: "Clinical Studies", href: "/science/clinical-studies" },
            { label: "Ingredient Database", href: "/science/ingredients" },
            { label: "EWG Ratings", href: "/science/ewg" },
            { label: "INCI Decoder", href: "/science/inci" },
            { label: "Research", href: "/science/research" },
            { label: "PubMed Index", href: "/science/pubmed" }
          ]
        }
      ]
    },
    Guides: {
      title: "Premium Guides",
      subtitle: "Step-by-step blueprints for optimization.",
      columns: [
        {
          title: "Routines",
          links: [
            { label: "Morning Routine", href: "/guides/morning-routine" },
            { label: "Night Routine", href: "/guides/night-routine" },
            { label: "Build Muscle", href: "/guides/build-muscle" },
            { label: "Lose Fat", href: "/guides/lose-fat" }
          ]
        },
        {
          title: "Demographics",
          links: [
            { label: "Healthy Skin", href: "/guides/healthy-skin" },
            { label: "Supplement Guide", href: "/guides/supplements" },
            { label: "Women's Health", href: "/guides/women" },
            { label: "Men's Health", href: "/guides/men" },
            { label: "Teen Skincare", href: "/guides/teens" }
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-[#D4AF37]/30 selection:text-white flex flex-col">
      
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0A0A0A] text-white text-[11px] font-mono py-2.5 px-6 text-center border-b border-white/[0.08] flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] uppercase tracking-wider">BeautyOS Infinity</span>
        <span>The World&apos;s Best Beauty, Skincare, Wellness & Longevity Platform</span>
        <Link href="/dashboard" className="underline text-[#E5C158] hover:text-white cursor-pointer ml-2">
          Start Journey →
        </Link>
      </div>

      {/* HEADER */}
      <header 
        className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-2xl border-b border-white/[0.08] transition-all"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#101114] to-[#1F2023] text-[#D4AF37] flex items-center justify-center font-bold shadow-[0_4px_20px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight font-mono text-white">
              BeautyOS<span className="text-[#D4AF37]">∞</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase font-mono">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(megaMenuData[link.label] ? link.label : null)}
              >
                <Link
                  href={link.href}
                  className={`py-6 transition-colors flex items-center gap-1 ${pathname.startsWith(link.href) ? "text-[#D4AF37]" : "text-zinc-400 hover:text-white"}`}
                >
                  {link.label}
                  {megaMenuData[link.label] && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>
                
                {/* Active Indicator */}
                {pathname.startsWith(link.href) && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37]" />
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link href="/contact" className="hidden xl:flex bg-[#D4AF37] hover:bg-white text-black text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-colors">
              Book Consultation
            </Link>
            <button aria-label="Search" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/dashboard" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block" title="Dashboard">
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <button aria-label="Shopping Bag" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block">
              <ShoppingBag className="w-5 h-5" />
            </button>
            <Link href="/account" className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block" title="Account">
              <User className="w-5 h-5" />
            </Link>
            <button 
              aria-label="Open Mobile Menu"
              className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer lg:hidden"
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
                
                {/* Mega Menu Intro */}
                <div className="col-span-3 border-r border-white/[0.08] pr-8">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-6">{activeMegaMenu} Domain</h4>
                  <h3 className="text-2xl font-bold text-white mb-2">{megaMenuData[activeMegaMenu].title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">{megaMenuData[activeMegaMenu].subtitle}</p>
                  <Link href={`/${activeMegaMenu.toLowerCase()}`} className="text-xs font-bold text-white flex items-center gap-2 hover:text-[#D4AF37] transition-colors">
                    Explore All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                
                {/* Mega Menu Links */}
                <div className="col-span-6 grid grid-cols-2 gap-8">
                  {megaMenuData[activeMegaMenu].columns.map((col, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{col.title}</h4>
                      <div className="grid grid-cols-1 gap-3">
                        {col.links.map(link => (
                          <Link key={link.label} href={link.href} className="block text-sm text-zinc-300 hover:text-white hover:translate-x-1 transition-all">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mega Menu Featured Card */}
                <div className="col-span-3">
                  <div className="h-full rounded-[24px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] p-6 relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">AI Integration</span>
                        <h4 className="text-lg font-bold text-white mt-2">{activeMegaMenu} Routine Builder</h4>
                        <p className="text-xs text-zinc-400 mt-2 max-w-sm">Analyze your current protocols and get scientifically-backed recommendations tailored to your unique biology.</p>
                      </div>
                      <div className="flex items-center gap-2 mt-6">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-black" />
                        </div>
                        <span className="text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">Launch AI Assistant</span>
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
            <div className="p-6 flex items-center justify-between border-b border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-xl sticky top-0 z-10">
              <span className="text-xl font-bold tracking-tight font-mono text-white">
                BeautyOS<span className="text-[#D4AF37]">∞</span>
              </span>
              <button aria-label="Close Mobile Menu" onClick={() => setMobileMenuOpen(false)} className="p-2 text-zinc-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search ecosystem..."
                  className="w-full bg-[#101114] border border-white/[0.08] rounded-2xl pl-10 pr-4 py-4 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <Search className="absolute left-4 top-4 w-5 h-5 text-zinc-500" />
              </div>
              
              <div className="space-y-6">
                {navLinks.map((link) => (
                  <div key={link.label} className="border-b border-white/[0.05] pb-4">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-2xl font-bold text-white hover:text-[#D4AF37] block mb-4"
                    >
                      {link.label}
                    </Link>
                    {megaMenuData[link.label] && (
                      <div className="grid grid-cols-2 gap-4">
                        {megaMenuData[link.label].columns.map((col, idx) => (
                          <div key={idx} className="space-y-2">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">{col.title}</span>
                            <div className="flex flex-col gap-2">
                              {col.links.slice(0, 4).map(sublink => (
                                <Link 
                                  key={sublink.label} 
                                  href={sublink.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-xs text-zinc-400 hover:text-white"
                                >
                                  {sublink.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 grid grid-cols-2 gap-4">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="p-4 rounded-2xl bg-[#101114] border border-white/[0.08] flex items-center justify-center gap-2 text-sm font-bold text-white hover:border-[#D4AF37] transition-colors">
                    <LayoutDashboard className="w-4 h-4 text-[#D4AF37]" /> Dashboard
                  </Link>
                  <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="p-4 rounded-2xl bg-[#101114] border border-white/[0.08] flex items-center justify-center gap-2 text-sm font-bold text-white hover:border-[#D4AF37] transition-colors">
                    <User className="w-4 h-4 text-[#D4AF37]" /> Account
                  </Link>
                </div>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="mt-4 block w-full p-4 rounded-2xl bg-[#D4AF37] text-black text-center text-sm font-bold transition-colors">
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BREADCRUMBS & CONTEXT BAR (Except on Home) */}
      {pathname !== "/" && (
        <div className="bg-[#101114] border-b border-white/[0.05] py-2 px-4 md:px-8">
          <div className="max-w-[1920px] mx-auto flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-zinc-500 overflow-x-auto whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white flex items-center gap-1 transition-colors">
                <Home className="w-3 h-3" /> Home
              </Link>
              <span>/</span>
              <span className="text-[#D4AF37]">
                {pathname.substring(1).replace(/-/g, " ")}
              </span>
            </div>
            <button aria-label="Go Back" onClick={() => window.history.back()} className="hover:text-white transition-colors ml-4 shrink-0">
              ← Back
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full bg-[#0A0A0A] relative z-10">
        {children}
      </main>

      <FloatingActionButton />

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#0A0A0A] pt-24 pb-12 px-6">
        <div className="max-w-[1440px] mx-auto mb-20">
          <NewsletterBlock />
        </div>
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-12 mb-16">
          <div className="sm:col-span-2 space-y-6">
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
              <Link href="/products" className="block hover:text-[#D4AF37]">Products</Link>
              <Link href="/science" className="block hover:text-[#D4AF37]">Science</Link>
              <Link href="/guides" className="block hover:text-[#D4AF37]">Guides</Link>
              <Link href="/community" className="block hover:text-[#D4AF37]">Community</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Optimization</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/fitness" className="block hover:text-[#D4AF37]">Fitness</Link>
              <Link href="/nutrition" className="block hover:text-[#D4AF37]">Nutrition</Link>
              <Link href="/supplements" className="block hover:text-[#D4AF37]">Supplements</Link>
              <Link href="/longevity" className="block hover:text-[#D4AF37]">Longevity</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Demographics</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/men" className="block hover:text-[#D4AF37]">Men&apos;s Health</Link>
              <Link href="/women" className="block hover:text-[#D4AF37]">Women&apos;s Health</Link>
              <Link href="/teens" className="block hover:text-[#D4AF37]">Teen Skincare</Link>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-mono uppercase text-white tracking-widest mb-6">Legal & Support</h4>
            <div className="space-y-4 text-xs text-zinc-400">
              <Link href="/support" className="block hover:text-[#D4AF37]">Support</Link>
              <Link href="/contact" className="block hover:text-[#D4AF37]">Contact</Link>
              <Link href="/privacy" className="block hover:text-[#D4AF37]">Privacy Policy</Link>
              <Link href="/terms" className="block hover:text-[#D4AF37]">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
          <span>© {new Date().getFullYear()} BeautyOS Infinity. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
