/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  LineChart,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Droplets,
  Award,
  MessageSquare,
  X,
  ChevronDown,
  ChevronRight,
  Database,
  FlaskConical,
  Microscope,
  Dna,
  Sun,
  Moon
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [demoOpen, setDemoOpen] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [chartTab, setChartTab] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setNewsletterEmail("");
    }
  };

  // --------------------------------------------------------------------------
  // SECTION DATA
  // --------------------------------------------------------------------------

  // Section 2: Why BeautyOS
  const whyCards = [
    {
      icon: Sparkles,
      title: "AI Skin Analysis",
      description: "Real-time diagnostic analysis of hydration levels, redness vectors, and barrier lipid stability.",
      metric: "99.4% Diagnostic Accuracy",
    },
    {
      icon: Zap,
      title: "Ingredient Intelligence",
      description: "Automated chemical matrix checking active PH collision and formula compatibility in real time.",
      metric: "12,000+ Formulas Cataloged",
    },
    {
      icon: ShieldCheck,
      title: "Routine Builder",
      description: "Optimized morning and evening layer sequencing for maximum cellular absorption without barrier clash.",
      metric: "AM / PM Layer Precision",
    },
    {
      icon: LineChart,
      title: "Progress Tracking",
      description: "Apple Health inspired visual analytics tracking long-term barrier recovery and photo timelines.",
      metric: "Skin Index (0-100)",
    },
  ];

  // Section 3: How It Works Timeline
  const workflowSteps = [
    { step: "01", title: "Create Profile", desc: "Diagnostic skin type, sensitivity & goals assessment." },
    { step: "02", title: "Add Products", desc: "Scan or search your cabinet cosmetics & PAO dates." },
    { step: "03", title: "Build Routine", desc: "Algorithmic AM/PM layer sequencing for max absorption." },
    { step: "04", title: "Daily Check-ins", desc: "Log hydration, sleep, water intake & skin index." },
    { step: "05", title: "Understand Your Skin", desc: "AI-guided routine adjustments to eliminate redness." },
  ];

  // Section 4: Ingredient Intelligence
  const ingredients = [
    {
      name: "Niacinamide",
      category: "Vitamin B3",
      score: 98,
      benefits: ["Restores skin barrier lipids", "Regulates sebum production", "Calms redness & blotchiness"],
      compatibility: "Pairs exceptionally with Hyaluronic Acid & Ceramides.",
      warnings: "Avoid simultaneous high-concentration layering with direct L-Ascorbic Acid.",
      notes: "EWG Grade 1. Clinically validated for pore refinement at 2-5% concentration.",
      accent: "#E5C158",
    },
    {
      name: "Ceramides",
      category: "Lipid Complex",
      score: 99,
      benefits: ["Seals intercellular moisture", "Repairs compromised skin barrier", "Protects against environmental aggressors"],
      compatibility: "Universal compatibility across all skin types and active layers.",
      warnings: "None. Essential for daily barrier health.",
      notes: "Formulated in physiological 3:1:1 lipid ratio matching human stratum corneum.",
      accent: "#34D399",
    },
    {
      name: "Vitamin C",
      category: "L-Ascorbic Acid",
      score: 95,
      benefits: ["Fades hyperpigmentation", "Neutralizes environmental free radicals", "Boosts morning SPF photoprotection"],
      compatibility: "Ideal under morning SPF. Avoid mixing with Retinol or BHA.",
      warnings: "Oxidizes when exposed to sunlight; store in dark opaque glass.",
      notes: "Clinically stable at pH 3.0-3.5 for maximum transepidermal delivery.",
      accent: "#FBBF24",
    },
    {
      name: "Retinol",
      category: "Vitamin A",
      score: 92,
      benefits: ["Accelerates cellular renewal", "Stimulates collagen synthesis", "Refines skin texture & fine lines"],
      compatibility: "Best paired with Ceramides at night. Avoid Salicylic Acid on same layer.",
      warnings: "Increases photosensitivity; mandatory morning SPF 50+ usage.",
      notes: "Encapsulated time-release formulation reduces erythema risk.",
      accent: "#F87171",
    },
    {
      name: "Hyaluronic Acid",
      category: "Humectant",
      score: 97,
      benefits: ["Binds up to 1000x weight in water", "Plumps dehydration micro-lines", "Delivers immediate dewy radiance"],
      compatibility: "Universal compatibility across all routine layers.",
      warnings: "Apply strictly to damp skin to prevent drawing moisture out of skin tissue.",
      notes: "Multi-molecular weight matrix penetrates both surface & deep dermal layers.",
      accent: "#60A5FA",
    },
  ];

  // Section 5: Science Infographics
  const scienceItems = [
    {
      icon: Database,
      title: "EWG Safety Database",
      desc: "Every cosmetic ingredient is cross-referenced against Environmental Working Group hazard scores (1-10)."
    },
    {
      icon: Microscope,
      title: "INCI Standardization",
      desc: "Raw chemical formulas are normalized into standard International Nomenclature Cosmetic Ingredient names."
    },
    {
      icon: FlaskConical,
      title: "Barrier Repair Chemistry",
      desc: "Algorithmic analysis of physiological lipids (Ceramides, Cholesterol, Fatty Acids) in precise 3:1:1 balance."
    },
    {
      icon: Dna,
      title: "Microbiome Protection",
      desc: "pH-balanced formulation tracking ensures optimal skin acid mantle protection (pH 4.7 - 5.5)."
    }
  ];

  // Section 10: FAQ (10 Accordion Questions)
  const faqList = [
    {
      q: "How does BeautyOS calculate my Skin Index score?",
      a: "BeautyOS combines your daily hydration levels, redness indicators, barrier sensitivity, sleep duration, and water intake using a clinical weighted algorithm to compute your real-time Skin Index from 0 to 100."
    },
    {
      q: "What is active ingredient collision detection?",
      a: "Certain active compounds (like Retinol and Vitamin C or Salicylic Acid) collide when applied in the same routine layer, causing pH disruption and barrier damage. BeautyOS automatically flags these collisions before you apply them."
    },
    {
      q: "How does the PAO (Period-After-Opening) tracking work?",
      a: "When you add a product to your digital cabinet, BeautyOS calculates its active shelf life based on the opened date and alerts you before formulas oxidize or lose clinical potency."
    },
    {
      q: "Can I use BeautyOS with prescription dermatology treatments?",
      a: "Yes. BeautyOS allows you to add custom prescription formulas (e.g. Tretinoin, Azelaic Acid) to your cabinet so the compatibility engine can adjust your routine layers safely."
    },
    {
      q: "Is my personal skin photo timeline private and encrypted?",
      a: "All skin progress photos are encrypted locally on your device and never sold or shared with third parties. Your privacy is protected by default."
    },
    {
      q: "Does BeautyOS work offline if I lose internet connection?",
      a: "Yes. BeautyOS features an offline-first sync architecture. All daily check-ins and routine completions are cached locally and automatically synced when reconnected."
    },
    {
      q: "How does the AI Assistant provide personalized recommendations?",
      a: "The BeautyOS AI Assistant analyzes your log history, cabinet formulas, and hydration trends to offer actionable advice tailored to your specific skin state."
    },
    {
      q: "What is the difference between Free, Pro, and Lifetime plans?",
      a: "The Free plan supports up to 5 cabinet products and basic routine tracking. Pro and Lifetime plans unlock unlimited cabinet inventory, AI collision detection, Apple-style analytics, and unlimited AI assistant guidance."
    },
    {
      q: "Can I export my skin log data for a dermatologist visit?",
      a: "Yes. You can export a comprehensive PDF or JSON report of your daily Skin Index, ingredient logs, and symptom timeline directly from the Profile tab."
    },
    {
      q: "How do I get started with BeautyOS?",
      a: "Click 'Get Started', create your account or test in bypass mode, complete the 2-minute diagnostic onboarding, and start building your intelligent routine immediately."
    }
  ];

  return (
    <div className="bg-[#0A0A0A] text-[#F4F4F5] font-sans selection:bg-[#E5C158]/30 selection:text-white relative overflow-hidden">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#E5C158]/12 via-[#D4AF37]/5 to-transparent blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[1800px] left-0 w-[600px] h-[600px] bg-[#E5C158]/5 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-[3600px] right-0 w-[700px] h-[700px] bg-amber-500/5 blur-[200px] pointer-events-none rounded-full" />

      {/* Global Glass Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#E5C158]/20 to-[#D4AF37]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158]">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white font-mono">
              BeautyOS<span className="text-[#E5C158]">™</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-xs text-[#A1A1AA] font-medium tracking-wide">
            <a href="#why" className="hover:text-white transition-colors">Why BeautyOS</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#ingredients" className="hover:text-white transition-colors">Ingredients</a>
            <a href="#science" className="hover:text-white transition-colors">Science</a>
            <a href="#progress" className="hover:text-white transition-colors">Progress</a>
            <a href="#ai" className="hover:text-white transition-colors">AI Intelligence</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onGetStarted}
              className="text-xs text-[#A1A1AA] hover:text-white font-medium px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onGetStarted}
              className="text-xs bg-[#E5C158] hover:bg-[#F7E7B4] text-zinc-950 font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-[#E5C158]/15 cursor-pointer hover:scale-102"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* SECTION 1: HERO */}
      {/* ========================================================= */}
      <section className="relative min-h-screen pt-36 pb-20 px-6 max-w-6xl mx-auto flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto z-10">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#101114] border border-white/[0.08] text-[11px] text-zinc-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-pulse" />
              <span>Personal Skincare Operating System</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08] font-sans">
              The operating system <br />
              <span className="gradient-gold font-display italic font-normal">for healthier skin.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1AA] font-normal leading-relaxed max-w-xl">
              Build smarter routines. Understand ingredients. Track your progress with AI. Make better skincare decisions.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onGetStarted}
                className="w-full sm:w-auto text-xs bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:brightness-110 text-zinc-950 font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-[#E5C158]/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setDemoOpen(true)}
                className="w-full sm:w-auto text-xs bg-[#101114] hover:bg-[#17181B] text-white border border-white/[0.08] font-medium px-7 py-4 rounded-full transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:border-white/20"
              >
                <Play className="w-4 h-4 text-[#E5C158] fill-[#E5C158]" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>

          {/* Right Side Mockup & Floating Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="p-4 rounded-[32px] bg-[#101114]/90 border border-white/[0.08] backdrop-blur-xl shadow-2xl relative overflow-hidden">
              <img
                src="/images/beautyos_hero_products_1784918027747.png"
                alt="BeautyOS Luxury Operating System"
                className="w-full h-[400px] sm:h-[460px] object-cover rounded-[24px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-70 pointer-events-none rounded-[24px]" />

              {/* Floating Badge 1: Skin Index */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-6 left-6 p-4 rounded-2xl bg-[#101114]/95 backdrop-blur-xl border border-white/[0.08] flex items-center gap-3 shadow-xl"
              >
                <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center font-bold font-mono text-sm">
                  86
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Skin Index</p>
                  <p className="text-[10px] text-[#A1A1AA]">Optimal Barrier Status</p>
                </div>
              </motion.div>

              {/* Floating Badge 2: Ingredient Collision Check */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-6 right-6 p-4 rounded-2xl bg-[#101114]/95 backdrop-blur-xl border border-white/[0.08] flex items-center gap-3 shadow-xl max-w-xs"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Zero Active Collisions</p>
                  <p className="text-[10px] text-[#A1A1AA]">Niacinamide + Ceramides Layer</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: WHY BEAUTYOS */}
      {/* ========================================================= */}
      <section id="why" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 02</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Why BeautyOS</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Engineered for individuals who view skincare as high precision personal health.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl hover:border-[#E5C158]/40 transition-all duration-300 group shadow-sm flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#17181B] border border-white/[0.08] flex items-center justify-center text-[#E5C158] mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{card.description}</p>
                </div>
                <div className="pt-6 border-t border-white/[0.04] mt-6 flex items-center justify-between text-[11px] text-[#E5C158] font-mono">
                  <span>{card.metric}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: HOW IT WORKS (TIMELINE) */}
      {/* ========================================================= */}
      <section id="how" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 03</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">How It Works</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">A systematic workflow to build and refine your personal skincare operating system.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {workflowSteps.map((ws, idx) => (
            <motion.div
              key={ws.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl relative flex flex-col justify-between h-full"
            >
              <div>
                <span className="text-xs font-mono font-bold text-[#E5C158] block mb-3">Step {ws.step}</span>
                <h3 className="text-base font-bold text-white mb-2">{ws.title}</h3>
                <p className="text-xs text-[#A1A1AA] leading-relaxed">{ws.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <div className="w-2 h-2 rounded-full bg-[#E5C158]" />
                {idx < 4 && <ChevronRight className="w-4 h-4 text-zinc-600 hidden md:block" />}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: INGREDIENT INTELLIGENCE */}
      {/* ========================================================= */}
      <section id="ingredients" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 04</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Ingredient Intelligence</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">In-depth chemical breakdown of key active ingredients and safety profiles.</p>
        </div>

        {/* Ingredient Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8">
          {ingredients.map((ing, idx) => (
            <button
              key={ing.name}
              onClick={() => setActiveIngredient(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap border ${
                activeIngredient === idx
                  ? "bg-[#E5C158] text-zinc-950 border-[#E5C158] font-bold shadow-lg shadow-[#E5C158]/20"
                  : "bg-[#101114] text-[#A1A1AA] border-white/[0.08] hover:text-white"
              }`}
            >
              {ing.name}
            </button>
          ))}
        </div>

        {/* Selected Ingredient Card */}
        {(() => {
          const ing = ingredients[activeIngredient];
          return (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="p-8 sm:p-10 rounded-[32px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl relative shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
                
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">{ing.category}</span>
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mt-1">{ing.name}</h3>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Clinical Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {ing.benefits.map((b) => (
                        <span key={b} className="px-3.5 py-1.5 rounded-full bg-[#17181B] border border-white/[0.08] text-xs text-zinc-200 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#17181B] border border-white/[0.08]">
                      <h4 className="text-xs font-semibold text-[#E5C158] mb-1">Compatibility</h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">{ing.compatibility}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                      <h4 className="text-xs font-semibold text-rose-300 mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        Warnings
                      </h4>
                      <p className="text-xs text-rose-200/90 leading-relaxed">{ing.warnings}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08]">
                    <h4 className="text-xs font-semibold text-zinc-300 mb-1">Clinical & EWG Notes</h4>
                    <p className="text-xs text-[#A1A1AA] font-mono">{ing.notes}</p>
                  </div>
                </div>

                {/* Score Gauge */}
                <div className="w-full lg:w-auto p-8 rounded-[28px] bg-zinc-950 border border-white/[0.08] flex flex-col items-center justify-center text-center shrink-0">
                  <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-widest">Scientific Score</span>
                  <div className="text-5xl sm:text-6xl font-bold text-white my-3 font-mono">
                    {ing.score}<span className="text-xs text-zinc-500 font-sans">/100</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    High Efficacy Rating
                  </span>
                </div>

              </div>
            </motion.div>
          );
        })()}
      </section>

      {/* ========================================================= */}
      {/* SECTION 5: SCIENCE (EWG & CLINICAL INFOGRAPHICS) */}
      {/* ========================================================= */}
      <section id="science" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 05</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Scientific Approach</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Standardized ingredient databases and biochemical barrier research.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scienceItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span>Clinically Validated</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: PROGRESS (APPLE HEALTH INSPIRED) */}
      {/* ========================================================= */}
      <section id="progress" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 06</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Progress Analytics</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Apple Health inspired visualization of your daily Skin Index and hydration trends.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-[#E5C158]">Metric: Skin Index</span>
                <h3 className="text-2xl font-bold text-white">Hydration & Barrier Stability</h3>
              </div>

              <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-full border border-white/[0.08] text-xs">
                {(["weekly", "monthly", "yearly"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setChartTab(t)}
                    className={`px-3.5 py-1.5 rounded-full capitalize transition-all cursor-pointer font-medium ${
                      chartTab === t ? "bg-[#E5C158] text-zinc-950 font-bold" : "text-[#A1A1AA] hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full h-60 relative my-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="goldArea2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E5C158" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#E5C158" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={
                    chartTab === "weekly"
                      ? "M0,110 Q80,95 160,65 T320,45 T500,20 L500,150 L0,150 Z"
                      : chartTab === "monthly"
                      ? "M0,130 Q100,80 200,90 T350,40 T500,30 L500,150 L0,150 Z"
                      : "M0,140 Q120,100 250,70 T380,50 T500,15 L500,150 L0,150 Z"
                  }
                  fill="url(#goldArea2)"
                />
                <path
                  d={
                    chartTab === "weekly"
                      ? "M0,110 Q80,95 160,65 T320,45 T500,20"
                      : chartTab === "monthly"
                      ? "M0,130 Q100,80 200,90 T350,40 T500,30"
                      : "M0,140 Q120,100 250,70 T380,50 T500,15"
                  }
                  fill="none"
                  stroke="#E5C158"
                  strokeWidth="3"
                />
                <circle cx="500" cy={chartTab === "weekly" ? "20" : chartTab === "monthly" ? "30" : "15"} r="6" fill="#FFF" stroke="#E5C158" strokeWidth="3" />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-4 border-t border-white/[0.04]">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
              <span className="text-[#E5C158] font-bold">Today (86/100)</span>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">7-Day Barrier Streak</h4>
                  <p className="text-[11px] text-[#A1A1AA]">Zero active collisions logged</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Hydration Master</h4>
                  <p className="text-[11px] text-[#A1A1AA]">+18% Epidermal moisture retention</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Redness Calming</h4>
                  <p className="text-[11px] text-[#A1A1AA]">Irritation index reduced to 1/5</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: AI ASSISTANT PREVIEW */}
      {/* ========================================================= */}
      <section id="ai" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 07</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">AI Assistant</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Conversational AI intelligence connected directly to your cabinet and daily check-ins.</p>
        </div>

        <div className="max-w-3xl mx-auto p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="flex items-center gap-3 pb-6 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E5C158] to-[#D4AF37] text-zinc-950 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">BeautyOS Clinical AI</h3>
              <p className="text-[10px] text-emerald-400 font-mono">Active • Monitoring Cabinet & Journal</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex justify-end">
              <div className="bg-[#1F2023] border border-white/[0.08] text-white px-5 py-3.5 rounded-2xl rounded-tr-none max-w-sm">
                How can I improve redness?
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#E5C158]/20 text-[#E5C158] flex items-center justify-center shrink-0 mt-1">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="bg-zinc-950 border border-white/[0.08] text-zinc-200 p-5 rounded-2xl rounded-tl-none space-y-4 leading-relaxed w-full">
                <p className="text-white font-medium">
                  Based on your journal, hydration has decreased for four consecutive days.
                </p>
                <p className="text-[#A1A1AA]">
                  Skipping retinol tonight may reduce irritation. Layer your Ceramide Barrier Cream on damp skin instead.
                </p>

                {/* Suggested Routine Card */}
                <div className="p-4 rounded-xl bg-[#101114] border border-white/[0.08] space-y-3">
                  <h4 className="text-[11px] font-mono text-[#E5C158] uppercase tracking-wider">AI Suggested Evening Routine</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-[#17181B] flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>1. Gentle Hydrating Cleanser</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#17181B] flex items-center gap-2">
                      <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span>2. Hyaluronic Serum (Damp Skin)</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#17181B] flex items-center gap-2 col-span-1 sm:col-span-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>3. Restorative Ceramide Barrier Cream</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Dermatological Safety Protocol Approved</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <input
              type="text"
              readOnly
              value="Type your skincare question..."
              className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-4 py-3 text-xs text-[#A1A1AA] focus:outline-none"
            />
            <button
              onClick={onGetStarted}
              className="px-5 py-3 rounded-2xl bg-[#E5C158] text-zinc-950 font-bold text-xs hover:bg-[#F7E7B4] transition-all shrink-0 cursor-pointer"
            >
              Ask AI
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: TESTIMONIALS */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 08</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Testimonials</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Minimalist feedback from dermatologists and routine enthusiasts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl space-y-4 flex flex-col justify-between">
            <p className="text-xs text-zinc-300 leading-relaxed italic">
              &quot;BeautyOS completely solved my barrier irritation. Being able to visualize chemical collisions stopped me from destroying my skin barrier with competing actives.&quot;
            </p>
            <div className="pt-4 border-t border-white/[0.04]">
              <h4 className="text-xs font-bold text-white">Dr. Elena Vancea</h4>
              <p className="text-[10px] text-[#A1A1AA]">Board Certified Dermatologist</p>
            </div>
          </div>

          <div className="p-8 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl space-y-4 flex flex-col justify-between">
            <p className="text-xs text-zinc-300 leading-relaxed italic">
              &quot;The Skin Index chart and Sephora-grade cabinet organizer make my routine feel like an elegant science experiment that actually works.&quot;
            </p>
            <div className="pt-4 border-t border-white/[0.04]">
              <h4 className="text-xs font-bold text-white">Mara Stan</h4>
              <p className="text-[10px] text-[#A1A1AA]">Skincare Editorial Creator</p>
            </div>
          </div>

          <div className="p-8 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl space-y-4 flex flex-col justify-between">
            <p className="text-xs text-zinc-300 leading-relaxed italic">
              &quot;The AI chat recommendation saved my skin during winter dryness. It identified that my hydration dropped and adjusted my evening routine instantly.&quot;
            </p>
            <div className="pt-4 border-t border-white/[0.04]">
              <h4 className="text-xs font-bold text-white">Alexandru Popa</h4>
              <p className="text-[10px] text-[#A1A1AA]">BeautyOS Pro Member</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: PRICING */}
      {/* ========================================================= */}
      <section id="pricing" className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 09</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Pricing</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Transparent access to intelligent skincare monitoring.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-white">Free</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">Essential skincare cabinet logging</p>
              <div className="text-3xl font-bold text-white my-6 font-mono">$0 <span className="text-xs font-sans text-zinc-500">/ forever</span></div>
              
              <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Up to 5 Cabinet Products
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Basic AM/PM Routine Planner
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Manual Skin Journal
                </li>
              </ul>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Start Free
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-[#17181B] border-2 border-[#E5C158] flex flex-col justify-between h-full relative shadow-2xl shadow-[#E5C158]/10 scale-102">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#E5C158] text-zinc-950 font-bold text-[10px] uppercase tracking-widest">
              Most Popular
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">Pro</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">Complete AI Skin Operating System</p>
              <div className="text-3xl font-bold text-white my-6 font-mono">$9 <span className="text-xs font-sans text-zinc-500">/ month</span></div>
              
              <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  Unlimited Cabinet Inventory & PAO Expiration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  AI Ingredient Collision Analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  Apple-Style Skin Index Charting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  Unlimited AI Assistant Access
                </li>
              </ul>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:brightness-110 text-zinc-950 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-[#E5C158]/20"
            >
              Get Pro Access
            </button>
          </div>

          <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-white">Lifetime</h3>
              <p className="text-xs text-[#A1A1AA] mt-1">One-time payment for ultimate access</p>
              <div className="text-3xl font-bold text-white my-6 font-mono">$149 <span className="text-xs font-sans text-zinc-500">/ once</span></div>
              
              <ul className="space-y-3 text-xs text-zinc-300 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  All Pro Features Included Forever
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Priority AI Processing & Support
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Early Access to Beta Upgrades
                </li>
              </ul>
            </div>

            <button
              onClick={onGetStarted}
              className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] text-white text-xs font-semibold transition-all cursor-pointer"
            >
              Get Lifetime
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: FAQ (10 ACCORDION ITEMS) */}
      {/* ========================================================= */}
      <section id="faq" className="py-28 px-6 max-w-4xl mx-auto border-t border-white/[0.04]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#E5C158]">Section 10</p>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-[#A1A1AA]">Everything you need to know about BeautyOS technology and safety.</p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, idx) => {
            const isOpen = expandedFaq === idx;
            return (
              <div
                key={faq.q}
                className="rounded-[24px] bg-[#101114] border border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-[#17181B] transition-colors"
                >
                  <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#E5C158] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-xs text-[#A1A1AA] leading-relaxed border-t border-white/[0.04] pt-4">
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
      {/* SECTION 11: FINAL CTA */}
      {/* ========================================================= */}
      <section className="py-28 px-6 max-w-6xl mx-auto border-t border-white/[0.04] text-center">
        <div className="p-12 sm:p-16 rounded-[36px] bg-gradient-to-b from-[#17181B] to-[#101114] border border-white/[0.08] max-w-3xl mx-auto space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Ready to understand your skin?
          </h2>

          <p className="text-sm text-[#A1A1AA] max-w-lg mx-auto">
            Join thousands of users optimizing their skincare routines with high-precision clinical artificial intelligence.
          </p>

          <button
            onClick={onGetStarted}
            className="text-xs bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:brightness-110 text-zinc-950 font-bold px-9 py-4 rounded-full transition-all shadow-xl shadow-[#E5C158]/20 inline-flex items-center gap-2 cursor-pointer hover:scale-102"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================= */}
      {/* FOOTER WITH NEWSLETTER */}
      {/* ========================================================= */}
      <footer className="border-t border-white/[0.08] py-16 px-6 max-w-6xl mx-auto text-xs text-zinc-500 space-y-12">
        
        {/* Newsletter Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-[28px] bg-[#101114] border border-white/[0.08]">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold text-white">Subscribe to Skincare Intelligence</h4>
            <p className="text-xs text-[#A1A1AA]">Weekly dermatological research updates and ingredient matrix breakdowns.</p>
          </div>

          {newsletterSent ? (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-4 py-3 rounded-2xl border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
              <span>Subscribed to BeautyOS Intelligence Dispatch!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email..."
                className="bg-zinc-950 border border-white/[0.08] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#E5C158]/50 w-full sm:w-64"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-[#E5C158] text-zinc-950 font-bold text-xs hover:bg-[#F7E7B4] cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/[0.04] pt-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-white font-mono">BeautyOS™</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Watch Demo Modal */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#101114] border border-white/[0.08] rounded-[28px] max-w-2xl w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#E5C158]" />
                <h3 className="text-sm font-bold text-white">BeautyOS Demonstration Studio</h3>
              </div>
              <button
                onClick={() => setDemoOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-zinc-950 rounded-2xl border border-white/[0.08] flex flex-col items-center justify-center text-center p-6 space-y-3 relative overflow-hidden">
              <img
                src="/images/beautyos_showcase_phone_1784918045920.png"
                alt="Demo Preview"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div
                className="w-16 h-16 rounded-full bg-[#E5C158] text-zinc-950 flex items-center justify-center z-10 shadow-xl cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  setDemoOpen(false);
                  onGetStarted();
                }}
              >
                <Play className="w-8 h-8 fill-zinc-950 ml-1" />
              </div>
              <p className="text-xs font-semibold text-white z-10">Click to Launch Interactive Operating System</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setDemoOpen(false);
                  onGetStarted();
                }}
                className="px-6 py-2.5 rounded-full bg-[#E5C158] text-zinc-950 font-bold text-xs hover:bg-[#F7E7B4] cursor-pointer"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
