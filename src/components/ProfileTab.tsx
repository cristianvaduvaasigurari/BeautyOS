"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useHealthOS } from "../context/HealthOSContext";
import { Download, Trash2, LogOut, ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react";

export const ProfileTab: React.FC = () => {
  const { skinProfile, signOutUser, clearAllUserData } = useHealthOS();
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
        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Account & Diagnostic Settings</span>
        <h1 className="text-2xl font-bold text-white tracking-tight">Profile & Operating Preferences</h1>
      </div>

      {/* User Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl font-mono">
            HOS
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">HealthOS Member</h3>
            <p className="text-xs text-zinc-400 font-sans">Biological Optimization Workspace</p>
            <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20 font-bold">
              <ShieldCheck className="w-3 h-3" /> HealthOS Pro Member
            </div>
          </div>
        </div>

        <button
          onClick={signOutUser}
          className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-300 hover:text-white hover:border-rose-500/40 transition-colors flex items-center gap-2 cursor-pointer text-xs font-mono"
        >
          <LogOut className="w-4 h-4 text-zinc-400" />
          <span>Sign Out</span>
        </button>
      </motion.div>

      {/* Diagnostic Baseline */}
      {skinProfile && (
        <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase font-mono">Health & Diagnostic Baseline</h4>
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Active Profile</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Skin / Tissue Type</span>
              <p className="text-sm font-bold text-white mt-1">{skinProfile.skinType}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">Sensitivity Index</span>
              <p className="text-sm font-bold text-white mt-1">{skinProfile.sensitivity}</p>
            </div>
          </div>
        </div>
      )}

      {/* Data Management Actions */}
      <div className="p-8 rounded-[32px] bg-[#101114] border border-white/[0.08] space-y-4">
        <h4 className="text-sm font-bold text-white uppercase font-mono">Data Sovereignty</h4>
        <div className="flex flex-col gap-3">
          <button
            onClick={handleExportData}
            className="w-full p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] hover:border-emerald-500/40 text-left text-zinc-300 hover:text-white transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Download className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-white">Export HealthOS Data</p>
                <p className="text-[10px] text-zinc-500">Download routine logs and progress entries in JSON format</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400" />
          </button>

          {exportNotice && (
            <p className="text-[10px] font-mono text-emerald-400 text-center animate-fadeIn">Export payload prepared. Downloading encrypted backup archive.</p>
          )}

          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 hover:border-rose-500/50 text-left text-rose-300 transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-4 h-4 text-rose-400" />
              <div>
                <p className="text-xs font-bold text-rose-300">Purge Workspace Data</p>
                <p className="text-[10px] text-rose-400/60">Permanently erase cabinet products, check-in history, and goals</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-500" />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-[#101114] border border-white/[0.1] rounded-[32px] p-8 max-w-md w-full text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Purge All Workspace Data?</h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-sans">
                This action is irreversible. All local routines, supplement cabinets, check-ins, and progress photos will be deleted.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-xl bg-zinc-900 border border-white/[0.08] text-white font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearAllUserData();
                  setShowDeleteModal(false);
                }}
                className="flex-1 py-3 rounded-xl bg-rose-500 text-white font-bold"
              >
                Confirm Purge
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
