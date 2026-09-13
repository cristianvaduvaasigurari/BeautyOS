"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, BookOpen, AlertTriangle } from "lucide-react";
import { HealthDisclaimer } from "@/components/HealthDisclaimer";
import { Disclaimers } from "@/lib/legal/disclaimers";

export default function DisclaimerPage() {
  const disclaimerKeys = Object.keys(Disclaimers) as (keyof typeof Disclaimers)[];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1000px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Back Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <ShieldAlert className="w-4 h-4" /> Legal & Educational Policies
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Health & Medical Disclaimer
        </h1>

        <p className="text-lg text-zinc-400 font-light leading-relaxed">
          AiX Health is an educational health intelligence and research synthesis platform. Please review our comprehensive medical and educational notices below.
        </p>
      </div>

      {/* Primary Notice Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#101412] to-[#0D110F] border border-emerald-500/30 space-y-4 mb-12 shadow-2xl">
        <div className="flex items-center gap-3 text-emerald-400 font-mono text-sm font-bold uppercase tracking-wider">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          Core Educational Positioning Notice
        </div>
        <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
          AiX Health provides health education, biological frameworks, and informational synthesis only. Content across this platform—including protocols, articles, guides, databases, and AI coaching tools—does not constitute medical advice, diagnosis, prognosis, prescription, or individualized patient care.
        </p>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          For any personal health concerns, symptoms, medical conditions, or before starting any dietary supplement, nutritional protocol, or intense exercise regimen, always consult with a licensed and qualified healthcare professional. Never disregard professional medical advice or delay seeking it because of information read on this website.
        </p>
      </div>

      {/* Specific Section Disclaimers */}
      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-bold text-white tracking-tight border-b border-white/[0.08] pb-4">
          Detailed Area Disclaimers
        </h2>
        
        <div className="grid grid-cols-1 gap-4">
          {disclaimerKeys.map((key) => (
            <HealthDisclaimer key={key} type={key} />
          ))}
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-rose-200 text-xs sm:text-sm leading-relaxed space-y-2">
        <h3 className="font-bold font-mono uppercase tracking-wider text-rose-400 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          Emergency Medical Situations
        </h3>
        <p className="text-zinc-300">
          AiX Health is NOT an emergency response service or telemedicine provider. If you think you may be experiencing a medical emergency, call your local emergency services (e.g. 112 or 911) or go to the nearest emergency department immediately.
        </p>
      </div>

    </div>
  );
}
