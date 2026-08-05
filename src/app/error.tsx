"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("HealthOS Router Exception:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-zinc-100 font-sans">
      <div className="w-full max-w-md bg-[#101114] border border-white/[0.08] rounded-[32px] p-8 shadow-2xl flex flex-col gap-6 text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mx-auto">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white font-sans">System Recovery Required</h2>
          <p className="text-xs text-zinc-400 leading-relaxed font-sans">
            HealthOS encountered an unanticipated state loading this view. This may be due to a transient network interruption.
          </p>
        </div>

        {error.message && (
          <div className="p-3 rounded-xl bg-[#0A0A0A] border border-white/[0.08] text-[11px] text-zinc-400 font-mono break-all text-left">
            Error Diagnostic: {error.message}
          </div>
        )}

        <button
          onClick={() => reset()}
          className="w-full py-3.5 rounded-2xl bg-emerald-500 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
        >
          <RefreshCw className="w-4 h-4 text-zinc-950" />
          <span>Reload Application State</span>
        </button>

      </div>
    </div>
  );
}
