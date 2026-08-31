import { PosterData, ColumnCount, FontId, TextAlign, PosterLabels } from '@/types/poster';

export interface PosterStyleSettings {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: FontId;
  titleSize: number;
  artistSize: number;
  trackSize: number;
  textAlign: TextAlign;
  coverSize: number;
  spacing: number;
  showYear: boolean;
  showTrackNumbers: boolean;
  showDurations: boolean;
  columns: ColumnCount;
  labels: PosterLabels;
}

export interface PosterTemplateProps {
  poster: PosterData;
  style: PosterStyleSettings;
  /** Explizite Basisbreite in px des Render-Containers, für konsistente relative Schriftgrößen. */
  baseWidth: number;
}
