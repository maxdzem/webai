"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/components/icons";
import { useCommandPalette } from "@/components/command-palette";

const SUGGESTIONS = ["hero section", "react component", "agent prompt", "SQL", "cold email"];

export function HeroSearch() {
  const router = useRouter();
  const { setOpen } = useCommandPalette();
  const [value, setValue] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/prompts?q=${encodeURIComponent(q)}` : "/prompts");
  }

  return (
    <div>
      <form
        onSubmit={submit}
        className="card flex items-center gap-2 p-1.5 pl-4 focus-within:border-[var(--border-strong)]"
        style={{ boxShadow: "0 10px 40px -16px rgba(0,0,0,.8)" }}
      >
        <SearchIcon className="shrink-0 text-[var(--text-faint)]" width={19} height={19} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder="Describe what you want to build…"
          className="w-full bg-transparent py-2.5 text-[0.98rem] outline-none placeholder:text-[var(--text-faint)]"
          aria-label="Search prompts"
        />
        <button type="submit" className="btn btn-primary shrink-0">
          Search
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs text-[var(--text-faint)]">Try:</span>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => router.push(`/prompts?q=${encodeURIComponent(s)}`)}
            className="chip !py-1 !text-xs"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
