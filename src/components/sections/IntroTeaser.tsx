import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

export function IntroTeaser() {
  return (
    <section aria-labelledby="intro-titel" className="bg-white">
      <Container>
        <div className="grid gap-10 border-b border-rose/12 py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
          <div className="reveal lg:col-span-4">
            <Eyebrow index="01">Over ons</Eyebrow>
            <h2 id="intro-titel" className="mt-6 font-display text-title">
              Een kantoor op <span className="italic">menselijke</span> maat
            </h2>
          </div>

          <div className="reveal lg:col-span-7 lg:col-start-6">
            <p className="text-lead text-text-dark first-letter:float-left first-letter:mt-1 first-letter:mr-3 first-letter:font-display first-letter:text-[4.25rem] first-letter:leading-[0.74] first-letter:text-rose-dark">
              Juridisch advies werkt pas wanneer u begrijpt wat er staat, wat het voor u
              betekent en welke keuze u daarna heeft. Daarom nemen wij de tijd voor het
              gesprek dat aan het advies voorafgaat — over wat er speelt, wat u wilt
              bereiken en wat u wilt voorkomen.
            </p>

            <div className="mt-8 grid gap-6 text-[0.9375rem] leading-relaxed text-text-medium sm:grid-cols-2">
              <p>
                Wij werken bewust met een beperkt aantal dossiers tegelijk. Dat maakt het
                mogelijk om uw zaak in zijn geheel te overzien in plaats van in losse
                onderdelen, en om te schakelen wanneer het nodig is.
              </p>
              <p>
                U spreekt steeds de jurist die uw dossier kent. Geen doorverwijzingen, geen
                samenvattingen uit tweede hand — één lijn, van het eerste gesprek tot de
                afronding.
              </p>
            </div>

            <Link
              href="/over-ons"
              className="group mt-10 inline-flex min-h-11 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.2em] text-text-dark uppercase"
            >
              <span className="link-rule-in">Onze aanpak</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-rose transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
