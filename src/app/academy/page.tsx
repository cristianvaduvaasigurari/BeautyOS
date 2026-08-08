"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ArrowRight } from "lucide-react";
import { editorialContent } from "../../data/editorialContent";

export default function AcademyPage() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Skin" | "Muscle" | "Fat Loss" | "Nutrition" | "Supplements" | "Longevity">("All");

  const categories = [
    { id: "Skin", title: "Skin Science & Barrier Mechanics", desc: "Dermal lipid matrix, retinoids, ceramides, and TEWL optimization." },
    { id: "Muscle", title: "Muscle Hypertrophy & Anabolic Science", desc: "Leucine threshold, mechanical volume loading, and MPS pathways." },
    { id: "Fat Loss", title: "Metabolic Fat Loss & Caloric Deficit", desc: "Mitochondrial beta-oxidation, insulin sensitivity, and NEAT." },
    { id: "Nutrition", title: "Gut Microbiome & Macro Profiling", desc: "Probiotic diversity, fiber substrates, and nutrient timing." },
    { id: "Supplements", title: "Ergogenic Aids & Bio-Availability", desc: "Creatine monohydrate, chelated minerals, and sirtuin activators." },
    { id: "Longevity", title: "Cellular Longevity & Circadian Sleep", desc: "NAD+ precursors, autophagy fasting, and REM sleep architecture." }
  ];

  const academyArticles = Object.values(editorialContent).slice(0, 18);

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <BookOpen className="w-4 h-4 text-emerald-400" /> AiX Health Clinical Academy
        </span>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Evidence-Based Health Science. <br />
          <span className="text-emerald-400">Zero Marketing Hype.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Peer-reviewed literature, biochemical mechanism breakdowns, clinical trial summaries, and practical action steps to optimize your human operating system.
        </p>

        {/* Category Filters */}
        <div className="pt-6 flex flex-wrap gap-2 border-t border-white/[0.08]">
          {(["All", "Skin", "Muscle", "Fat Loss", "Nutrition", "Supplements", "Longevity"] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                activeCategory === cat 
                  ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20" 
                  : "bg-[#101114] text-zinc-400 border border-white/[0.08] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Academy Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {categories.map((c, idx) => (
          <div key={idx} className="p-8 rounded-[36px] bg-[#101114] border border-white/[0.08] space-y-4 hover:border-emerald-500/40 transition-all group">
            <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-widest">Mastery Domain 0{idx + 1}</span>
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{c.title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-sans">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white tracking-tight border-b border-white/[0.08] pb-4">Latest Authority Masterclasses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {academyArticles.map((art) => (
            <Link 
              key={art.id} 
              href={`/${art.category.toLowerCase()}/${art.slug}`}
              className="p-8 rounded-[36px] bg-gradient-to-br from-[#101114] to-[#141519] border border-white/[0.08] hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    {art.category}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">{art.estimatedReadTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">{art.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">{art.subtitle}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-300 font-bold group-hover:text-white">
                <span>Read Masterclass</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
