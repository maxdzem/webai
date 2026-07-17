import Link from "next/link";
import { PROMPTS, CATEGORIES, countByCategory } from "@/lib/prompts";
import { PromptCard } from "@/components/prompt-card";
import { HeroSearch } from "@/components/hero-search";
import { ArrowRightIcon, ShieldIcon, SparkIcon, HeartIcon } from "@/components/icons";

export default function Home() {
  const featured = [...PROMPTS].sort((a, b) => b.likes - a.likes).slice(0, 6);
  const totalLikes = PROMPTS.reduce((s, p) => s + p.likes, 0);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 sm:pt-28">
        <div className="animate-fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1.5 text-xs text-[var(--text-muted)]">
          <span className="grid h-4 w-4 place-items-center rounded-full bg-[var(--accent)] text-[9px] text-white">
            ✦
          </span>
          Open prompt library · {PROMPTS.length} curated · MIT / CC licensed
        </div>

        <h1
          className="animate-fade-up mx-auto max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
          style={{ animationDelay: "60ms" }}
        >
          The prompts behind great
          <br className="hidden sm:block" /> <span className="gradient-text">AI products</span> — free & open.
        </h1>

        <p
          className="animate-fade-up mx-auto mt-5 max-w-xl text-pretty text-base text-[var(--text-muted)] sm:text-lg"
          style={{ animationDelay: "120ms" }}
        >
          Search a growing library of battle-tested prompts for UI generation,
          agents, coding and copy. Copy, remix, ship. No paywall, no lock-in.
        </p>

        <div
          className="animate-fade-up mx-auto mt-8 max-w-xl"
          style={{ animationDelay: "180ms" }}
        >
          <HeroSearch />
        </div>

        <div
          className="animate-fade-up mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[var(--text-faint)]"
          style={{ animationDelay: "240ms" }}
        >
          <span className="flex items-center gap-1.5">
            <ShieldIcon width={14} height={14} /> Openly licensed
          </span>
          <span className="flex items-center gap-1.5">
            <HeartIcon width={14} height={14} /> {totalLikes.toLocaleString()} likes
          </span>
          <span className="flex items-center gap-1.5">
            <SparkIcon width={14} height={14} /> Press <kbd className="kbd">⌘K</kbd> anywhere
          </span>
        </div>
      </section>

      {/* ---------------- Categories ---------------- */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-lg font-semibold">Browse by category</h2>
          <Link
            href="/prompts"
            className="flex items-center gap-1 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          >
            All prompts <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              href={`/prompts?category=${c.id}`}
              className="card group flex items-center gap-3 p-4 transition-all hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--surface-2)] text-xl transition-transform group-hover:scale-110">
                {c.emoji}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {c.label}
                </span>
                <span className="block text-xs text-[var(--text-faint)]">
                  {countByCategory(c.id)} prompts
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Featured ---------------- */}
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">Trending this week</h2>
            <p className="text-sm text-[var(--text-muted)]">
              Most-liked prompts from the community.
            </p>
          </div>
          <Link
            href="/prompts"
            className="flex items-center gap-1 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
          >
            See all <ArrowRightIcon width={15} height={15} />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PromptCard key={p.slug} prompt={p} />
          ))}
        </div>
      </section>

      {/* ---------------- Open manifesto ---------------- */}
      <section className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle,var(--accent-glow),transparent 70%)" }}
          />
          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Prompts should be a{" "}
              <span className="gradient-text">shared commons</span>.
            </h2>
            <p className="mt-4 text-[var(--text-muted)]">
              We believe the best prompts get better when everyone can read,
              fork and improve them. Every prompt on webai is contributed under
              an open license — no scraping, no locked vaults, no reselling
              someone else&apos;s work. Bring your best prompt, keep the credit,
              share the knowledge.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/submit" className="btn btn-primary">
                Submit a prompt <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link href="/licensing" className="btn btn-ghost">
                How licensing works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
