"use client";

import React, { useEffect, useState } from "react";
import { useBeautyOS } from "../context/BeautyOSContext";
import { LandingPage } from "../components/LandingPage";
import { Auth } from "../components/Auth";
import { Onboarding } from "../components/Onboarding";
import { Navigation } from "../components/Navigation";
import { TodayTab } from "../components/TodayTab";
import { ProductsTab } from "../components/ProductsTab";
import { ProgressTab } from "../components/ProgressTab";
import { ProfileTab } from "../components/ProfileTab";
import { Sparkles, RefreshCw } from "lucide-react";

export default function Home() {
  const { isOnboarded, activeTab, currentSkinIndex, userSession, syncStatus, offlineQueueLength } = useBeautyOS();
  const [mounted, setMounted] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center text-zinc-500 font-mono text-xs">
        Initializing BeautyOS...
      </div>
    );
  }

  // Unauthenticated State -> Show 8-Section Luxury Landing Page
  if (!userSession) {
    return (
      <>
        <LandingPage onGetStarted={() => setAuthModalOpen(true)} />
        {authModalOpen && (
          <Auth isModal={true} onClose={() => setAuthModalOpen(false)} />
        )}
      </>
    );
  }

  // Onboarding Flow if diagnostic profile is missing
  if (!isOnboarded) {
    return <Onboarding />;
  }

  // Authenticated Dashboard (Today, Products, Progress, Profile)
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans pb-28 relative">
      
      {/* Dashboard Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/85 border-b border-white/[0.08] backdrop-blur-xl px-6 py-4 flex justify-between items-center max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Sync indicator */}
          {syncStatus === "synced" && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest">Synced</span>
            </div>
          )}
          {syncStatus === "syncing" && (
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
              <RefreshCw className="w-3 h-3 text-[#E5C158] animate-spin" />
              <span className="text-[9px] font-mono text-[#E5C158] uppercase tracking-widest">Syncing ({offlineQueueLength})</span>
            </div>
          )}
          {syncStatus === "offline" && (
            <div className="flex items-center gap-1.5 bg-zinc-800 border border-white/[0.08] px-2.5 py-1 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-500" />
              <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest">Offline</span>
            </div>
          )}
          <span className="text-xs font-bold text-white font-mono tracking-wider ml-1">BeautyOS<span className="text-[#E5C158]">™</span></span>
        </div>

        {/* Quick status badge */}
        <div className="flex items-center gap-1.5 bg-[#101114] border border-white/[0.08] px-3.5 py-1.5 rounded-full text-xs font-mono text-zinc-300 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span>Skin Index: <strong className="text-white">{currentSkinIndex}</strong></span>
        </div>
      </header>

      {/* Main Workspace Screen Container */}
      <main className="px-4 sm:px-6 py-6 overflow-y-auto max-w-2xl mx-auto">
        {activeTab === "today" && <TodayTab />}
        {activeTab === "products" && <ProductsTab />}
        {activeTab === "progress" && <ProgressTab />}
        {activeTab === "profile" && <ProfileTab />}
      </main>

      {/* Persistent Bottom Tab Bar */}
      <Navigation />

    </div>
  );
}
