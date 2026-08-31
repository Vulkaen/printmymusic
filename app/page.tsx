import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PosterRenderer } from '@/components/poster/PosterRenderer';
import { demoPosterData } from '@/lib/poster';
import { TemplateId } from '@/types/poster';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const SHOWCASE: { template: TemplateId; bg: string; text: string; accent: string; label: string }[] = [
  { template: 'minimal', bg: '#FAFAF9', text: '#111110', accent: '#C65D3B', label: 'Minimal' },
  { template: 'editorial', bg: '#F4F1EC', text: '#1C1B19', accent: '#7A6A53', label: 'Editorial' },
  { template: 'dark', bg: '#0B0B0C', text: '#F5F4F2', accent: '#D9A441', label: 'Dark' },
  { template: 'grid', bg: '#FFFFFF', text: '#111110', accent: '#3A5A78', label: 'Grid' }
];

export default function LandingPage() {
  const demo = demoPosterData();

  return (
    <main className="min-h-screen bg-canvas">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          PrintMyMusic
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/create"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Create your poster
          </Link>
        </div>
      </header>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-16 text-center">
        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
          <Sparkles className="h-3 w-3" />
          Print-ready in seconds
        </span>
        <h1 className="text-balance text-5xl font-semibold tracking-tight text-ink sm:text-6xl">
          Turn your favorite albums into wall art.
        </h1>
        <p className="mt-5 max-w-xl text-balance text-lg text-muted">
          Create a personalized album poster in seconds.
        </p>
        <Link
          href="/create"
          className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground shadow-panel transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          Create your poster
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {SHOWCASE.map((item) => (
            <div key={item.template} className="flex flex-col gap-3">
              <div
                className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-border shadow-panel"
              >
                <PosterRenderer
                  template={item.template}
                  poster={demo}
                  baseWidth={400}
                  style={{
                    backgroundColor: item.bg,
                    textColor: item.text,
                    accentColor: item.accent,
                    fontFamily: 'inter',
                    titleSize: 1,
                    artistSize: 1,
                    trackSize: 1,
                    textAlign: 'left',
                    coverSize: 1,
                    spacing: 1,
                    showYear: true,
                    showTrackNumbers: true,
                    showDurations: true,
                    columns: 2
                  }}
                />
              </div>
              <span className="text-center text-sm font-medium text-ink">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted">
        PrintMyMusic is an independent product and is not affiliated with or endorsed by Deezer or Spotify.
      </footer>
    </main>
  );
}
