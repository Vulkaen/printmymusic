'use client';

import { usePosterStore } from '@/lib/store';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { POSTER_SIZES } from '@/lib/dimensions';
import { Orientation, PosterSizeId } from '@/types/poster';
import { cn } from '@/lib/utils';
import { RectangleVertical, RectangleHorizontal } from 'lucide-react';

export function SizeControls() {
  const posterSizeId = usePosterStore((s) => s.posterSizeId);
  const customWidthMm = usePosterStore((s) => s.customWidthMm);
  const customHeightMm = usePosterStore((s) => s.customHeightMm);
  const orientation = usePosterStore((s) => s.orientation);

  const setPosterSizeId = usePosterStore((s) => s.setPosterSizeId);
  const setCustomSize = usePosterStore((s) => s.setCustomSize);
  const setOrientation = usePosterStore((s) => s.setOrientation);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Poster size</span>
        <Select
          value={posterSizeId}
          onChange={(v) => setPosterSizeId(v as PosterSizeId)}
          options={POSTER_SIZES.map((s) => ({ value: s.id, label: s.label }))}
        />
      </div>

      {posterSizeId === 'custom' && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Width (mm)</span>
            <Input
              type="number"
              value={customWidthMm}
              min={50}
              max={2000}
              onChange={(e) => setCustomSize(Number(e.target.value), customHeightMm)}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-muted">Height (mm)</span>
            <Input
              type="number"
              value={customHeightMm}
              min={50}
              max={2000}
              onChange={(e) => setCustomSize(customWidthMm, Number(e.target.value))}
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Orientation</span>
        <div className="flex gap-2">
          {(['portrait', 'landscape'] as Orientation[]).map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setOrientation(o)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-sm capitalize transition-colors',
                orientation === o
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface text-ink hover:border-ink/30'
              )}
            >
              {o === 'portrait' ? (
                <RectangleVertical className="h-4 w-4" />
              ) : (
                <RectangleHorizontal className="h-4 w-4" />
              )}
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
