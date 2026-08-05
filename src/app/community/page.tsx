"use client";

import React from "react";
import Link from "next/link";
import { Users, Star, ShieldCheck, Zap } from "lucide-react";

export default function CommunityPage() {
  const verifiedReviews = [
    {
      author: "Dr. Marcus Vance",
      role: "Sports Biochemist",
      protocol: "90-Day Hypertrophy & Collagen Protocol",
      text: "HealthOS provides the cleanest separation of anabolic stimulus, nutrient timing, and active dermal recovery I've used in clinical practice."
    },
    {
      author: "Elena Rostova",
      role: "Biohacking Researcher",
      protocol: "NMN + Glycinate Sleep Stacking",
      text: "Tracking deep sleep duration against supplement stacks in the HealthOS dashboard revealed a 24% increase in slow-wave sleep within 3 weeks."
    },
    {
      author: "David Chen",
      role: "Competitive Athlete",
      protocol: "Creatine & Electrolyte Hydration",
      text: "The clash detection system saved me from combining incompatible recovery peptides. The ecosystem is Apple-level smooth."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      <div className="max-w-3xl space-y-6 mb-16">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <Users className="w-4 h-4" /> HealthOS Community
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Verified Member Protocols &amp; Intelligence.
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl font-sans">
          Connect with biohackers, clinicians, and fitness enthusiasts sharing data-backed protocols for human performance and longevity.
        </p>
      </div>

      {/* Verified Reviews / Protocols */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {verifiedReviews.map((r, i) => (
          <div key={i} className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-emerald-400">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-sm text-zinc-300 italic font-sans leading-relaxed">&quot;{r.text}&quot;</p>
            </div>

            <div className="pt-4 border-t border-white/[0.08] space-y-1">
              <p className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
                {r.author} <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </p>
              <p className="text-xs text-zinc-500 font-sans">{r.role}</p>
              <p className="text-[10px] text-emerald-400 font-mono pt-1">Protocol: {r.protocol}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="p-12 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-emerald-500/30 text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold text-white mb-4">Share Your HealthOS Protocol</h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-8 font-sans">
          Log your check-ins in the dashboard, generate your bio-score, and submit your verified routine to the community.
        </p>
        <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs uppercase font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
          <Zap className="w-4 h-4" /> Open Member Dashboard
        </Link>
      </div>

    </div>
  );
}
