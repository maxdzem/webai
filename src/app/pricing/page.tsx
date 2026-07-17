import Link from "next/link";
import { auth } from "@/lib/auth";
import { UpgradeButton } from "@/components/UpgradeButton";

export const metadata = { title: "Pricing — Motion Web" };

const FREE_FEATURES = [
  "Access to all free templates",
  "Copy free prompts instantly",
  "Community support",
  "New free drops every month",
];

const UNLIMITED_FEATURES = [
  "Everything in Free",
  "Unlock ALL premium templates & prompts",
  "Animated backgrounds library",
  "Early access to new drops",
  "Commercial license",
  "Priority support",
];

export default async function PricingPage() {
  const session = await auth();
  const plan = session?.user?.plan ?? "FREE";

  return (
    <div className="relative">
      <section className="relative overflow-hidden pb-4 pt-20 text-center">
        <div className="hero-glow" />
        <div className="container-x relative">
          <h1 className="fade-up text-4xl font-bold tracking-tight md:text-5xl">
            Simple, honest <span className="text-gradient">pricing</span>
          </h1>
          <p className="fade-up fade-up-1 mx-auto mt-4 max-w-lg text-lg text-muted">
            Start free. Upgrade once, unlock every premium template and prompt forever
            growing library included.
          </p>
        </div>
      </section>

      <section className="container-x grid max-w-4xl gap-6 py-12 md:grid-cols-2">
        {/* Free */}
        <div className="card !rounded-2xl p-8">
          <h2 className="text-lg font-semibold">Free</h2>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold">$0</span>
            <span className="text-muted">/ forever</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-muted">
                <span className="mt-0.5 text-emerald-400">✓</span> {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {session ? (
              <span className="btn-ghost w-full justify-center text-sm text-muted">
                {plan === "FREE" ? "Your current plan" : "Included in Unlimited"}
              </span>
            ) : (
              <Link href="/register" className="btn-ghost w-full justify-center">
                Sign up free
              </Link>
            )}
          </div>
        </div>

        {/* Unlimited */}
        <div className="card relative !rounded-2xl border-violet-500/40 p-8 shadow-[0_0_60px_-15px_rgba(139,92,246,0.4)]">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-1 text-xs font-bold text-white">
            MOST POPULAR
          </span>
          <h2 className="text-lg font-semibold">Unlimited</h2>
          <div className="mt-3 flex items-baseline gap-1">
            <span className="text-4xl font-bold">$19</span>
            <span className="text-muted">/ month</span>
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {UNLIMITED_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 text-violet-400">✓</span> {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            {plan === "UNLIMITED" ? (
              <span className="btn-ghost w-full justify-center text-sm">
                ✓ You&apos;re on Unlimited
              </span>
            ) : session ? (
              <UpgradeButton />
            ) : (
              <Link href="/register" className="btn-primary w-full justify-center">
                Go Unlimited
              </Link>
            )}
          </div>
        </div>
      </section>

      <p className="pb-16 text-center text-xs text-muted">
        Payments are processed securely. Cancel anytime.
      </p>
    </div>
  );
}
