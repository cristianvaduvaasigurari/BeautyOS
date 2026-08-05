import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://health.cristianvaduva.com";

  const staticRoutes = [
    "",
    "/skin",
    "/hair",
    "/body",
    "/fitness",
    "/nutrition",
    "/supplements",
    "/longevity",
    "/science",
    "/guides",
    "/community",
    "/about",
    "/contact",
    "/pricing",
    "/privacy",
    "/terms",
    "/ai-coach",
    "/dashboard",
  ];

  const categorySubRoutes = [
    // Skin
    "/skin/acne",
    "/skin/barrier-repair",
    "/skin/retinol",
    "/skin/vitamin-c",
    "/skin/rosacea",
    "/skin/sensitive-skin",
    "/skin/dry-skin",
    "/skin/oily-skin",
    "/skin/combination-skin",
    "/skin/anti-aging",
    "/skin/pigmentation",
    "/skin/sun-damage",

    // Hair
    "/hair/hair-loss",
    "/hair/scalp-health",
    "/hair/hair-growth",
    "/hair/dandruff",
    "/hair/curly",
    "/hair/straight",
    "/hair/oils",

    // Body
    "/body/body-composition",
    "/body/posture",
    "/body/recovery",
    "/body/stretch-marks",
    "/body/cellulite",
    "/body/hydration",

    // Fitness
    "/fitness/build-muscle",
    "/fitness/lose-fat",
    "/fitness/strength",
    "/fitness/cardio",
    "/fitness/hypertrophy",
    "/fitness/running",
    "/fitness/hiit",
    "/fitness/recovery",
    "/fitness/mobility",

    // Nutrition
    "/nutrition/gut-health",
    "/nutrition/muscle",
    "/nutrition/fat-loss",
    "/nutrition/calories",
    "/nutrition/protein",
    "/nutrition/carbs",
    "/nutrition/fats",
    "/nutrition/meal-plans",
    "/nutrition/recipes",
    "/nutrition/hydration",
    "/nutrition/micronutrients",

    // Supplements
    "/supplements/protein",
    "/supplements/creatine",
    "/supplements/collagen",
    "/supplements/magnesium",
    "/supplements/omega-3",
    "/supplements/vitamin-d",
    "/supplements/ashwagandha",
    "/supplements/electrolytes",
    "/supplements/pre-workout",
    "/supplements/post-workout",
    "/supplements/nmn",
    "/supplements/coq10",
    "/supplements/berberine",

    // Longevity
    "/longevity/nad",
    "/longevity/biohacking",
    "/longevity/fasting",
    "/longevity/blood-sugar",
    "/longevity/vo2-max",
    "/longevity/heart-health",
    "/longevity/hormones",
    "/longevity/sleep",
    "/longevity/stress",
    "/longevity/healthy-aging",
    "/longevity/recovery",

    // Science
    "/science/hormones",
    "/science/biochemistry",
    "/science/muscle-protein-synthesis",
    "/science/skin-physiology",
    "/science/clinical-studies",
    "/science/ingredients",
    "/science/ewg",
    "/science/inci",

    // Guides
    "/guides/90-day-acne-program",
    "/guides/90-day-fat-loss",
    "/guides/build-muscle",
    "/guides/morning-routine",
    "/guides/evening-routine",
    "/guides/healthy-skin",
    "/guides/supplements",
    "/guides/women",
    "/guides/men",
    "/guides/teens"
  ];

  const allRoutes = [...staticRoutes, ...categorySubRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
