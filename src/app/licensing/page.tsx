import type { Metadata } from "next";
import Link from "next/link";
import { ShieldIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Licensing",
  description: "How webai keeps its prompt library open and legal.",
};

const LICENSES = [
  {
    name: "CC0 1.0",
    tag: "Public domain",
    desc: "No rights reserved. Anyone may use the prompt for anything, no attribution required.",
  },
  {
    name: "MIT",
    tag: "Permissive",
    desc: "Use, modify and redistribute freely; keep the short license notice.",
  },
  {
    name: "CC BY 4.0",
    tag: "Attribution",
    desc: "Free to use and adapt as long as the original author is credited.",
  },
];

export default function LicensingPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <div className="mb-2 flex items-center gap-2 text-[var(--accent)]">
        <ShieldIcon width={20} height={20} />
        <span className="text-xs font-semibold uppercase tracking-wider">
          Open by design
        </span>
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">Licensing</h1>
      <p className="mt-3 text-[var(--text-muted)]">
        webai is built to be a shared commons. Every prompt here is contributed
        under an open license, so you can copy, remix and ship without worrying
        about who owns it.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {LICENSES.map((l) => (
          <div key={l.name} className="card flex items-start gap-4 p-5">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{l.name}</h3>
                <span className="chip !cursor-default !py-0.5 !text-[0.68rem]">
                  {l.tag}
                </span>
              </div>
              <p className="mt-1.5 text-sm text-[var(--text-muted)]">{l.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-8 p-6">
        <h2 className="text-lg font-semibold">What we don&apos;t host</h2>
        <ul className="mt-3 flex flex-col gap-2.5 text-sm text-[var(--text-muted)]">
          <li className="flex gap-2.5">
            <span className="text-[var(--accent)]">—</span>
            Prompts copied from paid vaults, closed marketplaces or anyone
            else&apos;s proprietary collection.
          </li>
          <li className="flex gap-2.5">
            <span className="text-[var(--accent)]">—</span>
            Content obtained by circumventing another service&apos;s access
            controls or terms.
          </li>
          <li className="flex gap-2.5">
            <span className="text-[var(--accent)]">—</span>
            Anything a contributor doesn&apos;t have the right to release openly.
          </li>
        </ul>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          This is what keeps webai defensible and genuinely free: the value is
          the curation and the community, not a locked-up hoard. Got a great
          prompt of your own?{" "}
          <Link href="/submit" className="text-[var(--accent)] hover:underline">
            Submit it
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
