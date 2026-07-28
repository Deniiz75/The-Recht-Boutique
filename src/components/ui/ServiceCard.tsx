import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/content/site';

type ServiceCardProps = {
  service: Service;
  /** Two-digit index rendered on the hairline. */
  index: string;
  /** The section background, so the number can straddle the rule cleanly. */
  surface?: 'canvas' | 'surface';
};

/* Body copy switches to text-dark on cream: text-medium measures 4.54:1 there
   and only 0.04 above AA, where on white it is a comfortable 7.16:1. */
const surfaces = {
  canvas: { chip: 'bg-canvas', body: 'text-ink-soft' },
  surface: { chip: 'bg-surface', body: 'text-ink' },
} as const;

/** A practice area, opened by a mono numeral sitting on the top hairline. */
export function ServiceCard({ service, index, surface = 'canvas' }: ServiceCardProps) {
  const tone = surfaces[surface];

  return (
    <Link
      href={`/diensten/${service.slug}`}
      className="@container card-lift group relative flex h-full flex-col border-t border-gold/50 pt-9 pb-2 hover:border-accent"
    >
      <span
        aria-hidden="true"
        className={`absolute -top-2 left-0 pr-3 font-mono text-[0.6875rem] tracking-[0.2em] text-accent tabular-nums ${tone.chip}`}
      >
        {index}
      </span>

      <p className={`font-mono text-[0.625rem] tracking-[0.22em] uppercase ${tone.body}`}>
        {service.audience}
      </p>

      {/* The title sizes off the card's own width, not the viewport's.
          `Ondernemingsrecht` is one unbreakable word: at the shared
          `text-heading` (34px at 1280) it needs 303px, and a quarter of this
          grid is 258px, so it ran into the next column. The same card also
          appears three-up and two-up, where 34px is right — a viewport clamp
          cannot serve both, a container clamp can. 10.5cqw is the widest that
          still fits the longest title, with the old ceiling kept for the wide
          layouts. `hyphens` is the last resort for a future longer title. */}
      <h3 className="mt-4 font-display text-[clamp(1.25rem,10.5cqw,2.125rem)] leading-[1.14] tracking-[-0.015em] text-ink hyphens-auto transition-colors group-hover:text-accent">
        {service.title}
      </h3>

      <p className={`mt-4 text-[0.9375rem] leading-relaxed ${tone.body}`}>
        {service.summary}
      </p>

      {/* `mt-auto` pins this to the bottom edge of the card, and the grid
          stretches every card to the tallest, so the four links share one
          baseline whatever the title or summary above them does.
          Tracking is 0.08em rather than 0.2em because the longest label,
          `Meer over geschillen & procedures`, was the only one wrapping to a
          second line. Measured in a 258px quarter column at 1280, with 21px
          taken by the arrow and its gap: 0.2em needs 264px, 0.12em still 238px,
          0.08em 224px. Below the four-up breakpoint the column is 198px and it
          wraps regardless — the bottoms stay aligned either way. */}
      <span className="mt-auto inline-flex min-h-11 items-center gap-2 pt-7 font-mono text-[0.625rem] tracking-[0.08em] text-ink uppercase">
        <span className="link-rule-in">Meer over {service.title.toLowerCase()}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
