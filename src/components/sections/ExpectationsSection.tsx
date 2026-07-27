import { expectations } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

type ExpectationsSectionProps = {
  index?: string;
};

/**
 * Service commitments — what the firm promises to do. Explicitly not client
 * testimonials and not measurable claims about outcomes.
 */
export function ExpectationsSection({ index }: ExpectationsSectionProps) {
  return (
    <section aria-labelledby="verwachten-titel" className="border-t border-rose/12 bg-white">
      <Container>
        <div className="py-20 lg:py-28">
          <SectionHeading
            eyebrow="Wat u kunt verwachten"
            index={index}
            title={
              <span id="verwachten-titel">
                Toezeggingen die wij <span className="italic">waar kunnen maken</span>
              </span>
            }
            intro="Geen beloftes over de afloop van uw zaak — die hangt van meer af dan van ons. Wel deze vier afspraken over de manier waarop wij met u werken."
          />

          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((item, itemIndex) => (
              <li
                key={item.title}
                className="reveal flex h-full flex-col border border-rose/25 bg-cream px-6 pt-9 pb-8"
                style={{ borderRadius: '96px 96px 0 0' }}
              >
                <span
                  aria-hidden="true"
                  className="mx-auto font-mono text-[0.625rem] tracking-[0.24em] text-rose-dark tabular-nums"
                >
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <span
                  aria-hidden="true"
                  className="mx-auto mt-4 block h-px w-8 bg-rose/40"
                />
                <h3 className="mt-6 text-center font-display text-[1.25rem] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-center text-[0.9375rem] leading-relaxed text-text-dark">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
