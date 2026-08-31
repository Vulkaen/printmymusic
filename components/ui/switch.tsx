'use client';

import * as RadixSwitch from '@radix-ui/react-switch';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1">
      {label && <span className="text-sm text-ink">{label}</span>}
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onChange}
        className="relative h-6 w-10 shrink-0 rounded-full bg-border transition-colors data-[state=checked]:bg-ink"
      >
        <RadixSwitch.Thumb className="block h-4 w-4 translate-x-1 rounded-full bg-surface shadow-subtle transition-transform data-[state=checked]:translate-x-5" />
      </RadixSwitch.Root>
    </label>
  );
}
