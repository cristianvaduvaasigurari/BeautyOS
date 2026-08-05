"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Zap, CreditCard, Lock } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  const plans = [
    {
      name: "HealthOS Free",
      priceMonthly: "€0",
      priceAnnual: "€0",
      badge: "Starter",
      description: "Essential health tracking, public guide library, and basic AI queries.",
      features: [
        "Public Guide & Protocol Access",
        "Basic Daily Metric Logging",
        "Community Discussion Access",
        "Standard Supplement Library Search",
        "Basic AI Health Queries"
      ],
      cta: "Current Plan",
      isPopular: false,
      buttonStyle: "bg-zinc-900 border border-white/[0.08] text-white hover:bg-white/10"
    },
    {
      name: "HealthOS Pro",
      priceMonthly: "€19",
      priceAnnual: "€15",
      badge: "Most Popular",
      description: "Complete personalized health operating system, unlimited AI coach, & advanced analytics.",
      features: [
        "Everything in Free Plan",
        "Unlimited AI Health Coach Memory Engine",
        "Personalized 90-Day Protocols (Muscle, Fat Loss, Skin)",
        "Advanced Apple-Style Analytics & Biomarkers",
        "Custom Supplement Recommendation Engine",
        "Progress Photo Journal & Habit Streaks",
        "Priority Lead & Support Ticket Processing"
      ],
      cta: "Upgrade to HealthOS Pro",
      isPopular: true,
      buttonStyle: "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 font-bold shadow-lg shadow-emerald-500/20"
    },
    {
      name: "HealthOS Elite",
      priceMonthly: "€49",
      priceAnnual: "€39",
      badge: "Flagship",
      description: "Direct expert consultation, personalized longevity protocols, & high-touch guidance.",
      features: [
        "Everything in HealthOS Pro Plan",
        "1-on-1 Monthly Telehealth Expert Review",
        "Advanced Longevity & Genomic Sirtuin Protocols",
        "Direct Telegram Concierge Support Channel",
        "Early Access to Clinical Formulations",
        "Custom Biomarker Lab Integration (Blood/CGM)"
      ],
      cta: "Join HealthOS Elite",
      isPopular: false,
      buttonStyle: "bg-gradient-to-r from-emerald-400 to-teal-400 text-zinc-950 hover:opacity-90 font-bold shadow-lg shadow-emerald-500/20"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Platform
        </Link>
        
        <div className="flex justify-center">
          <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
            <Zap className="w-4 h-4" /> Commercial Subscription Tiers
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Invest in Your Biological Health. <br />
          <span className="text-emerald-400">Cancel Anytime.</span>
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto font-sans">
          Select your subscription tier to unlock unlimited AI health coach memory, custom 90-day protocols, and advanced biomarker analytics.
        </p>

        {/* Toggle */}
        <div className="pt-4 flex items-center justify-center gap-4">
          <span className={`text-xs font-mono font-bold uppercase ${billingCycle === "monthly" ? "text-white" : "text-zinc-500"}`}>Monthly Billing</span>
          <button 
            onClick={() => setBillingCycle(prev => prev === "monthly" ? "annual" : "monthly")}
            className="w-14 h-8 rounded-full bg-[#101114] border border-white/[0.12] p-1 transition-colors relative cursor-pointer"
          >
            <div className={`w-6 h-6 rounded-full bg-emerald-500 transition-transform ${billingCycle === "annual" ? "translate-x-6" : ""}`} />
          </button>
          <span className={`text-xs font-mono font-bold uppercase flex items-center gap-1.5 ${billingCycle === "annual" ? "text-white" : "text-zinc-500"}`}>
            Annual Billing <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-mono font-bold">Save 20%</span>
          </span>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={`p-8 sm:p-10 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border flex flex-col justify-between space-y-8 relative overflow-hidden transition-all ${
              plan.isPopular ? "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]" : "border-white/[0.08]"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase font-bold tracking-widest">
                {plan.badge}
              </div>
            )}

            <div className="space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">{plan.name}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white tracking-tight">
                  {billingCycle === "monthly" ? plan.priceMonthly : plan.priceAnnual}
                </span>
                <span className="text-zinc-400 text-xs font-mono">/ month</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{plan.description}</p>

              <div className="pt-6 border-t border-white/[0.08] space-y-3">
                <p className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Included Features:</p>
                <ul className="space-y-2.5 text-xs text-zinc-300 font-sans">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setSelectedPlanModal(plan.name)}
                className={`w-full py-4 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${plan.buttonStyle}`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* STRIPE CHECKOUT MODAL */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#101114] border border-white/[0.12] rounded-[36px] p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Subscribe to {selectedPlanModal}</h3>
              </div>
              <button onClick={() => setSelectedPlanModal(null)} className="text-zinc-500 hover:text-white font-mono text-sm">✕</button>
            </div>

            <p className="text-xs text-zinc-400 font-sans">Stripe Secure Checkout integration ready. Your subscription will renew automatically according to your selected billing terms.</p>

            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] space-y-2 font-mono text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>Selected Plan:</span>
                <span className="text-white font-bold">{selectedPlanModal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Billing Frequency:</span>
                <span className="text-white font-bold">{billingCycle === "monthly" ? "Monthly" : "Annual (-20%)"}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold border-t border-white/[0.08] pt-2">
                <span>Total Due Today:</span>
                <span>{selectedPlanModal.includes("Pro") ? (billingCycle === "monthly" ? "€19.00" : "€180.00") : selectedPlanModal.includes("Elite") ? (billingCycle === "monthly" ? "€49.00" : "€468.00") : "€0.00"}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                alert(`Redirecting to Stripe Checkout for ${selectedPlanModal}...`);
                setSelectedPlanModal(null);
              }} 
              className="w-full py-4 rounded-2xl bg-emerald-500 text-zinc-950 font-bold font-mono text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" /> Proceed to Stripe Secure Payment
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
