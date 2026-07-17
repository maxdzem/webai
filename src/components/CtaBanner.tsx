import Link from "next/link";

export function CtaBanner() {
  return (
    <section className="container-x pb-16 pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 px-6 py-14 text-center sm:px-12">
        {/* animated gradient backdrop */}
        <div
          className="absolute inset-0 -z-10 opacity-90"
          style={{
            background:
              "linear-gradient(120deg,#6d28d9 0%,#4f46e5 45%,#0ea5e9 100%)",
          }}
        />
        <div className="mfp -z-10 absolute inset-0">
          <div className="mfp-aurora">
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="absolute inset-0 -z-10 bg-black/25" />

        <div className="relative mx-auto max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
            Free &amp; open · new templates weekly
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ship your next animated site today
          </h2>
          <p className="mt-4 text-base text-white/85 sm:text-lg">
            Grab a ready-to-use prompt, drop it into your AI builder, and launch
            a beautiful animated page in minutes. Copy, paste, done.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/#gallery"
              className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-[#1a1030] transition hover:opacity-90"
            >
              Browse templates
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Go Unlimited →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
