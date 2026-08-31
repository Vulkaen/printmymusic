import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ExportFormat, PosterState } from '@/types/poster';
import { PosterRenderer } from '@/components/poster/PosterRenderer';
import { resolveDimensionsMm, resolvePixelDimensions } from '@/lib/dimensions';
import { DEFAULT_LABELS, proxiedImageUrl } from '@/lib/poster';

export interface ExportOptions {
  format: ExportFormat;
  fileName: string;
}

/**
 * Lädt das Albumcover vorab als Base64-Data-URL. Dadurch muss der spätere
 * Offscreen-Renderer das Bild nicht mehr selbst nachladen (was bei
 * html-to-image gelegentlich zu einem leeren/fehlenden Cover im Export
 * führt, wenn das Bild nicht rechtzeitig oder gar nicht eingebettet wird).
 * Eine Data-URL ist bereits lokal vorhanden und daher garantiert
 * Canvas-sicher, unabhängig von Netzwerk-Timing oder CORS.
 */
async function loadCoverAsDataUrl(originalUrl: string): Promise<string | null> {
  const proxied = proxiedImageUrl(originalUrl);
  if (!proxied) return null;

  try {
    const response = await fetch(proxied, { cache: 'force-cache' });
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Cover konnte nicht gelesen werden.'));
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

/**
 * Rendert das Poster unabhängig von der Bildschirm-Vorschau in der exakten
 * Zielauflösung (basierend auf Postergröße + gewählter DPI). Dies ist kein
 * Screenshot der Preview, sondern ein eigenständiges Offscreen-Rendering.
 */
async function renderPosterToCanvas(state: PosterState): Promise<HTMLCanvasElement> {
  const { widthPx, heightPx } = resolvePixelDimensions(
    state.posterSizeId,
    state.customWidthMm,
    state.customHeightMm,
    state.orientation,
    state.dpi
  );

  // Cover vorab als Data-URL laden (siehe loadCoverAsDataUrl oben).
  let coverImageForExport = state.poster.coverImage;
  if (state.poster.coverImage) {
    const dataUrl = await loadCoverAsDataUrl(state.poster.coverImage);
    if (dataUrl) {
      coverImageForExport = dataUrl;
    }
    // Falls das Laden fehlschlägt, bleibt die Original-URL erhalten -
    // CoverImage versucht es dann weiterhin über den normalen Proxy-Pfad.
  }

  const posterForExport = { ...state.poster, coverImage: coverImageForExport };

  // Container wird unsichtbar hinter dem restlichen Seiteninhalt platziert
  // (z-index dahinter), NICHT über einen extremen negativen Offset
  // off-screen geschoben. Extreme Offsets (z.B. left: -99999px) können bei
  // manchen Capture-Bibliotheken zu fehlerhaften internen Koordinaten- bzw.
  // Größenberechnungen und damit zu einem leeren Ergebnis führen. Position
  // 0/0 mit negativem z-index vermeidet das, ohne sichtbar zu werden.
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = `${widthPx}px`;
  container.style.height = `${heightPx}px`;
  container.style.overflow = 'hidden';
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';
  document.body.appendChild(container);

  const root = createRoot(container);

  await new Promise<void>((resolve) => {
    root.render(
      createElement(PosterRenderer, {
        template: state.template,
        poster: posterForExport,
        baseWidth: widthPx,
        style: {
          backgroundColor: state.backgroundColor,
          textColor: state.textColor,
          accentColor: state.accentColor,
          fontFamily: state.fontFamily,
          titleSize: state.titleSize,
          artistSize: state.artistSize,
          trackSize: state.trackSize,
          textAlign: state.textAlign,
          coverSize: state.coverSize,
          spacing: state.spacing,
          showYear: state.showYear,
          showTrackNumbers: state.showTrackNumbers,
          showDurations: state.showDurations,
          columns: state.columns,
          labels: { ...DEFAULT_LABELS, ...state.labels }
        }
      })
    );
    // Kurze Verzögerung, damit Layout + Fonts sich vollständig einrichten.
    setTimeout(resolve, 300);
  });

  // Warten bis alle <img> Elemente tatsächlich geladen sind (Cover ist nun
  // eine Data-URL und lädt daher synchron/sofort; als Absicherung bleibt
  // dieser Check trotzdem bestehen für den seltenen Fallback-Fall).
  const images = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );

  // Sicherstellen, dass alle Web-Fonts vollständig geladen sind, bevor
  // gerastert wird. Andernfalls kann html2canvas Zeilenhöhen anhand einer
  // Fallback-Schrift berechnen, obwohl später die eigentliche Schrift
  // gezeichnet wird - das verschiebt Text gegenüber Trennlinien & Boxen.
  if (typeof document !== 'undefined' && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const canvas = await html2canvas(container, {
    width: widthPx,
    height: heightPx,
    scale: 1,
    useCORS: true,
    backgroundColor: null,
    logging: false
  });

  root.unmount();
  document.body.removeChild(container);

  return canvas;
}

function downloadDataUrl(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportPoster(
  state: PosterState,
  options: ExportOptions,
  onStatusChange?: (status: string) => void
): Promise<void> {
  onStatusChange?.('Generating print file...');

  const canvas = await renderPosterToCanvas(state);

  if (options.format === 'png') {
    downloadDataUrl(canvas.toDataURL('image/png'), `${options.fileName}.png`);
    return;
  }

  if (options.format === 'jpg') {
    downloadDataUrl(canvas.toDataURL('image/jpeg', 0.95), `${options.fileName}.jpg`);
    return;
  }

  // PDF: Seitengröße exakt an die reale Postergröße (mm) anpassen.
  const { widthMm, heightMm } = resolveDimensionsMm(
    state.posterSizeId,
    state.customWidthMm,
    state.customHeightMm,
    state.orientation
  );
  const orientation = widthMm > heightMm ? 'landscape' : 'portrait';

  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: [widthMm, heightMm]
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  pdf.addImage(imgData, 'JPEG', 0, 0, widthMm, heightMm, undefined, 'FAST');
  pdf.save(`${options.fileName}.pdf`);
}
