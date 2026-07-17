// One-off: dump the local DB into a static TS file so the app needs no database.
import { PrismaClient } from "@prisma/client";
import { writeFileSync } from "fs";

const prisma = new PrismaClient();
const rows = await prisma.template.findMany({ orderBy: { views: "desc" } });

const BASE = Date.parse("2026-07-01T00:00:00Z");
const DAY = 86400000;

const data = rows.map((t, i) => ({
  id: t.slug,
  slug: t.slug,
  title: t.title,
  description: t.description,
  category: t.category,
  tags: t.tags,
  tier: t.tier,
  featured: t.featured,
  views: t.views,
  gradient: t.gradient,
  prompt: t.prompt,
  animationCode: "",
  previewVideo: "",
  createdAt: new Date(BASE - i * DAY).toISOString(),
}));

const header = `// ---------------------------------------------------------------------------
// AUTO-GENERATED static template data — the app reads this instead of a DB,
// so it deploys anywhere (Vercel) with zero database setup.
// Source of truth for content: prisma/seed.mjs + prisma/prompts.mjs.
// Regenerate with: node scripts/gen-static.mjs
// ---------------------------------------------------------------------------

export type Template = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  tier: "FREE" | "PREMIUM";
  featured: boolean;
  views: number;
  gradient: string;
  prompt: string;
  animationCode: string;
  previewVideo: string;
  createdAt: string;
};

export const TEMPLATES: Template[] = ${JSON.stringify(data, null, 2)};

export function getAllTemplates(): Template[] {
  return TEMPLATES;
}

export function getTemplate(slug: string): Template | undefined {
  return TEMPLATES.find((t) => t.slug === slug);
}

export function relatedTemplates(slug: string, category: string, n = 3): Template[] {
  return TEMPLATES.filter((t) => t.category === category && t.slug !== slug)
    .sort((a, b) => b.views - a.views)
    .slice(0, n);
}

export const PALETTE_ITEMS = TEMPLATES.map((t) => ({
  slug: t.slug,
  title: t.title,
  category: t.category,
  tags: t.tags,
  tier: t.tier,
}));
`;

writeFileSync("src/lib/templates.ts", header);
console.log(`Wrote src/lib/templates.ts with ${data.length} templates.`);
await prisma.$disconnect();
