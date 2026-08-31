import { ExportQuality, Orientation, PosterSize, PosterSizeId } from '@/types/poster';

/**
 * Rechnet Millimeter in Pixel um, basierend auf der Ziel-DPI.
 * pixels = (mm / 25.4) * dpi
 */
export function mmToPixels(mm: number, dpi: number): number {
  return Math.round((mm / 25.4) * dpi);
}

export const DPI_MAP: Record<ExportQuality, number> = {
  web: 72,
  print150: 150,
  print300: 300
};

export const POSTER_SIZES: PosterSize[] = [
  { id: 'a4', label: 'DIN A4', widthMm: 210, heightMm: 297 },
  { id: 'a3', label: 'DIN A3', widthMm: 297, heightMm: 420 },
  { id: 'a2', label: 'DIN A2', widthMm: 420, heightMm: 594 },
  { id: '30x40', label: '30 × 40 cm', widthMm: 300, heightMm: 400 },
  { id: '40x50', label: '40 × 50 cm', widthMm: 400, heightMm: 500 },
  { id: '50x70', label: '50 × 70 cm', widthMm: 500, heightMm: 700 },
  { id: 'letter', label: 'US Letter', widthMm: 215.9, heightMm: 279.4 },
  { id: 'square', label: 'Square', widthMm: 300, heightMm: 300 },
  { id: 'custom', label: 'Custom', widthMm: 210, heightMm: 297 }
];

export function getPosterSize(id: PosterSizeId): PosterSize {
  const found = POSTER_SIZES.find((s) => s.id === id);
  return found ?? POSTER_SIZES[0]!;
}

export interface Dimensions {
  widthMm: number;
  heightMm: number;
}

/**
 * Ermittelt die effektiven Millimeter-Maße unter Berücksichtigung von
 * Custom-Größen und Orientierung (Portrait/Landscape).
 */
export function resolveDimensionsMm(
  posterSizeId: PosterSizeId,
  customWidthMm: number,
  customHeightMm: number,
  orientation: Orientation
): Dimensions {
  let widthMm: number;
  let heightMm: number;

  if (posterSizeId === 'custom') {
    widthMm = customWidthMm;
    heightMm = customHeightMm;
  } else {
    const size = getPosterSize(posterSizeId);
    widthMm = size.widthMm;
    heightMm = size.heightMm;
  }

  const isPortraitByDefault = heightMm >= widthMm;
  const shouldSwap =
    (orientation === 'landscape' && isPortraitByDefault) ||
    (orientation === 'portrait' && !isPortraitByDefault);

  if (shouldSwap) {
    return { widthMm: heightMm, heightMm: widthMm };
  }

  return { widthMm, heightMm };
}

export function resolvePixelDimensions(
  posterSizeId: PosterSizeId,
  customWidthMm: number,
  customHeightMm: number,
  orientation: Orientation,
  quality: ExportQuality
): { widthPx: number; heightPx: number } {
  const { widthMm, heightMm } = resolveDimensionsMm(
    posterSizeId,
    customWidthMm,
    customHeightMm,
    orientation
  );
  const dpi = DPI_MAP[quality];
  return {
    widthPx: mmToPixels(widthMm, dpi),
    heightPx: mmToPixels(heightMm, dpi)
  };
}
