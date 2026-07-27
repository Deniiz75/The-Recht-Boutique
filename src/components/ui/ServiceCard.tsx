import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/content/site';

type ServiceCardProps = {
  service: Service;
  /** Two-digit index rendered on the hairline. */
  index: string;
  /** The section background, so the number can straddle the rule cleanly. */
  surface?: 'canvas' | 'cream';
};

/* Body copy switches to text-dark on cream: text-medium measures 4.54:1 there
   and only 0.04 above AA, where on white it is a comfortable 7.16:1. */
const surfaces = {
  canvas: { chip: 'bg-canvas', body: 'text-text-medium' },
  cream: { chip: 'bg-cream', body: 'text-text-dark' },
} as const;

/** A practice area, opened by a mono numeral sitting on the top hairline. */
export function ServiceCard({ service, index, surface = 'canvas' }: ServiceCardProps) {
  const tone = surfaces[surface];

  return (
    <Link
      href={`/diensten/${service.slug}`}
      className="card-lift group relative flex h-full flex-col border-t border-rose/15 pt-9 pb-2 hover:border-rose-dark"
    >
      <span
        aria-hidden="true"
        className={`absolute -top-2 left-0 pr-3 font-mono text-[0.6875rem] tracking-[0.2em] text-rose-dark tabular-nums ${tone.chip}`}
      >
        {index}
      </span>

      <p className={`font-mono text-[0.625rem] tracking-[0.22em] uppercase ${tone.body}`}>
        {service.audience}
      </p>

      <h3 className="mt-4 font-display text-heading text-text-dark transition-colors group-hover:text-rose-dark">
        {service.title}
      </h3>

      <p className={`mt-4 flex-1 text-[0.9375rem] leading-relaxed ${tone.body}`}>
        {service.summary}
      </p>

      <span className="mt-7 inline-flex min-h-11 items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-text-dark uppercase">
        <span className="link-rule-in">Meer over {service.title.toLowerCase()}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
