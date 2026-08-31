// Zentrale Betreiber-/Rechtsangaben. ALLE mit « » markierten Werte müssen
// vor dem Live-Gang durch echte Daten ersetzt werden. Impressum,
// Datenschutzerklärung und der Footer ziehen ihre Angaben von hier.

export const OPERATOR = {
  /** Voller bürgerlicher Name. */
  name: '«Vorname Nachname»',
  /** Ladungsfähige Anschrift – kein Postfach. */
  street: '«Straße Hausnummer»',
  zipCity: '«PLZ Ort»',
  country: 'Deutschland',
  /** Kontakt-E-Mail, die auf der Domain liegt. */
  email: '«kontakt@deine-domain.de»',
  /** Telefonnummer für schnellen Kontakt (empfohlen, rechtlich sicherer). */
  phone: '«+49 000 0000000»',
  /** Finale Domain ohne https:// */
  domain: '«deine-domain.de»',
  /** Bundesland des Wohnsitzes – bestimmt die zuständige Datenschutz-Aufsichtsbehörde. */
  state: '«Bundesland»',
  /** Datum der letzten Aktualisierung dieser Dokumente. */
  lastUpdated: '«TT.MM.JJJJ»'
} as const;

export const SITE_NAME = 'PrintMyMusic';

export const LEGAL_LINKS: { href: string; label: string }[] = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' }
];
