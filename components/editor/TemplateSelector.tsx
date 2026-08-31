'use client';

import { usePosterStore } from '@/lib/store';
import { TemplateId } from '@/types/poster';
import { cn } from '@/lib/utils';
import { useT } from '@/lib/i18n';

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'split', label: 'Split' },
  { id: 'photo', label: 'Photo' },
  { id: 'player', label: 'Player' }
];

const COLOR_PRESETS = {
  white: { background: '#FAFAF9', text: '#111110' },
  dark: { background: '#0B0B0C', text: '#F5F4F2' }
} as const;

export function TemplateSelector() {
  const t = useT();
  const template = usePosterStore((s) => s.template);
  const setTemplate = usePosterStore((s) => s.setTemplate);
  const setBackgroundColor = usePosterStore((s) => s.setBackgroundColor);
  const setTextColor = usePosterStore((s) => s.setTextColor);

  function applyPreset(mode: 'white' | 'dark') {
    const preset = COLOR_PRESETS[mode];
    setBackgroundColor(preset.background);
    setTextColor(preset.text);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTemplate(t.id)}
            className={cn(
              'flex flex-col items-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors',
              template === t.id
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-ink hover:border-ink/30'
            )}
          >
            <span
              className={cn(
                'block h-6 w-5 rounded-sm border',
                template === t.id
                  ? 'border-primary-foreground/40 bg-surface/10'
                  : 'border-border bg-canvas'
              )}
            />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted">{t('template.colorMode')}</span>
        <p className="text-xs text-muted/80">{t('template.colorModeHint')}</p>
        <div className="mt-1 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => applyPreset('white')}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-ink/30"
          >
            <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#FAFAF9]" />
            {t('template.white')}
          </button>
          <button
            type="button"
            onClick={() => applyPreset('dark')}
            className="flex items-center justify-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-ink transition-colors hover:border-ink/30"
          >
            <span className="h-3.5 w-3.5 rounded-full border border-black/10 bg-[#0B0B0C]" />
            {t('template.dark')}
          </button>
        </div>
      </div>
    </div>
  );
}
