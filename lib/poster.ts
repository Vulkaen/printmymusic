import { SpotifyAlbumDetail } from '@/types/spotify';
import { PosterData, Track } from '@/types/poster';
import { formatDuration } from '@/lib/utils';

export function spotifyAlbumToPosterData(album: SpotifyAlbumDetail): PosterData {
  const tracks: Track[] = album.tracks
    .slice()
    .sort((a, b) => a.discNumber - b.discNumber || a.trackNumber - b.trackNumber)
    .map((t) => ({
      number: t.trackNumber,
      name: t.name,
      duration: formatDuration(t.durationMs),
      durationMs: t.durationMs
    }));

  const bestImage = album.images.sort((a, b) => (b.width ?? 0) - (a.width ?? 0))[0];

  return {
    albumId: album.id,
    albumName: album.name,
    artistName: album.artists.map((a) => a.name).join(', '),
    releaseYear: album.releaseYear,
    releaseDate: album.releaseDate,
    recordLabel: album.recordLabel,
    coverImage: bestImage?.url ?? null,
    tracks,
    spotifyUrl: album.spotifyUrl
  };
}

export function demoPosterData(): PosterData {
  return {
    albumId: null,
    albumName: 'Choose Your Album',
    artistName: 'Artist Name',
    releaseYear: '2026',
    releaseDate: '2026-01-01',
    recordLabel: 'Independent',
    coverImage: null,
    tracks: Array.from({ length: 10 }, (_, i) => ({
      number: i + 1,
      name: 'Track Name',
      duration: '3:24',
      durationMs: 204000
    })),
    spotifyUrl: null
  };
}

/** Verteilt Tracks gleichmäßig auf n Spalten für Tracklisten-Layouts. */
export function splitTracksIntoColumns(tracks: Track[], columns: number): Track[][] {
  if (columns <= 1) return [tracks];
  const perColumn = Math.ceil(tracks.length / columns);
  const result: Track[][] = [];
  for (let i = 0; i < columns; i++) {
    result.push(tracks.slice(i * perColumn, (i + 1) * perColumn));
  }
  return result;
}

/** Summiert alle Tracklängen zur Gesamtlaufzeit des Albums (mm:ss). */
export function sumTrackDurations(tracks: Track[]): string {
  const totalMs = tracks.reduce((sum, t) => sum + t.durationMs, 0);
  return formatDuration(totalMs);
}

/** Leitet über die Image-Proxy-Route eine CORS-sichere URL für Canvas-Export ab. */
export function proxiedImageUrl(originalUrl: string | null): string | null {
  if (!originalUrl) return null;
  // Bereits eingebettete Data-URLs (z.B. beim Export vorab geladen) brauchen
  // keinen Proxy - sie sind schon lokal und CORS-sicher.
  if (originalUrl.startsWith('data:')) return originalUrl;
  return `/api/image-proxy?url=${encodeURIComponent(originalUrl)}`;
}
