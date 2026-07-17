import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

/**
 * Upgrade endpoint.
 *
 * DEV MODE (no Stripe keys): instantly marks the user as UNLIMITED so you can
 * test the whole flow end-to-end.
 *
 * PRODUCTION: set STRIPE_SECRET_KEY etc. in .env, then replace the body of
 * this handler with a Stripe Checkout Session redirect:
 *
 *   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
 *   const session = await stripe.checkout.sessions.create({
 *     mode: "subscription",
 *     customer_email: user.email,
 *     line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY!, quantity: 1 }],
 *     success_url: `${origin}/dashboard?upgraded=1`,
 *     cancel_url: `${origin}/pricing`,
 *   });
 *   return NextResponse.json({ url: session.url });
 *
 * ...and set plan="UNLIMITED" from the Stripe webhook instead.
 */
export async function POST() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (process.env.STRIPE_SECRET_KEY) {
    // Stripe is configured but the checkout integration isn't wired up yet.
    return NextResponse.json(
      { error: "Stripe checkout not implemented yet — see comments in this file." },
      { status: 501 }
    );
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { plan: "UNLIMITED" },
  });

  return NextResponse.json({ ok: true, url: "/dashboard?upgraded=1" });
}
