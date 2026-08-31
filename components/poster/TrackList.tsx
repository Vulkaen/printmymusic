import { Track } from '@/types/poster';
import { PosterStyleSettings } from '@/components/poster/types';
import { splitTracksIntoColumns } from '@/lib/poster';

interface TrackListProps {
  tracks: Track[];
  style: PosterStyleSettings;
  baseWidth: number;
  dividerColor?: string;
}

export function TrackList({ tracks, style, baseWidth, dividerColor }: TrackListProps) {
  const columns = splitTracksIntoColumns(tracks, style.columns);
  const fontSize = baseWidth * 0.014 * style.trackSize;
  const rowSpacing = baseWidth * 0.008;

  return (
    <div
      className="grid w-full"
      style={{
        gridTemplateColumns: `repeat(${style.columns}, 1fr)`,
        gap: baseWidth * 0.03,
        textAlign: style.textAlign
      }}
    >
      {columns.map((col, colIndex) => (
        // Kein flex+gap auf dem Spalten-Container: CSS "gap" in Flexbox wird
        // von html2canvas nicht zuverlässig unterstützt. Stattdessen fester
        // Abstand über marginBottom pro Zeile.
        <div key={colIndex}>
          {col.map((track, rowIndex) => (
            <div
              key={track.number}
              style={{ marginBottom: rowIndex < col.length - 1 ? rowSpacing : 0 }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  fontSize,
                  lineHeight: 2.2,
                  color: style.textColor
                }}
              >
                <span className="flex items-center gap-2" style={{ opacity: 0.92 }}>
                  {style.showTrackNumbers && (
                    <span style={{ opacity: 0.5, minWidth: fontSize * 1.4, display: 'inline-block' }}>
                      {String(track.number).padStart(2, '0')}
                    </span>
                  )}
                  <span className="truncate">{track.name}</span>
                </span>
                {style.showDurations && (
                  <span style={{ opacity: 0.5, whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {track.duration}
                  </span>
                )}
              </div>
              {dividerColor && (
                <div
                  style={{
                    height: 1,
                    background: dividerColor,
                    marginTop: baseWidth * 0.008
                  }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
