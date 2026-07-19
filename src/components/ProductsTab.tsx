"use client";

import React, { useState, useEffect } from "react";
import { useBeautyOS, PRODUCTS_CATALOG, INGREDIENTS_CATALOG, Product, UserProduct } from "../context/BeautyOSContext";
import { designSystem } from "../styles/designSystem";
import { Plus, Search, Trash2, Calendar, ShieldAlert, Sun, Moon, Image as ImageIcon, Undo } from "lucide-react";

export const ProductsTab: React.FC = () => {
  const {
    userCabinet,
    skinProfile,
    addCabinetProduct,
    addCustomProductToCabinet,
    deleteCabinetProduct,
  } = useBeautyOS();

  // Search & Catalog Add UI
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPreset, setShowAddPreset] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [openedDate, setOpenedDate] = useState(new Date().toISOString().split("T")[0]);
  const [routinePlacements, setRoutinePlacements] = useState<("morning" | "evening")[]>([]);

  // Custom Product UI
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customBrand, setCustomBrand] = useState("");
  const [customName, setCustomName] = useState("");
  const [customCategory, setCustomCategory] = useState<Product["category"]>("Cleanser");
  const [customIngredients, setCustomIngredients] = useState("");
  const [customPao, setCustomPao] = useState(12);
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);

  // Undo Delete State
  const [undoProduct, setUndoProduct] = useState<UserProduct | null>(null);
  const [undoTimer, setUndoTimer] = useState<number | null>(null);

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
    setCustomImageBase64(null);
    setRoutinePlacements([]);
  };

  const handleDeleteProductWithUndo = (product: UserProduct) => {
    // Save to undo state
    setUndoProduct(product);
    
    // Defer the actual database delete by deleting from context state locally first
    deleteCabinetProduct(product.id);

    // Cancel old timer if exists
    if (undoTimer) {
      clearTimeout(undoTimer);
    }

    // Set 5 seconds timer to lock deletion
    const timer = window.setTimeout(() => {
      setUndoProduct(null);
    }, 5000);
    setUndoTimer(timer as unknown as number);
  };

  const handleUndo = () => {
    if (!undoProduct) return;
    // Restore product in cabinet by calling addCabinetProduct
    addCabinetProduct(undoProduct.productId, undoProduct.openedAt, undoProduct.routinePlacement);
    
    // Clear undo states
    if (undoTimer) {
      clearTimeout(undoTimer);
    }
    setUndoProduct(null);
  };

  useEffect(() => {
    return () => {
      if (undoTimer) clearTimeout(undoTimer);
    };
  }, [undoTimer]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getCatalogProduct = (productId: string) => {
    return PRODUCTS_CATALOG.find((p) => p.id === productId);
  };

  const getExpirationClass = (expiresAtStr: string) => {
    const daysLeft = Math.ceil(
      (new Date(expiresAtStr).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    if (daysLeft < 30) return "text-rose-400 font-semibold";
    if (daysLeft < 90) return "text-amber-400";
    return "text-zinc-500";
  };

  return (
    <div className="flex flex-col gap-5 pb-24 animate-fadeIn max-w-md mx-auto relative font-sans text-xs">
      
      {/* Tab Header */}
      <div className="flex justify-between items-center px-1">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Cabinet Skincare</span>
          <h1 className="text-xl font-extrabold text-white font-sans">Produsele mele</h1>
        </div>
        
        <button
          onClick={() => setShowAddPreset(true)}
          className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3.5 text-xs font-sans">
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between h-20">
          <span className="text-zinc-500 text-[10px] uppercase font-mono">Total cabinet</span>
          <span className="text-xl font-bold text-white font-mono">{userCabinet.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between h-20">
          <span className="text-zinc-500 text-[10px] uppercase font-mono">Expira curand</span>
          <span className="text-xl font-bold text-rose-400 font-mono">
            {
              userCabinet.filter((up) => {
                const days = Math.ceil((new Date(up.expiresAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return days < 30;
              }).length
            }
          </span>
        </div>
      </div>

      {/* 2. Cabinet List */}
      {userCabinet.length === 0 ? (
        <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/10 text-center space-y-4">
          <p className="text-xs text-zinc-500 leading-relaxed font-light">
            Cabinetul tau digital este gol. Adauga o formula din catalog sau inregistreaza un produs nou.
          </p>
          <button
            onClick={() => setShowAddPreset(true)}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/5 hover:border-emerald-500/30 text-emerald-400 font-semibold text-xs cursor-pointer transition-all active:scale-95"
          >
            Adauga din catalog
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {userCabinet.map((up) => {
            const cat = getCatalogProduct(up.productId);
            if (!cat) return null;

            return (
              <div key={up.id} className={designSystem.card + " space-y-3.5"}>
                
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-850 text-zinc-400">
                      {cat.category}
                    </span>
                    <h3 className="text-sm font-bold text-white font-sans mt-1.5 truncate">
                      {cat.brand}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans truncate -mt-0.5">
                      {cat.name}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <div
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold font-mono ${
                          up.fitScore >= 85
                            ? "text-emerald-400 bg-emerald-500/5 border border-emerald-500/10"
                            : up.fitScore >= 70
                            ? "text-amber-400 bg-amber-500/5 border border-amber-500/10"
                            : "text-rose-400 bg-rose-500/5 border border-rose-500/10"
                        }`}
                      >
                        {up.fitScore}%
                      </div>
                      <span className="text-[8px] text-zinc-500 font-mono mt-0.5">Scor Fit</span>
                    </div>

                    <button
                      onClick={() => handleDeleteProductWithUndo(up)}
                      className="p-2 rounded-xl bg-zinc-950 border border-white/5 hover:border-rose-500/25 text-zinc-500 hover:text-rose-400 cursor-pointer transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expiration Tracking */}
                <div className="flex justify-between items-center text-[10px] font-mono border-t border-white/5 pt-2.5">
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600" /> Deschis la: {up.openedAt}
                  </span>
                  <span className={getExpirationClass(up.expiresAt)}>
                    Expiră: {up.expiresAt}
                  </span>
                </div>

                {/* Ingredients listing */}
                <div className="flex flex-wrap gap-1.5">
                  {cat.ingredients.map((ingName) => {
                    const ingInfo = INGREDIENTS_CATALOG.find((i) => i.name.toLowerCase() === ingName.toLowerCase());
                    const isBeneficial = skinProfile?.goals.some((g) => ingInfo?.benefits.includes(g));

                    return (
                      <span
                        key={ingName}
                        className={`text-[9px] px-2 py-0.5 rounded-md font-sans border ${
                          isBeneficial
                            ? "bg-emerald-500/5 border-emerald-500/15 text-emerald-400"
                            : "bg-zinc-900 border-white/5 text-zinc-400"
                        }`}
                      >
                        {ingName}
                      </span>
                    );
                  })}
                </div>

                {/* Placements */}
                <div className="flex gap-2">
                  {up.routinePlacement.includes("morning") && (
                    <span className="flex items-center gap-1 text-[9px] font-mono text-amber-400 bg-amber-500/5 border border-amber-500/10 px-2 py-0.5 rounded-lg">
                      <Sun className="w-2.5 h-2.5" /> AM Dimineata
                    </span>
                  )}
                  {up.routinePlacement.includes("evening") && (
                    <span className="flex items-center gap-1 text-[9px] font-mono text-indigo-400 bg-indigo-500/5 border border-indigo-500/10 px-2 py-0.5 rounded-lg">
                      <Moon className="w-2.5 h-2.5" /> PM Seara
                    </span>
                  )}
                </div>

                {/* Warnings / Clashes alerts */}
                {up.compatibilityAlerts.length > 0 && (
                  <div className="p-3 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-[9.5px] text-rose-300 font-sans space-y-1">
                    <div className="font-semibold flex items-center gap-1 text-rose-400">
                      <ShieldAlert className="w-3.5 h-3.5" /> Compatibilitate ingrediente active
                    </div>
                    {up.compatibilityAlerts.map((alert, idx) => (
                      <p key={idx} className="leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-1.5 text-zinc-400">
                        {alert}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Undo Deletion Notification Dialog (Apple-like Overlay toast) */}
      {undoProduct && (
        <div className="fixed bottom-20 left-6 right-6 z-50 bg-zinc-950 border border-emerald-500/25 rounded-2xl p-4 flex justify-between items-center shadow-2xl animate-slideUp font-sans text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-200">Produs eliminat din cabinet.</span>
          </div>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold cursor-pointer font-sans"
          >
            <Undo className="w-3.5 h-3.5" />
            <span>Anuleaza</span>
          </button>
        </div>
      )}

      {/* 4. Add Preset Product Modal */}
      {showAddPreset && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/5 rounded-[32px] p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto shadow-2xl relative space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">ADĂUGARE PRODUS</span>
              <button
                onClick={() => {
                  setShowAddPreset(false);
                  setSelectedProductId("");
                }}
                className="text-zinc-500 hover:text-white text-xs cursor-pointer font-bold"
              >
                Inchide
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Cauta brand sau nume..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
              />
              <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
            </div>

            <form onSubmit={handleAddPresetSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="block text-zinc-400">Selecteaza din catalog:</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  required
                >
                  <option value="">Alege un produs...</option>
                  {filteredPresetCatalog.map((p) => (
                    <option key={p.id} value={p.id}>
                      [{p.category}] {p.brand} - {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-400">Data deschiderii produsului:</label>
                <input
                  type="date"
                  value={openedDate}
                  onChange={(e) => setOpenedDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-400">Plasează in rutina:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={routinePlacements.includes("morning")}
                      onChange={(e) =>
                        setRoutinePlacements((prev) =>
                          e.target.checked ? [...prev, "morning"] : prev.filter((r) => r !== "morning")
                        )
                      }
                      className="accent-emerald-500"
                    />
                    <span>Rutina AM (Dimineata)</span>
                  </label>
                  <label className="flex items-center gap-2 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={routinePlacements.includes("evening")}
                      onChange={(e) =>
                        setRoutinePlacements((prev) =>
                          e.target.checked ? [...prev, "evening"] : prev.filter((r) => r !== "evening")
                        )
                      }
                      className="accent-emerald-500"
                    />
                    <span>Rutina PM (Seara)</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs cursor-pointer transition-all active:scale-95"
              >
                Salvează in cabinet
              </button>

              <div className="border-t border-white/5 pt-3 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddPreset(false);
                    setShowAddCustom(true);
                  }}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer underline text-[10px]"
                >
                  Produsul nu e in lista? Adauga o formula personalizata
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 5. Add Custom Product Modal */}
      {showAddCustom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fadeIn">
          <div className="bg-zinc-950 border border-white/5 rounded-[32px] p-6 w-full max-w-sm max-h-[85vh] overflow-y-auto shadow-2xl relative space-y-4 font-sans text-xs">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold uppercase">PRODUS PERSONALIZAT</span>
              <button
                onClick={() => setShowAddCustom(false)}
                className="text-zinc-500 hover:text-white text-xs cursor-pointer font-bold"
              >
                Inchide
              </button>
            </div>

            <form onSubmit={handleAddCustomSubmit} className="space-y-3.5">
              
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-zinc-400">Brand / Producator:</label>
                  <input
                    type="text"
                    value={customBrand}
                    onChange={(e) => setCustomBrand(e.target.value)}
                    placeholder="Ex: Cerave"
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-zinc-400">Nume Produs:</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Ex: Hydrating Cleanser"
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-zinc-400">Categorie:</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value as Product["category"])}
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Cleanser">Cleanser (Curățare)</option>
                    <option value="Toner">Toner</option>
                    <option value="Serum">Serum</option>
                    <option value="Moisturizer">Moisturizer (Cremă)</option>
                    <option value="Sunscreen">Sunscreen (SPF)</option>
                    <option value="Treatment">Treatment (Exfoliant/Acid)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-zinc-400">Expirare PAO (luni):</label>
                  <input
                    type="number"
                    value={customPao}
                    onChange={(e) => setCustomPao(Number(e.target.value))}
                    min="3"
                    max="36"
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-400">Ingrediente active (separate prin virgulă):</label>
                <input
                  type="text"
                  value={customIngredients}
                  onChange={(e) => setCustomIngredients(e.target.value)}
                  placeholder="Ex: Hyaluronic Acid, Ceramides, Retinol"
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              {/* Upload product image */}
              <div className="space-y-1.5">
                <label className="block text-zinc-400">Incarca Poza Produs (Mocks Storage):</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center justify-center p-3 rounded-xl bg-zinc-900 border border-white/5 hover:border-zinc-800 text-zinc-400 hover:text-white cursor-pointer transition-colors shrink-0">
                    <ImageIcon className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {customImageBase64 ? (
                    <span className="text-[10px] text-emerald-400 font-mono truncate max-w-[200px]">
                      Imagine incarcata cu succes!
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500">Nicio poza selectata</span>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-zinc-400">Data deschiderii:</label>
                <input
                  type="date"
                  value={openedDate}
                  onChange={(e) => setOpenedDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-zinc-400">Plaseaza in rutina:</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={routinePlacements.includes("morning")}
                      onChange={(e) =>
                        setRoutinePlacements((prev) =>
                          e.target.checked ? [...prev, "morning"] : prev.filter((r) => r !== "morning")
                        )
                      }
                      className="accent-emerald-500"
                    />
                    <span>Rutina AM</span>
                  </label>
                  <label className="flex items-center gap-2 text-zinc-300">
                    <input
                      type="checkbox"
                      checked={routinePlacements.includes("evening")}
                      onChange={(e) =>
                        setRoutinePlacements((prev) =>
                          e.target.checked ? [...prev, "evening"] : prev.filter((r) => r !== "evening")
                        )
                      }
                      className="accent-emerald-500"
                    />
                    <span>Rutina PM</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs cursor-pointer transition-all active:scale-95"
              >
                Adauga in cabinet
              </button>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
