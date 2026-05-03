import Image from 'next/image';

interface WordmarkProps {
  /** Width in px for the SVG wordmark */
  width?: number;
  className?: string;
  eager?: boolean;
}

/**
 * The Солнички wordmark — rendered from an SVG asset so it can be swapped
 * for a hand-lettered PNG by replacing /public/images/wordmark.svg with
 * /public/images/wordmark.png and updating the src below.
 */
export default function Wordmark({ width = 480, className = '', eager }: WordmarkProps) {
  return (
    <Image
      src="/images/wordmark.svg"
      alt="Солнички"
      width={width}
      height={Math.round((width / 1000) * 320)}
      className={`select-none ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
    />
  );
}
