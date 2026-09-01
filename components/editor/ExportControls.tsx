'use client';

import { useState } from 'react';
import { Download, Loader2, Coins } from 'lucide-react';
import { SignInButton } from '@clerk/nextjs';
import { track } from '@vercel/analytics';
import { usePosterStore } from '@/lib/store';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { exportPoster } from '@/lib/export';
import { ExportFormat, ExportQuality } from '@/types/poster';
import { cn } from '@/lib/utils';
import { useCredits } from '@/lib/useCredits';
import { useT } from '@/lib/i18n';

const FORMAT_OPTIONS: { value: ExportFormat; label: string }[] = [
  { value: 'png', label: 'PNG' },
  { value: 'jpg', label: 'JPG' },
  { value: 'pdf', label: 'PDF' }
];

const QUALITY_OPTIONS: { value: ExportQuality; labelKey: string; hint: string }[] = [
  { value: 'web', labelKey: 'export.qWeb', hint: '72 DPI' },
  { value: 'print150', labelKey: 'export.qPrint', hint: '150 DPI' },
  { value: 'print300', labelKey: 'export.qPrintHq', hint: '300 DPI' }
];

export function ExportControls() {
  const t = useT();
  const state = usePosterStore();
  const isCustomCover = usePosterStore((s) => s.isCustomCover);
  const [format, setFormat] = useState<ExportFormat>('png');
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { credits, isSignedIn, refresh } = useCredits();
  const cost = isCustomCover ? 2 : 1;

  async function handleExport() {
    setIsExporting(true);
    setError(null);
    try {
      // Credits serverseitig abbuchen, BEVOR der eigentliche (rein
      // clientseitige) Export-Vorgang startet. So lässt sich das nicht
      // umgehen, selbst wenn jemand die Export-Funktion direkt aufruft.
      const consumeRes = await fetch('/api/credits/consume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cost, format, quality: state.dpi })
      });

      if (!consumeRes.ok) {
        if (consumeRes.status === 402) {
          setError(t('export.errInsufficient'));
        } else if (consumeRes.status === 401) {
          setError(t('export.errSignIn'));
        } else {
          setError(t('export.errGeneric'));
        }
        return;
      }

      const fileName = `${state.poster.artistName}-${state.poster.albumName}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'poster';

      await exportPoster(state, { format, fileName });
      track('export', { format, quality: state.dpi, customCover: isCustomCover });
      refresh();
    } catch {
      setError(t('export.errGeneric'));
    } finally {
      setIsExporting(false);
    }
  }

  const creditWord = cost === 1 ? t('credits.one') : t('credits.other');
  const remainingWord = credits === 1 ? t('credits.one') : t('credits.other');

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">{t('export.format')}</span>
        <Select
          value={format}
          onChange={(v) => setFormat(v as ExportFormat)}
          options={FORMAT_OPTIONS}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">{t('export.quality')}</span>
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
              {t(q.labelKey)}
              <span className={cn('text-[10px]', state.dpi === q.value ? 'text-primary-foreground/70' : 'text-muted')}>
                {q.hint}
              </span>
            </button>
          ))}
        </div>
      </div>

      {isSignedIn && credits !== null && (
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <Coins className="h-3.5 w-3.5" />
          {credits} {remainingWord} {t('credits.suffix')}
        </div>
      )}

      {error && <p className="text-xs text-red-600">{error}</p>}

      {isSignedIn ? (
        <Button onClick={handleExport} disabled={isExporting} size="lg" className="w-full">
          {isExporting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t('export.generating')}
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              {t('export.button')} ({cost} {creditWord})
            </>
          )}
        </Button>
      ) : (
        <SignInButton mode="modal">
          <Button size="lg" className="w-full">
            <Download className="h-4 w-4" />
            {t('export.signInToExport')}
          </Button>
        </SignInButton>
      )}
    </div>
  );
}
