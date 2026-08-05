"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, MessageSquare, AlertTriangle, ListChecks, Target, ShieldCheck, Zap, Activity, Info, Droplets } from "lucide-react";
import { EditorialArticle } from "../data/editorialContent";
import { NewsletterBlock } from "./NewsletterBlock";

export const EditorialTemplate = ({ article, backHref, backLabel }: { article: EditorialArticle, backHref: string, backLabel: string }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32 font-sans selection:bg-emerald-500/30 selection:text-white">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-24 px-6 border-b border-white/[0.08] bg-gradient-to-b from-[#101114] to-[#0A0A0A]">
        <div className="max-w-[900px] mx-auto relative z-10">
          <Link href={backHref} className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to {backLabel}
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
              {article.category}
            </span>
            <span className="text-zinc-500 text-xs font-mono flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {article.estimatedReadTime}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            {article.title}
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl font-sans">
            {article.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Scientific Consensus</p>
                <p className="text-sm font-bold text-white font-mono">{article.scientificConfidence}</p>
              </div>
            </div>
            
            <Link href="#action" className="ml-auto bg-emerald-500 text-zinc-950 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 font-mono">
              Start Protocol
            </Link>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-[900px] mx-auto px-6 py-16 space-y-20">
        
        {/* Introduction */}
        <div className="prose prose-invert prose-lg max-w-none font-sans">
          <p className="text-2xl text-zinc-300 leading-relaxed font-light border-l-4 border-emerald-500 pl-6">
            {article.introduction}
          </p>
        </div>

        {/* Problem & Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-mono uppercase tracking-widest text-xs font-bold">
              <Target className="w-4 h-4" /> The Challenge
            </div>
            <p className="text-zinc-400 leading-relaxed font-sans">{article.problem}</p>
          </div>
          <div className="p-8 rounded-[32px] bg-[#101114] border border-emerald-500/30 space-y-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center gap-2 text-emerald-400 font-mono uppercase tracking-widest text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> The Solution
            </div>
            <p className="text-white font-medium leading-relaxed relative z-10 font-sans">{article.solution}</p>
          </div>
        </div>

        {/* Clinical Diagnostics (Skin/Body/Hair) */}
        {(article.symptoms || article.causes || article.howItDevelops) && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Activity className="w-8 h-8 text-emerald-400" /> Clinical Diagnostics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {article.symptoms && (
                <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08]">
                  <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4 font-bold">Symptoms & Markers</h3>
                  <ul className="space-y-3">
                    {article.symptoms.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300 font-sans text-sm">
                        <Droplets className="w-4 h-4 text-emerald-400 shrink-0 mt-1" /> {sym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {article.causes && (
                <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08]">
                  <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-4 font-bold">Underlying Causes</h3>
                  <ul className="space-y-3">
                    {article.causes.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300 font-sans text-sm">
                        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-1" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {article.howItDevelops && (
              <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-3">
                <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-widest font-bold">Physiological Development</h3>
                <p className="text-zinc-300 leading-relaxed font-sans text-sm">{article.howItDevelops}</p>
              </div>
            )}
          </section>
        )}

        {/* Benefits & Key Outcomes */}
        {article.benefits && article.benefits.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Zap className="w-8 h-8 text-emerald-400" /> Expected Outcomes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.benefits.map((b, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-zinc-200 font-sans text-sm">{b}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step-by-Step Implementation */}
        {article.stepByStep && article.stepByStep.length > 0 && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <ListChecks className="w-8 h-8 text-emerald-400" /> Protocol Implementation
            </h2>
            <div className="space-y-4">
              {article.stepByStep.map((s) => (
                <div key={s.step} className="p-6 rounded-2xl bg-[#101114] border border-white/[0.08] flex gap-6 items-start">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center shrink-0">
                    0{s.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">{s.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed font-sans">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Clinical Warnings */}
        {article.warnings && article.warnings.length > 0 && (
          <section className="p-8 rounded-[32px] bg-rose-950/20 border border-rose-500/30 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-mono uppercase tracking-widest text-xs font-bold">
              <AlertTriangle className="w-4 h-4" /> Contraindications & Warnings
            </div>
            <ul className="space-y-2">
              {article.warnings.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-rose-200/80 text-sm font-sans">
                  <span className="text-rose-400 font-bold">•</span> {w}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
          <section className="space-y-8 pt-8 border-t border-white/[0.08]">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-emerald-400" /> Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {article.faqs.map((faq, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <h4 className="text-lg font-bold text-white mb-3 font-sans">{faq.question}</h4>
                  <p className="text-zinc-400 leading-relaxed font-sans text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Content Links */}
        {(article.relatedGuides?.length > 0 || article.relatedIngredients?.length > 0) && (
          <section className="pt-8 border-t border-white/[0.08] grid grid-cols-1 md:grid-cols-2 gap-8">
            {article.relatedGuides && article.relatedGuides.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest font-mono">Related Guides</h4>
                <ul className="space-y-3">
                  {article.relatedGuides.map(guide => (
                    <li key={guide}>
                      <Link href={`/guides/${guide}`} className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-sans">
                        <ArrowLeft className="w-3 h-3 rotate-180 text-emerald-400" /> {guide.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {article.relatedIngredients && article.relatedIngredients.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest font-mono">Related Ingredients</h4>
                <ul className="space-y-3">
                  {article.relatedIngredients.map(ing => (
                    <li key={ing}>
                      <Link href={`/ingredients/${ing}`} className="text-zinc-400 hover:text-emerald-400 transition-colors flex items-center gap-2 text-sm font-sans">
                        <ArrowLeft className="w-3 h-3 rotate-180 text-emerald-400" /> {ing.replace(/-/g, ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

      </article>

      {/* Global Bottom CTA */}
      <div id="action" className="max-w-[900px] mx-auto px-6 mt-4">
        <div className="p-10 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-emerald-500/30 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to optimize your health?</h3>
          <p className="text-zinc-400 mb-8 relative z-10 max-w-md mx-auto font-sans">
            Connect with the HealthOS AI Assistant to build a personalized protocol incorporating everything you just learned about {article.title}.
          </p>
          <Link href="/dashboard" className="relative z-10 inline-flex items-center justify-center bg-emerald-500 text-zinc-950 px-8 py-4 rounded-full font-bold hover:bg-emerald-400 transition-colors gap-2 mx-auto cursor-pointer shadow-lg shadow-emerald-500/20 font-mono">
            <Zap className="w-4 h-4" /> Start Your Optimization Journey
          </Link>
        </div>
      </div>

      <div className="mt-16 border-t border-white/[0.08] pt-16">
        <NewsletterBlock />
      </div>

    </div>
  );
};
