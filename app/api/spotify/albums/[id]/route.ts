import { NextRequest, NextResponse } from 'next/server';
import { getAlbumById, SpotifyApiError } from '@/lib/spotify';
import { clientIp, rateLimit, tooManyRequests } from '@/lib/rateLimit';

export const runtime = 'nodejs';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const limit = rateLimit(`album:${clientIp(request)}`, 80, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSec);

  try {
    const album = await getAlbumById(params.id);
    return NextResponse.json(album);
  } catch (err) {
    if (err instanceof SpotifyApiError) {
      return NextResponse.json(
        { error: 'spotify_error', message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error: 'unknown_error', message: 'Album konnte nicht geladen werden.' },
      { status: 500 }
    );
  }
}
