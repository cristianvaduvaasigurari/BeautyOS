"use client";

import React from "react";
import { Activity, Target, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ProgressPage() {
  const metrics = [
    { title: "Biological Age", value: "24.2", trend: "-1.1 yrs", status: "Optimal", color: "text-emerald-400" },
    { title: "Skin Barrier Integrity", value: "98%", trend: "+5%", status: "Strong", color: "text-emerald-400" },
    { title: "Sleep Efficiency", value: "92%", trend: "+2%", status: "Optimal", color: "text-emerald-400" },
    { title: "VO2 Max", value: "45.2", trend: "Top 10%", status: "Elite", color: "text-[#D4AF37]" },
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white">
      
      <div className="max-w-3xl space-y-6 mb-16">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
          <Activity className="w-4 h-4" /> Quantification
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Your Progress.
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
          Track your compounding results over time. This is the ultimate proof that your clinical protocols are working.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05]">
            <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{m.title}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.02] ${m.color}`}>
                {m.status}
              </span>
            </div>
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold tracking-tight text-white">{m.value}</span>
              <span className="text-sm font-bold text-emerald-400 mb-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {m.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Adherence */}
        <div className="lg:col-span-2 p-10 rounded-[32px] bg-[#101114] border border-white/[0.05]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#D4AF37]" /> Protocol Adherence
            </h3>
            <span className="text-[#D4AF37] font-mono text-sm">94%</span>
          </div>
          
          <div className="flex justify-between items-end h-48 border-b border-white/[0.05] pb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
              const height = [80, 95, 100, 90, 85, 100, 95][idx];
              return (
                <div key={day} className="flex flex-col items-center gap-4 w-12 group cursor-pointer">
                  <div className="w-full bg-white/[0.02] rounded-t-xl relative overflow-hidden h-full flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-[#D4AF37]/50 to-[#D4AF37] rounded-t-xl transition-all duration-1000 group-hover:opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Milestone */}
        <div className="p-10 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-[#D4AF37]/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-lg font-bold text-white mb-2 relative z-10 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#D4AF37]" /> Next Milestone
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed relative z-10 mb-8">
            You are 4 days away from completing your 30-Day Cellular Reset. Maintain current adherence to hit your target.
          </p>
          <div className="w-full bg-white/[0.05] h-2 rounded-full overflow-hidden relative z-10 mb-4">
            <div className="h-full bg-[#D4AF37] w-[86%] rounded-full" />
          </div>
          <span className="text-xs font-mono text-[#D4AF37] relative z-10">86% Complete</span>
          
          <Link href="/dashboard" className="mt-8 bg-white text-black px-6 py-3 rounded-full font-bold text-xs hover:bg-[#D4AF37] transition-colors relative z-10 w-full flex justify-center items-center gap-2">
            View Protocol <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
}
