"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, Send, Bot, RefreshCw, CheckCircle2, BookOpen, HelpCircle } from "lucide-react";
import { sendTelemetryEvent } from "@/lib/analytics/telemetry";
import { HealthDisclaimer } from "@/components/HealthDisclaimer";

export default function AICoachPage() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>("I want to lose 10kg while keeping my muscle.");

  const presetQueries = [
    "I want to lose 10kg while keeping my muscle.",
    "Should I use topical DHT suppression for hair loss?",
    "How to build muscle & increase strength as a busy professional?",
    "Best longevity & sleep research for deep recovery."
  ];

  interface EducationalResponse {
    title: string;
    summary: string;
    evidenceLevel: string;
    concepts: string[];
    evidence: string[];
    researchContext: string[];
    questionsForProfessional: string[];
  }

  const generatedResponses: Record<string, EducationalResponse> = {
    "I want to lose 10kg while keeping my muscle.": {
      title: "Educational Framework: Energy Balance & Muscle Preservation",
      evidenceLevel: "Evidence Level A — Educational Classification",
      summary: "Scientific research demonstrates that changing body composition while maintaining lean tissue relies on energy balance principles, mechanical resistance training, adequate protein distribution in literature, and recovery optimization.",
      concepts: [
        "Energy Balance Mechanics: Caloric balance governs overall tissue mass changes. Studies examine moderate deficits (~300–500 kcal/day in literature cohorts) to favor fat oxidation over muscle protein breakdown.",
        "Mechanical Tension & MPS: Heavy resistance training provides the essential cellular signal (via mTOR pathway) to preserve motor unit recruitment during negative energy balance.",
        "Protein Intake Science: Peer-reviewed literature frequently examines protein distributions around 1.6–2.2g per kg of bodyweight daily for active populations seeking lean-mass maintenance."
      ],
      evidence: [
        "Example from research literature — not an individualized recommendation: Energy deficits are studied relative to baseline expenditure, varying significantly by baseline body composition and activity level.",
        "Example from research literature — not an individualized recommendation: Creatine Monohydrate (studied in literature at 3-5g daily) is evaluated for cellular hydration and phosphocreatine ATP replenishment.",
        "Example from research literature — not an individualized recommendation: Magnesium forms (such as Glycinate) are evaluated in research for supporting neuromuscular recovery and sleep quality."
      ],
      researchContext: [
        "Individual metabolic rate, non-exercise activity thermogenesis (NEAT), and hormonal balance dictate personal response curves.",
        "Aggressive caloric restriction in studies increases the proportion of weight lost from lean muscle rather than adipose tissue.",
        "Nutrient timing and carbohydrate availability around training sessions influence training intensity during calorie-restricted phases."
      ],
      questionsForProfessional: [
        "What calorie range and macronutrient breakdown align with my specific medical history and metabolic baseline?",
        "Are there underlying thyroid or metabolic factors I should evaluate before altering my calorie intake?",
        "Which dietary strategy best supports my personal digestive health and daily activity level?"
      ]
    },
    "Should I use topical DHT suppression for hair loss?": {
      title: "Educational Framework: Scalp Follicle Biology & DHT Pathways",
      evidenceLevel: "Evidence Level B — Educational Classification",
      summary: "Dihydrotestosterone (DHT) is a metabolite derived from testosterone via the 5-alpha reductase enzyme. Research examines how androgen receptors in hair follicles interact with circulating and local DHT levels.",
      concepts: [
        "Biological Mechanism: 5-alpha reductase converts testosterone to DHT. In genetically susceptible scalp follicles, DHT binding leads to progressive follicular miniaturization.",
        "Research Categories: Pharmacological studies evaluate systemic and topical 5-alpha reductase inhibitors (such as finasteride or dutasteride) to quantify local scalp DHT reduction versus systemic absorption.",
        "Follicle Health: Clinical trials also investigate micro-circulation support (e.g. topical vasodilators) and scalp microbiome inflammation modulation."
      ],
      evidence: [
        "Example from research literature — not an individualized recommendation: Studies measuring topical formulations aim to evaluate local follicle exposure while monitoring systemic serum hormone changes.",
        "Example from research literature — not an individualized recommendation: Therapeutic protocols in clinical trials require individualized medical supervision due to potential side effects and health history considerations."
      ],
      researchContext: [
        "Treatment selection depends on exact diagnosis (e.g., androgenetic alopecia vs. telogen effluvium vs. autoimmune conditions).",
        "Individual sensitivity to 5-alpha reductase inhibition varies significantly.",
        "Combining systemic or topical agents carries potential side effects that necessitate professional clinical guidance."
      ],
      questionsForProfessional: [
        "What is the underlying clinical diagnosis for my scalp or hair changes?",
        "Are topical or systemic pharmacological options appropriate for my personal health profile?",
        "What baseline laboratory blood tests should be performed before considering hormone-modulating treatments?"
      ]
    },
    "How to build muscle & increase strength as a busy professional?": {
      title: "Educational Framework: Resistance Training & Hypertrophy Physiology",
      evidenceLevel: "Evidence Level A — Educational Classification",
      summary: "Hypertrophy research focuses on progressive overload, mechanical tension, volume thresholds, and adequate recovery windows rather than total hours spent in the gym.",
      concepts: [
        "Mechanical Tension: Research identifies high-effort strength training (sets taken close to concentric failure, 1–3 Reps in Reserve) as the key driver of myofibrillar hypertrophy.",
        "Training Volume: Studies indicate that 10–20 working sets per muscle group per week generally optimize growth responses for trained individuals.",
        "Protein Synthesis Windows: Muscle protein synthesis (MPS) remains elevated for 24–48 hours post-workout when supported by adequate leucine-rich protein distribution."
      ],
      evidence: [
        "Example from research literature — not an individualized recommendation: Resistance training splits of 3–4 sessions per week (45–60 minutes) produce comparable strength adaptations to higher frequency routines when weekly set volume is matched.",
        "Example from research literature — not an individualized recommendation: Creatine Monohydrate supplementation (3-5g daily study range) is widely documented to enhance phosphocreatine resynthesis."
      ],
      researchContext: [
        "Time-efficient training strategies (such as supersets or drop sets) maintain high mechanical tension while minimizing workout duration.",
        "Recovery capacity is strongly modulated by systemic stress, sleep quality, and daily energy intake."
      ],
      questionsForProfessional: [
        "How can I structure a strength program that fits my current physical baseline without causing overuse injuries?",
        "What dietary adjustments match my daily energy expenditure and training load?"
      ]
    },
    "Best longevity & sleep research for deep recovery.": {
      title: "Educational Framework: Circadian Biology & Cellular Rejuvenation",
      evidenceLevel: "Evidence Level A — Educational Classification",
      summary: "Longevity science highlights the interplay between sleep architecture (slow-wave and REM sleep), mitochondrial energetics, autophagy pathways, and circadian light exposure.",
      concepts: [
        "Circadian Entrainment: Natural sunlight exposure within 30 minutes of waking triggers suprachiasmatic nucleus signaling, setting nocturnal melatonin release timing.",
        "Autophagy & Fasting Science: Caloric restriction and time-restricted feeding windows are studied for activating cellular cleanup processes and sirtuin pathways.",
        "Glymatic System Clearance: Deep slow-wave sleep enhances metabolic waste clearance from brain tissue via the glymphatic pathway."
      ],
      evidence: [
        "Example from research literature — not an individualized recommendation: Magnesium bisglycinate and L-theanine are evaluated in sleep literature for promoting GABAergic relaxation without altering natural sleep architecture.",
        "Example from research literature — not an individualized recommendation: Consistent sleep/wake schedules demonstrate greater metabolic and cardiovascular correlation than variable sleep durations."
      ],
      researchContext: [
        "Temperature regulation (a cooler sleeping environment ~65–68°F) supports core body temperature drops required for deep sleep initiation.",
        "Avoiding high-intensity blue light 90 minutes before sleep minimizes melatonin suppression."
      ],
      questionsForProfessional: [
        "Should I undergo a sleep study or biomarker evaluation to assess my restorative sleep patterns?",
        "Are supplement protocols safe to combine with my existing medications?"
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
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes("dht") || lowerQuery.includes("hair") || lowerQuery.includes("finasteride")) {
        setActivePreset("Should I use topical DHT suppression for hair loss?");
      } else if (lowerQuery.includes("muscle") || lowerQuery.includes("strength") || lowerQuery.includes("workout")) {
        setActivePreset("How to build muscle & increase strength as a busy professional?");
      } else if (lowerQuery.includes("sleep") || lowerQuery.includes("longevity") || lowerQuery.includes("recovery")) {
        setActivePreset("Best longevity & sleep research for deep recovery.");
      } else {
        setActivePreset("I want to lose 10kg while keeping my muscle.");
      }
    }, 600);
  };

  const currentPlan = activePreset && generatedResponses[activePreset]
    ? generatedResponses[activePreset]
    : generatedResponses["I want to lose 10kg while keeping my muscle."];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-3xl space-y-6 mb-8">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <Sparkles className="w-4 h-4 text-emerald-400" /> AiX Health Educational Intelligence Engine
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          AiX Health Education Coach
        </h1>
        <p className="text-xl text-emerald-400 font-mono text-sm tracking-wide uppercase font-bold">
          Educational information, not individualized medical advice.
        </p>
        <p className="text-base text-zinc-400 font-light leading-relaxed font-sans">
          Explore evidence-based research, biological mechanisms, lifestyle frameworks, and educational context for your health questions.
        </p>
      </div>

      {/* Visible AI Health Disclaimer */}
      <div className="max-w-4xl mb-10">
        <HealthDisclaimer type="AI" />
      </div>

      {/* Preset Buttons */}
      <div className="mb-8 space-y-3">
        <p className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">Suggested Educational Topics:</p>
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
          <label htmlFor="ai-coach-query" className="sr-only">Ask AiX Health Educational Coach</label>
          <input
            type="text"
            id="ai-coach-query"
            aria-label="Ask AiX Health Educational Coach"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AiX Health (e.g. 'What does research say about energy balance and protein?')"
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

      {/* Educational Response Panel */}
      <div className="max-w-4xl p-8 sm:p-12 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-8 shadow-2xl relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.08] pb-6 gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">Educational Guidance & Research Context</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">{currentPlan.title}</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold w-fit">
            {currentPlan.evidenceLevel}
          </span>
        </div>

        <p className="text-zinc-300 font-sans text-sm leading-relaxed border-l-2 border-emerald-500 pl-4">
          {currentPlan.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Core Biological Concepts
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.concepts.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Literature Examples & Research
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.evidence.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Research Context & Factors
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.researchContext.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/[0.08] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Questions for a Qualified Professional
            </h4>
            <ul className="space-y-2 text-xs text-zinc-300 font-sans list-disc list-inside">
              {currentPlan.questionsForProfessional.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 font-mono">Want to discuss your personal health history with a licensed healthcare professional?</p>
          <Link href="/contact" className="px-6 py-3 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
            Educational Contact Support →
          </Link>
        </div>

      </div>

    </div>
  );
}
