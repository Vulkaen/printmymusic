'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-ink placeholder:text-muted outline-none transition-shadow focus:ring-2 focus:ring-ink/10 focus:border-ink/30',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
