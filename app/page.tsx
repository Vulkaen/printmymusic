import Link from 'next/link';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { PosterRenderer } from '@/components/poster/PosterRenderer';
import { demoPosterData, DEFAULT_LABELS } from '@/lib/poster';
import { TemplateId } from '@/types/poster';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { HeaderCredits } from '@/components/ui/header-credits';

// Feste Marken-Töne für die Hero-Sektion, bewusst unabhängig vom Hell-/Dunkel-
// Umschalter der App (die Hero-Farbwelt bleibt konstant als Wiedererkennung).
const INK = '#14120F';
const PAPER = '#F5F3EC';
const BLUE = '#2F5CE8';
const GOLD = '#E8A93B';
const RUST = '#B23A2E';

const STACK: { template: TemplateId; bg: string; text: string; accent: string; rotate: number; offset: number }[] = [
  { template: 'minimal', bg: '#0B0B0C', text: '#F5F4F2', accent: GOLD, rotate: -8, offset: 10 },
  { template: 'photo', bg: PAPER, text: INK, accent: BLUE, rotate: 4, offset: -6 },
  { template: 'editorial', bg: '#EDEAE1', text: INK, accent: RUST, rotate: -2, offset: 2 }
];

const SHOWCASE: {
  template: TemplateId;
  bg: string;
  text: string;
  accent: string;
  label: string;
  rotate: number;
}[] = [
  { template: 'minimal', bg: '#FAFAF9', text: '#111110', accent: BLUE, label: 'Minimal', rotate: -2 },
  { template: 'editorial', bg: '#0B0B0C', text: '#F5F4F2', accent: RUST, label: 'Editorial', rotate: 1.5 },
  { template: 'split', bg: '#EFEDE4', text: '#14120F', accent: BLUE, label: 'Split', rotate: 2 },
  { template: 'photo', bg: '#F5F3EC', text: '#14120F', accent: RUST, label: 'Photo', rotate: -1.5 },
  { template: 'player', bg: '#111110', text: '#F5F4F2', accent: GOLD, label: 'Player', rotate: 2 }
];

function baseTemplateStyle(item: { bg: string; text: string; accent: string }) {
  return {
    backgroundColor: item.bg,
    textColor: item.text,
    accentColor: item.accent,
    fontFamily: 'inter' as const,
    titleSize: 1,
    artistSize: 1,
    trackSize: 1,
    textAlign: 'left' as const,
    coverSize: 1,
    spacing: 1,
    showYear: true,
    showTrackNumbers: true,
    showDurations: true,
    columns: 2 as const,
    labels: DEFAULT_LABELS
  };
}

export default function LandingPage() {
  const demo = demoPosterData();

  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero: feste dunkle Markenfläche, unabhängig vom App-Farbmodus */}
      <div style={{ backgroundColor: INK }}>
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2.5 font-grotesk text-sm font-bold tracking-tight text-[#F5F4F2]">
            <span
              className="flex h-6 w-6 items-center justify-center rounded-full border-2"
              style={{ borderColor: GOLD }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
            </span>
            PrintMyMusic
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-lg border border-[#3A3833] px-3 py-2 text-sm font-medium text-[#F5F4F2] transition-colors hover:border-[#F5F4F2]/50">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <HeaderCredits />
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-8 md:grid-cols-2 md:items-center md:gap-8 md:pb-28 md:pt-12">
          <div>
            <h1 className="font-grotesk text-5xl font-bold leading-[1.05] tracking-tight text-[#F5F4F2] sm:text-6xl">
              Your favorite album,
              <br />
              printed on your wall.
            </h1>
            <p className="mt-6 max-w-md text-lg text-[#C9C6BC]">
              Search any album, pick a layout, and export a print-ready poster in
              minutes. No design skills required.
            </p>
            <Link
              href="/create"
              className="mt-8 inline-flex items-center rounded-lg px-6 py-3.5 text-sm font-semibold text-[#14120F] shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: GOLD }}
            >
              Start designing
            </Link>
          </div>

          <div className="relative mx-auto h-[300px] w-full max-w-xs sm:h-[360px] md:h-[400px]">
            {STACK.map((item, i) => (
              <div
                key={item.template}
                className="absolute left-1/2 top-1/2 aspect-[3/4] w-44 overflow-hidden rounded-sm shadow-2xl sm:w-52 md:w-56"
                style={{
                  transform: `translate(-50%, -50%) rotate(${item.rotate}deg) translateY(${item.offset}px)`,
                  zIndex: i
                }}
              >
                <PosterRenderer
                  template={item.template}
                  poster={demo}
                  baseWidth={260}
                  style={baseTemplateStyle(item)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Template-Katalog: keine gleichförmigen Karten, sondern locker
          gestreute Poster-Ausschnitte wie auf einer Pinnwand. */}
      <section className="bg-canvas px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-grotesk text-3xl font-bold text-ink">Five layouts, light or dark</h2>
          <p className="mt-2 max-w-md text-muted">
            Every layout pulls from the same album data and switches between a white or dark color
            mode — pick whichever fits your wall.
          </p>

          <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-14">
            {SHOWCASE.map((item) => (
              <div
                key={item.template}
                className="flex flex-col items-center gap-3"
                style={{ transform: `rotate(${item.rotate}deg)` }}
              >
                <div className="aspect-[3/4] w-40 overflow-hidden rounded-sm shadow-xl sm:w-48">
                  <PosterRenderer
                    template={item.template}
                    poster={demo}
                    baseWidth={280}
                    style={baseTemplateStyle(item)}
                  />
                </div>
                <span className="text-sm font-medium text-ink">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted">
        PrintMyMusic is an independent product and is not affiliated with or endorsed by Deezer or
        Spotify. Made by Vulkaen.
      </footer>
    </main>
  );
}
