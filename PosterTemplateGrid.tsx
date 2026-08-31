import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';

export function PosterTemplateGrid({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.05;
  const gap = baseWidth * 0.035 * style.spacing;

  return (
    <div
      className="grid h-full w-full"
      style={{
        backgroundColor: style.backgroundColor,
        padding: pad,
        gap,
        gridTemplateRows: `${style.coverSize * 55}% auto 1fr`,
        fontFamily: fontFamilyCss(style.fontFamily)
      }}
    >
      <div
        className="grid"
        style={{ gridTemplateColumns: '1fr 1fr', gap, height: '100%' }}
      >
        <CoverImage src={poster.coverImage} alt={poster.albumName} className="h-full w-full rounded-sm" />
        <div
          className="flex flex-col justify-end border"
          style={{
            borderColor: style.accentColor,
            padding: baseWidth * 0.02
          }}
        >
          {style.showYear && (
            <span
              style={{
                fontSize: baseWidth * 0.14 * style.titleSize,
                fontWeight: 800,
                color: style.accentColor,
                lineHeight: 0.9
              }}
            >
              {poster.releaseYear}
            </span>
          )}
        </div>
      </div>

      <div style={{ textAlign: style.textAlign }}>
        <h1
          style={{
            fontSize: baseWidth * 0.042 * style.titleSize,
            fontWeight: 700,
            color: style.textColor,
            lineHeight: 1.1
          }}
        >
          {poster.albumName}
        </h1>
        <p
          style={{
            fontSize: baseWidth * 0.024 * style.artistSize,
            color: style.textColor,
            opacity: 0.65,
            marginTop: baseWidth * 0.008
          }}
        >
          {poster.artistName}
        </p>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <TrackList tracks={poster.tracks} style={style} baseWidth={baseWidth} />
      </div>
    </div>
  );
}
