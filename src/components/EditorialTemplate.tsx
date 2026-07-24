"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles, CheckCircle2, MessageSquare, AlertTriangle, ListChecks, Target, ShieldCheck, Zap, Activity, Info, Beaker, Star, Droplets, Sun, Moon } from "lucide-react";
import { EditorialArticle } from "../data/editorialContent";

export const EditorialTemplate = ({ article, backHref, backLabel }: { article: EditorialArticle, backHref: string, backLabel: string }) => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-32 font-sans selection:bg-[#D4AF37]/30 selection:text-white">
      
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

        {/* Clinical Diagnostics (Skin/Body/Hair) */}
        {(article.symptoms || article.causes || article.howItDevelops) && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#D4AF37]" /> Clinical Diagnostics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {article.symptoms && (
                <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.05]">
                  <h3 className="text-sm font-mono text-[#D4AF37] uppercase tracking-widest mb-4">Symptoms & Markers</h3>
                  <ul className="space-y-3">
                    {article.symptoms.map((sym, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Droplets className="w-4 h-4 text-zinc-500 shrink-0 mt-1" /> {sym}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {article.causes && (
                <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.05]">
                  <h3 className="text-sm font-mono text-[#D4AF37] uppercase tracking-widest mb-4">Root Causes</h3>
                  <ul className="space-y-3">
                    {article.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2 text-zinc-300">
                        <Zap className="w-4 h-4 text-zinc-500 shrink-0 mt-1" /> {cause}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {article.howItDevelops && (
                <div className="md:col-span-2 p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="text-sm font-mono text-[#D4AF37] uppercase tracking-widest mb-4">Pathogenesis</h3>
                  <p className="text-zinc-400 leading-relaxed">{article.howItDevelops}</p>
                </div>
              )}

            </div>
          </section>
        )}

        {/* Nutritional & Supplement Protocol Data */}
        {(article.whatItIs || article.dosageRanges || article.evidenceSummary) && (
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <Beaker className="w-8 h-8 text-[#D4AF37]" /> Protocol Data
            </h2>
            
            {article.whatItIs && (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">What It Is</h4>
                <p className="text-zinc-300">{article.whatItIs}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.dosageRanges && (
                <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.05]">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-2">Clinical Dosage</h4>
                  <p className="text-white font-bold">{article.dosageRanges}</p>
                </div>
              )}
              {article.timing && (
                <div className="p-6 rounded-2xl bg-[#101114] border border-white/[0.05]">
                  <h4 className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest mb-2">Optimal Timing</h4>
                  <p className="text-white font-bold">{article.timing}</p>
                </div>
              )}
            </div>

            {article.evidenceSummary && (
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">Evidence Summary</h4>
                <p className="text-zinc-300">{article.evidenceSummary}</p>
              </div>
            )}
          </section>
        )}

        {/* Ingredients Analysis */}
        {(article.bestIngredients || article.ingredientsToAvoid) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.bestIngredients && (
              <div className="p-8 rounded-[32px] bg-emerald-500/5 border border-emerald-500/20">
                <h3 className="text-sm font-bold text-emerald-400 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Actives
                </h3>
                <ul className="space-y-2">
                  {article.bestIngredients.map((ing, i) => (
                    <li key={i} className="text-zinc-300 font-medium">• {ing}</li>
                  ))}
                </ul>
              </div>
            )}
            {article.ingredientsToAvoid && (
              <div className="p-8 rounded-[32px] bg-rose-500/5 border border-rose-500/20">
                <h3 className="text-sm font-bold text-rose-400 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Ingredients to Avoid
                </h3>
                <ul className="space-y-2">
                  {article.ingredientsToAvoid.map((ing, i) => (
                    <li key={i} className="text-zinc-300 font-medium">• {ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

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

        {/* AM / PM Routines */}
        {(article.morningRoutine || article.nightRoutine) && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {article.morningRoutine && (
              <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05]">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Sun className="w-6 h-6 text-amber-400" /> Morning Routine
                </h3>
                <div className="space-y-6">
                  {article.morningRoutine.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-[#D4AF37] font-mono font-bold">0{i+1}</span>
                      <span className="text-zinc-300 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {article.nightRoutine && (
              <div className="p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05]">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                  <Moon className="w-6 h-6 text-indigo-400" /> Night Routine
                </h3>
                <div className="space-y-6">
                  {article.nightRoutine.map((step, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-[#D4AF37] font-mono font-bold">0{i+1}</span>
                      <span className="text-zinc-300 font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Dynamic Content Sections */}
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

        {/* Warnings & Interactions */}
        {((article.warnings && article.warnings.length > 0) || (article.interactions && article.interactions.length > 0)) && (
          <div className="p-8 rounded-[32px] bg-rose-500/5 border border-rose-500/20 flex flex-col sm:flex-row gap-8">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <div className="w-full space-y-6">
              {article.warnings && article.warnings.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Clinical Contraindications</h3>
                  <ul className="space-y-2 list-disc pl-4 text-rose-200/70">
                    {article.warnings.map((warning, idx) => (
                      <li key={idx} className="leading-relaxed">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
              {article.interactions && article.interactions.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Known Interactions</h3>
                  <ul className="space-y-2 list-disc pl-4 text-rose-200/70">
                    {article.interactions.map((interaction, idx) => (
                      <li key={idx} className="leading-relaxed">{interaction}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Expert Tip */}
        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.05] flex gap-6">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#101114] to-[#1F2023] border border-white/[0.05] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.15)]">
            <Info className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Expert Insight</h3>
            <p className="text-zinc-400 leading-relaxed">{article.expertTip}</p>
          </div>
        </div>

        {/* Product Recommendations */}
        {article.recommendedProducts && article.recommendedProducts.length > 0 && (
          <section className="space-y-8 pt-12 border-t border-white/[0.05]">
            <div className="flex flex-col gap-2 mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" /> Recommended Protocols
              </h2>
              <p className="text-zinc-400">Curated products scientifically proven to accelerate {article.title} results.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.recommendedProducts.map(product => (
                <div key={product.id} className="p-6 rounded-[24px] bg-[#101114] border border-white/[0.05] hover:border-white/[0.15] transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex gap-4 mb-6 pb-6 border-b border-white/[0.05]">
                      <div className="w-24 h-24 rounded-xl bg-[#0A0A0A] p-2 flex-shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{product.brand}</span>
                        <h4 className="text-lg font-bold text-white mt-1 leading-tight">{product.name}</h4>
                        <div className="flex items-center gap-3 mt-3">
                          <span className="flex items-center gap-1 text-xs font-bold text-emerald-400"><Beaker className="w-3 h-3" /> {product.scientificScore}</span>
                          <span className="flex items-center gap-1 text-xs font-bold text-blue-400"><ShieldCheck className="w-3 h-3" /> {product.safetyScore}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Best For</span>
                        <p className="text-sm text-zinc-300">{product.bestFor}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Benefits</span>
                        <p className="text-sm text-zinc-300">{product.benefits.join(" • ")}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                    <span className="text-sm font-bold text-white">{product.routinePlacement}</span>
                    <button className="bg-white text-black px-4 py-2 rounded-full font-bold text-xs hover:bg-[#D4AF37] transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {article.faqs && article.faqs.length > 0 && (
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

        {/* Related Content Links */}
        {(article.relatedGuides?.length > 0 || article.relatedIngredients?.length > 0) && (
          <section className="pt-8 border-t border-white/[0.05] grid grid-cols-1 md:grid-cols-2 gap-8">
            {article.relatedGuides && article.relatedGuides.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest font-mono">Related Guides</h4>
                <ul className="space-y-3">
                  {article.relatedGuides.map(guide => (
                    <li key={guide}>
                      <Link href={`/guides/${guide}`} className="text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-3 h-3 rotate-180" /> {guide.replace(/-/g, ' ')}
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
                      <Link href={`/ingredients/${ing}`} className="text-zinc-400 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm">
                        <ArrowLeft className="w-3 h-3 rotate-180" /> {ing.replace(/-/g, ' ')}
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
