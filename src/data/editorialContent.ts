export type ContentSection = {
  title: string;
  content: string[];
  callout?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type EditorialArticle = {
  id: string;
  slug: string;
  category: "Supplements" | "Ingredients" | "Fitness" | "Skin";
  title: string;
  subtitle: string;
  heroImage: string;
  estimatedReadTime: string;
  scientificConfidence: string;
  introduction: string;
  sections: ContentSection[];
  faqs: FAQ[];
  expertTip: string;
  relatedProducts: string[];
};

export const editorialContent: Record<string, EditorialArticle> = {
  "creatine": {
    id: "creatine",
    slug: "creatine",
    category: "Supplements",
    title: "Creatine Monohydrate",
    subtitle: "The undisputed king of physical performance and neurological optimization.",
    heroImage: "/images/creatine-hero.jpg",
    estimatedReadTime: "6 min read",
    scientificConfidence: "Very High (Grade A)",
    introduction: "Creatine is not just for bodybuilders. It is one of the most extensively studied molecules in the history of sports science and longevity research. From accelerating cellular ATP synthesis to acting as a neuroprotectant against cognitive decline, creatine is foundational for anyone seeking to optimize their biological output.",
    sections: [
      {
        title: "The Biological Mechanism",
        content: [
          "At the cellular level, your body runs on Adenosine Triphosphate (ATP). When a cell uses ATP for energy, it loses a phosphate molecule and becomes Adenosine Diphosphate (ADP).",
          "Creatine is stored in your muscles and brain as phosphocreatine. Its primary job is to rapidly donate its phosphate group to ADP, instantly regenerating ATP. This means your cells have more immediate energy available during high-demand activities, whether that is sprinting, lifting heavy weights, or complex cognitive tasks."
        ],
        callout: "Creatine increases intracellular water retention, making muscle cells appear fuller and creating a highly anabolic environment."
      },
      {
        title: "Clinical Benefits",
        content: [
          "Muscle Hypertrophy: Increases satellite cell signaling and IGF-1 expression.",
          "Neurological Health: Reduces mental fatigue and has shown neuroprotective properties in sleep-deprived states.",
          "Bone Density: Paired with resistance training, it improves skeletal integrity in aging populations."
        ]
      },
      {
        title: "Dosage & Best Practices",
        content: [
          "The most effective protocol is 3–5 grams of Creatine Monohydrate daily. A loading phase (20g/day for 5 days) is entirely optional and only necessary if you need acute saturation within a week.",
          "Consistency is more important than timing, though taking it post-workout with carbohydrates can slightly enhance absorption due to the insulin response."
        ],
        callout: "Always opt for 'Creapure' or 100% pure Creatine Monohydrate. Avoid complex proprietary blends."
      }
    ],
    faqs: [
      {
        question: "Will creatine cause hair loss?",
        answer: "Current scientific literature does not support the claim that creatine causes baldness. One older study showed an increase in DHT, but this has not been reliably replicated, nor has a direct link to follicular miniaturization been established."
      },
      {
        question: "Do I need to cycle creatine?",
        answer: "No. Your body does not build a tolerance to creatine, and continuous daily supplementation is the safest and most effective protocol."
      }
    ],
    expertTip: "Dissolve your 5g dose in warm water or tea if you experience any mild gastrointestinal discomfort from cold water suspension.",
    relatedProducts: ["p_supp_001"]
  },
  "retinol": {
    id: "retinol",
    slug: "retinol",
    category: "Ingredients",
    title: "Retinol & Retinoids",
    subtitle: "The gold standard of dermal regeneration and anti-aging science.",
    heroImage: "/images/retinol-hero.jpg",
    estimatedReadTime: "8 min read",
    scientificConfidence: "Very High (Grade A)",
    introduction: "Retinoids are Vitamin A derivatives that fundamentally alter the way skin cells behave. Discovered initially as an acne treatment, dermatologists quickly realized its profound anti-aging effects. It remains the most proven topical ingredient for stimulating collagen production and accelerating cellular turnover.",
    sections: [
      {
        title: "How Retinoids Work",
        content: [
          "Unlike exfoliants (AHAs/BHAs) which dissolve the glue between dead skin cells on the surface, retinoids communicate directly with living cells in the deeper dermal layers. They signal these cells to behave like younger, healthier cells.",
          "This rapid cellular turnover forces newer skin to the surface faster, while simultaneously upregulating collagen and elastin synthesis in the dermis."
        ]
      },
      {
        title: "The Conversion Cascade",
        content: [
          "Your skin only utilizes Retinoic Acid. Over-the-counter retinol must undergo a two-step conversion process in the skin: Retinol -> Retinaldehyde -> Retinoic Acid.",
          "This conversion is why prescription Tretinoin (pure Retinoic Acid) acts much faster but causes significantly more irritation than OTC retinol."
        ],
        callout: "Retinal (Retinaldehyde) requires only one conversion step, making it up to 11x faster acting than standard retinol, with similar tolerability."
      },
      {
        title: "The Retinization Period",
        content: [
          "When introducing retinoids, you will likely experience 'retinization'—a 2 to 6 week period of redness, peeling, and sensitivity.",
          "To mitigate this, apply the 'sandwich method': Apply a light moisturizer, let it dry, apply your retinoid, and follow with a thicker barrier cream."
        ]
      }
    ],
    faqs: [
      {
        question: "Can I use retinol in the morning?",
        answer: "Retinoids are photosensitive and degrade in UV light. They should strictly be applied during your evening routine."
      },
      {
        question: "Is it safe during pregnancy?",
        answer: "No. Oral and topical retinoids are contraindicated during pregnancy and breastfeeding due to the risk of teratogenic effects. Switch to Bakuchiol or Azelaic Acid."
      }
    ],
    expertTip: "Never combine Retinoids with AHAs, BHAs, or Benzoyl Peroxide in the same routine unless explicitly formulated together by a clinical chemist.",
    relatedProducts: ["p_001", "p_003"]
  },
  "vo2-max": {
    id: "vo2-max",
    slug: "vo2-max",
    category: "Fitness",
    title: "VO2 Max Optimization",
    subtitle: "The single greatest predictor of human longevity and metabolic health.",
    heroImage: "/images/vo2-hero.jpg",
    estimatedReadTime: "7 min read",
    scientificConfidence: "High",
    introduction: "VO2 max is the maximum rate at which your body can extract oxygen from the air and deliver it to your working muscles. Beyond athletic performance, clinical literature increasingly points to VO2 max as a more powerful predictor of lifespan than blood pressure, cholesterol, or smoking status.",
    sections: [
      {
        title: "The Physiology of Oxygen Delivery",
        content: [
          "Your VO2 max is governed by cardiac output (how much blood your heart can pump per beat) and mitochondrial density (how efficiently your muscles can utilize that oxygen).",
          "Improving it requires pushing the cardiovascular system to its absolute limits, forcing structural adaptations in the left ventricle of the heart."
        ]
      },
      {
        title: "The 4x4 Protocol",
        content: [
          "The Norwegian 4x4 interval protocol is widely considered the most effective method for increasing VO2 max. It involves 4 intervals of 4 minutes at 85-95% of maximum heart rate, separated by 3 minutes of active recovery.",
          "This specific duration is long enough to maximize cardiac stroke volume, but short enough that the intensity can be sustained."
        ],
        callout: "You should not be able to hold a conversation during the 4-minute working intervals. The effort should feel like an 8.5/10."
      }
    ],
    faqs: [
      {
        question: "Can I just do Zone 2 cardio?",
        answer: "Zone 2 builds the mitochondrial base (the 'plumbing'), but high-intensity intervals are required to maximize the heart's stroke volume (the 'pump'). You need both."
      }
    ],
    expertTip: "If you don't have a lab to test your VO2 max, the Cooper Test (running as far as possible in 12 minutes) is a highly accurate field proxy.",
    relatedProducts: []
  }
};
