import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getBalance } from '@/lib/db';
import { rateLimit, tooManyRequests } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Bitte einloggen.' }, { status: 401 });
  }

  const limit = rateLimit(`balance:${userId}`, 80, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSec);

  try {
    const credits = await getBalance(userId);
    return NextResponse.json({ credits });
  } catch {
    return NextResponse.json(
      { error: 'server_error', message: 'Guthaben konnte nicht geladen werden.' },
      { status: 500 }
    );
  }
}
