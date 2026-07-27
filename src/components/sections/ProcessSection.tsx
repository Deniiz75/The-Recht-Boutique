import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { processSteps } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

type ProcessSectionProps = {
  index?: string;
  /** The summary variant links through to the full werkwijze page. */
  withLink?: boolean;
  surface?: 'canvas' | 'cream';
};

/* Body copy switches to text-dark on cream: text-medium measures 4.54:1 there
   and only 0.04 above AA, where on white it is a comfortable 7.16:1. */
const surfaces = {
  canvas: { section: 'bg-canvas', chip: 'bg-canvas', body: 'text-text-medium' },
  cream: { section: 'bg-cream', chip: 'bg-cream', body: 'text-text-dark' },
} as const;

export function ProcessSection({
  index,
  withLink = false,
  surface = 'canvas',
}: ProcessSectionProps) {
  const tone = surfaces[surface];

  return (
    <section
      aria-labelledby="werkwijze-titel"
      className={`border-t border-rose/10 ${tone.section}`}
    >
      <Container>
        <div className="py-20 lg:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Werkwijze"
              index={index}
              title={
                <span id="werkwijze-titel">
                  Van gesprek naar <span className="italic">uitvoering</span>
                </span>
              }
            />
            {withLink ? (
              <Link
                href="/werkwijze"
                className="group reveal inline-flex min-h-11 shrink-0 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.2em] text-text-dark uppercase"
              >
                <span className="link-rule-in">De werkwijze in detail</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-rose transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </div>

          <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li
                key={step.step}
                className="card-lift reveal group relative border-t border-rose/15 pt-9 hover:border-rose-dark"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-2.5 left-0 pr-3 font-display text-lg leading-none text-rose-dark tabular-nums ${tone.chip}`}
                >
                  {step.step}
                </span>
                <h3 className="font-display text-[1.375rem] leading-tight">{step.title}</h3>
                <p className={`mt-3 text-[0.9375rem] leading-relaxed ${tone.body}`}>
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
