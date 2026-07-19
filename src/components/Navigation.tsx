"use client";

import React from "react";
import { useBeautyOS } from "../context/BeautyOSContext";
import { Calendar, Package, TrendingUp, User } from "lucide-react";

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useBeautyOS();

  const navItems = [
    { id: "today" as const, label: "Astăzi", icon: Calendar },
    { id: "products" as const, label: "Produse", icon: Package },
    { id: "progress" as const, label: "Evoluție", icon: TrendingUp },
    { id: "profile" as const, label: "Profil", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#09090b]/80 border-t border-white/5 backdrop-blur-xl py-3 px-6 shadow-2xl">
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all duration-200 group active:scale-95 cursor-pointer"
            >
              <div
                className={`p-1.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 scale-110"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[9px] font-sans tracking-wide transition-all ${
                  isActive ? "text-emerald-400 font-semibold" : "text-zinc-500 font-light"
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
