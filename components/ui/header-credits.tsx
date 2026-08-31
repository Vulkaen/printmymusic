'use client';

import Link from 'next/link';
import { Coins } from 'lucide-react';
import { useCredits } from '@/lib/useCredits';

// Guthaben-Anzeige in der Landing-Page-Kopfzeile. Ersetzt dort den früheren
// "Create your poster"-Button - der Haupt-CTA sitzt bereits mittig im Hero.
// Verlinkt trotzdem auf den Editor, damit wiederkehrende Nutzer direkt
// weiterkommen.
export function HeaderCredits() {
  const { credits, loading } = useCredits();

  const value = credits ?? (loading ? '…' : 0);

  return (
    <Link
      href="/create"
      title="Open the editor"
      className="flex items-center gap-1.5 rounded-lg border border-[#3A3833] px-3 py-2 text-sm font-medium text-[#F5F4F2] transition-colors hover:border-[#F5F4F2]/50"
    >
      <Coins className="h-4 w-4" style={{ color: '#E8A93B' }} />
      <span>{value}</span>
      <span className="hidden text-[#C9C6BC] sm:inline">
        {credits === 1 ? 'credit' : 'credits'}
      </span>
    </Link>
  );
}
