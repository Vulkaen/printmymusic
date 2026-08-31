import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/ui/site-footer';
import { OPERATOR } from '@/lib/legal';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

// Gemeinsames Layout + Typo für alle Rechtsseiten. Kein Typography-Plugin,
// daher Prose-Stile über Child-Selektoren am Container.
export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-canvas">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Startseite
        </Link>

        <h1 className="mt-8 font-grotesk text-3xl font-bold tracking-tight text-ink">{title}</h1>
        <p className="mt-2 text-xs text-muted">Stand: {OPERATOR.lastUpdated}</p>

        <div
          className={[
            'mt-10 text-sm leading-relaxed text-muted',
            '[&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink',
            '[&_h3]:mt-6 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-ink',
            '[&_p]:mt-3',
            '[&_ul]:mt-3 [&_ul]:space-y-1.5 [&_ul]:pl-5',
            '[&_li]:list-disc',
            '[&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2',
            '[&_strong]:font-semibold [&_strong]:text-ink',
            '[&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left',
            '[&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:font-semibold [&_th]:text-ink',
            '[&_td]:border [&_td]:border-border [&_td]:p-2 [&_td]:align-top'
          ].join(' ')}
        >
          {children}
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
