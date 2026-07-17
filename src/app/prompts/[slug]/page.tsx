import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROMPTS, getPrompt, categoryById } from "@/lib/prompts";
import { CopyButton } from "@/components/copy-button";
import { PromptCard } from "@/components/prompt-card";
import { HeartIcon, ShieldIcon, ArrowRightIcon } from "@/components/icons";

const LICENSE_INFO: Record<string, string> = {
  "CC0-1.0": "Public domain — use freely, no attribution required.",
  MIT: "Permissive — use anywhere, keep the license notice.",
  "CC-BY-4.0": "Free to use with attribution to the author.",
};

export function generateStaticParams() {
  return PROMPTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) return { title: "Prompt not found" };
  return { title: prompt.title, description: prompt.summary };
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prompt = getPrompt(slug);
  if (!prompt) notFound();

  const cat = categoryById(prompt.category);
  const related = PROMPTS.filter(
    (p) => p.category === prompt.category && p.slug !== prompt.slug
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-[var(--text-faint)]">
        <Link href="/prompts" className="hover:text-[var(--text)]">
          Prompts
        </Link>
        <span>/</span>
        <Link
          href={`/prompts?category=${prompt.category}`}
          className="hover:text-[var(--text)]"
        >
          {cat?.label ?? prompt.category}
        </Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_240px]">
        <div>
          <header className="mb-6">
            <div className="mb-3 flex flex-wrap gap-2">
              <Link
                href={`/prompts?category=${prompt.category}`}
                className="chip"
              >
                {cat?.emoji} {cat?.label}
              </Link>
              {prompt.tags.map((t) => (
                <Link
                  key={t}
                  href={`/prompts?q=${encodeURIComponent(t)}`}
                  className="chip !text-[0.72rem]"
                >
                  #{t}
                </Link>
              ))}
            </div>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight">
              {prompt.title}
            </h1>
            <p className="mt-3 text-[var(--text-muted)]">{prompt.summary}</p>
          </header>

          {/* Prompt body */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-2.5">
              <span className="font-mono text-xs text-[var(--text-faint)]">
                prompt.txt · {prompt.body.length} chars
              </span>
              <CopyButton
                text={prompt.body}
                className="btn btn-primary !py-1.5 !px-3 !text-xs"
              />
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[0.82rem] leading-relaxed text-[var(--text)]">
              <code>{prompt.body}</code>
            </pre>
          </div>

          <p className="mt-3 text-xs text-[var(--text-faint)]">
            Placeholders like <code className="font-mono">{"{product_name}"}</code>{" "}
            are meant to be replaced with your own values.
          </p>
        </div>

        {/* Meta sidebar */}
        <aside className="flex flex-col gap-4">
          <div className="card p-4">
            <MetaRow label="Author" value={prompt.author} />
            <MetaRow
              label="Likes"
              value={
                <span className="flex items-center gap-1">
                  <HeartIcon width={14} height={14} /> {prompt.likes}
                </span>
              }
            />
            <MetaRow label="Added" value={prompt.createdAt} />
            <div className="mt-3 border-t border-[var(--border)] pt-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text)]">
                <ShieldIcon width={14} height={14} /> {prompt.license}
              </div>
              <p className="mt-1 text-xs text-[var(--text-faint)]">
                {LICENSE_INFO[prompt.license]}
              </p>
            </div>
          </div>

          <div className="card p-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
              Works well with
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {prompt.models.map((m) => (
                <span
                  key={m}
                  className="rounded-md bg-[var(--surface-2)] px-2 py-1 font-mono text-[0.7rem] text-[var(--text-muted)]"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <CopyButton text={prompt.body} className="btn btn-primary w-full" />
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-lg font-semibold">More in {cat?.label}</h2>
            <Link
              href={`/prompts?category=${prompt.category}`}
              className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              View all <ArrowRightIcon width={15} height={15} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PromptCard key={p.slug} prompt={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function MetaRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-[var(--text-faint)]">{label}</span>
      <span className="font-medium text-[var(--text)]">{value}</span>
    </div>
  );
}
