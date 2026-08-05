"use client";

import React from "react";
import Link from "next/link";
import { Activity } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Hero */}
      <div className="max-w-3xl space-y-6 mb-20">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <Activity className="w-4 h-4" /> About HealthOS
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Engineering Biological Youth & Human Performance.
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl font-sans">
          HealthOS was founded on a singular premise: human health optimization shouldn&apos;t rely on guess work, marketing hype, or fragmented tools. We combine clinical evidence, biological tracking, and Apple-grade design.
        </p>
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-xl font-bold text-white">Clinical Rigor First</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Every protocol, ingredient safety score, and supplement breakdown is cross-referenced with peer-reviewed literature from PubMed, EWG, and clinical trials.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-xl font-bold text-white">Unified System</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Skin barrier care, hair growth, skeletal muscle hypertrophy, gut microbiome repair, and mitochondrial longevity under one single operating ecosystem.
          </p>
        </div>

        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-xl font-bold text-white">Data Privacy</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Your personal biomarkers and check-in logs belong to you. We store data using encrypted local-first state and zero third-party data broker monetization.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-12 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-emerald-500/30 text-center relative overflow-hidden">
        <h2 className="text-3xl font-bold text-white mb-4">Start your optimization journey today</h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-8 font-sans">
          Explore our guides, track your routines, or book a consultation with a HealthOS specialist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/guides" className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs uppercase font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
            Explore All Guides
          </Link>
          <Link href="/contact" className="px-8 py-3.5 rounded-full bg-zinc-900 border border-white/[0.08] text-white font-bold text-xs uppercase font-mono hover:bg-white hover:text-black transition-colors">
            Book Consultation
          </Link>
        </div>
      </div>

    </div>
  );
}
