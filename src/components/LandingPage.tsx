/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  X,
  ChevronDown,
  Search,
  ShoppingBag,
  User,
  Star,
  SlidersHorizontal
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
    { id: "c1", brand: "BeautyOS Clinical", name: "Ceramide Barrier Restoration Cream", price: 48, count: 1 },
  ]);

  // Product Discovery Filter State
  const [selectedConcern, setSelectedConcern] = useState<string>("All");
  const [selectedSkinType, setSelectedSkinType] = useState<string>("All");
  const [selectedIngredient, setSelectedIngredient] = useState<string>("All");

  // Accordion & Modals
  const [activeIngredient, setActiveIngredient] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleAddToCart = (product: { id: string; brand: string; name: string; price: number }) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(cartItems.map((i) => (i.id === product.id ? { ...i, count: i.count + 1 } : i)));
    } else {
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }
    setCartDrawerOpen(true);
  };

  // --------------------------------------------------------------------------
  // PRODUCTS COMMERCE CATALOG DATA
  // --------------------------------------------------------------------------
  const shopProducts = [
    {
      id: "p1",
      brand: "BeautyOS Clinical",
      name: "Ceramide Barrier Restoration Cream",
      category: "Moisturizer",
      price: 48,
      rating: 4.9,
      fitScore: 98,
      concern: "Sensitive Skin",
      skinType: "Dry",
      ingredient: "Ceramides",
      badge: "98% Match for Sensitive Skin",
      image: "/images/beautyos_hero_products_1784918027747.png"
    },
    {
      id: "p2",
      brand: "Luminia Science",
      name: "Botanical Niacinamide 10% Concentrate",
      category: "Serum",
      price: 36,
      rating: 4.8,
      fitScore: 96,
      concern: "Acne",
      skinType: "Oily",
      ingredient: "Niacinamide",
      badge: "Best Seller for Pore Refinement",
      image: "/images/beautyos_showcase_phone_1784918045920.png"
    },
    {
      id: "p3",
      brand: "SkinCeuticals",
      name: "C E Ferulic Antioxidant Serum",
      category: "Serum",
      price: 182,
      rating: 4.9,
      fitScore: 95,
      concern: "Anti-Aging",
      skinType: "Combination",
      ingredient: "Vitamin C",
      badge: "Dermatologist Gold Standard",
      image: "/images/beautyos_hero_products_1784918027747.png"
    },
    {
      id: "p4",
      brand: "Paula's Choice",
      name: "2% BHA Liquid Exfoliant",
      category: "Treatment",
      price: 35,
      rating: 4.7,
      fitScore: 92,
      concern: "Acne",
      skinType: "Oily",
      ingredient: "Salicylic Acid",
      badge: "Deep Pore Purifier",
      image: "/images/beautyos_showcase_phone_1784918045920.png"
    },
    {
      id: "p5",
      brand: "BeautyOS Clinical",
      name: "Multi-Molecular Hyaluronic Booster",
      category: "Serum",
      price: 42,
      rating: 4.9,
      fitScore: 97,
      concern: "Dry Skin",
      skinType: "Dry",
      ingredient: "Hyaluronic Acid",
      badge: "1000x Moisture Binding",
      image: "/images/beautyos_hero_products_1784918027747.png"
    },
    {
      id: "p6",
      brand: "La Roche-Posay",
      name: "Anthelios SPF 50+ Invisible Fluid",
      category: "SPF",
      price: 32,
      rating: 4.8,
      fitScore: 99,
      concern: "Sensitive Skin",
      skinType: "Combination",
      ingredient: "SPF Shield",
      badge: "Broad Spectrum UV Protection",
      image: "/images/beautyos_showcase_phone_1784918045920.png"
    }
  ];

  const filteredProducts = shopProducts.filter((p) => {
    if (selectedConcern !== "All" && p.concern !== selectedConcern) return false;
    if (selectedSkinType !== "All" && p.skinType !== selectedSkinType) return false;
    if (selectedIngredient !== "All" && p.ingredient !== selectedIngredient) return false;
    return true;
  });

  // Skin Concerns Category Cards
  const skinConcerns = [
    { title: "Acne & Pores", desc: "Sebum regulation & pore clearance actives", active: "Niacinamide + BHA" },
    { title: "Dry Skin", desc: "Epidermal moisture replenishment & lipid sealing", active: "Hyaluronic Acid" },
    { title: "Sensitive Skin", desc: "Erythema reduction & compromised barrier care", active: "Ceramides 3:1:1" },
    { title: "Anti-Aging", desc: "Collagen stimulation & fine line refinement", active: "Retinol & Peptides" },
    { title: "Pigmentation", desc: "Melanin inhibition & surface brightening", active: "L-Ascorbic Acid" },
    { title: "Combination", desc: "T-zone balance & localized hydration", active: "Centella & Zinc" }
  ];

  // Ingredient Encyclopedia Cards
  const ingredients = [
    {
      name: "Niacinamide",
      category: "Vitamin B3",
      score: 96,
      benefits: ["Redness reduction", "Barrier lipid support", "Sebum oil regulation"],
      compatibility: "Pairs exceptionally with Hyaluronic Acid & Ceramides.",
      avoid: "Avoid high concentration L-Ascorbic Acid in same layer.",
      notes: "EWG Grade 1. Clinically proven at 2-5% concentration."
    },
    {
      name: "Retinol",
      category: "Vitamin A",
      score: 94,
      benefits: ["Collagen stimulation", "Fine line reduction", "Accelerated cell renewal"],
      compatibility: "Pairs best with Ceramides & Hyaluronic Acid at night.",
      avoid: "Avoid Salicylic Acid or direct Vitamin C in same layer.",
      notes: "Mandatory morning SPF usage due to photo-sensitization."
    },
    {
      name: "Vitamin C",
      category: "L-Ascorbic Acid",
      score: 91,
      benefits: ["Hyperpigmentation fading", "Free radical protection", "SPF photoprotection boost"],
      compatibility: "Ideal under morning SPF shield.",
      avoid: "Avoid mixing with Retinol or BHA acids.",
      notes: "Clinically effective at pH 3.0-3.5."
    },
    {
      name: "Ceramides",
      category: "Lipid Complex",
      score: 97,
      benefits: ["Moisture barrier sealing", "Epidermal water loss prevention", "Pollution shield"],
      compatibility: "Universal compatibility across all skin types.",
      avoid: "None. Essential for daily barrier health.",
      notes: "Formulated in 3:1:1 physiological lipid ratio."
    },
    {
      name: "Hyaluronic Acid",
      category: "Humectant",
      score: 95,
      benefits: ["1000x water binding", "Plumps dehydration lines", "Dewy skin radiance"],
      compatibility: "Universal compatibility with all serums and creams.",
      avoid: "None. Must apply to damp skin.",
      notes: "Multi-molecular weight penetrates surface and dermal layers."
    }
  ];

  // FAQ List
  const faqList = [
    { q: "How does BeautyOS calculate my Skin Score?", a: "BeautyOS uses clinical diagnostic metrics including hydration, redness, barrier integrity, sleep, and water intake to compute your personalized Skin Score from 0 to 100." },
    { q: "What is active ingredient collision detection?", a: "Certain actives (like Retinol and Vitamin C) collide when applied together, disrupting skin pH and barrier stability. BeautyOS flags these collisions automatically." },
    { q: "How does the Sephora-style product discovery work?", a: "Products in our catalog are evaluated against your personal skin profile, generating a custom Fit Score (0-100%) for each item." },
    { q: "What is PAO (Period-After-Opening) tracking?", a: "BeautyOS calculates cosmetic expiration dates based on when you opened the product, preventing oxidized or degraded active usage." },
    { q: "Is my personal skin data private?", a: "Yes. Your skin data is encrypted and never sold to third parties." },
    { q: "Can I use BeautyOS with prescription dermatology treatments?", a: "Yes. You can add custom prescription formulas like Tretinoin to your digital cabinet." },
    { q: "Does BeautyOS work offline?", a: "Yes. BeautyOS features offline-first local caching and automatically syncs when reconnected." },
    { q: "What is included in the BeautyOS Pro plan?", a: "Pro unlocks unlimited cabinet inventory, AI collision detection, Apple-style analytics, and unlimited AI Clinical Assistant guidance." },
    { q: "Can I export data for my dermatologist?", a: "Yes. You can export a PDF or JSON summary of your Skin Score trends and journal history." },
    { q: "How do I get started?", a: "Click 'Analyze My Skin', complete the 2-minute diagnostic onboarding, and start optimizing your routine immediately." }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#D4AF37]/30 selection:text-black relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {/* ========================================================= */}
      <div className="bg-[#0A0A0A] text-white text-[11px] font-mono py-2.5 px-6 text-center border-b border-white/[0.08] flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] uppercase tracking-wider">New</span>
        <span>BeautyOS AI Skin Analysis is now available</span>
        <button onClick={onGetStarted} className="underline text-[#E5C158] hover:text-white cursor-pointer ml-2">
          Start Analysis →
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN HEADER & APPLE MEGA MENU SYSTEM */}
      {/* ========================================================= */}
      <header
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-black/[0.08] transition-all"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-zinc-700 uppercase font-sans">
            {[
              { id: "analysis", label: "Skin Analysis" },
              { id: "products", label: "Products" },
              { id: "ingredients", label: "Ingredient Intelligence" },
              { id: "routines", label: "Routines" },
              { id: "learn", label: "Learn" },
              { id: "business", label: "For Business" },
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
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onGetStarted}
              className="p-2 rounded-full hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
              title="Account"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Shopping Cart Trigger */}
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
                
                {/* Left Links Column */}
                <div className="col-span-3 space-y-3 border-r border-black/[0.06] pr-6">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Navigation</h4>
                  {activeMegaMenu === "analysis" && (
                    <div className="space-y-2 font-medium text-zinc-800">
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>AI Skin Diagnosis</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>Skin Score Metric</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>Progress Tracking</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>Skin Journal</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>Photo Timeline Analysis</p>
                    </div>
                  )}
                  {activeMegaMenu === "products" && (
                    <div className="space-y-2 font-medium text-zinc-800">
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => setSelectedConcern("All")}>Shop All Skincare</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => setSelectedConcern("Sensitive Skin")}>Cleansers & Washes</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => setSelectedConcern("Acne")}>Target Serums</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => setSelectedConcern("Dry Skin")}>Barrier Moisturizers</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => setSelectedConcern("Sensitive Skin")}>Daily Broad Spectrum SPF</p>
                    </div>
                  )}
                  {activeMegaMenu === "ingredients" && (
                    <div className="space-y-2 font-medium text-zinc-800">
                      <p className="hover:text-[#D4AF37] cursor-pointer">Niacinamide (Vitamin B3)</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Retinol & Retinoids</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">L-Ascorbic Vitamin C</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Physiological Ceramides</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Hyaluronic Acid</p>
                    </div>
                  )}
                  {activeMegaMenu === "routines" && (
                    <div className="space-y-2 font-medium text-zinc-800">
                      <p className="hover:text-[#D4AF37] cursor-pointer">Morning Protection Routine</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Evening Repair Routine</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Acne Clearing Protocol</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Barrier Recovery Schema</p>
                    </div>
                  )}
                  {activeMegaMenu === "learn" && (
                    <div className="space-y-2 font-medium text-zinc-800">
                      <p className="hover:text-[#D4AF37] cursor-pointer">Skin Science Journal</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Dermatology Guides</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Ingredient Library</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">BeautyOS Editorial Magazine</p>
                    </div>
                  )}
                  {activeMegaMenu === "business" && (
                    <div className="space-y-2 font-medium text-zinc-800">
                      <p className="hover:text-[#D4AF37] cursor-pointer">Professional Clinic Software</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Dermatology Partners</p>
                      <p className="hover:text-[#D4AF37] cursor-pointer">Cosmetic Brand Intelligence</p>
                    </div>
                  )}
                </div>

                {/* Center Featured Product / Highlight Column */}
                <div className="col-span-5 space-y-3 border-r border-black/[0.06] pr-6">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Featured Formula</h4>
                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] flex items-center gap-4">
                    <img src="/images/beautyos_hero_products_1784918027747.png" alt="Featured" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500">BeautyOS Clinical</span>
                      <h5 className="text-xs font-bold text-zinc-950">Ceramide Barrier Restoration Cream</h5>
                      <p className="text-[10px] text-zinc-500 mt-1">98% Skin Fit Match • 3:1:1 Lipid Balance</p>
                      <button onClick={onGetStarted} className="mt-2 text-[10px] font-bold text-[#D4AF37] underline">
                        Explore Formula →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Educational / Score Column */}
                <div className="col-span-4 space-y-3">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Clinical Standard</h4>
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] text-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#D4AF37]">Scientific Efficacy</span>
                      <span className="text-xs font-mono font-bold">96/100</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Every cosmetic product in BeautyOS is benchmarked against International Nomenclature Cosmetic Ingredient standards.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION (SEPHORA EDITORIAL HIGH LUXURY) */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.08] text-xs font-semibold text-zinc-800">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>BeautyOS Skincare Operating System</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.05] font-sans">
              Your skin. <br />
              <span className="text-[#D4AF37] font-display italic font-normal">Understood.</span>
            </h1>

            <p className="text-base text-zinc-600 font-normal leading-relaxed max-w-xl">
              AI-powered skincare intelligence that helps you discover products, understand ingredients, and build the perfect routine.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
              >
                <span>Analyze My Skin</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => {
                  const shopEl = document.getElementById("shop");
                  if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto text-xs bg-[#FAFAFA] hover:bg-zinc-100 text-zinc-900 border border-black/[0.08] font-semibold px-7 py-4 rounded-full transition-all cursor-pointer"
              >
                Explore Skincare
              </button>
            </div>
          </div>

          {/* Right Visual Image Composition */}
          <div className="lg:col-span-6 relative">
            <div className="p-3 rounded-[36px] bg-[#FAFAFA] border border-black/[0.08] shadow-2xl relative">
              <img
                src="/images/beautyos_hero_products_1784918027747.png"
                alt="BeautyOS Skincare Intelligence Products"
                className="w-full h-[460px] sm:h-[520px] object-cover rounded-[28px]"
              />

              {/* Floating Badges */}
              <div className="absolute top-8 left-8 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/[0.08] shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center font-bold font-mono">
                  98%
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-950">Niacinamide Serum</h5>
                  <p className="text-[10px] text-zinc-500">Pore Refinement Active</p>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-[#0A0A0A]/95 text-white backdrop-blur-xl border border-white/[0.1] shadow-xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h5 className="text-xs font-bold">Ceramides 3:1:1 Ratio</h5>
                  <p className="text-[10px] text-zinc-400">Barrier Lipid Restoration</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. SECTION: AI SKIN ANALYSIS SHOWCASE */}
      {/* ========================================================= */}
      <section id="analysis" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Diagnostic Technology</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">
            Know your skin before choosing products.
          </h2>
          <p className="text-sm text-zinc-600">Personalized algorithmic analysis measuring 5 physiological skin parameters.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 p-8 rounded-[32px] bg-[#0A0A0A] text-white space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase">Diagnostic Result</span>
                <h3 className="text-xl font-bold">Live Skin Score</h3>
              </div>
              <div className="text-3xl font-bold font-mono text-[#D4AF37]">87<span className="text-xs text-zinc-500 font-sans">/100</span></div>
            </div>

            <div className="space-y-3 text-xs">
              {[
                { metric: "Epidermal Hydration", score: "88%", status: "Optimal" },
                { metric: "Barrier Lipid Integrity", score: "92%", status: "Restored" },
                { metric: "Surface Texture", score: "84%", status: "Smooth" },
                { metric: "Erythema / Redness", score: "1.4/5", status: "Calm" },
                { metric: "Sensitivity Rating", score: "Low", status: "Protected" }
              ].map((m) => (
                <div key={m.metric} className="flex items-center justify-between p-3 rounded-xl bg-[#17181B] border border-white/[0.06]">
                  <span className="text-zinc-300 font-medium">{m.metric}</span>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-white font-bold">{m.score}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">{m.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-zinc-950 font-bold text-xs cursor-pointer shadow-lg"
            >
              Start Skin Analysis Now
            </button>
          </div>

          <div className="lg:col-span-6 p-3 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08]">
            <img src="/images/beautyos_showcase_phone_1784918045920.png" alt="Skin Analysis Interface" className="w-full h-[440px] object-cover rounded-[26px]" />
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. SECTION: SHOP BY SKIN CONCERN */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Sephora Category Discovery</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Shop by Skin Concern</h2>
          <p className="text-sm text-zinc-600">Targeted skincare formulations categorized for your primary skin needs.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skinConcerns.map((sc) => (
            <div
              key={sc.title}
              onClick={() => {
                const shopEl = document.getElementById("shop");
                if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-8 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] hover:border-[#D4AF37] transition-all cursor-pointer group shadow-sm flex flex-col justify-between h-full"
            >
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-wider block mb-2">{sc.active}</span>
                <h3 className="text-xl font-bold text-zinc-950 mb-2">{sc.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{sc.desc}</p>
              </div>

              <div className="pt-6 border-t border-black/[0.06] mt-6 flex items-center justify-between text-xs font-bold text-zinc-950 group-hover:text-[#D4AF37]">
                <span>Explore Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. SECTION: INGREDIENT INTELLIGENCE ENCYCLOPEDIA */}
      {/* ========================================================= */}
      <section id="ingredients" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Chemical Matrix</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Ingredient Intelligence</h2>
          <p className="text-sm text-zinc-600">Scientific breakdown of active skincare compounds and compatibility rules.</p>
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8">
          {ingredients.map((ing, idx) => (
            <button
              key={ing.name}
              onClick={() => setActiveIngredient(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                activeIngredient === idx
                  ? "bg-[#0A0A0A] text-white border-[#0A0A0A] font-bold shadow-md"
                  : "bg-[#FAFAFA] text-zinc-700 border-black/[0.08] hover:text-black"
              }`}
            >
              {ing.name}
            </button>
          ))}
        </div>

        {(() => {
          const ing = ingredients[activeIngredient];
          return (
            <div className="p-8 sm:p-10 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] relative shadow-xl">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">{ing.category}</span>
                    <h3 className="text-3xl font-bold text-zinc-950 mt-1">{ing.name}</h3>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-zinc-800 uppercase tracking-wider">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {ing.benefits.map((b) => (
                        <span key={b} className="px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] text-xs text-zinc-800 flex items-center gap-2 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-white border border-black/[0.08]">
                      <h4 className="text-xs font-semibold text-[#D4AF37] mb-1">Compatible Actives</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">{ing.compatibility}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                      <h4 className="text-xs font-semibold text-rose-600 mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        Combinations to Avoid
                      </h4>
                      <p className="text-xs text-rose-700 leading-relaxed">{ing.avoid}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0A0A0A] text-white">
                    <h4 className="text-xs font-semibold text-[#D4AF37] mb-1">Clinical Notes</h4>
                    <p className="text-xs text-zinc-300 font-mono">{ing.notes}</p>
                  </div>
                </div>

                <div className="w-full lg:w-auto p-8 rounded-[28px] bg-[#0A0A0A] text-white flex flex-col items-center justify-center text-center shrink-0 shadow-xl">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Scientific Score</span>
                  <div className="text-5xl font-bold text-[#D4AF37] my-3 font-mono">
                    {ing.score}<span className="text-xs text-zinc-500 font-sans">/100</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    High Efficacy Rating
                  </span>
                </div>

              </div>
            </div>
          );
        })()}
      </section>

      {/* ========================================================= */}
      {/* 7. SECTION: PRODUCT DISCOVERY (SEPHORA SHOPPING GRID & FILTERS) */}
      {/* ========================================================= */}
      <section id="shop" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Curated E-Commerce Catalog</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Product Discovery</h2>
          <p className="text-sm text-zinc-600">Discover formulations rated by AI compatibility for your skin profile.</p>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] mb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-950">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Filter Formulations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-zinc-500 mb-1 font-mono text-[10px] uppercase">Skin Concern</label>
              <select
                value={selectedConcern}
                onChange={(e) => setSelectedConcern(e.target.value)}
                className="w-full bg-white border border-black/[0.08] rounded-xl px-3 py-2 text-zinc-900 font-medium"
              >
                <option value="All">All Concerns</option>
                <option value="Sensitive Skin">Sensitive Skin</option>
                <option value="Acne">Acne & Pores</option>
                <option value="Dry Skin">Dry Skin</option>
                <option value="Anti-Aging">Anti-Aging</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-mono text-[10px] uppercase">Skin Type</label>
              <select
                value={selectedSkinType}
                onChange={(e) => setSelectedSkinType(e.target.value)}
                className="w-full bg-white border border-black/[0.08] rounded-xl px-3 py-2 text-zinc-900 font-medium"
              >
                <option value="All">All Skin Types</option>
                <option value="Dry">Dry</option>
                <option value="Oily">Oily</option>
                <option value="Combination">Combination</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-500 mb-1 font-mono text-[10px] uppercase">Primary Active</label>
              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="w-full bg-white border border-black/[0.08] rounded-xl px-3 py-2 text-zinc-900 font-medium"
              >
                <option value="All">All Active Ingredients</option>
                <option value="Ceramides">Ceramides</option>
                <option value="Niacinamide">Niacinamide</option>
                <option value="Vitamin C">Vitamin C</option>
                <option value="Salicylic Acid">Salicylic Acid</option>
                <option value="Hyaluronic Acid">Hyaluronic Acid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] hover:border-black/20 transition-all flex flex-col justify-between space-y-4 group shadow-sm"
            >
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden bg-white border border-black/[0.06] p-4 text-center">
                  <img src={p.image} alt={p.name} className="w-full h-44 object-cover rounded-xl group-hover:scale-102 transition-transform" />
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#0A0A0A] text-[#D4AF37] text-[10px] font-mono font-bold shadow-md">
                    Fit: {p.fitScore}%
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{p.brand}</span>
                  <h3 className="text-base font-bold text-zinc-950">{p.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span className="text-xs font-bold text-zinc-900 ml-1">{p.rating}</span>
                    </div>
                    <span className="text-zinc-400">•</span>
                    <span className="text-xs text-zinc-500">{p.category}</span>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-white border border-black/[0.06] text-[10px] text-zinc-700 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{p.badge}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-lg font-bold font-mono text-zinc-950">${p.price}</span>
                <button
                  onClick={() => handleAddToCart(p)}
                  className="px-5 py-2.5 rounded-full bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold text-xs transition-all cursor-pointer shadow-md"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. SECTION: BEAUTYOS AI ASSISTANT */}
      {/* ========================================================= */}
      <section id="ai" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Artificial Intelligence</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">BeautyOS AI Assistant</h2>
          <p className="text-sm text-zinc-600">ChatGPT-style conversational skincare intelligence tailored to your skin log.</p>
        </div>

        <div className="max-w-3xl mx-auto p-8 rounded-[32px] bg-[#0A0A0A] text-white border border-white/[0.1] shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-6 border-b border-white/[0.08]">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#E5C158] text-zinc-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold">BeautyOS AI Clinical Assistant</h3>
              <p className="text-[10px] text-emerald-400 font-mono">Active • Monitoring Cabinet & Routine</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-end">
              <div className="bg-[#17181B] border border-white/[0.08] text-white px-5 py-3.5 rounded-2xl rounded-tr-none max-w-sm">
                My skin feels irritated today
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 mt-1">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="bg-zinc-950 border border-white/[0.08] p-5 rounded-2xl rounded-tl-none space-y-3 leading-relaxed w-full">
                <p className="text-white font-medium">
                  Your barrier score decreased 12% this week. Reduce active exfoliants and focus on ceramides.
                </p>
                <div className="p-3 rounded-xl bg-[#101114] text-[11px] space-y-1">
                  <span className="text-[#D4AF37] font-mono font-bold">Actionable Adjustment:</span>
                  <p className="text-zinc-400">Skip evening Retinol. Apply BeautyOS Ceramide Barrier Restoration Cream on damp skin.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. SECTION: PRICING COMPARISON TABLE */}
      {/* ========================================================= */}
      <section id="pricing" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Transparent Plans</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Pricing</h2>
          <p className="text-sm text-zinc-600">Choose the ideal operating tier for your skin health.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-zinc-950">Free</h3>
              <p className="text-xs text-zinc-500 mt-1">Essential skincare cabinet logging</p>
              <div className="text-3xl font-bold text-zinc-950 my-6 font-mono">$0 <span className="text-xs text-zinc-500 font-sans">/ forever</span></div>
            </div>
            <button onClick={onGetStarted} className="w-full py-3.5 rounded-full bg-[#0A0A0A] text-white font-bold text-xs cursor-pointer">
              Start Free
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-[#0A0A0A] text-white border-2 border-[#D4AF37] flex flex-col justify-between h-full relative shadow-2xl scale-102">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[10px] uppercase tracking-widest">
              Most Popular
            </div>
            <div>
              <h3 className="text-lg font-bold">BeautyOS Pro</h3>
              <p className="text-xs text-zinc-400 mt-1">Complete AI Skin Operating System</p>
              <div className="text-3xl font-bold text-[#D4AF37] my-6 font-mono">$9 <span className="text-xs text-zinc-500 font-sans">/ month</span></div>
            </div>
            <button onClick={onGetStarted} className="w-full py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-zinc-950 font-bold text-xs cursor-pointer shadow-lg">
              Get Pro Access
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-zinc-950">BeautyOS Clinic</h3>
              <p className="text-xs text-zinc-500 mt-1">For dermatology clinics & skin pros</p>
              <div className="text-3xl font-bold text-zinc-950 my-6 font-mono">$149 <span className="text-xs text-zinc-500 font-sans">/ month</span></div>
            </div>
            <button onClick={onGetStarted} className="w-full py-3.5 rounded-full bg-[#0A0A0A] text-white font-bold text-xs cursor-pointer">
              Contact Clinic Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. SECTION: FAQ (10 ACCORDIONS) */}
      {/* ========================================================= */}
      <section id="faq" className="py-28 px-6 max-w-4xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div key={faq.q} className="rounded-[24px] bg-[#FAFAFA] border border-black/[0.08] overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-100 transition-colors"
                >
                  <span className="text-sm font-semibold text-zinc-950 pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#D4AF37] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <div className="px-6 pb-6 text-xs text-zinc-600 leading-relaxed border-t border-black/[0.04] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 11. LUXURY FOOTER & NEWSLETTER */}
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
              AI-powered skincare intelligence helping you discover formulas, understand chemical ingredients, and build the perfect routine.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Products</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer" onClick={onGetStarted}>AI Skin Diagnosis</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedConcern("Acne")}>Target Serums</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedConcern("Sensitive Skin")}>Ceramide Moisturizers</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedConcern("Sensitive Skin")}>Daily SPF Shield</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Science</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">EWG Database</p>
              <p className="hover:text-white cursor-pointer">INCI Registry</p>
              <p className="hover:text-white cursor-pointer">Barrier Repair 3:1:1</p>
              <p className="hover:text-white cursor-pointer">Microbiome Balance</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Company</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">Privacy Policy</p>
              <p className="hover:text-white cursor-pointer">Terms of Service</p>
              <p className="hover:text-white cursor-pointer">Dermatology Support</p>
              <p className="hover:text-white cursor-pointer">Contact Us</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <span>© {new Date().getFullYear()} BeautyOS Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </footer>

      {/* ========================================================= */}
      {/* 12. SHOPPING BAG SLIDE-OUT CART DRAWER */}
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
                    <h3 className="text-base font-bold">Your Shopping Bag</h3>
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
      {/* 13. SEARCH OVERLAY MODAL */}
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
                <span className="text-xs font-bold text-zinc-950">Search BeautyOS Intelligence</span>
                <button onClick={() => setSearchModalOpen(false)} className="p-1 text-zinc-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, ingredients, skin concerns..."
                  className="w-full bg-[#FAFAFA] border border-black/[0.08] rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-950 focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Popular Searches</span>
                <div className="flex flex-wrap gap-2">
                  {["Niacinamide Serum", "Ceramides Barrier Cream", "Acne Cleanser", "SPF 50+ Fluid", "Retinol 0.5%"].map((term) => (
                    <span
                      key={term}
                      onClick={() => {
                        setSearchModalOpen(false);
                        const shopEl = document.getElementById("shop");
                        if (shopEl) shopEl.scrollIntoView({ behavior: "smooth" });
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
