"use client";

import { useMemo, useState } from "react";
import { PROMPTS, CATEGORIES, ALL_TAGS, searchPrompts } from "@/lib/prompts";
import { PromptCard } from "@/components/prompt-card";
import { SearchIcon, CloseIcon } from "@/components/icons";

type Sort = "popular" | "newest";

export function PromptExplorer({
  initialQuery = "",
  initialCategory = "",
}: {
  initialQuery?: string;
  initialCategory?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<Sort>("popular");

  const results = useMemo(() => {
    let list = query.trim() ? searchPrompts(query) : [...PROMPTS];
    if (category) list = list.filter((p) => p.category === category);
    if (activeTags.length)
      list = list.filter((p) => activeTags.every((t) => p.tags.includes(t)));
    if (!query.trim()) {
      list.sort((a, b) =>
        sort === "popular"
          ? b.likes - a.likes
          : b.createdAt.localeCompare(a.createdAt)
      );
    }
    return list;
  }, [query, category, activeTags, sort]);

  function toggleTag(t: string) {
    setActiveTags((cur) =>
      cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]
    );
  }

  const hasFilters = query || category || activeTags.length;

  return (
    <div>
      {/* Search bar */}
      <div className="card mb-6 flex items-center gap-2 p-1.5 pl-4">
        <SearchIcon className="shrink-0 text-[var(--text-faint)]" width={18} height={18} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title, tag or keyword…"
          className="w-full bg-transparent py-2.5 text-[0.95rem] outline-none placeholder:text-[var(--text-faint)]"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="btn btn-ghost !px-2 !py-1.5"
            aria-label="Clear"
          >
            <CloseIcon width={15} height={15} />
          </button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar filters */}
        <aside className="flex flex-col gap-6">
          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
              Category
            </h3>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">
              <button
                className="chip"
                data-active={category === ""}
                onClick={() => setCategory("")}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  className="chip"
                  data-active={category === c.id}
                  onClick={() => setCategory(category === c.id ? "" : c.id)}
                >
                  <span>{c.emoji}</span> {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((t) => (
                <button
                  key={t}
                  className="chip !py-1 !text-[0.72rem]"
                  data-active={activeTags.includes(t)}
                  onClick={() => toggleTag(t)}
                >
                  #{t}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-semibold text-[var(--text)]">
                {results.length}
              </span>{" "}
              {results.length === 1 ? "prompt" : "prompts"}
              {hasFilters ? " matching" : ""}
            </p>
            <div className="flex items-center gap-2">
              {hasFilters && (
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("");
                    setActiveTags([]);
                  }}
                  className="text-xs text-[var(--text-faint)] transition-colors hover:text-[var(--text)]"
                >
                  Clear filters
                </button>
              )}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                disabled={!!query.trim()}
                className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--text-muted)] outline-none disabled:opacity-40"
              >
                <option value="popular">Most popular</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="card grid place-items-center gap-2 p-16 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                No prompts match your filters.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("");
                  setActiveTags([]);
                }}
                className="btn btn-ghost mt-2"
              >
                Reset
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((p) => (
                <PromptCard key={p.slug} prompt={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
