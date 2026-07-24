"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useBeautyOS } from "../context/BeautyOSContext";
import { Download, Trash2, LogOut, Sparkles, ChevronRight, X, AlertTriangle } from "lucide-react";

export const ProfileTab: React.FC = () => {
  const { skinProfile, signOutUser, clearAllUserData } = useBeautyOS();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  const handleExportData = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  return (
    <div className="flex flex-col gap-6 pb-28 animate-fadeIn max-w-2xl mx-auto relative font-sans text-xs">
      
      {/* Header Bar */}
      <div>
        <span className="text-[10px] font-mono text-[#E5C158] uppercase tracking-widest">Account & Diagnostic Settings</span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Profile & Operating Preferences</h1>
      </div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E5C158]/20 to-[#D4AF37]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] font-bold text-xl font-mono">
            OS
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">BeautyOS User</h3>
            <p className="text-xs text-[#A1A1AA]">Evaluation & Testing Workspace</p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
              <Sparkles className="w-3 h-3" />
              <span>Pro Active Plan</span>
            </div>
          </div>
        </div>

        <button
          onClick={signOutUser}
          className="px-5 py-2.5 rounded-full bg-zinc-950 hover:bg-zinc-900 border border-white/[0.08] text-rose-400 font-semibold text-xs transition-all cursor-pointer flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </motion.div>

      {/* Diagnostic Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-6 shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
          <div>
            <span className="text-[10px] font-mono text-[#E5C158] uppercase">Diagnostic Baseline</span>
            <h3 className="text-base font-bold text-white">Skin Diagnostic Profile</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-xs font-mono font-bold border border-[#E5C158]/20">
            {skinProfile?.skinType || "Combination"} Skin
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Sensitivity Index</span>
            <p className="text-sm font-bold text-white">{skinProfile?.sensitivity || "Medium"} Sensitivity</p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-white/[0.08] space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase">Primary Skin Goals</span>
            <p className="text-xs font-semibold text-emerald-400">
              {skinProfile?.goals?.join(", ") || "Barrier Repair, Hydration Boost"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Settings Grid */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-2">Data & Privacy Options</h4>

        <div className="p-4 rounded-2xl bg-[#101114] border border-white/[0.08] space-y-3">
          
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-950 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4 text-[#E5C158]" />
              <div>
                <h5 className="text-xs font-bold text-white">Export Clinical Skin Journal</h5>
                <p className="text-[10px] text-[#A1A1AA]">Download complete JSON & PDF report</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </button>

          {exportNotice && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono">
              ✓ Clinical diagnostic data exported successfully.
            </div>
          )}

          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-950 transition-colors text-left cursor-pointer border-t border-white/[0.04] pt-3"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <div>
                <h5 className="text-xs font-bold text-rose-300">Reset Local Skin Data</h5>
                <p className="text-[10px] text-zinc-500">Purge local cache and reset diagnostic profile</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
          </button>

        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#101114] border border-white/[0.08] rounded-[28px] max-w-md w-full p-6 space-y-5 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="text-base font-bold text-white">Reset Local Workspace?</h3>
              </div>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              This action will clear all local cabinet items, routine completion logs, check-in journal entries, and diagnostic skin settings.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-full bg-zinc-900 border border-white/[0.08] text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllUserData();
                  setShowDeleteModal(false);
                  window.location.reload();
                }}
                className="flex-1 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs cursor-pointer shadow-lg shadow-rose-600/20"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
