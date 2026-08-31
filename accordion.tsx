'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AccordionSectionProps {
  value: string;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

export function AccordionRoot({
  children,
  defaultValue
}: {
  children: ReactNode;
  defaultValue: string[];
}) {
  return (
    <RadixAccordion.Root type="multiple" defaultValue={defaultValue} className="flex flex-col">
      {children}
    </RadixAccordion.Root>
  );
}

export function AccordionSection({ value, title, icon, children }: AccordionSectionProps) {
  return (
    <RadixAccordion.Item value={value} className="border-b border-border">
      <RadixAccordion.Trigger className="group flex w-full items-center justify-between py-4 text-left">
        <span className="flex items-center gap-2 text-sm font-medium text-ink">
          {icon}
          {title}
        </span>
        <ChevronDown className="h-4 w-4 text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
      </RadixAccordion.Trigger>
      <RadixAccordion.Content
        className={cn(
          'overflow-hidden data-[state=open]:animate-fadeIn',
          'pb-5'
        )}
      >
        <div className="flex flex-col gap-4">{children}</div>
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}
