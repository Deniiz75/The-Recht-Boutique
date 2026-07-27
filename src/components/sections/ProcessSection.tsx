import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { process } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

type ProcessSectionProps = {
  index?: string;
  /** The summary variant links through to the full werkwijze page. */
  withLink?: boolean;
  surface?: 'paper' | 'cream';
};

const surfaces = {
  paper: { section: 'bg-paper', chip: 'bg-paper' },
  cream: { section: 'bg-cream', chip: 'bg-cream' },
} as const;

export function ProcessSection({
  index,
  withLink = false,
  surface = 'cream',
}: ProcessSectionProps) {
  const tone = surfaces[surface];

  return (
    <section aria-labelledby="werkwijze-titel" className={tone.section}>
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
                className="group reveal inline-flex min-h-11 shrink-0 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.2em] text-ink uppercase"
              >
                <span className="link-rule-in">De werkwijze in detail</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 text-rust-deep transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ) : null}
          </div>

          <ol className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <li key={step.step} className="reveal relative border-t border-ink/25 pt-9">
                <span
                  aria-hidden="true"
                  className={`absolute -top-2.5 left-0 pr-3 font-display text-lg leading-none text-rust-deep tabular-nums ${tone.chip}`}
                >
                  {step.step}
                </span>
                <h3 className="font-display text-[1.375rem] leading-tight">{step.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
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
