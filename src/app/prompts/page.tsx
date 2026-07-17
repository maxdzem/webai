import type { Metadata } from "next";
import { PromptExplorer } from "@/components/prompt-explorer";
import { categoryById } from "@/lib/prompts";

export const metadata: Metadata = {
  title: "Explore prompts",
  description: "Search and filter the open webai prompt library.",
};

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q = "", category = "" } = await searchParams;
  const cat = category ? categoryById(category) : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          {cat ? (
            <span className="flex items-center gap-3">
              <span>{cat.emoji}</span> {cat.label}
            </span>
          ) : (
            "Explore prompts"
          )}
        </h1>
        <p className="mt-2 text-[var(--text-muted)]">
          {cat?.blurb ??
            "Find, copy and remix openly-licensed prompts. Press ⌘K for quick search."}
        </p>
      </header>

      <PromptExplorer initialQuery={q} initialCategory={category} />
    </div>
  );
}
