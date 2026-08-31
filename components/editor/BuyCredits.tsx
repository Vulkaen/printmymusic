'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const PACKS = [
  { id: 'small', label: '5 Credits' },
  { id: 'medium', label: '15 Credits' },
  { id: 'large', label: '50 Credits' }
];

export function BuyCredits() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleBuy(packId: string) {
    setLoadingPack(packId);
    setError(null);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId })
      });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.message ?? 'Checkout konnte nicht gestartet werden.');
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Checkout konnte nicht gestartet werden.');
    } finally {
      setLoadingPack(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted">Buy more credits</span>
      <div className="grid grid-cols-3 gap-2">
        {PACKS.map((pack) => (
          <button
            key={pack.id}
            type="button"
            onClick={() => handleBuy(pack.id)}
            disabled={loadingPack !== null}
            className={cn(
              'flex items-center justify-center gap-1 rounded-lg border border-border bg-surface px-2 py-2 text-xs font-medium text-ink transition-colors hover:border-ink/30 disabled:opacity-50'
            )}
          >
            {loadingPack === pack.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : pack.label}
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
