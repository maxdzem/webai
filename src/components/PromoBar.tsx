"use client";

import { useEffect, useState } from "react";

// The "glitch that's actually a feature": one country quietly gets 50% off,
// everyone else gets the normal 30%. Change SPECIAL_COUNTRY to taste.
const SPECIAL_COUNTRY = "PL"; // 🇵🇱 Poland → 50%
const SPECIAL_CODE = "PL50";
const DEFAULT_CODE = "MOTION30";

function flagEmoji(cc?: string | null) {
  if (!cc || !/^[A-Za-z]{2}$/.test(cc)) return "🌍";
  const base = 0x1f1e6;
  return String.fromCodePoint(
    ...[...cc.toUpperCase()].map((c) => base + c.charCodeAt(0) - 65)
  );
}

function countryName(cc?: string | null) {
  if (!cc) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(cc.toUpperCase()) ?? null;
  } catch {
    return null;
  }
}

export function PromoBar() {
  const [show, setShow] = useState(true);
  const [copied, setCopied] = useState(false);
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem("mw_promo_dismissed")) setShow(false);
    } catch {}
  }, []);

  // Detect visitor country (Cloudflare trace on the live domain, geo-API fallback)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const r = await fetch("/cdn-cgi/trace", { cache: "no-store" });
        if (r.ok) {
          const m = (await r.text()).match(/loc=([A-Z]{2})/);
          if (m && !cancelled) {
            setCountry(m[1]);
            return;
          }
        }
      } catch {}
      try {
        const r = await fetch("https://ipapi.co/json/");
        if (r.ok) {
          const j = await r.json();
          if (j?.country_code && !cancelled) setCountry(String(j.country_code));
        }
      } catch {}
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!show) return null;

  const special = country?.toUpperCase() === SPECIAL_COUNTRY;
  const percent = special ? 50 : 30;
  const code = special ? SPECIAL_CODE : DEFAULT_CODE;
  const flag = flagEmoji(country);
  const name = countryName(country);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  }
  function dismiss() {
    setShow(false);
    try {
      localStorage.setItem("mw_promo_dismissed", "1");
    } catch {}
  }
  function openLogin() {
    window.dispatchEvent(new CustomEvent("mw:login"));
  }

  return (
    <div className="relative z-[60] flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 px-12 py-2 text-center text-[0.82rem] text-white">
      <span className="leading-tight">
        <span className="mr-1">{flag}</span>
        {special ? (
          <>
            Pricing glitch spotted — {name ?? "your country"} unlocked{" "}
            <b className="font-semibold">50% off</b>! Use{" "}
            <CodeButton code={copied ? "copied!" : code} onClick={copyCode} />{" "}
            before we “fix” it 😉
          </>
        ) : (
          <>
            We support fair pricing{name ? ` in ${name}` : " worldwide"} — use{" "}
            <CodeButton code={copied ? "copied!" : code} onClick={copyCode} /> for{" "}
            <b className="font-semibold">{percent}% off</b> Unlimited.
          </>
        )}
      </span>

      <button
        onClick={openLogin}
        className="shrink-0 rounded-md border border-white/30 bg-white/10 px-2.5 py-0.5 text-xs font-medium transition hover:bg-white/20"
      >
        Log in
      </button>

      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-3 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-white/70 transition hover:bg-white/15 hover:text-white"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}

function CodeButton({ code, onClick }: { code: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-white/15 px-1.5 py-0.5 font-semibold tracking-wide transition hover:bg-white/25"
      title="Click to copy"
    >
      {code}
    </button>
  );
}
