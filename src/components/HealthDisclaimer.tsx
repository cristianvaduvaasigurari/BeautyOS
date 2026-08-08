"use client";

import React from "react";
import { Disclaimers } from "@/lib/legal/disclaimers";

export type DisclaimerKey = keyof typeof Disclaimers;

interface HealthDisclaimerProps {
  type: DisclaimerKey;
}

export const HealthDisclaimer: React.FC<HealthDisclaimerProps> = ({ type }) => {
  const disclaimer = Disclaimers[type];
  if (!disclaimer) return null;
  return (
    <div className="border border-emerald-500/30 bg-emerald-500/10 text-emerald-100 rounded-md p-4 my-4">
      <h3 className="text-sm font-medium mb-1">{disclaimer.title}</h3>
      <p className="text-xs leading-relaxed">{disclaimer.text}</p>
    </div>
  );
};
