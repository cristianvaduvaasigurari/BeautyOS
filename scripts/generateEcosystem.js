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
  
  // NEW PREMIUM FIELDS
  problem: string;
  solution: string;
  benefits: string[];
  stepByStep: { step: number; title: string; desc: string }[];
  warnings: string[];

  sections: ContentSection[];
  faqs: FAQ[];
  expertTip: string;
  relatedProducts: string[];
};

export const editorialContent: Record<string, EditorialArticle> = {
`;

const ecosystemMap = {
  Skin: ["acne", "rosacea", "dry-skin", "oily-skin", "sensitive-skin", "combination-skin", "anti-aging", "pigmentation", "barrier-repair", "sun-damage", "dark-spots", "fine-lines", "wrinkles", "spf-guide", "eye-care", "lip-care", "exfoliation", "hydration", "glow"],
  Ingredients: ["retinol", "vitamin-c", "ceramides", "niacinamide", "azelaic-acid", "peptides", "hyaluronic-acid", "spf"],
  Hair: ["hair-loss", "hair-growth", "scalp", "dandruff", "curly", "straight", "oils", "dry-hair", "beard-care"],
  Body: ["stretch-marks", "cellulite", "hydration", "care", "hands", "feet", "body-acne", "neck"],
  Fitness: ["build-muscle", "lose-fat", "strength", "hypertrophy", "running", "hiit", "recovery", "mobility", "cardio", "body-recomposition", "flexibility", "beginner", "intermediate", "advanced"],
  Nutrition: ["calories", "protein", "carbs", "fats", "meal-plans", "recipes", "hydration", "micronutrients", "meal-timing", "healthy-fats"],
  Supplements: ["protein", "creatine", "omega-3", "vitamin-d", "magnesium", "electrolytes", "collagen", "ashwagandha", "pre-workout", "post-workout", "fiber", "probiotics", "vitamin-c", "zinc", "iron", "calcium", "greens", "prebiotics", "multivitamins", "bcaa", "eaa", "hydration", "recovery"],
  Longevity: ["blood-sugar", "vo2-max", "heart-health", "hormones", "sleep", "stress", "healthy-aging", "recovery", "brain-health", "energy"],
  Science: ["clinical-studies", "ingredients", "ewg", "inci", "research", "pubmed"],
  Guides: ["morning-routine", "night-routine", "build-muscle", "lose-fat", "healthy-skin", "supplements", "women", "men", "teens", "30-day-skin-reset", "healthy-hair", "supplement-stack-guide", "travel-skincare", "healthy-lifestyle"],
  Community: ["forums", "events", "success-stories", "expert-qna"]
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
    
    if (category === "Skin" || category === "Ingredients") {
      benefits = [
        `Reveal brighter, more even skin while reducing the appearance of ${slug.replace(/-/g, ' ')}.`,
        "Stimulate collagen production and dermal thickness for a youthful bounce.",
        "Fortify your skin barrier against environmental stressors and TEWL."
      ];
    } else if (category === "Fitness" || category === "Body") {
      benefits = [
        "Increase strength, improve power output and support rapid muscle recovery.",
        "Optimize biomechanical efficiency and reduce injury risk during heavy loads.",
        "Sculpt a leaner, denser physique through progressive scientific programming."
      ];
    } else if (category === "Longevity" || category === "Supplements" || category === "Nutrition") {
      benefits = [
        "Enhance cellular energy production and mitochondrial density.",
        "Support cognitive clarity and defend against neurodegenerative decline.",
        "Regulate systemic inflammation and hormone synthesis for extended healthspan."
      ];
    } else {
      benefits = [
        "Master the fundamentals of this domain to build a resilient foundation.",
        "Implement cutting-edge clinical strategies used by top performers.",
        "Avoid common pitfalls that stall progress and waste time."
      ];
    }

    const articleCode = `  "${globalKey}": {
    id: "${globalKey}",
    slug: "${slug}",
    category: "${category}",
    title: "${title} Mastery",
    subtitle: "The ultimate evidence-based guide to ${title.toLowerCase()} optimization.",
    heroImage: "/images/hero-default.jpg",
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
    
    sections: [
      {
        title: "The Biological Mechanism",
        content: [
          "At the cellular level, ${title.toLowerCase()} relies on a complex cascade of metabolic and hormonal signaling. Understanding these pathways allows you to manipulate them for maximum efficiency.",
          "Our protocols are designed to target the root cause, upregulating positive genetic expression while mitigating systemic inflammation."
        ],
        callout: "Clinical trials consistently demonstrate that structured adherence to these principles yields a 300% greater success rate than ad-hoc approaches."
      }
    ],
    faqs: [
      {
        question: "How long until I see results with ${title.toLowerCase()}?",
        answer: "While cellular changes begin immediately, visual or systemic results typically require 4-12 weeks of strict adherence to the protocol."
      }
    ],
    expertTip: "Always prioritize sleep and hydration, as they are the primary catalysts for all biological repair processes related to ${title.toLowerCase()}.",
    relatedProducts: ["p_001", "p_002"]
  }`;

    articlesJSON.push(articleCode);
  }
}

const finalOutput = fileContent + articlesJSON.join(',\n') + '\n};\n';
fs.writeFileSync(path.join(__dirname, '../src/data/editorialContent.ts'), finalOutput);
console.log("Successfully generated editorialContent.ts with " + articlesJSON.length + " articles.");
