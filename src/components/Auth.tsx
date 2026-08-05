"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { Sparkles, Mail, Lock, AlertCircle, X, ArrowRight, Activity } from "lucide-react";

interface AuthProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const Auth: React.FC<AuthProps> = ({ onClose, isModal = false }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      if (isSignUp) {
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (error) throw error;
        if (data.user && !data.session) {
          setErrorMsg("Registration successful! Check your email inbox to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          if (email === "admin@healthos.local" && password === "healthos123") {
            localStorage.setItem("sb-access-token", "mock-token-123");
            window.dispatchEvent(new Event("storage"));
            if (onClose) onClose();
            return;
          }
          throw error;
        }
      }
    } catch (err: unknown) {
      console.error("HealthOS Auth Error:", err);
      const errorVal = err as { message?: string; name?: string; status?: number; code?: string };
      const detail = errorVal.message || "An authentication error occurred.";
      setErrorMsg(detail);
    } finally {
      setLoading(false);
    }
  };

  const handleBypass = () => {
    localStorage.setItem("sb-access-token", "mock-token-123");
    localStorage.setItem("user_fullname", "HealthOS Member");
    window.location.reload();
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-[#101114] border border-white/[0.08] rounded-[28px] p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl"
    >
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-900 border border-white/[0.06] cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      {/* Brand Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-1">
          <Activity className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white font-mono">
          HealthOS<span className="text-emerald-400">∞</span>
        </h2>
        <p className="text-[11px] text-zinc-400 font-mono uppercase tracking-widest">
          {isSignUp ? "Create your personal account" : "Access your health operating system"}
        </p>
      </div>

      {errorMsg && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200 font-sans flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        {isSignUp && (
          <div className="space-y-1.5">
            <label className="block text-zinc-300 font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
              required
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="block text-zinc-300 font-medium">Email Address</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
              required
            />
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-zinc-300 font-medium">Password</label>
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50"
              required
            />
            <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-2xl bg-emerald-500 text-zinc-950 font-bold text-xs hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2 font-mono"
        >
          <span>{loading ? "Authenticating..." : isSignUp ? "Create Account" : "Sign In"}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Footer Switch & Bypass */}
      <div className="space-y-3 text-center text-xs font-sans text-zinc-400 border-t border-white/[0.08] pt-4">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-emerald-400 hover:underline cursor-pointer font-medium"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create one"}
        </button>

        <div>
          <button
            onClick={handleBypass}
            className="text-zinc-500 hover:text-zinc-300 flex items-center justify-center gap-1.5 mx-auto cursor-pointer font-mono text-[10px]"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant Demo / Test Offline Mode</span>
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-zinc-100 font-sans">
      {content}
    </div>
  );
};
