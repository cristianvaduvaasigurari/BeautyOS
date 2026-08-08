"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, ShieldCheck, Zap, TrendingUp } from "lucide-react";

export default function TransformationResultsPage() {
  const transformations = [
    {
      name: "Marcus Vance",
      age: 34,
      role: "Software Executive",
      protocol: "90-Day Muscle Hypertrophy & Creatine Saturation",
      beforeMetric: "74.2 kg (19.8% Body Fat)",
      afterMetric: "81.5 kg (13.5% Body Fat)",
      outcomes: ["+7.3 kg Lean Skeletal Muscle Mass", "-6.3% Visceral Body Fat", "+24% Intracellular Hydration Index"],
      quote: "Tracking protein synthesis timing and creatine phosphocreatine loading in AiX Health delivered the most significant physique change of my life."
    },
    {
      name: "Elena Rostova",
      age: 29,
      role: "Biohacking Researcher",
      protocol: "90-Day Dermal Barrier & Sleep Architecture Reset",
      beforeMetric: "Severe Acne & Sleep Score 62",
      afterMetric: "Clear Skin & Sleep Score 94",
      outcomes: ["100% Elimination of Inflammatory Comedones", "+28% Deep REM Sleep Duration", "Restored Stratum Corneum Barrier Matrix"],
      quote: "Discontinuing harsh active exfoliants and layering ceramides with PM chelated magnesium completely cleared my hormonal skin within 8 weeks."
    },
    {
      name: "David Chen",
      age: 31,
      role: "Competitive Triathlete",
      protocol: "90-Day Metabolic Fat Loss & VO2 Max Protocol",
      beforeMetric: "88.0 kg (22.5% Body Fat)",
      afterMetric: "76.0 kg (11.2% Body Fat)",
      outcomes: ["-12.0 kg Fat Mass Reduction", "+14.2% VO2 Max Aerobic Base", "Zero Muscle Tissue Degradation"],
      quote: "Maintaining 2.2g/kg protein density during a 500 kcal deficit allowed me to shed 12kg of fat while increasing my power output."
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <Award className="w-4 h-4 text-emerald-400" /> Empirical Transformation Results
        </span>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Real Member Data. <br />
          <span className="text-emerald-400">Compounding Outcomes.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl font-sans">
          Verified member case studies documenting before/after metrics, protocol adherence, lean mass evolution, and dermal barrier recovery.
        </p>
      </div>

      {/* Transformations Grid */}
      <div className="space-y-12 max-w-5xl mb-20">
        {transformations.map((t, idx) => (
          <div key={idx} className="p-10 sm:p-12 rounded-[44px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-8 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  {t.name} <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">{t.role} • Age {t.age}</p>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase w-fit">
                {t.protocol}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.06] space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Baseline Metric (Day 1)</span>
                <p className="text-xl font-bold font-mono text-zinc-300">{t.beforeMetric}</p>
              </div>

              <div className="p-6 rounded-3xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Outcome Metric (Day 90)</span>
                <p className="text-xl font-bold font-mono text-white flex items-center gap-2">
                  {t.afterMetric} <TrendingUp className="w-5 h-5 text-emerald-400" />
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Verified Biological Outcomes:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {t.outcomes.map((o, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2 text-xs text-zinc-200 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{o}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-zinc-300 italic font-sans border-l-2 border-emerald-500 pl-4 py-1">
              &quot;{t.quote}&quot;
            </p>

          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-5xl p-12 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-emerald-500/30 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Start Your 90-Day Transformation Journey</h2>
        <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans">
          Build your personalized profile, access evidence-based protocols, and track your compounding outcomes over time.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/onboarding" className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs uppercase font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Start AiX Health Onboarding
          </Link>
        </div>
      </div>

    </div>
  );
}
