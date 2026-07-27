import { site, services } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Seal } from '@/components/ui/Seal';
import { ButtonLink } from '@/components/ui/ButtonLink';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Asymmetric cream field behind the arch. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[38%] bg-cream lg:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[38%] hidden h-full w-px bg-line lg:block"
      />

      <Container>
        <div className="relative grid items-center gap-14 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24 xl:py-28">
          <div className="lg:col-span-7 lg:pr-10">
            <Eyebrow className="rise" index="—">
              Juridisch adviesbureau
            </Eyebrow>

            <h1
              className="rise mt-7 font-display text-display font-medium text-balance"
              style={{ animationDelay: '90ms' }}
            >
              <span className="block">Persoonlijk</span>
              <span className="block italic">juridisch advies</span>
            </h1>

            <p
              className="rise mt-8 max-w-xl text-lead text-muted"
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

            <ul
              className="rise mt-14 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-6 sm:grid-cols-4"
              style={{ animationDelay: '340ms' }}
            >
              {services.map((service, index) => (
                <li
                  key={service.slug}
                  className="font-mono text-[0.625rem] tracking-[0.16em] text-muted uppercase"
                >
                  <span aria-hidden="true" className="mr-2 text-rust-deep tabular-nums">
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
                tone="paper"
                uid="hero"
                className="absolute -bottom-8 -left-6 shadow-[0_10px_40px_-18px_rgba(11,45,39,0.55)] sm:-bottom-10 sm:-left-10"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
