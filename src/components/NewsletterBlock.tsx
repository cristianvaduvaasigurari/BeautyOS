"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export const NewsletterBlock = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call for newsletter subscription
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Failed to subscribe. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full p-8 rounded-[32px] bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center justify-center text-center animate-fadeIn">
        <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Welcome to the inner circle.</h3>
        <p className="text-emerald-200/70 text-sm">You&apos;ve successfully joined our premium newsletter.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-8 md:p-12 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] relative overflow-hidden group">
      <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        
        <div className="max-w-xl">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center mb-6">
            <Mail className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Join the 1% optimizing their biology.
          </h3>
          <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
            Get exclusive access to clinical insights, advanced skincare protocols, and early product releases delivered straight to your inbox.
          </p>
        </div>

        <div className="w-full md:w-auto md:min-w-[400px]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                disabled={status === "loading"}
              />
              <button 
                type="submit" 
                disabled={status === "loading" || !email}
                className="absolute right-2 top-2 bottom-2 bg-white text-black px-6 rounded-lg font-bold text-xs hover:bg-[#D4AF37] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Join <ArrowRight className="w-3 h-3" /></>}
              </button>
            </div>
            {status === "error" && (
              <p className="text-xs text-rose-400 font-medium pl-2">{errorMessage}</p>
            )}
            <p className="text-[10px] text-zinc-500 text-center font-mono tracking-widest uppercase mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};
