"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import { Mail, Lock, AlertCircle, X, ArrowRight, Activity, CheckCircle2 } from "lucide-react";

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
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
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
          setSuccessMsg("Account created! Please check your email to confirm your registration.");
        } else if (data.session) {
          setSuccessMsg("Account created and authenticated successfully.");
          if (onClose) setTimeout(onClose, 800);
        }
      } else {
        const { error, data } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.session) {
          setSuccessMsg("Signed in successfully.");
          if (onClose) setTimeout(onClose, 600);
        }
      }
    } catch (err: unknown) {
      console.error("AiX Health Auth Error:", err);
      const errorVal = err as { message?: string; name?: string; status?: number; code?: string };
      const detail = errorVal.message || "An authentication error occurred.";
      setErrorMsg(detail);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md bg-[#101114] border border-white/[0.08] rounded-[28px] p-6 sm:p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden backdrop-blur-xl"
    >
      {isModal && onClose && (
        <button
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-white/[0.06] cursor-pointer"
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
          AiX Health<span className="text-emerald-400">∞</span>
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

      {successMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-sans flex items-start gap-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
        {isSignUp && (
          <div className="space-y-1.5">
            <label htmlFor="auth-fullName" className="block text-zinc-300 font-medium">Full Name</label>
            <input
              id="auth-fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Morgan"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
              required
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="auth-email" className="block text-zinc-300 font-medium">Email Address</label>
          <div className="relative">
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
              required
            />
            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="auth-password" className="block text-zinc-300 font-medium">Password</label>
          <div className="relative">
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 text-sm"
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

      {/* Footer Switch */}
      <div className="space-y-3 text-center text-xs font-sans text-zinc-400 border-t border-white/[0.08] pt-4">
        <button
          type="button"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrorMsg("");
            setSuccessMsg("");
          }}
          className="text-emerald-400 hover:underline cursor-pointer font-medium"
        >
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create one"}
        </button>
      </div>
    </motion.div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 sm:p-6 text-zinc-100 font-sans">
      {content}
    </div>
  );
};
