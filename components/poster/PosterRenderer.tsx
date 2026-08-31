import { PosterData, TemplateId } from '@/types/poster';
import { PosterStyleSettings } from '@/components/poster/types';
import { PosterTemplateMinimal } from '@/components/poster/templates/PosterTemplateMinimal';
import { PosterTemplateEditorial } from '@/components/poster/templates/PosterTemplateEditorial';
import { PosterTemplateSplit } from '@/components/poster/templates/PosterTemplateSplit';
import { PosterTemplatePhoto } from '@/components/poster/templates/PosterTemplatePhoto';
import { PosterTemplatePlayer } from '@/components/poster/templates/PosterTemplatePlayer';

interface PosterRendererProps {
  template: TemplateId;
  poster: PosterData;
  style: PosterStyleSettings;
  baseWidth: number;
}

const TEMPLATE_MAP = {
  minimal: PosterTemplateMinimal,
  editorial: PosterTemplateEditorial,
  split: PosterTemplateSplit,
  photo: PosterTemplatePhoto,
  player: PosterTemplatePlayer
} as const;

export function PosterRenderer({ template, poster, style, baseWidth }: PosterRendererProps) {
  // Fallback auf 'minimal', falls ein veralteter/ungültiger Template-Wert
  // ankommt (z.B. aus einer alten gespeicherten Shareable-URL).
  const Template = TEMPLATE_MAP[template] ?? TEMPLATE_MAP.minimal;
  return <Template poster={poster} style={style} baseWidth={baseWidth} />;
}
