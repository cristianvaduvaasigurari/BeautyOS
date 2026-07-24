"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { editorialContent, EditorialArticle } from "../data/editorialContent";

export const CategoryHub = ({ category, title, description }: { category: string, title: string, description: string }) => {
  const articles: EditorialArticle[] = Object.values(editorialContent).filter(a => a.category === category);

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn">
      
      <div className="max-w-3xl space-y-6">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-[#D4AF37] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
          <Sparkles className="w-4 h-4" /> Domain Hub
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          {title}
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <Link href={`/${category.toLowerCase()}/${article.slug}`} key={article.id} className="p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] hover:border-[#D4AF37]/50 transition-all group cursor-pointer flex flex-col h-full">
            <div className="w-12 h-12 rounded-2xl bg-[#0A0A0A] flex items-center justify-center mb-6">
              <span className="text-[#D4AF37] font-mono text-sm">
                {idx < 9 ? `0${idx + 1}` : idx + 1}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{article.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-8 flex-1">
              {article.subtitle}
            </p>
            <div className="mt-auto pt-6 border-t border-white/[0.05]">
              <button className="text-xs font-bold text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Protocol <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};
