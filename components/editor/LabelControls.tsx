'use client';

import { RotateCcw } from 'lucide-react';
import { usePosterStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { DEFAULT_LABELS } from '@/lib/poster';
import { LabelKey, TemplateId } from '@/types/poster';

// Welche überschreibbaren Beschriftungen in welchem Template sichtbar sind.
const LABELS_BY_TEMPLATE: Partial<Record<TemplateId, { key: LabelKey; label: string }[]>> = {
  photo: [
    { key: 'photoAlbumBy', label: '"An album by" prefix' },
    { key: 'photoReleaseDate', label: 'Release date heading' },
    { key: 'photoRecordLabel', label: 'Record label heading' },
    { key: 'photoAlbumLength', label: 'Album length heading' }
  ],
  player: [{ key: 'playerCurrentTime', label: 'Playback timestamp' }]
};

export function LabelControls() {
  const template = usePosterStore((s) => s.template);
  const labels = usePosterStore((s) => s.labels);
  const setLabel = usePosterStore((s) => s.setLabel);
  const resetLabels = usePosterStore((s) => s.resetLabels);

  const fields = LABELS_BY_TEMPLATE[template];

  if (!fields) {
    return (
      <p className="text-xs text-muted">
        The {template} template has no custom labels. Switch to Photo or Player to
        edit theirs.
      </p>
    );
  }

  const isModified = fields.some(({ key }) => labels[key] !== DEFAULT_LABELS[key]);

  return (
    <div className="flex flex-col gap-3">
      {fields.map(({ key, label }) => (
        <label key={key} className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-muted">{label}</span>
          <Input
            value={labels[key]}
            placeholder={DEFAULT_LABELS[key]}
            onChange={(e) => setLabel(key, e.target.value)}
          />
        </label>
      ))}

      {isModified && (
        <button
          type="button"
          onClick={resetLabels}
          className="flex items-center gap-1.5 self-start text-xs font-medium text-muted transition-colors hover:text-ink"
        >
          <RotateCcw className="h-3 w-3" />
          Reset labels to default
        </button>
      )}
    </div>
  );
}
