import Link from "next/link";
import type { Prompt } from "@/lib/prompts";
import { HeartIcon, SparkIcon } from "@/components/icons";

const LICENSE_LABEL: Record<string, string> = {
  "CC0-1.0": "CC0",
  MIT: "MIT",
  "CC-BY-4.0": "CC BY",
};

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="card group flex flex-col gap-3 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
      style={{ willChange: "transform" }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--accent)_16%,transparent)] text-[var(--accent)] transition-transform group-hover:scale-110">
          <SparkIcon width={17} height={17} />
        </span>
        <span
          className="chip !cursor-default !py-1 !text-[0.68rem] uppercase tracking-wide"
          title={`Licensed ${prompt.license}`}
        >
          {LICENSE_LABEL[prompt.license] ?? prompt.license}
        </span>
      </div>

      <div className="flex-1">
        <h3 className="text-[0.98rem] font-semibold leading-snug transition-colors group-hover:text-white">
          {prompt.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-muted)]">
          {prompt.summary}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {prompt.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[0.7rem] text-[var(--text-faint)]"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[var(--border)] pt-3 text-xs text-[var(--text-faint)]">
        <span>by {prompt.author}</span>
        <span className="flex items-center gap-1">
          <HeartIcon width={14} height={14} />
          {prompt.likes}
        </span>
      </div>
    </Link>
  );
}
