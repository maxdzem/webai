import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "Dashboard — Motion Web" };
export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { upgraded } = await searchParams;
  const plan = session.user.plan ?? "FREE";
  const [total, premium] = await Promise.all([
    prisma.template.count(),
    prisma.template.count({ where: { tier: "PREMIUM" } }),
  ]);

  return (
    <div className="container-x max-w-3xl py-16">
      {upgraded && (
        <div className="mb-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-emerald-300">
          🎉 Welcome to Unlimited! Every premium template is now unlocked.
        </div>
      )}

      <h1 className="text-3xl font-bold tracking-tight">
        Hey, {session.user.name ?? session.user.email} 👋
      </h1>
      <p className="mt-2 text-muted">Manage your account and subscription.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="card !rounded-2xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Plan</h2>
          <p className="mt-2 text-2xl font-bold">
            {plan === "UNLIMITED" ? (
              <span className="text-gradient">Unlimited ✦</span>
            ) : (
              "Free"
            )}
          </p>
          {plan !== "UNLIMITED" && (
            <Link href="/pricing" className="btn-primary mt-4 text-sm">
              Upgrade to Unlimited
            </Link>
          )}
        </div>
        <div className="card !rounded-2xl p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Library access</h2>
          <p className="mt-2 text-2xl font-bold">
            {plan === "UNLIMITED" ? total : total - premium}
            <span className="text-base font-normal text-muted"> / {total} templates</span>
          </p>
          <Link href="/" className="btn-ghost mt-4 text-sm">
            Browse gallery
          </Link>
        </div>
      </div>

      <div className="card mt-4 !rounded-2xl p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Account</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted">Email</dt>
            <dd>{session.user.email}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Name</dt>
            <dd>{session.user.name ?? "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
