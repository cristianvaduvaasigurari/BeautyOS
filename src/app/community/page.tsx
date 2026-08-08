"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Zap, Heart, MessageSquare, Bookmark, BookOpen } from "lucide-react";

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<"stories" | "discussions" | "expert">("stories");
  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>({});
  const [savedPosts, setSavedPosts] = useState<Record<number, boolean>>({});

  const toggleLike = (idx: number) => {
    setLikedPosts(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSave = (idx: number) => {
    setSavedPosts(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const communityPosts = [
    {
      author: "Educational Research Review",
      role: "Sports Biochemistry & Physiology Literature",
      avatar: "ER",
      badge: "Research Review",
      title: "Hypertrophy Programming & Protein Timing Research",
      text: "Reviewing muscle protein synthesis literature on leucine threshold distribution, progressive mechanical overload, and recovery signaling in active populations.",
      protocol: "Muscle Physiology Science",
      likesCount: 142,
      commentsCount: 28,
      category: "expert"
    },
    {
      author: "Illustrative Educational Example",
      role: "Longevity Education",
      avatar: "EX",
      badge: "Educational Reference",
      title: "NMN + Magnesium Glycinate — Educational Review",
      text: "An illustrative example of how sleep-related outcomes may be discussed when reviewing research on supplement combinations. This example is provided for educational purposes only and does not represent a verified individual, clinical outcome, or personal health result.",
      protocol: "Longevity Science",
      likesCount: 98,
      commentsCount: 19,
      category: "stories"
    },
    {
      author: "Educational Discussion",
      role: "Athletic Performance Science",
      avatar: "ED",
      badge: "Discussion Context",
      title: "Creatine Monohydrate & Intracellular Hydration Literature",
      text: "Discussing published research on creatine monohydrate loading strategies, phosphocreatine ATP resynthesis, and intracellular osmolality responses in exercise literature.",
      protocol: "Athletic Science",
      likesCount: 115,
      commentsCount: 14,
      category: "discussions"
    }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-12">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
          <Users className="w-4 h-4" /> AiX Health Community Research
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Educational Discussions &amp; Research Reviews.
        </h1>
        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl font-sans">
          Explore scientific literature reviews, educational research topics, and evidence-based health intelligence.
        </p>

        {/* Tab selector */}
        <div className="pt-4 flex gap-3 border-t border-white/[0.08]">
          {(["stories", "discussions", "expert"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                activeTab === tab 
                  ? "bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20" 
                  : "bg-[#101114] text-zinc-400 border border-white/[0.08] hover:text-white"
              }`}
            >
              {tab === "stories" ? "Educational Reviews" : tab === "discussions" ? "Protocol Discussions" : "Literature Overviews"}
            </button>
          ))}
        </div>
      </div>

      {/* Posts List */}
      <div className="space-y-8 max-w-4xl mb-16">
        {communityPosts.map((post, idx) => (
          <div key={idx} className="p-8 sm:p-10 rounded-[36px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {post.author} <BookOpen className="w-4 h-4 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-zinc-500 font-sans">{post.role}</p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase">
                {post.badge}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">{post.title}</h3>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">{post.text}</p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="text-emerald-400 font-bold">Topic: {post.protocol}</span>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleLike(idx)}
                  className={`flex items-center gap-1.5 transition-colors ${likedPosts[idx] ? "text-rose-400 font-bold" : "hover:text-white"}`}
                >
                  <Heart className={`w-4 h-4 ${likedPosts[idx] ? "fill-current" : ""}`} />
                  <span>{post.likesCount + (likedPosts[idx] ? 1 : 0)}</span>
                </button>

                <div className="flex items-center gap-1.5 hover:text-white cursor-pointer">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount}</span>
                </div>

                <button 
                  onClick={() => toggleSave(idx)}
                  className={`transition-colors ${savedPosts[idx] ? "text-emerald-400 font-bold" : "hover:text-white"}`}
                >
                  <Bookmark className={`w-4 h-4 ${savedPosts[idx] ? "fill-current" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="max-w-4xl p-12 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-emerald-500/30 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Explore Educational Health Intelligence</h2>
        <p className="text-sm text-zinc-400 max-w-md mx-auto font-sans">
          Access evidence-based educational frameworks, scientific research breakdowns, and transparent methodology.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/protocols" className="px-8 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-xs uppercase font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Explore Educational Protocols
          </Link>
        </div>
      </div>

    </div>
  );
}
