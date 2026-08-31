'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2, Search, X } from 'lucide-react';
import { SpotifyAlbumSearchItem } from '@/types/spotify';
import { AlbumSearchResult } from '@/components/spotify/AlbumSearchResult';
import { debounce } from '@/lib/utils';
import { usePosterStore } from '@/lib/store';
import { spotifyAlbumToPosterData } from '@/lib/poster';

export function AlbumSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotifyAlbumSearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingAlbum, setIsLoadingAlbum] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const setPoster = usePosterStore((s) => s.setPoster);

  const runSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? 'Suche fehlgeschlagen.');
      }
      setResults(data.albums ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Suche fehlgeschlagen.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedSearch = useRef(debounce(runSearch, 400)).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function handleSelect(album: SpotifyAlbumSearchItem) {
    setIsOpen(false);
    setIsLoadingAlbum(true);
    setError(null);
    try {
      const res = await fetch(`/api/spotify/albums/${album.id}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? 'Album konnte nicht geladen werden.');
      }
      setPoster(spotifyAlbumToPosterData(data));
      setQuery('');
      setResults([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Album konnte nicht geladen werden.');
    } finally {
      setIsLoadingAlbum(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search for an album, artist or song..."
          className="h-11 w-full rounded-xl border border-border bg-surface pl-10 pr-9 text-sm text-ink placeholder:text-muted outline-none focus:ring-2 focus:ring-ink/10 focus:border-ink/30"
        />
        {(isLoading || isLoadingAlbum) && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted" />
        )}
        {query && !isLoading && !isLoadingAlbum && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setResults([]);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {isOpen && (query.trim().length > 0) && (
        <div className="absolute z-40 mt-2 max-h-80 w-full overflow-y-auto rounded-xl border border-border bg-surface p-2 shadow-panel animate-fadeIn">
          {error && <p className="px-2 py-3 text-sm text-red-600">{error}</p>}
          {!error && !isLoading && results.length === 0 && (
            <p className="px-2 py-3 text-sm text-muted">Keine Ergebnisse gefunden.</p>
          )}
          {!error &&
            results.map((album) => (
              <AlbumSearchResult key={album.id} album={album} onSelect={handleSelect} />
            ))}
        </div>
      )}
    </div>
  );
}
