import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';

export function PosterTemplateSplit({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.06;
  return (
    <div
      className="flex h-full w-full"
      style={{
        backgroundColor: style.backgroundColor,
        fontFamily: fontFamilyCss(style.fontFamily)
      }}
    >
      <div style={{ width: `${45 * style.coverSize}%`, padding: pad, paddingRight: pad / 2 }}>
        <CoverImage src={poster.coverImage} alt={poster.albumName} className="h-full w-full rounded-sm" />
      </div>

      <div
        className="flex flex-1 flex-col justify-center"
        style={{ padding: pad, paddingLeft: pad / 2, textAlign: style.textAlign }}
      >
        {style.showYear && (
          <span
            style={{
              fontSize: baseWidth * 0.018,
              color: style.accentColor,
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: baseWidth * 0.02 * style.spacing
            }}
          >
            {poster.releaseYear}
          </span>
        )}
        <h1
          style={{
            fontSize: baseWidth * 0.055 * style.titleSize,
            fontWeight: 700,
            color: style.textColor,
            lineHeight: 1.05,
            marginBottom: baseWidth * 0.015
          }}
        >
          {poster.albumName}
        </h1>
        <p
          style={{
            fontSize: baseWidth * 0.026 * style.artistSize,
            color: style.textColor,
            opacity: 0.65,
            marginBottom: baseWidth * 0.05 * style.spacing
          }}
        >
          {poster.artistName}
        </p>

        <TrackList
          tracks={poster.tracks}
          style={{ ...style, columns: 1 }}
          baseWidth={baseWidth}
        />
      </div>
    </div>
  );
}
