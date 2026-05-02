import { CSSProperties } from 'react';

type Variant = 'outline' | 'solid';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface WordmarkProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Override CSS color used for stroke / fill */
  color?: string;
}

const sizeMap: Record<Size, string> = {
  sm: 'text-3xl',
  md: 'text-5xl md:text-6xl',
  lg: 'text-7xl md:text-8xl',
  xl: 'text-wordmark',
};

/**
 * The Солнички wordmark — cursive script with twin ringed dots either side.
 * `outline` traces a hairline contour that reads against busy backgrounds.
 */
export default function Wordmark({
  variant = 'outline',
  size = 'lg',
  className = '',
  color,
}: WordmarkProps) {
  const style: CSSProperties = color ? { color } : {};

  const textStyle: CSSProperties =
    variant === 'outline'
      ? {
          color: 'transparent',
          WebkitTextStroke: '1.25px currentColor',
          textShadow: '0 1px 0 rgba(0,0,0,.04)',
        }
      : {};

  return (
    <span
      aria-label="Солнички"
      className={`inline-flex items-center justify-center font-script leading-none select-none ${sizeMap[size]} ${className}`}
      style={style}
    >
      <span className="wordmark-dot" aria-hidden />
      <span style={textStyle} className="px-2">
        Солнички
      </span>
      <span className="wordmark-dot" aria-hidden />
    </span>
  );
}
