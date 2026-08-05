"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Activity, TrendingUp } from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "90D">("30D");

  const metrics = [
    { title: "Biological Health Score", current: "87 / 100", change: "+4 pts", trend: "up" },
    { title: "Lean Mass Index", current: "68.4 kg", change: "+1.2 kg", trend: "up" },
    { title: "Body Fat Percentage", current: "14.2%", change: "-1.8%", trend: "down" },
    { title: "Sleep Efficiency", current: "88%", change: "+3%", trend: "up" },
    { title: "Protein Consistency", current: "94%", change: "+8%", trend: "up" },
    { title: "Protocol Adherence", current: "92%", change: "+5%", trend: "up" }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center justify-between flex-wrap gap-4">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4" /> Apple Health-Grade Biomarker Analytics
          </span>

          <div className="flex bg-[#101114] border border-white/[0.08] rounded-full p-1 font-mono text-xs">
            {(["7D", "30D", "90D"] as const).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-1.5 rounded-full font-bold uppercase transition-all ${
                  timeframe === tf ? "bg-emerald-500 text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Health Analytics & Trends.
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed font-sans max-w-3xl">
          Track compounding bio-feedback markers across lean mass, sleep depth, protein adherence, and protocol execution.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {metrics.map((m, i) => (
          <div key={i} className="p-8 rounded-[36px] bg-[#101114] border border-white/[0.08] space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">{m.title}</span>
            <div className="flex items-baseline justify-between">
              <span className="text-4xl font-bold text-white tracking-tight">{m.current}</span>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Weight Evolution Chart */}
        <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-white/[0.08] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Body Mass & Composition Evolution</h3>
              <p className="text-xs text-zinc-400 font-sans mt-1">Lean mass retention vs fat mass reduction over 30 days.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              -1.8 kg Fat
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-8 border-b border-white/[0.08] pb-4">
            {[79.2, 78.8, 78.5, 78.1, 77.9, 77.6, 77.4].map((w, idx) => {
              const hPct = ((w - 75) / 5) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">{w}kg</span>
                  <div className="w-full bg-zinc-900 rounded-t-xl h-full flex items-end overflow-hidden">
                    <div 
                      className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-xl transition-all duration-700" 
                      style={{ height: `${hPct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">Wk {idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Protein & Adherence Consistency Chart */}
        <div className="p-10 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-white/[0.08] space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Daily Protein Consistency (Target: 160g)</h3>
              <p className="text-xs text-zinc-400 font-sans mt-1">Sustained protein intake drives muscle protein synthesis.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              94% Adherence
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-8 border-b border-white/[0.08] pb-4">
            {[155, 165, 160, 158, 172, 160, 168].map((g, idx) => {
              const hPct = (g / 180) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-emerald-400 transition-colors">{g}g</span>
                  <div className="w-full bg-zinc-900 rounded-t-xl h-full flex items-end overflow-hidden">
                    <div 
                      className="w-full bg-gradient-to-t from-teal-500 to-emerald-400 rounded-t-xl transition-all duration-700" 
                      style={{ height: `${hPct}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-600 uppercase">Day {idx + 1}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
