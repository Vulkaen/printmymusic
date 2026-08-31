'use client';

import * as RadixSlider from '@radix-ui/react-slider';
import { cn } from '@/lib/utils';

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export function Slider({ value, min, max, step = 0.1, onChange, className }: SliderProps) {
  return (
    <RadixSlider.Root
      className={cn('relative flex h-5 w-full touch-none items-center select-none', className)}
      value={[value]}
      min={min}
      max={max}
      step={step}
      onValueChange={(vals) => onChange(vals[0] ?? value)}
    >
      <RadixSlider.Track className="relative h-1 grow rounded-full bg-border">
        <RadixSlider.Range className="absolute h-full rounded-full bg-ink" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block h-4 w-4 rounded-full border-2 border-ink bg-surface shadow-subtle transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ink/20" />
    </RadixSlider.Root>
  );
}
