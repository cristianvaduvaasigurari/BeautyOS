"use client";

import React, { useState } from "react";
import { useBeautyOS } from "../context/BeautyOSContext";
import { Sparkles, ArrowRight, Check } from "lucide-react";

export const Onboarding: React.FC = () => {
  const { submitOnboarding } = useBeautyOS();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [skinType, setSkinType] = useState<"Normal" | "Dry" | "Oily" | "Combination">("Normal");
  const [sensitivity, setSensitivity] = useState<"Low" | "Medium" | "High">("Low");
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const concernsList = ["Acne", "Redness", "Aging", "Hyperpigmentation", "Dehydration", "Dullness"];
  const goalsList = ["Hydration", "Clear Skin", "Brightening", "Barrier Repair", "Anti-Aging", "Texture Smoothing"];

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
      // Optionally save user name globally
      localStorage.setItem("user_fullname", fullName || "Skincare Explorer");
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
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Cum te numești?
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Numele tău complet"
                className="w-full bg-zinc-900 border border-white/10 rounded-2xl px-5 py-4 text-zinc-100 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all font-sans"
              />
            </div>
            <div>
              <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                BeautyOS folosește datele tale doar la nivel local pe acest dispozitiv pentru a-ți personaliza sugestiile din cabinetul de îngrijire.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                Care este tipul tău de ten?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(["Normal", "Dry", "Oily", "Combination"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSkinType(type)}
                    className={`p-4 rounded-2xl border text-left font-sans transition-all duration-300 ${
                      skinType === type
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium"
                        : "bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-800"
                    }`}
                  >
                    <div className="text-sm font-semibold">{type === "Dry" ? "Dry (Uscat)" : type === "Oily" ? "Oily (Sec)" : type === "Combination" ? "Combination (Mixt)" : "Normal"}</div>
                    <span className="text-[10px] text-zinc-500 font-light mt-0.5 block">
                      {type === "Dry" && "Senzație de strângere, zone descuamate"}
                      {type === "Oily" && "Exces de sebum, luciu persistent"}
                      {type === "Combination" && "Zona T grasă, obrajii normali/uscacți"}
                      {type === "Normal" && "Echilibrat, textură uniformă"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                Nivelul de sensibilitate:
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {(["Low", "Medium", "High"] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSensitivity(lvl)}
                    className={`py-3 px-4 rounded-xl border text-center text-xs font-sans font-medium transition-all ${
                      sensitivity === lvl
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-400"
                        : "bg-zinc-900 border-white/5 text-zinc-500 hover:border-zinc-800"
                    }`}
                  >
                    {lvl === "Low" ? "Scăzută" : lvl === "Medium" ? "Medie" : "Ridicată"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Alege problemele tenului pe care vrei să le adresezi:
              </label>
              <p className="text-[10px] text-zinc-500 font-sans mb-4">Poți selecta mai multe opțiuni.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {concernsList.map((concern) => {
                  const isSelected = selectedConcerns.includes(concern);
                  return (
                    <button
                      key={concern}
                      onClick={() => toggleConcern(concern)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between font-sans transition-all ${
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium"
                          : "bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-800"
                      }`}
                    >
                      <span className="text-xs">{concern}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2">
                Alege obiectivele tale pentru rutina zilnică:
              </label>
              <p className="text-[10px] text-zinc-500 font-sans mb-4">Acestea vor ajusta scorul de compatibilitate al produselor.</p>
              <div className="grid grid-cols-2 gap-2.5">
                {goalsList.map((goal) => {
                  const isSelected = selectedGoals.includes(goal);
                  return (
                    <button
                      key={goal}
                      onClick={() => toggleGoal(goal)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between font-sans transition-all ${
                        isSelected
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-medium"
                          : "bg-zinc-900 border-white/5 text-zinc-400 hover:border-zinc-800"
                      }`}
                    >
                      <span className="text-xs">{goal}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-zinc-100 font-sans select-none">
      <div className="w-full max-w-md bg-zinc-950 border border-white/5 rounded-[32px] p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        
        {/* Glow effect background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Progress indicator */}
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-1 text-emerald-400 font-semibold font-mono tracking-wider">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>DIAGNOSTIC TEN</span>
          </div>
          <span className="font-mono text-zinc-500">Pasul {step} din 4</span>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            style={{ width: `${(step / 4) * 100}%` }}
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300 rounded-full"
          />
        </div>

        {/* Dynamic header text */}
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            {step === 1 && "Bun venit la BeautyOS"}
            {step === 2 && "Tipul de ten și sensibilitatea"}
            {step === 3 && "Preocupările tenului"}
            {step === 4 && "Obiectivele tale"}
          </h2>
          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
            {step === 1 && "Analiza ingredientelor și scorul Oura/Apple Health pentru tenul tău, integrate într-o singură aplicație locală."}
            {step === 2 && "Tenul uscat, mixt sau sensibil are nevoi diferite și ingredient incompatibilități distincte."}
            {step === 3 && "Alegem doar produsele care tratează eficient problemele identificate de tine."}
            {step === 4 && "Creăm o potrivire perfectă bazată pe ingrediente active, aciditate și compatibilitate."}
          </p>
        </div>

        {/* Form area */}
        <div className="flex-1 py-2">{renderStep()}</div>

        {/* Control row */}
        <div className="flex gap-3 mt-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3.5 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white transition-all text-xs font-semibold cursor-pointer"
            >
              Înapoi
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/10 hover:brightness-110 active:scale-98 transition-all cursor-pointer"
          >
            <span>{step === 4 ? "Finalizează diagnostic" : "Continuă"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
