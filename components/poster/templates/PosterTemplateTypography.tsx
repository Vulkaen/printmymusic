import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';

export function PosterTemplateTypography({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.08;
  return (
    <div
      className="flex h-full w-full flex-col justify-between"
      style={{
        backgroundColor: style.backgroundColor,
        padding: pad,
        fontFamily: fontFamilyCss(style.fontFamily),
        textAlign: style.textAlign
      }}
    >
      <div
        style={{
          width: baseWidth * 0.14 * style.coverSize,
          height: baseWidth * 0.14 * style.coverSize,
          margin: style.textAlign === 'center' ? '0 auto' : undefined,
          marginLeft: style.textAlign === 'right' ? 'auto' : undefined
        }}
      >
        <CoverImage src={poster.coverImage} alt={poster.albumName} className="h-full w-full rounded-sm" />
      </div>

      <div style={{ marginTop: baseWidth * 0.06 * style.spacing }}>
        <h1
          style={{
            fontSize: baseWidth * 0.13 * style.titleSize,
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: style.textColor,
            lineHeight: 0.92,
            wordBreak: 'break-word'
          }}
        >
          {poster.albumName}
        </h1>
        <p
          style={{
            fontSize: baseWidth * 0.03 * style.artistSize,
            color: style.accentColor,
            fontWeight: 700,
            marginTop: baseWidth * 0.02,
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}
        >
          {poster.artistName}
          {style.showYear ? ` — ${poster.releaseYear}` : ''}
        </p>
      </div>

      <div style={{ marginTop: baseWidth * 0.06 * style.spacing }}>
        <TrackList tracks={poster.tracks} style={style} baseWidth={baseWidth} />
      </div>
    </div>
  );
}
