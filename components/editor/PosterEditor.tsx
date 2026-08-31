'use client';

import { Music, LayoutGrid, Palette, Type, ListChecks, Ruler, Download, Sparkles } from 'lucide-react';
import { AlbumSearch } from '@/components/spotify/AlbumSearch';
import { TemplateSelector } from '@/components/editor/TemplateSelector';
import { ColorControls } from '@/components/editor/ColorControls';
import { TypographyControls } from '@/components/editor/TypographyControls';
import { ContentControls } from '@/components/editor/ContentControls';
import { SizeControls } from '@/components/editor/SizeControls';
import { ExportControls } from '@/components/editor/ExportControls';
import { CustomCoverUpload } from '@/components/editor/CustomCoverUpload';
import { PosterDetailsControls } from '@/components/editor/PosterDetailsControls';
import { LabelControls } from '@/components/editor/LabelControls';
import { TrackNameEditor } from '@/components/editor/TrackNameEditor';
import { AccordionRoot, AccordionSection } from '@/components/ui/accordion';

export function PosterEditor() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-5 py-5">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Music</h2>
        <AlbumSearch />
      </div>

      <div className="flex-1 overflow-y-auto px-5">
        <AccordionRoot defaultValue={['layout', 'colors']}>
          <AccordionSection value="layout" title="Layout" icon={<LayoutGrid className="h-4 w-4" />}>
            <TemplateSelector />
          </AccordionSection>

          <AccordionSection value="colors" title="Colors" icon={<Palette className="h-4 w-4" />}>
            <ColorControls />
          </AccordionSection>

          <AccordionSection value="typography" title="Typography" icon={<Type className="h-4 w-4" />}>
            <TypographyControls />
          </AccordionSection>

          <AccordionSection value="content" title="Content" icon={<ListChecks className="h-4 w-4" />}>
            <ContentControls />
          </AccordionSection>

          <AccordionSection value="size" title="Size" icon={<Ruler className="h-4 w-4" />}>
            <SizeControls />
          </AccordionSection>

          <AccordionSection value="personalize" title="Personalize" icon={<Sparkles className="h-4 w-4" />}>
            <div className="flex flex-col gap-5">
              <div>
                <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Details
                </h4>
                <PosterDetailsControls />
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Template labels
                </h4>
                <LabelControls />
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Cover
                </h4>
                <CustomCoverUpload />
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted">
                  Tracks
                </h4>
                <TrackNameEditor />
              </div>
            </div>
          </AccordionSection>
        </AccordionRoot>
      </div>

      <div className="border-t border-border px-5 py-5">
        <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          <Download className="h-3.5 w-3.5" />
          Export
        </h2>
        <ExportControls />
      </div>
    </div>
  );
}
