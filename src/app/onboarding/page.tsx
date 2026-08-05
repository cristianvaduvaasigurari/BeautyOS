"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHealthOS } from "../../context/HealthOSContext";
import { ArrowRight, Check, Activity, Zap, Award, Heart, Flame, Dumbbell, Droplets, Sparkles } from "lucide-react";

export default function OnboardingPage() {
  const { submitOnboarding } = useHealthOS();
  
  const [step, setStep] = useState(1);

  // Step 1: Main Goal
  const [mainGoal, setMainGoal] = useState<string>("Build Muscle");

  // Step 2: Biological Profile
  const [age, setAge] = useState<string>("28");
  const [height, setHeight] = useState<string>("180");
  const [weight, setWeight] = useState<string>("78");
  const [sex, setSex] = useState<"Male" | "Female" | "Other">("Male");
  const [activityLevel, setActivityLevel] = useState<string>("Moderate (3-4 workouts/wk)");

  // Step 3: Lifestyle
  const [sleepQuality, setSleepQuality] = useState<string>("7-8 hours (Good)");
  const [stressLevel, setStressLevel] = useState<string>("Moderate");
  const [trainingFreq, setTrainingFreq] = useState<string>("4 sessions / week");
  const [dietStyle, setDietStyle] = useState<string>("High Protein / Mediterranean");

  // Step 4: Health Priorities
  const [selectedSkinPriorities, setSelectedSkinPriorities] = useState<string[]>(["Acne Clearing", "Barrier Repair"]);
  const [selectedFitnessPriorities, setSelectedFitnessPriorities] = useState<string[]>(["Muscle Hypertrophy", "Strength"]);

  // Step 5: Complete & Profile Generation
  const [isGenerating, setIsGenerating] = useState(false);

  const mainGoalsList = [
    { id: "Build Muscle", label: "Build Muscle", desc: "Maximize lean muscle hypertrophy & physical power", icon: Dumbbell },
    { id: "Lose Fat", label: "Lose Fat", desc: "Accelerate metabolic fat loss & visceral body fat reduction", icon: Flame },
    { id: "Improve Skin", label: "Improve Skin", desc: "Clear acne, repair skin barrier & enhance hydration", icon: Droplets },
    { id: "Increase Energy", label: "Increase Energy", desc: "Optimize mitochondrial ATP synthesis & executive focus", icon: Zap },
    { id: "Better Sleep", label: "Better Sleep", desc: "Enhance deep REM sleep architecture & lowering evening cortisol", icon: MoonIcon },
    { id: "Longevity", label: "Longevity", desc: "Cellular Sirtuin activation, NAD+ loading & cardiovascular health", icon: Heart },
    { id: "Athletic Performance", label: "Athletic Performance", desc: "Phosphocreatine ATP replenishment & neural recovery", icon: Award }
  ];

  function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
    return <Activity {...props} />;
  }

  const toggleSkinPriority = (item: string) => {
    setSelectedSkinPriorities(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const toggleFitnessPriority = (item: string) => {
    setSelectedFitnessPriorities(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      setStep(5);
      setIsGenerating(true);
      
      setTimeout(() => {
        setIsGenerating(false);
        submitOnboarding({
          skinType: "Combination",
          sensitivity: "Low",
          concerns: [...selectedSkinPriorities, ...selectedFitnessPriorities],
          goals: [mainGoal],
        });
        localStorage.setItem("healthos_user_onboarded", "true");
        localStorage.setItem("healthos_user_goal", mainGoal);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-32 px-6 flex flex-col items-center justify-center font-sans text-white">
      
      <div className="max-w-2xl w-full space-y-8">
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
            <span>Step 0{step} of 05</span>
            <span>{step === 5 ? "Profile Ready" : "Onboarding Engine"}</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/[0.06]">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500" 
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: MAIN GOAL */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 1 — Core Objective</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">What is your primary health goal?</h1>
              <p className="text-sm text-zinc-400 font-sans">Select the main outcome you want to achieve with HealthOS.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainGoalsList.map((g) => {
                const Icon = g.icon;
                const isSelected = mainGoal === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setMainGoal(g.id)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
                      isSelected 
                        ? "bg-emerald-950/40 border-emerald-500 text-white shadow-lg shadow-emerald-500/10" 
                        : "bg-[#101114] border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? "bg-emerald-500 text-zinc-950" : "bg-zinc-900 text-zinc-400"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white">{g.label}</h3>
                      <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-2">{g.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* STEP 2: BIOLOGICAL PROFILE */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 2 — Biological Baseline</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Enter your biological profile</h1>
              <p className="text-sm text-zinc-400 font-sans">Used to calculate target calories, protein requirements, and metabolic output.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-6">
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Height (cm)</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Weight (kg)</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50 font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Sex / Gender Profile</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["Male", "Female", "Other"] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSex(s)}
                      className={`py-3 rounded-xl border text-xs font-mono uppercase tracking-wider font-bold transition-all ${
                        sex === s ? "bg-emerald-500 text-zinc-950 border-emerald-500" : "bg-[#0A0A0A] text-zinc-400 border-white/[0.08]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Daily Physical Activity Level</label>
                <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-emerald-500/50 appearance-none">
                  <option value="Sedentary (Desk Job)">Sedentary (Desk Job, little exercise)</option>
                  <option value="Lightly Active (1-2 workouts/wk)">Lightly Active (1-2 workouts/wk)</option>
                  <option value="Moderate (3-4 workouts/wk)">Moderate (3-4 workouts/wk)</option>
                  <option value="Very Active (5-6 workouts/wk)">Very Active (5-6 workouts/wk)</option>
                  <option value="Athlete (Double Sessions)">Athlete (Double Sessions daily)</option>
                </select>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 3: LIFESTYLE & RECOVERY */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 3 — Lifestyle & Recovery</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Configure lifestyle variables</h1>
              <p className="text-sm text-zinc-400 font-sans">Helps us customize your recovery, sleep, and stress management stack.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Average Nightly Sleep</label>
                  <select value={sleepQuality} onChange={(e) => setSleepQuality(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-emerald-500/50">
                    <option value="< 6 hours (Poor)">Under 6 hours (Poor)</option>
                    <option value="6-7 hours (Fair)">6-7 hours (Fair)</option>
                    <option value="7-8 hours (Good)">7-8 hours (Good)</option>
                    <option value="8+ hours (Optimal)">8+ hours (Optimal)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Perceived Stress Level</label>
                  <select value={stressLevel} onChange={(e) => setStressLevel(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-emerald-500/50">
                    <option value="Low (Relaxed)">Low (Relaxed)</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High (Executive/Demanding)">High (Executive/Demanding)</option>
                    <option value="Severe Chronic Stress">Severe Chronic Stress</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Training Frequency Target</label>
                  <select value={trainingFreq} onChange={(e) => setTrainingFreq(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-emerald-500/50">
                    <option value="2 sessions / week">2 sessions / week</option>
                    <option value="3 sessions / week">3 sessions / week</option>
                    <option value="4 sessions / week">4 sessions / week</option>
                    <option value="5-6 sessions / week">5-6 sessions / week</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Dietary Style Preference</label>
                  <select value={dietStyle} onChange={(e) => setDietStyle(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-xs font-sans focus:outline-none focus:border-emerald-500/50">
                    <option value="High Protein / Balanced">High Protein / Balanced</option>
                    <option value="Mediterranean Bio-Active">Mediterranean Bio-Active</option>
                    <option value="Low Carb / Ketogenic">Low Carb / Ketogenic</option>
                    <option value="Plant-Based Complete">Plant-Based Complete</option>
                  </select>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 4: HEALTH PRIORITIES (SKIN & FITNESS) */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 4 — Specific Priorities</span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Select your key focus areas</h1>
              <p className="text-sm text-zinc-400 font-sans">Choose all specific outcomes you wish to optimize.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-6">
              
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Skin & Dermal Health Priorities</label>
                <div className="flex flex-wrap gap-2">
                  {["Acne Clearing", "Barrier Repair", "Anti-Aging Collagen", "Rosacea & Redness", "Sensitive Skin", "Hyperpigmentation"].map((s) => {
                    const isSel = selectedSkinPriorities.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkinPriority(s)}
                        className={`px-4 py-2 rounded-xl border text-xs font-sans transition-all ${
                          isSel ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold" : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:text-white"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "} {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <label className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Fitness & Body Composition Priorities</label>
                <div className="flex flex-wrap gap-2">
                  {["Muscle Hypertrophy", "Strength", "Fat Loss", "VO2 Max Endurance", "Joint Recovery", "Posture Optimization"].map((f) => {
                    const isSel = selectedFitnessPriorities.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFitnessPriority(f)}
                        className={`px-4 py-2 rounded-xl border text-xs font-sans transition-all ${
                          isSel ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold" : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:text-white"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "} {f}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 5: GENERATED PROFILE */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center">
            
            {isGenerating ? (
              <div className="p-16 rounded-[40px] bg-[#101114] border border-emerald-500/30 space-y-6 flex flex-col items-center justify-center">
                <Sparkles className="w-12 h-12 text-emerald-400 animate-spin" />
                <h2 className="text-2xl font-bold text-white tracking-tight">Synthesizing Your HealthOS Profile...</h2>
                <p className="text-xs text-zinc-400 font-mono">Calculating protein targets, metabolic rate, supplement stacks, and 90-day protocols...</p>
              </div>
            ) : (
              <div className="p-12 sm:p-16 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-8 text-left relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">HealthOS Profile Activated</span>
                    <h2 className="text-3xl font-bold text-white tracking-tight mt-1">Welcome to HealthOS, Member</h2>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono">
                    100%
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase">Target Daily Protein</p>
                    <p className="text-xl font-bold text-white">{Math.round(parseFloat(weight) * 2.2 || 160)}g</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase">Baseline Caloric Target</p>
                    <p className="text-xl font-bold text-white">{mainGoal === "Lose Fat" ? "2,100 kcal" : "2,650 kcal"}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase">Assigned 90-Day Protocol</p>
                    <p className="text-sm font-bold text-emerald-400">{mainGoal === "Lose Fat" ? "90-Day Fat Loss" : "90-Day Muscle Growth"}</p>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link href="/dashboard" className="w-full text-center py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
                    Enter HealthOS Dashboard →
                  </Link>
                </div>
              </div>
            )}

          </motion.div>
        )}

        {/* NAV BUTTONS */}
        {step < 5 && (
          <div className="flex justify-between items-center pt-4">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 rounded-full bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors"
              >
                Back
              </button>
            ) : <div />}

            <button
              onClick={handleNext}
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <span>{step === 4 ? "Generate Profile" : "Continue"}</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
