'use client';

import type { ReactNode } from 'react';
import { usePosterStore } from '@/lib/store';
import { Input } from '@/components/ui/input';

export function PosterDetailsControls() {
  const albumName = usePosterStore((s) => s.poster.albumName);
  const artistName = usePosterStore((s) => s.poster.artistName);
  const releaseYear = usePosterStore((s) => s.poster.releaseYear);
  const releaseDate = usePosterStore((s) => s.poster.releaseDate);
  const recordLabel = usePosterStore((s) => s.poster.recordLabel);
  const setPosterField = usePosterStore((s) => s.setPosterField);

  return (
    <div className="flex flex-col gap-3">
      <Field label="Album name">
        <Input
          value={albumName}
          onChange={(e) => setPosterField('albumName', e.target.value)}
        />
      </Field>

      <Field label="Artist name">
        <Input
          value={artistName}
          onChange={(e) => setPosterField('artistName', e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Release year">
          <Input
            value={releaseYear}
            inputMode="numeric"
            onChange={(e) => setPosterField('releaseYear', e.target.value)}
          />
        </Field>
        <Field label="Release date">
          <Input
            type="date"
            value={releaseDate}
            onChange={(e) => setPosterField('releaseDate', e.target.value)}
          />
        </Field>
      </div>

      <Field label="Record label">
        <Input
          value={recordLabel ?? ''}
          placeholder="e.g. Independent"
          onChange={(e) => setPosterField('recordLabel', e.target.value)}
        />
      </Field>

      <p className="text-xs text-muted">
        Release date and record label show on the Photo template. Editing the date
        keeps the year in sync.
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
