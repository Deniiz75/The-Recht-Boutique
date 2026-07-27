import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/content/site';

type ServiceCardProps = {
  service: Service;
  /** Two-digit index rendered on the hairline. */
  index: string;
  /** The section background, so the number can straddle the rule cleanly. */
  surface?: 'paper' | 'cream';
};

const surfaces = {
  paper: 'bg-paper',
  cream: 'bg-cream',
} as const;

/** A practice area, opened by a mono numeral sitting on the top hairline. */
export function ServiceCard({ service, index, surface = 'paper' }: ServiceCardProps) {
  return (
    <Link
      href={`/diensten/${service.slug}`}
      className="group relative flex h-full flex-col border-t border-ink/25 pt-9 pb-2 transition-colors hover:border-rust-deep"
    >
      <span
        aria-hidden="true"
        className={`absolute -top-2 left-0 pr-3 font-mono text-[0.6875rem] tracking-[0.2em] text-rust-deep tabular-nums ${surfaces[surface]}`}
      >
        {index}
      </span>

      <p className="font-mono text-[0.625rem] tracking-[0.22em] text-muted uppercase">
        {service.audience}
      </p>

      <h3 className="mt-4 font-display text-heading text-ink-deep transition-colors group-hover:text-rust-deep">
        {service.title}
      </h3>

      <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-muted">
        {service.summary}
      </p>

      <span className="mt-7 inline-flex min-h-11 items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-ink uppercase">
        <span className="link-rule-in">Meer over {service.title.toLowerCase()}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
