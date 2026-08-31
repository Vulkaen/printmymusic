import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';

export function PosterTemplateDark({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.08;
  return (
    <div
      className="flex h-full w-full flex-col items-center"
      style={{
        backgroundColor: '#0B0B0C',
        padding: pad,
        fontFamily: fontFamilyCss(style.fontFamily),
        textAlign: style.textAlign
      }}
    >
      <div
        style={{
          width: `${style.coverSize * 78}%`,
          aspectRatio: '1 / 1',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)'
        }}
      >
        <CoverImage src={poster.coverImage} alt={poster.albumName} className="h-full w-full rounded-md" />
      </div>

      <div style={{ marginTop: baseWidth * 0.06 * style.spacing, width: '100%' }}>
        <h1
          style={{
            fontSize: baseWidth * 0.052 * style.titleSize,
            fontWeight: 700,
            color: '#F5F4F2',
            lineHeight: 1.1
          }}
        >
          {poster.albumName}
        </h1>
        <p
          style={{
            fontSize: baseWidth * 0.026 * style.artistSize,
            color: style.accentColor,
            marginTop: baseWidth * 0.012,
            fontWeight: 600
          }}
        >
          {poster.artistName}
          {style.showYear ? ` · ${poster.releaseYear}` : ''}
        </p>
      </div>

      <div
        style={{
          height: 1,
          background: 'rgba(255,255,255,0.12)',
          width: '100%',
          margin: `${baseWidth * 0.04 * style.spacing}px 0`
        }}
      />

      <TrackList
        tracks={poster.tracks}
        style={{ ...style, textColor: '#F5F4F2' }}
        baseWidth={baseWidth}
      />
    </div>
  );
}
