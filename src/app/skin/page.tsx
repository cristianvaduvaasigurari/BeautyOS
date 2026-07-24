"use client";

import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn">
      
      <div className="max-w-3xl space-y-6">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
          <Sparkles className="w-4 h-4" /> Domain Hub
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Skin
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
          Advanced protocols for acne, rosacea, hyperpigmentation, and barrier repair.
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] hover:border-white/[0.15] transition-all group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] flex items-center justify-center mb-6">
              <span className="text-[#D4AF37] font-mono text-sm">0{item}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">Premium Article {item}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Dive deep into the clinical research and evidence-based protocols designed for maximum biological optimization.
            </p>
            <button className="text-xs font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all">
              Read Protocol <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
