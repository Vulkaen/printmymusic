'use client';

import { usePosterStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { ColumnCount } from '@/types/poster';

export function ContentControls() {
  const showYear = usePosterStore((s) => s.showYear);
  const showTrackNumbers = usePosterStore((s) => s.showTrackNumbers);
  const showDurations = usePosterStore((s) => s.showDurations);
  const columns = usePosterStore((s) => s.columns);
  const coverSize = usePosterStore((s) => s.coverSize);
  const spacing = usePosterStore((s) => s.spacing);

  const setShowYear = usePosterStore((s) => s.setShowYear);
  const setShowTrackNumbers = usePosterStore((s) => s.setShowTrackNumbers);
  const setShowDurations = usePosterStore((s) => s.setShowDurations);
  const setColumns = usePosterStore((s) => s.setColumns);
  const setCoverSize = usePosterStore((s) => s.setCoverSize);
  const setSpacing = usePosterStore((s) => s.setSpacing);

  return (
    <div className="flex flex-col gap-3">
      <Switch label="Album year" checked={showYear} onChange={setShowYear} />
      <Switch label="Track numbers" checked={showTrackNumbers} onChange={setShowTrackNumbers} />
      <Switch label="Track duration" checked={showDurations} onChange={setShowDurations} />

      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-xs font-medium text-muted">Columns</span>
        <div className="flex gap-2">
          {([1, 2, 3] as ColumnCount[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColumns(c)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                columns === c
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface text-ink hover:border-ink/30'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Cover size</span>
          <span className="text-xs text-muted">{coverSize.toFixed(1)}x</span>
        </div>
        <Slider value={coverSize} min={0.5} max={1.5} step={0.05} onChange={setCoverSize} />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted">Spacing</span>
          <span className="text-xs text-muted">{spacing.toFixed(1)}x</span>
        </div>
        <Slider value={spacing} min={0.5} max={2} step={0.05} onChange={setSpacing} />
      </div>
    </div>
  );
}
