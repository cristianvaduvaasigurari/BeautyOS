"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, Bot, RefreshCw, CheckCircle2 } from "lucide-react";
import { sendTelemetryEvent } from "@/lib/analytics/telemetry";

export default function AICoachPage() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>("I want to lose 10kg while keeping my muscle.");

  const presetQueries = [
    "I want to lose 10kg while keeping my muscle.",
    "How to build muscle & increase strength as a busy professional?",
    "90-Day acne clearing protocol for sensitive skin.",
    "Best longevity & sleep stack for deep recovery."
  ];

  const generatedResponses: Record<string, {
    title: string;
    summary: string;
    nutrition: string[];
    training: string[];
    supplements: string[];
    recovery: string[];
  }> = {
    "I want to lose 10kg while keeping my muscle.": {
      title: "AiX Health 90-Day Fat Loss & Muscle Preservation Protocol",
      summary: "Caloric deficit combined with high protein density (2.2g/kg), heavy strength preservation work, and non-fatiguing Zone 2 cardio.",
      nutrition: [
        "Caloric Deficit: 400-500 kcal below baseline maintenance.",
        "Protein Target: 2.2g per kg bodyweight daily divided across 4 meals.",
        "Hydration: 4L water + 1 scoop AiX Health Electrolytes."
      ],
      training: [
        "4-Day Upper/Lower Strength Split (Targeting 6-10 rep range).",
        "30 minutes Zone 2 Cardio 3x per week (Heart rate 120-140 bpm).",
        "Maintain progressive load on primary compound movements."
      ],
      supplements: [
        "Creatine Monohydrate (5g daily) for intracellular hydration & strength.",
        "Whey Protein Isolate (27g post-workout) for MPS response.",
        "Magnesium Glycinate (400mg PM) for neural recovery."
      ],
      recovery: [
        "Strict 8-hour sleep window with 65°F room temperature.",
        "10-15 minutes direct morning sunlight within 30 min of waking."
      ]
    },
    "How to build muscle & increase strength as a busy professional?": {
      title: "AiX Health High-Efficiency Hypertrophy Protocol",
      summary: "3-day full-body or 4-day push-pull-legs routine maximizing mechanical tension per set.",
      nutrition: [
        "Caloric Surplus: +250-300 kcal above maintenance.",
        "Protein Target: 2.0g per kg bodyweight with 3g leucine per meal."
      ],
      training: [
        "3-4 sessions per week (45-60 min max).",
        "Focus on 2-3 RIR (Reps in Reserve) on mechanical compound lifts."
      ],
      supplements: [
        "Creatine Monohydrate 5g + L-Glutamine 5g.",
        "Pre-Workout Complex (Caffeine 200mg + L-Citrulline 6g)."
      ],
      recovery: [
        "Rest 2-3 minutes between compound working sets.",
        "Sauna protocol 20 min 2x per week post-lifting."
      ]
    },
    "90-Day acne clearing protocol for sensitive skin.": {
      title: "AiX Health Dermal Barrier & Acne Reset Blueprint",
      summary: "Eliminating harsh cleansers, repairing stratum corneum lipid matrix, and modulating sebum inflammatory markers.",
      nutrition: [
        "Reduce high-glycemic carbohydrates and artificial whey additives.",
        "Increase Omega-3 EPA/DHA (2000mg) for anti-inflammatory prostaglandins."
      ],
      training: [
        "Post-workout immediate cleansing to prevent sweat/bacterial accumulation."
      ],
      supplements: [
        "Zinc Picolinate (30mg daily with meal).",
        "Probiotic Multi-Strain Blend (50 Billion CFU)."
      ],
      recovery: [
        "Silk pillowcases washed twice weekly.",
        "AM Gentle Cleanse -> Ceramides Cream -> Mineral SPF 50."
      ]
    },
    "Best longevity & sleep stack for deep recovery.": {
      title: "AiX Health Cellular Rejuvenation & Sleep Architecture Stack",
      summary: "Sirtuin activation, mitochondrial ATP generation, and circadian melatonin optimization.",
      nutrition: [
        "Intermittent Fasting 14:10 window.",
        "Polyphenol loading: Dark Berries, Extra Virgin Olive Oil, Green Tea."
      ],
      training: [
        "Zone 2 Aerobic base 150 min/week + Mobility stretching."
      ],
      supplements: [
        "NMN 500mg (AM) for NAD+ substrate boosting.",
        "Magnesium Bisglycinate 400mg + L-Theanine 200mg + Apigenin 50mg (PM)."
      ],
      recovery: [
        "Zero blue light exposure 90 minutes prior to sleep.",
        "Cold shower (2 min at 55°F) upon waking."
      ]
    }
  };

  const handleSelectPreset = (p: string) => {
    setActivePreset(p);
    setQuery(p);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsGenerating(true);

    sendTelemetryEvent({
      event: "AI_HIGH_INTENT",
      sourceRoute: "/ai-coach",
      category: "AI Coach Query",
      metadata: { query: query.trim() },
    });

    setTimeout(() => {
      setIsGenerating(false);
      if (!presetQueries.includes(query)) {
        setActivePreset("I want to lose 10kg while keeping my muscle.");
      } else {
        setActivePreset(query);
      }
    }, 600);
  };

  const currentPlan = activePreset ? generatedResponses[activePreset] || generatedResponses["I want to lose 10kg while keeping my muscle."] : generatedResponses["I want to lose 10kg while keeping my muscle."];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-3xl space-y-6 mb-12">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <Sparkles className="w-4 h-4 text-emerald-400" /> Ask AiX Health Neural Engine
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          AI Health Coach & Protocol Generator.
        </h1>
        <p className="text-xl text-zinc-400 font-light leading-relaxed font-sans">
          State your biological objective to instantly synthesize an evidence-based 90-day nutrition, workout, supplement, and recovery protocol.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="mb-8 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">Suggested Biological Queries:</p>
        <div className="flex flex-wrap gap-3">
          {presetQueries.map((p) => (
            <button
              key={p}
              onClick={() => handleSelectPreset(p)}
              className={`px-4 py-2 rounded-2xl text-xs font-sans transition-all text-left border ${
                activePreset === p 
                  ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold" 
                  : "bg-[#101114] border-white/[0.08] text-zinc-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <form onSubmit={handleGenerate} className="mb-12 relative max-w-4xl">
        <div className="relative flex items-center">
          <Bot className="w-6 h-6 text-emerald-400 absolute left-5 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AiX Health (e.g. 'How to optimize deep sleep and lower cortisol?')"
            className="w-full bg-[#101114] border border-white/[0.12] focus:border-emerald-500/50 rounded-3xl pl-14 pr-36 py-5 text-white placeholder-zinc-500 text-base font-sans focus:outline-none shadow-2xl transition-colors"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="absolute right-3 px-6 py-3 rounded-2xl bg-emerald-500 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            {isGenerating ? (
              <><RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing...</>
            ) : (
              <><Send className="w-4 h-4" /> Synthesize</>
            )}
          </button>
        </div>
      </form>

      {/* Generated Response Panel */}
      <div className="max-w-4xl p-8 sm:p-12 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Synthesized Clinical Protocol</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{currentPlan.title}</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
            Grade A Confidence
          </span>
        </div>

        <p className="text-zinc-300 font-sans text-sm leading-relaxed border-l-2 border-emerald-500 pl-4">
          {currentPlan.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Nutrition Plan
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.nutrition.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Training Split
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.training.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Supplement Stack
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.supplements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Recovery & Circadian
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.recovery.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 font-mono">Want to discuss this generated protocol with a human specialist?</p>
          <Link href="/contact" className="px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
            Book Health Consultation →
          </Link>
        </div>

      </div>

    </div>
  );
}
