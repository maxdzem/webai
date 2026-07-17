"use client";

import { useState } from "react";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { SearchTrigger } from "@/components/CommandPalette";
import { PromoBar } from "@/components/PromoBar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PromoBar />

      <div className="flex">
        {/* desktop sidebar — sticky column */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 self-start border-r border-white/8 bg-[#0a0a10] lg:block">
          <Sidebar />
        </aside>

        {/* mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <aside className="absolute inset-y-0 left-0 w-72 border-r border-white/8 bg-[#0a0a10]">
              <Sidebar onNavigate={() => setOpen(false)} />
            </aside>
          </div>
        )}

        {/* main column */}
        <div className="min-w-0 flex-1">
          {/* mobile top bar */}
          <div className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/8 bg-[#07070b]/85 px-4 backdrop-blur-xl lg:hidden">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted transition hover:text-foreground"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link href="/" className="flex items-center gap-2 text-base font-bold tracking-tight">
              <span className="inline-block h-5 w-5 rounded bg-gradient-to-br from-violet-500 to-indigo-500" />
              Motion <span className="text-gradient">Web</span>
            </Link>
            <SearchTrigger className="ml-auto !w-auto" />
          </div>

          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
