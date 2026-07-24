"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBeautyOS, PRODUCTS_CATALOG, Product } from "../context/BeautyOSContext";
import { Plus, Search, Trash2, ShieldAlert, Sun, Moon, Sparkles, ChevronRight, X, Check, FlaskConical } from "lucide-react";

export const ProductsTab: React.FC = () => {
  const {
    userCabinet,
    addCabinetProduct,
    addCustomProductToCabinet,
    deleteCabinetProduct,
  } = useBeautyOS();

  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPreset, setShowAddPreset] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [openedDate, setOpenedDate] = useState(new Date().toISOString().split("T")[0]);
  const [routinePlacements, setRoutinePlacements] = useState<("morning" | "evening")[]>([]);
  const [expandedCabinetProduct, setExpandedCabinetProduct] = useState<string | null>(null);

  // Custom Product UI
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customBrand, setCustomBrand] = useState("");
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState<Product["category"]>("Cleanser");
  const [customIngredients, setCustomIngredients] = useState("");
  const [customPao, setCustomPao] = useState(12);

  const filteredPresetCatalog = PRODUCTS_CATALOG.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPresetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId) return;
    addCabinetProduct(selectedProductId, openedDate, routinePlacements);
    setShowAddPreset(false);
    setSelectedProductId("");
    setRoutinePlacements([]);
  };

  const handleAddCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customBrand || !customName) return;
    const splitIngs = customIngredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0);

    addCustomProductToCabinet(
      customBrand,
      customName,
      customCategory,
      splitIngs,
      customPao,
      openedDate,
      routinePlacements
    );

    setShowAddCustom(false);
    setCustomBrand("");
    setCustomName("");
    setCustomIngredients("");
    setRoutinePlacements([]);
  };

  return (
    <div className="flex flex-col gap-6 pb-28 animate-fadeIn max-w-2xl mx-auto relative font-sans text-xs">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono text-[#E5C158] uppercase tracking-widest">Cosmetic Inventory</span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Your Digital Cabinet</h1>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowAddPreset(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-[#E5C158] hover:bg-[#F7E7B4] text-zinc-950 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-[#E5C158]/15"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>

          <button
            onClick={() => setShowAddCustom(true)}
            className="px-4 py-2.5 rounded-full bg-[#101114] hover:bg-[#17181B] border border-white/[0.08] text-white font-medium text-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <FlaskConical className="w-4 h-4 text-[#E5C158]" />
            <span>Custom Formula</span>
          </button>
        </div>
      </div>

      {/* Empty State */}
      {userCabinet.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-[32px] bg-[#101114] border border-white/[0.08] text-center space-y-4 shadow-xl"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#E5C158]/10 text-[#E5C158] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Your Cabinet is Empty</h3>
          <p className="text-xs text-[#A1A1AA] max-w-sm mx-auto">
            Add your current skincare products to calculate fit scores, PAO expiration dates, and active ingredient collision alerts.
          </p>
          <button
            onClick={() => setShowAddPreset(true)}
            className="px-6 py-3 rounded-full bg-[#E5C158] text-zinc-950 font-bold text-xs hover:bg-[#F7E7B4] cursor-pointer"
          >
            Explore Catalog
          </button>
        </motion.div>
      )}

      {/* Cabinet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {userCabinet.map((up) => {
          const catalogItem = PRODUCTS_CATALOG.find((p) => p.id === up.productId);
          if (!catalogItem) return null;
          const isExpanded = expandedCabinetProduct === up.id;

          return (
            <motion.div
              key={up.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-[28px] bg-[#101114] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 relative shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#E5C158] uppercase tracking-wider">{catalogItem.brand}</span>
                  <h3 className="text-base font-bold text-white mt-0.5">{catalogItem.name}</h3>
                </div>

                <button
                  onClick={() => deleteCabinetProduct(up.id)}
                  className="p-2 rounded-xl bg-zinc-950 border border-white/[0.06] text-zinc-500 hover:text-rose-400 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Fit Score & Category Badges */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#E5C158]/10 text-[#E5C158] text-[10px] font-mono border border-[#E5C158]/20 font-bold">
                    Fit Score: {up.fitScore}%
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-300 text-[10px] font-mono border border-white/[0.06]">
                    {catalogItem.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {up.routinePlacement.includes("morning") && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                  {up.routinePlacement.includes("evening") && <Moon className="w-3.5 h-3.5 text-indigo-400" />}
                </div>
              </div>

              {/* Alerts */}
              {up.compatibilityAlerts.length > 0 && (
                <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-[10px] text-rose-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                    <span>Formula Clash Warning</span>
                  </div>
                  <p className="leading-relaxed">{up.compatibilityAlerts[0]}</p>
                </div>
              )}

              {/* Expandable Details Button */}
              <button
                onClick={() => setExpandedCabinetProduct(isExpanded ? null : up.id)}
                className="w-full pt-3 text-left text-[11px] font-medium text-[#E5C158] flex items-center justify-between cursor-pointer border-t border-white/[0.04]"
              >
                <span>{isExpanded ? "Hide Formula Drawer" : "Inspect Formula & PAO"}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
              </button>

              {/* Expandable Drawer */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 pt-2 text-xs border-t border-white/[0.06]"
                  >
                    <div>
                      <h4 className="text-[10px] font-mono uppercase text-zinc-400 mb-1">Active Formula Actives</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {catalogItem.ingredients.map((ing) => (
                          <span key={ing} className="px-2.5 py-1 rounded-full bg-zinc-950 text-zinc-200 text-[10px] border border-white/[0.06]">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#A1A1AA] pt-1">
                      <span>Opened: <strong className="text-white">{up.openedAt}</strong></span>
                      <span>Expires: <strong className="text-white">{up.expiresAt}</strong></span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>

      {/* Preset Add Modal */}
      {showAddPreset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <form onSubmit={handleAddPresetSubmit} className="bg-[#101114] border border-white/[0.08] rounded-[28px] max-w-lg w-full p-6 space-y-5 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#E5C158]" />
                <h3 className="text-base font-bold text-white">Add Catalog Product</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddPreset(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search catalog by brand or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl pl-10 pr-4 py-3 text-white focus:outline-none"
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {filteredPresetCatalog.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between ${
                      selectedProductId === p.id
                        ? "bg-[#E5C158]/10 border-[#E5C158] text-white"
                        : "bg-[#17181B] border-white/[0.06] text-zinc-300 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{p.brand}</h4>
                      <p className="text-[11px] text-[#A1A1AA]">{p.name}</p>
                    </div>
                    {selectedProductId === p.id && <Check className="w-4 h-4 text-[#E5C158]" />}
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <label className="block text-zinc-400 font-medium">Opened Date</label>
                <input
                  type="date"
                  value={openedDate}
                  onChange={(e) => setOpenedDate(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-4 py-2.5 text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-400 font-medium">Routine Placement</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input
                      type="checkbox"
                      checked={routinePlacements.includes("morning")}
                      onChange={(e) => {
                        if (e.target.checked) setRoutinePlacements([...routinePlacements, "morning"]);
                        else setRoutinePlacements(routinePlacements.filter((r) => r !== "morning"));
                      }}
                      className="accent-[#E5C158]"
                    />
                    <span>Morning Layer</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-zinc-300">
                    <input
                      type="checkbox"
                      checked={routinePlacements.includes("evening")}
                      onChange={(e) => {
                        if (e.target.checked) setRoutinePlacements([...routinePlacements, "evening"]);
                        else setRoutinePlacements(routinePlacements.filter((r) => r !== "evening"));
                      }}
                      className="accent-[#E5C158]"
                    />
                    <span>Evening Layer</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={!selectedProductId}
              className="w-full py-3.5 rounded-full bg-[#E5C158] hover:bg-[#F7E7B4] text-zinc-950 font-bold text-xs cursor-pointer shadow-lg shadow-[#E5C158]/15 disabled:opacity-50"
            >
              Add to Cabinet
            </button>
          </form>
        </div>
      )}

      {/* Custom Formula Modal */}
      {showAddCustom && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 animate-fadeIn">
          <form onSubmit={handleAddCustomSubmit} className="bg-[#101114] border border-white/[0.08] rounded-[28px] max-w-lg w-full p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-[#E5C158]" />
                <h3 className="text-base font-bold text-white">Add Custom Formula</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <input
                type="text"
                required
                placeholder="Brand Name"
                value={customBrand}
                onChange={(e) => setCustomBrand(e.target.value)}
                className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-4 py-2.5 text-white"
              />

              <input
                type="text"
                required
                placeholder="Product Name"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-4 py-2.5 text-white"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Category</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as Product["category"])}
                    className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-3 py-2.5 text-white"
                  >
                    <option value="Cleanser">Cleanser</option>
                    <option value="Toner">Toner</option>
                    <option value="Serum">Serum</option>
                    <option value="Moisturizer">Moisturizer</option>
                    <option value="Sunscreen">Sunscreen</option>
                    <option value="Treatment">Treatment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">PAO Shelf Life (Months)</label>
                  <input
                    type="number"
                    min="1"
                    max="36"
                    value={customPao}
                    onChange={(e) => setCustomPao(Number(e.target.value))}
                    className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-3 py-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <input
                type="text"
                placeholder="Ingredients (comma separated)..."
                value={customIngredients}
                onChange={(e) => setCustomIngredients(e.target.value)}
                className="w-full bg-zinc-950 border border-white/[0.08] rounded-2xl px-4 py-2.5 text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#E5C158] hover:bg-[#F7E7B4] text-zinc-950 font-bold text-xs cursor-pointer shadow-lg shadow-[#E5C158]/15"
            >
              Save Custom Formula
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
