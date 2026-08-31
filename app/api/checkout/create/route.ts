import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import { CREDIT_PACKS } from '@/lib/creditPacks';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Bitte einloggen.' }, { status: 401 });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'not_configured', message: 'Bezahlung ist noch nicht eingerichtet.' },
      { status: 500 }
    );
  }

  let packId: string;
  try {
    const body = await request.json();
    packId = body.packId;
  } catch {
    return NextResponse.json({ error: 'invalid_request', message: 'Kein Paket ausgewählt.' }, { status: 400 });
  }

  const pack = CREDIT_PACKS.find((p) => p.id === packId);
  if (!pack || !pack.priceId) {
    return NextResponse.json(
      { error: 'invalid_pack', message: 'Dieses Paket ist nicht verfügbar.' },
      { status: 400 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = request.headers.get('origin') ?? '';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: pack.priceId, quantity: 1 }],
      success_url: `${origin}/create?checkout=success`,
      cancel_url: `${origin}/create?checkout=cancelled`,
      client_reference_id: userId,
      // Wird im Webhook wieder ausgelesen - von Stripe signiert übermittelt,
      // kann vom Kunden nicht manipuliert werden.
      metadata: { userId, credits: String(pack.credits) }
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: 'stripe_error', message: 'Checkout konnte nicht gestartet werden.' },
      { status: 500 }
    );
  }
}
