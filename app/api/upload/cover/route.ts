import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { rateLimit, tooManyRequests } from '@/lib/rateLimit';

export const runtime = 'nodejs';

const MAX_SIZE_BYTES = 4 * 1024 * 1024; // 4 MB - Vercel-Serverless-Limit liegt bei 4.5 MB
// Bewusst keine SVGs erlaubt - SVG kann eingebettetes JavaScript enthalten.
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'unauthorized', message: 'Bitte einloggen.' }, { status: 401 });
  }

  const limit = rateLimit(`upload:${userId}`, 12, 5 * 60_000);
  if (!limit.ok) return tooManyRequests(limit.retryAfterSec);

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'not_configured', message: 'Datei-Upload ist noch nicht eingerichtet.' },
      { status: 500 }
    );
  }

  let file: File | null = null;
  try {
    const formData = await request.formData();
    const entry = formData.get('file');
    if (entry instanceof File) file = entry;
  } catch {
    return NextResponse.json({ error: 'invalid_request', message: 'Keine Datei erhalten.' }, { status: 400 });
  }

  if (!file) {
    return NextResponse.json({ error: 'invalid_request', message: 'Keine Datei erhalten.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: 'invalid_type', message: 'Nur JPG, PNG oder WebP sind erlaubt.' },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: 'too_large', message: 'Datei ist zu groß (maximal 4 MB).' },
      { status: 400 }
    );
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());

    // Bild serverseitig neu encodieren statt die Rohbytes zu speichern -
    // entfernt eingebettete Metadaten/versteckte Inhalte und normalisiert
    // das Format unabhängig davon, was der Client tatsächlich gesendet hat.
    const processed = await sharp(buffer)
      .rotate() // respektiert EXIF-Ausrichtung, entfernt danach die Metadaten
      .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toBuffer();

    const blob = await put(`covers/${userId}-${Date.now()}.jpg`, processed, {
      access: 'public',
      contentType: 'image/jpeg'
    });

    return NextResponse.json({ url: blob.url });
  } catch {
    return NextResponse.json(
      { error: 'upload_failed', message: 'Bild konnte nicht verarbeitet werden.' },
      { status: 500 }
    );
  }
}
