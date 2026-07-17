"use client";

import { useEffect, useState } from "react";

type Mode = "signin" | "signup";

export function LoginModal() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("signin");
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    const onOpen = () => {
      setNotice(false);
      setOpen(true);
    };
    window.addEventListener("mw:login", onOpen as EventListener);
    return () => window.removeEventListener("mw:login", onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  if (!open) return null;

  const isSignup = mode === "signup";

  // NOTE: no auth backend is connected yet, so we intentionally do NOT send or
  // store any entered credentials. Wiring Supabase/NextAuth makes this live.
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(true);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onMouseDown={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/12 bg-[#0d0d14] p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 grid h-7 w-7 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-foreground"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <div className="mb-5 flex flex-col items-center text-center">
          <span className="mb-3 inline-block h-9 w-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
          <h2 className="text-lg font-semibold">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-1 text-xs text-muted">
            {isSignup
              ? "Join Motion Web — save prompts & unlock more."
              : "Log in to your Motion Web account."}
          </p>
        </div>

        {/* tabs */}
        <div className="mb-4 flex rounded-lg border border-white/10 bg-white/[0.03] p-1 text-sm">
          {(["signin", "signup"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setNotice(false);
              }}
              className={`flex-1 rounded-md py-1.5 font-medium transition ${
                mode === m ? "bg-white/10 text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {m === "signin" ? "Sign in" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {isSignup && (
            <Field label="Name" name="name" type="text" placeholder="Ada Lovelace" />
          )}
          <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
          <Field label="Password" name="password" type="password" placeholder="••••••••" required />
          <button
            type="submit"
            className="btn-primary mt-1 w-full justify-center !py-2.5 text-sm"
          >
            {isSignup ? "Create account" : "Sign in"}
          </button>
        </form>

        {notice && (
          <p className="mt-4 rounded-lg border border-violet-500/25 bg-violet-500/10 px-3 py-2.5 text-center text-xs text-violet-200">
            Accounts are launching very soon — the sign-in UI is ready, we&apos;re
            wiring up the backend. Nothing you typed was sent anywhere.
          </p>
        )}

        <p className="mt-4 text-center text-[0.7rem] text-white/35">
          By continuing you agree to use each prompt within its open license.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={type === "password" ? "current-password" : type}
        className="rounded-lg border border-white/10 bg-[#07070b] px-3.5 py-2.5 text-sm outline-none transition placeholder:text-white/30 focus:border-violet-500"
      />
    </label>
  );
}
