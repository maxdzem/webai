import Link from "next/link";
import { AnimatedPreview } from "@/components/AnimatedPreview";
import type { AnimKind } from "@/lib/previews";

const G1 = "linear-gradient(135deg,#052e16,#10b981)";
const G2 = "linear-gradient(135deg,#0ea5e9,#d946ef)";
const G3 = "linear-gradient(135deg,#111827,#4f46e5)";
const GROUP_ROT = "rotateY(-24deg) rotateX(9deg) rotate(3deg)";

export function CtaBanner() {
  return (
    <section className="container-x pb-16 pt-8">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0e0e13] px-6 py-12 sm:px-10 lg:py-16">
        {/* ambient glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-10 h-80 w-80 rounded-full bg-fuchsia-600/10 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left — copy */}
          <div>
            <div className="mb-6 flex items-center gap-2 text-base font-bold tracking-tight">
              <span className="inline-block h-6 w-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-500 shadow-[0_0_16px_rgba(139,92,246,0.6)]" />
              Motion <span className="text-gradient">Web</span>
            </div>

            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              Ship animated sites
              <br />
              in <span className="text-gradient">an afternoon</span>.
            </h2>

            <p className="mt-5 max-w-md text-base italic leading-relaxed text-muted">
              “Give me one prompt and ten minutes — I&apos;ll show you a landing
              page people stop to screenshot.”
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/#gallery"
                className="rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-orange-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(217,70,239,0.5)] transition hover:opacity-95"
              >
                Explore all templates →
              </Link>
              <a
                href="https://github.com/maxdzem/webai"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* right — tilted screen collage (original, built from our animations) */}
          <div
            className="relative hidden h-[340px] lg:block"
            style={{ perspective: "1100px" }}
            aria-hidden
          >
            <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: GROUP_ROT }}>
              <Screen kind="aurora" gradient={G1} style={{ left: "34%", top: "2%", width: "58%", transform: "translateZ(0px)" }} />
              <Screen kind="neon" gradient={G2} style={{ left: "16%", top: "26%", width: "62%", transform: "translateZ(55px)" }} />
              <Screen kind="terminal" gradient={G3} browser style={{ left: "-2%", top: "50%", width: "64%", transform: "translateZ(115px)" }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Screen({
  kind,
  gradient,
  style,
  browser,
}: {
  kind: AnimKind;
  gradient: string;
  style: React.CSSProperties;
  browser?: boolean;
}) {
  return (
    <div
      className="absolute aspect-[16/10] overflow-hidden rounded-xl border border-white/12 bg-black shadow-[0_24px_60px_-20px_rgba(0,0,0,0.85)]"
      style={style}
    >
      {browser && (
        <div className="absolute inset-x-0 top-0 z-10 flex h-5 items-center gap-1 bg-black/40 px-2 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
        </div>
      )}
      <AnimatedPreview kind={kind} gradient={gradient} />
    </div>
  );
}
