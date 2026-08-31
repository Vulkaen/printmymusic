'use client';

import { ChangeEvent, useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { useAuth, SignInButton } from '@clerk/nextjs';
import { usePosterStore } from '@/lib/store';

export function CustomCoverUpload() {
  const { isSignedIn } = useAuth();
  const setCustomCover = usePosterStore((s) => s.setCustomCover);
  const isCustomCover = usePosterStore((s) => s.isCustomCover);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload/cover', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Upload fehlgeschlagen.');
        return;
      }

      setCustomCover(data.url);
    } catch {
      setError('Upload fehlgeschlagen.');
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  if (!isSignedIn) {
    return (
      <div className="rounded-lg border border-dashed border-border p-4 text-center">
        <p className="mb-2 text-xs text-muted">Sign in to upload your own cover art.</p>
        <SignInButton mode="modal">
          <button type="button" className="text-xs font-medium text-ink underline">
            Sign in
          </button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        id="custom-cover-input"
      />
      <label
        htmlFor="custom-cover-input"
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface px-3 py-3 text-xs font-medium text-ink transition-colors hover:border-ink/30"
      >
        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {isUploading ? 'Uploading...' : isCustomCover ? 'Replace cover' : 'Upload your own cover'}
      </label>
      {isCustomCover && (
        <p className="text-xs text-muted">Custom cover active · costs 2 credits to export</p>
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
