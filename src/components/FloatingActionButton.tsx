"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Send, Calendar, Zap } from "lucide-react";

export const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end">
      
      {/* Expandable Menu */}
      <div 
        className={`mb-4 flex flex-col gap-3 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/contact" className="flex items-center gap-3 group">
          <span className="bg-[#101114] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/[0.08] group-hover:border-emerald-500/40 shadow-lg transition-colors whitespace-nowrap">
            Book Health Consultation
          </span>
          <div className="w-12 h-12 rounded-full bg-[#101114] border border-white/[0.08] group-hover:border-emerald-500/40 flex items-center justify-center shadow-lg transition-colors">
            <Calendar className="w-5 h-5 text-emerald-400" />
          </div>
        </Link>

        <a href="https://t.me/cristianvaduva" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
          <span className="bg-[#101114] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/[0.08] group-hover:border-emerald-500/40 shadow-lg transition-colors whitespace-nowrap">
            Telegram Support
          </span>
          <div className="w-12 h-12 rounded-full bg-[#101114] border border-white/[0.08] group-hover:border-emerald-500/40 flex items-center justify-center shadow-lg transition-colors">
            <Send className="w-5 h-5 text-sky-400" />
          </div>
        </a>

        <Link href="/ai-coach" className="flex items-center gap-3 group">
          <span className="bg-[#101114] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/[0.08] group-hover:border-emerald-500/40 shadow-lg transition-colors whitespace-nowrap">
            AI Health Coach
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#101114] to-[#1F2023] border border-white/[0.08] group-hover:border-emerald-500/40 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-colors">
            <Zap className="w-5 h-5 text-emerald-400" />
          </div>
        </Link>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen 
            ? "bg-[#101114] border border-white/[0.08] text-white rotate-90" 
            : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 hover:scale-105 shadow-emerald-500/20"
        }`}
        aria-label="Contact Menu"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        )}
      </button>

    </div>
  );
};
