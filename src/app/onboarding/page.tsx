"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAiXHealth } from "../../context/HealthOSContext";
import { 
  ArrowRight, 
  Check, 
  Activity, 
  Zap, 
  Award, 
  Heart, 
  Flame, 
  Dumbbell, 
  Droplets, 
  Sparkles,
  AlertCircle,
  Moon,
  Utensils
} from "lucide-react";

export default function OnboardingPage() {
  const { submitOnboarding } = useAiXHealth();
  
  const [step, setStep] = useState<number>(1);
  const [stepError, setStepError] = useState<string | null>(null);

  // Step 1: Main Goal
  const [mainGoal, setMainGoal] = useState<string>("Build Muscle");

  // Step 2: Biological Profile
  const [age, setAge] = useState<string>("28");
  const [height, setHeight] = useState<string>("180");
  const [weight, setWeight] = useState<string>("78");
  const [sex, setSex] = useState<"Male" | "Female" | "Other">("Male");
  const [activityLevel, setActivityLevel] = useState<string>("Moderate (3-4 workouts/wk)");

  // Step 3: Lifestyle & Recovery
  const [sleepQuality, setSleepQuality] = useState<string>("7-8 hours (Good)");
  const [stressLevel, setStressLevel] = useState<string>("Moderate");
  const [trainingFreq, setTrainingFreq] = useState<string>("4 sessions / week");
  const [dietStyle, setDietStyle] = useState<string>("High Protein / Balanced");

  // Step 4: Health Priorities
  const [selectedSkinPriorities, setSelectedSkinPriorities] = useState<string[]>(["Acne Clearing", "Barrier Repair"]);
  const [selectedFitnessPriorities, setSelectedFitnessPriorities] = useState<string[]>(["Muscle Hypertrophy", "Strength"]);

  const mainGoalsList = [
    { id: "Build Muscle", label: "Build Muscle", desc: "Maximize lean muscle hypertrophy & physical power", icon: Dumbbell },
    { id: "Lose Fat", label: "Lose Fat", desc: "Accelerate metabolic fat loss & visceral body fat reduction", icon: Flame },
    { id: "Improve Skin", label: "Improve Skin", desc: "Clear acne, repair skin barrier & enhance hydration", icon: Droplets },
    { id: "Increase Energy", label: "Increase Energy", desc: "Optimize mitochondrial ATP synthesis & executive focus", icon: Zap },
    { id: "Better Sleep", label: "Better Sleep", desc: "Enhance deep REM sleep architecture & lower evening cortisol", icon: Moon },
    { id: "Longevity", label: "Longevity", desc: "Cellular Sirtuin activation, NAD+ loading & cardiovascular health", icon: Heart },
    { id: "Athletic Performance", label: "Athletic Performance", desc: "Phosphocreatine ATP replenishment & neural recovery", icon: Award }
  ];

  const sleepOptions = [
    { value: "< 6 hours (Poor)", label: "Under 6 hrs", sub: "Poor / Fragmented" },
    { value: "6-7 hours (Fair)", label: "6–7 hrs", sub: "Fair / Moderate" },
    { value: "7-8 hours (Good)", label: "7–8 hrs", sub: "Good / Restorative" },
    { value: "8+ hours (Optimal)", label: "8+ hrs", sub: "Optimal Recovery" }
  ];

  const stressOptions = [
    { value: "Low (Relaxed)", label: "Low", sub: "Calm & Balanced" },
    { value: "Moderate", label: "Moderate", sub: "Manageable Stress" },
    { value: "High (Executive/Demanding)", label: "High", sub: "Executive / Demanding" },
    { value: "Severe Chronic Stress", label: "Severe", sub: "Chronic / Fatigue" }
  ];

  const trainingOptions = [
    { value: "2 sessions / week", label: "2 / week", sub: "Maintenance" },
    { value: "3 sessions / week", label: "3 / week", sub: "Progressive" },
    { value: "4 sessions / week", label: "4 / week", sub: "Dedicated Split" },
    { value: "5-6 sessions / week", label: "5–6 / week", sub: "Athletic High-Volume" }
  ];

  const dietOptions = [
    { value: "High Protein / Balanced", label: "High Protein", sub: "Lean Growth & Recovery" },
    { value: "Mediterranean Bio-Active", label: "Mediterranean", sub: "Polyphenols & Longevity" },
    { value: "Low Carb / Ketogenic", label: "Low Carb", sub: "Fat Oxidation" },
    { value: "Plant-Based Complete", label: "Plant-Based", sub: "Micronutrient-Dense" }
  ];

  const toggleSkinPriority = (item: string) => {
    setStepError(null);
    setSelectedSkinPriorities(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const toggleFitnessPriority = (item: string) => {
    setStepError(null);
    setSelectedFitnessPriorities(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const handleNext = () => {
    setStepError(null);

    if (step === 1) {
      if (!mainGoal || mainGoal.trim() === "") {
        setStepError("Please select a primary goal to proceed.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const numAge = parseInt(age, 10);
      const numHeight = parseFloat(height);
      const numWeight = parseFloat(weight);

      if (isNaN(numAge) || numAge < 10 || numAge > 120) {
        setStepError("Please enter a valid age between 10 and 120.");
        return;
      }
      if (isNaN(numHeight) || numHeight < 50 || numHeight > 260) {
        setStepError("Please enter a valid height in cm between 50 and 260.");
        return;
      }
      if (isNaN(numWeight) || numWeight < 30 || numWeight > 300) {
        setStepError("Please enter a valid weight in kg between 30 and 300.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!sleepQuality || !stressLevel || !trainingFreq || !dietStyle) {
        setStepError("Please select all lifestyle and recovery variables.");
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (selectedSkinPriorities.length === 0 && selectedFitnessPriorities.length === 0) {
        setStepError("Please select at least one priority focus area to complete your profile.");
        return;
      }

      // Synchronously commit profile data and advance to generated profile
      const userProfilePayload = {
        skinType: "Combination" as const,
        sensitivity: "Low" as const,
        concerns: [...selectedSkinPriorities, ...selectedFitnessPriorities],
        goals: [mainGoal],
      };

      submitOnboarding(userProfilePayload);

      try {
        localStorage.setItem("healthos_user_onboarded", "true");
        localStorage.setItem("healthos_user_goal", mainGoal);
        localStorage.setItem("healthos_user_profile", JSON.stringify({
          age,
          height,
          weight,
          sex,
          activityLevel,
          sleepQuality,
          stressLevel,
          trainingFreq,
          dietStyle,
          skinPriorities: selectedSkinPriorities,
          fitnessPriorities: selectedFitnessPriorities,
          submittedAt: new Date().toISOString()
        }));
      } catch (err) {
        console.warn("AiX Health: LocalStorage write warning", err);
      }

      setStep(5);
    }
  };

  const handleBack = () => {
    setStepError(null);
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const parsedWeight = parseFloat(weight) || 78;
  const calculatedProteinGrams = Math.round(parsedWeight * 2.2);
  const calculatedCalories = mainGoal === "Lose Fat" ? "2,100 kcal" : mainGoal === "Build Muscle" ? "2,750 kcal" : "2,450 kcal";
  const protocolName = mainGoal === "Lose Fat" 
    ? "90-Day Metabolic Fat Loss" 
    : mainGoal === "Build Muscle" 
      ? "90-Day Hypertrophy Blueprint" 
      : mainGoal === "Improve Skin"
        ? "90-Day Barrier & Clarity Protocol"
        : "90-Day Cellular Longevity Protocol";

  return (
    <div className="min-h-screen bg-[#050505] pt-20 sm:pt-24 pb-36 px-4 sm:px-6 flex flex-col items-center justify-center font-sans text-white relative">
      
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8">
        
        {/* Progress Bar Header */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
            <span className="text-emerald-400">Step 0{step} of 05</span>
            <span>{step === 5 ? "Profile Activated" : "Onboarding Engine"}</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/[0.06]">
            <div 
              className="h-full bg-emerald-500 transition-all duration-300 ease-out" 
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Error Notification */}
        {stepError && (
          <motion.div 
            initial={{ opacity: 0, y: -6 }} 
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs font-sans flex items-center gap-2.5"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{stepError}</span>
          </motion.div>
        )}

        {/* STEP 1: MAIN GOAL */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 1 — Core Objective</span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">What is your primary health goal?</h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans">Select the main outcome you want to achieve with AiX Health.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mainGoalsList.map((g) => {
                const Icon = g.icon;
                const isSelected = mainGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => {
                      setStepError(null);
                      setMainGoal(g.id);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 cursor-pointer ${
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
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 2 — Biological Baseline</span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Enter your biological profile</h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans">Used to calculate target calories, protein requirements, and metabolic output.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-6">
              
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="space-y-2">
                  <label htmlFor="onboarding-age" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Age</label>
                  <input 
                    id="onboarding-age"
                    type="number" 
                    min={10} 
                    max={120} 
                    value={age} 
                    onChange={(e) => {
                      setStepError(null);
                      setAge(e.target.value);
                    }} 
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3 sm:px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="onboarding-height" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Height (cm)</label>
                  <input 
                    id="onboarding-height"
                    type="number" 
                    min={50} 
                    max={260} 
                    value={height} 
                    onChange={(e) => {
                      setStepError(null);
                      setHeight(e.target.value);
                    }} 
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3 sm:px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono" 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="onboarding-weight" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Weight (kg)</label>
                  <input 
                    id="onboarding-weight"
                    type="number" 
                    min={30} 
                    max={300} 
                    value={weight} 
                    onChange={(e) => {
                      setStepError(null);
                      setWeight(e.target.value);
                    }} 
                    className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-3 sm:px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 font-mono" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Sex / Gender Profile</label>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {(["Male", "Female", "Other"] as const).map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => {
                        setStepError(null);
                        setSex(s);
                      }}
                      className={`py-3 rounded-xl border text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
                        sex === s ? "bg-emerald-500 text-zinc-950 border-emerald-500 shadow-sm shadow-emerald-500/30" : "bg-[#0A0A0A] text-zinc-400 border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="onboarding-activity" className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold">Daily Physical Activity Level</label>
                <select 
                  id="onboarding-activity"
                  value={activityLevel} 
                  onChange={(e) => {
                    setStepError(null);
                    setActivityLevel(e.target.value);
                  }} 
                  className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3.5 text-white text-xs font-sans focus:outline-none focus:border-emerald-500 cursor-pointer"
                >
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
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 3 — Lifestyle & Recovery</span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Configure lifestyle variables</h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans">Helps us customize your recovery, sleep architecture, and stress management stack.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-6">
              
              {/* Sleep Quality Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-emerald-400" />
                    Average Nightly Sleep
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">{sleepQuality}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {sleepOptions.map((opt) => {
                    const isSelected = sleepQuality === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setStepError(null);
                          setSleepQuality(opt.value);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                            : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Perceived Stress Level Selection */}
              <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    Perceived Stress Level
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">{stressLevel}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {stressOptions.map((opt) => {
                    const isSelected = stressLevel === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setStepError(null);
                          setStressLevel(opt.value);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                            : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Training Frequency Selection */}
              <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-1.5">
                    <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />
                    Training Frequency Target
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">{trainingFreq}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {trainingOptions.map((opt) => {
                    const isSelected = trainingFreq === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setStepError(null);
                          setTrainingFreq(opt.value);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                            : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dietary Style Preference Selection */}
              <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                    Dietary Style Preference
                  </label>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">{dietStyle}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {dietOptions.map((opt) => {
                    const isSelected = dietStyle === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setStepError(null);
                          setDietStyle(opt.value);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-emerald-950/40 border-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                            : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                        }`}
                      >
                        <div className="text-xs font-bold font-mono text-white flex items-center justify-between">
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                        </div>
                        <p className="text-[10px] text-zinc-400 font-sans mt-0.5">{opt.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 4: HEALTH PRIORITIES (SKIN & FITNESS) */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Step 4 — Specific Priorities</span>
              <h1 className="text-2xl sm:text-4xl font-bold tracking-tight">Select your key focus areas</h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans">Choose all specific outcomes you wish to optimize in your blueprint.</p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-6">
              
              <div className="space-y-3">
                <label className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-emerald-400" />
                  Skin & Dermal Health Priorities
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Acne Clearing", "Barrier Repair", "Anti-Aging Collagen", "Rosacea & Redness", "Sensitive Skin", "Hyperpigmentation"].map((s) => {
                    const isSel = selectedSkinPriorities.includes(s);
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggleSkinPriority(s)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                          isSel ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/10" : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:text-white"
                        }`}
                      >
                        {isSel ? "✓ " : "+ "} {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/[0.08]">
                <label className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <Dumbbell className="w-4 h-4 text-emerald-400" />
                  Fitness & Body Composition Priorities
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Muscle Hypertrophy", "Strength", "Fat Loss", "VO2 Max Endurance", "Joint Recovery", "Posture Optimization"].map((f) => {
                    const isSel = selectedFitnessPriorities.includes(f);
                    return (
                      <button
                        key={f}
                        type="button"
                        onClick={() => toggleFitnessPriority(f)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-sans transition-all cursor-pointer ${
                          isSel ? "bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold shadow-sm shadow-emerald-500/10" : "bg-[#0A0A0A] border-white/[0.08] text-zinc-400 hover:text-white"
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

        {/* STEP 5: ACTIVATED PROFILE */}
        {step === 5 && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-left">
            <div className="p-8 sm:p-14 rounded-[36px] sm:rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-8 relative overflow-hidden shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AiX Health Profile Activated
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">Welcome to AiX Health, Member</h2>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold font-mono text-sm">
                  100%
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono">
                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Target Daily Protein</p>
                  <p className="text-xl font-bold text-white">{calculatedProteinGrams}g / day</p>
                  <p className="text-[10px] text-emerald-400/80 font-sans">2.2g per kg bodyweight</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Baseline Caloric Target</p>
                  <p className="text-xl font-bold text-white">{calculatedCalories}</p>
                  <p className="text-[10px] text-emerald-400/80 font-sans">Goal: {mainGoal}</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-1">
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Assigned 90-Day Protocol</p>
                  <p className="text-sm font-bold text-emerald-400 line-clamp-1">{protocolName}</p>
                  <p className="text-[10px] text-zinc-400 font-sans">Evidence Level A–B</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs text-zinc-400 space-y-1 font-sans">
                <p className="font-semibold text-zinc-300 font-mono text-[11px] uppercase tracking-wider">Configuration Summary:</p>
                <p>Age: {age} • Weight: {weight}kg • Height: {height}cm • Sex: {sex} • Sleep: {sleepQuality} • Diet: {dietStyle}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/dashboard" 
                  id="enter-dashboard-btn"
                  className="w-full text-center py-4 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>Enter AiX Health Dashboard</span>
                  <ArrowRight className="w-4 h-4 text-zinc-950" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP NAVIGATION BUTTONS (Steps 1 to 4) */}
        {step < 5 && (
          <div className="flex justify-between items-center pt-4">
            {step > 1 ? (
              <button
                type="button"
                id="onboarding-back-btn"
                onClick={handleBack}
                className="px-6 py-3.5 rounded-full bg-zinc-900 border border-white/[0.08] text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                Back
              </button>
            ) : <div />}

            <button
              type="button"
              id="onboarding-next-btn"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs font-mono uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer ml-auto"
            >
              <span>{step === 4 ? "Generate Profile" : "Continue"}</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
          </div>
        )}

        {/* EDUCATIONAL DISCLAIMER */}
        <p className="text-center text-[11px] text-zinc-500 font-sans pt-2">
          Educational content only — not medical advice.
        </p>

      </div>

    </div>
  );
}
