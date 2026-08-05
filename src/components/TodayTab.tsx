"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHealthOS, PRODUCTS_CATALOG } from "../context/HealthOSContext";
import { Sun, Moon, Sparkles, ChevronRight, Plus, Check, X } from "lucide-react";

export const TodayTab: React.FC = () => {
  const {
    morningSteps,
    eveningSteps,
    toggleRoutineStep,
    logSkinCheckin,
    currentSkinIndex,
    userCabinet,
    recommendations,
  } = useHealthOS();

  // Bottom Sheet Routines Trigger
  const [activeRoutineSheet, setActiveRoutineSheet] = useState<"morning" | "evening" | null>(null);

  // Checkin modal state
  const [showCheckin, setShowCheckin] = useState(false);
  const [hydration, setHydration] = useState(4);
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

  const circumference = 2 * Math.PI * 44;
  const strokeDashoffset = circumference - (currentSkinIndex / 100) * circumference;

  const completedMorningCount = morningSteps.filter((s) => s.isCompleted).length;
  const completedEveningCount = eveningSteps.filter((s) => s.isCompleted).length;

  return (
    <div className="flex flex-col gap-6 pb-28 animate-fadeIn max-w-xl mx-auto relative font-sans text-xs">
      
      {/* 1. Health Score Visual Circle Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl shadow-xl flex items-center justify-between relative overflow-hidden"
      >
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-mono uppercase tracking-widest">
            <Sparkles className="w-3 h-3" />
            <span>Skin Index Metric</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-sans tracking-tight">Today&apos;s Barrier Status</h1>
          <p className="text-xs text-[#A1A1AA] max-w-[240px] leading-relaxed">
            {currentSkinIndex >= 85 && "Skin barrier is hydrated and balanced. Maintain daily SPF photoprotection."}
            {currentSkinIndex >= 70 && currentSkinIndex < 85 && "Overall skin status is stable. Continue prescribed AM/PM routine."}
            {currentSkinIndex < 70 && "Skin barrier is compromised. Pause active exfoliants and layer ceramides."}
          </p>
        </div>

        <div className="relative flex items-center justify-center w-28 h-28 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="56" cy="56" r="44" className="stroke-white/[0.06] fill-none" strokeWidth="6" />
            <circle
              cx="56"
              cy="56"
              r="44"
              className="stroke-[#E5C158] fill-none transition-all duration-700 ease-out"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center font-mono">
            <span className="text-2xl font-bold text-white">{currentSkinIndex}</span>
            <span className="text-[8px] text-[#A1A1AA] tracking-widest uppercase">Score</span>
          </div>
        </div>
      </motion.div>

      {/* 2. Quick Check-In Action Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl flex items-center justify-between"
      >
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Daily Skin Check-In</h3>
          <p className="text-xs text-[#A1A1AA]">Log hydration, redness, sleep & water intake.</p>
        </div>

        <button
          onClick={() => setShowCheckin(true)}
          className="px-5 py-2.5 rounded-full bg-[#E5C158] hover:bg-[#F7E7B4] text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-[#E5C158]/15 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Check-In</span>
        </button>
      </motion.div>

      {/* 3. AI Recommendations Stream */}
      {recommendations.map((rec, idx) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 + idx * 0.05 }}
          className={`p-5 rounded-[24px] border flex gap-3.5 items-start transition-all ${
            rec.category === "alert"
              ? "bg-rose-500/10 border-rose-500/20 text-rose-200"
              : "bg-[#101114] border-white/[0.08] text-zinc-200"
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-white">{rec.title}</h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">{rec.content}</p>
          </div>
        </motion.div>
      ))}

      {/* 4. Routine Cards (Morning & Evening) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Morning Routine Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onClick={() => setActiveRoutineSheet("morning")}
          className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] hover:border-[#E5C158]/30 transition-all cursor-pointer space-y-4 group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-[#E5C158]">
              {completedMorningCount} / {morningSteps.length} Done
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Morning Routine</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">Cleansing & SPF photoprotection</p>
          </div>

          <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#E5C158] font-medium">
            <span>Inspect Steps</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        {/* Evening Routine Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => setActiveRoutineSheet("evening")}
          className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] hover:border-[#E5C158]/30 transition-all cursor-pointer space-y-4 group shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-mono text-[#E5C158]">
              {completedEveningCount} / {eveningSteps.length} Done
            </span>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Evening Routine</h3>
            <p className="text-xs text-[#A1A1AA] mt-1">Deep restoration & barrier repair</p>
          </div>

          <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-[#E5C158] font-medium">
            <span>Inspect Steps</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

      </div>

      {/* Routine Detail Sheet Modal */}
      {activeRoutineSheet && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#101114] border border-white/[0.08] rounded-[28px] max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                {activeRoutineSheet === "morning" ? (
                  <Sun className="w-5 h-5 text-amber-400" />
                ) : (
                  <Moon className="w-5 h-5 text-indigo-400" />
                )}
                <h3 className="text-base font-bold text-white capitalize">{activeRoutineSheet} Routine</h3>
              </div>
              <button
                onClick={() => setActiveRoutineSheet(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {(activeRoutineSheet === "morning" ? morningSteps : eveningSteps).map((step, idx) => {
                const details = getProductDetails(step.userProductId);
                if (!details) return null;
                const { catalogItem } = details;

                return (
                  <div
                    key={step.id}
                    onClick={() => toggleRoutineStep(step.id, activeRoutineSheet === "morning")}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      step.isCompleted
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300"
                        : "bg-[#17181B] border-white/[0.08] text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                        step.isCompleted ? "bg-emerald-500 text-zinc-950" : "bg-zinc-800 text-zinc-400"
                      }`}>
                        {step.isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{catalogItem.brand}</h4>
                        <p className="text-xs text-[#A1A1AA]">{catalogItem.name}</p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#E5C158] bg-[#E5C158]/10 px-2.5 py-1 rounded-full border border-[#E5C158]/20">
                      {catalogItem.category}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActiveRoutineSheet(null)}
              className="w-full py-3 rounded-full bg-[#E5C158] text-zinc-950 font-bold text-xs cursor-pointer hover:bg-[#F7E7B4]"
            >
              Done Inspecting
            </button>
          </div>
        </div>
      )}

      {/* Check-In Modal */}
      {showCheckin && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <form onSubmit={handleCheckinSubmit} className="bg-[#101114] border border-white/[0.08] rounded-[28px] max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E5C158]" />
                <h3 className="text-base font-bold text-white">Daily Skin Check-In</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckin(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-2">
                <label className="block text-zinc-300 font-semibold flex justify-between">
                  <span>Hydration Level</span>
                  <span className="text-[#E5C158] font-mono">{hydration} / 5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={hydration}
                  onChange={(e) => setHydration(Number(e.target.value))}
                  className="w-full accent-[#E5C158] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-300 font-semibold flex justify-between">
                  <span>Redness Index</span>
                  <span className="text-rose-400 font-mono">{redness} / 5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={redness}
                  onChange={(e) => setRedness(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-300 font-semibold flex justify-between">
                  <span>Irritation Rating</span>
                  <span className="text-amber-400 font-mono">{irritation} / 5</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={irritation}
                  onChange={(e) => setIrritation(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-zinc-400 font-medium">Sleep (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="16"
                    value={sleep}
                    onChange={(e) => setSleep(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-zinc-400 font-medium">Water (ml)</label>
                  <input
                    type="number"
                    step="250"
                    value={water}
                    onChange={(e) => setWater(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-zinc-400 font-medium">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes on symptoms or diet..."
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-xl p-3 text-white h-20"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#E5C158] hover:bg-[#F7E7B4] text-zinc-950 font-bold text-xs cursor-pointer shadow-lg shadow-[#E5C158]/15"
            >
              Save Skin Check-In
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
