'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { usePosterStore } from '@/lib/store';
import { prepareCoverImage } from '@/lib/image';
import { useT } from '@/lib/i18n';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const SERVER_MAX_BYTES = 4 * 1024 * 1024;

type Phase = 'idle' | 'optimizing' | 'uploading';

export function CustomCoverUpload() {
  const t = useT();
  const { isSignedIn } = useAuth();
  const setCustomCover = usePosterStore((s) => s.setCustomCover);
  const isCustomCover = usePosterStore((s) => s.isCustomCover);
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isBusy = phase !== 'idle';

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(t('cover.invalidType'));
      if (inputRef.current) inputRef.current.value = '';
      return;
    }

    try {
      setPhase('optimizing');

      // Große Fotos im Browser verkleinern, damit sie unter das
      // Server-Upload-Limit passen. Schlägt das fehl, wird das Original
      // genommen - sofern es das Limit selbst einhält.
      let upload: File;
      try {
        upload = await prepareCoverImage(file);
      } catch {
        if (file.size > SERVER_MAX_BYTES) {
          setError(t('cover.tooLargeNoShrink'));
          return;
        }
        upload = file;
      }

      setPhase('uploading');
      const formData = new FormData();
      formData.append('file', upload);

      const res = await fetch('/api/upload/cover', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(t('cover.uploadFailed'));
        return;
      }

      setCustomCover(data.url);
    } catch {
      setError(t('cover.uploadFailed'));
    } finally {
      setPhase('idle');
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  if (!isSignedIn) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4 text-center">
        <p className="mb-2 text-xs text-muted">{t('cover.signInPrompt')}</p>
        <SignInButton mode="modal">
          <button type="button" className="text-xs font-medium text-ink underline">
            {t('nav.signIn')}
          </button>
        </SignInButton>
      </div>
    );
  }

  const label =
    phase === 'optimizing'
      ? t('cover.optimizing')
      : phase === 'uploading'
        ? t('cover.uploading')
        : isCustomCover
          ? t('cover.replace')
          : t('cover.upload');

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={isBusy}
        className="hidden"
        id="custom-cover-input"
      />
      <label
        htmlFor="custom-cover-input"
        aria-disabled={isBusy}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface px-3 py-3 text-xs font-medium text-ink transition-colors hover:border-ink/30 aria-disabled:pointer-events-none aria-disabled:opacity-60"
      >
        {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {label}
      </label>
      <p className="text-xs text-muted">{t('cover.hint')}</p>
      {isCustomCover && <p className="text-xs text-muted">{t('cover.active')}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
