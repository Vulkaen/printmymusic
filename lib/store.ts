import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ColumnCount,
  ExportQuality,
  FontId,
  Orientation,
  PosterData,
  PosterSizeId,
  TemplateId,
  TextAlign
} from '@/types/poster';
import { demoPosterData } from '@/lib/poster';
import { formatDuration } from '@/lib/utils';

interface PosterStoreState {
  poster: PosterData;
  template: TemplateId;

  backgroundColor: string;
  textColor: string;
  accentColor: string;
  albumColors: string[];

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

  posterSizeId: PosterSizeId;
  customWidthMm: number;
  customHeightMm: number;
  orientation: Orientation;

  dpi: ExportQuality;

  isCustomCover: boolean;

  setPoster: (poster: PosterData) => void;
  setTemplate: (template: TemplateId) => void;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setAlbumColors: (colors: string[]) => void;
  setFontFamily: (font: FontId) => void;
  setTitleSize: (size: number) => void;
  setArtistSize: (size: number) => void;
  setTrackSize: (size: number) => void;
  setTextAlign: (align: TextAlign) => void;
  setCoverSize: (size: number) => void;
  setSpacing: (spacing: number) => void;
  setShowYear: (show: boolean) => void;
  setShowTrackNumbers: (show: boolean) => void;
  setShowDurations: (show: boolean) => void;
  setColumns: (columns: ColumnCount) => void;
  setPosterSizeId: (id: PosterSizeId) => void;
  setCustomSize: (widthMm: number, heightMm: number) => void;
  setOrientation: (orientation: Orientation) => void;
  setDpi: (dpi: ExportQuality) => void;
  applyPalette: (colors: { background: string; text: string; accent: string }) => void;
  setCustomCover: (url: string) => void;
  updateTrackName: (index: number, name: string) => void;
  updateTrackDuration: (index: number, minutes: number, seconds: number) => void;
  removeTrack: (index: number) => void;
  reset: () => void;
}

const defaults = {
  poster: demoPosterData(),
  template: 'minimal' as TemplateId,

  backgroundColor: '#FAFAF9',
  textColor: '#111110',
  accentColor: '#C65D3B',
  albumColors: [] as string[],

  fontFamily: 'inter' as FontId,
  titleSize: 1,
  artistSize: 1,
  trackSize: 1,

  textAlign: 'left' as TextAlign,
  coverSize: 1,
  spacing: 1,

  showYear: true,
  showTrackNumbers: true,
  showDurations: true,
  columns: 2 as ColumnCount,

  posterSizeId: 'a3' as PosterSizeId,
  customWidthMm: 297,
  customHeightMm: 420,
  orientation: 'portrait' as Orientation,

  dpi: 'print300' as ExportQuality,

  isCustomCover: false
};

export const usePosterStore = create<PosterStoreState>()(
  persist(
    (set) => ({
      ...defaults,

      setPoster: (poster) => set({ poster, isCustomCover: false }),
      setTemplate: (template) => set({ template }),
      setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
      setTextColor: (textColor) => set({ textColor }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setAlbumColors: (albumColors) => set({ albumColors }),
      setFontFamily: (fontFamily) => set({ fontFamily }),
      setTitleSize: (titleSize) => set({ titleSize }),
      setArtistSize: (artistSize) => set({ artistSize }),
      setTrackSize: (trackSize) => set({ trackSize }),
      setTextAlign: (textAlign) => set({ textAlign }),
      setCoverSize: (coverSize) => set({ coverSize }),
      setSpacing: (spacing) => set({ spacing }),
      setShowYear: (showYear) => set({ showYear }),
      setShowTrackNumbers: (showTrackNumbers) => set({ showTrackNumbers }),
      setShowDurations: (showDurations) => set({ showDurations }),
      setColumns: (columns) => set({ columns }),
      setPosterSizeId: (posterSizeId) => set({ posterSizeId }),
      setCustomSize: (customWidthMm, customHeightMm) => set({ customWidthMm, customHeightMm }),
      setOrientation: (orientation) => set({ orientation }),
      setDpi: (dpi) => set({ dpi }),
      applyPalette: ({ background, text, accent }) =>
        set({ backgroundColor: background, textColor: text, accentColor: accent }),
      setCustomCover: (url) =>
        set((state) => ({
          poster: { ...state.poster, coverImage: url },
          isCustomCover: true
        })),
      updateTrackName: (index, name) =>
        set((state) => ({
          poster: {
            ...state.poster,
            tracks: state.poster.tracks.map((t, i) => (i === index ? { ...t, name } : t))
          }
        })),
      updateTrackDuration: (index, minutes, seconds) =>
        set((state) => {
          const safeMinutes = Math.max(0, Math.floor(minutes) || 0);
          const safeSeconds = Math.min(59, Math.max(0, Math.floor(seconds) || 0));
          const durationMs = (safeMinutes * 60 + safeSeconds) * 1000;
          return {
            poster: {
              ...state.poster,
              tracks: state.poster.tracks.map((t, i) =>
                i === index ? { ...t, durationMs, duration: formatDuration(durationMs) } : t
              )
            }
          };
        }),
      removeTrack: (index) =>
        set((state) => ({
          poster: {
            ...state.poster,
            // Nach dem Entfernen fortlaufend neu nummerieren, damit die
            // Trackliste auf dem Poster lückenlos bei 1 beginnt.
            tracks: state.poster.tracks
              .filter((_, i) => i !== index)
              .map((t, i) => ({ ...t, number: i + 1 }))
          }
        })),
      reset: () => set({ ...defaults, poster: demoPosterData() })
    }),
    {
      name: 'printmymusic-poster-draft',
      version: 1
    }
  )
);
