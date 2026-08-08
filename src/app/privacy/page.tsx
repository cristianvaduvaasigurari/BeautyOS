import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1000px] mx-auto animate-fadeIn text-white font-sans">
      
      <div className="space-y-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
          <Shield className="w-4 h-4" /> Legal & Data Protection
        </span>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-white leading-[1.05]">
          Privacy Policy
        </h1>
        <p className="text-sm font-mono text-zinc-400">
          Last Updated: August 5, 2026 • Domain: health.cristianvaduva.com
        </p>
      </div>

      <div className="p-8 sm:p-12 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-8 text-sm text-zinc-300 leading-relaxed font-sans">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">1. Commitment to Data Sovereignty</h2>
          <p>
            AiX Health (&quot;the Platform&quot;) is engineered with privacy as a foundational biological boundary. We process health data, check-ins, routine parameters, and diagnostic profiles solely to deliver personalized health insights and optimize platform performance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">2. Information Collection & Usage</h2>
          <p>
            When you register, complete an assessment, or submit consultation requests, we collect minimal necessary data including name, contact email, and user-provided health markers. All offline check-in data is stored locally in your browser storage and synchronized via encrypted transport layers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">3. No Third-Party Data Monetization</h2>
          <p>
            AiX Health never sells, rents, or monetizes personal health metrics or biometric data to third-party ad brokers or data aggregators. Data processed via our AI health coach or contact integrations is transmitted via TLS 1.3 encryption.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">4. User Rights & Data Erasure</h2>
          <p>
            You retain 100% control over your data. You may export your complete activity log or request permanent deletion of your profile at any time through the Profile &amp; Settings interface.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-white font-mono">5. Contact & Data Protection Officer</h2>
          <p>
            For privacy inquiries or data rights requests, contact our compliance team directly at privacy@cristianvaduva.com or via Telegram at t.me/cristianvaduva.
          </p>
        </section>
      </div>

    </div>
  );
}
