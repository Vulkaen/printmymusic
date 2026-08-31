'use client';

import * as RadixSelect from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export function Select({ value, onChange, options, className }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onChange}>
      <RadixSelect.Trigger
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-border bg-surface px-3 text-sm text-ink outline-none focus:ring-2 focus:ring-ink/10',
          className
        )}
      >
        <RadixSelect.Value />
        <RadixSelect.Icon>
          <ChevronDown className="h-4 w-4 text-muted" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="z-50 overflow-hidden rounded-lg border border-border bg-surface shadow-panel"
          position="popper"
          sideOffset={4}
        >
          <RadixSelect.Viewport className="p-1">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                className="relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-ink outline-none data-[highlighted]:bg-canvas"
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator className="absolute right-2">
                  <Check className="h-3.5 w-3.5" />
                </RadixSelect.ItemIndicator>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
