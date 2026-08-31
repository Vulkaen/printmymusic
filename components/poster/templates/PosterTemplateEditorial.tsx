import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';

export function PosterTemplateEditorial({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.07;
  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        backgroundColor: style.backgroundColor,
        padding: pad,
        fontFamily: fontFamilyCss(style.fontFamily)
      }}
    >
      <div style={{ flex: 1, minHeight: 0, marginBottom: baseWidth * 0.05 * style.spacing }}>
        <CoverImage
          src={poster.coverImage}
          alt={poster.albumName}
          className="h-full w-full rounded-sm"
          style={{ height: `${65 * style.coverSize}%` }}
        />
      </div>

      <h1
        style={{
          fontSize: baseWidth * 0.095 * style.titleSize,
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: style.textColor,
          lineHeight: 0.95,
          textAlign: style.textAlign
        }}
      >
        {poster.albumName}
      </h1>

      <div
        className="flex items-baseline justify-between"
        style={{
          marginTop: baseWidth * 0.02,
          marginBottom: baseWidth * 0.04 * style.spacing
        }}
      >
        <span
          style={{
            fontSize: baseWidth * 0.024 * style.artistSize,
            color: style.accentColor,
            fontWeight: 600
          }}
        >
          {poster.artistName}
        </span>
        {style.showYear && (
          <span style={{ fontSize: baseWidth * 0.02, color: style.textColor, opacity: 0.5 }}>
            {poster.releaseYear}
          </span>
        )}
      </div>

      <TrackList tracks={poster.tracks} style={style} baseWidth={baseWidth} />
    </div>
  );
}
