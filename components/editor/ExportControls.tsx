'use client';

import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { usePosterStore } from '@/lib/store';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { exportPoster } from '@/lib/export';
import { ExportFormat, ExportQuality } from '@/types/poster';
import { cn } from '@/lib/utils';

const FORMAT_OPTIONS: { value: ExportFormat; label: string }[] = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'pdf', label: 'PDF' }
];

const QUALITY_OPTIONS: { value: ExportQuality; label: string; hint: string }[] = [
  { value: 'web', label: 'Web', hint: '72 DPI' },
  { value: 'print150', label: 'Print', hint: '150 DPI' },
  { value: 'print300', label: 'Print HQ', hint: '300 DPI' }
];

export function ExportControls() {
  const state = usePosterStore();
  const [format, setFormat] = useState<ExportFormat>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleExport() {
    setIsExporting(true);
    setError(null);
    try {
      const fileName = `${state.poster.artistName}-${state.poster.albumName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'poster';

      await exportPoster(state, { format, fileName }, setStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Export fehlgeschlagen.');
    } finally {
      setIsExporting(false);
      setStatus(null);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Format</span>
        <Select
          value={format}
          onChange={(v) => setFormat(v as ExportFormat)}
          options={FORMAT_OPTIONS}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">Quality</span>
        <div className="grid grid-cols-3 gap-2">
          {QUALITY_OPTIONS.map((q) => (
            <button
              key={q.value}
              type="button"
              onClick={() => state.setDpi(q.value)}
              className={cn(
                'flex flex-col items-center rounded-lg border px-2 py-2 text-xs font-medium transition-colors',
                state.dpi === q.value
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-surface text-ink hover:border-ink/30'
              )}
            >
              {q.label}
              <span className={cn('text-[10px]', state.dpi === q.value ? 'text-primary-foreground/70' : 'text-muted')}>
                {q.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <Button onClick={handleExport} disabled={isExporting} size="lg" className="w-full">
        {isExporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {status ?? 'Generating print file...'}
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Export poster
          </>
        )}
      </Button>
    </div>
  );
}
