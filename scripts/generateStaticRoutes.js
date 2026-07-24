/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const layoutPath = path.join(__dirname, '../src/components/GlobalLayout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');

// Regex to find all href: "/something" or href="/something"
const regex = /href:\s*"([^"]+)"/g;
const links = new Set();
let match;
while ((match = regex.exec(layoutContent)) !== null) {
  links.add(match[1]);
}

const existingTopLevels = ["/", "/dashboard", "/products", "/account", "/support", "/contact", "/privacy", "/terms", "/newsletter"];
const categoryPages = ["/skin", "/hair", "/body", "/fitness", "/nutrition", "/supplements", "/longevity", "/science", "/guides", "/community", "/ingredients"];

const routesToGenerate = Array.from(links).filter(link => {
  return !existingTopLevels.includes(link) && !categoryPages.includes(link);
});

console.log(`Found ${routesToGenerate.length} specific routes to generate.`);

const editorialContentPath = path.join(__dirname, '../src/data/editorialContent.ts');
let editorialContentRaw = fs.readFileSync(editorialContentPath, 'utf8');

// We will keep track of keys to ensure they exist.
let generatedCount = 0;

for (const route of routesToGenerate) {
  // route looks like /skin/acne
  const parts = route.split('/').filter(Boolean);
  if (parts.length < 2) continue; // Skip top level if any sneaked in

  const category = parts[0]; // e.g. skin
  const slug = parts[1]; // e.g. acne
  const globalKey = `${category}-${slug}`;

  // Create directory
  const dirPath = path.join(__dirname, `../src/app/${category}/${slug}`);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Create page.tsx
  const pagePath = path.join(dirPath, 'page.tsx');
  
  const capCategory = category.charAt(0).toUpperCase() + category.slice(1);
  const title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const pageContent = `import React from "react";
import { editorialContent, EditorialArticle } from "../../../data/editorialContent";
import { EditorialTemplate } from "../../../components/EditorialTemplate";
import { notFound } from "next/navigation";

// The slug is always ${slug}
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

  // Ensure editorialContent has this key. If not, append a mock one.
  if (!editorialContentRaw.includes(`"${globalKey}": {`)) {
    console.log(`Missing content for ${globalKey}, adding mock...`);
    
    // We will append right before `};\n` at the end of the file.
    // It's a bit hacky but works for a one-off script.
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
      }
    ];

    const mockContent = `
  "${globalKey}": {
    id: "${globalKey}",
    slug: "${slug}",
    category: "${capCategory}" as any,
    title: "${title} Protocol",
    subtitle: "The ultimate evidence-based guide to ${title.toLowerCase()} optimization.",
    heroImage: "/images/beautyos_hero_products_1784918027747.png",
    estimatedReadTime: "8 min read",
    scientificConfidence: "High (Grade A)",
    introduction: "Mastering ${title.toLowerCase()} is foundational to your overall health and aesthetic goals.",
    problem: "You are seeking a clinical-grade approach for ${title.toLowerCase()}.",
    solution: "By utilizing this protocol, you can achieve peak optimization.",
    benefits: ["Improve overall baseline", "Optimize biological function"],
    stepByStep: [{ step: 1, title: "Assessment", desc: "Evaluate your current baseline." }],
    warnings: ["Consistency over weeks is required."],
    sections: [{ title: "The Biological Mechanism", content: ["Understanding these pathways allows you to manipulate them for maximum efficiency."] }],
    faqs: [{ question: "How long until I see results?", answer: "Typically 4-12 weeks." }],
    expertTip: "Always prioritize sleep and hydration.",
    recommendedProducts: ${JSON.stringify(mockProducts, null, 4)},
    relatedGuides: [],
    relatedIngredients: []
  },
`;
    // Ensure the last object has a comma
    editorialContentRaw = editorialContentRaw.replace(/}(\s*};\s*)$/, '},$1');
    const lastBraceIndex = editorialContentRaw.lastIndexOf('};');
    editorialContentRaw = editorialContentRaw.substring(0, lastBraceIndex) + mockContent + editorialContentRaw.substring(lastBraceIndex);
  }
}

// Write the updated editorial content if modified
fs.writeFileSync(editorialContentPath, editorialContentRaw);

console.log(`Generated ${generatedCount} static routes successfully.`);
