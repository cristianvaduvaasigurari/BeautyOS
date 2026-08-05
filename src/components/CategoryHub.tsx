"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Zap } from "lucide-react";
import { editorialContent, EditorialArticle } from "../data/editorialContent";

export const CategoryHub = ({ category, title, description }: { category: string, title: string, description: string }) => {
  const [selectedLevel, setSelectedLevel] = useState<"All" | "Beginner" | "Advanced">("All");
  
  const articles: EditorialArticle[] = Object.values(editorialContent).filter(
    a => a.category.toLowerCase() === category.toLowerCase()
  );

  const filteredArticles = selectedLevel === "All" 
    ? articles 
    : selectedLevel === "Beginner" 
      ? articles.slice(0, Math.ceil(articles.length / 2))
      : articles.slice(Math.floor(articles.length / 2));

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* HERO SECTION: Problem -> Solution -> Outcome */}
      <div className="max-w-4xl space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Zap className="w-4 h-4" /> HealthOS Flagship Vertical
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          {title}
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed font-sans max-w-3xl">
          {description}
        </p>

        {/* Problem -> Solution Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">The Challenge</p>
            <p className="text-sm text-zinc-300">Traditional approaches to {category.toLowerCase()} rely on fragmented recommendations without measuring baseline bio-markers.</p>
          </div>
          <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <p className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">The HealthOS Solution</p>
            <p className="text-sm text-white font-medium">Clinical-grade, evidence-based protocols that systematically manipulate cellular pathways for peak optimization.</p>
          </div>
        </div>

        {/* Path Filter */}
        <div className="pt-8 flex items-center justify-between border-t border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase text-zinc-500 font-bold">Filter Path:</span>
            {(["All", "Beginner", "Advanced"] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                  selectedLevel === lvl 
                    ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20" 
                    : "bg-[#101114] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                {lvl} Path
              </button>
            ))}
          </div>

          <Link href="/contact" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 hover:underline">
            Talk with {category} Specialist →
          </Link>
        </div>
      </div>

      {/* ARTICLES & PROTOCOLS GRID */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, idx) => (
          <Link 
            href={`/${category.toLowerCase()}/${article.slug}`} 
            key={article.id} 
            className="p-8 rounded-[36px] bg-gradient-to-br from-[#101114] to-[#141519] border border-white/[0.08] hover:border-emerald-500/50 transition-all group cursor-pointer flex flex-col h-full relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="w-10 h-10 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] flex items-center justify-center">
                <span className="text-emerald-400 font-mono text-xs font-bold">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 font-bold uppercase">
                {article.estimatedReadTime}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">
              {article.title}
            </h3>
            
            <p className="text-xs text-zinc-400 leading-relaxed mb-8 flex-1 font-sans">
              {article.subtitle}
            </p>

            <div className="mt-auto pt-6 border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-[11px] font-bold font-mono text-zinc-300 flex items-center gap-1.5 group-hover:text-white transition-colors">
                Read Masterclass
              </span>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* RECOMMENDED STACKS / CTA */}
      <div className="mt-20 p-12 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 text-center space-y-6">
        <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
          Personalized {title} Stack
        </span>
        <h3 className="text-3xl font-bold text-white max-w-xl mx-auto">
          Need a customized protocol tailored specifically to your biological markers?
        </h3>
        <div className="flex justify-center gap-4 pt-2">
          <Link href="/contact" className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-mono text-xs uppercase font-bold hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
            Request Expert Guidance
          </Link>
        </div>
      </div>

    </div>
  );
};
