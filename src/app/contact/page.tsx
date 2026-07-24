"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Send, Loader2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    age: "",
    gender: "",
    goal: "",
    skinType: "",
    concern: "",
    currentRoutine: "",
    productsUsed: "",
    supplementsUsed: "",
    message: "",
    marketingConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: window.location.pathname,
          device: navigator.userAgent
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit the form.');
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-32 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn flex flex-col items-center justify-center">
        <div className="p-12 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] text-center max-w-2xl w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-[#D4AF37]/5 pointer-events-none" />
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Request Received</h2>
          <p className="text-zinc-400 leading-relaxed mb-10">
            Thank you for reaching out to BeautyOS. Your clinical consultation request has been successfully transmitted to our team via Telegram. An expert will be in touch shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-8 py-3 rounded-full bg-[#101114] border border-white/[0.05] text-white font-bold hover:bg-white/[0.05] transition-colors">
              Continue Exploring
            </Link>
            <Link href="/dashboard" className="px-8 py-3 rounded-full bg-[#D4AF37] text-black font-bold hover:bg-white transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white">
      
      <div className="max-w-3xl space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-[#D4AF37] transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
          <Sparkles className="w-4 h-4" /> Consultation
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Talk to an Expert.
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
          Build your personalized routine, find your supplements, or get expert guidance tailored specifically to your biological markers.
        </p>
      </div>

      <div className="max-w-4xl p-8 sm:p-12 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05]">
        
        {error && (
          <div className="p-4 mb-8 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">First Name *</label>
              <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="e.g. Jane" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Last Name *</label>
              <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="e.g. Doe" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Email *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="+1 (555) 000-0000" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="e.g. US" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="e.g. 30" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none">
                <option value="">Select...</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Primary Goal</label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none">
              <option value="">Select your main focus...</option>
              <option value="Skincare Optimization">Skincare Optimization</option>
              <option value="Hair Growth & Scalp">Hair Growth & Scalp</option>
              <option value="Fitness & Body Recomposition">Fitness & Body Recomposition</option>
              <option value="Nutrition & Supplements">Nutrition & Supplements</option>
              <option value="Longevity & Biohacking">Longevity & Biohacking</option>
              <option value="General Wellness">General Wellness</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Skin Type</label>
              <select name="skinType" value={formData.skinType} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors appearance-none">
                <option value="">Select...</option>
                <option value="Oily">Oily</option>
                <option value="Dry">Dry</option>
                <option value="Combination">Combination</option>
                <option value="Normal">Normal</option>
                <option value="Sensitive">Sensitive</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Biggest Concern</label>
              <input type="text" name="concern" value={formData.concern} onChange={handleChange} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors" placeholder="e.g. Acne, Wrinkles, Hair Loss" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-widest text-zinc-500">Message / Request *</label>
            <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none" placeholder="Detail your current situation and what you're looking to achieve..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Current Routine</label>
              <textarea name="currentRoutine" value={formData.currentRoutine} onChange={handleChange} rows={3} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm" placeholder="AM/PM overview..."></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Products Used</label>
              <textarea name="productsUsed" value={formData.productsUsed} onChange={handleChange} rows={3} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm" placeholder="List brands/actives..."></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Supplements Used</label>
              <textarea name="supplementsUsed" value={formData.supplementsUsed} onChange={handleChange} rows={3} className="w-full bg-[#0A0A0A] border border-white/[0.05] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors text-sm" placeholder="List daily supplements..."></textarea>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.05] flex items-start gap-4">
            <input required type="checkbox" id="marketingConsent" name="marketingConsent" checked={formData.marketingConsent} onChange={handleChange} className="mt-1 w-4 h-4 rounded border-white/[0.05] bg-[#0A0A0A] text-[#D4AF37] focus:ring-[#D4AF37] focus:ring-offset-0" />
            <label htmlFor="marketingConsent" className="text-sm text-zinc-400 leading-relaxed cursor-pointer select-none">
              I agree to the <Link href="/privacy" className="text-white hover:text-[#D4AF37] underline underline-offset-4">Privacy Policy</Link> and consent to BeautyOS contacting me regarding this request. I also agree to receive educational content and premium product recommendations.
            </label>
          </div>

          <button disabled={isSubmitting} type="submit" className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-bold text-lg hover:bg-white transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</>
            ) : (
              <><Send className="w-5 h-5" /> Book Consultation & Send Request</>
            )}
          </button>

        </form>
      </div>

    </div>
  );
}
