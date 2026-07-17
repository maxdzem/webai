"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { GithubIcon } from "@/components/icons";

type Mode = "sign-in" | "sign-up";

export function AuthForm({ mode }: { mode: Mode }) {
  const isSignUp = mode === "sign-up";
  const [status, setStatus] = useState<"idle" | "loading" | "info">("idle");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // NOTE: front-end scaffold only. Wire this to your auth backend
    // (NextAuth / Supabase / Clerk) — see README "Auth" section.
    setStatus("loading");
    setTimeout(() => setStatus("info"), 700);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 flex flex-col items-center text-center">
        <Logo size={44} />
        <h1 className="mt-4 text-2xl font-semibold tracking-tight">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-1.5 text-sm text-[var(--text-muted)]">
          {isSignUp
            ? "Join the open prompt community. Free forever."
            : "Log in to save, like and submit prompts."}
        </p>
      </div>

      <div className="card p-6">
        {/* OAuth */}
        <div className="flex flex-col gap-2.5">
          <button className="btn btn-ghost w-full" onClick={() => setStatus("info")}>
            <GithubIcon width={18} height={18} /> Continue with GitHub
          </button>
          <button className="btn btn-ghost w-full" onClick={() => setStatus("info")}>
            <GoogleGlyph /> Continue with Google
          </button>
        </div>

        <div className="my-5 flex items-center gap-3 text-xs text-[var(--text-faint)]">
          <span className="h-px flex-1 bg-[var(--border)]" />
          or
          <span className="h-px flex-1 bg-[var(--border)]" />
        </div>

        {/* Email form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3.5">
          {isSignUp && (
            <Field label="Name" name="name" type="text" placeholder="Ada Lovelace" />
          )}
          <Field
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
          <Field
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            hint={
              isSignUp ? undefined : (
                <Link
                  href="/reset"
                  className="text-[var(--accent)] hover:underline"
                >
                  Forgot?
                </Link>
              )
            }
          />

          <button
            type="submit"
            className="btn btn-primary mt-1 w-full"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "…"
              : isSignUp
                ? "Create account"
                : "Log in"}
          </button>
        </form>

        {status === "info" && (
          <p className="mt-4 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-xs text-[var(--text-muted)]">
            This is a front-end scaffold. Connect an auth provider (NextAuth,
            Supabase or Clerk) to make it live — steps are in the README.
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
        {isSignUp ? "Already have an account? " : "New to webai? "}
        <Link
          href={isSignUp ? "/sign-in" : "/sign-up"}
          className="font-medium text-[var(--accent)] hover:underline"
        >
          {isSignUp ? "Log in" : "Create one"}
        </Link>
      </p>

      <p className="mt-3 text-center text-xs text-[var(--text-faint)]">
        By continuing you agree to use the library within each prompt&apos;s
        open license.
      </p>
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
      <span className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
        {label} {hint}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-[10px] border border-[var(--border)] bg-[var(--bg-elev)] px-3.5 py-2.5 text-sm outline-none transition-colors placeholder:text-[var(--text-faint)] focus:border-[var(--accent)]"
      />
    </label>
  );
}

function GoogleGlyph() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7C21.8 18.9 23 15.9 23 12.3Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.8H1.8v3C3.7 21.4 7.5 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.6 14.6a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6l3.8-3Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.2 15.1 0 12 0 7.5 0 3.7 2.6 1.8 6.4l3.8 3C6.5 6.7 9 4.8 12 4.8Z"
      />
    </svg>
  );
}
