"use client";

import Link from "next/link";
import { useState } from "react";
import { SearchTrigger } from "@/components/command-palette";
import { GithubIcon, MenuIcon, CloseIcon } from "@/components/icons";
import { Logo } from "@/components/logo";

const NAV = [
  { href: "/prompts", label: "Explore" },
  { href: "/prompts?category=ui", label: "UI" },
  { href: "/prompts?category=agents", label: "Agents" },
  { href: "/submit", label: "Submit" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo />
          <span className="text-[1.05rem] font-semibold tracking-tight">
            web<span className="text-[var(--accent)]">ai</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="rounded-lg px-3 py-1.5 text-sm text-[var(--text-muted)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <SearchTrigger className="w-56 lg:w-64" />
          <a
            href="https://github.com/maxdzem/webai"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost !px-2.5"
            aria-label="GitHub"
          >
            <GithubIcon width={18} height={18} />
          </a>
          <Link href="/sign-in" className="btn btn-ghost">
            Log in
          </Link>
          <Link href="/sign-up" className="btn btn-primary">
            Sign up
          </Link>
        </div>

        <button
          className="btn btn-ghost ml-auto !px-2.5 md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] px-4 py-4 md:hidden">
          <SearchTrigger className="mb-3 w-full" />
          <div className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
              >
                {n.label}
              </Link>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Link href="/sign-in" className="btn btn-ghost flex-1">
              Log in
            </Link>
            <Link href="/sign-up" className="btn btn-primary flex-1">
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
