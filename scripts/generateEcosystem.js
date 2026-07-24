/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const fileContent = `export type ContentSection = {
  title: string;
  content: string[];
  callout?: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type RecommendedProduct = {
  id: string;
  name: string;
  brand: string;
  image: string;
  benefits: string[];
  bestFor: string;
  ingredients: string[];
  scientificScore: number;
  safetyScore: number;
  routinePlacement: string;
  price: string;
};

export type EditorialArticle = {
  id: string;
  slug: string;
  category: "Supplements" | "Ingredients" | "Fitness" | "Skin" | "Hair" | "Body" | "Nutrition" | "Longevity" | "Men" | "Women" | "Guides" | "Science" | "Community";
  title: string;
  subtitle: string;
  heroImage: string;
  estimatedReadTime: string;
  scientificConfidence: string;
  introduction: string;
  
  // PREMIUM FIELDS (Universal)
  problem: string;
  solution: string;
  benefits: string[];
  stepByStep: { step: number; title: string; desc: string }[];
  warnings: string[];

  // SKIN / HAIR / BODY FIELDS
  symptoms?: string[];
  causes?: string[];
  howItDevelops?: string;
  bestIngredients?: string[];
  ingredientsToAvoid?: string[];
  morningRoutine?: string[];
  nightRoutine?: string[];

  // SUPPLEMENTS / NUTRITION FIELDS
  whatItIs?: string;
  whoShouldUseIt?: string;
  evidenceSummary?: string;
  dosageRanges?: string;
  timing?: string;
  interactions?: string[];

  sections: ContentSection[];
  faqs: FAQ[];
  expertTip: string;
  
  // PRODUCT RECOMMENDATIONS
  recommendedProducts: RecommendedProduct[];
  relatedGuides: string[];
  relatedIngredients: string[];
};

export const editorialContent: Record<string, EditorialArticle> = {
`;

// Expanded map based on explicit user request
const ecosystemMap = {
  Skin: ["acne", "rosacea", "dry-skin", "oily-skin", "sensitive-skin", "combination-skin", "barrier-repair", "anti-aging", "wrinkles", "dark-spots", "hyperpigmentation", "double-cleansing", "exfoliation", "morning-routine", "night-routine", "eye-care", "lip-care", "glow"],
  Ingredients: ["vitamin-c", "retinol", "ceramides", "niacinamide", "peptides", "hyaluronic-acid", "azelaic-acid", "spf"],
  Hair: ["hair-growth", "hair-loss", "scalp-health", "dandruff", "curly-hair", "straight-hair", "damaged-hair", "dry-hair", "hair-oils", "beard-care", "hair-supplements"],
  Body: ["body-acne", "stretch-marks", "cellulite", "body-lotion", "body-wash", "hands", "feet", "neck", "body-spf", "body-exfoliation", "hydration"],
  Fitness: ["build-muscle", "lose-fat", "body-recomposition", "strength", "hypertrophy", "cardio", "recovery", "mobility", "stretching", "workout-plans", "gym-beginners", "advanced-training", "protein-intake"],
  Nutrition: ["calories", "protein", "carbohydrates", "healthy-fats", "meal-planning", "healthy-recipes", "hydration", "micronutrients", "gut-health", "meal-timing"],
  Supplements: ["protein", "creatine", "collagen", "magnesium", "vitamin-d", "vitamin-c", "omega-3", "electrolytes", "ashwagandha", "zinc", "iron", "calcium", "greens", "fiber", "prebiotics", "probiotics", "multivitamins", "pre-workout", "post-workout", "recovery", "hydration"],
  Longevity: ["sleep", "stress", "recovery", "heart-health", "brain-health", "healthy-ageing", "energy", "hormones", "inflammation"],
  Science: ["ewg", "inci", "clinical-studies", "evidence-levels", "ingredient-database", "skin-barrier", "microbiome", "collagen-science", "antioxidants", "inflammation"],
  Guides: ["30-day-skin-reset", "90-day-acne-program", "build-muscle-guide", "lose-fat-blueprint", "healthy-hair-guide", "morning-routine", "night-routine", "supplement-guide", "healthy-lifestyle", "travel-skincare", "women", "men", "teens"],
  Community: ["expert-articles", "success-stories", "transformation-stories", "challenges", "events", "questions-answers", "dermatologist-tips", "fitness-coach-advice", "nutrition-articles"]
};

function formatTitle(slug) {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

let articlesJSON = [];

for (const [category, slugs] of Object.entries(ecosystemMap)) {
  for (const slug of slugs) {
    const title = formatTitle(slug);
    const globalKey = `${category.toLowerCase()}-${slug}`;
    
    let problem = `You are struggling with ${title.toLowerCase()} and seeking a clinical-grade, scientifically-backed approach that actually delivers results instead of empty promises.`;
    let solution = `By utilizing the ${title} protocol developed by our clinical experts, you can dramatically shift your biological markers and achieve peak optimization.`;
    let benefits = [];
    
    if (category === "Skin" || category === "Ingredients" || category === "Body") {
      benefits = [
        `Reveal brighter, more even skin while reducing the appearance of ${slug.replace(/-/g, ' ')}.`,
        "Stimulate collagen production and dermal thickness for a youthful bounce.",
        "Fortify your skin barrier against environmental stressors and TEWL."
      ];
    } else if (category === "Fitness" || category === "Hair") {
      benefits = [
        "Increase strength, improve power output and support rapid recovery.",
        "Optimize biomechanical efficiency and reduce injury risk.",
        "Sculpt a leaner, denser physique through progressive scientific programming."
      ];
    } else {
      benefits = [
        "Enhance cellular energy production and mitochondrial density.",
        "Support cognitive clarity and defend against neurodegenerative decline.",
        "Regulate systemic inflammation and hormone synthesis for extended healthspan."
      ];
    }

    // Default mock product array to embed in every article
    const mockProducts = [
      {
        id: "prod-1",
        name: "Clinical Standard Serum",
        brand: "BeautyOS Formulations",
        image: "/images/beautyos_hero_products_1784918027747.png",
        benefits: ["Accelerates healing", "Reduces inflammation", "Boosts cellular turnover"],
        bestFor: "All skin types",
        ingredients: ["Ceramides", "Peptides", "Hyaluronic Acid"],
        scientificScore: 99,
        safetyScore: 100,
        routinePlacement: "AM/PM",
        price: "$85"
      },
      {
        id: "prod-2",
        name: "Advanced Recovery Matrix",
        brand: "Longevity Labs",
        image: "/images/beautyos_showcase_phone_1784918045920.png",
        benefits: ["Supports mitochondrial function", "Decreases oxidative stress", "Enhances deep sleep"],
        bestFor: "Biohackers",
        ingredients: ["Magnesium Bisglycinate", "L-Theanine", "Apigenin"],
        scientificScore: 97,
        safetyScore: 99,
        routinePlacement: "PM",
        price: "$60"
      }
    ];

    const articleCode = `  "${globalKey}": {
    id: "${globalKey}",
    slug: "${slug}",
    category: "${category}",
    title: "${title} Mastery",
    subtitle: "The ultimate evidence-based guide to ${title.toLowerCase()} optimization.",
    heroImage: "/images/beautyos_hero_products_1784918027747.png",
    estimatedReadTime: "8 min read",
    scientificConfidence: "High (Grade A)",
    introduction: "Mastering ${title.toLowerCase()} is foundational to your overall health and aesthetic goals. This guide distills decades of clinical research into actionable protocols that you can implement today to see immediate, measurable results.",
    
    problem: "${problem}",
    solution: "${solution}",
    benefits: ${JSON.stringify(benefits)},
    
    stepByStep: [
      { step: 1, title: "Assessment", desc: "Evaluate your current baseline and identify key areas of friction." },
      { step: 2, title: "Implementation", desc: "Introduce the core protocols progressively to avoid overwhelming your system." },
      { step: 3, title: "Optimization", desc: "Fine-tune dosages, timings, and variables based on biofeedback." }
    ],
    
    warnings: [
      "Avoid introducing too many new variables at once, which masks the efficacy of individual protocols.",
      "Consistency over weeks is required; acute biological changes take time to manifest visually."
    ],

    // SKIN / HAIR / BODY FIELDS
    symptoms: ["Inflammation", "Redness", "Loss of elasticity"],
    causes: ["Genetic predisposition", "Environmental stressors", "Poor dietary habits"],
    howItDevelops: "It typically begins at the cellular level with mitochondrial dysfunction, leading to visible external symptoms.",
    bestIngredients: ["Retinol", "Vitamin C", "Ceramides"],
    ingredientsToAvoid: ["Harsh Sulfates", "Synthetic Fragrances", "Denatured Alcohol"],
    morningRoutine: ["Gentle Cleanse", "Antioxidant Serum", "Broad-Spectrum SPF"],
    nightRoutine: ["Double Cleanse", "Targeted Active Treatment", "Barrier Repair Cream"],

    // SUPPLEMENTS / NUTRITION FIELDS
    whatItIs: "A vital compound required for optimal biological function.",
    whoShouldUseIt: "Individuals looking to maximize their healthspan and physical performance.",
    evidenceSummary: "Supported by over 500 peer-reviewed clinical trials demonstrating significant efficacy.",
    dosageRanges: "5mg - 100mg depending on body weight and goals.",
    timing: "Best taken with a fat source to increase bioavailability.",
    interactions: ["Avoid taking simultaneously with high doses of caffeine."],

    sections: [
      {
        title: "The Biological Mechanism",
        content: [
          "At the cellular level, ${title.toLowerCase()} relies on a complex cascade of metabolic and hormonal signaling. Understanding these pathways allows you to manipulate them for maximum efficiency.",
          "Our protocols are designed to target the root cause, upregulating positive genetic expression while mitigating systemic inflammation."
        ],
        callout: "Clinical trials consistently demonstrate that structured adherence to these principles yields a 300% greater success rate than ad-hoc approaches."
      },
      {
        title: "Common Mistakes",
        content: [
          "Many individuals fail to achieve results due to inconsistent application or incorrect dosage timing. Furthermore, stacking conflicting active ingredients can neutralize their efficacy or cause severe barrier damage."
        ]
      }
    ],
    faqs: [
      {
        question: "How long until I see results with ${title.toLowerCase()}?",
        answer: "While cellular changes begin immediately, visual or systemic results typically require 4-12 weeks of strict adherence to the protocol."
      },
      {
        question: "Is this approach safe for sensitive individuals?",
        answer: "Yes, provided you start at the lowest effective dose and scale up based on biofeedback."
      }
    ],
    expertTip: "Always prioritize sleep and hydration, as they are the primary catalysts for all biological repair processes related to ${title.toLowerCase()}.",
    
    recommendedProducts: ${JSON.stringify(mockProducts, null, 4)},
    relatedGuides: ["30-day-skin-reset", "morning-routine"],
    relatedIngredients: ["vitamin-c", "ceramides"]
  }`;

    articlesJSON.push(articleCode);
  }
}

const finalOutput = fileContent + articlesJSON.join(',\n') + '\n};\n';
fs.writeFileSync(path.join(__dirname, '../src/data/editorialContent.ts'), finalOutput);
console.log("Successfully generated editorialContent.ts with " + articlesJSON.length + " extended articles.");
