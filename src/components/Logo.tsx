import Link from 'next/link';
import { site } from '@/content/site';
import { Seal } from '@/components/ui/Seal';

type LogoProps = {
  tone?: 'onLight' | 'onDark';
  /** Unique suffix for the seal's internal SVG id. */
  uid?: string;
  className?: string;
};

/**
 * Wordmark + seal, linking home.
 *
 * The light variant sits on the cream header, so the 9px tagline is rose-dark
 * (4.89:1 on cream) rather than text-medium, which measures only 4.54:1 there.
 */
export function Logo({ tone = 'onLight', uid = 'logo', className }: LogoProps) {
  const onDark = tone === 'onDark';

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 py-1 ${className ?? ''}`}
      aria-label={`${site.name} — naar de homepage`}
    >
      <Seal size={38} tone={onDark ? 'dark' : 'white'} uid={uid} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] leading-none tracking-tight sm:text-[1.1875rem] ${
            onDark ? 'text-white' : 'text-text-dark'
          }`}
        >
          The Recht <span className="italic">Boutique</span>
        </span>
        <span
          className={`mt-1.5 hidden font-mono text-[0.5625rem] tracking-[0.28em] uppercase sm:block ${
            onDark ? 'text-cream' : 'text-rose-dark'
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
