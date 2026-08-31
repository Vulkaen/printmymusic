'use client';

import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { PosterEditor } from '@/components/editor/PosterEditor';
import { PosterPreview } from '@/components/poster/PosterPreview';
import { usePosterStore } from '@/lib/store';
import { spotifyAlbumToPosterData } from '@/lib/poster';
import { TemplateId } from '@/types/poster';
import { ThemeToggle } from '@/components/ui/theme-toggle';

function ShareableUrlSync() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const setPoster = usePosterStore((s) => s.setPoster);
  const setTemplate = usePosterStore((s) => s.setTemplate);
  const template = usePosterStore((s) => s.template);
  const albumId = usePosterStore((s) => s.poster.albumId);

  // Shareable URL: /create?album=<spotifyAlbumId>&template=<templateId>
  useEffect(() => {
    const albumParam = searchParams.get('album');
    const templateParam = searchParams.get('template') as TemplateId | null;

    if (templateParam) {
      setTemplate(templateParam);
    }

    if (albumParam) {
      fetch(`/api/spotify/albums/${albumParam}`)
        .then((res) => (res.ok ? res.json() : Promise.reject()))
        .then((data) => setPoster(spotifyAlbumToPosterData(data)))
        .catch(() => {
          /* ungültige oder nicht mehr verfügbare Album-ID - Demo-Poster bleibt aktiv */
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Aktuellen State kompakt in der URL widerspiegeln, wenn ein Album geladen ist.
  useEffect(() => {
    if (!albumId) return;
    const params = new URLSearchParams();
    params.set('album', albumId);
    params.set('template', template);
    router.replace(`/create?${params.toString()}`, { scroll: false });
  }, [albumId, template, router]);

  return null;
}

export default function CreatePage() {
  return (
    <div className="flex h-screen flex-col bg-canvas md:flex-row">
      <Suspense fallback={null}>
        <ShareableUrlSync />
      </Suspense>

      <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ink">
          <ArrowLeft className="h-4 w-4" />
          PrintMyMusic
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-ink/30">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* Mobile: Preview oben */}
      <div className="preview-stage flex h-[46vh] items-center justify-center border-b border-border p-4 md:hidden">
        <PosterPreview />
      </div>

      {/* Editor Sidebar */}
      <aside className="order-2 w-full shrink-0 border-border bg-surface md:order-1 md:h-full md:w-[380px] md:overflow-hidden md:border-r">
        <div className="hidden items-center justify-between gap-2 border-b border-border px-5 py-4 md:flex">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ink">
            <ArrowLeft className="h-4 w-4" />
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Sparkles className="h-3 w-3" />
            </span>
            PrintMyMusic
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <button className="rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-ink/30">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="h-[calc(100%-57px)]">
          <PosterEditor />
        </div>
      </aside>

      {/* Desktop: große Live-Vorschau rechts */}
      <main className="preview-stage order-1 hidden flex-1 items-center justify-center p-10 md:order-2 md:flex lg:p-14">
        <PosterPreview />
      </main>
    </div>
  );
}
