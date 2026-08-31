'use client';

import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const [draft, setDraft] = useState(value);

  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-ink">{label}</span>
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted hover:border-ink/30"
          >
            <span
              className="h-4 w-4 rounded-full border border-black/10"
              style={{ backgroundColor: value }}
            />
            {value.toUpperCase()}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className="z-50 rounded-xl border border-border bg-surface p-3 shadow-panel"
          >
            <input
              type="color"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                onChange(e.target.value);
              }}
              className="h-24 w-40 cursor-pointer rounded-md border-0 bg-transparent"
            />
            <input
              type="text"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                  onChange(e.target.value);
                }
              }}
              className="mt-2 h-8 w-full rounded-md border border-border bg-surface px-2 text-xs text-ink"
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
