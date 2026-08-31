import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { getBalance } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET() {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Bitte einloggen.' }, { status: 401 });
  }

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
