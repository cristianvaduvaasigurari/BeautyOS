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
  Scissors
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

  // Product Discovery Filter State
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

  // 50+ BRAND E-COMMERCE PRODUCTS CATALOG
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

  // BEAUTY SUPPLEMENTS KNOWLEDGE CENTER DATA
  const supplementCenter = [
    { name: "Hydrolyzed Marine Collagen", type: "Type-I Collagen Peptides", dose: "10,000mg Daily", benefits: ["Skin elasticity boost", "Dermal hydration", "Nail & hair strength"], timing: "Morning with Vitamin C" },
    { name: "CoQ10 + Astaxanthin", type: "Mitochondrial Antioxidants", dose: "200mg / 12mg", benefits: ["Cellular energy", "UV oxidative shield", "Wrinkle depth reduction"], timing: "With healthy fat meal" },
    { name: "Resveratrol & NAD+ Precursors", type: "Sirtuin Longevity Activators", dose: "500mg NMN Equivalent", benefits: ["Cellular DNA repair", "Sirtuin-1 activation", "Anti-inflammatory"], timing: "Morning fasting" },
    { name: "High-Dose Biotin & Zinc PCA", type: "Keratin Synthesis Minerals", dose: "5,000mcg / 15mg", benefits: ["Hair follicle density", "Keratin cross-linking", "Sebum balance"], timing: "With lunch" }
  ];

  // 40+ EDITORIAL SCIENCE GUIDES
  const editorialSections = [
    { title: "Skin Barrier Preservation (3:1:1 Lipids)", desc: "Ceramides, cholesterol, and free fatty acids in physiological 3:1:1 ratio to prevent transepidermal water loss." },
    { title: "HairOS Hair Density & Scalp Microbiome", desc: "Follicular micro-circulation, DHT inhibition, and scalp lipid balance for thicker hair growth." },
    { title: "Women's Hormonal Beauty & Menopause", desc: "Managing estrogen drops, collagen decline, and hormonal acne through targeted phyto-estrogens." },
    { title: "Men's Grooming & Beard Care", desc: "Folliculitis prevention, beard softening oils, and post-shave barrier calming." },
    { title: "NAD+ Longevity & Cellular Repair", desc: "Mitochondrial energy enhancement and sirtuin activation for systemic skin longevity." },
    { title: "Photoprotection Academy (Broad Spectrum)", desc: "Mineral and synthetic UV filters shielding against UVA-I, UVA-II, UVB, and HEV blue light." }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#D4AF37]/30 selection:text-black relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {/* ========================================================= */}
      <div className="bg-[#0A0A0A] text-white text-[11px] font-mono py-2.5 px-6 text-center border-b border-white/[0.08] flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] uppercase tracking-wider">Flagship</span>
        <span>BeautyOS AI Skincare, HairOS, Grooming & Longevity Ecosystem</span>
        <button onClick={onGetStarted} className="underline text-[#E5C158] hover:text-white cursor-pointer ml-2">
          Start Analysis →
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
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#0A0A0A] to-[#17181B] text-[#D4AF37] flex items-center justify-center font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-base font-bold tracking-tight font-mono text-zinc-950">
              BeautyOS<span className="text-[#D4AF37]">™</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-zinc-700 uppercase font-sans">
            {[
              { id: "skincare", label: "Skincare" },
              { id: "hairos", label: "HairOS" },
              { id: "grooming", label: "Men's Grooming" },
              { id: "women", label: "Women's Health" },
              { id: "supplements", label: "Supplements" },
              { id: "devices", label: "Beauty Devices" },
            ].map((menu) => (
              <button
                key={menu.id}
                onMouseEnter={() => setActiveMegaMenu(menu.id)}
                className={`py-2 transition-colors cursor-pointer relative ${
                  activeMegaMenu === menu.id ? "text-[#D4AF37]" : "hover:text-black"
                }`}
              >
                {menu.label}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              title="Search Ecosystem"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onGetStarted}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              title="User Workspace"
            >
              <User className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCartDrawerOpen(true)}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer relative"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] flex items-center justify-center font-mono">
                  {cartItems.reduce((acc, item) => acc + item.count, 0)}
                </span>
              )}
            </button>

            <button
              onClick={onGetStarted}
              className="hidden sm:inline-flex text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold px-5 py-2.5 rounded-full transition-all shadow-md cursor-pointer"
            >
              Analyze My Skin
            </button>
          </div>
        </div>

        {/* APPLE MEGA MENU DROPDOWN PANEL */}
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
                
                <div className="col-span-4 space-y-3 border-r border-black/[0.06] pr-6">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Ecosystem Navigation</h4>
                  <div className="space-y-2 font-medium text-zinc-800">
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>AI Skin & Hair Diagnostic Suite</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => {
                      const el = document.getElementById("supplements");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>Beauty Supplements Knowledge Center</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => {
                      const el = document.getElementById("hairos");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>HairOS Scalp & Density Module</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => {
                      const el = document.getElementById("shop");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>50+ Premium Brands E-Commerce</p>
                  </div>
                </div>

                <div className="col-span-4 space-y-3 border-r border-black/[0.06] pr-6">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Featured Device</h4>
                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] flex items-center gap-4">
                    <img src="/images/beautyos_hero_products_1784918027747.png" alt="Featured Device" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500">Dyson Beauty</span>
                      <h5 className="text-xs font-bold text-zinc-950">Airwrap Multi-Styler Complete</h5>
                      <p className="text-[10px] text-zinc-500 mt-1">Coanda Airflow • 99% Fit Score</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 space-y-3">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Global Longevity</h4>
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] text-white space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37]">Mitochondrial NAD+ Activation</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      BeautyOS longevity protocols combine topical actives and systemic oral antioxidants.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION (ULTIMATE ECOSYSTEM HERO) */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.08] text-xs font-semibold text-zinc-800">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>The World&apos;s AI Beauty & Longevity Ecosystem</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.05]">
              Beauty. Science. <br />
              <span className="text-[#D4AF37] font-display italic font-normal">Longevity Operating System.</span>
            </h1>

            <p className="text-base text-zinc-600 font-normal leading-relaxed max-w-xl">
              Integrating skincare, HairOS, beauty supplements, men&apos;s grooming, women&apos;s health, and high-tech devices into one intelligent platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Full Diagnosis</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("shop");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto text-xs bg-[#FAFAFA] hover:bg-zinc-100 text-zinc-900 border border-black/[0.08] font-semibold px-7 py-4 rounded-full transition-all cursor-pointer"
              >
                Explore 50+ Brands
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="p-3 rounded-[36px] bg-[#FAFAFA] border border-black/[0.08] shadow-2xl relative">
              <img
                src="/images/beautyos_hero_products_1784918027747.png"
                alt="BeautyOS Ultimate Ecosystem"
                className="w-full h-[460px] sm:h-[520px] object-cover rounded-[28px]"
              />

              <div className="absolute top-8 left-8 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold font-mono">
                  99%
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-950">Augustinus Bader Rich Cream</h5>
                  <p className="text-[10px] text-zinc-500">TFC8® Cellular Renewal</p>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-[#0A0A0A]/95 text-white backdrop-blur-xl border border-white/[0.1] shadow-xl flex items-center gap-3">
                <Scissors className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <h5 className="text-xs font-bold">HairOS Follicle Density</h5>
                  <p className="text-[10px] text-zinc-400">Scalp Health & Growth Active</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. BEAUTY SUPPLEMENTS KNOWLEDGE CENTER */}
      {/* ========================================================= */}
      <section id="supplements" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Oral Nutricosmetics</span>
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
      {/* 5. 40+ EDITORIAL SCIENCE GUIDES */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Ecosystem Knowledge Base</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Clinical Science Library</h2>
          <p className="text-sm text-zinc-600">40+ evidence-based guides covering skin barrier, HairOS, longevity, and nutricosmetics.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialSections.map((sec) => (
            <div key={sec.title} className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] space-y-3 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-950">{sec.title}</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">{sec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. 50+ BRAND E-COMMERCE SHOPPING GRID */}
      {/* ========================================================= */}
      <section id="shop" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Global E-Commerce Destination</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">50+ Premium Brands Catalog</h2>
          <p className="text-sm text-zinc-600">Shop luxury skincare, HairOS devices, and nutricosmetics.</p>
        </div>

        {/* Filter Controls */}
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

        {/* Flagship Catalog Grid */}
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
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. LUXURY MULTI-COLUMN FOOTER */}
      {/* ========================================================= */}
      <footer className="border-t border-black/[0.08] bg-[#0A0A0A] text-white py-20 px-6 max-w-7xl mx-auto text-xs">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-[#D4AF37] text-zinc-950 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base font-mono">BeautyOS™</span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              The world&apos;s AI beauty, skincare, HairOS, nutricosmetics, and longevity ecosystem.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Domains</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer" onClick={onGetStarted}>AI Diagnostic Suite</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory("Haircare & Tools")}>HairOS Modules</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory("Supplements")}>Nutricosmetics</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Science</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">Skin Barrier 3:1:1</p>
              <p className="hover:text-white cursor-pointer">NAD+ Longevity</p>
              <p className="hover:text-white cursor-pointer">DHT Scalp Inhibitors</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Company</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">Privacy Policy</p>
              <p className="hover:text-white cursor-pointer">Terms of Service</p>
              <p className="hover:text-white cursor-pointer">Clinical Support</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <span>© {new Date().getFullYear()} BeautyOS Ecosystem Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 8. SHOPPING BAG CART DRAWER */}
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
      {/* 9. GLOBAL SEARCH OVERLAY MODAL */}
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
                <span className="text-xs font-bold text-zinc-950">Search BeautyOS Ecosystem (50+ Brands)</span>
                <button onClick={() => setSearchModalOpen(false)} className="p-1 text-zinc-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search skincare, HairOS, Dyson devices, supplements..."
                  className="w-full bg-[#FAFAFA] border border-black/[0.08] rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-950 focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Popular Searches</span>
                <div className="flex flex-wrap gap-2">
                  {["Dyson Airwrap", "Augustinus Bader Rich Cream", "Olaplex No.3", "Marine Collagen NAD+", "Foreo BEAR 2"].map((term) => (
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
