/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

console.log("Starting HealthOS Complete Route Verification Scan...");

const layoutPath = path.join(__dirname, '../src/components/GlobalLayout.tsx');
const layoutContent = fs.readFileSync(layoutPath, 'utf8');

const regex = /href:\s*"([^"]+)"|href="([^"]+)"/g;
const links = new Set();
let match;
while ((match = regex.exec(layoutContent)) !== null) {
  const link = match[1] || match[2];
  if (link && link.startsWith('/') && !link.includes('#') && !link.includes('http')) {
    links.add(link);
  }
}

// Read sitemap as well
const sitemapPath = path.join(__dirname, '../src/app/sitemap.ts');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const sitemapRegex = /"(\/[^"]*)"/g;
while ((match = sitemapRegex.exec(sitemapContent)) !== null) {
  if (match[1] && !match[1].includes('http') && !match[1].includes('schema.org')) {
    links.add(match[1]);
  }
}

console.log(`Auditing ${links.size} total links across the application...`);

let missingPages = 0;
let emptyPages = 0;
let validPages = 0;

for (const link of links) {
  if (link === "/") {
    validPages++;
    continue;
  }

  const parts = link.split('/').filter(Boolean);
  const filePath = path.join(__dirname, '../src/app', ...parts, 'page.tsx');

  if (!fs.existsSync(filePath)) {
    console.error(`[404 MISSING ROUTE FILE]: ${link} -> ${filePath}`);
    missingPages++;
  } else {
    const fileStat = fs.statSync(filePath);
    if (fileStat.size < 50) {
      console.error(`[EMPTY PAGE CONTENT]: ${link}`);
      emptyPages++;
    } else {
      validPages++;
    }
  }
}

console.log("\n================ HEALTHOS ROUTE AUDIT SUMMARY ================");
console.log(`Total Routes Scanned: ${links.size}`);
console.log(`Valid Production Pages: ${validPages}`);
console.log(`Missing Page Files (404s): ${missingPages}`);
console.log(`Empty Page Files: ${emptyPages}`);
console.log("=================================================================\n");

if (missingPages > 0 || emptyPages > 0) {
  console.error("FAILED ROUTE AUDIT SCAN!");
  process.exit(1);
} else {
  console.log("ALL ROUTES VERIFIED 100% SUCCESSFUL!");
}
