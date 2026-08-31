'use client';

import { usePosterStore } from '@/lib/store';
import { TemplateId } from '@/types/poster';
import { cn } from '@/lib/utils';

const TEMPLATES: { id: TemplateId; label: string }[] = [
  { id: 'minimal', label: 'Minimal' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'typography', label: 'Typography' },
  { id: 'split', label: 'Split' },
  { id: 'dark', label: 'Dark' },
  { id: 'grid', label: 'Grid' },
  { id: 'photo', label: 'Photo' },
  { id: 'player', label: 'Player' }
];

export function TemplateSelector() {
  const template = usePosterStore((s) => s.template);
  const setTemplate = usePosterStore((s) => s.setTemplate);

  return (
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
              template === t.id ? 'border-primary-foreground/40 bg-surface/10' : 'border-border bg-canvas'
            )}
          />
          {t.label}
        </button>
      ))}
    </div>
  );
}
