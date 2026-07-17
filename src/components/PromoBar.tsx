"use client";

import { useEffect, useState } from "react";

const CODE = "MOTION30";

export function PromoBar() {
  const [show, setShow] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem("mw_promo_dismissed")) setShow(false);
    } catch {}
  }, []);

  if (!show) return null;

  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem("mw_promo_dismissed", "1");
    } catch {}
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <div className="relative z-[60] flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 px-10 py-2 text-center text-[0.82rem] text-white">
      <span className="leading-tight">
        🌍 We support fair pricing worldwide — use code{" "}
        <button
          onClick={copyCode}
          className="rounded-md bg-white/15 px-1.5 py-0.5 font-semibold tracking-wide transition hover:bg-white/25"
          title="Click to copy"
        >
          {copied ? "copied!" : CODE}
        </button>{" "}
        for <b className="font-semibold">30% off</b> Unlimited.
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 -translate-y-1/2 grid h-5 w-5 place-items-center rounded text-white/70 transition hover:bg-white/15 hover:text-white"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}
