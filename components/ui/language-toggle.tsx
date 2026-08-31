'use client';

import { useEffect, useState } from 'react';
import { Languages } from 'lucide-react';
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

  const base =
    variant === 'dark'
      ? 'border-[#3A3833] text-[#F5F4F2] hover:border-[#F5F4F2]/50'
      : 'border-border text-ink hover:border-ink/30';

  return (
    <div className="relative">
      <div
        className={`flex h-9 items-center gap-1.5 rounded-lg border bg-transparent px-2.5 text-sm font-medium transition-colors ${base}`}
      >
        <Languages className="h-4 w-4" />
        {short}
      </div>
      <select
        aria-label="Sprache wählen / Choose language"
        value={active}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        {LOCALES.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
