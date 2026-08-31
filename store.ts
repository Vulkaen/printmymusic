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

  dpi: 'print300' as ExportQuality
};

export const usePosterStore = create<PosterStoreState>()(
  persist(
    (set) => ({
      ...defaults,

      setPoster: (poster) => set({ poster }),
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
      reset: () => set({ ...defaults, poster: demoPosterData() })
    }),
    {
      name: 'printmymusic-poster-draft',
      version: 1
    }
  )
);
