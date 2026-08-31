'use client';

import Link from 'next/link';
import { Coins } from 'lucide-react';
import { useCredits } from '@/lib/useCredits';
import { useT } from '@/lib/i18n';

// Guthaben-Anzeige in der Landing-Page-Kopfzeile. Verlinkt auf den Editor,
// damit wiederkehrende Nutzer direkt weiterkommen.
export function HeaderCredits() {
  const { credits, loading } = useCredits();
  const t = useT();

  const value = credits ?? (loading ? '…' : 0);
  const word = credits === 1 ? t('credits.one') : t('credits.other');

  return (
    <Link
      href="/create"
      title={t('header.openEditor')}
      className="flex items-center gap-1.5 rounded-lg border border-[#3A3833] px-3 py-2 text-sm font-medium text-[#F5F4F2] transition-colors hover:border-[#F5F4F2]/50"
    >
      <Coins className="h-4 w-4" style={{ color: '#E8A93B' }} />
      <span>{value}</span>
      <span className="hidden text-[#C9C6BC] sm:inline">{word}</span>
    </Link>
  );
}
