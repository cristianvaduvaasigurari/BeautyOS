"use client";

import React, { useState } from "react";
import { useBeautyOS } from "../context/BeautyOSContext";
import { designSystem } from "../styles/designSystem";
import { User, ShieldCheck, Download, Trash2, Sliders } from "lucide-react";

export const ProfileTab: React.FC = () => {
  const { skinProfile, clearAllUserData } = useBeautyOS();
  const [userName, setUserName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("user_fullname") || "Skincare Explorer";
    }
    return "Skincare Explorer";
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    localStorage.setItem("user_fullname", e.target.value);
  };

  // Export local database to user as raw JSON file
  const handleExportData = () => {
    const data = {
      profile: skinProfile,
      cabinet: JSON.parse(localStorage.getItem("user_cabinet") || "[]"),
      morningRoutine: JSON.parse(localStorage.getItem("morning_steps") || "[]"),
      eveningRoutine: JSON.parse(localStorage.getItem("evening_steps") || "[]"),
      logs: JSON.parse(localStorage.getItem("journal_entries") || "[]"),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `beautyos-skincare-export-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!skinProfile) return null;

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fadeIn max-w-md mx-auto">
      
      {/* Header Profile Badge */}
      <div className={designSystem.card + " flex items-center gap-4"}>
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <User className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0 font-sans">
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            className="text-base font-bold text-white bg-transparent border-b border-transparent hover:border-white/10 focus:border-emerald-500 focus:outline-none py-0.5 w-full font-sans transition-all"
            placeholder="Numele tău"
          />
          <span className="text-[10px] text-zinc-500 block -mt-0.5 uppercase font-mono">
            Membru BeautyOS
          </span>
        </div>
      </div>

      {/* 1. Skin Profile Diagnosis Summary */}
      <div className={designSystem.card + " space-y-4"}>
        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
          <span className="text-sm font-semibold text-white">Profilul Meu de Ten</span>
          <Sliders className="w-4 h-4 text-zinc-500" />
        </div>

        <div className="grid grid-cols-2 gap-3.5 font-sans text-xs">
          <div className="space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase font-mono">Tip de ten</span>
            <div className="text-zinc-200 font-semibold">{skinProfile.skinType}</div>
          </div>
          <div className="space-y-1">
            <span className="text-zinc-500 text-[10px] uppercase font-mono">Sensibilitate</span>
            <div className="text-zinc-200 font-semibold">{skinProfile.sensitivity}</div>
          </div>
        </div>

        {/* Selected Concerns */}
        <div className="space-y-1.5 pt-1">
          <span className="text-zinc-500 text-[10px] uppercase font-mono block">Preocupări active</span>
          <div className="flex flex-wrap gap-1.5">
            {skinProfile.concerns.length === 0 ? (
              <span className="text-zinc-500 text-xs font-light">Nicio preocupare selectată.</span>
            ) : (
              skinProfile.concerns.map((con) => (
                <span key={con} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400">
                  {con}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Selected Goals */}
        <div className="space-y-1.5">
          <span className="text-zinc-500 text-[10px] uppercase font-mono block">Obiective Rutină</span>
          <div className="flex flex-wrap gap-1.5">
            {skinProfile.goals.length === 0 ? (
              <span className="text-zinc-500 text-xs font-light">Niciun obiectiv adăugat.</span>
            ) : (
              skinProfile.goals.map((goal) => (
                <span key={goal} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400">
                  {goal}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2. Privacy and Data Control Panel */}
      <div className={designSystem.card + " space-y-4"}>
        <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-white">Confidențialitate & Securitate</span>
        </div>

        <p className="text-[10.5px] text-zinc-500 font-sans leading-relaxed">
          Sănătatea pielii tale este stocată exclusiv local pe browserul tău. Nu trimitem datele pe niciun server extern.
        </p>

        <div className="space-y-2.5">
          {/* Export button */}
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-zinc-950/60 border border-white/5 hover:border-zinc-800 text-zinc-300 hover:text-white transition-all cursor-pointer font-sans text-xs"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400" /> Exportă Datele (.json)
            </span>
            <span className="text-[10px] font-mono text-zinc-500">Descarcă</span>
          </button>

          {/* Delete/Reset profile button */}
          <button
            onClick={() => {
              if (confirm("Ești sigur că vrei să ștergi definitiv profilul tău de ten și toate jurnalele BeautyOS? Această acțiune este ireversibilă.")) {
                clearAllUserData();
              }
            }}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-rose-500/5 border border-rose-500/10 hover:border-rose-500/25 text-rose-300 hover:text-rose-400 transition-all cursor-pointer font-sans text-xs"
          >
            <span className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" /> Șterge Profilul de Ten
            </span>
            <span className="text-[10px] font-mono text-rose-500/50">Curăță</span>
          </button>
        </div>
      </div>

    </div>
  );
};
