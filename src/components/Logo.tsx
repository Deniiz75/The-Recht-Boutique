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
 * The wordmark is the one place the brand pink is allowed to carry letterforms.
 * At 17–19px it measures 4.33:1 on the header surface, under the 4.5:1 that
 * 1.4.3 would ask of body text — a logotype is exempt, and the tagline beside
 * it is black (16.20:1) so the lockup is never the only way to read the name.
 *
 * onDark keeps the wordmark white: brand on black is 3.74:1, which a 17px
 * serif cannot carry.
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
            onDark ? 'text-white' : 'text-brand'
          }`}
        >
          The Recht <span className="italic">Boutique</span>
        </span>
        <span
          className={`mt-1.5 hidden font-mono text-[0.5625rem] tracking-[0.28em] uppercase sm:block ${
            onDark ? 'text-surface' : 'text-ink'
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
