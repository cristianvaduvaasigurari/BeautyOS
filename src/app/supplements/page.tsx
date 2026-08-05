"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle2, Pill } from "lucide-react";
import { editorialContent, EditorialArticle } from "../../data/editorialContent";

export default function SupplementsHubPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Muscle" | "Fat Loss" | "Longevity">("All");

  const articles: EditorialArticle[] = Object.values(editorialContent).filter(
    a => a.category.toLowerCase() === "supplements"
  );

  const curatedStacks = [
    {
      title: "Skeletal Muscle Growth Stack",
      tag: "Hypertrophy & Power",
      description: "Saturate phosphocreatine stores, elevate muscle protein synthesis (MPS), and control systemic cortisol.",
      items: ["Creatine Monohydrate (5g)", "Whey Protein Isolate (27g)", "Omega-3 EPA/DHA (2000mg)", "Vitamin D3 + K2 (5000 IU)", "Magnesium Glycinate (400mg)"],
      targetHref: "/supplements/creatine"
    },
    {
      title: "Metabolic Fat Loss Stack",
      tag: "Metabolism & Satiety",
      description: "Support mitochondrial beta-oxidation, suppress appetite spikes, and hydrate cellular electrolytes.",
      items: ["Whey Protein Isolate (30g)", "Soluble Fiber Complex (10g)", "Green Tea EGCG Extract", "Electrolyte Matrix (Sodium/Potassium/Magnesium)"],
      targetHref: "/supplements/protein"
    },
    {
      title: "Cellular Longevity & Repair Stack",
      tag: "NAD+ & Sirtuins",
      description: "Re-energize cellular mitochondria, defense against genomic instability, and promote deep restorative sleep.",
      items: ["NMN (500mg)", "CoQ10 Ubiquinol (200mg)", "Resveratrol Trans-Isomer", "High-EPA Omega-3", "Chelated Magnesium"],
      targetHref: "/supplements/nmn"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Hero Header */}
      <div className="max-w-4xl space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <Pill className="w-4 h-4" /> Clinical Supplement Library & Stacks
        </span>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Pure Bio-Available Compounds. <br />
          <span className="text-emerald-400">Zero Unnecessary Fillers.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Scientific evidence ratings, mechanism explanations, optimal dosage timing, interactions, and curated clinical stacks engineered for maximum bio-absorbability.
        </p>
      </div>

      {/* CURATED STACKS MARKETPLACE SECTION */}
      <div className="mb-24 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Curated Formulations</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Clinical Supplement Stacks</h2>
          </div>
          <Link href="/contact" className="text-xs font-mono text-emerald-400 font-bold hover:underline hidden sm:inline">
            Request Stack Customization →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {curatedStacks.map((stack, idx) => (
            <div key={idx} className="p-8 rounded-[36px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-6 flex flex-col justify-between hover:border-emerald-500/60 transition-all group">
              <div className="space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  {stack.tag}
                </span>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">{stack.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{stack.description}</p>
                
                <div className="pt-4 border-t border-white/[0.08] space-y-2">
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold">Stack Composition:</p>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-sans">
                    {stack.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <Link href={stack.targetHref} className="w-full text-center py-3 rounded-2xl bg-emerald-500 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors block shadow-lg shadow-emerald-500/20">
                  View Stack Science
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ALL SUPPLEMENTS GRID */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Complete Supplement Index ({articles.length})</h2>
          
          <div className="flex gap-2">
            {(["All", "Muscle", "Fat Loss", "Longevity"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                  activeTab === tab 
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20" 
                    : "bg-[#101114] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <Link 
              href={`/supplements/${article.slug}`} 
              key={article.id} 
              className="p-8 rounded-[36px] bg-[#101114] border border-white/[0.08] hover:border-emerald-500/50 transition-all group cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-mono text-xs font-bold">0{idx + 1}</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold uppercase">
                    Grade A Evidence
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">{article.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans line-clamp-3">{article.subtitle}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-300 font-bold group-hover:text-white">
                <span>View Dosing & Science</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
