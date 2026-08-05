"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Dumbbell,
  Apple,
  Pill,
  Activity,
  Zap
} from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {

  const fitnessGuides = [
    { title: "Skeletal Muscle Hypertrophy", desc: "Scientific volume loading and muscle protein synthesis triggers." },
    { title: "Metabolic Fat Loss Blueprint", desc: "Caloric deficit optimization while maintaining lean tissue mass." },
    { title: "Systemic Tissue Recovery", desc: "Sleep architecture, cold therapy, and neural recovery protocols." },
    { title: "Cardiovascular VO2 Max", desc: "Zone 2 aerobic base building and high-intensity interval training." }
  ];

  const nutritionGuides = [
    { title: "Gut Microbiome Repair", desc: "Probiotic diversity, fiber substrate loading, and gut barrier integrity." },
    { title: "Nutrient-Dense Muscle Fuel", desc: "Complete amino acid profiling and peri-workout carbohydrate timing." },
    { title: "Metabolic Glucose Stability", desc: "Continuous glucose monitoring, insulin sensitivity, and fiber buffering." },
    { title: "Cellular Micronutrient Balance", desc: "Essential minerals, fat-soluble vitamins, and trace element hydration." }
  ];

  const womensGuides = [
    { title: "Hormonal Cycle Synchronization", desc: "Nutritional and workout adjustments aligned with follicular and luteal phases." },
    { title: "Pregnancy & Postpartum Skin", desc: "Barrier preservation and safe active ingredients during gestation." },
    { title: "PCOS & Sebum Control", desc: "Addressing androgenic flare-ups with targeted dietary intervention." },
    { title: "Menopause Collagen Support", desc: "Compensating for estrogen drop with bioavailable peptide complexes." }
  ];

  const mensGuides = [
    { title: "Follicle DHT Defense", desc: "Scalp micro-circulation and topical DHT inhibition strategies." },
    { title: "Beard & Facial Hair Health", desc: "Secreting natural oils, anti-dandruff scalp care, and keratin support." },
    { title: "Endogenous Testosterone Boost", desc: "Zinc, Vitamin D3, resistance training, and sleep hygiene protocols." },
    { title: "Active Lifestyle Barrier Care", desc: "Sweat-induced pore unclogging and post-workout skin cleansing." }
  ];

  const supplementPillars = [
    { title: "Creatine Monohydrate", desc: "Cellular ATP replenishment, muscular strength, and cognitive processing speed." },
    { title: "Whey Protein Isolate", desc: "Cold-filtered fast-absorbing protein delivering 27g of complete EAAs per serving." },
    { title: "Magnesium Glycinate", desc: "Highly bioavailable chelated magnesium for neural calming and deep sleep." },
    { title: "Hydrolyzed Marine Collagen", desc: "Type-I collagen peptides boosting dermal elasticity and joint cartilage repair." },
    { title: "NMN & NAD+ Activator", desc: "Mitochondrial catalyst supporting Sirtuin activity and DNA repair mechanisms." },
    { title: "Omega-3 EPA/DHA Complex", desc: "High-concentration triglyceride fish oil reducing systemic micro-inflammation." },
    { title: "Ashwagandha KSM-66", desc: "Full-spectrum adaptogenic root extract clinically proven to balance cortisol." },
    { title: "Electrolyte Hydration Matrix", desc: "Sodium, potassium, and magnesium ratios optimizing bio-cellular hydration." }
  ];

  return (
    <div className="bg-[#0A0A0A] text-white font-sans selection:bg-emerald-500/30 selection:text-white relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-28 px-6 max-w-[1440px] mx-auto">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="text-center space-y-6 max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Activity className="w-4 h-4" />
            <span>HealthOS∞ Flagship Ecosystem</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            The Unified Operating System for <br />
            <span className="text-emerald-400 italic font-serif font-normal">Health, Longevity & Human Performance.</span>
          </h1>

          <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto font-sans">
            Skin. Hair. Body. Fitness. Nutrition. Supplements. Longevity. Hormones. <br />
            Engineered for both women and men to optimize biological age and performance.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto text-xs bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <span>Enter HealthOS Dashboard</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto text-xs bg-zinc-900 border border-white/[0.08] hover:bg-white hover:text-zinc-950 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 font-mono"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Book a Consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CORE VERTICALS OVERVIEW */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">10 Core Verticals</span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Complete Health Ecosystem</h2>
          <p className="text-sm text-zinc-400 font-sans">Evidence-based clinical science paired with actionable protocols.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: "Skin Health", href: "/skin", desc: "Barrier integrity & retinol protocols" },
            { title: "Hair & Scalp", href: "/hair", desc: "Follicle density & scalp health" },
            { title: "Body Composition", href: "/body", desc: "Posture, recovery & cellular hydration" },
            { title: "Fitness & Strength", href: "/fitness", desc: "Hypertrophy, cardio & mobility" },
            { title: "Clinical Nutrition", href: "/nutrition", desc: "Gut microbiome & metabolic fuel" },
            { title: "Supplement Library", href: "/supplements", desc: "Creatine, protein, magnesium & NMN" },
            { title: "Longevity & Biohacking", href: "/longevity", desc: "NAD+, autophagy & VO2 Max" },
            { title: "Medical Science", href: "/science", desc: "Peer-reviewed research & INCI decoder" },
            { title: "90-Day Guides", href: "/guides", desc: "Masterclasses for acne & fat loss" },
            { title: "Community Hub", href: "/community", desc: "Verified protocols & member Q&A" }
          ].map((v) => (
            <Link
              key={v.title}
              href={v.href}
              className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-[#17181B] transition-all group flex flex-col justify-between"
            >
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{v.title}</h3>
                <p className="text-[11px] text-zinc-400 mt-2 font-sans leading-relaxed">{v.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-zinc-500 group-hover:text-emerald-400">
                <span>Explore</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FITNESS & BODY PERFORMANCE */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              <Dumbbell className="w-4 h-4" /> Fitness & Performance
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Strength & Recomposition</h2>
          </div>
          <Link href="/fitness" className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1">
            Explore All Fitness Protocols →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {fitnessGuides.map((g) => (
            <Link href="/fitness" key={g.title} className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer space-y-3">
              <h3 className="text-base font-bold text-white">{g.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NUTRITION & GUT HEALTH */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              <Apple className="w-4 h-4" /> Clinical Nutrition
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Metabolic Fuel & Gut Microbiome</h2>
          </div>
          <Link href="/nutrition" className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1">
            Explore All Nutrition Hubs →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nutritionGuides.map((g) => (
            <Link href="/nutrition" key={g.title} className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] hover:border-emerald-500/40 transition-all cursor-pointer space-y-3">
              <h3 className="text-base font-bold text-white">{g.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{g.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* DEMOGRAPHICS: WOMEN & MEN */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="p-10 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Women&apos;s Health</span>
              <h3 className="text-3xl font-bold text-white">Hormonal & Biological Health</h3>
              <p className="text-xs text-zinc-400 max-w-md font-sans">Tailored protocols for cycle synching, PCOS, pregnancy-safe skin, and menopause.</p>
            </div>
            <div className="space-y-4">
              {womensGuides.map((g) => (
                <Link href="/guides/women" key={g.title} className="block p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                  <h4 className="text-sm font-bold text-white">{g.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-8">
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Men&apos;s Health</span>
              <h3 className="text-3xl font-bold text-white">Performance & DHT Optimization</h3>
              <p className="text-xs text-zinc-400 max-w-md font-sans">Optimized routines for beard growth, scalp DHT defense, testosterone support, and active skin.</p>
            </div>
            <div className="space-y-4">
              {mensGuides.map((g) => (
                <Link href="/guides/men" key={g.title} className="block p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] hover:border-emerald-500/30 transition-all">
                  <h4 className="text-sm font-bold text-white">{g.title}</h4>
                  <p className="text-xs text-zinc-400 mt-1 font-sans">{g.desc}</p>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SUPPLEMENT PILLARS */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="flex items-center justify-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
            <Pill className="w-4 h-4" /> Evidence-Based Supplementation
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Clinical Supplement Library</h2>
          <p className="text-sm text-zinc-400 font-sans">Physiological mechanisms, dosage ranges, timing, and stacking strategies.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {supplementPillars.map((s) => (
            <Link 
              href={`/supplements/${s.title.toLowerCase().split(' ')[0]}`}
              key={s.title}
              className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-3 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{s.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans mt-2">{s.desc}</p>
              </div>
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-emerald-400">
                <span>View Scientific Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-24 px-6 max-w-[1440px] mx-auto border-t border-white/[0.08]">
        <div className="p-12 md:p-16 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0D0E12] border border-emerald-500/30 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase">
              Start Your Transformation
            </span>
            <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight">
              Ready to optimize your biology?
            </h2>
            <p className="text-zinc-400 leading-relaxed font-sans">
              Join thousands using HealthOS to track routines, eliminate active ingredient clashes, and achieve peak physical performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs uppercase font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Access Dashboard
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 rounded-full bg-zinc-900 border border-white/[0.08] text-white font-bold text-xs uppercase font-mono hover:bg-white hover:text-black transition-colors"
              >
                Book Expert Call
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
