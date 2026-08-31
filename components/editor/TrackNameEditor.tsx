'use client';

import { usePosterStore } from '@/lib/store';

export function TrackNameEditor() {
  const tracks = usePosterStore((s) => s.poster.tracks);
  const updateTrackName = usePosterStore((s) => s.updateTrackName);

  if (tracks.length === 0) {
    return <p className="text-xs text-muted">Load an album first to edit its track names.</p>;
  }

  return (
    <div className="flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
      {tracks.map((track, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-5 shrink-0 text-xs text-muted">{String(track.number).padStart(2, '0')}</span>
          <input
            type="text"
            value={track.name}
            onChange={(e) => updateTrackName(i, e.target.value)}
            className="h-8 w-full rounded-md border border-border bg-surface px-2 text-xs text-ink outline-none focus:ring-2 focus:ring-ink/10"
          />
        </div>
      ))}
    </div>
  );
}
