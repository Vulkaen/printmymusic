/** @type {import('next').NextConfig} */

// Sicherheits-Header für alle Routen.
//
// Bewusst OHNE Content-Security-Policy: eine erzwungene CSP muss erst im
// Preview gegen den Clerk-Login und den Stripe-Checkout getestet werden,
// sonst brechen Auth/Zahlung unbemerkt. Bekannte Allowlist für später:
//   script-src  'self' https://*.clerk.accounts.dev https://js.stripe.com
//   connect-src 'self' https://*.clerk.accounts.dev https://api.stripe.com
//   frame-src   https://js.stripe.com https://*.clerk.accounts.dev
//   img-src     'self' data: blob: https://*.dzcdn.net https://*.blob.vercel-storage.com
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.dzcdn.net' }
    ]
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  }
};

module.exports = nextConfig;
