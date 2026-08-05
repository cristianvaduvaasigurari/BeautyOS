"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Zap, Star } from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Public Access",
      price: "Free",
      period: "forever",
      description: "Full access to our evidence-based scientific database, articles, protocols, and supplement library.",
      features: [
        "Complete Scientific Article Library",
        "Supplement Evidence Database",
        "Full Ingredient Safety Ratings",
        "Community Protocol Access",
        "Global Article Search"
      ],
      cta: "Explore Ecosystem",
      href: "/guides",
      popular: false
    },
    {
      name: "HealthOS Pro",
      price: "$29",
      period: "per month",
      description: "Personalized biological tracking, routine optimization, clash analysis, and progress logging.",
      features: [
        "Everything in Free Public Access",
        "Personalized Health Dashboard",
        "Daily Routine Tracker (AM/PM)",
        "Supplement & Product Cabinet Manager",
        "Active Ingredient Clash Alerts",
        "Progress Photo Journal & Metrics",
        "AI Health Coach Unlimited Queries"
      ],
      cta: "Start 14-Day Trial",
      href: "/dashboard",
      popular: true
    },
    {
      name: "1-on-1 Consultation",
      price: "$149",
      period: "per session",
      description: "Dedicated session with a senior health strategist to analyze bloodwork, routine, and supplementation.",
      features: [
        "Everything in HealthOS Pro",
        "60-Minute Video Consultation",
        "Personalized 90-Day Protocol Blueprint",
        "Custom Supplement Stack Recommendation",
        "Direct Telegram Support Channel",
        "Biomonitoring & Biomarker Review"
      ],
      cta: "Book Consultation",
      href: "/contact",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white">
      
      <div className="max-w-3xl space-y-6 mb-16">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <Zap className="w-4 h-4" /> Transparent Pricing
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Invest in Your Biology.
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl font-sans">
          Public education on HealthOS is 100% free. Upgrade to HealthOS Pro for personalized biological tracking, smart routine logging, and expert consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div 
            key={tier.name}
            className={`p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border transition-all relative flex flex-col justify-between ${
              tier.popular ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] scale-[1.02]" : "border-white/[0.08] hover:border-white/20"
            }`}
          >
            {tier.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-emerald-500 text-zinc-950 font-bold text-[10px] uppercase font-mono tracking-wider flex items-center gap-1 shadow-lg">
                <Star className="w-3 h-3 fill-current" /> Most Popular
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6">{tier.description}</p>
              
              <div className="mb-8 pb-6 border-b border-white/[0.08] flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-bold text-white font-mono">{tier.price}</span>
                <span className="text-xs text-zinc-500 font-mono uppercase">{tier.period}</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-3 text-xs text-zinc-300 font-sans">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href={tier.href}
              className={`w-full py-4 rounded-xl font-bold text-xs uppercase font-mono text-center transition-all flex items-center justify-center gap-2 ${
                tier.popular
                  ? "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                  : "bg-zinc-900 border border-white/[0.08] text-white hover:bg-white hover:text-black"
              }`}
            >
              {tier.cta} <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>
        ))}
      </div>

    </div>
  );
}
