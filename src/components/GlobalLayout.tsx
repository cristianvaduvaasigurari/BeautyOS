"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Search, User, Menu, X, ChevronDown, ChevronRight, Zap } from "lucide-react";
import { FloatingActionButton } from "./FloatingActionButton";
import { NewsletterBlock } from "./NewsletterBlock";
import { useHealthOS } from "../context/HealthOSContext";

export const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const { userSession } = useHealthOS();

  const isDashboardRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/progress") || pathname.startsWith("/products");

  const navLinks = [
    { label: "Skin", href: "/skin" },
    { label: "Hair", href: "/hair" },
    { label: "Body", href: "/body" },
    { label: "Fitness", href: "/fitness" },
    { label: "Nutrition", href: "/nutrition" },
    { label: "Supplements", href: "/supplements" },
    { label: "Longevity", href: "/longevity" },
    { label: "Science", href: "/science" },
    { label: "Guides", href: "/guides" },
    { label: "Community", href: "/community" }
  ];

  const megaMenuData: Record<string, { title: string; subtitle: string; columns: { title: string; links: { label: string; href: string }[] }[] }> = {
    Skin: {
      title: "Skin Physiology & Health",
      subtitle: "Clinical protocols, dermal barrier integrity & cellular rejuvenation.",
      columns: [
        {
          title: "Dermal Concerns",
          links: [
            { label: "Acne Program", href: "/skin/acne" },
            { label: "Barrier Repair", href: "/skin/barrier-repair" },
            { label: "Rosacea & Redness", href: "/skin/rosacea" },
            { label: "Sensitive Skin", href: "/skin/sensitive-skin" },
            { label: "Anti-Aging & Collagen", href: "/skin/anti-aging" },
            { label: "Hyperpigmentation", href: "/skin/pigmentation" },
            { label: "Sun Damage", href: "/skin/sun-damage" },
            { label: "Dry & Dehydrated", href: "/skin/dry-skin" },
            { label: "Oily & Sebum Control", href: "/skin/oily-skin" },
            { label: "Combination Skin", href: "/skin/combination-skin" }
          ]
        },
        {
          title: "Actives & Ingredients",
          links: [
            { label: "Retinol & Retinoids", href: "/skin/retinol" },
            { label: "Vitamin C Formulations", href: "/skin/vitamin-c" },
            { label: "Ceramides Complex", href: "/ingredients/ceramides" },
            { label: "Niacinamide (B3)", href: "/ingredients/niacinamide" },
            { label: "Azelaic Acid", href: "/ingredients/azelaic-acid" },
            { label: "Peptide Complexes", href: "/ingredients/peptides" },
            { label: "Hyaluronic Acid", href: "/ingredients/hyaluronic-acid" },
            { label: "Broad-Spectrum SPF", href: "/ingredients/spf" }
          ]
        }
      ]
    },
    Hair: {
      title: "Hair & Scalp Science",
      subtitle: "Molecular repair, follicle density, and hormonal hair support.",
      columns: [
        {
          title: "Hair & Scalp Concerns",
          links: [
            { label: "Hair Loss & Thinning", href: "/hair/hair-loss" },
            { label: "Scalp Microbiome", href: "/hair/scalp-health" },
            { label: "Growth Stimulation", href: "/hair/hair-growth" },
            { label: "Dandruff & Flaking", href: "/hair/dandruff" }
          ]
        },
        {
          title: "Follicle Care & Types",
          links: [
            { label: "Curly & Textured Hair", href: "/hair/curly" },
            { label: "Fine & Straight Hair", href: "/hair/straight" },
            { label: "Hair Oils & Serums", href: "/hair/oils" }
          ]
        }
      ]
    },
    Body: {
      title: "Body Composition & Restoration",
      subtitle: "Physical structural health, posture, and tissue elasticity.",
      columns: [
        {
          title: "Body Physiology",
          links: [
            { label: "Body Composition", href: "/body/body-composition" },
            { label: "Posture & Spine", href: "/body/posture" },
            { label: "Tissue Recovery", href: "/body/recovery" },
            { label: "Stretch Marks & Scars", href: "/body/stretch-marks" },
            { label: "Cellulite & Microcirculation", href: "/body/cellulite" },
            { label: "Systemic Hydration", href: "/body/hydration" },
            { label: "Body Care Routines", href: "/body/care" },
            { label: "Hand & Nail Care", href: "/body/hands" },
            { label: "Foot & Gait Health", href: "/body/feet" }
          ]
        }
      ]
    },
    Fitness: {
      title: "Movement, Strength & Recovery",
      subtitle: "Metabolic conditioning, hypertrophy, and neural adaptation.",
      columns: [
        {
          title: "Hypertrophy & Strength",
          links: [
            { label: "Build Muscle", href: "/fitness/build-muscle" },
            { label: "Fat Loss Protocols", href: "/fitness/lose-fat" },
            { label: "Strength Training", href: "/fitness/strength" },
            { label: "Hypertrophy Blueprint", href: "/fitness/hypertrophy" }
          ]
        },
        {
          title: "Cardio & Restorative",
          links: [
            { label: "Cardio Foundation", href: "/fitness/cardio" },
            { label: "Running & Endurance", href: "/fitness/running" },
            { label: "HIIT & Conditioning", href: "/fitness/hiit" },
            { label: "Muscle Recovery", href: "/fitness/recovery" },
            { label: "Mobility & Joint Health", href: "/fitness/mobility" }
          ]
        }
      ]
    },
    Nutrition: {
      title: "Metabolic & Cellular Nutrition",
      subtitle: "Nutrient timing, gut microbiome balance, and macro composition.",
      columns: [
        {
          title: "Macronutrient Science",
          links: [
            { label: "Gut Health & Microbiome", href: "/nutrition/gut-health" },
            { label: "Muscle Fuel Nutrition", href: "/nutrition/muscle" },
            { label: "Fat Loss Nutrition", href: "/nutrition/fat-loss" },
            { label: "Calorie & Energy Balance", href: "/nutrition/calories" },
            { label: "Protein Synthesis", href: "/nutrition/protein" },
            { label: "Carbohydrates & Glycogen", href: "/nutrition/carbs" },
            { label: "Essential Fatty Acids", href: "/nutrition/fats" }
          ]
        },
        {
          title: "Dietary Engineering",
          links: [
            { label: "Structured Meal Plans", href: "/nutrition/meal-plans" },
            { label: "Nutrient-Dense Recipes", href: "/nutrition/recipes" },
            { label: "Cellular Hydration", href: "/nutrition/hydration" },
            { label: "Micronutrients & Minerals", href: "/nutrition/micronutrients" }
          ]
        }
      ]
    },
    Supplements: {
      title: "Clinical Supplementation Library",
      subtitle: "Bioavailable nutrients, ergogenic aids, and sirtuin activators.",
      columns: [
        {
          title: "Performance & Strength",
          links: [
            { label: "Creatine Monohydrate", href: "/supplements/creatine" },
            { label: "Whey & Plant Protein", href: "/supplements/protein" },
            { label: "Magnesium Glycinate", href: "/supplements/magnesium" },
            { label: "Omega-3 EPA/DHA", href: "/supplements/omega-3" },
            { label: "Vitamin D3 + K2", href: "/supplements/vitamin-d" },
            { label: "Electrolytes Complex", href: "/supplements/electrolytes" },
            { label: "Pre-Workout Formulation", href: "/supplements/pre-workout" },
            { label: "Post-Workout Recovery", href: "/supplements/post-workout" }
          ]
        },
        {
          title: "Longevity & Healthspan",
          links: [
            { label: "Hydrolyzed Collagen", href: "/supplements/collagen" },
            { label: "Ashwagandha KSM-66", href: "/supplements/ashwagandha" },
            { label: "NMN & NAD+ Boosters", href: "/supplements/nmn" },
            { label: "CoQ10 & Mito Energy", href: "/supplements/coq10" },
            { label: "Berberine & Glucose", href: "/supplements/berberine" },
            { label: "Rhodiola Rosea", href: "/supplements/rhodiola" },
            { label: "Curcumin & Turmeric", href: "/supplements/turmeric" },
            { label: "Zinc Picolinate", href: "/supplements/zinc" },
            { label: "Liposomal Vitamin C", href: "/supplements/vitamin-c" },
            { label: "Dietary Fiber Complex", href: "/supplements/fiber" },
            { label: "Probiotics & Prebiotics", href: "/supplements/probiotics" }
          ]
        }
      ]
    },
    Longevity: {
      title: "Longevity & Biohacking",
      subtitle: "Biomarker optimization, cellular senolytics, and circadian health.",
      columns: [
        {
          title: "Biomarkers & Physiology",
          links: [
            { label: "NAD+ & Cellular Energy", href: "/longevity/nad" },
            { label: "Biohacking Blueprint", href: "/longevity/biohacking" },
            { label: "Autophagy & Fasting", href: "/longevity/fasting" },
            { label: "Blood Sugar & CGM", href: "/longevity/blood-sugar" },
            { label: "VO2 Max & Aerobic Base", href: "/longevity/vo2-max" },
            { label: "Cardiovascular Health", href: "/longevity/heart-health" }
          ]
        },
        {
          title: "Restorative Protocols",
          links: [
            { label: "Hormone Optimization", href: "/longevity/hormones" },
            { label: "Sleep Architecture", href: "/longevity/sleep" },
            { label: "Stress & Cortisol", href: "/longevity/stress" },
            { label: "Healthy Aging Framework", href: "/longevity/healthy-aging" },
            { label: "Systemic Recovery", href: "/longevity/recovery" }
          ]
        }
      ]
    },
    Science: {
      title: "Evidence-Based Medical Science",
      subtitle: "Peer-reviewed literature, physiological mechanisms, and lab studies.",
      columns: [
        {
          title: "Core Disciplines",
          links: [
            { label: "Hormonal Systems", href: "/science/hormones" },
            { label: "Cellular Biochemistry", href: "/science/biochemistry" },
            { label: "Muscle Protein Synthesis", href: "/science/muscle-protein-synthesis" },
            { label: "Skin Barrier Physiology", href: "/science/skin-physiology" },
            { label: "Clinical Trial Database", href: "/science/clinical-studies" },
            { label: "Ingredient Library", href: "/science/ingredients" }
          ]
        },
        {
          title: "Research Tools",
          links: [
            { label: "EWG Safety Ratings", href: "/science/ewg" },
            { label: "INCI Chemical Decoder", href: "/science/inci" },
            { label: "Published Research", href: "/science/research" },
            { label: "PubMed Index", href: "/science/pubmed" },
            { label: "Dermal Science Hub", href: "/science/skin" },
            { label: "Skeletal Muscle Research", href: "/science/muscle" },
            { label: "Metabolic Nutrition Studies", href: "/science/nutrition" },
            { label: "Longevity Science Hub", href: "/science/longevity" }
          ]
        }
      ]
    },
    Guides: {
      title: "Step-by-Step Optimization Masterclasses",
      subtitle: "Actionable 90-day protocols for transformative health outcomes.",
      columns: [
        {
          title: "Transformation Protocols",
          links: [
            { label: "90-Day Acne Protocol", href: "/guides/90-day-acne-program" },
            { label: "90-Day Fat Loss Masterclass", href: "/guides/90-day-fat-loss" },
            { label: "Muscle Building Blueprint", href: "/guides/build-muscle" },
            { label: "Morning Health Routine", href: "/guides/morning-routine" },
            { label: "Evening Sleep Routine", href: "/guides/evening-routine" },
            { label: "Night Recovery Protocol", href: "/guides/night-routine" }
          ]
        },
        {
          title: "Foundational Guides",
          links: [
            { label: "Healthy Skin Guide", href: "/guides/healthy-skin" },
            { label: "Supplement Stacking Guide", href: "/guides/supplements" },
            { label: "Women's Health Blueprint", href: "/guides/women" },
            { label: "Men's Health Blueprint", href: "/guides/men" },
            { label: "Teen Skin & Growth", href: "/guides/teens" },
            { label: "How to Build Muscle", href: "/guides/how-to-build-muscle" },
            { label: "How to Lose Fat", href: "/guides/how-to-lose-fat" },
            { label: "Beginner Skincare", href: "/guides/beginner-skincare" },
            { label: "Sleep Optimization", href: "/guides/sleep-optimization" }
          ]
        }
      ]
    },
    Community: {
      title: "HealthOS Member Community",
      subtitle: "Verified protocol sharing, expert Q&A, and user metrics.",
      columns: [
        {
          title: "Community Access",
          links: [
            { label: "Community Hub", href: "/community" },
            { label: "Protocol Discussions", href: "/community#discussions" },
            { label: "Verified Member Reviews", href: "/community#reviews" },
            { label: "Talk with an Expert", href: "/contact" }
          ]
        }
      ]
    }
  };

  const allSearchItems = [
    { title: "Creatine Monohydrate Protocol", category: "Supplements", href: "/supplements/creatine" },
    { title: "Whey Protein & Leucine Synthesis", category: "Supplements", href: "/supplements/protein" },
    { title: "Magnesium Glycinate for Sleep & Cortisol", category: "Supplements", href: "/supplements/magnesium" },
    { title: "Omega-3 EPA/DHA Anti-Inflammatory", category: "Supplements", href: "/supplements/omega-3" },
    { title: "Vitamin D3 + K2 Calcium Transport", category: "Supplements", href: "/supplements/vitamin-d" },
    { title: "Hydrolyzed Marine Collagen", category: "Supplements", href: "/supplements/collagen" },
    { title: "Ashwagandha KSM-66 Cortisol Control", category: "Supplements", href: "/supplements/ashwagandha" },
    { title: "Electrolyte Balance & Muscle Function", category: "Supplements", href: "/supplements/electrolytes" },
    { title: "NMN & NAD+ Mitochondrial Catalyst", category: "Longevity", href: "/longevity/nad" },
    { title: "90-Day Acne Clearing Masterclass", category: "Guides", href: "/guides/90-day-acne-program" },
    { title: "90-Day Body Fat Reduction Protocol", category: "Guides", href: "/guides/90-day-fat-loss" },
    { title: "Hypertrophy & Skeletal Muscle Building", category: "Fitness", href: "/fitness/build-muscle" },
    { title: "Skin Barrier Physiology & Ceramides", category: "Science", href: "/science/skin-physiology" },
    { title: "Retinol & Cell Turnover Science", category: "Skin", href: "/skin/retinol" },
    { title: "Hormones & Metabolic Flexibility", category: "Science", href: "/science/hormones" },
    { title: "Gut Microbiome & Systemic Immunity", category: "Nutrition", href: "/nutrition/gut-health" }
  ];

  const filteredSearchResults = searchQuery.trim() === "" 
    ? allSearchItems.slice(0, 6)
    : allSearchItems.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-emerald-500/30 selection:text-white flex flex-col">
      
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#0D0E12] text-white text-[11px] font-mono py-2.5 px-6 text-center border-b border-white/[0.08] flex items-center justify-center gap-2">
        <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-zinc-950 font-bold text-[9px] uppercase tracking-wider">HealthOS∞</span>
        <span>The Apple-Grade Platform for Human Longevity, Fitness, Nutrition & Skincare</span>
        <Link href="/contact" className="underline text-emerald-400 hover:text-white cursor-pointer ml-2">
          Talk with an Expert →
        </Link>
      </div>

      {/* HEADER */}
      <header 
        className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-2xl border-b border-white/[0.08] transition-all"
        onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shadow-[0_4px_20px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight font-mono text-white">
              HealthOS<span className="text-emerald-400">∞</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-[10px] xl:text-[11px] font-bold tracking-widest uppercase font-mono">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative"
                onMouseEnter={() => setActiveMegaMenu(megaMenuData[link.label] ? link.label : null)}
              >
                <Link
                  href={link.href}
                  className={`py-6 transition-colors flex items-center gap-1 ${pathname.startsWith(link.href) ? "text-emerald-400" : "text-zinc-400 hover:text-white"}`}
                >
                  {link.label}
                  {megaMenuData[link.label] && <ChevronDown className="w-3 h-3 opacity-50" />}
                </Link>
                
                {pathname.startsWith(link.href) && (
                  <motion.div layoutId="navIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400" />
                )}
              </div>
            ))}
          </nav>

          {/* HEADER RIGHT UTILITIES */}
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-xl bg-zinc-900/80 border border-white/[0.08] hover:border-emerald-500/40 text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search...</span>
            </button>

            <Link href="/contact" className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-zinc-950 text-xs font-bold font-mono hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20">
              <Zap className="w-3.5 h-3.5" />
              Consultation
            </Link>

            <Link href={userSession ? "/dashboard" : "/dashboard"} className="p-2 rounded-xl bg-zinc-900 border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white transition-colors">
              <User className="w-4 h-4" />
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-900 border border-white/[0.08] text-zinc-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MEGA MENU DROPDOWN */}
        <AnimatePresence>
          {activeMegaMenu && megaMenuData[activeMegaMenu] && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-[#0E0F14]/95 backdrop-blur-3xl border-b border-white/[0.1] shadow-2xl overflow-hidden z-50"
            >
              <div className="max-w-[1920px] mx-auto px-8 py-10">
                <div className="flex items-start justify-between border-b border-white/[0.08] pb-6 mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">{megaMenuData[activeMegaMenu].title}</h3>
                    <p className="text-sm text-zinc-400 mt-1 font-sans">{megaMenuData[activeMegaMenu].subtitle}</p>
                  </div>
                  <Link 
                    href={navLinks.find(n => n.label === activeMegaMenu)?.href || "/"}
                    className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    View All {activeMegaMenu} Hub →
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {megaMenuData[activeMegaMenu].columns.map((col, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">{col.title}</h4>
                      <ul className="space-y-2.5 text-sm">
                        {col.links.map((link) => (
                          <li key={link.href}>
                            <Link 
                              href={link.href}
                              onClick={() => setActiveMegaMenu(null)}
                              className="text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
                            >
                              <span>{link.label}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* FEATURED PROTOCOL SPOTLIGHT CARD */}
                  <div className="hidden lg:block bg-gradient-to-br from-emerald-950/40 to-zinc-900 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Featured Protocol</span>
                    <h5 className="text-base font-bold text-white mt-3">HealthOS 90-Day Optimization</h5>
                    <p className="text-xs text-zinc-400 mt-2 line-clamp-3">Evidence-based system for cellular rejuvenation, muscle hypertrophy, and skin clarity.</p>
                    <Link 
                      href="/guides/90-day-acne-program" 
                      onClick={() => setActiveMegaMenu(null)}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold hover:underline"
                    >
                      Start Protocol →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0D0E12] border-b border-white/[0.08] px-6 py-8 space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-3 rounded-xl bg-zinc-900/60 border border-white/[0.06] text-sm font-medium text-zinc-200 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
              <Link 
                href="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-emerald-500 text-zinc-950 font-bold font-mono text-sm"
              >
                Book a Health Consultation
              </Link>
              <Link 
                href="/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-zinc-900 border border-white/[0.08] text-white font-bold font-mono text-sm"
              >
                Go to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -10 }}
              className="bg-[#0E0F14] border border-white/[0.12] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-white/[0.08] flex items-center gap-3">
                <Search className="w-5 h-5 text-emerald-400" />
                <input 
                  type="text"
                  placeholder="Search articles, guides, supplements, science..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent w-full text-white placeholder-zinc-500 focus:outline-none text-base font-sans"
                  autoFocus
                />
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 max-h-[400px] overflow-y-auto space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  {searchQuery ? "Search Results" : "Popular Health OS Topics"}
                </p>

                {filteredSearchResults.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    onClick={() => setSearchOpen(false)}
                    className="p-3.5 rounded-xl bg-zinc-900/50 hover:bg-emerald-950/30 border border-white/[0.04] hover:border-emerald-500/30 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors">{item.title}</h4>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {children}
      </main>

      {/* FLOATING ACTION BUTTON */}
      {!isDashboardRoute && <FloatingActionButton />}

      {/* GLOBAL FOOTER */}
      <footer className="bg-[#050506] border-t border-white/[0.08] pt-16 pb-12 mt-20">
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 space-y-12">
          
          <NewsletterBlock />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-8 pt-8 border-t border-white/[0.06]">
            
            <div className="col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-lg font-bold font-mono text-white">
                  HealthOS<span className="text-emerald-400">∞</span>
                </span>
              </Link>
              <p className="text-xs text-zinc-400 max-w-sm font-sans leading-relaxed">
                The flagship Apple-quality ecosystem for biological youth, skincare science, fitness, nutrition, supplements, longevity, and clinical protocols for men and women.
              </p>
              <div className="flex items-center gap-3 pt-2 text-xs text-zinc-500 font-mono">
                <span>Domain: health.cristianvaduva.com</span>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Verticals</h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/skin" className="hover:text-white transition-colors">Skin Health</Link></li>
                <li><Link href="/hair" className="hover:text-white transition-colors">Hair & Scalp</Link></li>
                <li><Link href="/body" className="hover:text-white transition-colors">Body Care</Link></li>
                <li><Link href="/fitness" className="hover:text-white transition-colors">Fitness</Link></li>
                <li><Link href="/nutrition" className="hover:text-white transition-colors">Nutrition</Link></li>
                <li><Link href="/supplements" className="hover:text-white transition-colors">Supplements</Link></li>
                <li><Link href="/longevity" className="hover:text-white transition-colors">Longevity</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Science & Guides</h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/science" className="hover:text-white transition-colors">Science Hub</Link></li>
                <li><Link href="/guides" className="hover:text-white transition-colors">All Guides</Link></li>
                <li><Link href="/guides/90-day-acne-program" className="hover:text-white transition-colors">90-Day Acne</Link></li>
                <li><Link href="/guides/90-day-fat-loss" className="hover:text-white transition-colors">90-Day Fat Loss</Link></li>
                <li><Link href="/guides/build-muscle" className="hover:text-white transition-colors">Build Muscle</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Demographics</h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/guides/women" className="hover:text-white transition-colors">Women&apos;s Health</Link></li>
                <li><Link href="/guides/men" className="hover:text-white transition-colors">Men&apos;s Health</Link></li>
                <li><Link href="/community" className="hover:text-white transition-colors">Community Hub</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Member Dashboard</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">Company & Legal</h5>
              <ul className="space-y-2 text-xs text-zinc-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About HealthOS</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact & Support</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
            <p>© {new Date().getFullYear()} HealthOS. All rights reserved. Medical & Evidence-Based Digital Health Platform.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-zinc-300">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-300">Terms</Link>
              <a href="https://t.me/cristianvaduva" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Telegram Support</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};
