"use client";

import { useEffect, useState } from "react";
import { AnimatedPreview } from "@/components/AnimatedPreview";

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

  // No auth backend is connected yet — we intentionally do NOT transmit or store
  // anything entered here. Wiring Supabase/NextAuth turns this fully live.
  function pending(e?: React.FormEvent) {
    e?.preventDefault();
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
        className="relative grid w-full max-w-3xl overflow-hidden rounded-2xl border border-white/12 bg-[#0d0d14] shadow-[0_30px_100px_-24px_rgba(0,0,0,0.9)] md:grid-cols-2"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-white/5 hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {/* form panel */}
        <div className="p-7 sm:p-9">
          <div className="mb-6 flex items-center gap-2 text-base font-bold tracking-tight">
            <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_0_16px_rgba(139,92,246,0.6)]" />
            Motion <span className="text-gradient">Web</span>
          </div>

          <h2 className="text-xl font-semibold tracking-tight">
            {isSignup ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {isSignup
              ? "Start saving prompts and unlock everything."
              : "Log in to pick up where you left off."}
          </p>

          {/* OAuth */}
          <div className="mt-6 flex flex-col gap-2.5">
            <button onClick={() => pending()} className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.03] py-2.5 text-sm font-medium transition hover:border-white/25 hover:bg-white/[0.06]">
              <GithubGlyph /> Continue with GitHub
            </button>
            <button onClick={() => pending()} className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/12 bg-white/[0.03] py-2.5 text-sm font-medium transition hover:border-white/25 hover:bg-white/[0.06]">
              <GoogleGlyph /> Continue with Google
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-white/35">
            <span className="h-px flex-1 bg-white/10" />
            or continue with email
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={pending} className="flex flex-col gap-3">
            {isSignup && <Field label="Name" name="name" type="text" placeholder="Ada Lovelace" />}
            <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
            <Field
              label="Password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              hint={
                !isSignup ? (
                  <button type="button" onClick={() => pending()} className="text-[var(--accent)] hover:underline">
                    Forgot?
                  </button>
                ) : undefined
              }
            />
            <button type="submit" className="btn-primary mt-1 w-full justify-center !py-2.5 text-sm">
              {isSignup ? "Create account" : "Sign in"}
            </button>
          </form>

          {notice && (
            <p className="mt-4 rounded-lg border border-violet-500/25 bg-violet-500/10 px-3 py-2.5 text-center text-xs text-violet-200">
              Accounts go live any moment now — the UI is ready and we&apos;re
              connecting the backend. Nothing you entered was sent anywhere.
            </p>
          )}

          <p className="mt-6 text-center text-sm text-muted">
            {isSignup ? "Already have an account? " : "New to Motion Web? "}
            <button
              onClick={() => {
                setMode(isSignup ? "signin" : "signup");
                setNotice(false);
              }}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>

        {/* brand panel */}
        <div className="relative hidden md:block">
          <div className="absolute inset-0">
            <AnimatedPreview kind="aurora" gradient="linear-gradient(150deg,#3b1d8f,#6d28d9,#0ea5e9)" />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative flex h-full flex-col justify-end gap-4 p-9">
            <h3 className="text-2xl font-bold leading-tight tracking-tight text-white">
              The prompts behind standout animated sites.
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/85">
              {["24+ ready-to-use prompts", "Copy, paste, ship in minutes", "Open & free — no lock-in"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckGlyph /> {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
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
  hint,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  hint?: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between text-xs font-medium text-muted">
        {label} {hint}
      </span>
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

function GithubGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.85 9.73.5.1.68-.22.68-.49v-1.7c-2.79.62-3.38-1.22-3.38-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7C21.8 18.9 23 15.9 23 12.3Z" />
      <path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3C3.7 21.4 7.5 24 12 24Z" />
      <path fill="#FBBC05" d="M5.6 14.6a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3Z" />
      <path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.7 2.6 1.8 6.4l3.8 3C6.5 6.7 9 4.8 12 4.8Z" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a5f3c4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
