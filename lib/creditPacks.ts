export interface CreditPack {
  id: string;
  credits: number;
  label: string;
  /**
   * Anzeigepreis für die UI (PAngV). MUSS mit dem in Stripe hinterlegten
   * Preis übereinstimmen - die Abrechnung erfolgt ausschließlich über die
   * Stripe Price-ID.
   */
  displayPrice: string;
  /** Stripe Price-ID, wird über eine Umgebungsvariable befüllt. */
  priceId: string;
}

// Die Abrechnung läuft über die Stripe Price-ID; `displayPrice` ist nur die
// Anzeige und muss manuell mit Stripe synchron gehalten werden.
export const CREDIT_PACKS: CreditPack[] = [
  {
    id: 'small',
    credits: 5,
    label: '5 Credits',
    displayPrice: '2,99 €',
    priceId: process.env.STRIPE_PRICE_SMALL ?? ''
  },
  {
    id: 'medium',
    credits: 15,
    label: '15 Credits',
    displayPrice: '7,99 €',
    priceId: process.env.STRIPE_PRICE_MEDIUM ?? ''
  },
  {
    id: 'large',
    credits: 50,
    label: '50 Credits',
    displayPrice: '19,99 €',
    priceId: process.env.STRIPE_PRICE_LARGE ?? ''
  }
];
