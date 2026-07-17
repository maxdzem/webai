"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCommandPalette } from "@/components/CommandPalette";

/* ---------------- inline icons ---------------- */
type IP = { className?: string };
const svg = (path: React.ReactNode) => (p: IP) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={p.className}
    width={18}
    height={18}
  >
    {path}
  </svg>
);
const HomeIcon = svg(<><path d="M3 10.5 12 4l9 6.5" /><path d="M5 9.5V20h14V9.5" /></>);
const MonitorIcon = svg(<><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>);
const PhoneIcon = svg(<><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></>);
const TerminalIcon = svg(<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></>);
const LayersIcon = svg(<><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" /></>);
const ImageIcon = svg(<><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="9.5" r="1.5" /><path d="m4 18 5-4 4 3 3-2 4 3" /></>);
const BoltIcon = svg(<path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />);
const GithubIcon = (p: IP) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={p.className} width={18} height={18}>
    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49v-1.7c-2.79.62-3.38-1.22-3.38-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
  </svg>
);
const SearchIcon = svg(<><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></>);
const UserIcon = svg(<><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" /></>);

/* ---------------- nav config ---------------- */
const EXPLORE = [
  { label: "Sites", cat: "landing", Icon: MonitorIcon },
  { label: "Apps", cat: "app", Icon: PhoneIcon, badge: "New" },
  { label: "SaaS", cat: "saas", Icon: TerminalIcon },
  { label: "Sections", cat: "section", Icon: LayersIcon },
  { label: "Backgrounds", cat: "background", Icon: ImageIcon },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { setOpen } = useCommandPalette();

  const homeActive = pathname === "/";

  return (
    <div className="flex h-full flex-col gap-1 overflow-y-auto p-3">
      {/* brand */}
      <Link
        href="/"
        onClick={onNavigate}
        className="mb-1 flex items-center gap-2 px-2 py-2 text-lg font-bold tracking-tight"
      >
        <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_0_16px_rgba(139,92,246,0.6)]" />
        Motion <span className="text-gradient">Web</span>
      </Link>

      {/* search */}
      <button
        onClick={() => setOpen(true)}
        className="mb-1 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
      >
        <SearchIcon className="shrink-0" />
        <span className="flex-1 text-left">Search templates</span>
        <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 font-mono text-[0.7rem]">
          /
        </kbd>
      </button>

      {/* home */}
      <NavRow href="/" label="Home" Icon={HomeIcon} active={homeActive} onNavigate={onNavigate} />

      {/* explore */}
      <SectionLabel>Explore</SectionLabel>
      {EXPLORE.map((it) => (
        <NavRow
          key={it.cat}
          href={`/?category=${it.cat}`}
          label={it.label}
          Icon={it.Icon}
          badge={it.badge}
          onNavigate={onNavigate}
        />
      ))}

      {/* build */}
      <SectionLabel>Build</SectionLabel>
      <NavRow
        href="/pricing"
        label="Pricing"
        Icon={BoltIcon}
        active={pathname === "/pricing"}
        onNavigate={onNavigate}
      />
      <NavRow
        href="https://github.com/maxdzem/webai"
        label="GitHub"
        Icon={GithubIcon}
        external
        onNavigate={onNavigate}
      />
      <button
        onClick={() => {
          onNavigate?.();
          window.dispatchEvent(new CustomEvent("mw:login"));
        }}
        className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-white/[0.04] hover:text-foreground"
      >
        <UserIcon className="text-white/45 group-hover:text-foreground" />
        <span className="flex-1 text-left">Log in</span>
      </button>

      {/* bottom promo card */}
      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-violet-500/10 to-transparent p-4">
          <p className="text-sm font-semibold">Ship in minutes</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Grab a prompt, paste it into your AI builder, and launch an animated
            page.
          </p>
          <Link
            href="/#gallery"
            onClick={onNavigate}
            className="btn-primary mt-3 w-full justify-center !py-2 text-sm"
          >
            Get started →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-2 pb-1 pt-4 text-[0.7rem] font-semibold uppercase tracking-wider text-white/35">
      {children}
    </div>
  );
}

function NavRow({
  href,
  label,
  Icon,
  active,
  badge,
  external,
  onNavigate,
}: {
  href: string;
  label: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  active?: boolean;
  badge?: string;
  external?: boolean;
  onNavigate?: () => void;
}) {
  const cls = `group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
    active
      ? "bg-white/[0.06] font-medium text-foreground shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
      : "text-muted hover:bg-white/[0.04] hover:text-foreground"
  }`;
  const inner = (
    <>
      <Icon className={active ? "text-violet-300" : "text-white/45 group-hover:text-foreground"} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-violet-300">
          {badge}
        </span>
      )}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" onClick={onNavigate} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} onClick={onNavigate} className={cls}>
      {inner}
    </Link>
  );
}
