"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatedPreview } from "@/components/AnimatedPreview";
import { animKind } from "@/lib/previews";

export type TemplateItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  tier: string;
  featured: boolean;
  views: number;
  gradient: string;
  createdAt: string;
};

const CATEGORIES: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "landing", label: "Landing Pages" },
  { key: "hero", label: "Hero Sections" },
  { key: "portfolio", label: "Portfolios" },
  { key: "saas", label: "SaaS" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "web3", label: "Web3" },
  { key: "app", label: "Apps" },
  { key: "section", label: "Sections" },
  { key: "background", label: "Backgrounds" },
];

const TABS = ["Featured", "Popular", "Recent"] as const;
const TIERS = ["All", "Free", "Premium"] as const;

export function Gallery({ templates }: { templates: TemplateItem[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [tab, setTab] = useState<(typeof TABS)[number]>("Featured");
  const [tier, setTier] = useState<(typeof TIERS)[number]>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  // sync category from navbar links
  useEffect(() => {
    const c = searchParams.get("category");
    if (c) setCategory(c);
  }, [searchParams]);

  // "/" focuses search — like 21st.dev
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") inputRef.current?.blur();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = templates.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (tier === "Free" && t.tier !== "FREE") return false;
      if (tier === "Premium" && t.tier !== "PREMIUM") return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
    if (tab === "Featured") {
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured) || b.views - a.views);
    } else if (tab === "Popular") {
      list = [...list].sort((a, b) => b.views - a.views);
    } else {
      list = [...list].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    }
    return list;
  }, [templates, query, category, tab, tier]);

  return (
    <div id="gallery">
      {/* 21st.dev-style big search */}
      <div className="fade-up fade-up-2 relative mx-auto max-w-2xl">
        <div className="group relative">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search animated templates, heroes, backgrounds…"
            className="input !rounded-2xl !py-4 !pl-12 !pr-14 text-base shadow-[0_8px_40px_-12px_rgba(139,92,246,0.25)]"
          />
          <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-xs text-muted">
            /
          </kbd>
        </div>
      </div>

      {/* category pills */}
      <div className="scroll-x fade-up fade-up-3 mt-8 flex gap-2 pb-1">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition ${
              category === c.key
                ? "border-violet-500/60 bg-violet-500/15 text-violet-200"
                : "border-white/10 text-muted hover:border-white/25 hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* tabs + tier filter */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-xl border border-white/10 bg-surface p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                tab === t ? "bg-white/10 text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted">Pricing:</span>
          {TIERS.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full px-3 py-1 transition ${
                tier === t ? "bg-white/10 text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      {filtered.length === 0 ? (
        <div className="mt-16 text-center text-muted">
          Nothing found for “{query}”. Try another search.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TemplateCard key={t.id} t={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateCard({ t }: { t: TemplateItem }) {
  return (
    <Link href={`/t/${t.slug}`} className="card group block overflow-hidden">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <div className="absolute inset-0">
          <AnimatedPreview kind={animKind(t.slug, t.category)} gradient={t.gradient} />
        </div>
        {/* hover overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 opacity-0 transition group-hover:opacity-100">
          <span className="rounded-full border border-white/30 bg-black/50 px-4 py-1.5 text-sm font-medium backdrop-blur">
            View template →
          </span>
        </div>
        {t.featured && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-violet-200 backdrop-blur">
            ★ Featured
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-3 p-4">
        <div>
          <h3 className="font-semibold leading-tight">{t.title}</h3>
          <p className="mt-1 text-xs capitalize text-muted">{t.category.replace("-", " ")}</p>
        </div>
        <span className={t.tier === "FREE" ? "badge badge-free" : "badge badge-premium"}>
          {t.tier === "FREE" ? "Copy" : "Premium"}
        </span>
      </div>
    </Link>
  );
}
