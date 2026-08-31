'use client';

import { useState } from 'react';
import { Wand2, Loader2 } from 'lucide-react';
import { usePosterStore } from '@/lib/store';
import { ColorPicker } from '@/components/ui/color-picker';
import { extractDominantColors, isLightColor } from '@/lib/colors';
import { proxiedImageUrl } from '@/lib/poster';
import { Button } from '@/components/ui/button';

export function ColorControls() {
  const backgroundColor = usePosterStore((s) => s.backgroundColor);
  const textColor = usePosterStore((s) => s.textColor);
  const accentColor = usePosterStore((s) => s.accentColor);
  const albumColors = usePosterStore((s) => s.albumColors);
  const coverImage = usePosterStore((s) => s.poster.coverImage);

  const setBackgroundColor = usePosterStore((s) => s.setBackgroundColor);
  const setTextColor = usePosterStore((s) => s.setTextColor);
  const setAccentColor = usePosterStore((s) => s.setAccentColor);
  const setAlbumColors = usePosterStore((s) => s.setAlbumColors);
  const applyPalette = usePosterStore((s) => s.applyPalette);

  const [isExtracting, setIsExtracting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleExtract() {
    if (!coverImage) return;
    setIsExtracting(true);
    setError(null);
    try {
      const proxied = proxiedImageUrl(coverImage);
      const colors = await extractDominantColors(proxied ?? coverImage, 4);
      setAlbumColors(colors);
    } catch (err) {
      setError('Farben konnten nicht extrahiert werden.');
    } finally {
      setIsExtracting(false);
    }
  }

  function handlePaletteClick(color: string) {
    const light = isLightColor(color);
    applyPalette({
      background: color,
      text: light ? '#111110' : '#FAFAF9',
      accent: accentColor
    });
  }

  return (
    <div className="flex flex-col gap-1">
      <ColorPicker label="Background" value={backgroundColor} onChange={setBackgroundColor} />
      <ColorPicker label="Text" value={textColor} onChange={setTextColor} />
      <ColorPicker label="Accent" value={accentColor} onChange={setAccentColor} />

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-ink">Use colors from album cover</span>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleExtract}
          disabled={!coverImage || isExtracting}
        >
          {isExtracting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
          Extract
        </Button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {albumColors.length > 0 && (
        <div className="mt-1 flex gap-2">
          {albumColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handlePaletteClick(color)}
              className="h-8 w-8 rounded-full border border-black/10 shadow-subtle transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      )}
    </div>
  );
}
