import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { auth } from "@/lib/auth";
import { CopyButton } from "@/components/CopyButton";
import { AnimatedPreview } from "@/components/AnimatedPreview";
import { animKind } from "@/lib/previews";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = await prisma.template.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });
  if (!t) return { title: "Template not found" };
  const title = `${t.title} — animated template & AI prompt`;
  const description =
    t.description || "A ready-to-use animated template with a copy-paste AI prompt.";
  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await prisma.template.findUnique({ where: { slug } });
  if (!template) notFound();

  // count a view (fire-and-forget semantics are fine here)
  await prisma.template.update({
    where: { id: template.id },
    data: { views: { increment: 1 } },
  });

  const session = await auth();
  const plan = session?.user?.plan ?? "FREE";
  const locked = template.tier === "PREMIUM" && plan !== "UNLIMITED";

  const related = await prisma.template.findMany({
    where: { category: template.category, slug: { not: template.slug } },
    orderBy: { views: "desc" },
    take: 3,
  });

  return (
    <div className="container-x py-10">
      <Link href="/" className="text-sm text-muted transition hover:text-foreground">
        ← Back to gallery
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* preview */}
        <div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10">
            {template.previewVideo ? (
              <video
                src={template.previewVideo}
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <div className="absolute inset-0">
                <AnimatedPreview
                  kind={animKind(template.slug, template.category)}
                  gradient={template.gradient}
                />
              </div>
            )}
          </div>

          {/* animation embed area — you'll paste your animation code here later */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Live animation</h2>
            {template.animationCode ? (
              <div
                className="mt-3 overflow-hidden rounded-2xl border border-white/10"
                dangerouslySetInnerHTML={{ __html: template.animationCode }}
              />
            ) : (
              <>
                <div className="mt-3 aspect-video overflow-hidden rounded-2xl border border-white/10">
                  <AnimatedPreview
                    kind={animKind(template.slug, template.category)}
                    gradient={template.gradient}
                  />
                </div>
                <p className="mt-2 text-xs text-muted">
                  Live motion preview. Copy the prompt to generate the full
                  animated page in your AI builder.
                </p>
              </>
            )}
          </div>
        </div>

        {/* sidebar */}
        <aside>
          <div className="flex items-center gap-3">
            <span className={template.tier === "FREE" ? "badge badge-free" : "badge badge-premium"}>
              {template.tier === "FREE" ? "Free" : "Premium"}
            </span>
            <span className="text-xs text-muted">{template.views.toLocaleString()} views</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight">{template.title}</h1>
          <p className="mt-1 text-sm capitalize text-muted">{template.category}</p>
          {template.description && (
            <p className="mt-4 text-muted">{template.description}</p>
          )}
          {template.tags && (
            <div className="mt-4 flex flex-wrap gap-2">
              {template.tags.split(",").map((tag) => (
                <span key={tag} className="rounded-full bg-white/6 px-2.5 py-1 text-xs text-muted">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* prompt block */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-surface p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              AI Prompt
            </h2>

            {locked ? (
              <div className="mt-4">
                <div className="select-none rounded-xl bg-surface-2 p-4 font-mono text-sm text-muted blur-[6px]">
                  This premium prompt is hidden. Upgrade to Unlimited to copy every
                  premium prompt on Motion Web instantly…
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Link href="/pricing" className="btn-primary justify-center">
                    🔓 Go Unlimited to unlock
                  </Link>
                  {!session && (
                    <Link href="/login" className="btn-ghost justify-center text-sm">
                      Already subscribed? Log in
                    </Link>
                  )}
                </div>
              </div>
            ) : template.prompt ? (
              <div className="mt-4">
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap rounded-xl bg-surface-2 p-4 font-mono text-sm text-white/85">
                  {template.prompt}
                </pre>
                <div className="mt-4">
                  <CopyButton text={template.prompt} />
                </div>
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-white/15 p-4 text-sm text-muted">
                Prompt slot — fill the <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs">prompt</code> field
                for this template and the copy button appears automatically.
              </div>
            )}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-lg font-semibold capitalize">
              More {template.category} templates
            </h2>
            <Link
              href={`/?category=${template.category}`}
              className="text-sm text-muted transition hover:text-foreground"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/t/${r.slug}`}
                className="card group block overflow-hidden"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div className="absolute inset-0">
                    <AnimatedPreview
                      kind={animKind(r.slug, r.category)}
                      gradient={r.gradient}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 p-4">
                  <h3 className="font-semibold leading-tight">{r.title}</h3>
                  <span className={r.tier === "FREE" ? "badge badge-free" : "badge badge-premium"}>
                    {r.tier === "FREE" ? "Free" : "Premium"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
