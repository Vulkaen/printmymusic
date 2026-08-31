// Client-seitige Bildaufbereitung vor dem Upload: verkleinert große Fotos
// (v.a. Handy-Aufnahmen) im Browser auf eine sinnvolle Kantenlänge und
// komprimiert sie als JPEG unter das Server-Upload-Limit. Der Server
// re-encodiert danach trotzdem noch einmal (Metadaten-Strip) - das hier
// nimmt nur die Größe vom Tisch.

const MAX_DIMENSION = 2000; // längste Kante in px (entspricht dem Server-Resize)
const TARGET_MAX_BYTES = 3.8 * 1024 * 1024; // Puffer unter dem 4-MB-Serverlimit
const MIN_QUALITY = 0.5;

type DecodedImage = ImageBitmap | HTMLImageElement;

async function loadImage(file: File): Promise<DecodedImage> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, {
        imageOrientation: 'from-image'
      } as ImageBitmapOptions);
    } catch {
      // Fällt unten auf den <img>-Pfad zurück (ältere Safari-Versionen).
    }
  }

  return await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Bild konnte nicht gelesen werden.'));
    };
    img.src = url;
  });
}

function naturalSize(src: DecodedImage): { width: number; height: number } {
  if (src instanceof HTMLImageElement) {
    return { width: src.naturalWidth, height: src.naturalHeight };
  }
  return { width: src.width, height: src.height };
}

function encodeJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Bild konnte nicht kodiert werden.'))),
      'image/jpeg',
      quality
    );
  });
}

/**
 * Skaliert und komprimiert `file` clientseitig zu einem JPEG, das unter dem
 * Upload-Limit liegt. Wirft, wenn das Bild nicht dekodiert werden kann oder
 * selbst nach mehreren Verkleinerungsstufen zu groß bleibt - der Aufrufer
 * kann dann auf die Originaldatei zurückfallen.
 */
export async function prepareCoverImage(file: File): Promise<File> {
  const src = await loadImage(file);
  const { width, height } = naturalSize(src);

  if (!width || !height) {
    throw new Error('Bild konnte nicht gelesen werden.');
  }

  let scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  let blob: Blob | null = null;

  // Bis zu fünf Durchläufe: pro Durchlauf erst die JPEG-Qualität senken,
  // reicht das nicht, zusätzlich die Kantenlänge reduzieren.
  for (let attempt = 0; attempt < 5; attempt++) {
    const targetW = Math.max(1, Math.round(width * scale));
    const targetH = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas ist nicht verfügbar.');
    ctx.drawImage(src, 0, 0, targetW, targetH);

    let quality = 0.9;
    blob = await encodeJpeg(canvas, quality);
    while (blob.size > TARGET_MAX_BYTES && quality > MIN_QUALITY) {
      quality = Math.max(MIN_QUALITY, Math.round((quality - 0.1) * 100) / 100);
      blob = await encodeJpeg(canvas, quality);
    }

    if (blob.size <= TARGET_MAX_BYTES) break;
    scale *= 0.8;
  }

  if ('close' in src && typeof src.close === 'function') src.close();

  if (!blob || blob.size > TARGET_MAX_BYTES) {
    throw new Error('Bild ist auch nach dem Verkleinern zu groß.');
  }

  return new File([blob], 'cover.jpg', { type: 'image/jpeg' });
}
