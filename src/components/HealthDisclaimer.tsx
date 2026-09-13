"use client";

import React from "react";
import { ShieldAlert } from "lucide-react";
import { Disclaimers } from "@/lib/legal/disclaimers";

export type DisclaimerKey = keyof typeof Disclaimers;

interface HealthDisclaimerProps {
  type: DisclaimerKey;
  className?: string;
}

export const HealthDisclaimer: React.FC<HealthDisclaimerProps> = ({ type, className = "" }) => {
  const disclaimer = Disclaimers[type];
  if (!disclaimer) return null;
  return (
    <div className={`border border-emerald-500/20 bg-gradient-to-r from-[#101412] to-[#0D110F] text-zinc-300 rounded-2xl p-5 my-6 space-y-1.5 shadow-lg ${className}`}>
      <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
        {disclaimer.title}
      </h3>
      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{disclaimer.text}</p>
    </div>
  );
};

