import { Check } from 'lucide-react';
import { site, services, trustPoints } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Seal } from '@/components/ui/Seal';
import { ButtonLink } from '@/components/ui/ButtonLink';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-gold/40">
      {/* Asymmetric cream field behind the arch. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[38%] bg-surface lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[38%] hidden h-full w-px bg-gold/70 lg:block"
      />

      <Container>
        <div className="relative grid items-center gap-14 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:py-28">
          <div className="lg:col-span-7 lg:pr-10">
            <Eyebrow className="rise" index="—">
              Juridisch adviesbureau
            </Eyebrow>

            {/* Trust indicator. Sits between the eyebrow and the H1 and is
                deliberately quieter than both: 11px, ink-soft (7.93:1 on
                canvas). Every point here is one the site makes good on
                elsewhere — see the note on trustPoints in site.ts.

                Set in the body sans at 0.08em. At the previous mono/0.14em the
                gaps inside a word were wide enough that "WERKDAG" read as two
                words; the content was never wrong. */}
            <ul
              className="rise mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-[0.6875rem] font-medium tracking-[0.08em] text-ink-soft uppercase"
              style={{ animationDelay: '45ms' }}
            >
              {trustPoints.map((point, index) => (
                <li key={point} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="-ml-2 hidden text-accent sm:inline">
                      ·
                    </span>
                  ) : null}
                  <Check aria-hidden="true" className="h-3 w-3 shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>

            <h1
              className="rise mt-6 font-display text-display font-medium text-balance"
              style={{ animationDelay: '90ms' }}
            >
              <span className="block">Persoonlijk</span>
              <span className="block italic">juridisch advies</span>
            </h1>

            <p
              className="rise mt-8 max-w-xl text-lead text-ink-soft"
              style={{ animationDelay: '180ms' }}
            >
              {site.description}
            </p>

            <div
              className="rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ animationDelay: '260ms' }}
            >
              <ButtonLink href="/contact">Kennismaking aanvragen</ButtonLink>
              <ButtonLink href="/diensten" variant="outline">
                Praktijkgebieden
              </ButtonLink>
            </div>

            {/* Index of practice areas. The number sits above the label rather
                than beside it: `Ondernemingsrecht` is a single unbreakable word
                that already needs 142px, and a quarter of this column is 135px
                at 1280 — inline, the number of the next item was overlapping it.
                Stacked, the label owns the full column width. */}
            <ul
              className="rise mt-14 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-gold/40 pt-6 sm:grid-cols-4"
              style={{ animationDelay: '340ms' }}
            >
              {services.map((service, index) => (
                <li
                  key={service.slug}
                  className="font-sans text-[0.625rem] font-medium tracking-[0.06em] text-ink-soft uppercase"
                >
                  <span
                    aria-hidden="true"
                    className="mb-1.5 block text-accent tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5">
            <div
              className="rise relative mx-auto max-w-sm lg:max-w-none"
              style={{ animationDelay: '160ms' }}
            >
              <ArchFrame caption="Ondernemers &amp; particulieren" ratio="4 / 5" />
              <Seal
                size={112}
                tone="white"
                uid="hero"
                className="absolute -bottom-8 -left-6 shadow-[0_10px_40px_-18px_rgba(22,35,59,0.45)] sm:-bottom-10 sm:-left-10"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
