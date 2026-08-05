import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1000px] mx-auto animate-fadeIn text-white font-sans">
      
      <div className="space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <FileText className="w-4 h-4" /> Terms of Service
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
          Terms of Service
        </h1>
        <p className="text-sm font-mono text-zinc-400">
          Effective Date: August 5, 2026 • Domain: health.cristianvaduva.com
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-8 text-sm text-zinc-300 leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">1. Platform Scope & Purpose</h2>
          <p>
            HealthOS provides scientific educational content, supplement databases, skin barrier protocols, and digital routine tracking software. The platform is designed to assist users in biological optimization and healthy lifestyle management.
          </p>
        </section>

        <section className="space-y-3 p-6 rounded-2xl bg-amber-950/20 border border-amber-500/30">
          <h2 className="text-lg font-bold text-amber-400 font-mono flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" /> Medical Disclaimer
          </h2>
          <p className="text-amber-200/80 text-xs">
            HealthOS content, AI recommendations, and protocol guides do not constitute formal medical advice, diagnosis, or treatment. Always consult a licensed physician or medical professional before making significant changes to your supplement regimen, diet, or workout routine.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">2. User Account Responsibilities</h2>
          <p>
            Users are responsible for maintaining the security of their credentials. You agree not to upload abusive or malicious payloads into public consultation or check-in forms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">3. Intellectual Property</h2>
          <p>
            All proprietary algorithms, editorial articles, custom interface tokens, and HealthOS trademarks are protected under international copyright and trademark laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">4. Governing Law</h2>
          <p>
            These terms are governed by applicable international laws. Any disputes will be resolved through good-faith arbitration.
          </p>
        </section>
      </div>

    </div>
  );
}
