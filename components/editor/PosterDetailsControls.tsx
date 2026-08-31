'use client';

import type { ReactNode } from 'react';
import { usePosterStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { useT } from '@/lib/i18n';

export function PosterDetailsControls() {
  const t = useT();
  const albumName = usePosterStore((s) => s.poster.albumName);
  const artistName = usePosterStore((s) => s.poster.artistName);
  const releaseYear = usePosterStore((s) => s.poster.releaseYear);
  const releaseDate = usePosterStore((s) => s.poster.releaseDate);
  const recordLabel = usePosterStore((s) => s.poster.recordLabel);
  const setPosterField = usePosterStore((s) => s.setPosterField);

  return (
    <div className="flex flex-col gap-3">
      <Field label={t('details.albumName')}>
        <Input
          value={albumName}
          onChange={(e) => setPosterField('albumName', e.target.value)}
        />
      </Field>

      <Field label={t('details.artistName')}>
        <Input
          value={artistName}
          onChange={(e) => setPosterField('artistName', e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label={t('details.releaseYear')}>
          <Input
            value={releaseYear}
            inputMode="numeric"
            onChange={(e) => setPosterField('releaseYear', e.target.value)}
          />
        </Field>
        <Field label={t('details.releaseDate')}>
          <Input
            type="date"
            value={releaseDate}
            onChange={(e) => setPosterField('releaseDate', e.target.value)}
          />
        </Field>
      </div>

      <Field label={t('details.recordLabel')}>
        <Input
          value={recordLabel ?? ''}
          placeholder={t('details.recordLabelPlaceholder')}
          onChange={(e) => setPosterField('recordLabel', e.target.value)}
        />
      </Field>

      <p className="text-xs text-muted">{t('details.hint')}</p>
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
