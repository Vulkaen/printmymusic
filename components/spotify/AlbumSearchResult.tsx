'use client';

import Image from 'next/image';
import { Disc3 } from 'lucide-react';
import { SpotifyAlbumSearchItem } from '@/types/spotify';

interface AlbumSearchResultProps {
  album: SpotifyAlbumSearchItem;
  onSelect: (album: SpotifyAlbumSearchItem) => void;
}

export function AlbumSearchResult({ album, onSelect }: AlbumSearchResultProps) {
  const cover = album.images[0]?.url;
  const artistNames = album.artists.map((a) => a.name).join(', ');

  return (
    <button
      type="button"
      onClick={() => onSelect(album)}
      className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-canvas"
    >
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md bg-border">
        {cover ? (
          <Image src={cover} alt={album.name} fill sizes="44px" className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted">
            <Disc3 className="h-5 w-5" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{album.name}</p>
        <p className="truncate text-xs text-muted">
          {artistNames}
          {album.releaseYear ? ` · ${album.releaseYear}` : ''}
        </p>
      </div>
    </button>
  );
}
