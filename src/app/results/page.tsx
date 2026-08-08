"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Award, CheckCircle2, BookOpen, ShieldAlert } from "lucide-react";

export default function TransformationResultsPage() {
  const educationalExamples = [
    {
      title: "Illustrative Educational Example 01",
      subtitle: "Skeletal Muscle Physiology & Intracellular Saturation",
      framework: "Muscle Physiology Education",
      evidenceLevel: "Educational reference only",
      summary: "Research literature evaluates phosphocreatine loading and high-protein distribution in active cohorts over 8–12 weeks.",
      observations: [
        "Studies observe intracellular hydration responses during creatine saturation phases.",
        "Literature evaluates protein intake thresholds (~1.6–2.2g/kg) for supporting nitrogen balance.",
        "Progressive mechanical tension serves as the primary driver for myofibrillar adaptations."
      ],
      disclaimer: "This example is provided for educational purposes only. It does not represent a verified individual, clinical outcome, medical recommendation, treatment protocol, or personal health result."
    },
    {
      title: "Illustrative Educational Example 02",
      subtitle: "NMN + Magnesium Glycinate — Educational Review",
      framework: "Longevity & Circadian Education",
      evidenceLevel: "Educational reference only",
      summary: "An illustrative example of how sleep-related outcomes and circadian parameters may be discussed when reviewing research on supplement combinations.",
      observations: [
        "Research literature examines how chelated magnesium forms (such as Magnesium Glycinate) support neuromuscular relaxation and slow-wave sleep architecture.",
        "NADH/NAD+ substrate mechanisms are studied in daytime mitochondrial energetic literature.",
        "Circadian entrainment protocols evaluate sleep hygiene factors alongside dietary supplementation."
      ],
      disclaimer: "This example is provided for educational purposes only. It does not represent a verified individual, clinical outcome, medical recommendation, treatment protocol, or personal health result."
    },
    {
      title: "Illustrative Educational Example 03",
      subtitle: "Dermal Barrier Integrity & Lipid Reset",
      framework: "Dermal Physiology Education",
      evidenceLevel: "Educational reference only",
      summary: "Research literature evaluates stratum corneum lipid restoration when gentle cleansing is paired with ceramide and niacinamide topicals.",
      observations: [
        "Studies measure trans-epidermal water loss (TEWL) reduction following lipid barrier restoration.",
        "Exfoliant restriction strategies are evaluated in clinical trials for sensitive or compromised skin barriers.",
        "Systemic inflammation modulation (e.g. Omega-3 EPA/DHA research) is reviewed for skin hydration markers."
      ],
      disclaimer: "This example is provided for educational purposes only. It does not represent a verified individual, clinical outcome, medical recommendation, treatment protocol, or personal health result."
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
          <Award className="w-4 h-4 text-emerald-400" /> Illustrative Educational Frameworks
        </span>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Educational Case Studies &amp; <br />
          <span className="text-emerald-400">Literature Synthesis.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl font-sans">
          Illustrative educational examples demonstrating how research literature evaluates biological parameters such as body composition, sleep architecture, and dermal barrier markers.
        </p>
      </div>

      {/* Educational Examples Grid */}
      <div className="space-y-12 max-w-5xl mb-20">
        {educationalExamples.map((ex, idx) => (
          <div key={idx} className="p-10 sm:p-12 rounded-[44px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-8 shadow-2xl relative overflow-hidden">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">{ex.title}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{ex.subtitle}</h3>
                <p className="text-xs text-zinc-400 font-sans mt-0.5">{ex.framework}</p>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase w-fit">
                {ex.evidenceLevel}
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">Research Summary Context</span>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{ex.summary}</p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Key Literature Observations:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ex.observations.map((obs, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2 text-xs text-zinc-300 font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{obs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-zinc-400 font-sans flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>{ex.disclaimer}</p>
            </div>

          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-5xl p-12 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-emerald-500/30 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Explore Educational Health Protocols</h2>
        <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans">
          Access evidence-based educational frameworks, scientific literature syntheses, and transparent health intelligence.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/protocols" className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs uppercase font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Explore Educational Protocols
          </Link>
        </div>
      </div>

    </div>
  );
}
