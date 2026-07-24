/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  Search,
  ShoppingBag,
  User,
  Star,
  SlidersHorizontal,
  Scissors,
  Dumbbell,
  Apple,
  Pill,
  ChevronDown
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  // Navigation & Mega Menu State
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ id: string; name: string; brand: string; price: number; count: number }[]>([
    { id: "c1", brand: "Augustinus Bader", name: "The Rich Cream with TFC8®", price: 290, count: 1 },
  ]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

  // Tab & Guide Indexes
  const [activeSupplementIdx, setActiveSupplementIdx] = useState(0);

  const handleAddToCart = (product: { id: string; brand: string; name: string; price: number }) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(cartItems.map((i) => (i.id === product.id ? { ...i, count: i.count + 1 } : i)));
    } else {
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }
    setCartDrawerOpen(true);
  };

  // ==========================================
  // DATA COLLECTIONS
  // ==========================================

  const flagshipProducts = [
    { id: "fp1", brand: "Dyson Beauty", name: "Airwrap Multi-Styler Complete Long", category: "Haircare & Tools", price: 599, rating: 4.9, fitScore: 99, badge: "Dyson Coanda Technology", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "fp2", brand: "Augustinus Bader", name: "The Rich Cream with TFC8®", category: "Skincare", price: 290, rating: 4.9, fitScore: 98, badge: "Cellular TFC8® Trigger", image: "/images/beautyos_showcase_phone_1784918045920.png" },
    { id: "fp3", brand: "Olaplex", name: "No.3 Hair Perfector Repair Mask", category: "Haircare & Tools", price: 30, rating: 4.8, fitScore: 97, badge: "Disulfide Bond Repair", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "fp4", brand: "SK-II", name: "Facial Treatment Essence PITERA™", category: "Skincare", price: 245, rating: 4.9, fitScore: 96, badge: "90% Pure PITERA™", image: "/images/beautyos_showcase_phone_1784918045920.png" },
    { id: "fp5", brand: "SkinCeuticals", name: "C E Ferulic Antioxidant Serum", category: "Skincare", price: 182, rating: 4.9, fitScore: 99, badge: "15% Pure L-Ascorbic", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "fp6", brand: "Foreo", name: "BEAR 2 Facial Microcurrent Device", category: "Beauty Devices", price: 329, rating: 4.8, fitScore: 95, badge: "FDA-Cleared Microcurrent", image: "/images/beautyos_showcase_phone_1784918045920.png" },
    { id: "fp7", brand: "K18", name: "Leave-In Molecular Repair Mask", category: "Haircare & Tools", price: 75, rating: 4.9, fitScore: 98, badge: "K18Peptide™ 4-Min Repair", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "fp8", brand: "BeautyOS Supplements", name: "Marine Collagen & NAD+ Longevity Complex", category: "Supplements", price: 65, rating: 4.9, fitScore: 99, badge: "Hydrolyzed Type-I Collagen", image: "/images/beautyos_showcase_phone_1784918045920.png" }
  ];

  const filteredFlagship = flagshipProducts.filter((p) => {
    if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
    if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
    return true;
  });

  const supplementCenter = [
    { name: "Hydrolyzed Marine Collagen", type: "Type-I Collagen Peptides", dose: "10,000mg Daily", benefits: ["Skin elasticity boost", "Dermal hydration", "Nail & hair strength"], timing: "Morning with Vitamin C" },
    { name: "CoQ10 + Astaxanthin", type: "Mitochondrial Antioxidants", dose: "200mg / 12mg", benefits: ["Cellular energy", "UV oxidative shield", "Wrinkle depth reduction"], timing: "With healthy fat meal" },
    { name: "Resveratrol & NAD+ Precursors", type: "Sirtuin Longevity Activators", dose: "500mg NMN Equivalent", benefits: ["Cellular DNA repair", "Sirtuin-1 activation", "Anti-inflammatory"], timing: "Morning fasting" },
    { name: "High-Dose Biotin & Zinc PCA", type: "Keratin Synthesis Minerals", dose: "5,000mcg / 15mg", benefits: ["Hair follicle density", "Keratin cross-linking", "Sebum balance"], timing: "With lunch" }
  ];

  const fitnessGuides = [
    { title: "Progressive Overload", desc: "The fundamental principle of muscle hypertrophy and strength gains." },
    { title: "Body Recomposition", desc: "Building muscle while simultaneously losing fat through precise macros." },
    { title: "VO2 Max & Longevity", desc: "Cardiovascular efficiency and its direct correlation with extended lifespan." },
    { title: "Recovery & Sleep", desc: "CNS recovery, deep sleep architecture, and tissue remodeling." }
  ];

  const nutritionGuides = [
    { title: "Protein Optimization", desc: "Leucine thresholds, muscle protein synthesis (MPS), and timing." },
    { title: "Micronutrient Density", desc: "Vitamins, minerals, and polyphenols for optimal cellular function." },
    { title: "Metabolic Flexibility", desc: "Switching between carbohydrate and fat oxidation for energy." },
    { title: "Gut Microbiome Health", desc: "Prebiotics, probiotics, and fiber's role in immunity and mood." }
  ];

  const mensGuides = [
    { title: "Beard & Folliculitis", desc: "Preventing ingrown hairs and maintaining skin barrier post-shave." },
    { title: "Scalp DHT Management", desc: "Understanding 5-alpha reductase and hair follicle miniaturization." },
    { title: "Gym Skincare", desc: "Preventing sweat-induced acne and malassezia folliculitis." }
  ];

  const womensGuides = [
    { title: "Pregnancy-Safe Actives", desc: "Alternatives to retinoids and salicylic acid during gestation." },
    { title: "Hormonal Acne (PCOS)", desc: "Targeting androgen-driven jawline breakouts." },
    { title: "Menopause Collagen Decline", desc: "Addressing the 30% drop in dermal collagen during first 5 years." }
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#D4AF37]/30 selection:text-black relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {/* ========================================================= */}
      <div className="bg-[#0A0A0A] text-white text-[11px] font-mono py-2.5 px-6 text-center border-b border-white/[0.08] flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] uppercase tracking-wider">BeautyOS Infinity</span>
        <span>The World&apos;s Best Beauty, Skincare, Wellness & Longevity Platform</span>
        <button onClick={onGetStarted} className="underline text-[#E5C158] hover:text-white cursor-pointer ml-2">
          Start Journey →
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN HEADER & APPLE MEGA MENU SYSTEM */}
      {/* ========================================================= */}
      <header
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-black/[0.08] transition-all"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#17181B] text-[#D4AF37] flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-base font-bold tracking-tight font-mono text-zinc-950">
              BeautyOS<span className="text-[#D4AF37]">∞</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold tracking-wider text-zinc-700 uppercase font-sans">
            {[
              { id: "skin", label: "Skin" },
              { id: "hair", label: "Hair" },
              { id: "body", label: "Body" },
              { id: "fitness", label: "Fitness" },
              { id: "nutrition", label: "Nutrition" },
              { id: "supplements", label: "Supplements" },
            ].map((menu) => (
              <button
                key={menu.id}
                onMouseEnter={() => setActiveMegaMenu(menu.id)}
                className={`py-2 transition-colors cursor-pointer relative flex items-center gap-1 ${
                  activeMegaMenu === menu.id ? "text-[#D4AF37]" : "hover:text-black"
                }`}
              >
                <span>{menu.label}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onGetStarted}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer relative"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] flex items-center justify-center font-mono">
                  {cartItems.reduce((acc, item) => acc + item.count, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MEGA MENU */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white/98 backdrop-blur-2xl border-b border-black/[0.08] shadow-2xl z-50 p-8"
            >
              <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 text-xs">
                
                <div className="col-span-3 space-y-3 border-r border-black/[0.06] pr-6">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{activeMegaMenu} Encyclopedia</h4>
                  <div className="space-y-2 font-medium text-zinc-800">
                    <p className="hover:text-[#D4AF37] cursor-pointer">View All {activeMegaMenu}</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer">AI Diagnostic Tool</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer">Routine Builder</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer">Expert Advice</p>
                  </div>
                </div>

                <div className="col-span-9 grid grid-cols-3 gap-6">
                   <div className="space-y-3">
                     <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Top Concerns</h4>
                     <div className="space-y-2 text-zinc-600">
                        <p className="hover:text-black cursor-pointer">Acne & Breakouts</p>
                        <p className="hover:text-black cursor-pointer">Anti-ageing & Wrinkles</p>
                        <p className="hover:text-black cursor-pointer">Hyperpigmentation</p>
                        <p className="hover:text-black cursor-pointer">Sensitivity & Redness</p>
                     </div>
                   </div>
                   <div className="space-y-3">
                     <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Key Ingredients</h4>
                     <div className="space-y-2 text-zinc-600">
                        <p className="hover:text-black cursor-pointer">Retinol & Retinoids</p>
                        <p className="hover:text-black cursor-pointer">Vitamin C & Antioxidants</p>
                        <p className="hover:text-black cursor-pointer">Ceramides & Lipids</p>
                        <p className="hover:text-black cursor-pointer">Peptides</p>
                     </div>
                   </div>
                   <div className="space-y-3">
                     <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] h-full flex flex-col justify-between">
                       <div>
                         <span className="text-[10px] font-mono text-[#D4AF37]">Featured Science</span>
                         <h5 className="text-xs font-bold text-zinc-950 mt-1">The Skin Barrier 3:1:1 Ratio</h5>
                         <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">Understanding the crucial balance of ceramides, cholesterol, and fatty acids.</p>
                       </div>
                       <button className="text-[10px] font-bold text-zinc-900 flex items-center gap-1 mt-4">
                         Read Guide <ArrowRight className="w-3 h-3" />
                       </button>
                     </div>
                   </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-28 px-6 max-w-7xl mx-auto">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.08] text-xs font-semibold text-zinc-800">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>BeautyOS Infinity</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.05]">
            The unified ecosystem for <br />
            <span className="text-[#D4AF37] font-display italic font-normal">health, beauty & longevity.</span>
          </h1>

          <p className="text-base text-zinc-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Skin. Hair. Nutrition. Fitness. Supplements. Sleep. <br />
            One intelligent AI operating system to optimize your entire life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Enter Ecosystem</span>
              <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. FITNESS & BODY PERFORMANCE */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              <Dumbbell className="w-4 h-4" /> Fitness & Body
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Body Performance</h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-sm md:text-right">
            Science-based protocols for muscle building, fat loss, mobility, and cardiovascular health.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fitnessGuides.map((guide) => (
            <div key={guide.title} className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] space-y-3 shadow-sm hover:border-black/20 transition-all cursor-pointer">
              <h3 className="text-sm font-bold text-zinc-950">{guide.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{guide.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. NUTRITION & GUT HEALTH */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              <Apple className="w-4 h-4" /> Nutrition Hub
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Clinical Nutrition</h2>
          </div>
          <p className="text-sm text-zinc-600 max-w-sm md:text-right">
            Optimize your macros, micronutrients, and gut microbiome for sustained energy and clear skin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nutritionGuides.map((guide) => (
            <div key={guide.title} className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] space-y-3 shadow-sm hover:border-black/20 transition-all cursor-pointer">
              <h3 className="text-sm font-bold text-zinc-950">{guide.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{guide.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. MEN & WOMEN DEMOGRAPHICS */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="p-10 rounded-[32px] bg-[#0A0A0A] text-white border border-white/[0.08] shadow-2xl space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Women&apos;s Health</span>
              <h3 className="text-3xl font-bold">Hormonal Beauty</h3>
              <p className="text-xs text-zinc-400 max-w-md">Dedicated protocols for pregnancy, PCOS, menopause, and hormonal fluctuations.</p>
            </div>
            <div className="space-y-4">
              {womensGuides.map((guide) => (
                <div key={guide.title} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
                  <h4 className="text-sm font-bold text-white">{guide.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-1">{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[32px] bg-[#FAFAFA] text-zinc-950 border border-black/[0.08] shadow-xl space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Men&apos;s Grooming</span>
              <h3 className="text-3xl font-bold">Performance & Grooming</h3>
              <p className="text-xs text-zinc-600 max-w-md">Optimized routines for beard care, scalp DHT management, and active lifestyles.</p>
            </div>
            <div className="space-y-4">
              {mensGuides.map((guide) => (
                <div key={guide.title} className="p-4 rounded-2xl bg-white border border-black/[0.06] hover:border-black/20 transition-all cursor-pointer shadow-sm">
                  <h4 className="text-sm font-bold text-zinc-950">{guide.title}</h4>
                  <p className="text-[11px] text-zinc-500 mt-1">{guide.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. BEAUTY SUPPLEMENTS KNOWLEDGE CENTER */}
      {/* ========================================================= */}
      <section id="supplements" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Pill className="w-4 h-4" /> Oral Nutricosmetics
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Beauty Supplements Center</h2>
          <p className="text-sm text-zinc-600">Systemic nutricosmetics for dermal hydration, collagen synthesis, and cellular longevity.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supplementCenter.map((sup, idx) => (
            <div
              key={sup.name}
              onClick={() => setActiveSupplementIdx(idx)}
              className={`p-6 rounded-[28px] border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm ${
                activeSupplementIdx === idx
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-xl"
                  : "bg-[#FAFAFA] text-zinc-950 border-black/[0.08] hover:border-black/20"
              }`}
            >
              <div className="space-y-2">
                <span className={`text-[10px] font-mono uppercase ${activeSupplementIdx === idx ? "text-[#D4AF37]" : "text-zinc-500"}`}>
                  {sup.type}
                </span>
                <h3 className="text-base font-bold">{sup.name}</h3>
                <span className={`text-xs font-mono font-bold block ${activeSupplementIdx === idx ? "text-zinc-300" : "text-zinc-700"}`}>
                  Dose: {sup.dose}
                </span>
              </div>

              <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs">
                <div className="space-y-1">
                  {sup.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
                <p className={`text-[10px] font-mono pt-1 ${activeSupplementIdx === idx ? "text-[#D4AF37]" : "text-zinc-500"}`}>
                  Timing: {sup.timing}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. HAIROS MODULE (SCALP & DENSITY) */}
      {/* ========================================================= */}
      <section id="hairos" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              <Scissors className="w-4 h-4" /> HairOS Technology
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">
              Comprehensive Hair & Scalp Intelligence
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Analyze hair density, scalp microbiome health, curl pattern, and chemical bond integrity with specialized Dyson & Olaplex protocols.
            </p>

            <div className="space-y-3 text-xs">
              {[
                { title: "Disulfide Bond Repair", active: "Olaplex Bis-Aminopropyl Diglycol" },
                { title: "Molecular Hair Mask 4-Min", active: "K18Peptide™ Peptide Matrix" },
                { title: "Aerodynamic Coanda Airflow", active: "Dyson Airwrap Styling Shield" }
              ].map((item) => (
                <div key={item.title} className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.08] flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-950">{item.title}</h4>
                    <p className="text-[10px] text-zinc-500">{item.active}</p>
                  </div>
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-3 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] shadow-xl">
            <img src="/images/beautyos_hero_products_1784918027747.png" alt="HairOS" className="w-full h-[420px] object-cover rounded-[26px]" />
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. 50+ BRAND E-COMMERCE SHOPPING GRID */}
      {/* ========================================================= */}
      <section id="shop" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Global E-Commerce Destination</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">50+ Premium Brands Catalog</h2>
          <p className="text-sm text-zinc-600">Shop luxury skincare, HairOS devices, and nutricosmetics.</p>
        </div>

        <div className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] mb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-950">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Filter Catalog</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-500 mb-1 font-mono text-[10px] uppercase">Domain Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-white border border-black/[0.08] rounded-xl px-3 py-2 text-zinc-900 font-medium"
              >
                <option value="All">All Categories</option>
                <option value="Skincare">Skincare</option>
                <option value="Haircare & Tools">Haircare & Tools</option>
                <option value="Beauty Devices">Beauty Devices</option>
                <option value="Supplements">Supplements</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-mono text-[10px] uppercase">Luxury Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-white border border-black/[0.08] rounded-xl px-3 py-2 text-zinc-900 font-medium"
              >
                <option value="All">All 50+ Brands</option>
                <option value="Dyson Beauty">Dyson Beauty</option>
                <option value="Augustinus Bader">Augustinus Bader</option>
                <option value="Olaplex">Olaplex</option>
                <option value="SK-II">SK-II</option>
                <option value="SkinCeuticals">SkinCeuticals</option>
                <option value="Foreo">Foreo</option>
                <option value="K18">K18</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFlagship.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] hover:border-black/20 transition-all flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-white border border-black/[0.06] p-3 text-center">
                  <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded-xl group-hover:scale-102 transition-transform" />
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#0A0A0A] text-[#D4AF37] text-[9px] font-mono font-bold shadow-md">
                    Fit: {p.fitScore}%
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{p.brand}</span>
                  <h3 className="text-xs font-bold text-zinc-950 line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-1.5 mt-1 text-[11px] text-zinc-500">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-zinc-900">{p.rating}</span>
                    <span>•</span>
                    <span>{p.category}</span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-xl bg-white border border-black/[0.06] text-[9px] text-zinc-700 font-medium">
                  {p.badge}
                </div>
              </div>

              <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-base font-bold font-mono text-zinc-950">${p.price}</span>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="px-4 py-2 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. LUXURY MULTI-COLUMN FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-black/[0.08] bg-[#0A0A0A] text-white py-20 px-6 max-w-7xl mx-auto text-xs">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#D4AF37] text-zinc-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base font-mono">BeautyOS<span className="text-[#D4AF37]">∞</span></span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The world&apos;s AI beauty, skincare, HairOS, nutricosmetics, fitness, and longevity ecosystem.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Ecosystem</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer" onClick={onGetStarted}>AI Coach Workspace</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory("Haircare & Tools")}>HairOS Devices</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory("Supplements")}>Supplements</p>
              <p className="hover:text-white cursor-pointer">Fitness Hub</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Demographics</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">Women&apos;s Health</p>
              <p className="hover:text-white cursor-pointer">Men&apos;s Grooming</p>
              <p className="hover:text-white cursor-pointer">Teen Skincare</p>
              <p className="hover:text-white cursor-pointer">Longevity Focus</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Company</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">Privacy Center</p>
              <p className="hover:text-white cursor-pointer">Terms of Service</p>
              <p className="hover:text-white cursor-pointer">Clinical Studies</p>
              <p className="hover:text-white cursor-pointer">Contact Us</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <span>© {new Date().getFullYear()} BeautyOS Infinity Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 11. SHOPPING BAG CART DRAWER */}
      {/* ========================================================= */}
      <AnimatePresence>
        {cartDrawerOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white text-zinc-950 w-full max-w-md h-full p-6 flex flex-col justify-between shadow-2xl relative"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/[0.08]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
                    <h3 className="text-base font-bold">Your Ecosystem Cart</h3>
                  </div>
                  <button onClick={() => setCartDrawerOpen(false)} className="p-1 rounded-lg text-zinc-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <p className="text-xs text-zinc-500">Your bag is empty.</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#FAFAFA] border border-black/[0.06]">
                        <div>
                          <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{item.brand}</span>
                          <h4 className="text-xs font-bold text-zinc-950">{item.name}</h4>
                          <span className="text-xs font-mono font-bold text-zinc-900">${item.price} x {item.count}</span>
                        </div>
                        <button
                          onClick={() => setCartItems(cartItems.filter((i) => i.id !== item.id))}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-black/[0.08] space-y-3">
                <div className="flex items-center justify-between text-sm font-bold">
                  <span>Subtotal</span>
                  <span className="font-mono">${cartItems.reduce((acc, i) => acc + i.price * i.count, 0)}</span>
                </div>
                <button
                  onClick={onGetStarted}
                  className="w-full py-3.5 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold text-xs cursor-pointer shadow-xl"
                >
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* 12. GLOBAL SEARCH OVERLAY MODAL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[28px] max-w-xl w-full p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
                <span className="text-xs font-bold text-zinc-950">Search BeautyOS Infinity</span>
                <button onClick={() => setSearchModalOpen(false)} className="p-1 text-zinc-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skincare, HairOS, fitness, supplements..."
                  className="w-full bg-[#FAFAFA] border border-black/[0.08] rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-950 focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Popular Searches</span>
                <div className="flex flex-wrap gap-2">
                  {["Dyson Airwrap", "VO2 Max", "Collagen", "Augustinus Bader", "Olaplex", "Protein Macros", "PCOS Routines"].map((term) => (
                    <span
                      key={term}
                      onClick={() => {
                        setSearchModalOpen(false);
                        const el = document.getElementById("shop");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.06] text-zinc-700 hover:border-[#D4AF37] cursor-pointer"
                    >
                      {term}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
