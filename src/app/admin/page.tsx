"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Users, CreditCard, BookOpen, Send, Search, Lock } from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"users" | "subscriptions" | "leads" | "protocols">("users");

  const stats = [
    { title: "Active Platform Members", count: "1,420", label: "+12% this month", icon: Users },
    { title: "AiX Health Pro & Elite Subscribers", count: "488", label: "€14.2k MRR", icon: CreditCard },
    { title: "Consultation Leads Captured", count: "89", label: "Telegram Sent", icon: Send },
    { title: "Active 90-Day Protocols", count: "1,105", label: "94% Completion", icon: BookOpen }
  ];

  const mockUsers = [
    { name: "Alex Morgan", email: "alex@example.com", tier: "AiX Health Pro", goal: "Build Muscle", healthScore: 92, status: "Active" },
    { name: "Elena Rostova", email: "elena@example.com", tier: "AiX Health Elite", goal: "Improve Skin", healthScore: 88, status: "Active" },
    { name: "Marcus Vance", email: "marcus@example.com", tier: "AiX Health Pro", goal: "Lose Fat", healthScore: 85, status: "Active" },
    { name: "David Kim", email: "david@example.com", tier: "Free Tier", goal: "Longevity", healthScore: 78, status: "Trialing" }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Platform
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4" /> AiX Health Executive Admin Portal
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Platform Administration.
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl font-sans">
          Manage member profiles, active subscriptions, consultation leads, clinical protocols, and platform metrics.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-6 rounded-3xl bg-[#101114] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-500">{s.title}</span>
                <Icon className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-3xl font-bold font-mono text-white">{s.count}</p>
              <p className="text-xs text-emerald-400 font-mono">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Admin Panel Table */}
      <div className="p-8 rounded-[40px] bg-gradient-to-br from-[#101114] via-[#141519] to-[#0A0A0A] border border-white/[0.08] space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6 flex-wrap gap-4">
          <div className="flex gap-2">
            {(["users", "subscriptions", "leads", "protocols"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-mono uppercase font-bold tracking-wider transition-all ${
                  activeTab === tab ? "bg-emerald-500 text-zinc-950 shadow-md" : "bg-[#0A0A0A] text-zinc-400 border border-white/[0.08]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search members..." className="bg-[#0A0A0A] border border-white/[0.08] rounded-full pl-10 pr-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50" />
          </div>
        </div>

        {/* Member Table */}
        <div className="overflow-x-auto font-mono text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-zinc-500 uppercase tracking-widest text-[10px]">
                <th className="pb-4 pt-2">Member</th>
                <th className="pb-4 pt-2">Subscription Tier</th>
                <th className="pb-4 pt-2">Primary Goal</th>
                <th className="pb-4 pt-2">Health Score</th>
                <th className="pb-4 pt-2">Status</th>
                <th className="pb-4 pt-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {mockUsers.map((u, i) => (
                <tr key={i} className="hover:bg-white/[0.02]">
                  <td className="py-4">
                    <p className="font-bold text-white">{u.name}</p>
                    <p className="text-[10px] text-zinc-500">{u.email}</p>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${u.tier.includes("Elite") ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : u.tier.includes("Pro") ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-800 text-zinc-400 border-white/[0.08]"}`}>
                      {u.tier}
                    </span>
                  </td>
                  <td className="py-4 text-zinc-300">{u.goal}</td>
                  <td className="py-4 font-bold text-emerald-400">{u.healthScore} / 100</td>
                  <td className="py-4 text-zinc-400">{u.status}</td>
                  <td className="py-4 text-right">
                    <button className="text-xs text-emerald-400 hover:underline">Manage →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
