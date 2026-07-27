import Link from 'next/link';
import { nav } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ArchFrame } from '@/components/ui/ArchFrame';

export default function NotFound() {
  return (
    <section className="bg-canvas">
      <Container>
        <div className="grid items-center gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-7">
            <Eyebrow index="404">Pagina niet gevonden</Eyebrow>
            <h1 className="mt-6 font-display text-title">
              Deze pagina konden wij <span className="italic">niet</span> vinden
            </h1>
            <p className="mt-6 max-w-xl text-lead text-ink-soft">
              Mogelijk is de link verouderd of is er een typefout in het adres geslopen.
              Via onderstaande pagina&apos;s komt u alsnog waar u wezen moet.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/">Terug naar home</ButtonLink>
              <ButtonLink href="/contact" variant="outline">
                Contact opnemen
              </ButtonLink>
            </div>

            <ul className="mt-14 grid gap-x-8 border-t border-gold/40 pt-6 sm:grid-cols-2">
              {nav.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.18em] text-ink uppercase"
                  >
                    <span aria-hidden="true" className="text-accent tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="link-rule-in">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="mx-auto max-w-[16rem]">
              <ArchFrame ratio="3 / 4" caption="Foutcode 404">
                <span className="font-display text-[4.5rem] leading-none text-surface">
                  404
                </span>
              </ArchFrame>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
