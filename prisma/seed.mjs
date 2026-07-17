import { PrismaClient } from "@prisma/client";
import { PROMPTS } from "./prompts.mjs";

const prisma = new PrismaClient();

// Original copy-paste prompts live in prompts.mjs (keyed by slug).
const g = (a, b, deg = 135) => `linear-gradient(${deg}deg,${a},${b})`;

const templates = [
  // landing pages
  { slug: "dreamcore-landing", title: "Dreamcore Landing", category: "landing", tier: "PREMIUM", featured: true,  views: 4820, tags: "dreamy,gradient,animated", gradient: g("#7c3aed", "#db2777"), description: "A surreal, dreamy landing page with floating elements and soft motion." },
  { slug: "urban-jungle",      title: "Urban Jungle",      category: "landing", tier: "FREE",    featured: true,  views: 3910, tags: "nature,bold,green",      gradient: g("#065f46", "#84cc16"), description: "Lush, organic landing page with parallax foliage." },
  { slug: "neon-district",     title: "Neon District",     category: "landing", tier: "PREMIUM", featured: false, views: 2705, tags: "neon,cyberpunk,city",    gradient: g("#0ea5e9", "#d946ef"), description: "Cyberpunk-inspired landing with glowing neon accents." },
  { slug: "minimal-mono",      title: "Minimal Mono",      category: "landing", tier: "FREE",    featured: false, views: 1980, tags: "minimal,typography",     gradient: g("#374151", "#111827"), description: "Ultra-minimal monochrome landing driven by typography." },

  // hero sections
  { slug: "3d-story-hero",     title: "3D Story Hero",       category: "hero", tier: "PREMIUM", featured: true,  views: 5240, tags: "3d,scroll,story",       gradient: g("#1d4ed8", "#7c3aed"), description: "Scroll-driven 3D storytelling hero section." },
  { slug: "aetheris-voyage",   title: "Aetheris Voyage",     category: "hero", tier: "PREMIUM", featured: true,  views: 4470, tags: "space,particles",       gradient: g("#0f172a", "#6366f1"), description: "Cosmic hero with drifting particles and depth." },
  { slug: "retro-futurist",    title: "Retro-Futurist Hero", category: "hero", tier: "FREE",    featured: false, views: 3120, tags: "retro,synthwave",       gradient: g("#f59e0b", "#ef4444"), description: "Synthwave sunset hero with animated grid horizon." },
  { slug: "liquid-morph-hero", title: "Liquid Morph Hero",   category: "hero", tier: "FREE",    featured: false, views: 2230, tags: "liquid,blob,morph",     gradient: g("#06b6d4", "#3b82f6"), description: "Morphing liquid blobs behind bold headline copy." },

  // portfolios
  { slug: "3d-portfolio",      title: "3D Portfolio",        category: "portfolio", tier: "PREMIUM", featured: true,  views: 3890, tags: "3d,showcase",       gradient: g("#312e81", "#7e22ce"), description: "Interactive 3D cards showcasing your best work." },
  { slug: "bold-portfolio",    title: "Bold Portfolio Hero", category: "portfolio", tier: "FREE",    featured: false, views: 2540, tags: "bold,editorial",     gradient: g("#be123c", "#f97316"), description: "Editorial-style portfolio with oversized type." },
  { slug: "gallery-flow",      title: "Gallery Flow",        category: "portfolio", tier: "FREE",    featured: false, views: 1720, tags: "gallery,smooth",     gradient: g("#0d9488", "#0ea5e9"), description: "Smooth-scrolling image gallery portfolio." },

  // saas
  { slug: "codercrest",        title: "CoderCrest",          category: "saas", tier: "PREMIUM", featured: true,  views: 4110, tags: "dev,dark,code",         gradient: g("#111827", "#4f46e5"), description: "Developer-tool SaaS landing with animated terminal." },
  { slug: "synapse-dark-hero", title: "Synapse Dark Hero",   category: "saas", tier: "PREMIUM", featured: false, views: 3350, tags: "ai,dark,glow",          gradient: g("#020617", "#8b5cf6"), description: "AI SaaS hero with neural-glow animations." },
  { slug: "finlytic-ai",       title: "Finlytic AI Agent",   category: "saas", tier: "FREE",    featured: false, views: 2870, tags: "fintech,ai,charts",     gradient: g("#065f46", "#14b8a6"), description: "Fintech AI agent landing with animated charts." },

  // ecommerce
  { slug: "lux-storefront",    title: "Lux Storefront",      category: "ecommerce", tier: "PREMIUM", featured: false, views: 2410, tags: "luxury,shop",       gradient: g("#78350f", "#d97706"), description: "Luxury e-commerce storefront with silky transitions." },
  { slug: "streetwear-drop",   title: "Streetwear Drop",     category: "ecommerce", tier: "FREE",    featured: false, views: 1990, tags: "fashion,drop,hype",  gradient: g("#18181b", "#dc2626"), description: "Hype drop page with countdown and marquee motion." },

  // web3
  { slug: "chainforge",        title: "ChainForge",          category: "web3", tier: "PREMIUM", featured: false, views: 2150, tags: "crypto,blockchain",     gradient: g("#083344", "#22d3ee"), description: "Web3 protocol landing with orbiting token animation." },
  { slug: "nft-nebula",        title: "NFT Nebula",          category: "web3", tier: "FREE",    featured: false, views: 1660, tags: "nft,gallery,space",     gradient: g("#4c1d95", "#ec4899"), description: "NFT collection page with nebula backdrop." },

  // apps
  { slug: "pulse-fitness-app", title: "Pulse Fitness App",   category: "app", tier: "FREE",    featured: true,  views: 2980, tags: "mobile,fitness",        gradient: g("#9f1239", "#fb7185"), description: "Mobile app promo page with device mockup motion." },
  { slug: "notely-app",        title: "Notely App",          category: "app", tier: "PREMIUM", featured: false, views: 1450, tags: "productivity,clean",     gradient: g("#1e3a8a", "#60a5fa"), description: "Clean productivity app landing with feature reveals." },

  // sections
  { slug: "testimonial-wall",  title: "Testimonial Wall",    category: "section", tier: "FREE",    featured: false, views: 2020, tags: "social-proof,cards", gradient: g("#3f3f46", "#a1a1aa"), description: "Animated masonry wall of testimonials." },
  { slug: "pricing-glass",     title: "Glass Pricing",       category: "section", tier: "PREMIUM", featured: false, views: 1810, tags: "pricing,glass",      gradient: g("#164e63", "#67e8f9"), description: "Glassmorphism pricing section with hover glow." },

  // backgrounds
  { slug: "aurora-veil",       title: "Aurora Veil",         category: "background", tier: "PREMIUM", featured: true,  views: 5620, tags: "aurora,ambient",   gradient: g("#052e16", "#10b981", 160), description: "Slow-breathing aurora background loop." },
  { slug: "particle-drift",    title: "Particle Drift",      category: "background", tier: "FREE",    featured: false, views: 3440, tags: "particles,subtle", gradient: g("#0c0a09", "#6d28d9", 160), description: "Subtle drifting particle field background." },
];

async function main() {
  for (const t of templates) {
    const prompt = PROMPTS[t.slug] ?? "";
    const data = { ...t, prompt };
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: data, // refresh existing rows too (fills in prompts)
      create: data,
    });
  }
  const filled = templates.filter((t) => PROMPTS[t.slug]).length;
  console.log(`Seeded ${templates.length} templates (${filled} with prompts).`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
