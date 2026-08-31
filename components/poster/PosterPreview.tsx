'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { usePosterStore } from '@/lib/store';
import { PosterRenderer } from '@/components/poster/PosterRenderer';
import { DEFAULT_LABELS } from '@/lib/poster';
import { resolveDimensionsMm, getPosterSize } from '@/lib/dimensions';

// Feste Design-Referenzbreite in px, auf die alle Templates ihre relativen
// Größen (baseWidth * factor) beziehen. Export nutzt denselben Wert für
// konsistente Proportionen unabhängig von der finalen DPI-Auflösung.
export const DESIGN_WIDTH = 1000;

export const PosterPreview = forwardRef<HTMLDivElement>(function PosterPreview(_props, ref) {
  const scaleContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const state = usePosterStore();
  const { widthMm, heightMm } = resolveDimensionsMm(
    state.posterSizeId,
    state.customWidthMm,
    state.customHeightMm,
    state.orientation
  );
  const aspectRatio = widthMm / heightMm;
  const designHeight = DESIGN_WIDTH / aspectRatio;

  useEffect(() => {
    const el = scaleContainerRef.current;
    if (!el) return;

    function updateScale() {
      if (!el) return;
      const availableWidth = el.clientWidth;
      const availableHeight = el.clientHeight;
      const scaleByWidth = availableWidth / DESIGN_WIDTH;
      const scaleByHeight = availableHeight / designHeight;
      setScale(Math.min(scaleByWidth, scaleByHeight));
    }

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [designHeight]);

  // Zeigt Format + reale Maße als Text an. Wichtig, weil die Vorschau sich
  // immer auf die verfügbare Bildschirmfläche einpasst - viele Formate
  // (A4/A3/A2) haben dasselbe Seitenverhältnis und sehen daher optisch
  // identisch groß aus, obwohl die tatsächliche Druckgröße stark variiert.
  const sizeLabel =
    state.posterSizeId === 'custom' ? 'Custom' : getPosterSize(state.posterSizeId).label;
  const widthLabel = Math.round(widthMm);
  const heightLabel = Math.round(heightMm);
  const orientationLabel = state.orientation === 'portrait' ? 'Portrait' : 'Landscape';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div
        ref={scaleContainerRef}
        className="flex w-full flex-1 items-center justify-center overflow-hidden"
      >
        <div
          style={{
            width: DESIGN_WIDTH * scale,
            height: designHeight * scale
          }}
        >
          <div
            ref={ref}
            className="origin-top-left overflow-hidden shadow-stage ring-1 ring-black/[0.06] dark:ring-white/[0.08]"
            style={{
              width: DESIGN_WIDTH,
              height: designHeight,
              transform: `scale(${scale})`
            }}
          >
            <PosterRenderer
              template={state.template}
              poster={state.poster}
              baseWidth={DESIGN_WIDTH}
              style={{
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
              }}
            />
          </div>
        </div>
      </div>
      <span className="shrink-0 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-muted shadow-subtle backdrop-blur">
        {sizeLabel} · {widthLabel} × {heightLabel} mm · {orientationLabel}
      </span>
    </div>
  );
});
