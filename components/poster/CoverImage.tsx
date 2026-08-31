import { Music2 } from 'lucide-react';
import { CSSProperties } from 'react';
import { proxiedImageUrl } from '@/lib/poster';

interface CoverImageProps {
  src: string | null;
  alt: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Rendert das Cover als CSS-Hintergrundbild statt als <img>-Element.
 *
 * Grund: Der Export-Renderer (html-to-image) serialisiert den DOM-Baum in
 * ein SVG <foreignObject> und rastert dieses dann auf ein Canvas. <img>
 * mit object-fit wird dabei von manchen Browsern beim Rasterisieren nicht
 * zuverlässig respektiert und kann leer/fehlend erscheinen. Ein CSS
 * background-image mit background-size: cover wird als gemaltes Element
 * behandelt und deutlich zuverlässiger erfasst.
 */
export function CoverImage({ src, alt, className, style }: CoverImageProps) {
  const url = proxiedImageUrl(src);

  if (!url) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={className}
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #E7E5E2, #D4D1CB)'
        }}
      >
        <Music2 className="h-1/4 w-1/4 text-white/70" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={className}
      style={{
        ...style,
        backgroundImage: `url("${url}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    />
  );
}
