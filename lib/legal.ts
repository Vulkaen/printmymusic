// Zentrale Betreiber-/Rechtsangaben. ALLE mit « » markierten Werte müssen
// vor dem Live-Gang durch echte Daten ersetzt werden. Impressum,
// Datenschutzerklärung und der Footer ziehen ihre Angaben von hier.

// PLATZHALTER (Mustermann) – vor dem Live-Gang durch echte Daten ersetzen.
export const OPERATOR = {
  /** Voller bürgerlicher Name. */
  name: 'Max Mustermann',
  /** Ladungsfähige Anschrift – kein Postfach. */
  street: 'Musterstraße 1',
  zipCity: '12345 Musterstadt',
  country: 'Deutschland',
  /** Kontakt-E-Mail, die auf der Domain liegt. */
  email: 'kontakt@printmymusic.de',
  /** Telefonnummer für schnellen Kontakt (empfohlen, rechtlich sicherer). */
  phone: '+49 30 1234567',
  /** Finale Domain ohne https:// */
  domain: 'printmymusic.de',
  /** Bundesland des Wohnsitzes – bestimmt die zuständige Datenschutz-Aufsichtsbehörde. */
  state: 'Berlin',
  /** Datum der letzten Aktualisierung dieser Dokumente. */
  lastUpdated: '31.08.2026'
} as const;

export const SITE_NAME = 'PrintMyMusic';

export const LEGAL_LINKS: { href: string; label: string }[] = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' }
];
