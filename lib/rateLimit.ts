import { NextResponse } from 'next/server';

// Einfaches In-Memory-Rate-Limiting (Fixed Window) als erste Missbrauchs-
// Bremse für die öffentlichen API-Routen.
//
// Bewusst ohne externe Abhängigkeit: der Zähler lebt pro Serverless-Instanz.
// Bei mehreren gleichzeitig laufenden Instanzen ist das effektive Limit
// entsprechend höher. Für harte, global konsistente Limits wäre Upstash
// Redis (@upstash/ratelimit) der nächste Schritt.

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

let lastSweep = 0;

// Abgelaufene Einträge gelegentlich entfernen, damit die Map nicht
// unbegrenzt wächst.
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

/**
 * Zählt einen Zugriff für `key` und meldet, ob das Limit im aktuellen
 * Zeitfenster überschritten ist.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))
    };
  }

  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterSec: 0 };
}

/** Client-IP aus den Proxy-Headern (Vercel setzt x-forwarded-for). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Einheitliche 429-Antwort inkl. Retry-After-Header. */
export function tooManyRequests(retryAfterSec: number): NextResponse {
  return NextResponse.json(
    { error: 'rate_limited', message: 'Zu viele Anfragen. Bitte kurz warten.' },
    { status: 429, headers: { 'Retry-After': String(Math.max(1, retryAfterSec)) } }
  );
}
