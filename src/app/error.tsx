"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to monitoring services in production
    console.error("BeautyOS App Router Failure:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-zinc-100 font-sans select-none">
      <div className="w-full max-w-sm bg-zinc-950 border border-white/5 rounded-[32px] p-8 shadow-2xl flex flex-col gap-6 text-center relative overflow-hidden">
        
        {/* Glow effect background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 mx-auto">
          <AlertTriangle className="w-6 h-6 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-base font-bold text-white font-sans">A intervenit o eroare</h2>
          <p className="text-xs text-zinc-500 leading-relaxed font-sans">
            BeautyOS a întâmpinat o problemă neprevăzută la încărcarea datelor. Acest lucru poate fi cauzat de o întrerupere temporară a conexiunii la rețea.
          </p>
        </div>

        {error.message && (
          <div className="p-3 rounded-xl bg-zinc-900 border border-white/5 text-[10px] text-zinc-400 font-mono break-all text-left">
            Error: {error.message}
          </div>
        )}

        <button
          onClick={() => reset()}
          className="w-full py-3.5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-zinc-800 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:bg-zinc-900/60 active:scale-98"
        >
          <RefreshCw className="w-4 h-4 text-zinc-400" />
          <span>Reîncearcă încărcarea</span>
        </button>

      </div>
    </div>
  );
}
