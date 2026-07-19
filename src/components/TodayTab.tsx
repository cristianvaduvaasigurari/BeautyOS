"use client";

import React, { useState } from "react";
import { useBeautyOS, PRODUCTS_CATALOG } from "../context/BeautyOSContext";
import { designSystem } from "../styles/designSystem";
import { Check, Sun, Moon, Droplets, Heart, HelpCircle, Activity, Sparkles, AlertCircle, X, ChevronRight } from "lucide-react";

export const TodayTab: React.FC = () => {
  const {
    currentSkinIndex,
    morningSteps,
    eveningSteps,
    userCabinet,
    toggleRoutineStep,
    logSkinCheckin,
    recommendations,
  } = useBeautyOS();

  // Bottom Sheet Routines Trigger
  const [activeRoutineSheet, setActiveRoutineSheet] = useState<"morning" | "evening" | null>(null);

  // Checkin states
  const [showCheckin, setShowCheckin] = useState(false);
  const [hydration, setHydration] = useState(3);
  const [redness, setRedness] = useState(1);
  const [irritation, setIrritation] = useState(1);
  const [sleep, setSleep] = useState(8);
  const [water, setWater] = useState(2000);
  const [notes, setNotes] = useState("");

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logSkinCheckin({
      hydration,
      redness,
      irritation,
      sleep,
      water,
      notes,
    });
    setShowCheckin(false);
  };

  const getProductDetails = (userProductId: string) => {
    const userProduct = userCabinet.find((up) => up.id === userProductId);
    if (!userProduct) return null;
    const catalogItem = PRODUCTS_CATALOG.find((p) => p.id === userProduct.productId);
    return catalogItem ? { userProduct, catalogItem } : null;
  };

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (currentSkinIndex / 100) * circumference;

  const completedMorningCount = morningSteps.filter((s) => s.isCompleted).length;
  const completedEveningCount = eveningSteps.filter((s) => s.isCompleted).length;


  return (
    <div className="flex flex-col gap-6 pb-24 animate-fadeIn max-w-md mx-auto relative font-sans text-xs">
      
      {/* 1. Health Score Visual Circle */}
      <div className={designSystem.card + " flex items-center justify-between overflow-hidden relative"}>
        <div className="space-y-1.5 z-10">
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Index Sanatate</span>
          <h1 className="text-xl font-extrabold text-white font-sans">Tenul Tau</h1>
          <p className="text-[10.5px] text-zinc-400 font-sans max-w-[200px] leading-relaxed">
            {currentSkinIndex >= 85 && "Ten hidratat si echilibrat. Mentine protectia SPF zilnica."}
            {currentSkinIndex >= 70 && currentSkinIndex < 85 && "Stare generala stabila. Continua schema de ingrijire."}
            {currentSkinIndex < 70 && "Bariera compromisa. Limiteaza exfolianti activi."}
          </p>
        </div>

        <div className="relative flex items-center justify-center w-24 h-24 mr-2">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" className="stroke-white/5 fill-none" strokeWidth="5" />
            <circle
              cx="48"
              cy="48"
              r="40"
              className="stroke-emerald-500 fill-none transition-all duration-500 ease-out"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center font-mono">
            <span className="text-xl font-bold text-white">{currentSkinIndex}</span>
            <span className="text-[8px] text-zinc-500 -mt-1">PUNCTAJ</span>
          </div>
        </div>
      </div>

      {/* 2. AI Skincare Insights */}
      {recommendations.map((rec) => (
        <div
          key={rec.id}
          className={`p-4 rounded-3xl border flex gap-3.5 items-start transition-all duration-300 ${
            rec.category === "alert"
              ? "bg-rose-500/5 border-rose-500/10 text-rose-200"
              : "bg-emerald-500/5 border-emerald-500/15 text-emerald-200"
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {rec.category === "alert" ? (
              <AlertCircle className="w-4 h-4 text-rose-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            )}
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-white font-sans">{rec.title}</div>
            <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">{rec.content}</p>
          </div>
        </div>
      ))}

      {/* 3. Primary action on screen: Daily Log checkin */}
      <button
        onClick={() => setShowCheckin(true)}
        className="w-full py-4 rounded-3xl bg-zinc-950 border border-white/5 hover:border-emerald-500/25 text-emerald-400 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-zinc-900/40 active:scale-98 transition-all cursor-pointer shadow-lg"
      >
        <Activity className="w-4 h-4 text-emerald-400" />
        <span>Înregistrează starea tenului de astăzi</span>
      </button>

      {/* 4. Routine Sheets launchers */}
      <div className="space-y-3.5">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-1">Rutine Zilnice</span>

        {/* Morning routine sheet button */}
        <button
          onClick={() => setActiveRoutineSheet("morning")}
          className="w-full p-5 rounded-3xl bg-zinc-900/60 border border-white/5 hover:bg-zinc-900/80 flex items-center justify-between text-left cursor-pointer transition-all active:scale-99 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Rutina de Dimineata</h3>
              <p className="text-[10.5px] text-zinc-500 mt-0.5">
                {completedMorningCount} din {morningSteps.length} produse aplicate
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-600" />
        </button>

        {/* Evening routine sheet button */}
        <button
          onClick={() => setActiveRoutineSheet("evening")}
          className="w-full p-5 rounded-3xl bg-zinc-900/60 border border-white/5 hover:bg-zinc-900/80 flex items-center justify-between text-left cursor-pointer transition-all active:scale-99 shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-400">
              <Moon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Rutina de Seara</h3>
              <p className="text-[10.5px] text-zinc-500 mt-0.5">
                {completedEveningCount} din {eveningSteps.length} produse aplicate
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-600" />
        </button>
      </div>

      {/* 5. Routines iOS-Style Slide-Up Bottom Sheet */}
      {activeRoutineSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center animate-fadeIn">
          {/* Backdrop dismissal */}
          <div className="absolute inset-0" onClick={() => setActiveRoutineSheet(null)} />
          
          <div className="w-full max-w-md bg-zinc-950 border-t border-white/10 rounded-t-[32px] p-6 shadow-2xl z-10 max-h-[75vh] overflow-y-auto transform transition-transform duration-300 animate-slideUp">
            {/* Drag Handle */}
            <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-5" />

            <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                {activeRoutineSheet === "morning" ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-400" />
                )}
                <span className="text-sm font-bold text-white uppercase tracking-wide">
                  {activeRoutineSheet === "morning" ? "Pasii Rutinei de Dimineata" : "Pasii Rutinei de Seara"}
                </span>
              </div>
              <button
                onClick={() => setActiveRoutineSheet(null)}
                className="p-1 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              {activeRoutineSheet === "morning" ? (
                morningSteps.length === 0 ? (
                  <p className="text-center text-zinc-500 text-xs py-8">Cabinetul tau nu are produse plasate dimineata.</p>
                ) : (
                  morningSteps.map((step) => {
                    const details = getProductDetails(step.userProductId);
                    if (!details) return null;
                    const { catalogItem } = details;

                    return (
                      <div key={step.id} className="flex justify-between items-center p-3 rounded-2xl bg-zinc-900 border border-white/5 gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{catalogItem.brand}</h4>
                          <p className="text-[10px] text-zinc-500 truncate">{catalogItem.name}</p>
                        </div>
                        <button
                          onClick={() => toggleRoutineStep(step.id, true)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            step.isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-black"
                              : "border-white/10 hover:border-zinc-700"
                          }`}
                        >
                          {step.isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      </div>
                    );
                  })
                )
              ) : (
                eveningSteps.length === 0 ? (
                  <p className="text-center text-zinc-500 text-xs py-8">Cabinetul tau nu are produse plasate seara.</p>
                ) : (
                  eveningSteps.map((step) => {
                    const details = getProductDetails(step.userProductId);
                    if (!details) return null;
                    const { catalogItem } = details;

                    return (
                      <div key={step.id} className="flex justify-between items-center p-3 rounded-2xl bg-zinc-900 border border-white/5 gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{catalogItem.brand}</h4>
                          <p className="text-[10px] text-zinc-500 truncate">{catalogItem.name}</p>
                        </div>
                        <button
                          onClick={() => toggleRoutineStep(step.id, false)}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                            step.isCompleted
                              ? "bg-emerald-500 border-emerald-500 text-black"
                              : "border-white/10 hover:border-zinc-700"
                          }`}
                        >
                          {step.isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* 6. Check-in Form Modal */}
      {showCheckin && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/5 rounded-[32px] p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto shadow-2xl relative space-y-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">CHECK-IN ZILNIC</span>
              <button
                onClick={() => setShowCheckin(false)}
                className="text-zinc-500 hover:text-white text-xs cursor-pointer font-bold"
              >
                Inchide
              </button>
            </div>

            <form onSubmit={handleCheckinSubmit} className="space-y-4 font-sans text-xs">
              
              {/* Hydration Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Nivel Hidratare
                  </span>
                  <span className="font-mono text-cyan-400 font-semibold">{hydration}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={hydration}
                  onChange={(e) => setHydration(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              {/* Redness Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-400" /> Roșeață Ten
                  </span>
                  <span className="font-mono text-rose-400 font-semibold">{redness}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={redness}
                  onChange={(e) => setRedness(Number(e.target.value))}
                  className="w-full accent-rose-400"
                />
              </div>

              {/* Irritation Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> Iritatie / Prurit
                  </span>
                  <span className="font-mono text-amber-400 font-semibold">{irritation}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={irritation}
                  onChange={(e) => setIrritation(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Sleep Hour Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-zinc-300">
                  <span>Ore de Somn</span>
                  <span className="font-mono text-emerald-400 font-semibold">{sleep} ore</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="12"
                  step="0.5"
                  value={sleep}
                  onChange={(e) => setSleep(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Water Intake Input */}
              <div className="space-y-1.5">
                <label className="block text-zinc-300">Apa consumata (ml)</label>
                <input
                  type="number"
                  step="250"
                  value={water}
                  onChange={(e) => setWater(Number(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Notes Area */}
              <div className="space-y-1.5">
                <label className="block text-zinc-300">Observatii / Alimentatie</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Oboseala acumulata, am consumat produse lactate."
                  rows={2}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs transition-all hover:brightness-110 active:scale-98 cursor-pointer"
              >
                Salveaza check-in
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
