import { NextRequest, NextResponse } from 'next/server';
import { clientIp, rateLimit, tooManyRequests } from '@/lib/rateLimit';

export const runtime = 'nodejs';

// Nur Deezer-CDN-Domains dürfen über den Proxy geladen werden,
// um Missbrauch als offenen Proxy zu verhindern.
function isAllowedHost(hostname: string): boolean {
  return hostname === 'dzcdn.net' || hostname.endsWith('.dzcdn.net');
}

export async function GET(request: NextRequest) {
  const limit = rateLimit(`imgproxy:${clientIp(request)}`, 120, 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSec);

  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'missing_url' }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: 'invalid_url' }, { status: 400 });
  }

  if (parsed.protocol !== 'https:' || !isAllowedHost(parsed.hostname)) {
    return NextResponse.json({ error: 'host_not_allowed' }, { status: 403 });
  }

  try {
    const upstream = await fetch(parsed.toString(), { cache: 'force-cache' });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'upstream_error' }, { status: 502 });
    }

    const contentType = upstream.headers.get('content-type') ?? 'image/jpeg';
    const buffer = await upstream.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, immutable',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch {
    return NextResponse.json({ error: 'fetch_failed' }, { status: 502 });
  }
}
