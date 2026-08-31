'use client';

import { X } from 'lucide-react';
import { usePosterStore } from '@/lib/store';

export function TrackNameEditor() {
  const tracks = usePosterStore((s) => s.poster.tracks);
  const updateTrackName = usePosterStore((s) => s.updateTrackName);
  const updateTrackDuration = usePosterStore((s) => s.updateTrackDuration);
  const removeTrack = usePosterStore((s) => s.removeTrack);

  if (tracks.length === 0) {
    return <p className="text-xs text-muted">Load an album first to edit its tracks.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex max-h-72 flex-col gap-1.5 overflow-y-auto pr-1">
        {tracks.map((track, i) => {
          const totalSeconds = Math.round(track.durationMs / 1000);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          return (
            <div key={i} className="flex items-center gap-2">
              <span className="w-5 shrink-0 text-xs text-muted">
                {String(track.number).padStart(2, '0')}
              </span>
              <input
                type="text"
                value={track.name}
                onChange={(e) => updateTrackName(i, e.target.value)}
                className="h-8 min-w-0 flex-1 rounded-md border border-border bg-surface px-2 text-xs text-ink outline-none focus:ring-2 focus:ring-ink/10"
              />
              <div className="flex shrink-0 items-center gap-1">
                <input
                  type="number"
                  min={0}
                  value={minutes}
                  onChange={(e) => updateTrackDuration(i, Number(e.target.value), seconds)}
                  aria-label={`Track ${track.number} minutes`}
                  className="h-8 w-11 rounded-md border border-border bg-surface px-1.5 text-center text-xs text-ink outline-none focus:ring-2 focus:ring-ink/10"
                />
                <span className="text-xs text-muted">:</span>
                <input
                  type="number"
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(e) => updateTrackDuration(i, minutes, Number(e.target.value))}
                  aria-label={`Track ${track.number} seconds`}
                  className="h-8 w-11 rounded-md border border-border bg-surface px-1.5 text-center text-xs text-ink outline-none focus:ring-2 focus:ring-ink/10"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTrack(i)}
                aria-label={`Remove track ${track.number}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-surface text-muted transition-colors hover:border-red-400 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-muted">
        {tracks.length} track{tracks.length === 1 ? '' : 's'} · minutes : seconds
      </p>
    </div>
  );
}
