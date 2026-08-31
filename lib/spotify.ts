import {
  SpotifyAlbumDetail,
  SpotifyAlbumSearchItem,
  SpotifyImage,
  SpotifyTrackItem
} from '@/types/spotify';
import { extractYear, formatDuration } from '@/lib/utils';

/**
 * Musik-Metadaten-Quelle: Deezer Public API.
 *
 * Bewusste Entscheidung statt Spotify Web API: Deezers Katalog-Endpunkte
 * (/search, /album, /track) sind vollständig öffentlich und benötigen
 * WEDER einen Account NOCH einen API-Key. Das umgeht zuverlässig die
 * aktuellen Einschränkungen im Spotify Developer Dashboard (dort ist die
 * "Create app"-Funktion seit Ende 2025 zeitweise deaktiviert bzw. auf
 * ein Development-App-Limit beschränkt).
 *
 * Die Typnamen (SpotifyAlbumSearchItem, SpotifyAlbumDetail, ...) wurden
 * absichtlich beibehalten, um den Rest der Anwendung (Komponenten, API-
 * Routen, State) unverändert zu lassen - inhaltlich stammen die Daten
 * nun jedoch vollständig von Deezer.
 */

const API_BASE = 'https://api.deezer.com';

export class SpotifyApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'SpotifyApiError';
    this.status = status;
  }
}

interface DeezerErrorBody {
  error?: { type: string; message: string; code: number };
}

async function deezerFetch<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  } catch {
    throw new SpotifyApiError('Deezer konnte nicht erreicht werden.', 502);
  }

  if (!response.ok) {
    throw new SpotifyApiError(`Deezer API Fehler (${response.status})`, response.status);
  }

  const data = (await response.json()) as T & DeezerErrorBody;

  if (data && typeof data === 'object' && 'error' in data && data.error) {
    // Deezer meldet Fehler (auch Rate Limits) inhaltlich mit HTTP 200.
    const code = data.error.code;
    const status = code === 4 ? 429 : code === 800 ? 404 : 400;
    throw new SpotifyApiError(
      status === 429
        ? 'Deezer Rate Limit erreicht. Bitte kurz warten und erneut versuchen.'
        : data.error.message || 'Deezer API Fehler.',
      status
    );
  }

  return data;
}

interface DeezerArtist {
  id: number;
  name: string;
}

interface DeezerAlbumSearchItem {
  id: number;
  title: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
  nb_tracks?: number;
  record_type?: string;
  link?: string;
  artist: DeezerArtist;
}

interface DeezerSearchAlbumResponse {
  data: DeezerAlbumSearchItem[];
  total?: number;
}

function buildImagesFromCovers(covers: {
  small?: string;
  medium?: string;
  big?: string;
  xl?: string;
}): SpotifyImage[] {
  const images: SpotifyImage[] = [];
  if (covers.xl) images.push({ url: covers.xl, width: 1000, height: 1000 });
  if (covers.big) images.push({ url: covers.big, width: 500, height: 500 });
  if (covers.medium) images.push({ url: covers.medium, width: 250, height: 250 });
  if (covers.small) images.push({ url: covers.small, width: 56, height: 56 });
  return images;
}

export async function searchAlbums(query: string, limit = 12): Promise<SpotifyAlbumSearchItem[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const params = new URLSearchParams({
    q: trimmed,
    limit: String(Math.min(limit, 25))
  });

  const data = await deezerFetch<DeezerSearchAlbumResponse>(`/search/album?${params.toString()}`);
  const items = data.data ?? [];

  const seen = new Set<string>();
  const results: SpotifyAlbumSearchItem[] = [];

  for (const item of items) {
    if (!item?.artist) continue;
    const dedupeKey = `${item.title}-${item.artist.name}`;
    if (seen.has(dedupeKey)) continue;
    seen.add(dedupeKey);

    results.push({
      id: String(item.id),
      name: item.title,
      artists: [{ id: String(item.artist.id), name: item.artist.name }],
      images: buildImagesFromCovers({
        small: item.cover_small,
        medium: item.cover_medium,
        big: item.cover_big,
        xl: item.cover_xl
      }),
      releaseDate: '',
      releaseYear: '',
      albumType: item.record_type ?? 'album',
      totalTracks: item.nb_tracks ?? 0,
      spotifyUrl: item.link ?? `https://www.deezer.com/album/${item.id}`
    });
  }

  return results;
}

interface DeezerTrack {
  id: number;
  title: string;
  duration: number; // Sekunden
  disk_number?: number;
}

interface DeezerAlbumDetail {
  id: number;
  title: string;
  cover_small?: string;
  cover_medium?: string;
  cover_big?: string;
  cover_xl?: string;
  release_date?: string;
  label?: string;
  nb_tracks?: number;
  link?: string;
  artist: DeezerArtist;
  tracks?: { data: DeezerTrack[] };
}

const NUMERIC_ID_PATTERN = /^\d{1,15}$/;

export async function getAlbumById(albumId: string): Promise<SpotifyAlbumDetail> {
  const trimmed = albumId.trim();
  if (!NUMERIC_ID_PATTERN.test(trimmed)) {
    throw new SpotifyApiError('Ungültige Album-ID.', 400);
  }

  const data = await deezerFetch<DeezerAlbumDetail>(`/album/${trimmed}`);

  const rawTracks = data.tracks?.data ?? [];
  const tracks: SpotifyTrackItem[] = rawTracks.map((t, index) => ({
    id: String(t.id),
    name: t.title,
    trackNumber: index + 1,
    discNumber: t.disk_number ?? 1,
    durationMs: Math.round((t.duration ?? 0) * 1000)
  }));

  return {
    id: String(data.id),
    name: data.title,
    artists: [{ id: String(data.artist.id), name: data.artist.name }],
    images: buildImagesFromCovers({
      small: data.cover_small,
      medium: data.cover_medium,
      big: data.cover_big,
      xl: data.cover_xl
    }),
    releaseDate: data.release_date ?? '',
    releaseYear: extractYear(data.release_date ?? ''),
    recordLabel: data.label ?? null,
    totalTracks: data.nb_tracks ?? tracks.length,
    spotifyUrl: data.link ?? `https://www.deezer.com/album/${data.id}`,
    tracks
  };
}

export function trackDurationLabel(ms: number): string {
  return formatDuration(ms);
}
