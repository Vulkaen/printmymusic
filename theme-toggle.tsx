'use client';

import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/lib/theme';

export function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Zwischen hellem und dunklem Modus wechseln"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-ink transition-colors hover:border-ink/30"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
