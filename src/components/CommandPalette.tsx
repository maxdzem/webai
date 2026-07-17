"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type PaletteItem = {
  slug: string;
  title: string;
  category: string;
  tags: string;
  tier: string;
};

const CATS: { key: string; label: string; emoji: string }[] = [
  { key: "landing", label: "Landing Pages", emoji: "🖥️" },
  { key: "hero", label: "Hero Sections", emoji: "✨" },
  { key: "portfolio", label: "Portfolios", emoji: "🎞️" },
  { key: "saas", label: "SaaS", emoji: "⚙️" },
  { key: "ecommerce", label: "E-commerce", emoji: "🛍️" },
  { key: "web3", label: "Web3", emoji: "⛓️" },
  { key: "app", label: "Apps", emoji: "📱" },
  { key: "section", label: "Sections", emoji: "🧱" },
  { key: "background", label: "Backgrounds", emoji: "🌌" },
];

type Ctx = { open: boolean; setOpen: (v: boolean) => void };
const PaletteCtx = createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(PaletteCtx);
  if (!ctx) throw new Error("useCommandPalette must be used within provider");
  return ctx;
}

export function CommandPaletteProvider({
  templates,
  children,
}: {
  templates: PaletteItem[];
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <PaletteCtx.Provider value={value}>
      {children}
      {open && <Palette templates={templates} onClose={() => setOpen(false)} />}
    </PaletteCtx.Provider>
  );
}

function isTypingTarget(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  if (!el) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
}

type Row =
  | { kind: "tpl"; item: PaletteItem }
  | { kind: "cat"; key: string; label: string; emoji: string };

function Palette({
  templates,
  onClose,
}: {
  templates: PaletteItem[];
  onClose: () => void;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const rows: Row[] = useMemo(() => {
    const query = q.trim().toLowerCase();
    const cats: Row[] = CATS.filter(
      (c) => !query || c.label.toLowerCase().includes(query)
    )
      .slice(0, query ? 3 : 4)
      .map((c) => ({ kind: "cat", key: c.key, label: c.label, emoji: c.emoji }));

    const scored = templates
      .map((t) => {
        const hay = `${t.title} ${t.category} ${t.tags}`.toLowerCase();
        let s = 0;
        if (!query) s = 1;
        else {
          for (const term of query.split(/\s+/)) {
            if (t.title.toLowerCase().includes(term)) s += 5;
            if (t.tags.toLowerCase().includes(term)) s += 3;
            if (hay.includes(term)) s += 1;
          }
        }
        return { t, s };
      })
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 7)
      .map<Row>((x) => ({ kind: "tpl", item: x.t }));

    return [...cats, ...scored];
  }, [q, templates]);

  useEffect(() => setActive(0), [q]);

  const go = useCallback(
    (row: Row) => {
      onClose();
      if (row.kind === "tpl") router.push(`/t/${row.item.slug}`);
      else router.push(`/?category=${row.key}`);
    },
    [onClose, router]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, rows.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = rows[active];
      if (row) go(row);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search templates"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/12 bg-[#0d0d14] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)]"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-white/8 px-4">
          <svg className="h-5 w-5 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search templates, heroes, categories…"
            className="w-full bg-transparent py-4 text-base outline-none placeholder:text-muted"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="shrink-0 rounded-md border border-white/15 bg-white/5 px-2 py-0.5 font-mono text-xs text-muted">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {rows.length === 0 && (
            <div className="px-3 py-10 text-center text-sm text-muted">
              No matches for “{q}”.
            </div>
          )}
          {rows.map((row, i) => (
            <button
              key={row.kind === "tpl" ? row.item.slug : `c-${row.key}`}
              data-idx={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(row)}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors"
              style={{ background: i === active ? "rgba(255,255,255,0.06)" : "transparent" }}
            >
              {row.kind === "cat" ? (
                <>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/5 text-base">
                    {row.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{row.label}</span>
                    <span className="block text-xs text-muted">Browse category</span>
                  </span>
                  <span className="text-muted">→</span>
                </>
              ) : (
                <>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet-500/15 text-violet-300">
                    ✦
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{row.item.title}</span>
                    <span className="block truncate text-xs capitalize text-muted">{row.item.category}</span>
                  </span>
                  <span className={row.item.tier === "FREE" ? "badge badge-free" : "badge badge-premium"}>
                    {row.item.tier === "FREE" ? "Free" : "Premium"}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-white/8 px-4 py-2.5 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <Kbd>↵</Kbd> open
          </span>
        </div>
      </div>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[0.7rem] text-muted">
      {children}
    </kbd>
  );
}

/** Navbar trigger button that opens the palette. */
export function SearchTrigger({ className = "" }: { className?: string }) {
  const { setOpen } = useCommandPalette();
  return (
    <button
      onClick={() => setOpen(true)}
      className={`group flex items-center gap-2.5 rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-sm text-muted transition hover:border-white/25 hover:text-foreground ${className}`}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
      </svg>
      <span className="flex-1 text-left">Search…</span>
      <kbd className="hidden rounded border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[0.7rem] sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

/** Standalone client wrapper so the "/" trigger can live in Navbar too. */
export function CommandPaletteHint() {
  const { setOpen } = useCommandPalette();
  return (
    <button
      onClick={() => setOpen(true)}
      aria-label="Search"
      className="grid h-9 w-9 place-items-center rounded-xl border border-white/12 text-muted transition hover:text-foreground md:hidden"
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
      </svg>
    </button>
  );
}
