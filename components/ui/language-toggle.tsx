'use client';

import { useEffect, useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown, Languages } from 'lucide-react';
import { LOCALES, useLocaleStore, type Locale } from '@/lib/i18n';

interface LanguageToggleProps {
  /** Dunkle Kopfzeile (Hero) vs. helle App-Kopfzeile. */
  variant?: 'light' | 'dark';
}

export function LanguageToggle({ variant = 'light' }: LanguageToggleProps) {
  const locale = useLocaleStore((s) => s.locale);
  const setLocale = useLocaleStore((s) => s.setLocale);

  // Erst nach dem Mount die persistierte Sprache anzeigen (Hydration).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const active: Locale = mounted ? locale : 'en';

  const short = LOCALES.find((l) => l.value === active)?.short ?? 'EN';

  // Hero-Kopfzeile ist immer dunkel; App-Kopfzeile folgt dem Theme.
  const triggerCls =
    variant === 'dark'
      ? 'border-white/15 text-[#F5F4F2] hover:border-white/35 focus-visible:ring-white/25'
      : 'border-border bg-surface text-ink hover:border-ink/30 focus-visible:ring-ink/20';

  return (
    <RadixSelect.Root value={active} onValueChange={(v) => setLocale(v as Locale)}>
      <RadixSelect.Trigger
        aria-label="Sprache wählen / Choose language"
        className={`group inline-flex h-9 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 ${triggerCls}`}
      >
        <Languages className="h-4 w-4 shrink-0 opacity-80" />
        <RadixSelect.Value>{short}</RadixSelect.Value>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          side="bottom"
          align="end"
          sideOffset={8}
          className="z-50 min-w-[10rem] animate-fadeIn overflow-hidden rounded-xl border border-border bg-surface p-1.5 text-ink shadow-panel ring-1 ring-black/[0.04] dark:ring-white/10"
        >
          <RadixSelect.Viewport>
            {LOCALES.map((l) => (
              <RadixSelect.Item
                key={l.value}
                value={l.value}
                className="relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg py-2 pl-3 pr-9 text-sm text-ink outline-none transition-colors data-[highlighted]:bg-ink/[0.06] data-[state=checked]:font-semibold dark:data-[highlighted]:bg-white/10"
              >
                <span className="w-5 shrink-0 text-xs font-semibold tracking-wide text-muted">{l.short}</span>
                <RadixSelect.ItemText>{l.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-3">
                  <Check className="h-4 w-4" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
