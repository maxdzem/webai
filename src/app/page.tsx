import { Suspense } from "react";
import { Gallery } from "@/components/Gallery";
import { CtaBanner } from "@/components/CtaBanner";
import { getAllTemplates } from "@/lib/templates";

export default function Home() {
  const templates = getAllTemplates();

  return (
    <div className="relative">
      {/* hero */}
      <section className="relative overflow-hidden pb-10 pt-20 md:pt-28">
        <div className="hero-glow" />
        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="container-x relative text-center">
          <div className="fade-up mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-sm text-muted">
            <span className="pulse-soft inline-block h-2 w-2 rounded-full bg-emerald-400" />
            {templates.length}+ animated templates &amp; growing
          </div>
          <h1 className="fade-up fade-up-1 mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Unlock your <span className="text-gradient">AI Design</span> Superpowers
          </h1>
          <p className="fade-up fade-up-2 mx-auto mt-5 max-w-xl text-lg text-muted">
            Build beautiful animated landing pages in minutes with ready-to-use prompts.
            Just copy, paste, and launch.
          </p>
        </div>
      </section>

      {/* search + gallery */}
      <section className="container-x pb-10">
        <Suspense>
          <Gallery templates={templates} />
        </Suspense>
      </section>

      {/* bottom CTA banner */}
      <CtaBanner />
    </div>
  );
}
