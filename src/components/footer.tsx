import Link from "next/link";
import { Logo } from "@/components/logo";
import { GithubIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-[1.05rem] font-semibold tracking-tight">
              web<span className="text-[var(--accent)]">ai</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-[var(--text-muted)]">
            An open, community-driven library of high-quality prompts. Free to
            use, remix and contribute — every prompt openly licensed.
          </p>
        </div>

        <FooterCol
          title="Explore"
          links={[
            { href: "/prompts", label: "All prompts" },
            { href: "/prompts?category=ui", label: "UI Generation" },
            { href: "/prompts?category=agents", label: "Agents" },
            { href: "/prompts?category=coding", label: "Coding" },
          ]}
        />
        <FooterCol
          title="Community"
          links={[
            { href: "/submit", label: "Submit a prompt" },
            { href: "/sign-up", label: "Create account" },
            { href: "/licensing", label: "Licensing" },
          ]}
        />
        <FooterCol
          title="Project"
          links={[
            { href: "https://github.com/maxdzem/webai", label: "GitHub" },
            { href: "/licensing", label: "Open source" },
          ]}
        />
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-[var(--text-faint)] sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} webai · Built in the open.</span>
          <a
            href="https://github.com/maxdzem/webai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-[var(--text-muted)]"
          >
            <GithubIcon width={14} height={14} /> maxdzem/webai
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-faint)]">
        {title}
      </h4>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
