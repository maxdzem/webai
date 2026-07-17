import Link from "next/link";
import { SearchTrigger, CommandPaletteHint } from "@/components/CommandPalette";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#07070b]/80 backdrop-blur-xl">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_0_16px_rgba(139,92,246,0.6)]" />
            Motion <span className="text-gradient">Web</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
            <Link href="/?category=landing" className="transition hover:text-foreground">Sites</Link>
            <Link href="/?category=app" className="flex items-center gap-1.5 transition hover:text-foreground">
              Apps
              <span className="rounded-full bg-violet-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-violet-300">New</span>
            </Link>
            <Link href="/?category=section" className="transition hover:text-foreground">Sections</Link>
            <Link href="/?category=background" className="transition hover:text-foreground">Backgrounds</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SearchTrigger className="hidden w-44 lg:flex" />
          <CommandPaletteHint />
          <a
            href="https://github.com/maxdzem/webai"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-muted transition hover:text-foreground sm:inline"
          >
            GitHub
          </a>
          <Link href="/#gallery" className="btn-primary !py-2 text-sm">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
