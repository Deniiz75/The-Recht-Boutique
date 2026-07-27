import { principles } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

type PrinciplesSectionProps = {
  /** Home page numbers its sections; interior pages do not. */
  index?: string;
  surface?: 'canvas' | 'cream';
};

/* Body copy switches to text-dark on cream: text-medium measures 4.54:1 there
   and only 0.04 above AA, where on white it is a comfortable 7.16:1. */
const surfaces = {
  canvas: { section: 'bg-canvas', chip: 'bg-canvas', body: 'text-text-medium' },
  cream: { section: 'bg-cream', chip: 'bg-cream', body: 'text-text-dark' },
} as const;

export function PrinciplesSection({ index, surface = 'canvas' }: PrinciplesSectionProps) {
  const tone = surfaces[surface];

  return (
    <section
      aria-labelledby="uitgangspunten-titel"
      className={`border-t border-rose/10 ${tone.section}`}
    >
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
              <li key={principle.no} className="reveal relative border-t border-rose/12 pt-9">
                <span
                  aria-hidden="true"
                  className={`absolute -top-2 left-0 pr-3 font-mono text-[0.6875rem] tracking-[0.2em] text-rose-dark tabular-nums ${tone.chip}`}
                >
                  {principle.no}
                </span>
                <h3 className="font-display text-heading">{principle.title}</h3>
                <p className={`mt-3 max-w-md text-[0.9375rem] leading-relaxed ${tone.body}`}>
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
