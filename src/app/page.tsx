"use client";

import React, { useEffect, useState } from "react";
import { useBeautyOS } from "../context/BeautyOSContext";
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-zinc-500 font-mono text-xs">
        Se incarca BeautyOS...
      </div>
    );
  }

  // Auth Guard
  if (!userSession) {
    return <Auth />;
  }

  // Display Onboarding wizard if no skin diagnostic profile is found
  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-28 relative">
      
      {/* Top bar header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/85 border-b border-white/5 backdrop-blur-md px-6 py-4 flex justify-between items-center max-w-md mx-auto">
        <div className="flex items-center gap-2">
          {/* Sync indicator */}
          {syncStatus === "synced" && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[8px] font-mono text-emerald-500 uppercase tracking-widest hidden xs:inline">Synced</span>
            </div>
          )}
          {syncStatus === "syncing" && (
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-amber-500 animate-spin" />
              <span className="text-[8px] font-mono text-amber-400 uppercase tracking-widest hidden xs:inline">Syncing ({offlineQueueLength})</span>
            </div>
          )}
          {syncStatus === "offline" && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-zinc-600" />
              <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest hidden xs:inline">Offline</span>
            </div>
          )}
          <span className="text-xs font-bold text-white font-mono tracking-wider ml-1">BeautyOS™</span>
        </div>

        {/* Small quick status badge */}
        <div className="flex items-center gap-1.5 bg-zinc-900 border border-white/5 px-3 py-1 rounded-xl text-[10px] font-mono text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Index: {currentSkinIndex}</span>
        </div>
      </header>

      {/* Screen area container */}
      <main className="px-6 py-6 overflow-y-auto max-w-md mx-auto">
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
