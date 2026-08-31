'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CREDIT_PACKS } from '@/lib/creditPacks';
import { PRICE_NOTE } from '@/lib/legal';

export function BuyCredits() {
  const [loadingPack, setLoadingPack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  async function handleBuy(packId: string) {
    if (!consent) {
      setError('Bitte bestätige die Zustimmung zur sofortigen Ausführung.');
      return;
    }
    setLoadingPack(packId);
    setError(null);
    try {
      const res = await fetch('/api/checkout/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packId, consent: true })
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
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-medium text-muted">Buy more credits</span>

      <div className="grid grid-cols-3 gap-2">
        {CREDIT_PACKS.map((pack) => (
          <button
            key={pack.id}
            type="button"
            onClick={() => handleBuy(pack.id)}
            disabled={loadingPack !== null || !consent}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 rounded-lg border border-border bg-surface px-2 py-2.5 text-xs font-medium text-ink transition-colors hover:border-ink/30 disabled:opacity-50'
            )}
          >
            {loadingPack === pack.id ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <span>{pack.credits} Credits</span>
                <span className="text-[11px] font-normal text-muted">{pack.displayPrice}</span>
              </>
            )}
          </button>
        ))}
      </div>

      <label className="flex items-start gap-2 text-[11px] leading-snug text-muted">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-primary"
        />
        <span>
          Ich stimme zu, dass die Ausführung sofort beginnt, und weiß, dass ich damit mein{' '}
          <Link href="/widerruf" className="underline hover:text-ink">
            Widerrufsrecht
          </Link>{' '}
          verliere. Es gelten die{' '}
          <Link href="/agb" className="underline hover:text-ink">
            AGB
          </Link>
          .
        </span>
      </label>

      <p className="text-[11px] text-muted">{PRICE_NOTE}</p>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
