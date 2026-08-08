"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Gift, Copy, Check } from "lucide-react";

export default function ReferralDashboardPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = "HEALTHOS-ALEX-2026";
  const referralUrl = `https://health.cristianvaduva.com/onboarding?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const referralStats = [
    { title: "Invites Sent", count: "12", label: "Email / Telegram" },
    { title: "Successful Conversions", count: "4", label: "Subscribed Members" },
    { title: "Earned Rewards Credit", count: "€80", label: "Applied to Pro Plan" }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <Gift className="w-4 h-4" /> Member Growth &amp; Referral Engine
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Invite Friends. <br />
          <span className="text-emerald-400">Earn AiX Health Pro Credits.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Give your friends €20 off their first AiX Health Pro subscription. For every friend who completes onboarding, you receive €20 in platform credits.
        </p>
      </div>

      {/* Referral Link Box */}
      <div className="max-w-4xl p-8 sm:p-10 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-emerald-500/30 space-y-6 mb-16 shadow-2xl">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Your Unique Referral Link</span>
        
        <div className="flex items-center gap-3 bg-[#0A0A0A] border border-white/[0.1] rounded-2xl p-2 pl-4">
          <span className="text-xs font-mono text-zinc-300 truncate flex-1">{referralUrl}</span>
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 rounded-xl bg-emerald-500 text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20 shrink-0"
          >
            {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Link</>}
          </button>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
        {referralStats.map((s, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold">{s.title}</span>
            <p className="text-4xl font-bold font-mono text-white">{s.count}</p>
            <p className="text-xs text-emerald-400 font-mono">{s.label}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
