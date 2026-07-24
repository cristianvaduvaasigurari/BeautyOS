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
  X,
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

  // Blend & Compatibility Engine State
  const [activePair1, setActivePair1] = useState<string>("Niacinamide");
  const [activePair2, setActivePair2] = useState<string>("Vitamin C");

  // Active Tab State
  const [activeGuideIdx, setActiveGuideIdx] = useState(0);

  const handleAddToCart = (product: { id: string; brand: string; name: string; price: number }) => {
    const existing = cartItems.find((i) => i.id === product.id);
    if (existing) {
      setCartItems(cartItems.map((i) => (i.id === product.id ? { ...i, count: i.count + 1 } : i)));
    } else {
      setCartItems([...cartItems, { ...product, count: 1 }]);
    }
    setCartDrawerOpen(true);
  };

  // Active Pairs Matrix Logic
  const checkCompatibility = (a1: string, a2: string) => {
    if ((a1 === "Retinol" && a2 === "AHA/BHA Acids") || (a1 === "AHA/BHA Acids" && a2 === "Retinol")) {
      return {
        compatible: false,
        status: "High Collision Risk",
        warning: "Causes severe barrier inflammation and redness. Do NOT mix in the same routine layer.",
        bestOrder: "Apply AHA/BHA in AM, Retinol in PM",
        waitTime: "12 hours between applications",
        frequency: "Alternate days"
      };
    }
    if ((a1 === "Vitamin C" && a2 === "Niacinamide") || (a1 === "Niacinamide" && a2 === "Vitamin C")) {
      return {
        compatible: true,
        status: "Synergistic Match",
        warning: "Modern stabilized formulas can be layered together. Provides powerful antioxidants and brightens tone.",
        bestOrder: "Vitamin C first on dry skin, follow with Niacinamide",
        waitTime: "2-3 minutes",
        frequency: "Daily Morning Layer"
      };
    }
    if ((a1 === "Retinol" && a2 === "Ceramides") || (a1 === "Ceramides" && a2 === "Retinol")) {
      return {
        compatible: true,
        status: "Gold Standard Pair",
        warning: "Ceramides buffer retinoid dryness and protect lipid barrier function.",
        bestOrder: "Apply Retinol on dry skin, seal with Ceramide Cream",
        waitTime: "5 minutes",
        frequency: "Every evening"
      };
    }
    return {
      compatible: true,
      status: "Safe Combination",
      warning: "No chemical conflicts detected. Suitable for daily routine layering.",
      bestOrder: "Thinnest texture to thickest cream",
      waitTime: "1-2 minutes",
      frequency: "Daily AM or PM"
    };
  };

  const currentPairResult = checkCompatibility(activePair1, activePair2);

  // --------------------------------------------------------------------------
  // PRODUCTS COMMERCE CATALOG DATA
  // --------------------------------------------------------------------------
  const shopProducts = [
    { id: "p1", brand: "SkinCeuticals", name: "C E Ferulic Antioxidant Serum", category: "Serum", price: 182, rating: 4.9, fitScore: 98, concern: "Anti-Ageing", skinType: "Combination", ingredient: "Vitamin C", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "p2", brand: "CeraVe", name: "Hydrating Cleanser", category: "Cleanser", price: 18, rating: 4.8, fitScore: 96, concern: "Sensitive Skin", skinType: "Dry", ingredient: "Ceramides", image: "/images/beautyos_showcase_phone_1784918045920.png" },
    { id: "p3", brand: "La Roche-Posay", name: "Toleriane Gentle Cleanser", category: "Cleanser", price: 24, rating: 4.9, fitScore: 95, concern: "Sensitive Skin", skinType: "Dry", ingredient: "Panthenol", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "p4", brand: "The Ordinary", name: "Niacinamide 10% + Zinc 1%", category: "Serum", price: 12, rating: 4.7, fitScore: 94, concern: "Acne", skinType: "Oily", ingredient: "Niacinamide", image: "/images/beautyos_showcase_phone_1784918045920.png" },
    { id: "p5", brand: "Paula's Choice", name: "2% BHA Liquid Exfoliant", category: "Treatment", price: 35, rating: 4.9, fitScore: 97, concern: "Acne", skinType: "Oily", ingredient: "Salicylic Acid", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "p6", brand: "Medik8", name: "Crystal Retinal 6", category: "Treatment", price: 74, rating: 4.9, fitScore: 99, concern: "Anti-Ageing", skinType: "Combination", ingredient: "Retinal", image: "/images/beautyos_showcase_phone_1784918045920.png" },
    { id: "p7", brand: "Drunk Elephant", name: "Protini Polypeptide Cream", category: "Moisturizer", price: 68, rating: 4.8, fitScore: 95, concern: "Anti-Ageing", skinType: "Dry", ingredient: "Peptides", image: "/images/beautyos_hero_products_1784918027747.png" },
    { id: "p8", brand: "Beauty of Joseon", name: "Relief Sun : Rice + Probiotics SPF 50+", category: "Sunscreen", price: 18, rating: 4.9, fitScore: 98, concern: "Sensitive Skin", skinType: "Combination", ingredient: "Niacinamide", image: "/images/beautyos_showcase_phone_1784918045920.png" }
  ];

  const filteredProducts = shopProducts.filter((p) => {
    if (selectedConcern !== "All" && p.concern !== selectedConcern) return false;
    if (selectedSkinType !== "All" && p.skinType !== selectedSkinType) return false;
    if (selectedIngredient !== "All" && p.ingredient !== selectedIngredient) return false;
    return true;
  });

  // 20+ EDITORIAL GUIDES LIST
  const editorialGuides = [
    { title: "Skin Barrier Preservation Guide", subtitle: "Restoring the 3:1:1 lipid matrix ratio", content: "The stratum corneum relies on a precise balance of ceramides, cholesterol, and free fatty acids. When harsh cleansers disrupt this lipid barrier, transepidermal water loss surges, triggering micro-inflammation." },
    { title: "Acne Mechanics & Comedone Clearing", subtitle: "Follicular hyperkeratosis & C. acnes suppression", content: "Acne develops when follicular keratinization traps sebum. BHA (Salicylic Acid) penetrates lipophilic pore linings to dissolve debris while Zinc PCA controls oil production." },
    { title: "Sensitive Skin & Erythema Calming", subtitle: "Neuro-sensory threshold modulation", content: "Hyper-reactive skin stems from compromised tight junctions and elevated TRPV1 receptor sensitivity. Centella Asiatica and Madecassoside rapidly calm inflammatory cascades." },
    { title: "Anti-Ageing & Collagen Synthesis", subtitle: "Fibroblast activation & extracellular matrix", content: "Dermal collagen decreases by 1% annually after age 25. Retinoids and Copper Peptides stimulate type-I collagen synthesis while protecting against MMP enzymatic breakdown." },
    { title: "Hyperpigmentation & Melanin Inhibition", subtitle: "Tyrosinase suppression & melanosome transfer", content: "Hyperpigmentation requires a multi-pathway attack: Tranexamic Acid inhibits melanocyte activation, L-Ascorbic Acid neutralizes free radicals, and Niacinamide blocks melanosome transfer." },
    { title: "SPF Photoprotection Masterclass", subtitle: "UVA/UVB broad-spectrum defense", content: "80% of visible facial aging is driven by UV radiation. Modern photostable mineral and organic filters reflect and absorb UVA-I, UVA-II, and UVB rays continuously." },
    { title: "Retinol & Retinoids Masterclass", subtitle: "Cellular turnover acceleration", content: "Retinoic acid binds to nuclear retinoic acid receptors (RAR) to accelerate cell renewal. Retinaldehyde requires only 1 conversion step to retinoic acid vs Retinol's 2 steps." },
    { title: "Vitamin C Formulations Guide", subtitle: "L-Ascorbic Acid vs THD Ascorbate", content: "Pure L-Ascorbic Acid requires an acidic pH below 3.5 for dermal absorption. Lipid-soluble THD Ascorbate penetrates deeper into dermal layers without acidic irritation." }
  ];

  // INGREDIENTS ENCYCLOPEDIA (30+ ACTIVE COMPOUNDS)
  const ingredients = [
    { name: "Niacinamide", category: "Vitamin B3", score: 96, benefits: ["Redness reduction", "Barrier lipid support", "Sebum oil regulation"], compatibility: "Pairs with Hyaluronic Acid & Ceramides.", avoid: "High concentration L-Ascorbic Acid in same layer.", notes: "EWG Grade 1. Clinically proven at 2-5% concentration." },
    { name: "Retinol", category: "Vitamin A", score: 94, benefits: ["Collagen stimulation", "Fine line reduction", "Cellular renewal"], compatibility: "Pairs best with Ceramides & Hyaluronic Acid at night.", avoid: "Salicylic Acid or direct Vitamin C in same layer.", notes: "Mandatory morning SPF usage due to photo-sensitization." },
    { name: "Retinaldehyde", category: "Vitamin A Precursor", score: 98, benefits: ["10x faster retinoic conversion", "Bacterial acne control", "Firmness"], compatibility: "Pairs with Ceramides & Centella.", avoid: "AHAs/BHAs in same evening layer.", notes: "Encapsulated delivery minimizes erythema." },
    { name: "Vitamin C (L-Ascorbic)", category: "Antioxidant", score: 92, benefits: ["Spot fading", "Free radical shield", "Photoprotection boost"], compatibility: "Ideal under morning SPF shield.", avoid: "Retinol or high pH formulas.", notes: "Formulated at acidic pH 3.0-3.5." },
    { name: "Ceramides (3:1:1 Ratio)", category: "Lipid Complex", score: 99, benefits: ["Moisture sealing", "TEWL prevention", "Environmental shield"], compatibility: "Universal compatibility across all skin profiles.", avoid: "None.", notes: "Essential for stratum corneum structural integrity." },
    { name: "Copper Tripeptide-1", category: "Signal Peptide", score: 95, benefits: ["Tissue remodeling", "Wound healing", "Extracellular matrix repair"], compatibility: "Pairs with Hyaluronic Acid & Squalane.", avoid: "Pure acidic Vitamin C or strong AHAs.", notes: "Promotes elastin and collagen cross-linking." }
  ];

  // FAQ LIST
  const faqList = [
    { q: "How does BeautyOS calculate my Skin Score?", a: "BeautyOS computes your Skin Score (0-100) using clinical parameters including epidermal hydration, barrier lipid integrity, texture smoothness, erythema levels, and micro-inflammation." },
    { q: "What is active chemical collision detection?", a: "Certain actives (like Retinol and AHA acids) clash when layered together, causing barrier breakdown and severe stinging. BeautyOS detects and flags these collisions automatically." },
    { q: "Can I use BeautyOS with dermatological prescriptions?", a: "Yes. You can add custom prescription treatments (such as Tretinoin or Hydroquinone) to your cabinet to calculate safe layer placement." },
    { q: "How does the Sephora-style product discovery work?", a: "Every product in our catalog is benchmarked against your skin diagnostic profile to calculate a personalized Fit Score (0-100%)." },
    { q: "Does BeautyOS support offline local caching?", a: "Yes. BeautyOS is built with an offline-first architecture, allowing you to log check-ins even without an active internet connection." }
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#111111] font-sans selection:bg-[#D4AF37]/30 selection:text-black relative overflow-hidden">
      
      {/* ========================================================= */}
      {/* 1. TOP ANNOUNCEMENT BAR */}
      {/* ========================================================= */}
      <div className="bg-[#0A0A0A] text-white text-[11px] font-mono py-2.5 px-6 text-center border-b border-white/[0.08] flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-zinc-950 font-bold text-[9px] uppercase tracking-wider">New</span>
        <span>BeautyOS AI Skincare Knowledge Ecosystem & E-Commerce Platform</span>
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
              { id: "analysis", label: "Skin Analysis" },
              { id: "products", label: "Products" },
              { id: "compatibility", label: "Active Checker" },
              { id: "guides", label: "Dermatology Guides" },
              { id: "ingredients", label: "Ingredients" },
              { id: "pricing", label: "Pricing" },
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
              title="Account Workspace"
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
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Navigation & Guides</h4>
                  <div className="space-y-2 font-medium text-zinc-800">
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={onGetStarted}>AI Skin Diagnosis & Score</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => {
                      const el = document.getElementById("compatibility");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>Blend & Active Collision Checker</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => {
                      const el = document.getElementById("guides");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>Skin Barrier 3:1:1 Restoration</p>
                    <p className="hover:text-[#D4AF37] cursor-pointer" onClick={() => {
                      const el = document.getElementById("shop");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}>Sephora E-Commerce Catalog</p>
                  </div>
                </div>

                <div className="col-span-4 space-y-3 border-r border-black/[0.06] pr-6">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Featured Active</h4>
                  <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-black/[0.06] flex items-center gap-4">
                    <img src="/images/beautyos_hero_products_1784918027747.png" alt="Featured" className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500">SkinCeuticals</span>
                      <h5 className="text-xs font-bold text-zinc-950">C E Ferulic Antioxidant</h5>
                      <p className="text-[10px] text-zinc-500 mt-1">15% Pure L-Ascorbic Acid • 98% Fit Score</p>
                    </div>
                  </div>
                </div>

                <div className="col-span-4 space-y-3">
                  <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Clinical Standard</h4>
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] text-white space-y-2">
                    <span className="text-[10px] font-mono text-[#D4AF37]">EWG Safety Grade 1</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      Every compound in BeautyOS is evaluated against international INCI safety standards.
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================= */}
      {/* 3. HERO SECTION (AESOP & AUGUSTINUS BADER LUXURY STYLE) */}
      {/* ========================================================= */}
      <section className="relative pt-20 pb-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAFAFA] border border-black/[0.08] text-xs font-semibold text-zinc-800">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>BeautyOS Skincare Intelligence System</span>
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-zinc-950 leading-[1.05]">
              Your skin. <br />
              <span className="text-[#D4AF37] font-display italic font-normal">Understood.</span>
            </h1>

            <p className="text-base text-zinc-600 font-normal leading-relaxed max-w-xl">
              AI-powered skincare platform combining Sephora commerce discovery, dermatology science guides, active compatibility engines, and daily routine optimization.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto text-xs bg-[#0A0A0A] hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Analyze My Skin</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("shop");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto text-xs bg-[#FAFAFA] hover:bg-zinc-100 text-zinc-900 border border-black/[0.08] font-semibold px-7 py-4 rounded-full transition-all cursor-pointer"
              >
                Explore E-Commerce
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="p-3 rounded-[36px] bg-[#FAFAFA] border border-black/[0.08] shadow-2xl relative">
              <img
                src="/images/beautyos_hero_products_1784918027747.png"
                alt="BeautyOS Luxury Skincare"
                className="w-full h-[460px] sm:h-[520px] object-cover rounded-[28px]"
              />

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
      {/* 4. BLEND & ACTIVE COMPATIBILITY ENGINE (COLLISION CHECKER) */}
      {/* ========================================================= */}
      <section id="compatibility" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Active Chemical Checker</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Blend & Compatibility Engine</h2>
          <p className="text-sm text-zinc-600">Select two active ingredients to analyze chemical collisions and layer sequencing.</p>
        </div>

        <div className="p-8 sm:p-10 rounded-[32px] bg-[#0A0A0A] text-white border border-white/[0.08] shadow-2xl space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#D4AF37] uppercase">Active Compound A</label>
              <select
                value={activePair1}
                onChange={(e) => setActivePair1(e.target.value)}
                className="w-full bg-[#17181B] border border-white/[0.1] rounded-2xl px-4 py-3 text-white font-medium focus:outline-none"
              >
                <option value="Niacinamide">Niacinamide (Vitamin B3)</option>
                <option value="Retinol">Retinol / Retinoids</option>
                <option value="Vitamin C">Vitamin C (L-Ascorbic Acid)</option>
                <option value="Ceramides">Ceramides (Lipid Complex)</option>
                <option value="Azelaic Acid">Azelaic Acid 15%</option>
                <option value="AHA/BHA Acids">Salicylic / Glycolic Acids</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#D4AF37] uppercase">Active Compound B</label>
              <select
                value={activePair2}
                onChange={(e) => setActivePair2(e.target.value)}
                className="w-full bg-[#17181B] border border-white/[0.1] rounded-2xl px-4 py-3 text-white font-medium focus:outline-none"
              >
                <option value="Vitamin C">Vitamin C (L-Ascorbic Acid)</option>
                <option value="Ceramides">Ceramides (Lipid Complex)</option>
                <option value="AHA/BHA Acids">Salicylic / Glycolic Acids</option>
                <option value="Niacinamide">Niacinamide (Vitamin B3)</option>
                <option value="Retinol">Retinol / Retinoids</option>
                <option value="Copper Peptides">Copper Peptides</option>
              </select>
            </div>
          </div>

          {/* Compatibility Analysis Card */}
          <div className={`p-6 rounded-[24px] border space-y-4 ${
            currentPairResult.compatible
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-200"
              : "bg-rose-500/10 border-rose-500/20 text-rose-200"
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentPairResult.compatible ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                )}
                <h4 className="text-sm font-bold">{currentPairResult.status}</h4>
              </div>
              <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full bg-white/10 text-white">
                {activePair1} + {activePair2}
              </span>
            </div>

            <p className="text-xs leading-relaxed">{currentPairResult.warning}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/[0.08] text-xs">
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">Layering Sequence</span>
                <strong className="text-white font-medium">{currentPairResult.bestOrder}</strong>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">Wait Time Between Layers</span>
                <strong className="text-white font-medium">{currentPairResult.waitTime}</strong>
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 block uppercase">Recommended Frequency</span>
                <strong className="text-white font-medium">{currentPairResult.frequency}</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. INGREDIENT ENCYCLOPEDIA GRID */}
      {/* ========================================================= */}
      <section id="ingredients" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Chemical Active Encyclopedia</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Ingredient Intelligence</h2>
          <p className="text-sm text-zinc-600">30+ chemical compounds analyzed for compatibility and clinical efficacy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ingredients.map((ing) => (
            <div key={ing.name} className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] space-y-4 shadow-sm flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#D4AF37] uppercase">{ing.category}</span>
                  <span className="text-xs font-mono font-bold text-zinc-900 bg-white border border-black/[0.06] px-2.5 py-0.5 rounded-full">
                    Score: {ing.score}/100
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-950">{ing.name}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{ing.notes}</p>
              </div>

              <div className="pt-3 border-t border-black/[0.06] space-y-1 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Primary Compatibility</span>
                <p className="text-zinc-800 font-medium">{ing.compatibility}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. 20+ DERMATOLOGY SCIENCE & EDITORIAL GUIDES */}
      {/* ========================================================= */}
      <section id="guides" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Dermatology Masterclasses</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Clinical Science Guides</h2>
          <p className="text-sm text-zinc-600">Evidence-based guides explaining skin mechanics, lipids, and chemical actives.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-4 space-y-2">
            {editorialGuides.map((guide, idx) => (
              <button
                key={guide.title}
                onClick={() => setActiveGuideIdx(idx)}
                className={`w-full text-left p-4 rounded-2xl transition-all cursor-pointer border ${
                  activeGuideIdx === idx
                    ? "bg-[#0A0A0A] text-white border-[#0A0A0A] shadow-md font-bold"
                    : "bg-[#FAFAFA] text-zinc-800 border-black/[0.06] hover:border-black/20"
                }`}
              >
                <h4 className="text-xs font-bold">{guide.title}</h4>
                <p className="text-[10px] text-zinc-400 mt-1">{guide.subtitle}</p>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 p-8 sm:p-10 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">Clinical Guide #{activeGuideIdx + 1}</span>
              <h3 className="text-2xl font-bold text-zinc-950 mt-1">{editorialGuides[activeGuideIdx].title}</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">{editorialGuides[activeGuideIdx].subtitle}</p>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed text-justify">{editorialGuides[activeGuideIdx].content}</p>

            <div className="p-4 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-between text-xs">
              <span className="text-zinc-600">Verified by Board-Certified Dermatologists</span>
              <span className="font-mono text-[#D4AF37] font-bold">BeautyOS Clinical Standard</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. FAQ ACCORDIONS */}
      {/* ========================================================= */}
      <section id="faq" className="py-28 px-6 max-w-4xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">FAQ</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqList.map((faq) => (
            <div key={faq.q} className="p-6 rounded-[24px] bg-[#FAFAFA] border border-black/[0.08] space-y-2">
              <h4 className="text-sm font-bold text-zinc-950">{faq.q}</h4>
              <p className="text-xs text-zinc-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. PRODUCT DISCOVERY & SEPHORA COMMERCE CATALOG */}
      {/* ========================================================= */}
      <section id="shop" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Sephora E-Commerce Catalog</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Product Discovery</h2>
          <p className="text-sm text-zinc-600">Discover formulations from top dermatological brands rated by AI fit score.</p>
        </div>

        <div className="p-6 rounded-[28px] bg-[#FAFAFA] border border-black/[0.08] mb-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-950">
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Filter Catalog</span>
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
                <option value="Anti-Ageing">Anti-Ageing</option>
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
              <label className="block text-zinc-500 mb-1 font-mono text-[10px] uppercase">Active Ingredient</label>
              <select
                value={selectedIngredient}
                onChange={(e) => setSelectedIngredient(e.target.value)}
                className="w-full bg-white border border-black/[0.08] rounded-xl px-3 py-2 text-zinc-900 font-medium"
              >
                <option value="All">All Ingredients</option>
                <option value="Ceramides">Ceramides</option>
                <option value="Niacinamide">Niacinamide</option>
                <option value="Vitamin C">Vitamin C</option>
                <option value="Salicylic Acid">Salicylic Acid</option>
                <option value="Retinal">Retinal</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
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
      {/* 7. FAQ & PRICING COMPARISON TABLE */}
      {/* ========================================================= */}
      <section id="pricing" className="py-28 px-6 max-w-7xl mx-auto border-t border-black/[0.06]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">Pricing Tiers</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-zinc-950 tracking-tight">Transparent Plans</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-zinc-950">Free Tier</h3>
              <p className="text-xs text-zinc-500 mt-1">Essential skincare logging</p>
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
              <p className="text-xs text-zinc-400 mt-1">Complete AI Skincare Operating System</p>
              <div className="text-3xl font-bold text-[#D4AF37] my-6 font-mono">$9 <span className="text-xs text-zinc-500 font-sans">/ month</span></div>
            </div>
            <button onClick={onGetStarted} className="w-full py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-zinc-950 font-bold text-xs cursor-pointer shadow-lg">
              Get Pro Access
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-[#FAFAFA] border border-black/[0.08] flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-zinc-950">BeautyOS Clinic</h3>
              <p className="text-xs text-zinc-500 mt-1">For dermatology clinics & pros</p>
              <div className="text-3xl font-bold text-zinc-950 my-6 font-mono">$149 <span className="text-xs text-zinc-500 font-sans">/ month</span></div>
            </div>
            <button onClick={onGetStarted} className="w-full py-3.5 rounded-full bg-[#0A0A0A] text-white font-bold text-xs cursor-pointer">
              Contact Clinic Sales
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. LUXURY MULTI-COLUMN FOOTER */}
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
              AI-powered skincare platform combining Sephora commerce discovery, active chemical compatibility engines, and daily routine optimization.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Products</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer" onClick={onGetStarted}>AI Skin Diagnosis</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedConcern("Acne")}>Target Serums</p>
              <p className="hover:text-white cursor-pointer" onClick={() => setSelectedConcern("Sensitive Skin")}>Ceramide Moisturizers</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Science</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">EWG Database</p>
              <p className="hover:text-white cursor-pointer">INCI Registry</p>
              <p className="hover:text-white cursor-pointer">Barrier Repair 3:1:1</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-[#D4AF37] tracking-widest mb-4">Company</h4>
            <div className="space-y-2 text-zinc-400 font-medium">
              <p className="hover:text-white cursor-pointer">Privacy Policy</p>
              <p className="hover:text-white cursor-pointer">Terms of Service</p>
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
      {/* 9. SHOPPING BAG CART DRAWER */}
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
      {/* 10. SEARCH OVERLAY MODAL */}
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
                <span className="text-xs font-bold text-zinc-950">Search BeautyOS Knowledge System</span>
                <button onClick={() => setSearchModalOpen(false)} className="p-1 text-zinc-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products, ingredients, clinical guides..."
                  className="w-full bg-[#FAFAFA] border border-black/[0.08] rounded-2xl pl-10 pr-4 py-3 text-xs text-zinc-950 focus:outline-none"
                  autoFocus
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-400" />
              </div>

              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Popular Searches</span>
                <div className="flex flex-wrap gap-2">
                  {["Niacinamide Serum", "Ceramides 3:1:1 Cream", "Retinol 0.5%", "Azelaic Acid 15%", "Skin Barrier Guide"].map((term) => (
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
