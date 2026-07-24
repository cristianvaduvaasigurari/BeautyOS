"use client";

import React, { useState } from "react";
import { useBeautyOS } from "../../context/BeautyOSContext";
import { TodayTab } from "../../components/TodayTab";
import { ProductsTab } from "../../components/ProductsTab";
import { ProgressTab } from "../../components/ProgressTab";
import { ProfileTab } from "../../components/ProfileTab";
import { Calendar, Package, TrendingUp, User, Sparkles, RefreshCw } from "lucide-react";

export default function Dashboard() {
  const { currentSkinIndex, syncStatus, offlineQueueLength } = useBeautyOS();
  const [activeTab, setActiveTab] = useState<"today" | "products" | "progress" | "profile">("today");

  const tabs = [
    { id: "today" as const, label: "Today", icon: Calendar },
    { id: "products" as const, label: "Products", icon: Package },
    { id: "progress" as const, label: "Progress", icon: TrendingUp },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans pb-28 relative">
      
      {/* Dashboard Sub-Header */}
      <header className="sticky top-[73px] xl:top-[85px] z-30 bg-[#0A0A0A]/90 border-b border-white/[0.08] backdrop-blur-xl px-6 py-4 flex justify-between items-center w-full">
        <div className="max-w-[1440px] mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Sync indicator */}
            {syncStatus === "synced" && (
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Synced</span>
              </div>
            )}
            {syncStatus === "syncing" && (
              <div className="flex items-center gap-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2.5 py-1 rounded-full">
                <RefreshCw className="w-3 h-3 text-[#D4AF37] animate-spin" />
                <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-widest">Syncing ({offlineQueueLength})</span>
              </div>
            )}
            {syncStatus === "offline" && (
              <div className="flex items-center gap-1.5 bg-zinc-800 border border-white/[0.08] px-2.5 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
                <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Offline</span>
              </div>
            )}
            <span className="text-xs font-bold text-white font-mono tracking-wider ml-1 hidden sm:block">Private Workspace</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Internal Tab Navigation */}
            <div className="flex bg-[#101114] border border-white/[0.08] rounded-full p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                      isActive 
                        ? "bg-[#D4AF37] text-black font-bold shadow-sm" 
                        : "text-zinc-500 hover:text-white"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick status badge */}
            <div className="hidden md:flex items-center gap-1.5 bg-[#101114] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Skin Index: <strong className="text-white">{currentSkinIndex}</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Screen Container */}
      <main className="px-4 sm:px-6 py-6 overflow-y-auto max-w-2xl mx-auto min-h-[60vh]">
        {activeTab === "today" && <TodayTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "progress" && <ProgressTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

    </div>
  );
}
