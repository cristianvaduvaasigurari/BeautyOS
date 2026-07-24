export const designSystem = {
  // Theme styling utilities matching BeautyOS luxury aesthetic
  card: "p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-[#17181B]",
  cardActive: "border-[#E5C158]/40 bg-[#17181B] shadow-[#E5C158]/5",
  title: "text-base font-semibold text-white font-sans tracking-tight",
  subtitle: "text-xs text-zinc-400 font-sans tracking-wide",
  
  // Custom badges for skincare diagnostics
  badgeDry: "px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400",
  badgeOily: "px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-cyan-500/10 border border-cyan-500/20 text-cyan-400",
  badgeCombination: "px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-purple-500/10 border border-purple-500/20 text-purple-400",
  badgeSensitive: "px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-rose-500/10 border border-rose-500/20 text-rose-400",
  badgeNormal: "px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",

  // Ingredients matching scores
  fitGood: "text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20",
  fitNeutral: "text-zinc-400 bg-zinc-500/10 border border-zinc-500/20",
  fitBad: "text-rose-400 bg-rose-500/10 border border-rose-500/20",

  // Routines categorization
  morning: "text-[#E5C158] bg-[#E5C158]/10 border border-[#E5C158]/20",
  evening: "text-indigo-400 bg-indigo-500/10 border border-indigo-500/20",

  // UI grids
  grid: "grid grid-cols-1 md:grid-cols-2 gap-4",
  flexCenter: "flex items-center justify-center",
};
