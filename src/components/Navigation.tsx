"use client";

import React from "react";
import { useBeautyOS } from "../context/BeautyOSContext";
import { Calendar, Package, TrendingUp, User } from "lucide-react";

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab } = useBeautyOS();

  const navItems = [
    { id: "today" as const, label: "Today", icon: Calendar },
    { id: "products" as const, label: "Products", icon: Package },
    { id: "progress" as const, label: "Progress", icon: TrendingUp },
    { id: "profile" as const, label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#101114]/90 border border-white/[0.08] backdrop-blur-xl py-2 px-4 rounded-full shadow-2xl max-w-sm w-[92%]">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 py-1.5 px-3 rounded-full transition-all duration-200 group active:scale-95 cursor-pointer"
            >
              <div
                className={`p-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#E5C158]/20 text-[#E5C158] scale-110 shadow-sm"
                    : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <span
                className={`text-[9px] font-sans tracking-wide transition-all ${
                  isActive ? "text-[#E5C158] font-bold" : "text-zinc-500 font-medium"
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
