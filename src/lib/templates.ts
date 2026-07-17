// ---------------------------------------------------------------------------
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

export const TEMPLATES: Template[] = [
  {
    "id": "aurora-veil",
    "slug": "aurora-veil",
    "title": "Aurora Veil",
    "description": "Slow-breathing aurora background loop.",
    "category": "background",
    "tags": "aurora,ambient",
    "tier": "PREMIUM",
    "featured": true,
    "views": 5622,
    "gradient": "linear-gradient(160deg,#052e16,#10b981)",
    "prompt": "Create a slow-breathing aurora background loop as a reusable full-screen backdrop.\nLayered conic/radial gradients in aurora tones that drift and shift hue over a long, seamless loop; faint grain on top.\nExpose it as a component you can drop behind any hero. Keep it GPU-light.\nMotion: 20–30s seamless loop; static fallback under reduced-motion. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-07-01T00:00:00.000Z"
  },
  {
    "id": "3d-story-hero",
    "slug": "3d-story-hero",
    "title": "3D Story Hero",
    "description": "Scroll-driven 3D storytelling hero section.",
    "category": "hero",
    "tags": "3d,scroll,story",
    "tier": "PREMIUM",
    "featured": true,
    "views": 5240,
    "gradient": "linear-gradient(135deg,#1d4ed8,#7c3aed)",
    "prompt": "Create a scroll-driven 3D storytelling hero for {product}.\nAs the user scrolls, a central 3D-feeling object (use layered transforms + perspective) rotates and the copy advances through 3 beats.\nEach beat: a short headline + one supporting line, pinned while the visual transforms.\nMotion: parallax depth, smooth easing, a progress indicator down the side. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-30T00:00:00.000Z"
  },
  {
    "id": "dreamcore-landing",
    "slug": "dreamcore-landing",
    "title": "Dreamcore Landing",
    "description": "A surreal, dreamy landing page with floating elements and soft motion.",
    "category": "landing",
    "tags": "dreamy,gradient,animated",
    "tier": "PREMIUM",
    "featured": true,
    "views": 4820,
    "gradient": "linear-gradient(135deg,#7c3aed,#db2777)",
    "prompt": "Design a surreal \"dreamcore\" landing page for {product}.\nMood: soft, hazy, otherworldly — pastel gradients that drift, blurred orbs floating on slow parallax, gentle grain.\nLayout: oversized dreamy headline that fades and rises on load, one line of subcopy, a single glowing CTA.\nMotion: elements breathe (scale 1→1.03 over 6s), orbs drift on independent loops, cursor casts a soft light.\nBuild it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-29T00:00:00.000Z"
  },
  {
    "id": "aetheris-voyage",
    "slug": "aetheris-voyage",
    "title": "Aetheris Voyage",
    "description": "Cosmic hero with drifting particles and depth.",
    "category": "hero",
    "tags": "space,particles",
    "tier": "PREMIUM",
    "featured": true,
    "views": 4470,
    "gradient": "linear-gradient(135deg,#0f172a,#6366f1)",
    "prompt": "Build a cosmic hero section called a \"voyage\" for {product}.\nDeep-space backdrop with drifting particles at multiple depths, a slow starfield, and a subtle nebula glow.\nCenter: a luminous headline that fades up, subcopy, and a CTA with a comet-trail hover effect.\nMotion: particles drift continuously; on load, stars twinkle in. Feels vast and calm. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-28T00:00:00.000Z"
  },
  {
    "id": "codercrest",
    "slug": "codercrest",
    "title": "CoderCrest",
    "description": "Developer-tool SaaS landing with animated terminal.",
    "category": "saas",
    "tags": "dev,dark,code",
    "tier": "PREMIUM",
    "featured": true,
    "views": 4110,
    "gradient": "linear-gradient(135deg,#111827,#4f46e5)",
    "prompt": "Build a developer-tool SaaS landing page with an animated terminal for {product}.\nHero: sharp value prop, a live-typing terminal that runs a short realistic command sequence on loop, install snippet with copy button.\nSections: feature grid with monospace accents, logo cloud, a \"how it works\" in 3 steps.\nDark, precise, developer-native. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-27T00:00:00.000Z"
  },
  {
    "id": "urban-jungle",
    "slug": "urban-jungle",
    "title": "Urban Jungle",
    "description": "Lush, organic landing page with parallax foliage.",
    "category": "landing",
    "tags": "nature,bold,green",
    "tier": "FREE",
    "featured": true,
    "views": 3910,
    "gradient": "linear-gradient(135deg,#065f46,#84cc16)",
    "prompt": "Create a lush, organic landing page for {product} with an \"urban jungle\" theme.\nPalette: deep forest green to lime. Layered foliage that moves on scroll parallax (3 depth layers).\nSections: hero with headline emerging from behind leaves, a 3-step \"how it works\", a leafy CTA band.\nMotion: leaves sway subtly, sunlight dapples across the hero, content reveals with a soft upward fade.\nBuild it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-26T00:00:00.000Z"
  },
  {
    "id": "3d-portfolio",
    "slug": "3d-portfolio",
    "title": "3D Portfolio",
    "description": "Interactive 3D cards showcasing your best work.",
    "category": "portfolio",
    "tags": "3d,showcase",
    "tier": "PREMIUM",
    "featured": true,
    "views": 3890,
    "gradient": "linear-gradient(135deg,#312e81,#7e22ce)",
    "prompt": "Build an interactive 3D portfolio grid for a creative pro.\nCards tilt toward the cursor (mouse-parallax), lift and cast a colored glow on hover, and reveal project title + tags.\nInclude a hero with the person's name in oversized type and a short bio line.\nMotion: staggered entrance, springy tilt, smooth shadow transitions. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-25T00:00:00.000Z"
  },
  {
    "id": "particle-drift",
    "slug": "particle-drift",
    "title": "Particle Drift",
    "description": "Subtle drifting particle field background.",
    "category": "background",
    "tags": "particles,subtle",
    "tier": "FREE",
    "featured": false,
    "views": 3440,
    "gradient": "linear-gradient(160deg,#0c0a09,#6d28d9)",
    "prompt": "Build a subtle drifting particle-field background component.\nSparse, soft particles slowly floating upward with gentle horizontal sway and depth (size + opacity variance).\nLow density for performance; sits behind content without stealing focus.\nMotion: continuous drift; pause + freeze under reduced-motion. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-24T00:00:00.000Z"
  },
  {
    "id": "synapse-dark-hero",
    "slug": "synapse-dark-hero",
    "title": "Synapse Dark Hero",
    "description": "AI SaaS hero with neural-glow animations.",
    "category": "saas",
    "tags": "ai,dark,glow",
    "tier": "PREMIUM",
    "featured": false,
    "views": 3350,
    "gradient": "linear-gradient(135deg,#020617,#8b5cf6)",
    "prompt": "Design an AI SaaS hero with a \"neural glow\" for {product}.\nDark canvas, an animated network of nodes/edges softly pulsing behind a luminous headline.\nCTA glows; a secondary \"watch demo\" ghost button. Add a trust row of metrics that count up on view.\nMotion: node pulses, edge shimmer, headline fade-up. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-23T00:00:00.000Z"
  },
  {
    "id": "retro-futurist",
    "slug": "retro-futurist",
    "title": "Retro-Futurist Hero",
    "description": "Synthwave sunset hero with animated grid horizon.",
    "category": "hero",
    "tags": "retro,synthwave",
    "tier": "FREE",
    "featured": false,
    "views": 3120,
    "gradient": "linear-gradient(135deg,#f59e0b,#ef4444)",
    "prompt": "Design a synthwave \"retro-futurist\" hero for {product}.\n80s sunset palette (magenta→orange), a perspective grid horizon that scrolls toward the viewer, a glowing sun.\nHeadline in chrome/outline style. Motion: grid moves infinitely, sun pulses, subtle VHS shimmer.\nAdd a single CTA and a thin scan-line overlay. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-22T00:00:00.000Z"
  },
  {
    "id": "pulse-fitness-app",
    "slug": "pulse-fitness-app",
    "title": "Pulse Fitness App",
    "description": "Mobile app promo page with device mockup motion.",
    "category": "app",
    "tags": "mobile,fitness",
    "tier": "FREE",
    "featured": true,
    "views": 2980,
    "gradient": "linear-gradient(135deg,#9f1239,#fb7185)",
    "prompt": "Build a mobile fitness app promo page for {app} with device-motion.\nHero with a phone mockup that floats and subtly rotates, screens cross-fading through key features.\nSections: 3 feature highlights with icons, App Store / Google Play badges, a metric strip.\nMotion: device float, screen transitions, animated progress rings. Energetic, health-forward. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-21T00:00:00.000Z"
  },
  {
    "id": "finlytic-ai",
    "slug": "finlytic-ai",
    "title": "Finlytic AI Agent",
    "description": "Fintech AI agent landing with animated charts.",
    "category": "saas",
    "tags": "fintech,ai,charts",
    "tier": "FREE",
    "featured": false,
    "views": 2870,
    "gradient": "linear-gradient(135deg,#065f46,#14b8a6)",
    "prompt": "Create a fintech \"AI agent\" landing page for {product} with animated charts.\nHero explaining the agent's outcome, plus a dashboard mock where a line chart draws itself and KPI tiles count up.\nSections: how the agent works (3 steps), security strip, pricing teaser.\nMotion: chart path animates on view, numbers roll, cards lift. Trustworthy and clean. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-20T00:00:00.000Z"
  },
  {
    "id": "neon-district",
    "slug": "neon-district",
    "title": "Neon District",
    "description": "Cyberpunk-inspired landing with glowing neon accents.",
    "category": "landing",
    "tags": "neon,cyberpunk,city",
    "tier": "PREMIUM",
    "featured": false,
    "views": 2707,
    "gradient": "linear-gradient(135deg,#0ea5e9,#d946ef)",
    "prompt": "Build a cyberpunk \"neon district\" landing page for {product}.\nLook: near-black city night, neon signage in cyan + magenta, wet-street reflections, faint scanlines.\nHero: glitching neon headline, animated flicker on one word, a neon-outlined CTA that pulses on hover.\nAdd a horizontal marquee of \"district\" tags and a grid of glowing feature cards.\nBuild it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-19T00:00:00.000Z"
  },
  {
    "id": "bold-portfolio",
    "slug": "bold-portfolio",
    "title": "Bold Portfolio Hero",
    "description": "Editorial-style portfolio with oversized type.",
    "category": "portfolio",
    "tags": "bold,editorial",
    "tier": "FREE",
    "featured": false,
    "views": 2540,
    "gradient": "linear-gradient(135deg,#be123c,#f97316)",
    "prompt": "Design an editorial, oversized-typography portfolio hero for a designer/creative.\nGiant name, a marquee of disciplines, and a few featured projects as full-bleed rows that slide in on scroll.\nMotion: type reveals line-by-line with a clip-path wipe; project rows parallax slightly. Confident and print-like. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-18T00:00:00.000Z"
  },
  {
    "id": "lux-storefront",
    "slug": "lux-storefront",
    "title": "Lux Storefront",
    "description": "Luxury e-commerce storefront with silky transitions.",
    "category": "ecommerce",
    "tags": "luxury,shop",
    "tier": "PREMIUM",
    "featured": false,
    "views": 2410,
    "gradient": "linear-gradient(135deg,#78350f,#d97706)",
    "prompt": "Design a luxury e-commerce storefront hero + product row for {brand}.\nRefined palette (espresso + gold), silky page transitions, generous spacing, serif display type.\nProduct cards with a slow zoom on hover and an elegant \"Add to bag\" reveal.\nMotion: cross-fades, parallax hero image, understated easing. Feels expensive. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-17T00:00:00.000Z"
  },
  {
    "id": "liquid-morph-hero",
    "slug": "liquid-morph-hero",
    "title": "Liquid Morph Hero",
    "description": "Morphing liquid blobs behind bold headline copy.",
    "category": "hero",
    "tags": "liquid,blob,morph",
    "tier": "FREE",
    "featured": false,
    "views": 2230,
    "gradient": "linear-gradient(135deg,#06b6d4,#3b82f6)",
    "prompt": "Create a hero with morphing liquid blobs behind bold headline copy for {product}.\n2–3 gradient blobs that continuously morph shape (animated border-radius) and slowly drift.\nHeadline sits crisp on top with high contrast; CTA has a gooey hover.\nMotion: blobs morph on independent 8–12s loops; reduce to a static gradient under reduced-motion. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-16T00:00:00.000Z"
  },
  {
    "id": "chainforge",
    "slug": "chainforge",
    "title": "ChainForge",
    "description": "Web3 protocol landing with orbiting token animation.",
    "category": "web3",
    "tags": "crypto,blockchain",
    "tier": "PREMIUM",
    "featured": false,
    "views": 2150,
    "gradient": "linear-gradient(135deg,#083344,#22d3ee)",
    "prompt": "Create a Web3 protocol landing page for {protocol} with an orbiting token animation.\nHero: a central token/logo with elements orbiting it on elliptical paths, glassy stat cards (TVL, chains, holders) that count up.\nSections: how it works, security/audit strip, docs CTA.\nMotion: continuous orbit, glow pulses, numbers roll. Modern and credible. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-15T00:00:00.000Z"
  },
  {
    "id": "testimonial-wall",
    "slug": "testimonial-wall",
    "title": "Testimonial Wall",
    "description": "Animated masonry wall of testimonials.",
    "category": "section",
    "tags": "social-proof,cards",
    "tier": "FREE",
    "featured": false,
    "views": 2020,
    "gradient": "linear-gradient(135deg,#3f3f46,#a1a1aa)",
    "prompt": "Design an animated masonry wall of testimonials as a drop-in section.\nCards of varied heights auto-scroll upward in columns at slightly different speeds (infinite loop, pauses on hover).\nEach card: quote, avatar, name, role. Include a short section header.\nMotion: continuous vertical marquee per column; reduced-motion = static grid. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-14T00:00:00.000Z"
  },
  {
    "id": "streetwear-drop",
    "slug": "streetwear-drop",
    "title": "Streetwear Drop",
    "description": "Hype drop page with countdown and marquee motion.",
    "category": "ecommerce",
    "tags": "fashion,drop,hype",
    "tier": "FREE",
    "featured": false,
    "views": 1990,
    "gradient": "linear-gradient(135deg,#18181b,#dc2626)",
    "prompt": "Build a hype streetwear \"drop\" page for {brand} with a countdown and marquee.\nBold, high-contrast, oversized type. A live countdown to the drop, a scrolling hype marquee, and a \"notify me\" capture.\nMotion: marquee scroll, countdown flip, a strobe-free flash on the CTA. Energetic and loud. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-13T00:00:00.000Z"
  },
  {
    "id": "minimal-mono",
    "slug": "minimal-mono",
    "title": "Minimal Mono",
    "description": "Ultra-minimal monochrome landing driven by typography.",
    "category": "landing",
    "tags": "minimal,typography",
    "tier": "FREE",
    "featured": false,
    "views": 1980,
    "gradient": "linear-gradient(135deg,#374151,#111827)",
    "prompt": "Design an ultra-minimal monochrome landing page for {product}, driven entirely by typography.\nNo color except one accent. Massive type scale, generous whitespace, a thin animated underline that draws in.\nMotion: text sets in with a staggered character reveal; a single horizontal rule animates across on scroll.\nKeep it razor-sharp and editorial. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-12T00:00:00.000Z"
  },
  {
    "id": "pricing-glass",
    "slug": "pricing-glass",
    "title": "Glass Pricing",
    "description": "Glassmorphism pricing section with hover glow.",
    "category": "section",
    "tags": "pricing,glass",
    "tier": "PREMIUM",
    "featured": false,
    "views": 1810,
    "gradient": "linear-gradient(135deg,#164e63,#67e8f9)",
    "prompt": "Build a glassmorphism pricing section with three tiers.\nFrosted-glass cards over a soft gradient glow, the recommended tier lifted and outlined, a monthly/annual toggle that animates.\nEach card: price, feature list with animated check-ins, CTA with hover glow.\nMotion: toggle slide, card hover lift, check reveals. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-11T00:00:00.000Z"
  },
  {
    "id": "gallery-flow",
    "slug": "gallery-flow",
    "title": "Gallery Flow",
    "description": "Smooth-scrolling image gallery portfolio.",
    "category": "portfolio",
    "tags": "gallery,smooth",
    "tier": "FREE",
    "featured": false,
    "views": 1720,
    "gradient": "linear-gradient(135deg,#0d9488,#0ea5e9)",
    "prompt": "Create a smooth-scrolling image gallery portfolio for a photographer/artist.\nHorizontal or masonry flow with buttery momentum scrolling, images that scale up gently as they enter the viewport.\nInclude a minimal hero and lightbox on click.\nMotion: parallax on images, fade-scale entrances, elegant cursor. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-10T00:00:00.000Z"
  },
  {
    "id": "nft-nebula",
    "slug": "nft-nebula",
    "title": "NFT Nebula",
    "description": "NFT collection page with nebula backdrop.",
    "category": "web3",
    "tags": "nft,gallery,space",
    "tier": "FREE",
    "featured": false,
    "views": 1660,
    "gradient": "linear-gradient(135deg,#4c1d95,#ec4899)",
    "prompt": "Design an NFT collection landing page for {collection} with a nebula backdrop.\nAnimated nebula gradient background, a floating grid of NFT cards that gently bob, mint counter, and a \"mint\" CTA.\nSections: roadmap timeline, rarity teaser.\nMotion: nebula drifts, cards bob on offset loops, CTA shimmer. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-09T00:00:00.000Z"
  },
  {
    "id": "notely-app",
    "slug": "notely-app",
    "title": "Notely App",
    "description": "Clean productivity app landing with feature reveals.",
    "category": "app",
    "tags": "productivity,clean",
    "tier": "PREMIUM",
    "featured": false,
    "views": 1450,
    "gradient": "linear-gradient(135deg,#1e3a8a,#60a5fa)",
    "prompt": "Create a clean productivity app landing page for {app} with feature reveals.\nCalm palette, a hero with a crisp product screenshot, and feature sections that reveal as you scroll (image + copy alternating).\nMotion: soft parallax on the screenshot, staggered reveals, a checklist that ticks itself.\nMinimal, focused, friendly. Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.",
    "animationCode": "",
    "previewVideo": "",
    "createdAt": "2026-06-08T00:00:00.000Z"
  }
];

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
