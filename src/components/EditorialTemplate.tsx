"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, CheckCircle2, MessageSquare, AlertTriangle, ListChecks, Target, ShieldCheck } from "lucide-react";
import { EditorialArticle } from "../data/editorialContent";

export const EditorialTemplate = ({ article, backHref, backLabel }: { article: EditorialArticle, backHref: string, backLabel: string }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-6 border-b border-white/[0.05] bg-gradient-to-b from-[#101114] to-[#0A0A0A]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        <div className="max-w-[900px] mx-auto relative z-10">
          <Link href={backHref} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-[#D4AF37] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to {backLabel}
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest">
              {article.category}
            </span>
            <span className="text-zinc-500 text-xs font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {article.estimatedReadTime}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            {article.title}
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl">
            {article.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Scientific Consensus</p>
                <p className="text-sm font-bold text-white">{article.scientificConfidence}</p>
              </div>
            </div>
            
            <Link href="#action" className="ml-auto bg-[#D4AF37] text-black px-6 py-2.5 rounded-full font-bold text-sm hover:bg-white transition-colors">
              Start Protocol
            </Link>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[900px] mx-auto px-6 py-16 space-y-20">
        
        {/* Introduction */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-2xl text-zinc-300 leading-relaxed font-light border-l-4 border-[#D4AF37] pl-6">
            {article.introduction}
          </p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.05] space-y-4">
            <div className="flex items-center gap-2 text-[#D4AF37] font-mono uppercase tracking-widest text-xs">
              <Target className="w-4 h-4" /> The Challenge
            </div>
            <p className="text-zinc-400 leading-relaxed">{article.problem}</p>
          </div>
          <div className="p-8 rounded-[32px] bg-[#101114] border border-[#D4AF37]/20 space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-2 text-[#D4AF37] font-mono uppercase tracking-widest text-xs">
              <ShieldCheck className="w-4 h-4" /> The Solution
            </div>
            <p className="text-white font-medium leading-relaxed relative z-10">{article.solution}</p>
          </div>
        </div>

        {/* Core Benefits */}
        {article.benefits && article.benefits.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" /> Core Outcomes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {article.benefits.map((benefit, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 border border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] font-bold text-xs">{idx + 1}</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step-by-Step Routine */}
        {article.stepByStep && article.stepByStep.length > 0 && (
          <section className="space-y-8 p-10 rounded-[32px] bg-[#FAFAFA] text-zinc-950">
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <ListChecks className="w-8 h-8 text-[#D4AF37]" /> The Clinical Protocol
            </h2>
            <div className="space-y-6">
              {article.stepByStep.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center font-bold text-lg font-mono">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-950 mb-1">{step.title}</h4>
                    <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Sections */}
        {article.sections.map((section, idx) => (
          <section key={idx} className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tight">{section.title}</h2>
            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
            
            {section.callout && (
              <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-2 border-[#D4AF37]">
                <p className="text-[#D4AF37] font-medium italic">
                  &quot;{section.callout}&quot;
                </p>
              </div>
            )}
          </section>
        ))}

        {/* Warnings */}
        {article.warnings && article.warnings.length > 0 && (
          <div className="p-8 rounded-[32px] bg-rose-500/5 border border-rose-500/20 flex gap-6">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Clinical Contraindications</h3>
              <ul className="space-y-2 list-disc pl-4 text-rose-200/70">
                {article.warnings.map((warning, idx) => (
                  <li key={idx} className="leading-relaxed">{warning}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Expert Tip */}
        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.05] flex gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#101114] to-[#1F2023] border border-white/[0.05] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Expert Insight</h3>
            <p className="text-zinc-400 leading-relaxed">{article.expertTip}</p>
          </div>
        </div>

        {/* FAQs */}
        {article.faqs.length > 0 && (
          <section className="space-y-8 pt-8 border-t border-white/[0.05]">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-[#D4AF37]" /> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                  <p className="text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </article>

      {/* Global Bottom CTA */}
      <div id="action" className="max-w-[900px] mx-auto px-6 mt-4">
        <div className="p-10 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-[#D4AF37]/20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to optimize your biology?</h3>
          <p className="text-zinc-400 mb-8 relative z-10 max-w-md mx-auto">
            Connect with the BeautyOS AI to build a personalized protocol incorporating everything you just learned about {article.title}.
          </p>
          <Link href="/dashboard" className="relative z-10 inline-flex items-center justify-center bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-colors gap-2 mx-auto cursor-pointer">
            <Sparkles className="w-4 h-4" /> Start Your Optimization Journey
          </Link>
        </div>
      </div>

    </div>
  );
};
