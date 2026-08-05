"use client";

import React, { useState } from "react";
import { Sparkles, Star, ShieldCheck, Beaker, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Skincare", "Haircare", "Supplements", "Devices"];

  const products = [
    {
      id: "p1",
      image: "/images/healthos_showcase_phone_1784918045920.png",
      brand: "Augustinus Bader",
      name: "The Rich Cream with TFC8®",
      category: "Skincare",
      whoItsFor: "Dry, mature, or barrier-compromised skin.",
      benefits: ["Deep cellular repair", "Firms and plumps", "Reverses signs of aging"],
      ingredients: ["TFC8® Complex", "Evening Primrose Oil", "Argan Oil"],
      routinePlacement: "PM Step 4 (Moisturizer)",
      price: "$290",
      rating: 4.9,
      clinicalScore: 98,
      safetyScore: 99
    },
    {
      id: "p2",
      image: "/images/healthos_hero_products_1784918027747.png",
      brand: "SkinCeuticals",
      name: "C E Ferulic Antioxidant Serum",
      category: "Skincare",
      whoItsFor: "All skin types targeting hyperpigmentation and photoaging.",
      benefits: ["Neutralizes free radicals", "Brightens complexion", "Boosts collagen synthesis"],
      ingredients: ["15% L-Ascorbic Acid", "1% Alpha Tocopherol", "0.5% Ferulic Acid"],
      routinePlacement: "AM Step 2 (Serum)",
      price: "$182",
      rating: 4.9,
      clinicalScore: 99,
      safetyScore: 95
    },
    {
      id: "p3",
      image: "/images/healthos_hero_products_1784918027747.png",
      brand: "Dyson Beauty",
      name: "Airwrap Multi-Styler Complete",
      category: "Devices",
      whoItsFor: "Individuals seeking heat-damage-free styling.",
      benefits: ["Styles without extreme heat", "Reduces frizz", "Increases volume and bounce"],
      ingredients: ["Coanda Airflow Technology", "Intelligent Heat Control"],
      routinePlacement: "Post-Wash Styling",
      price: "$599",
      rating: 4.8,
      clinicalScore: 95,
      safetyScore: 100
    },
    {
      id: "p4",
      image: "/images/healthos_showcase_phone_1784918045920.png",
      brand: "HealthOS Nutrition",
      name: "Hydrolyzed Marine Collagen Peptides",
      category: "Supplements",
      whoItsFor: "Those targeting skin elasticity, joint health, and hair density.",
      benefits: ["Restores dermal thickness", "Improves nail strength", "Supports joint mobility"],
      ingredients: ["10g Type I & III Marine Collagen", "Vitamin C", "Hyaluronic Acid"],
      routinePlacement: "Morning (Fasted or with Coffee)",
      price: "$65",
      rating: 4.9,
      clinicalScore: 96,
      safetyScore: 99
    },
    {
      id: "p5",
      image: "/images/healthos_hero_products_1784918027747.png",
      brand: "K18",
      name: "Leave-In Molecular Repair Hair Mask",
      category: "Haircare",
      whoItsFor: "Chemically treated or severely damaged hair.",
      benefits: ["Reverses bleach damage", "Restores elasticity", "Strengthens polypeptide chains"],
      ingredients: ["K18Peptide™", "Hydrolyzed Wheat Protein"],
      routinePlacement: "Post-Wash (Skip Conditioner)",
      price: "$75",
      rating: 4.8,
      clinicalScore: 98,
      safetyScore: 97
    },
    {
      id: "p6",
      image: "/images/healthos_showcase_phone_1784918045920.png",
      brand: "Oura",
      name: "Oura Ring Gen3 Horizon",
      category: "Devices",
      whoItsFor: "Biohackers and longevity enthusiasts.",
      benefits: ["Tracks sleep architecture", "Measures HRV", "Monitors core body temperature"],
      ingredients: ["Infrared Photoplethysmography (PPG)", "NTC Temperature Sensors"],
      routinePlacement: "Wear 24/7",
      price: "$349",
      rating: 4.7,
      clinicalScore: 94,
      safetyScore: 100
    }
  ];

  const filteredProducts = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-24 pb-32 px-6 max-w-[1440px] mx-auto animate-fadeIn text-white">
      
      <div className="max-w-3xl space-y-6 mb-16">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
          <Sparkles className="w-4 h-4" /> Global Catalog
        </span>
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05]">
          Curated Excellence.
        </h1>
        <p className="text-lg text-zinc-400 font-normal leading-relaxed max-w-2xl">
          Discover the world&apos;s most scientifically validated skincare, longevity tools, and nutritional supplements. Evaluated by our clinical board.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-colors border ${
              activeCategory === cat 
                ? "bg-[#D4AF37] text-black border-[#D4AF37]" 
                : "bg-[#101114] text-zinc-400 border-white/[0.05] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProducts.map((p) => (
          <div key={p.id} className="p-8 rounded-[32px] bg-gradient-to-br from-[#101114] to-[#17181B] border border-white/[0.05] hover:border-white/[0.15] transition-all group flex flex-col xl:flex-row gap-8">
            
            {/* Left: Image & Metrics */}
            <div className="w-full xl:w-2/5 space-y-6 shrink-0">
              <div className="rounded-2xl bg-[#0A0A0A] p-4 h-64 border border-white/[0.05] flex items-center justify-center overflow-hidden relative">
                <div className="absolute top-4 right-4 bg-[#D4AF37] text-black px-2 py-0.5 rounded-full text-[10px] font-bold font-mono">
                  {p.category}
                </div>
                <Image src={p.image} alt={p.name} width={400} height={400} className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    <Beaker className="w-3 h-3 text-emerald-400" /> Clinical
                  </div>
                  <span className="text-xl font-bold text-white">{p.clinicalScore}<span className="text-zinc-500 text-sm">/100</span></span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
                    <ShieldCheck className="w-3 h-3 text-blue-400" /> Safety
                  </div>
                  <span className="text-xl font-bold text-white">{p.safetyScore}<span className="text-zinc-500 text-sm">/100</span></span>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="w-full xl:w-3/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-[#D4AF37] uppercase tracking-widest">{p.brand}</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-2 leading-tight">{p.name}</h3>
                
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-6 pb-6 border-b border-white/[0.05]">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{p.rating}</span>
                  <span>(1.2k+ Reviews)</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-zinc-500 mb-1.5">Who It&apos;s For</h4>
                    <p className="text-sm text-zinc-300 leading-relaxed">{p.whoItsFor}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-zinc-500 mb-1.5">Core Benefits</h4>
                    <ul className="space-y-1.5">
                      {p.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono uppercase text-zinc-500 mb-1.5">Key Actives</h4>
                    <div className="flex flex-wrap gap-2">
                      {p.ingredients.map(ing => (
                        <span key={ing} className="px-2.5 py-1 rounded-md bg-[#0A0A0A] border border-white/[0.05] text-xs text-zinc-300">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.05] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Routine</span>
                  <span className="text-sm font-bold text-white">{p.routinePlacement}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-mono font-bold text-white">{p.price}</span>
                  <button className="bg-white text-black px-6 py-2.5 rounded-full font-bold text-xs hover:bg-[#D4AF37] transition-colors">
                    Add to Routine
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
