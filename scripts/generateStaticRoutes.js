/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, '../src/components/GlobalLayout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Regex to find all href: "/something" or href="/something"
const regex = /href:\s*"([^"]+)"|href="([^"]+)"/g;
const links = new Set();
let match;
while ((match = regex.exec(layoutContent)) !== null) {
  const link = match[1] || match[2];
  if (link && link.startsWith('/') && !link.includes('#') && !link.includes('http')) {
    links.add(link);
  }
}

// Add mandatory sitemap routes
const additionalRoutes = [
  "/skin", "/hair", "/body", "/fitness", "/nutrition", "/supplements", "/longevity", "/science", "/guides", "/community",
  "/about", "/contact", "/privacy", "/terms", "/pricing", "/ai-coach", "/dashboard", "/ingredients",
  "/skin/acne", "/skin/barrier-repair", "/skin/retinol", "/skin/vitamin-c", "/skin/rosacea",
  "/hair/hair-loss", "/hair/scalp-health",
  "/body/body-composition", "/body/posture", "/body/recovery",
  "/fitness/build-muscle", "/fitness/lose-fat", "/fitness/strength", "/fitness/cardio",
  "/nutrition/gut-health", "/nutrition/muscle", "/nutrition/fat-loss",
  "/supplements/protein", "/supplements/creatine", "/supplements/collagen", "/supplements/magnesium", "/supplements/omega-3", "/supplements/vitamin-d", "/supplements/ashwagandha", "/supplements/electrolytes", "/supplements/pre-workout", "/supplements/post-workout",
  "/longevity/nad", "/longevity/biohacking", "/longevity/fasting",
  "/science/hormones", "/science/biochemistry", "/science/muscle-protein-synthesis", "/science/skin-physiology",
  "/guides/90-day-acne-program", "/guides/90-day-fat-loss", "/guides/build-muscle", "/guides/morning-routine", "/guides/evening-routine"
];

additionalRoutes.forEach(r => links.add(r));

const existingTopLevels = ["/", "/dashboard", "/products", "/account", "/support", "/contact", "/privacy", "/terms", "/newsletter", "/about", "/pricing", "/ai-coach"];
const categoryPages = ["/skin", "/hair", "/body", "/fitness", "/nutrition", "/supplements", "/longevity", "/science", "/guides", "/community", "/ingredients"];

const routesToGenerate = Array.from(links).filter(link => {
  return !existingTopLevels.includes(link) && !categoryPages.includes(link);
});

console.log(`Found ${routesToGenerate.length} specific routes to verify/generate.`);

let generatedCount = 0;

for (const route of routesToGenerate) {
  const parts = route.split('/').filter(Boolean);
  if (parts.length < 2) continue;

  const category = parts[0];
  const slug = parts[1];
  const globalKey = `${category}-${slug}`;

  // Create directory
  const dirPath = path.join(__dirname, `../src/app/${category}/${slug}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Create page.tsx
  const pagePath = path.join(dirPath, 'page.tsx');
  
  const capCategory = category.charAt(0).toUpperCase() + category.slice(1);

  const pageContent = `import React from "react";
import { editorialContent } from "${"../".repeat(parts.length + 1)}data/editorialContent";
import { EditorialTemplate } from "${"../".repeat(parts.length + 1)}components/EditorialTemplate";
import { notFound } from "next/navigation";

export default function StaticPage() {
  const article = editorialContent["${globalKey}"];

  if (!article) {
    notFound();
  }

  return (
    <EditorialTemplate 
      article={article} 
      backHref="/${category}" 
      backLabel="${capCategory} Hub" 
    />
  );
}
`;

  fs.writeFileSync(pagePath, pageContent);
  generatedCount++;
}

console.log(`Successfully created/updated ${generatedCount} static route page files.`);
