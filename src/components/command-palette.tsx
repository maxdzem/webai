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
import { useRouter } from "next/navigation";
import { CATEGORIES, searchPrompts, type Prompt } from "@/lib/prompts";
import { SearchIcon, SparkIcon, ArrowRightIcon } from "@/components/icons";

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };
const CommandCtx = createContext<Ctx | null>(null);

export function useCommandPalette() {
  const ctx = useContext(CommandCtx);
  if (!ctx) throw new Error("useCommandPalette must be used within provider");
  return ctx;
}

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "/" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <CommandCtx.Provider value={value}>
      {children}
      {open && <Palette onClose={() => setOpen(false)} />}
    </CommandCtx.Provider>
  );
}

function isTypingTarget(t: EventTarget | null) {
  const el = t as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

type Row =
  | { kind: "prompt"; prompt: Prompt }
  | { kind: "category"; id: string; label: string; emoji: string };

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
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
    const q = query.trim().toLowerCase();
    const cats: Row[] = CATEGORIES.filter(
      (c) => !q || c.label.toLowerCase().includes(q)
    )
      .slice(0, q ? 3 : 4)
      .map((c) => ({ kind: "category", id: c.id, label: c.label, emoji: c.emoji }));
    const prompts: Row[] = searchPrompts(query)
      .slice(0, 7)
      .map((p) => ({ kind: "prompt", prompt: p }));
    return [...cats, ...prompts];
  }, [query]);

  useEffect(() => setActive(0), [query]);

  const go = useCallback(
    (row: Row) => {
      onClose();
      if (row.kind === "prompt") router.push(`/prompts/${row.prompt.slug}`);
      else router.push(`/prompts?category=${row.id}`);
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
    const el = listRef.current?.querySelector<HTMLElement>(
      `[data-idx="${active}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      style={{ animation: "overlayIn .15s ease" }}
      onMouseDown={onClose}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search prompts"
        className="card relative w-full max-w-xl overflow-hidden"
        style={{ animation: "paletteIn .18s cubic-bezier(.22,1,.36,1)" }}
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 px-4 border-b border-[var(--border)]">
          <SearchIcon className="text-[var(--text-faint)] shrink-0" width={18} height={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts, categories, tags…"
            className="w-full bg-transparent py-4 text-[0.98rem] outline-none placeholder:text-[var(--text-faint)]"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd shrink-0">esc</kbd>
        </div>

        <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2">
          {rows.length === 0 && (
            <div className="px-3 py-10 text-center text-sm text-[var(--text-muted)]">
              No matches for “{query}”. Try a broader term.
            </div>
          )}

          {rows.map((row, i) => (
            <button
              key={row.kind === "prompt" ? row.prompt.slug : `c-${row.id}`}
              data-idx={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(row)}
              className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors"
              style={{
                background: i === active ? "var(--surface-2)" : "transparent",
              }}
            >
              {row.kind === "category" ? (
                <>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--surface-2)] text-base">
                    {row.emoji}
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-medium">{row.label}</span>
                    <span className="block text-xs text-[var(--text-faint)]">
                      Browse category
                    </span>
                  </span>
                  <ArrowRightIcon
                    className="text-[var(--text-faint)]"
                    width={16}
                    height={16}
                  />
                </>
              ) : (
                <>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)]">
                    <SparkIcon width={16} height={16} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {row.prompt.title}
                    </span>
                    <span className="block truncate text-xs text-[var(--text-faint)]">
                      {row.prompt.summary}
                    </span>
                  </span>
                  <span className="chip shrink-0 !py-1 !text-[0.7rem]">
                    {row.prompt.category}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-[var(--border)] px-4 py-2.5 text-xs text-[var(--text-faint)]">
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↑</kbd>
            <kbd className="kbd">↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1.5">
            <kbd className="kbd">↵</kbd>
            to open
          </span>
        </div>
      </div>
    </div>
  );
}

/** A button that opens the palette — used in the navbar. */
export function SearchTrigger({ className = "" }: { className?: string }) {
  const { setOpen } = useCommandPalette();
  return (
    <button
      onClick={() => setOpen(true)}
      className={`group flex items-center gap-2.5 rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text-faint)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-muted)] ${className}`}
    >
      <SearchIcon width={16} height={16} />
      <span className="flex-1 text-left">Search prompts…</span>
      <kbd className="kbd hidden sm:inline-block">⌘K</kbd>
    </button>
  );
}
