import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { consumeCredits, recordExport } from '@/lib/db';
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
  let format: string | null = null;
  let quality: string | null = null;
  try {
    const body = await request.json();
    if (body?.cost === 2) cost = 2;
    if (typeof body?.format === 'string') format = body.format.slice(0, 16);
    if (typeof body?.quality === 'string') quality = body.quality.slice(0, 16);
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

    // Export protokollieren - Fehler dabei dürfen die Antwort nicht
    // beeinflussen (Credits sind bereits abgebucht, Export läuft).
    try {
      await recordExport(userId, format, quality, cost);
    } catch {
      // Logging fehlgeschlagen - bewusst ignoriert.
    }

    return NextResponse.json({ credits: result.credits });
  } catch {
    return NextResponse.json(
      { error: 'server_error', message: 'Credits konnten nicht abgebucht werden.' },
      { status: 500 }
    );
  }
}
