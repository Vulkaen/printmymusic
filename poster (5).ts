export interface Track {
  number: number;
  name: string;
  duration: string; // formatted mm:ss
  durationMs: number;
}

export interface PosterData {
  albumId: string | null;
  albumName: string;
  artistName: string;
  releaseYear: string;
  coverImage: string | null;
  tracks: Track[];
  spotifyUrl: string | null;
}

export type TemplateId = 'minimal' | 'editorial' | 'typography' | 'split' | 'dark' | 'grid';

export type FontId = 'inter' | 'helvetica' | 'playfair' | 'dmsans' | 'grotesk';

export type ColumnCount = 1 | 2 | 3;

export type TextAlign = 'left' | 'center' | 'right';

export type PosterSizeId =
  | 'a4'
  | 'a3'
  | 'a2'
  | '30x40'
  | '40x50'
  | '50x70'
  | 'letter'
  | 'square'
  | 'custom';

export type Orientation = 'portrait' | 'landscape';

export type ExportFormat = 'png' | 'jpg' | 'pdf';

export type ExportQuality = 'web' | 'print150' | 'print300';

export interface PosterSize {
  id: PosterSizeId;
  label: string;
  widthMm: number;
  heightMm: number;
}

export interface PosterState {
  poster: PosterData;
  template: TemplateId;

  backgroundColor: string;
  textColor: string;
  accentColor: string;
  albumColors: string[];

  fontFamily: FontId;
  titleSize: number; // relative scale 0.5 - 2
  artistSize: number;
  trackSize: number;

  textAlign: TextAlign;
  coverSize: number; // relative scale 0.5 - 1.5
  spacing: number; // relative scale 0.5 - 2

  showYear: boolean;
  showTrackNumbers: boolean;
  showDurations: boolean;
  columns: ColumnCount;

  posterSizeId: PosterSizeId;
  customWidthMm: number;
  customHeightMm: number;
  orientation: Orientation;

  dpi: ExportQuality;
}
