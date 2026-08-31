'use client';

import Link from 'next/link';
import { LEGAL_LINKS } from '@/lib/legal';
import { useT } from '@/lib/i18n';

export function SiteFooter() {
  const t = useT();

  return (
    <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted">
      <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {LEGAL_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mx-auto mt-5 max-w-2xl leading-relaxed">{t('footer.disclaimer')}</p>
    </footer>
  );
}
