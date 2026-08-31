import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { consumeCredits } from '@/lib/db';
import { rateLimit, tooManyRequests } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Bitte einloggen.' }, { status: 401 });
  }

  const limit = rateLimit(`consume:${userId}`, 40, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSec);

  // Kosten: 1 Credit für einen normalen Export. Sobald die Funktion für
  // eigene, personalisierte Cover existiert (Phase 3), wird von dort aus
  // cost: 2 übergeben.
  let cost = 1;
  try {
    const body = await request.json();
    if (body?.cost === 2) cost = 2;
  } catch {
    // kein Body übergeben - Standardkosten bleiben bei 1
  }

  try {
    const result = await consumeCredits(userId, cost);

    if (!result.ok) {
      return NextResponse.json(
        {
          error: 'insufficient_credits',
          message: 'Nicht genug Credits.',
          credits: result.credits
        },
        { status: 402 }
      );
    }

    return NextResponse.json({ credits: result.credits });
  } catch {
    return NextResponse.json(
      { error: 'server_error', message: 'Credits konnten nicht abgebucht werden.' },
      { status: 500 }
    );
  }
}
