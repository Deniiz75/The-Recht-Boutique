import Link from 'next/link';
import { site } from '@/content/site';
import { Seal } from '@/components/ui/Seal';

type LogoProps = {
  tone?: 'ink' | 'paper';
  /** Unique suffix for the seal's internal SVG id. */
  uid?: string;
  className?: string;
};

/** Wordmark + seal, linking home. */
export function Logo({ tone = 'ink', uid = 'logo', className }: LogoProps) {
  const isPaper = tone === 'paper';

  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 py-1 ${className ?? ''}`}
      aria-label={`${site.name} — naar de homepage`}
    >
      <Seal size={38} tone={isPaper ? 'ink' : 'paper'} uid={uid} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.0625rem] leading-none tracking-tight sm:text-[1.1875rem] ${
            isPaper ? 'text-paper' : 'text-ink-deep'
          }`}
        >
          The Recht <span className="italic">Boutique</span>
        </span>
        <span
          className={`mt-1.5 hidden font-mono text-[0.5625rem] tracking-[0.28em] uppercase sm:block ${
            isPaper ? 'text-gold' : 'text-muted'
          }`}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}
