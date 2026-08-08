"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Target } from "lucide-react";

export default function ProtocolsLibraryPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Fitness" | "Skin" | "Longevity">("All");

  const protocolList = [
    {
      id: "90-day-fat-loss",
      title: "90-Day Metabolic Fat Loss Blueprint",
      category: "Fitness",
      duration: "90 Days",
      confidence: "Grade A Clinical Consensus",
      summary: "Systematic caloric deficit engineering, high protein density (2.2g/kg), 4-day resistance training split, and non-fatiguing Zone 2 aerobic base.",
      outcomes: ["Sustain lean muscle mass while reducing visceral body fat", "Regulate fasting blood glucose & insulin sensitivity", "Optimize daily energy and mental clarity without caffeine reliance"],
      href: "/guides/90-day-fat-loss"
    },
    {
      id: "90-day-muscle-growth",
      title: "90-Day Skeletal Muscle Hypertrophy Protocol",
      category: "Fitness",
      duration: "90 Days",
      confidence: "Grade A Clinical Consensus",
      summary: "Progressive mechanical tension, intra-workout leucine threshold loading, phosphocreatine ATP replenishment, and sleep architecture optimization.",
      outcomes: ["Stimulate muscle protein synthesis (MPS) across major compound lifts", "Saturate intracellular creatine stores for peak force production", "Accelerate tissue recovery via chelated magnesium & marine collagen"],
      href: "/guides/build-muscle"
    },
    {
      id: "90-day-skin-reset",
      title: "90-Day Dermal Barrier & Acne Reset Program",
      category: "Skin",
      duration: "90 Days",
      confidence: "Grade A Clinical Consensus",
      summary: "Eliminating harsh surfactant barrier damage, layering ceramides and niacinamide B3, retinoid adaptation, and dietary inflammation control.",
      outcomes: ["Restore stratum corneum lipid barrier integrity & TEWL balance", "Eliminate inflammatory comedones & acne flare-ups", "Boost dermal thickness, bounce, and natural glow"],
      href: "/guides/90-day-acne-program"
    },
    {
      id: "longevity-optimization",
      title: "Cellular Longevity & Mitochondrial Optimization",
      category: "Longevity",
      duration: "Continuous",
      confidence: "Grade A Clinical Consensus",
      summary: "Sirtuin pathway activation, NAD+ precursor loading (NMN), 14:10 intermittent fasting window, VO2 max building, and circadian cortisol alignment.",
      outcomes: ["Enhance mitochondrial density & cellular ATP capacity", "Protect DNA genomic integrity and mitigate oxidative free-radical stress", "Improve Heart Rate Variability (HRV) and deep REM sleep cycles"],
      href: "/longevity/nad"
    }
  ];

  const filteredProtocols = activeCategory === "All" 
    ? protocolList 
    : protocolList.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <Target className="w-4 h-4" /> AiX Health Clinical Protocol Library
        </span>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Actionable 90-Day Systems. <br />
          <span className="text-emerald-400">Biological Transformation.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Comprehensive step-by-step masterclasses integrating nutrition, progressive training splits, clinical supplement stacking, dermal routines, and recovery tracking.
        </p>

        {/* Filter bar */}
        <div className="pt-6 flex items-center justify-between border-t border-white/[0.08]">
          <div className="flex gap-2">
            {(["All", "Fitness", "Skin", "Longevity"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                  activeCategory === cat 
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20" 
                    : "bg-[#101114] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                {cat} Protocols
              </button>
            ))}
          </div>

          <Link href="/contact" className="text-xs font-mono text-emerald-400 font-bold hover:underline hidden sm:inline">
            Request Customized Protocol →
          </Link>
        </div>
      </div>

      {/* Protocols List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProtocols.map((protocol) => (
          <div 
            key={protocol.id} 
            className="p-8 sm:p-10 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-white/[0.08] hover:border-emerald-500/50 transition-all flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
                  {protocol.category} • {protocol.duration}
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  {protocol.confidence}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                {protocol.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                {protocol.summary}
              </p>

              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Key Target Outcomes:</p>
                <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                  {protocol.outcomes.map((o, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <Link 
                href={protocol.href} 
                className="w-full text-center py-4 rounded-2xl bg-emerald-500 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors block shadow-lg shadow-emerald-500/20"
              >
                Launch {protocol.title} →
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
