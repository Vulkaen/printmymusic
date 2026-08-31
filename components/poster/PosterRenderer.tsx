import { PosterData, TemplateId } from '@/types/poster';
import { PosterStyleSettings } from '@/components/poster/types';
import { PosterTemplateMinimal } from '@/components/poster/templates/PosterTemplateMinimal';
import { PosterTemplateEditorial } from '@/components/poster/templates/PosterTemplateEditorial';
import { PosterTemplateTypography } from '@/components/poster/templates/PosterTemplateTypography';
import { PosterTemplateSplit } from '@/components/poster/templates/PosterTemplateSplit';
import { PosterTemplateDark } from '@/components/poster/templates/PosterTemplateDark';
import { PosterTemplateGrid } from '@/components/poster/templates/PosterTemplateGrid';
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
  typography: PosterTemplateTypography,
  split: PosterTemplateSplit,
  dark: PosterTemplateDark,
  grid: PosterTemplateGrid,
  photo: PosterTemplatePhoto,
  player: PosterTemplatePlayer
} as const;

export function PosterRenderer({ template, poster, style, baseWidth }: PosterRendererProps) {
  const Template = TEMPLATE_MAP[template];
  return <Template poster={poster} style={style} baseWidth={baseWidth} />;
}
