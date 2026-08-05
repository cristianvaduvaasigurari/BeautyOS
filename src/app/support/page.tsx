"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, Send, Mail } from "lucide-react";

export default function SupportPage() {
  const faqs = [
    {
      q: "How does HealthOS calculate the Active Ingredient Clash Alert?",
      a: "Our diagnostic engine analyzes molecular pH levels, enzymatic pathways, and keratolytic interactions. For instance, combining Retinoids and L-Ascorbic Acid in the same routing layer triggers a clash alert due to pH collision."
    },
    {
      q: "Is HealthOS free to use for public educational research?",
      a: "Yes. 100% of our articles, supplement database breakdowns, safety ratings, and guide protocols are publicly accessible without cost."
    },
    {
      q: "How do I sync my routines across devices?",
      a: "HealthOS uses automated offline-first queue synchronization powered by Supabase. Your routine changes sync automatically when online."
    },
    {
      q: "How can I book a 1-on-1 Health Consultation?",
      a: "Fill out the consultation request on our Contact page or message our team directly on Telegram at t.me/cristianvaduva."
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      <div className="max-w-3xl space-y-6 mb-16">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <HelpCircle className="w-4 h-4" /> Support & Help Center
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          How Can We Help You?
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl font-sans">
          Browse frequently asked questions, learn how to use HealthOS diagnostic features, or connect with our support team directly.
        </p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
            <Send className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Telegram Support</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Direct real-time messaging with our platform strategy team for consultation questions or account assistance.
          </p>
          <a
            href="https://t.me/cristianvaduva"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 hover:underline pt-2"
          >
            Message on Telegram →
          </a>
        </div>

        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Email Consultation</h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            Submit a detailed inquiry or clinical routine analysis request through our structured contact flow.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 hover:underline pt-2"
          >
            Go to Contact Form →
          </Link>
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white tracking-tight font-mono">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] space-y-2">
              <h4 className="text-base font-bold text-white font-sans">{faq.q}</h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
