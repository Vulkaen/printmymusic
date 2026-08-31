// Zentrale Betreiber-/Rechtsangaben. ALLE mit « » markierten Werte müssen
// vor dem Live-Gang durch echte Daten ersetzt werden. Sämtliche Rechtsseiten,
// der Footer und die Checkout-Zustimmung ziehen ihre Angaben von hier.

export const OPERATOR = {
  /** Voller bürgerlicher Name (bei Einzelunternehmen) oder Firmenname. */
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
  /** Bundesland des Wohn-/Geschäftssitzes – bestimmt die zuständige Datenschutz-Aufsichtsbehörde. */
  state: '«Bundesland»',
  /** Datum der letzten Aktualisierung dieser Dokumente. */
  lastUpdated: '«TT.MM.JJJJ»'
} as const;

export const TAX = {
  /**
   * true  = Kleinunternehmer nach § 19 UStG (keine USt ausgewiesen)
   * false = Regelbesteuerung (Preise inkl. gesetzlicher MwSt.)
   */
  kleinunternehmer: true,
  /** USt-IdNr., falls vorhanden (bei Regelbesteuerung idR Pflichtangabe im Impressum). */
  vatId: '',
  /** MwSt-Satz in Prozent bei Regelbesteuerung. */
  vatRate: 19
} as const;

export const SITE_NAME = 'PrintMyMusic';

/** Einheitlicher Preishinweis für die Credit-Pakete (PAngV). */
export const PRICE_NOTE = TAX.kleinunternehmer
  ? 'Gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen.'
  : `Alle Preise inkl. ${TAX.vatRate} % MwSt.`;

export const LEGAL_LINKS: { href: string; label: string }[] = [
  { href: '/impressum', label: 'Impressum' },
  { href: '/datenschutz', label: 'Datenschutz' },
  { href: '/agb', label: 'AGB' },
  { href: '/widerruf', label: 'Widerruf' }
];
