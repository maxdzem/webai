// ---------------------------------------------------------------------------
// Motion Web — original copy-paste generation prompts.
//
// Every prompt below is ORIGINAL, written for Motion Web and free to use
// (CC0). Nothing is scraped or copied from any paid or closed source. Each one
// is tuned to generate the specific animated page its template represents.
// Drop them into an AI builder (v0, Claude, Cursor, etc.).
// ---------------------------------------------------------------------------

const STACK =
  "Build it as a single React + TypeScript page using Tailwind CSS and Framer Motion. " +
  "No external UI kit. Respect prefers-reduced-motion. Ship clean, responsive, accessible code.";

export const PROMPTS = {
  "dreamcore-landing": `Design a surreal "dreamcore" landing page for {product}.
Mood: soft, hazy, otherworldly — pastel gradients that drift, blurred orbs floating on slow parallax, gentle grain.
Layout: oversized dreamy headline that fades and rises on load, one line of subcopy, a single glowing CTA.
Motion: elements breathe (scale 1→1.03 over 6s), orbs drift on independent loops, cursor casts a soft light.
${STACK}`,

  "urban-jungle": `Create a lush, organic landing page for {product} with an "urban jungle" theme.
Palette: deep forest green to lime. Layered foliage that moves on scroll parallax (3 depth layers).
Sections: hero with headline emerging from behind leaves, a 3-step "how it works", a leafy CTA band.
Motion: leaves sway subtly, sunlight dapples across the hero, content reveals with a soft upward fade.
${STACK}`,

  "neon-district": `Build a cyberpunk "neon district" landing page for {product}.
Look: near-black city night, neon signage in cyan + magenta, wet-street reflections, faint scanlines.
Hero: glitching neon headline, animated flicker on one word, a neon-outlined CTA that pulses on hover.
Add a horizontal marquee of "district" tags and a grid of glowing feature cards.
${STACK}`,

  "minimal-mono": `Design an ultra-minimal monochrome landing page for {product}, driven entirely by typography.
No color except one accent. Massive type scale, generous whitespace, a thin animated underline that draws in.
Motion: text sets in with a staggered character reveal; a single horizontal rule animates across on scroll.
Keep it razor-sharp and editorial. ${STACK}`,

  "3d-story-hero": `Create a scroll-driven 3D storytelling hero for {product}.
As the user scrolls, a central 3D-feeling object (use layered transforms + perspective) rotates and the copy advances through 3 beats.
Each beat: a short headline + one supporting line, pinned while the visual transforms.
Motion: parallax depth, smooth easing, a progress indicator down the side. ${STACK}`,

  "aetheris-voyage": `Build a cosmic hero section called a "voyage" for {product}.
Deep-space backdrop with drifting particles at multiple depths, a slow starfield, and a subtle nebula glow.
Center: a luminous headline that fades up, subcopy, and a CTA with a comet-trail hover effect.
Motion: particles drift continuously; on load, stars twinkle in. Feels vast and calm. ${STACK}`,

  "retro-futurist": `Design a synthwave "retro-futurist" hero for {product}.
80s sunset palette (magenta→orange), a perspective grid horizon that scrolls toward the viewer, a glowing sun.
Headline in chrome/outline style. Motion: grid moves infinitely, sun pulses, subtle VHS shimmer.
Add a single CTA and a thin scan-line overlay. ${STACK}`,

  "liquid-morph-hero": `Create a hero with morphing liquid blobs behind bold headline copy for {product}.
2–3 gradient blobs that continuously morph shape (animated border-radius) and slowly drift.
Headline sits crisp on top with high contrast; CTA has a gooey hover.
Motion: blobs morph on independent 8–12s loops; reduce to a static gradient under reduced-motion. ${STACK}`,

  "3d-portfolio": `Build an interactive 3D portfolio grid for a creative pro.
Cards tilt toward the cursor (mouse-parallax), lift and cast a colored glow on hover, and reveal project title + tags.
Include a hero with the person's name in oversized type and a short bio line.
Motion: staggered entrance, springy tilt, smooth shadow transitions. ${STACK}`,

  "bold-portfolio": `Design an editorial, oversized-typography portfolio hero for a designer/creative.
Giant name, a marquee of disciplines, and a few featured projects as full-bleed rows that slide in on scroll.
Motion: type reveals line-by-line with a clip-path wipe; project rows parallax slightly. Confident and print-like. ${STACK}`,

  "gallery-flow": `Create a smooth-scrolling image gallery portfolio for a photographer/artist.
Horizontal or masonry flow with buttery momentum scrolling, images that scale up gently as they enter the viewport.
Include a minimal hero and lightbox on click.
Motion: parallax on images, fade-scale entrances, elegant cursor. ${STACK}`,

  codercrest: `Build a developer-tool SaaS landing page with an animated terminal for {product}.
Hero: sharp value prop, a live-typing terminal that runs a short realistic command sequence on loop, install snippet with copy button.
Sections: feature grid with monospace accents, logo cloud, a "how it works" in 3 steps.
Dark, precise, developer-native. ${STACK}`,

  "synapse-dark-hero": `Design an AI SaaS hero with a "neural glow" for {product}.
Dark canvas, an animated network of nodes/edges softly pulsing behind a luminous headline.
CTA glows; a secondary "watch demo" ghost button. Add a trust row of metrics that count up on view.
Motion: node pulses, edge shimmer, headline fade-up. ${STACK}`,

  "finlytic-ai": `Create a fintech "AI agent" landing page for {product} with animated charts.
Hero explaining the agent's outcome, plus a dashboard mock where a line chart draws itself and KPI tiles count up.
Sections: how the agent works (3 steps), security strip, pricing teaser.
Motion: chart path animates on view, numbers roll, cards lift. Trustworthy and clean. ${STACK}`,

  "lux-storefront": `Design a luxury e-commerce storefront hero + product row for {brand}.
Refined palette (espresso + gold), silky page transitions, generous spacing, serif display type.
Product cards with a slow zoom on hover and an elegant "Add to bag" reveal.
Motion: cross-fades, parallax hero image, understated easing. Feels expensive. ${STACK}`,

  "streetwear-drop": `Build a hype streetwear "drop" page for {brand} with a countdown and marquee.
Bold, high-contrast, oversized type. A live countdown to the drop, a scrolling hype marquee, and a "notify me" capture.
Motion: marquee scroll, countdown flip, a strobe-free flash on the CTA. Energetic and loud. ${STACK}`,

  chainforge: `Create a Web3 protocol landing page for {protocol} with an orbiting token animation.
Hero: a central token/logo with elements orbiting it on elliptical paths, glassy stat cards (TVL, chains, holders) that count up.
Sections: how it works, security/audit strip, docs CTA.
Motion: continuous orbit, glow pulses, numbers roll. Modern and credible. ${STACK}`,

  "nft-nebula": `Design an NFT collection landing page for {collection} with a nebula backdrop.
Animated nebula gradient background, a floating grid of NFT cards that gently bob, mint counter, and a "mint" CTA.
Sections: roadmap timeline, rarity teaser.
Motion: nebula drifts, cards bob on offset loops, CTA shimmer. ${STACK}`,

  "pulse-fitness-app": `Build a mobile fitness app promo page for {app} with device-motion.
Hero with a phone mockup that floats and subtly rotates, screens cross-fading through key features.
Sections: 3 feature highlights with icons, App Store / Google Play badges, a metric strip.
Motion: device float, screen transitions, animated progress rings. Energetic, health-forward. ${STACK}`,

  "notely-app": `Create a clean productivity app landing page for {app} with feature reveals.
Calm palette, a hero with a crisp product screenshot, and feature sections that reveal as you scroll (image + copy alternating).
Motion: soft parallax on the screenshot, staggered reveals, a checklist that ticks itself.
Minimal, focused, friendly. ${STACK}`,

  "testimonial-wall": `Design an animated masonry wall of testimonials as a drop-in section.
Cards of varied heights auto-scroll upward in columns at slightly different speeds (infinite loop, pauses on hover).
Each card: quote, avatar, name, role. Include a short section header.
Motion: continuous vertical marquee per column; reduced-motion = static grid. ${STACK}`,

  "pricing-glass": `Build a glassmorphism pricing section with three tiers.
Frosted-glass cards over a soft gradient glow, the recommended tier lifted and outlined, a monthly/annual toggle that animates.
Each card: price, feature list with animated check-ins, CTA with hover glow.
Motion: toggle slide, card hover lift, check reveals. ${STACK}`,

  "aurora-veil": `Create a slow-breathing aurora background loop as a reusable full-screen backdrop.
Layered conic/radial gradients in aurora tones that drift and shift hue over a long, seamless loop; faint grain on top.
Expose it as a component you can drop behind any hero. Keep it GPU-light.
Motion: 20–30s seamless loop; static fallback under reduced-motion. ${STACK}`,

  "particle-drift": `Build a subtle drifting particle-field background component.
Sparse, soft particles slowly floating upward with gentle horizontal sway and depth (size + opacity variance).
Low density for performance; sits behind content without stealing focus.
Motion: continuous drift; pause + freeze under reduced-motion. ${STACK}`,
};
