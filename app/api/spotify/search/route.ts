import { NextRequest, NextResponse } from 'next/server';
import { searchAlbums, SpotifyApiError } from '@/lib/spotify';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ albums: [] });
  }

  if (query.length > 200) {
    return NextResponse.json(
      { error: 'invalid_query', message: 'Suchanfrage ist zu lang.' },
      { status: 400 }
    );
  }

  try {
    const albums = await searchAlbums(query);
    return NextResponse.json({ albums });
  } catch (err) {
    if (err instanceof SpotifyApiError) {
      return NextResponse.json(
        { error: 'spotify_error', message: err.message },
        { status: err.status }
      );
    }
    return NextResponse.json(
      { error: 'unknown_error', message: 'Unbekannter Fehler bei der Suche.' },
      { status: 500 }
    );
  }
}
