'use client';

import { usePosterStore } from '@/lib/store';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FONT_OPTIONS } from '@/lib/fonts';
import { FontId, TextAlign } from '@/types/poster';
import { cn } from '@/lib/utils';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const ALIGN_OPTIONS: { value: TextAlign; icon: typeof AlignLeft }[] = [
  { value: 'left', icon: AlignLeft },
  { value: 'center', icon: AlignCenter },
  { value: 'right', icon: AlignRight }
];

export function TypographyControls() {
  const fontFamily = usePosterStore((s) => s.fontFamily);
  const titleSize = usePosterStore((s) => s.titleSize);
  const artistSize = usePosterStore((s) => s.artistSize);
  const trackSize = usePosterStore((s) => s.trackSize);
  const textAlign = usePosterStore((s) => s.textAlign);

  const setFontFamily = usePosterStore((s) => s.setFontFamily);
  const setTitleSize = usePosterStore((s) => s.setTitleSize);
  const setArtistSize = usePosterStore((s) => s.setArtistSize);
  const setTrackSize = usePosterStore((s) => s.setTrackSize);
  const setTextAlign = usePosterStore((s) => s.setTextAlign);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Font</span>
        <Select
          value={fontFamily}
          onChange={(v) => setFontFamily(v as FontId)}
          options={FONT_OPTIONS.map((f) => ({ value: f.value, label: f.label }))}
        />
      </div>

      <SliderRow label="Album title size" value={titleSize} min={0.6} max={1.8} onChange={setTitleSize} />
      <SliderRow label="Artist size" value={artistSize} min={0.6} max={1.8} onChange={setArtistSize} />
      <SliderRow label="Track size" value={trackSize} min={0.6} max={1.8} onChange={setTrackSize} />

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Alignment</span>
        <div className="flex gap-2">
          {ALIGN_OPTIONS.map(({ value, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setTextAlign(value)}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-lg border transition-colors',
                textAlign === value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface text-ink hover:border-ink/30'
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SliderRow({
  label,
  value,
  min,
  max,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span className="text-xs text-muted">{value.toFixed(1)}x</span>
      </div>
      <Slider value={value} min={min} max={max} step={0.1} onChange={onChange} />
    </div>
  );
}
