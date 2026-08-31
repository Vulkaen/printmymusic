import { Heart, Pause, Repeat, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { fontFamilyCss } from '@/lib/fonts';
import { sumTrackDurations } from '@/lib/poster';

export function PosterTemplatePlayer({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.08;
  const totalLength = sumTrackDurations(poster.tracks);

  return (
    <div
      className="flex h-full w-full flex-col justify-center"
      style={{
        backgroundColor: style.backgroundColor,
        padding: pad,
        fontFamily: fontFamilyCss(style.fontFamily)
      }}
    >
      <div style={{ aspectRatio: '1 / 1', width: '100%' }}>
        <CoverImage
          src={poster.coverImage}
          alt={poster.albumName}
          className="h-full w-full rounded-md"
        />
      </div>

      <div
        className="flex items-start justify-between"
        style={{ marginTop: baseWidth * 0.055 * style.spacing }}
      >
        <div>
          <h1
            style={{
              fontSize: baseWidth * 0.038 * style.titleSize,
              fontWeight: 700,
              color: style.textColor,
              lineHeight: 1.15
            }}
          >
            {poster.albumName}
          </h1>
          <p
            style={{
              fontSize: baseWidth * 0.022 * style.artistSize,
              color: style.textColor,
              opacity: 0.55,
              marginTop: baseWidth * 0.006
            }}
          >
            {poster.artistName}
          </p>
        </div>
        <Heart
          style={{ width: baseWidth * 0.032, height: baseWidth * 0.032, color: style.accentColor }}
          fill={style.accentColor}
        />
      </div>

      <div style={{ marginTop: baseWidth * 0.06 * style.spacing }}>
        <div
          className="w-full overflow-hidden rounded-full"
          style={{ height: baseWidth * 0.006, backgroundColor: style.textColor, opacity: 0.15 }}
        >
          <div style={{ width: '18%', height: '100%', backgroundColor: style.accentColor }} />
        </div>
        <div
          className="flex items-center justify-between"
          style={{
            marginTop: baseWidth * 0.012,
            fontSize: baseWidth * 0.013,
            color: style.textColor,
            opacity: 0.5
          }}
        >
          <span>0:41</span>
          <span>{totalLength}</span>
        </div>
      </div>

      <div
        className="flex items-center justify-between"
        style={{ marginTop: baseWidth * 0.06 * style.spacing }}
      >
        <Shuffle
          style={{ width: baseWidth * 0.026, height: baseWidth * 0.026, color: style.textColor, opacity: 0.6 }}
        />
        <SkipBack
          style={{ width: baseWidth * 0.03, height: baseWidth * 0.03, color: style.textColor }}
          fill={style.textColor}
        />
        <span
          className="flex items-center justify-center rounded-full"
          style={{
            width: baseWidth * 0.09,
            height: baseWidth * 0.09,
            backgroundColor: style.textColor
          }}
        >
          <Pause
            style={{ width: baseWidth * 0.036, height: baseWidth * 0.036, color: style.backgroundColor }}
            fill={style.backgroundColor}
          />
        </span>
        <SkipForward
          style={{ width: baseWidth * 0.03, height: baseWidth * 0.03, color: style.textColor }}
          fill={style.textColor}
        />
        <Repeat
          style={{ width: baseWidth * 0.026, height: baseWidth * 0.026, color: style.textColor, opacity: 0.6 }}
        />
      </div>
    </div>
  );
}
