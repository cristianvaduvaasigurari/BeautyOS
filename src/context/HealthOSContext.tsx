"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { trackBetaEvent } from "../lib/analytics";

// ==========================================
// 1. DATABASE SCHEMA TYPES (TypeScript Definitions)
// ==========================================

export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  avatarUrl: string;
}

export interface HealthProfile {
  id: string;
  profileId: string;
  skinType: "Normal" | "Dry" | "Oily" | "Combination";
  sensitivity: "Low" | "Medium" | "High";
  concerns: string[];
  goals: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  hazardScore: number;
  comedogenicRating: number;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  category: "Cleanser" | "Toner" | "Serum" | "Moisturizer" | "Sunscreen" | "Treatment" | "Supplements" | "Nutrition" | "Fitness" | "Health Devices" | "Haircare & Tools";
  ingredients: string[];
  description: string;
  paoMonths: number;
}

export interface UserProduct {
  id: string;
  userId: string;
  productId: string;
  openedAt: string; // YYYY-MM-DD
  expiresAt: string; // YYYY-MM-DD
  status: "Active" | "Inactive" | "Empty";
  rating: number;
  routinePlacement: ("morning" | "evening")[];
  fitScore: number;
  compatibilityAlerts: string[];
}

export interface RoutineStep {
  id: string;
  routineId: string;
  userProductId: string;
  orderIndex: number;
  isCompleted: boolean;
  notes?: string;
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  hydration: number; // 1-5
  redness: number; // 1-5
  irritation: number; // 1-5
  sleep: number; // Hours
  water: number; // ml
  notes: string;
  skinIndex: number; // Computed score (0-100)
}

export interface ProgressPhoto {
  id: string;
  userId: string;
  date: string;
  photoUrl: string;
  angle: "Front" | "Left Profile" | "Right Profile";
  lightingRating?: number;
  notes?: string;
}

export interface HealthRecommendation {
  id: string;
  title: string;
  content: string;
  category: "routine" | "ingredient" | "alert";
}

export interface HealthEvent {
  id: string;
  userId: string;
  eventType: "breakout" | "dryness" | "irritation" | "product_clash";
  date: string;
  description: string;
}

export interface SyncQueueItem {
  id: string;
  table: string;
  action: "INSERT" | "UPDATE" | "DELETE";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

// ==========================================
// 2. REFERENCE CATALOG SEED DATA
// ==========================================

export const INGREDIENTS_CATALOG: Ingredient[] = [
  { id: "1", name: "Hyaluronic Acid", description: "Humectant that draws up to 1000x its weight in water into the skin.", benefits: ["Hydration", "Plumping"], hazardScore: 1, comedogenicRating: 0 },
  { id: "2", name: "Niacinamide (Vitamin B3)", description: "Restores skin barrier, regulates sebum, and calms redness.", benefits: ["Barrier Repair", "Clear Skin", "Brightening"], hazardScore: 1, comedogenicRating: 0 },
  { id: "3", name: "Salicylic Acid (BHA)", description: "Oil-soluble exfoliant that deep cleanses pores and combats comedones.", benefits: ["Clear Skin", "Oil Control"], hazardScore: 2, comedogenicRating: 0 },
  { id: "4", name: "Retinol (Vitamin A)", description: "Accelerates cell turnover, stimulates collagen synthesis.", benefits: ["Anti-Aging", "Texture Refinement"], hazardScore: 5, comedogenicRating: 1 },
  { id: "5", name: "Retinal (Retinaldehyde)", description: "Direct precursor to retinoic acid, up to 10x faster acting than retinol.", benefits: ["Anti-Aging", "Acne Clearing"], hazardScore: 4, comedogenicRating: 1 },
  { id: "6", name: "Creatine Monohydrate", description: "Essential cellular energy substrate for ATP replenishment and muscle volume.", benefits: ["Muscle Building", "Cognitive Power"], hazardScore: 1, comedogenicRating: 0 },
  { id: "7", name: "Vitamin C (L-Ascorbic Acid)", description: "Potent antioxidant that boosts radiance and neutralizes free radicals.", benefits: ["Brightening", "Collagen Support"], hazardScore: 1, comedogenicRating: 0 },
  { id: "8", name: "Magnesium Glycinate", description: "Highly bioavailable chelated magnesium supporting neural calming and sleep depth.", benefits: ["Sleep Optimization", "Muscle Recovery"], hazardScore: 1, comedogenicRating: 0 },
  { id: "9", name: "Ceramides (3:1:1 Ratio)", description: "Physiological lipids that construct the stratum corneum barrier.", benefits: ["Barrier Repair", "Moisture Retention"], hazardScore: 1, comedogenicRating: 0 },
  { id: "10", name: "Omega-3 Triglyceride", description: "High-concentration EPA and DHA for inflammatory modulation and cellular health.", benefits: ["Cardiovascular Health", "Skin Hydration"], hazardScore: 1, comedogenicRating: 0 },
  { id: "11", name: "Signal Peptides", description: "Amino acid chains that signal skin to synthesize collagen and elastin.", benefits: ["Firming", "Elasticity"], hazardScore: 1, comedogenicRating: 0 },
  { id: "12", name: "NMN (Nicotinamide Mononucleotide)", description: "Direct precursor to NAD+ boosting mitochondrial output and cellular longevity.", benefits: ["Longevity", "Mitochondrial Energy"], hazardScore: 1, comedogenicRating: 0 },
  { id: "13", name: "Centella Asiatica (Cica)", description: "Botanical extract renowned for rapid calming and inflammation suppression.", benefits: ["Anti-Irritation", "Barrier Healing"], hazardScore: 1, comedogenicRating: 0 },
  { id: "14", name: "Ashwagandha KSM-66", description: "Full-spectrum root extract clinically proven to lower cortisol and anxiety.", benefits: ["Stress Reduction", "Hormonal Balance"], hazardScore: 1, comedogenicRating: 0 },
  { id: "15", name: "Azelaic Acid 10-15%", description: "Dicarboxylic acid that treats rosacea, acne, and post-inflammatory hyperpigmentation.", benefits: ["Redness Relief", "Pigmentation Fading"], hazardScore: 1, comedogenicRating: 0 },
  { id: "16", name: "Whey Protein Isolate", description: "Fast-absorbing complete protein rich in EAAs and BCAAs for muscle protein synthesis.", benefits: ["Muscle Building", "Recovery"], hazardScore: 1, comedogenicRating: 0 },
  { id: "17", name: "Lactic Acid (AHA)", description: "Gentle hydrating AHA suitable for dry and sensitive skin types.", benefits: ["Gentle Exfoliation", "Hydration"], hazardScore: 1, comedogenicRating: 0 },
  { id: "18", name: "Electrolyte Complex", description: "Balanced sodium, potassium, and magnesium ratios for cellular hydration and athletic output.", benefits: ["Hydration", "Physical Endurance"], hazardScore: 1, comedogenicRating: 0 }
];

export const PRODUCTS_CATALOG: Product[] = [
  { id: "p1", brand: "CeraVe", name: "Hydrating Cleanser", category: "Cleanser", ingredients: ["Ceramides (3:1:1 Ratio)", "Hyaluronic Acid"], description: "Non-foaming lotion cleanser formulated with 3 essential ceramides.", paoMonths: 12 },
  { id: "p2", brand: "La Roche-Posay", name: "Toleriane Hydrating Gentle Cleanser", category: "Cleanser", ingredients: ["Ceramides (3:1:1 Ratio)", "Panthenol (Pro-Vitamin B5)"], description: "Gentle daily cleanser with La Roche-Posay Thermal Spring Water.", paoMonths: 12 },
  { id: "p3", brand: "SkinCeuticals", name: "C E Ferulic Antioxidant Serum", category: "Serum", ingredients: ["Vitamin C (L-Ascorbic Acid)", "Hyaluronic Acid"], description: "Dermatologist gold standard 15% L-ascorbic acid antioxidant serum.", paoMonths: 6 },
  { id: "p4", brand: "HealthOS Labs", name: "Micronized Creatine Monohydrate", category: "Supplements", ingredients: ["Creatine Monohydrate"], description: "Ultra-pure pharmaceutical grade creatine for strength and neuro-protection.", paoMonths: 36 },
  { id: "p5", brand: "Paula's Choice", name: "2% BHA Liquid Exfoliant", category: "Treatment", ingredients: ["Salicylic Acid (BHA)", "Green Tea Catechins (EGCG)"], description: "Iconic leave-on fluid exfoliant unclogging pores and smoothing texture.", paoMonths: 12 },
  { id: "p6", brand: "HealthOS Formulations", name: "Liposomal Magnesium Glycinate", category: "Supplements", ingredients: ["Magnesium Glycinate"], description: "Advanced sleep & neuromuscular recovery formula with high bio-availability.", paoMonths: 24 },
  { id: "p7", brand: "Drunk Elephant", name: "Protini Polypeptide Cream", category: "Moisturizer", ingredients: ["Signal Peptides", "Copper Tripeptide-1"], description: "Protein moisturizer restoring bounce, firmness and hydration.", paoMonths: 12 },
  { id: "p8", brand: "HealthOS Performance", name: "Grass-Fed Whey Protein Isolate", category: "Nutrition", ingredients: ["Whey Protein Isolate"], description: "Cold-filtered whey isolate delivering 27g pure protein per scoop.", paoMonths: 24 },
  { id: "p9", brand: "HealthOS Longevity", name: "NAD+ Dual Action NMN Resveratrol", category: "Supplements", ingredients: ["NMN (Nicotinamide Mononucleotide)"], description: "Mitochondrial catalyst designed to optimize bio-energy levels.", paoMonths: 24 },
  { id: "p10", brand: "HealthOS Formulations", name: "KSM-66 Ashwagandha & Rhodiola", category: "Supplements", ingredients: ["Ashwagandha KSM-66"], description: "Cortisol management and stress resilience compound.", paoMonths: 24 }
];

// ==========================================
// 3. CONTEXT STATE & INTERFACE DEFINITION
// ==========================================

interface HealthOSContextType {
  activeTab: "today" | "products" | "progress" | "profile";
  setActiveTab: (tab: "today" | "products" | "progress" | "profile") => void;
  isOnboarded: boolean;
  skinProfile: HealthProfile | null;
  userCabinet: UserProduct[];
  morningSteps: RoutineStep[];
  eveningSteps: RoutineStep[];
  journalEntries: JournalEntry[];
  progressPhotos: ProgressPhoto[];
  recommendations: HealthRecommendation[];
  events: HealthEvent[];
  currentSkinIndex: number;
  
  // Auth and Sync state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userSession: any;
  signOutUser: () => void;
  syncStatus: "synced" | "syncing" | "offline";
  offlineQueueLength: number;
  
  // State Mutation Actions (Optimistic UI)
  submitOnboarding: (assessment: Omit<HealthProfile, "id" | "profileId">) => void;
  logSkinCheckin: (checkin: Omit<JournalEntry, "id" | "userId" | "date" | "skinIndex">) => void;
  addCabinetProduct: (productId: string, openedDate: string, placements: ("morning" | "evening")[]) => void;
  deleteCabinetProduct: (userProductId: string) => void;
  toggleRoutineStep: (stepId: string, isMorning: boolean) => void;
  addCustomProductToCabinet: (brand: string, name: string, category: Product["category"], ingredientNames: string[], pao: number, openedDate: string, placements: ("morning" | "evening")[]) => void;
  clearAllUserData: () => void;
}

let idCounter = 0;
export const generateId = (prefix: string): string => {
  idCounter += 1;
  return `${prefix}_${Date.now()}_${idCounter}_${Math.floor(Math.random() * 100000)}`;
};

const HealthOSContext = createContext<HealthOSContextType | undefined>(undefined);

export const HealthOSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabRaw] = useState<"today" | "products" | "progress" | "profile">("today");
  const setActiveTab = (tab: "today" | "products" | "progress" | "profile") => {
    setActiveTabRaw(tab);
    if (tab === "progress") {
      trackBetaEvent("weekly_review_opened");
    }
  };
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [skinProfile, setSkinProfile] = useState<HealthProfile | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userSession, setUserSession] = useState<any>(null);
  const [syncQueue, setSyncQueue] = useState<SyncQueueItem[]>([]);
  const [syncStatus, setSyncStatus] = useState<"synced" | "syncing" | "offline">("synced");

  const [userCabinet, setUserCabinet] = useState<UserProduct[]>([]);
  const [morningSteps, setMorningSteps] = useState<RoutineStep[]>([]);
  const [eveningSteps, setEveningSteps] = useState<RoutineStep[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>([]);
  const [events, setEvents] = useState<HealthEvent[]>([]);
  const [recommendations, setRecommendations] = useState<HealthRecommendation[]>([]);
  const [currentSkinIndex, setCurrentSkinIndex] = useState<number>(85);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserSession(session);
      if (!session) {
        const token = localStorage.getItem("sb-access-token");
        if (token) {
          setUserSession({ user: { id: "user_mock_123", email: "mock@healthos.local" } });
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleOnline = () => setSyncStatus((prev) => (prev === "offline" ? "syncing" : prev));
    const handleOffline = () => setSyncStatus("offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    if (!navigator.onLine) {
      const timer = setTimeout(() => setSyncStatus("offline"), 0);
      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (syncStatus === "offline" || syncQueue.length === 0) {
      if (syncStatus !== "offline") {
        const timer = setTimeout(() => setSyncStatus("synced"), 0);
        return () => clearTimeout(timer);
      }
      return;
    }

    const syncTimer = setTimeout(() => setSyncStatus("syncing"), 0);

    const processQueue = async () => {
      const activeItem = syncQueue[0];
      try {
        let error = null;
        if (activeItem.action === "INSERT") {
          const { error: err } = await supabase.from(activeItem.table).insert([activeItem.payload]);
          error = err;
        } else if (activeItem.action === "UPDATE") {
          const { error: err } = await supabase.from(activeItem.table).update(activeItem.payload).eq("id", activeItem.payload.id);
          error = err;
        } else if (activeItem.action === "DELETE") {
          const { error: err } = await supabase.from(activeItem.table).delete().eq("id", activeItem.payload.id);
          error = err;
        }

        if (error && !supabase.auth.getUser()) {
          console.warn("Sync queue query simulation completed locally.");
        }

        setSyncQueue((prev) => prev.slice(1));
      } catch (err) {
        console.error("Sync loop query error. Queue retrying.", err);
        setSyncStatus("offline");
      }
    };

    const timer = setTimeout(() => {
      processQueue();
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(syncTimer);
    };
  }, [syncQueue, syncStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const storedProfile = localStorage.getItem("health_profile");
      const storedCabinet = localStorage.getItem("user_cabinet");
      const storedMorning = localStorage.getItem("morning_steps");
      const storedEvening = localStorage.getItem("evening_steps");
      const storedJournal = localStorage.getItem("journal_entries");
      const storedPhotos = localStorage.getItem("progress_photos");
      const storedEvents = localStorage.getItem("health_events");
      const storedQueue = localStorage.getItem("offline_sync_queue");

      if (storedProfile) {
        setSkinProfile(JSON.parse(storedProfile));
        setIsOnboarded(true);
      }
      if (storedCabinet) setUserCabinet(JSON.parse(storedCabinet));
      if (storedMorning) setMorningSteps(JSON.parse(storedMorning));
      if (storedEvening) setEveningSteps(JSON.parse(storedEvening));
      if (storedJournal) setJournalEntries(JSON.parse(storedJournal));
      if (storedPhotos) setProgressPhotos(JSON.parse(storedPhotos));
      if (storedEvents) setEvents(JSON.parse(storedEvents));
      if (storedQueue) setSyncQueue(JSON.parse(storedQueue));
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOnboarded) return;
    localStorage.setItem("health_profile", JSON.stringify(skinProfile));
    localStorage.setItem("user_cabinet", JSON.stringify(userCabinet));
    localStorage.setItem("morning_steps", JSON.stringify(morningSteps));
    localStorage.setItem("evening_steps", JSON.stringify(eveningSteps));
    localStorage.setItem("journal_entries", JSON.stringify(journalEntries));
    localStorage.setItem("progress_photos", JSON.stringify(progressPhotos));
    localStorage.setItem("health_events", JSON.stringify(events));
    localStorage.setItem("offline_sync_queue", JSON.stringify(syncQueue));
  }, [skinProfile, userCabinet, morningSteps, eveningSteps, journalEntries, progressPhotos, events, syncQueue, isOnboarded]);

  const calculateProductFitAndAlerts = (
    productIngredients: string[],
    profile: HealthProfile | null
  ): { fitScore: number; alerts: string[] } => {
    let score = 85;
    const alerts: string[] = [];

    if (!profile) return { fitScore: score, alerts };

    productIngredients.forEach((ingName) => {
      const ing = INGREDIENTS_CATALOG.find((i) => i.name.toLowerCase() === ingName.toLowerCase());
      if (ing) {
        if (profile.sensitivity === "High" && ing.hazardScore > 5) {
          score -= 15;
          alerts.push(`Active ingredient ${ing.name} has a high hazard index.`);
        }
        const goalsMatching = ing.benefits.filter((b) => profile.goals.includes(b));
        score += goalsMatching.length * 8;
      }
    });

    return {
      fitScore: Math.min(100, Math.max(10, score)),
      alerts,
    };
  };

  useEffect(() => {
    if (!skinProfile) return;
    const recs: HealthRecommendation[] = [
      {
        id: "rec_1",
        title: "Dermal Barrier Support",
        content: "High sensitivity index detected. Recommend incorporating Ceramides 3:1:1 complex during PM routine.",
        category: "routine"
      },
      {
        id: "rec_2",
        title: "Metabolic Recovery",
        content: "Prioritize 5g Creatine Monohydrate daily post-workout to optimize ATP replenishment.",
        category: "ingredient"
      }
    ];
    const timer = setTimeout(() => {
      setRecommendations(recs);
    }, 0);
    return () => clearTimeout(timer);
  }, [skinProfile]);

  useEffect(() => {
    if (!skinProfile) return;
    const timer = setTimeout(() => {
      setUserCabinet((prevCabinet) =>
        prevCabinet.map((up) => {
          const catProd = PRODUCTS_CATALOG.find((p) => p.id === up.productId);
          if (!catProd) return up;
          const { fitScore, alerts } = calculateProductFitAndAlerts(catProd.ingredients, skinProfile);
          return { ...up, fitScore, compatibilityAlerts: alerts };
        })
      );
    }, 0);
    return () => clearTimeout(timer);
  }, [skinProfile]);

  const pushToSyncQueue = (table: string, action: "INSERT" | "UPDATE" | "DELETE", payload: unknown) => {
    const queueItem: SyncQueueItem = {
      id: generateId("sync"),
      table,
      action,
      payload,
    };
    setSyncQueue((prev) => [...prev, queueItem]);
  };

  const submitOnboarding = (assessment: Omit<HealthProfile, "id" | "profileId">) => {
    const newProfile: HealthProfile = {
      id: generateId("hp"),
      profileId: userSession?.user?.id || "anon",
      ...assessment,
    };
    setSkinProfile(newProfile);
    setIsOnboarded(true);

    trackBetaEvent("onboarding_completed", { skinType: assessment.skinType });
    pushToSyncQueue("health_profiles", "INSERT", newProfile);
  };

  const logSkinCheckin = (checkin: Omit<JournalEntry, "id" | "userId" | "date" | "skinIndex">) => {
    const dateStr = new Date().toISOString().split("T")[0];
    let base = 80;
    base += checkin.hydration * 4;
    base -= checkin.redness * 5;
    base -= checkin.irritation * 6;
    base += Math.min(10, checkin.sleep * 1.2);
    base += Math.min(10, (checkin.water / 250) * 1.2);

    const calculatedIndex = Math.min(100, Math.max(15, Math.round(base)));

    const newEntry: JournalEntry = {
      id: generateId("je"),
      userId: userSession?.user?.id || "anon",
      date: dateStr,
      skinIndex: calculatedIndex,
      ...checkin,
    };

    setJournalEntries((prev) => [newEntry, ...prev]);
    setCurrentSkinIndex(calculatedIndex);

    trackBetaEvent("skin_checkin_logged", { skinIndex: calculatedIndex });
    pushToSyncQueue("journal_entries", "INSERT", newEntry);
  };

  const addCabinetProduct = (productId: string, openedDate: string, placements: ("morning" | "evening")[]) => {
    const catalogItem = PRODUCTS_CATALOG.find((p) => p.id === productId);
    if (!catalogItem) return;

    const opened = new Date(openedDate);
    opened.setMonth(opened.getMonth() + catalogItem.paoMonths);
    const expireStr = opened.toISOString().split("T")[0];

    const { fitScore, alerts } = calculateProductFitAndAlerts(catalogItem.ingredients, skinProfile);

    const newUserProd: UserProduct = {
      id: generateId("up"),
      userId: userSession?.user?.id || "anon",
      productId,
      openedAt: openedDate,
      expiresAt: expireStr,
      status: "Active",
      rating: 5,
      routinePlacement: placements,
      fitScore,
      compatibilityAlerts: alerts,
    };

    setUserCabinet((prev) => [newUserProd, ...prev]);

    trackBetaEvent("product_added_to_cabinet", { productId });
    pushToSyncQueue("user_products", "INSERT", newUserProd);

    placements.forEach((placement) => {
      const isMorning = placement === "morning";
      const targetSteps = isMorning ? morningSteps : eveningSteps;

      const step: RoutineStep = {
        id: generateId("step"),
        routineId: isMorning ? "r_morn" : "r_eve",
        userProductId: newUserProd.id,
        orderIndex: targetSteps.length,
        isCompleted: false,
      };

      if (isMorning) {
        setMorningSteps((prev) => [...prev, step]);
      } else {
        setEveningSteps((prev) => [...prev, step]);
      }

      pushToSyncQueue("routine_steps", "INSERT", step);
    });
  };

  const addCustomProductToCabinet = (
    brand: string,
    name: string,
    category: Product["category"],
    ingredientNames: string[],
    pao: number,
    openedDate: string,
    placements: ("morning" | "evening")[]
  ) => {
    const customId = generateId("custom_p");
    const newCatalogProduct: Product = {
      id: customId,
      brand,
      name,
      category,
      ingredients: ingredientNames,
      description: "Custom user product added directly.",
      paoMonths: pao,
    };

    PRODUCTS_CATALOG.push(newCatalogProduct);
    addCabinetProduct(customId, openedDate, placements);
  };

  const deleteCabinetProduct = (userProductId: string) => {
    setUserCabinet((prev) => prev.filter((p) => p.id !== userProductId));
    setMorningSteps((prev) => prev.filter((s) => s.userProductId !== userProductId));
    setEveningSteps((prev) => prev.filter((s) => s.userProductId !== userProductId));

    trackBetaEvent("product_deleted_from_cabinet", { userProductId });
    pushToSyncQueue("user_products", "DELETE", { id: userProductId });
  };

  const toggleRoutineStep = (stepId: string, isMorning: boolean) => {
    const updateFn = (s: RoutineStep) => (s.id === stepId ? { ...s, isCompleted: !s.isCompleted } : s);
    if (isMorning) {
      setMorningSteps((prev) => prev.map(updateFn));
    } else {
      setEveningSteps((prev) => prev.map(updateFn));
    }
  };

  const signOutUser = () => {
    supabase.auth.signOut();
    localStorage.clear();
    setUserSession(null);
    setIsOnboarded(false);
  };

  const clearAllUserData = () => {
    setSkinProfile(null);
    setUserCabinet([]);
    setMorningSteps([]);
    setEveningSteps([]);
    setJournalEntries([]);
    setProgressPhotos([]);
    setEvents([]);
    setIsOnboarded(false);
    setActiveTab("today");
    localStorage.clear();
  };

  return (
    <HealthOSContext.Provider
      value={{
        activeTab,
        setActiveTab,
        isOnboarded,
        skinProfile,
        userCabinet,
        morningSteps,
        eveningSteps,
        journalEntries,
        progressPhotos,
        recommendations,
        events,
        currentSkinIndex,
        userSession,
        signOutUser,
        syncStatus,
        offlineQueueLength: syncQueue.length,
        submitOnboarding,
        logSkinCheckin,
        addCabinetProduct,
        deleteCabinetProduct,
        toggleRoutineStep,
        addCustomProductToCabinet,
        clearAllUserData,
      }}
    >
      {children}
    </HealthOSContext.Provider>
  );
};

export const useHealthOS = () => {
  const context = useContext(HealthOSContext);
  if (context === undefined) {
    throw new Error("useHealthOS must be used within a HealthOSProvider");
  }
  return context;
};

// Backwards compatibility export
export const useBeautyOS = useHealthOS;
export const BeautyOSProvider = HealthOSProvider;
