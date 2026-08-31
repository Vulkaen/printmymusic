import { NextRequest, NextResponse } from 'next/server';
import { getAlbumById, SpotifyApiError } from '@/lib/spotify';

export const runtime = 'nodejs';

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
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
