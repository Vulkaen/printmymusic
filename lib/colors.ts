/**
 * Extrahiert 4 dominante Farben aus einem Bild mittels Canvas-Pixel-Sampling
 * und einfachem Farb-Bucketing (kein externes Dependency notwendig).
 */
export async function extractDominantColors(
  imageUrl: string,
  count = 4
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const size = 64; // downsample für performantes Sampling
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context nicht verfügbar'));
          return;
        }
        ctx.drawImage(img, 0, 0, size, size);
        const { data } = ctx.getImageData(0, 0, size, size);

        const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]!;
          const g = data[i + 1]!;
          const b = data[i + 2]!;
          const a = data[i + 3]!;
          if (a < 200) continue;

          // Quantisierung in 8er-Schritten reduziert Farbrauschen
          const qr = Math.round(r / 24) * 24;
          const qg = Math.round(g / 24) * 24;
          const qb = Math.round(b / 24) * 24;
          const key = `${qr}-${qg}-${qb}`;

          const existing = buckets.get(key);
          if (existing) {
            existing.count += 1;
          } else {
            buckets.set(key, { count: 1, r: qr, g: qg, b: qb });
          }
        }

        const sorted = Array.from(buckets.values()).sort((a, b) => b.count - a.count);

        const results: string[] = [];
        for (const bucket of sorted) {
          const hex = rgbToHex(bucket.r, bucket.g, bucket.b);
          // zu ähnliche Farben überspringen für mehr Vielfalt
          const tooSimilar = results.some((existing) => colorDistance(existing, hex) < 40);
          if (!tooSimilar) {
            results.push(hex);
          }
          if (results.length >= count) break;
        }

        while (results.length < count && sorted.length > 0) {
          const fallback = sorted[results.length % sorted.length]!;
          results.push(rgbToHex(fallback.r, fallback.g, fallback.b));
        }

        resolve(results.slice(0, count));
      } catch (err) {
        reject(err instanceof Error ? err : new Error('Farbextraktion fehlgeschlagen'));
      }
    };

    img.onerror = () => reject(new Error('Bild konnte nicht geladen werden'));
    img.src = imageUrl;
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  return (
    '#' +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return [r, g, b];
}

function colorDistance(hexA: string, hexB: string): number {
  const [r1, g1, b1] = hexToRgb(hexA);
  const [r2, g2, b2] = hexToRgb(hexB);
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/** Bestimmt ob eine Farbe als "hell" gilt, um Kontrasttext automatisch zu wählen. */
export function isLightColor(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}
