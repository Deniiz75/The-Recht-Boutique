import Link from 'next/link';
import { services } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Seal } from '@/components/ui/Seal';

/**
 * A statement of the firm's own view on contract work — quoted from the
 * practice-area copy, attributed to the firm. Deliberately not a testimonial:
 * this site carries no client quotes.
 */
const quoted = services.find((service) => service.slug === 'contractenrecht') ?? services[0];

export function PullQuote() {
  return (
    <section
      aria-labelledby="citaat-titel"
      className="on-dark relative overflow-hidden bg-ink-deep py-20 text-paper lg:py-28"
    >
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gold/40" />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[26rem] w-[22rem] -translate-x-1/2 border border-paper/10"
        style={{ borderRadius: '260px 260px 0 0' }}
      />

      <Container width="narrow">
        <div className="relative flex flex-col items-center text-center">
          <Seal size={72} tone="ink" uid="quote" className="reveal opacity-90" />
          <h2 id="citaat-titel" className="sr-only">
            Onze visie op contracten
          </h2>
          <blockquote className="reveal mt-10">
            <p className="font-display text-[clamp(1.5rem,1.1rem+1.9vw,2.5rem)] leading-[1.24] text-paper italic">
              “{quoted.intro}”
            </p>
          </blockquote>
          <p className="reveal mt-8 font-mono text-[0.625rem] tracking-[0.24em] text-gold uppercase">
            The Recht Boutique — over{' '}
            <Link href={`/diensten/${quoted.slug}`} className="link-rule-in">
              {quoted.title.toLowerCase()}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
