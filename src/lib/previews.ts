// Maps each template to an original animated-preview style. All animations are
// hand-built CSS (see globals.css + AnimatedPreview.tsx) — nothing copied.

export type AnimKind =
  | "aurora"
  | "particles"
  | "neon"
  | "liquid"
  | "grid"
  | "terminal"
  | "orbit"
  | "device"
  | "marquee"
  | "glass"
  | "tilt3d"
  | "foliage"
  | "mono"
  | "chart";

const BY_SLUG: Record<string, AnimKind> = {
  "dreamcore-landing": "liquid",
  "urban-jungle": "foliage",
  "neon-district": "neon",
  "minimal-mono": "mono",
  "3d-story-hero": "tilt3d",
  "aetheris-voyage": "particles",
  "retro-futurist": "grid",
  "liquid-morph-hero": "liquid",
  "3d-portfolio": "tilt3d",
  "bold-portfolio": "marquee",
  "gallery-flow": "tilt3d",
  codercrest: "terminal",
  "synapse-dark-hero": "orbit",
  "finlytic-ai": "chart",
  "lux-storefront": "glass",
  "streetwear-drop": "marquee",
  chainforge: "orbit",
  "nft-nebula": "particles",
  "pulse-fitness-app": "device",
  "notely-app": "device",
  "testimonial-wall": "marquee",
  "pricing-glass": "glass",
  "aurora-veil": "aurora",
  "particle-drift": "particles",
};

const BY_CATEGORY: Record<string, AnimKind> = {
  landing: "liquid",
  hero: "particles",
  portfolio: "tilt3d",
  saas: "terminal",
  ecommerce: "glass",
  web3: "orbit",
  app: "device",
  section: "marquee",
  background: "aurora",
};

export function animKind(slug: string, category: string): AnimKind {
  return BY_SLUG[slug] ?? BY_CATEGORY[category] ?? "particles";
}
