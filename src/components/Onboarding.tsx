"use client";

import React, { useState } from "react";
import { useAiXHealth } from "../context/HealthOSContext";
import { ArrowRight, Check, Activity } from "lucide-react";

export const Onboarding: React.FC = () => {
  const { submitOnboarding } = useAiXHealth();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [skinType, setSkinType] = useState<"Normal" | "Dry" | "Oily" | "Combination">("Normal");
  const [sensitivity, setSensitivity] = useState<"Low" | "Medium" | "High">("Low");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const concernsList = [
    "Acne & Skin Clarity",
    "Redness & Inflammation",
    "Hair Loss & Scalp Density",
    "Fatigue & Low Energy",
    "Sleep Disruption",
    "Slow Muscle Recovery",
    "Body Fat Retention",
    "Hormonal Imbalance"
  ];
  
  const goalsList = [
    "Maximum Hydration & Glow",
    "Clear & Radiant Skin",
    "Muscle Hypertrophy & Strength",
    "Body Fat Reduction",
    "Mitochondrial Longevity",
    "Deep Sleep Optimization",
    "Cortisol & Stress Control",
    "Gut Microbiome Repair"
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      submitOnboarding({
        skinType,
        sensitivity,
        concerns: selectedConcerns,
        goals: selectedGoals,
      });
      localStorage.setItem("user_fullname", fullName || "AiX Health Member");
    }
  };

  const toggleConcern = (concern: string) => {
    setSelectedConcerns((prev) =>
      prev.includes(concern) ? prev.filter((c) => c !== concern) : [...prev, concern]
    );
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white tracking-tight">Welcome to AiX Health</h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Let&apos;s configure your biological baseline. What should we call you?
            </p>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Full Name"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl px-4 py-3.5 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 text-sm font-sans"
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white tracking-tight">Tissue & Sensitivity Profile</h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">Select your skin / tissue type and reactivity level.</p>
            
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Skin / Tissue Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(["Normal", "Dry", "Oily", "Combination"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSkinType(t)}
                    className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                      skinType === t ? "bg-emerald-500 text-zinc-950 border-emerald-500" : "bg-[#0A0A0A] text-zinc-300 border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Sensitivity Index</label>
              <div className="grid grid-cols-3 gap-2">
                {(["Low", "Medium", "High"] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSensitivity(s)}
                    className={`py-3 px-4 rounded-xl border text-xs font-semibold transition-all ${
                      sensitivity === s ? "bg-emerald-500 text-zinc-950 border-emerald-500" : "bg-[#0A0A0A] text-zinc-300 border-white/[0.08] hover:border-white/20"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white tracking-tight">Health & Physiological Concerns</h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">Select all areas you want to optimize or target.</p>
            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {concernsList.map((c) => {
                const active = selectedConcerns.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConcern(c)}
                    className={`py-3 px-3 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      active ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-[#0A0A0A] text-zinc-400 border-white/[0.08]"
                    }`}
                  >
                    <span className="truncate">{c}</span>
                    {active && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-5 animate-fadeIn">
            <h2 className="text-xl font-bold text-white tracking-tight">Primary Optimization Goals</h2>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">Choose the outcomes you want AiX Health to help you achieve.</p>
            <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {goalsList.map((g) => {
                const active = selectedGoals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`py-3 px-3 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      active ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : "bg-[#0A0A0A] text-zinc-400 border-white/[0.08]"
                    }`}
                  >
                    <span className="truncate">{g}</span>
                    {active && <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-zinc-100 font-sans">
      <div className="w-full max-w-md bg-[#101114] border border-white/[0.08] rounded-[32px] p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold font-mono text-white">AiX Health Setup</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Step 0{step} / 04</span>
        </div>

        {renderStep()}

        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all font-mono flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
        >
          <span>{step === 4 ? "Complete Setup & Launch Dashboard" : "Continue"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
