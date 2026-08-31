import { FontId } from '@/types/poster';

export const FONT_OPTIONS: { value: FontId; label: string }[] = [
  { value: 'inter', label: 'Inter' },
  { value: 'helvetica', label: 'Helvetica' },
  { value: 'playfair', label: 'Playfair Display' },
  { value: 'dmsans', label: 'DM Sans' },
  { value: 'grotesk', label: 'Space Grotesk' }
];

export function fontFamilyCss(font: FontId): string {
  switch (font) {
    case 'inter':
      return 'var(--font-inter), system-ui, sans-serif';
    case 'helvetica':
      return 'Helvetica, Arial, system-ui, sans-serif';
    case 'playfair':
      return 'var(--font-playfair), Georgia, serif';
    case 'dmsans':
      return 'var(--font-dmsans), system-ui, sans-serif';
    case 'grotesk':
      return 'var(--font-grotesk), system-ui, sans-serif';
    default:
      return 'system-ui, sans-serif';
  }
}
