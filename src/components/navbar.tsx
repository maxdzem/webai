import Link from "next/link";
import { auth } from "@/lib/auth";
import { SignOutButton } from "@/components/SignOutButton";
import { SearchTrigger, CommandPaletteHint } from "@/components/CommandPalette";

export async function Navbar() {
  const session = await auth();
  const plan = session?.user?.plan ?? "FREE";

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
            <Link href="/pricing" className="transition hover:text-foreground">Pricing</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <SearchTrigger className="hidden w-44 lg:flex" />
          <CommandPaletteHint />
          {session?.user ? (
            <>
              {plan !== "UNLIMITED" && (
                <Link href="/pricing" className="btn-primary hidden !py-2 text-sm sm:inline-flex">
                  Go Unlimited
                </Link>
              )}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-full border border-white/12 py-1.5 pl-1.5 pr-3 text-sm transition hover:bg-white/5"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-bold text-white">
                  {(session.user.name ?? session.user.email ?? "U").slice(0, 1).toUpperCase()}
                </span>
                <span className="hidden sm:inline">{session.user.name ?? "Account"}</span>
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-muted transition hover:text-foreground">
                Log in
              </Link>
              <Link href="/register" className="btn-primary !py-2 text-sm">
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
