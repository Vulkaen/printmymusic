import { PosterTemplateProps } from '@/components/poster/types';
import { CoverImage } from '@/components/poster/CoverImage';
import { TrackList } from '@/components/poster/TrackList';
import { fontFamilyCss } from '@/lib/fonts';
import { formatReleaseDate } from '@/lib/utils';
import { sumTrackDurations } from '@/lib/poster';

export function PosterTemplatePhoto({ poster, style, baseWidth }: PosterTemplateProps) {
  const pad = baseWidth * 0.06;
  const albumLength = sumTrackDurations(poster.tracks);
  const releaseDateLabel = formatReleaseDate(poster.releaseDate) || poster.releaseYear;

  return (
    <div
      className="flex h-full w-full flex-col"
      style={{
        backgroundColor: style.backgroundColor,
        fontFamily: fontFamilyCss(style.fontFamily)
      }}
    >
      <div style={{ height: '56%', padding: pad, paddingBottom: 0 }}>
        <CoverImage
          src={poster.coverImage}
          alt={poster.albumName}
          className="h-full w-full rounded-sm"
        />
      </div>

      <div className="flex flex-1 flex-col" style={{ padding: pad }}>
        <div
          className="flex items-start justify-between"
          style={{ marginBottom: baseWidth * 0.035 * style.spacing }}
        >
          <div style={{ textAlign: style.textAlign }}>
            <h1
              style={{
                fontSize: baseWidth * 0.046 * style.titleSize,
                fontWeight: 800,
                color: style.textColor,
                lineHeight: 1.05
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
          <p
            style={{
              fontSize: baseWidth * 0.013,
              color: style.textColor,
              opacity: 0.45,
              maxWidth: baseWidth * 0.22,
              textAlign: 'right',
              lineHeight: 1.4
            }}
          >
            An album by {poster.artistName}
          </p>
        </div>

        <div className="flex flex-1 gap-6">
          <div className="flex-1 overflow-hidden">
            <TrackList tracks={poster.tracks} style={{ ...style, columns: 1 }} baseWidth={baseWidth} />
          </div>

          <div
            className="flex shrink-0 flex-col gap-4"
            style={{ minWidth: baseWidth * 0.19 }}
          >
            {releaseDateLabel && (
              <MetaBlock label="Release Date" value={releaseDateLabel} baseWidth={baseWidth} color={style.textColor} />
            )}
            {poster.recordLabel && (
              <MetaBlock label="Release Label" value={poster.recordLabel} baseWidth={baseWidth} color={style.textColor} />
            )}
            {poster.tracks.length > 0 && (
              <MetaBlock label="Album Length" value={albumLength} baseWidth={baseWidth} color={style.textColor} />
            )}
          </div>
        </div>

        <div
          className="flex items-center"
          style={{ gap: baseWidth * 0.014, marginTop: baseWidth * 0.03 * style.spacing }}
        >
          {[1, 0.75, 0.5, 0.3].map((opacity, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{
                width: baseWidth * 0.022,
                height: baseWidth * 0.022,
                backgroundColor: style.accentColor,
                opacity
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MetaBlock({
  label,
  value,
  baseWidth,
  color
}: {
  label: string;
  value: string;
  baseWidth: number;
  color: string;
}) {
  return (
    <div>
      <p style={{ fontSize: baseWidth * 0.013, fontWeight: 700, color, opacity: 0.9 }}>{label}</p>
      <p style={{ fontSize: baseWidth * 0.014, color, opacity: 0.6, marginTop: baseWidth * 0.003 }}>
        {value}
      </p>
    </div>
  );
}
