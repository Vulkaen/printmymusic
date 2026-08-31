export interface CreditPack {
  id: string;
  credits: number;
  label: string;
  /** Stripe Price-ID, wird über eine Umgebungsvariable befüllt. */
  priceId: string;
}

// Die tatsächlichen Preise (in Euro/Dollar) werden bei der Erstellung der
// jeweiligen Stripe-Preise festgelegt - hier wird nur festgelegt, WIE VIELE
// Credits jedes Paket gutschreibt, unabhängig vom gewählten Preis in Stripe.
export const CREDIT_PACKS: CreditPack[] = [
  { id: 'small', credits: 5, label: '5 Credits', priceId: process.env.STRIPE_PRICE_SMALL ?? '' },
  { id: 'medium', credits: 15, label: '15 Credits', priceId: process.env.STRIPE_PRICE_MEDIUM ?? '' },
  { id: 'large', credits: 50, label: '50 Credits', priceId: process.env.STRIPE_PRICE_LARGE ?? '' }
];
