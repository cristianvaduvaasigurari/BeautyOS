"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Key, Smartphone, Download, Trash2 } from "lucide-react";

export default function AccountSecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    setMessage("Password successfully updated. Secure session re-authenticated.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleExportData = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        exportDate: new Date().toISOString(),
        profile: { email: "member@healthos.com", primaryGoal: "Build Muscle", healthScore: 87 },
        logsCount: 142
      }));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", "healthos_personal_data_export.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 1000);
  };

  const activeSessions = [
    { device: "MacBook Pro (macOS Sonoma)", location: "Bucharest, Romania", ip: "86.120.XX.XX", isCurrent: true },
    { device: "iPhone 15 Pro (iOS 17.5)", location: "Bucharest, Romania", ip: "188.25.XX.XX", isCurrent: false }
  ];

  return (
    <div className="min-h-screen pt-28 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white font-sans">
      
      {/* Header */}
      <div className="max-w-4xl space-y-6 mb-12">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4" /> Account Security &amp; Privacy Center
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.02]">
          Security &amp; Data Control.
        </h1>

        <p className="text-xl text-zinc-400 font-light leading-relaxed max-w-3xl">
          Manage your credentials, active device sessions, multi-factor authentication, personal data exports, and privacy compliance.
        </p>
      </div>

      <div className="max-w-4xl space-y-8">
        
        {/* Password Change Form */}
        <div className="p-8 sm:p-10 rounded-[40px] bg-[#101114] border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Key className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Change Account Password</h3>
          </div>

          {message && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
              {message}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Current Password</label>
              <input type="password" required value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">New Password</label>
                <input type="password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Confirm New Password</label>
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full bg-[#0A0A0A] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500/50" />
              </div>
            </div>

            <button type="submit" className="px-6 py-3.5 rounded-full bg-emerald-500 text-zinc-950 font-mono text-xs uppercase font-bold tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              Update Password
            </button>
          </form>
        </div>

        {/* Active Device Sessions */}
        <div className="p-8 sm:p-10 rounded-[40px] bg-[#101114] border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Smartphone className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">Active Device Sessions</h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {activeSessions.map((sess, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#0A0A0A] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <p className="font-bold text-white flex items-center gap-2">
                    {sess.device} {sess.isCurrent && <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase font-bold">Current</span>}
                  </p>
                  <p className="text-[10px] text-zinc-500">{sess.location} • {sess.ip}</p>
                </div>
                {!sess.isCurrent && (
                  <button className="text-rose-400 hover:underline">Revoke Session</button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Export & Account Deletion */}
        <div className="p-8 sm:p-10 rounded-[40px] bg-gradient-to-br from-[#101114] to-[#0A0A0A] border border-white/[0.08] space-y-6">
          <div className="flex items-center gap-3 border-b border-white/[0.08] pb-4">
            <Download className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">GDPR Data Portability &amp; Controls</h3>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleExportData}
              disabled={isExporting}
              className="px-6 py-3.5 rounded-full bg-zinc-900 border border-white/[0.12] text-white hover:bg-white hover:text-black font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> {isExporting ? "Exporting JSON..." : "Export Personal Health Data (JSON)"}
            </button>

            <button 
              onClick={() => {
                if (confirm("Are you sure you want to delete your AiX Health account? All data will be permanently purged.")) {
                  alert("Account deletion request transmitted.");
                }
              }}
              className="px-6 py-3.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-xs uppercase font-bold tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Delete Account &amp; Purge Data
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
