// ---------------------------------------------------------------------------
// webai — prompt data model + seed library
//
// Every prompt here is ORIGINAL, authored for webai and released under an
// open license (CC0 / MIT / CC-BY-4.0). Nothing is scraped from paid or
// closed sources. Community submissions must declare a compatible license.
// ---------------------------------------------------------------------------

export type License = "CC0-1.0" | "MIT" | "CC-BY-4.0";

export type Prompt = {
  slug: string;
  title: string;
  summary: string;
  /** The actual prompt text users copy. */
  body: string;
  category: string;
  tags: string[];
  /** Models this prompt was tuned for / works well with. */
  models: string[];
  license: License;
  author: string;
  likes: number;
  /** ISO date */
  createdAt: string;
};

export type Category = {
  id: string;
  label: string;
  emoji: string;
  blurb: string;
};

export const CATEGORIES: Category[] = [
  { id: "ui", label: "UI Generation", emoji: "🧩", blurb: "Components, screens & design systems" },
  { id: "landing", label: "Landing Pages", emoji: "🚀", blurb: "Hero sections, marketing sites, CTAs" },
  { id: "agents", label: "Agents", emoji: "🤖", blurb: "System prompts, tool use, orchestration" },
  { id: "coding", label: "Coding", emoji: "⌨️", blurb: "Refactors, reviews, tests, debugging" },
  { id: "writing", label: "Writing", emoji: "✍️", blurb: "Copy, docs, emails, storytelling" },
  { id: "data", label: "Data & Analysis", emoji: "📊", blurb: "SQL, extraction, summaries, charts" },
  { id: "design", label: "Design", emoji: "🎨", blurb: "Art direction, motion, brand systems" },
  { id: "marketing", label: "Marketing", emoji: "📣", blurb: "Ads, SEO, growth, social" },
];

export const PROMPTS: Prompt[] = [
  {
    slug: "product-hero-section",
    title: "High-converting product hero section",
    summary: "Generate a modern SaaS hero with headline, subcopy, dual CTAs and a device mockup.",
    body: `You are a senior product designer and conversion copywriter.
Design a hero section for a {product_type} called "{product_name}".

Requirements:
- A punchy headline (max 8 words) that names the core outcome, not the feature.
- One line of subcopy (max 20 words) that removes the biggest objection.
- A primary CTA ("{primary_cta}") and a secondary, lower-commitment CTA.
- A visual concept: describe a device/app mockup or abstract graphic that reinforces the value.
- Suggest a 3-item trust row (logos, metric, or testimonial snippet).

Output as structured sections with 2 alternative headline options. Keep the tone {tone}.`,
    category: "landing",
    tags: ["hero", "conversion", "saas", "copywriting"],
    models: ["claude-opus-4-8", "claude-sonnet-5", "gpt-4o"],
    license: "CC0-1.0",
    author: "webai",
    likes: 428,
    createdAt: "2026-05-02",
  },
  {
    slug: "react-component-from-description",
    title: "React component from a plain-English spec",
    summary: "Turn a one-paragraph description into a clean, accessible, typed React + Tailwind component.",
    body: `Build a single React component in TypeScript styled with Tailwind CSS.

Spec: {describe the component}

Constraints:
- Function component, no external UI libraries.
- Fully typed props with sensible defaults.
- Accessible: correct roles, keyboard support, focus states, aria labels.
- Responsive from 320px up.
- No inline styles; Tailwind utilities only.
- Include a short usage example at the bottom.

Return only the code in one block, then a 2-line note on trade-offs.`,
    category: "ui",
    tags: ["react", "tailwind", "typescript", "a11y"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "MIT",
    author: "webai",
    likes: 611,
    createdAt: "2026-06-11",
  },
  {
    slug: "design-system-tokens",
    title: "Generate a design-token system",
    summary: "Produce a coherent color, spacing, type and radius token set from a brand vibe.",
    body: `Act as a design systems engineer. Given the brand vibe "{vibe}" and primary color {hex},
produce a complete token set as CSS custom properties:

- 11-step neutral ramp + a 9-step accent ramp derived from the primary.
- Semantic tokens (bg, surface, border, text, text-muted, accent, success, warning, danger).
- A modular type scale (min 6 steps) with line-heights.
- Spacing scale (4pt grid) and radius scale.
- One light and one dark theme mapping.

Explain each semantic choice in one line. Ensure WCAG AA contrast for text tokens.`,
    category: "design",
    tags: ["design-system", "tokens", "css", "theming"],
    models: ["claude-opus-4-8", "gpt-4o"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 289,
    createdAt: "2026-04-19",
  },
  {
    slug: "agent-system-prompt-scaffold",
    title: "Robust agent system-prompt scaffold",
    summary: "A battle-tested skeleton for tool-using agents: role, boundaries, tools, output contract.",
    body: `Write a system prompt for an autonomous agent named {agent_name} whose job is: {job}.

Include these sections explicitly:
1. Identity & scope — what it is, what it must never do.
2. Operating principles — how it decides, when it asks vs. acts.
3. Tools — for each tool: name, when to use, when NOT to use, failure handling.
4. Output contract — exact format the agent must return.
5. Safety rails — refusal triggers and escalation path.

Keep it declarative and unambiguous. Prefer short imperative sentences over prose.`,
    category: "agents",
    tags: ["system-prompt", "tools", "orchestration"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "CC0-1.0",
    author: "webai",
    likes: 507,
    createdAt: "2026-06-28",
  },
  {
    slug: "code-review-adversarial",
    title: "Adversarial code review",
    summary: "Find real bugs, not style nits — with a concrete failing scenario for each finding.",
    body: `Review the following diff as a skeptical senior engineer trying to break it.

For each issue you report, you MUST provide:
- Severity (blocker / high / medium).
- A concrete input or state that triggers the wrong behavior.
- The exact line(s) responsible.
- The minimal fix.

Ignore formatting and naming. If you cannot construct a failing scenario, do not report it.
End with a one-line verdict: safe to merge or not.

Diff:
{paste diff}`,
    category: "coding",
    tags: ["review", "bugs", "quality"],
    models: ["claude-opus-4-8"],
    license: "MIT",
    author: "webai",
    likes: 733,
    createdAt: "2026-07-01",
  },
  {
    slug: "sql-from-question",
    title: "Natural-language to SQL (safe)",
    summary: "Translate a business question into a parameterized, read-only SQL query with an explanation.",
    body: `You are a careful analytics engineer. Given this schema:
{paste schema}

Answer the question: "{question}"

Rules:
- SELECT-only. Never mutate.
- Use explicit JOINs and column names, never SELECT *.
- Parameterize any user value as :named placeholders.
- Add a LIMIT unless an aggregate makes it unnecessary.
- Below the query, explain in plain English what it returns and one edge case to watch.`,
    category: "data",
    tags: ["sql", "analytics", "nl2sql"],
    models: ["claude-sonnet-5", "gpt-4o"],
    license: "CC0-1.0",
    author: "webai",
    likes: 356,
    createdAt: "2026-05-24",
  },
  {
    slug: "landing-page-full",
    title: "Full landing page, section by section",
    summary: "Plan and write every section of a landing page with copy and layout notes.",
    body: `Plan a complete landing page for {product} targeting {audience}.

Produce these sections in order, each with (a) layout note and (b) final copy:
1. Nav + hero
2. Social proof strip
3. Problem → agitation
4. Solution / how it works (3 steps)
5. Feature highlights (3)
6. Objection handling / FAQ (4 Q&A)
7. Pricing framing
8. Final CTA

Voice: {voice}. Reading level: 7th grade. No buzzwords, no "revolutionary".`,
    category: "landing",
    tags: ["landing", "copywriting", "structure"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 402,
    createdAt: "2026-06-02",
  },
  {
    slug: "refactor-to-testable",
    title: "Refactor toward testability",
    summary: "Untangle a function into pure, testable units without changing behavior.",
    body: `Refactor the following code so it is easy to unit test, WITHOUT changing observable behavior.

Steps:
- Identify side effects and I/O; push them to the edges.
- Extract pure functions for the core logic.
- Inject dependencies instead of importing them directly.
- Keep the public signature stable (or note any required change).

Return: the refactored code, then 4-6 unit tests covering happy path and edge cases.

Code:
{paste code}`,
    category: "coding",
    tags: ["refactor", "testing", "clean-code"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "MIT",
    author: "webai",
    likes: 298,
    createdAt: "2026-06-15",
  },
  {
    slug: "cold-email-that-replies",
    title: "Cold email people actually reply to",
    summary: "A short, specific, non-salesy outreach email built around one relevant trigger.",
    body: `Write a cold email from {sender_role} to {recipient_role} at {company}.

Structure:
- Subject: max 5 words, lowercase, curiosity or specificity.
- Line 1: a specific, recent, true observation about them (the trigger).
- Line 2: the one problem you solve, phrased as their outcome.
- Line 3: soft proof (one number or one comparable customer).
- Ask: a single low-friction question, not a meeting demand.

Under 90 words. No adjectives like "innovative". Sound like a human who did their homework.`,
    category: "marketing",
    tags: ["cold-email", "outreach", "sales"],
    models: ["claude-sonnet-5", "gpt-4o"],
    license: "CC0-1.0",
    author: "webai",
    likes: 341,
    createdAt: "2026-05-09",
  },
  {
    slug: "dashboard-layout",
    title: "Analytics dashboard layout",
    summary: "Design an information-dense but scannable dashboard with the right chart per metric.",
    body: `Design an analytics dashboard for {role} who needs to answer: {top 3 questions}.

Deliver:
- A grid layout (describe rows/columns and what sits where and why).
- For each of the 3 questions, the single best chart type and the exact metric.
- A KPI header row (max 4 tiles) with the format of each number.
- Empty, loading and error states for one representative widget.
- What to deliberately leave OUT to avoid noise.

Favor clarity over completeness. Explain the hierarchy in 2 sentences.`,
    category: "ui",
    tags: ["dashboard", "dataviz", "layout"],
    models: ["claude-opus-4-8"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 264,
    createdAt: "2026-06-20",
  },
  {
    slug: "explain-like-staff-engineer",
    title: "Explain a codebase like a staff engineer",
    summary: "Get an accurate mental model of unfamiliar code: entry points, data flow, gotchas.",
    body: `You are onboarding me to this codebase. Given the files below, produce:

1. One-paragraph "what this does" for a new engineer.
2. The main entry point(s) and the request/data flow through the system.
3. The 3-5 files I should read first, in order, with why.
4. Non-obvious invariants or gotchas that would bite a newcomer.
5. One diagram in Mermaid showing the core flow.

Be concrete and cite file names. Say "unclear from the given code" rather than guessing.

Files:
{paste files or tree}`,
    category: "coding",
    tags: ["onboarding", "architecture", "docs"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "MIT",
    author: "webai",
    likes: 389,
    createdAt: "2026-07-05",
  },
  {
    slug: "brand-voice-guide",
    title: "Define a brand voice in one page",
    summary: "Turn a vague vibe into a usable voice guide with do/don't examples.",
    body: `Create a one-page brand voice guide for {brand}, which sells {what} to {who}.

Include:
- 3 voice attributes (e.g. "direct, warm, a little playful"), each with a one-line definition.
- For each attribute: a "we say / we don't say" pair using a real sentence.
- Vocabulary: 6 words we use, 6 words we avoid.
- How the voice shifts in 3 contexts: onboarding, error messages, billing.

Keep it practical enough that a new writer could match it today.`,
    category: "writing",
    tags: ["brand", "voice", "content"],
    models: ["claude-sonnet-5", "gpt-4o"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 217,
    createdAt: "2026-04-28",
  },
  {
    slug: "extract-structured-json",
    title: "Extract clean structured JSON from messy text",
    summary: "Reliable extraction with a strict schema and explicit handling of missing fields.",
    body: `Extract structured data from the text below into JSON matching this schema:
{paste JSON schema or field list}

Rules:
- Output ONLY valid JSON, no prose, no markdown fences.
- If a field is missing, use null — never invent values.
- Normalize dates to ISO 8601 and numbers to plain digits.
- If multiple records exist, return an array.
- Add a "_confidence" field (0-1) reflecting extraction certainty.

Text:
{paste text}`,
    category: "data",
    tags: ["extraction", "json", "parsing"],
    models: ["claude-sonnet-5", "claude-opus-4-8"],
    license: "CC0-1.0",
    author: "webai",
    likes: 472,
    createdAt: "2026-06-09",
  },
  {
    slug: "microcopy-pass",
    title: "UX microcopy pass",
    summary: "Rewrite buttons, empty states and errors to be clear, human and action-oriented.",
    body: `Do a microcopy pass on this UI. For each string, give the original and an improved version.

Principles:
- Buttons state the action's outcome, not "Submit"/"OK".
- Error messages say what happened, why, and the next step — never blame the user.
- Empty states teach the first action.
- Cut hedging words ("just", "simply", "please").

Return a two-column table: Before → After, plus a one-line reason per row.

Strings:
{paste strings}`,
    category: "writing",
    tags: ["microcopy", "ux-writing", "ui"],
    models: ["claude-sonnet-5"],
    license: "MIT",
    author: "webai",
    likes: 253,
    createdAt: "2026-05-30",
  },
  {
    slug: "seo-article-brief",
    title: "SEO article brief that ranks",
    summary: "A brief a writer can execute: intent, outline, entities, and internal links.",
    body: `Create an SEO content brief for the keyword "{keyword}".

Deliver:
- Search intent (informational / commercial / transactional) and the user's real question.
- Target title (<60 chars) + meta description (<155 chars).
- H2/H3 outline covering the topic exhaustively but without fluff.
- 8-12 entities/subtopics to include for topical coverage.
- 3 questions to answer for featured-snippet potential.
- Suggested internal-link anchors.

Do not stuff keywords. Optimize for the reader first.`,
    category: "marketing",
    tags: ["seo", "content", "brief"],
    models: ["claude-sonnet-5", "gpt-4o"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 198,
    createdAt: "2026-06-25",
  },
  {
    slug: "motion-spec-for-component",
    title: "Motion spec for a component",
    summary: "Describe enter/exit/hover animation with timing, easing and reduced-motion fallback.",
    body: `Specify the motion design for a {component} (e.g. modal, toast, card grid).

For each state transition (enter, exit, hover, active, loading), give:
- What moves and what stays.
- Duration (ms) and easing curve.
- Stagger, if any, and its interval.
- The reduced-motion fallback (prefers-reduced-motion).

Keep durations tasteful (120-320ms for UI). Explain the intent in one line per transition,
then output a ready-to-use CSS/Framer Motion snippet.`,
    category: "design",
    tags: ["motion", "animation", "interaction"],
    models: ["claude-opus-4-8"],
    license: "MIT",
    author: "webai",
    likes: 176,
    createdAt: "2026-07-08",
  },
  {
    slug: "user-interview-synthesis",
    title: "Synthesize user interviews",
    summary: "Turn raw interview notes into themes, quotes, and prioritized opportunities.",
    body: `Synthesize the user-research notes below.

Produce:
- 4-6 themes, each with a one-line insight and 1-2 verbatim quotes as evidence.
- Pains ranked by frequency × severity.
- Opportunities framed as "How might we..." statements.
- What surprised you / contradicted assumptions.
- Confidence note: where the sample is too thin to conclude.

Do not overstate. Separate what people SAID from what they DID.

Notes:
{paste notes}`,
    category: "writing",
    tags: ["research", "synthesis", "product"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 231,
    createdAt: "2026-06-18",
  },
  {
    slug: "pricing-page-generator",
    title: "Pricing page with 3 tiers",
    summary: "Design tiers, feature gating and framing that nudges toward the target plan.",
    body: `Design a 3-tier pricing page for {product}.

Deliver:
- Tier names, price points and the ONE audience each targets.
- Feature matrix: which features gate each tier and why.
- The recommended/highlighted tier and the psychological reason it wins.
- Copy for each tier's tagline and CTA.
- A one-line answer to "why is there no free plan?" (or justify a free tier).

Avoid dark patterns. Make the value ladder obvious.`,
    category: "landing",
    tags: ["pricing", "saas", "conversion"],
    models: ["claude-sonnet-5", "claude-opus-4-8"],
    license: "CC0-1.0",
    author: "webai",
    likes: 312,
    createdAt: "2026-05-16",
  },
  {
    slug: "rag-answer-with-citations",
    title: "RAG answer with strict citations",
    summary: "Answer only from retrieved context, cite sources, and admit when it's not there.",
    body: `Answer the question using ONLY the provided context.

Rules:
- Every claim must cite the source id it came from, like [doc-3].
- If the context does not contain the answer, say exactly: "Not found in the provided sources." — do not use outside knowledge.
- Quote at most 15 words from any single source.
- Prefer a direct answer first, then supporting detail.

Question: {question}

Context:
{retrieved chunks with ids}`,
    category: "agents",
    tags: ["rag", "citations", "grounding"],
    models: ["claude-opus-4-8", "claude-sonnet-5"],
    license: "MIT",
    author: "webai",
    likes: 445,
    createdAt: "2026-07-02",
  },
  {
    slug: "empty-state-illustration-brief",
    title: "Empty-state design brief",
    summary: "Turn an empty screen into an onboarding moment with copy + illustration direction.",
    body: `Design the empty state for {screen} in {product}.

Deliver:
- A one-line headline that reframes emptiness as opportunity.
- Sub-copy (max 18 words) teaching the first action.
- The single primary action button label.
- Illustration direction: subject, mood, and how it echoes the brand (2-3 sentences).
- An optional secondary link (e.g. "import" or "see an example").

The goal is activation, not decoration.`,
    category: "design",
    tags: ["empty-state", "onboarding", "ux"],
    models: ["claude-sonnet-5"],
    license: "CC-BY-4.0",
    author: "webai",
    likes: 159,
    createdAt: "2026-06-30",
  },
];

// --------------------------- helpers ---------------------------

export function getPrompt(slug: string): Prompt | undefined {
  return PROMPTS.find((p) => p.slug === slug);
}

export function categoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function countByCategory(id: string): number {
  return PROMPTS.filter((p) => p.category === id).length;
}

export const ALL_TAGS: string[] = Array.from(
  new Set(PROMPTS.flatMap((p) => p.tags))
).sort();

export function searchPrompts(query: string): Prompt[] {
  const q = query.trim().toLowerCase();
  if (!q) return PROMPTS;
  const terms = q.split(/\s+/);
  return PROMPTS.map((p) => {
    const haystack = [
      p.title,
      p.summary,
      p.category,
      ...p.tags,
      ...p.models,
    ]
      .join(" ")
      .toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (p.title.toLowerCase().includes(t)) score += 5;
      if (p.tags.some((tag) => tag.includes(t))) score += 3;
      if (haystack.includes(t)) score += 1;
    }
    return { p, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}
