/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHealthOS } from "../context/HealthOSContext";
import { Award, Droplets, Heart, Camera } from "lucide-react";

export const ProgressTab: React.FC = () => {
  const { journalEntries, progressPhotos } = useHealthOS();
  const [chartHorizon, setChartHorizon] = useState<"weekly" | "monthly" | "yearly">("weekly");

  return (
    <div className="flex flex-col gap-6 pb-28 animate-fadeIn max-w-2xl mx-auto relative font-sans text-xs">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E5C158] uppercase tracking-widest">
            Apple Health Analytics • {journalEntries.length} Check-ins Logged
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Progress & Trends</h1>
        </div>

        {/* Time Horizon Selector */}
        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-full border border-white/[0.08] text-xs">
          {(["weekly", "monthly", "yearly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setChartHorizon(t)}
              className={`px-4 py-1.5 rounded-full capitalize transition-all cursor-pointer font-medium ${
                chartHorizon === t ? "bg-[#E5C158] text-zinc-950 font-bold shadow-md shadow-[#E5C158]/20" : "text-[#A1A1AA] hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Main Apple Health Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between shadow-2xl space-y-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#E5C158] uppercase">Skin Index Evolution</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Barrier Recovery Graph</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#E5C158]" />
            <span className="text-xs font-mono text-zinc-400">Score (0-100)</span>
          </div>
        </div>

        {/* Area Chart SVG */}
        <div className="w-full h-56 relative my-2">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150">
            <defs>
              <linearGradient id="goldProgGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E5C158" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#E5C158" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d={
                chartHorizon === "weekly"
                  ? "M0,120 Q90,95 180,65 T340,45 T500,20 L500,150 L0,150 Z"
                  : chartHorizon === "monthly"
                  ? "M0,130 Q110,85 220,95 T370,40 T500,30 L500,150 L0,150 Z"
                  : "M0,140 Q130,105 260,75 T390,50 T500,15 L500,150 L0,150 Z"
              }
              fill="url(#goldProgGrad)"
            />
            <path
              d={
                chartHorizon === "weekly"
                  ? "M0,120 Q90,95 180,65 T340,45 T500,20"
                  : chartHorizon === "monthly"
                  ? "M0,130 Q110,85 220,95 T370,40 T500,30"
                  : "M0,140 Q130,105 260,75 T390,50 T500,15"
              }
              fill="none"
              stroke="#E5C158"
              strokeWidth="3.5"
            />
            <circle cx="500" cy={chartHorizon === "weekly" ? "20" : chartHorizon === "monthly" ? "30" : "15"} r="6" fill="#FFF" stroke="#E5C158" strokeWidth="3" />
          </svg>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-500 font-mono pt-4 border-t border-white/[0.04]">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span className="text-[#E5C158] font-bold">Today (86/100)</span>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] space-y-2 shadow-xl"
        >
          <div className="w-9 h-9 rounded-xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Consistency Score</span>
          <h4 className="text-2xl font-bold text-white font-mono">94%</h4>
          <p className="text-[11px] text-emerald-400 font-mono">Streak: 12 days active</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] space-y-2 shadow-xl"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Droplets className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Hydration Delta</span>
          <h4 className="text-2xl font-bold text-white font-mono">+18%</h4>
          <p className="text-[11px] text-emerald-400 font-mono">Stratum corneum moisture</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] space-y-2 shadow-xl"
        >
          <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-mono text-[#A1A1AA] uppercase">Redness Index</span>
          <h4 className="text-2xl font-bold text-white font-mono">1.2 / 5</h4>
          <p className="text-[11px] text-emerald-400 font-mono">-2.4 Calming trend</p>
        </motion.div>

      </div>

      {/* Photo Comparison Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-[#E5C158] uppercase">Photo Timeline</span>
            <h3 className="text-lg font-bold text-white">Visual Progress Record</h3>
          </div>
          <button className="px-4 py-2 rounded-full bg-zinc-950 border border-white/[0.08] text-white text-xs font-medium cursor-pointer flex items-center gap-1.5 hover:border-white/20">
            <Camera className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Add Photo</span>
          </button>
        </div>

        {progressPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {progressPhotos.map((photo) => (
              <div key={photo.id} className="relative rounded-2xl overflow-hidden border border-white/[0.08]">
                <img src={photo.photoUrl} alt="Progress" className="w-full h-36 object-cover" />
                <div className="absolute bottom-2 left-2 right-2 p-2 rounded-xl bg-black/80 backdrop-blur-md text-[10px] text-zinc-300 font-mono flex items-center justify-between">
                  <span>{photo.date}</span>
                  <span className="text-[#E5C158]">{photo.angle}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-zinc-950 border border-white/[0.06] text-center space-y-2">
            <p className="text-xs text-[#A1A1AA]">No visual progress photos logged yet.</p>
            <p className="text-[10px] text-zinc-600">Track visual skin barrier recovery over time.</p>
          </div>
        )}
      </motion.div>

    </div>
  );
};
