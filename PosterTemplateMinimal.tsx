import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';

export function PosterTemplateMinimal({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.08;
  return (
    <div
      className="flex h-full w-full flex-col items-center"
      style={{
        backgroundColor: style.backgroundColor,
        padding: pad,
        fontFamily: fontFamilyCss(style.fontFamily),
        textAlign: style.textAlign
      }}
    >
      <div
        style={{
          aspectRatio: '1 / 1',
          width: `${style.coverSize * 78}%`
        }}
      >
        <CoverImage
          src={poster.coverImage}
          alt={poster.albumName}
          className="h-full w-full rounded-sm"
        />
      </div>

      <div style={{ marginTop: baseWidth * 0.05 * style.spacing, width: '100%' }}>
        <h1
          style={{
            fontSize: baseWidth * 0.05 * style.titleSize,
            fontWeight: 700,
            color: style.textColor,
            lineHeight: 1.1
          }}
        >
          {poster.albumName}
        </h1>
        <p
          style={{
            fontSize: baseWidth * 0.026 * style.artistSize,
            color: style.textColor,
            opacity: 0.7,
            marginTop: baseWidth * 0.012
          }}
        >
          {poster.artistName}
          {style.showYear ? ` · ${poster.releaseYear}` : ''}
        </p>
      </div>

      <div
        style={{
          height: 1,
          background: style.accentColor,
          width: '100%',
          margin: `${baseWidth * 0.04 * style.spacing}px 0`
        }}
      />

      <TrackList tracks={poster.tracks} style={style} baseWidth={baseWidth} />
    </div>
  );
}
