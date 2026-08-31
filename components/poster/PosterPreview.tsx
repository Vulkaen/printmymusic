'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { usePosterStore } from '@/lib/store';
import { PosterRenderer } from '@/components/poster/PosterRenderer';
import { resolveDimensionsMm } from '@/lib/dimensions';

// Feste Design-Referenzbreite in px, auf die alle Templates ihre relativen
// Größen (baseWidth * factor) beziehen. Export nutzt denselben Wert für
// konsistente Proportionen unabhängig von der finalen DPI-Auflösung.
export const DESIGN_WIDTH = 1000;

export const PosterPreview = forwardRef<HTMLDivElement>(function PosterPreview(_props, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    const el = containerRef.current;
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

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center overflow-hidden"
    >
      <div
        style={{
          width: DESIGN_WIDTH * scale,
          height: designHeight * scale
        }}
      >
        <div
          ref={ref}
          className="origin-top-left overflow-hidden shadow-panel"
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
              columns: state.columns
            }}
          />
        </div>
      </div>
    </div>
  );
});
