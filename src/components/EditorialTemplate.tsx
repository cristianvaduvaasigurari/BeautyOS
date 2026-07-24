"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import { EditorialArticle } from "../data/editorialContent";

export const EditorialTemplate = ({ article, backHref, backLabel }: { article: EditorialArticle, backHref: string, backLabel: string }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-6 border-b border-white/[0.05] bg-gradient-to-b from-[#101114] to-[#0A0A0A]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />
        <div className="max-w-[800px] mx-auto relative z-10">
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
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[800px] mx-auto px-6 py-16 space-y-16">
        
        {/* Introduction */}
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-xl text-zinc-300 leading-relaxed font-light">
            {article.introduction}
          </p>
        </div>

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

        {/* Expert Tip */}
        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.05] flex gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#101114] to-[#1F2023] border border-white/[0.05] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Clinical Protocol Tip</h3>
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
      <div className="max-w-[800px] mx-auto px-6 mt-12">
        <div className="p-10 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-[#D4AF37]/20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to optimize your biology?</h3>
          <p className="text-zinc-400 mb-8 relative z-10 max-w-md mx-auto">
            Connect with the BeautyOS AI to build a personalized protocol incorporating {article.title}.
          </p>
          <button className="relative z-10 bg-[#D4AF37] text-black px-8 py-4 rounded-full font-bold hover:bg-white transition-colors flex items-center gap-2 mx-auto">
            <Sparkles className="w-4 h-4" /> Build My Protocol
          </button>
        </div>
      </div>

    </div>
  );
};
