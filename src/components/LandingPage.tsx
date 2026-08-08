"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Dumbbell,
  Apple,
  Pill,
  Activity,
  Zap,
  Sparkles,
  Brain,
  Flame,
  Droplets,
  Award,
  CheckCircle2,
  ChevronRight,
  Send
} from "lucide-react";
import { ECOSYSTEM_CONFIG } from "@/lib/ecosystem/config";
import { sendTelemetryEvent } from "@/lib/analytics/telemetry";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const [selectedPersona, setSelectedPersona] = useState<"Men" | "Women" | "Athletes">("Men");

  const personaContent = {
    Men: {
      badge: "Men's Health & Performance Ecosystem",
      headline: "Engineered for Peak Male Bio-Performance & Longevity",
      desc: "Hypertrophy training, endogenous testosterone support, scalp follicle defense, visceral fat loss, and executive energy.",
      outcomes: [
        { title: "Testosterone & Vitality", desc: "Optimize sleep, zinc, Vitamin D3, and heavy resistance triggers." },
        { title: "Hypertrophy & Power", desc: "Progressive overload loading protocols backed by leucine threshold science." },
        { title: "Follicle & Scalp Defense", desc: "Micro-circulation, topical DHT suppression, and scalp microbiome balance." },
        { title: "Executive Energy & Clarity", desc: "Mitochondrial ATP production and circadian cortisol alignment." }
      ],
      cta: "/guides/men"
    },
    Women: {
      badge: "Women's Health & Hormonal Architecture",
      headline: "Synchronized to Your Biology, Cycle & Dermal Health",
      desc: "Follicular/luteal phase training, PCOS sebum balance, menopause collagen preservation, and lean body recomposition.",
      outcomes: [
        { title: "Hormonal Cycle Alignment", desc: "Periodize nutrition and workout intensity with monthly hormonal shifts." },
        { title: "Dermal Collagen Integrity", desc: "Prevent TEWL and stimulate Type-I & III collagen synthesis." },
        { title: "PCOS & Sebum Control", desc: "Target insulin sensitivity and androgenic skin flare-ups with nutrition." },
        { title: "Lean Sculpting & Metabolism", desc: "Preserve muscle mass while accelerating sustainable fat loss." }
      ],
      cta: "/guides/women"
    },
    Athletes: {
      badge: "High-Performance Athletic Science",
      headline: "Maximum Output, Neural Speed & Accelerated Recovery",
      desc: "Creatine monohydrate ATP loading, VO2 max aerobic base, HRV monitoring, and systemic tissue restoration.",
      outcomes: [
        { title: "ATP Muscular Explosiveness", desc: "Saturate phosphocreatine stores for peak anaerobic force production." },
        { title: "VO2 Max & Heart Rate Zones", desc: "Zone 2 aerobic building combined with intense lactate threshold work." },
        { title: "Neural & Joint Recovery", desc: "Chelated magnesium, marine collagen peptides, and cryo-contrast routines." },
        { title: "Macro Peri-Workout Fueling", desc: "Precision timing of essential amino acids and rapid glycogen replenishment." }
      ],
      cta: "/fitness/build-muscle"
    }
  };

  const outcomeSections = [
    {
      icon: Droplets,
      tag: "Skin Intelligence",
      title: "Rebuild your dermal barrier and eliminate inflammation at the cellular source.",
      description: "Stop guessing with random skincare products. Access clinical-grade protocols for acne clearing, barrier repair, retinol retinoid adaptation, and collagen synthesis.",
      link: "/skin",
      linkLabel: "Explore Skin Protocols"
    },
    {
      icon: Dumbbell,
      tag: "Muscle & Performance",
      title: "Build dense skeletal muscle and increase physical force production.",
      description: "Science-backed hypertrophy programming, progressive volume overload, muscle protein synthesis triggers, and bio-mechanical adaptation.",
      link: "/fitness/build-muscle",
      linkLabel: "Explore Muscle Protocols"
    },
    {
      icon: Flame,
      tag: "Fat Loss Transformation",
      title: "Accelerate metabolic fat loss while preserving your lean muscle tissue.",
      description: "Target visceral fat stores through caloric deficit engineering, insulin sensitivity optimization, and non-exercise activity thermogenesis.",
      link: "/fitness/lose-fat",
      linkLabel: "Explore Fat Loss Blueprint"
    },
    {
      icon: Apple,
      tag: "Nutrition Intelligence",
      title: "Fuel your microbiome and regulate systemic blood sugar spikes.",
      description: "Precision macronutrient profiling, gut barrier restoration, nutrient-dense recipes, and continuous glucose monitoring strategies.",
      link: "/nutrition",
      linkLabel: "Explore Nutrition Science"
    },
    {
      icon: Pill,
      tag: "Supplement Science",
      title: "Clinical supplementation stacks formulated for maximum bio-availability.",
      description: "Eliminate waste with bio-active compounds: Creatine Monohydrate, Whey Isolate, Magnesium Glycinate, Omega-3 EPA/DHA, and NMN.",
      link: "/supplements",
      linkLabel: "Explore Supplement Library"
    },
    {
      icon: Brain,
      tag: "Longevity & Biohacking",
      title: "Extend your biological healthspan and protect cellular DNA integrity.",
      description: "NAD+ cellular energization, autophagy fasting protocols, deep sleep architecture enhancement, and HRV stress regulation.",
      link: "/longevity",
      linkLabel: "Explore Longevity Science"
    }
  ];

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-emerald-500/30 selection:text-white relative overflow-hidden">
      
      {/* FULL SCREEN CINEMATIC HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 px-6 max-w-[1440px] mx-auto">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
        
        <div className="text-center space-y-8 max-w-5xl mx-auto relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(16,185,129,0.15)]"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>HealthOS∞ Flagship Human Operating System</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white leading-[1.02]"
          >
            Understand your body. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
              Optimize your health.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed max-w-3xl mx-auto font-sans"
          >
            The world&apos;s premier operating system for skincare, fitness, nutrition, supplements, recovery, and cellular longevity. Engineered for both women and men.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-9 py-4 rounded-full transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer font-mono uppercase tracking-wider"
            >
              <span>Build My Health Profile</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
            
            <Link
              href="/contact"
              className="w-full sm:w-auto text-xs bg-zinc-900/90 border border-white/[0.12] hover:bg-white hover:text-zinc-950 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-wider shadow-lg"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Talk With Health Expert</span>
            </Link>

            <Link
              href="/guides"
              className="w-full sm:w-auto text-xs bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/40 text-zinc-300 hover:text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 font-mono uppercase tracking-wider"
            >
              <span>Explore Protocols</span>
            </Link>
          </motion.div>

          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-white/[0.08] text-left">
            <div>
              <p className="text-2xl font-bold font-mono text-white">224+</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Clinical Protocols</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">99.8%</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Evidence Confidence</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">100%</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Zero Placeholders</p>
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-white">24/7</p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono">AI Health Coach</p>
            </div>
          </div>

        </div>
      </section>

      {/* PERSONA / ONBOARDING SELECTOR */}
      <section className="py-20 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Personalized Biology</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">I want HealthOS for:</h2>
          <p className="text-zinc-400 font-sans text-base">Select your primary profile to tailor your health operating system experience.</p>
          
          <div className="inline-flex p-1.5 rounded-full bg-[#101114] border border-white/[0.1] gap-2 mt-4">
            {(["Men", "Women", "Athletes"] as const).map(p => (
              <button
                key={p}
                onClick={() => setSelectedPersona(p)}
                className={`px-8 py-3 rounded-full text-xs font-mono uppercase font-bold tracking-widest transition-all ${
                  selectedPersona === p 
                    ? "bg-emerald-500 text-zinc-950 shadow-lg shadow-emerald-500/20" 
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="p-10 sm:p-14 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 relative overflow-hidden">
          <div className="max-w-3xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
              {personaContent[selectedPersona].badge}
            </span>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              {personaContent[selectedPersona].headline}
            </h3>
            <p className="text-zinc-300 font-sans text-lg leading-relaxed">
              {personaContent[selectedPersona].desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {personaContent[selectedPersona].outcomes.map((o, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <h4 className="text-sm font-bold font-mono text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {o.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">{o.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link href={personaContent[selectedPersona].cta} className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
                Launch {selectedPersona} Blueprint →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOME-DRIVEN VERTICAL SECTIONS */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Flagship Verticals</span>
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">Outcome-Driven Health Science</h2>
          <p className="text-zinc-400 text-lg font-sans">Every protocol is engineered around measurable biological results, not empty promises.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomeSections.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div key={i} className="p-8 rounded-[36px] bg-[#101114] border border-white/[0.08] hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {sec.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug">{sec.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-sans">{sec.description}</p>
                </div>
                
                <div className="pt-8 mt-6 border-t border-white/[0.06]">
                  <Link href={sec.link} className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 flex items-center justify-between transition-colors">
                    <span>{sec.linkLabel}</span>
                    <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOMEPAGE ECOSYSTEM SECTION */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center space-y-4 mb-16">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
            Network Intelligence
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
            THE AiX ECOSYSTEM
          </h2>
          <p className="text-zinc-400 text-base max-w-2xl mx-auto font-sans">
            AiX Health operates as the health intelligence node within the broader AiX institutional ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_CONFIG.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl bg-[#0D0E12] border border-white/[0.08] hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                    {service.category}
                  </span>
                  {service.verified ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  ) : (
                    <span className="text-[9px] font-mono text-zinc-600">UNVERIFIED</span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 font-sans leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                {service.verified ? (
                  <a
                    href={service.href}
                    target={service.target}
                    rel={service.rel}
                    onClick={() => {
                      sendTelemetryEvent({
                        event: "ECOSYSTEM_CLICK",
                        sourceRoute: "/",
                        category: service.category,
                        metadata: { service: service.name, href: service.href },
                      });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold hover:underline"
                  >
                    <span>Launch Destination</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-zinc-600 cursor-not-allowed">
                    AiX Media: NOT VERIFIED — NOT LINKED
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI HEALTH COACH HIGHLIGHT */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="p-12 sm:p-16 rounded-[48px] bg-gradient-to-r from-emerald-950/30 via-[#101114] to-[#101114] border border-emerald-500/30 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 w-fit">
              <Sparkles className="w-4 h-4" /> AI Health Intelligence
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
              Ask HealthOS Anything About Your Biology.
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed font-sans">
              Connect your goals with personalized 90-day nutrition plans, training splits, supplement stacks, and recovery optimization.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link href="/ai-coach" className="px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 text-center">
                Launch AI Coach Screen
              </Link>
              <a href="https://t.me/cristianvaduva" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full bg-zinc-900 border border-white/[0.12] text-white font-bold text-xs font-mono uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4 text-sky-400" /> Telegram Expert Support
              </a>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/[0.1] space-y-6 font-mono">
            <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-zinc-400 uppercase tracking-widest">HealthOS Neural Engine v4.2</span>
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/[0.06] text-zinc-300">
                <p className="text-emerald-400 font-bold mb-1">User Query:</p>
                <p>&quot;I want to lose 10kg while maintaining my muscle mass and improving sleep depth.&quot;</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 space-y-2">
                <p className="text-emerald-400 font-bold">HealthOS AI Plan Generated:</p>
                <ul className="space-y-1 list-disc list-inside text-zinc-300">
                  <li><strong>Caloric Deficit:</strong> 400 kcal/day (High Protein 2.2g/kg)</li>
                  <li><strong>Training Split:</strong> 4-day Hypertrophy + 2-day Zone 2 Cardio</li>
                  <li><strong>Supplements:</strong> Creatine 5g, Whey Isolate, Magnesium Glycinate 400mg</li>
                  <li><strong>Recovery:</strong> 8-hour sleep window + 10min morning sunlight</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL GLOBAL CONVERSION CTA */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08] text-center">
        <div className="p-16 rounded-[48px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 relative overflow-hidden space-y-8">
          <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <Award className="w-10 h-10" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight max-w-3xl mx-auto">
            Ready to Build Your Personalized Health Operating System?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-sans">
            Start your transformation today with evidence-based protocols, custom supplement stacks, and direct expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button onClick={onGetStarted} className="px-10 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer">
              Create Your Health Plan
            </button>
            <Link href="/contact" className="px-10 py-4 rounded-full bg-zinc-900 border border-white/[0.12] text-white font-bold text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Talk With Health Expert
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
