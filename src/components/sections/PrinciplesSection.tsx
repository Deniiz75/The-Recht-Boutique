import { principles } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

type PrinciplesSectionProps = {
  /** Home page numbers its sections; interior pages do not. */
  index?: string;
  surface?: 'paper' | 'cream';
};

const surfaces = {
  paper: { section: 'bg-paper', chip: 'bg-paper' },
  cream: { section: 'bg-cream', chip: 'bg-cream' },
} as const;

export function PrinciplesSection({ index, surface = 'paper' }: PrinciplesSectionProps) {
  const tone = surfaces[surface];

  return (
    <section aria-labelledby="uitgangspunten-titel" className={tone.section}>
      <Container>
        <div className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Uitgangspunten"
            index={index}
            title={
              <span id="uitgangspunten-titel">
                Hoe wij <span className="italic">werken</span>
              </span>
            }
          />

          <ul className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
            {principles.map((principle) => (
              <li key={principle.no} className="reveal relative border-t border-line pt-9">
                <span
                  aria-hidden="true"
                  className={`absolute -top-2 left-0 pr-3 font-mono text-[0.6875rem] tracking-[0.2em] text-rust-deep tabular-nums ${tone.chip}`}
                >
                  {principle.no}
                </span>
                <h3 className="font-display text-heading">{principle.title}</h3>
                <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
                  {principle.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
