import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/prompts";
import { ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Submit a prompt",
  description: "Contribute a prompt to the open webai library.",
};

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Submit a prompt</h1>
      <p className="mt-2 text-[var(--text-muted)]">
        Share a prompt with the community. By submitting, you confirm it&apos;s
        your own work (or already openly licensed) and release it under the
        license you pick below.
      </p>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--text-muted)]">
        <ShieldIcon className="mt-0.5 shrink-0 text-[var(--accent)]" width={18} height={18} />
        <p>
          Please don&apos;t submit prompts copied from paid or closed sources.
          webai stays open by only hosting content contributors are free to
          share. See{" "}
          <Link href="/licensing" className="text-[var(--accent)] hover:underline">
            licensing
          </Link>
          .
        </p>
      </div>

      <form className="card mt-6 flex flex-col gap-5 p-6">
        <Field label="Title" placeholder="High-converting product hero section" />
        <Field
          label="Short summary"
          placeholder="One line describing what the prompt does."
        />

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-[var(--text-muted)]">
            Prompt body
          </span>
          <textarea
            rows={8}
            placeholder="Paste your prompt. Use {placeholders} for values users should fill in."
            className="resize-y rounded-[10px] border border-[var(--border)] bg-[var(--bg-elev)] px-3.5 py-3 font-mono text-[0.82rem] leading-relaxed outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">
              Category
            </span>
            <select className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elev)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--accent)]">
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.emoji} {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-[var(--text-muted)]">
              License
            </span>
            <select className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elev)] px-3.5 py-2.5 text-sm outline-none focus:border-[var(--accent)]">
              <option value="CC0-1.0">CC0 — public domain</option>
              <option value="MIT">MIT — permissive</option>
              <option value="CC-BY-4.0">CC BY 4.0 — with attribution</option>
            </select>
          </label>
        </div>

        <Field label="Tags" placeholder="hero, conversion, saas (comma separated)" />

        <button type="button" className="btn btn-primary mt-1 self-start">
          Submit for review
        </button>
        <p className="text-xs text-[var(--text-faint)]">
          Front-end scaffold: hook this form to your API route or a GitHub PR
          flow. Submissions can be reviewed before going live.
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--text-muted)]">
        {label}
      </span>
      <input
        placeholder={placeholder}
        className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elev)] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
      />
    </label>
  );
}
