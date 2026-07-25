"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Sparkles, Send, Calendar } from "lucide-react";

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
          <span className="bg-[#101114] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/[0.05] group-hover:border-white/[0.15] shadow-lg transition-colors whitespace-nowrap">
            Book Consultation
          </span>
          <div className="w-12 h-12 rounded-full bg-[#101114] border border-white/[0.05] group-hover:border-white/[0.15] flex items-center justify-center shadow-lg transition-colors">
            <Calendar className="w-5 h-5 text-white" />
          </div>
        </Link>

        <a href="https://t.me/beautyos" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
          <span className="bg-[#101114] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/[0.05] group-hover:border-white/[0.15] shadow-lg transition-colors whitespace-nowrap">
            Telegram Support
          </span>
          <div className="w-12 h-12 rounded-full bg-[#101114] border border-white/[0.05] group-hover:border-white/[0.15] flex items-center justify-center shadow-lg transition-colors">
            <Send className="w-5 h-5 text-sky-400" />
          </div>
        </a>

        <Link href="/ai-coach" className="flex items-center gap-3 group">
          <span className="bg-[#101114] text-white text-xs font-bold px-4 py-2 rounded-xl border border-white/[0.05] group-hover:border-[#D4AF37]/50 shadow-lg transition-colors whitespace-nowrap">
            AI Assistant
          </span>
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#101114] to-[#1F2023] border border-white/[0.05] group-hover:border-[#D4AF37]/50 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-colors">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
        </Link>
      </div>

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen 
            ? "bg-[#101114] border border-white/[0.05] text-white rotate-90" 
            : "bg-[#D4AF37] hover:bg-white text-black hover:scale-105"
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
