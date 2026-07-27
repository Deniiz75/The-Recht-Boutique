import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { ArchFrame } from '@/components/ui/ArchFrame';
import { Seal } from '@/components/ui/Seal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PrinciplesSection } from '@/components/sections/PrinciplesSection';
import { ExpectationsSection } from '@/components/sections/ExpectationsSection';
import { ContactCta } from '@/components/sections/ContactCta';

const title = 'Over ons';
const description =
  'The Recht Boutique is een juridisch adviesbureau op menselijke maat: één vast aanspreekpunt, ' +
  'heldere taal en vooraf duidelijkheid over aanpak, kosten en doorlooptijd.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/over-ons',
});

/** Deliberate choices about how the practice is run. */
const choices = [
  {
    title: 'Geen dossier dat rondgaat',
    text: 'Uw zaak wordt niet doorgegeven aan wie er die week tijd voor heeft. De jurist die uw situatie kent, blijft uw aanspreekpunt tot de afronding.',
  },
  {
    title: 'Geen advies zonder context',
    text: 'Een juridisch antwoord dat niet past bij uw bedrijf, uw relatie met de wederpartij of uw tijdlijn is geen bruikbaar antwoord. Wij vragen eerst door.',
  },
  {
    title: 'Geen open einde in de kosten',
    text: 'U weet vooraf welke aanpak wij voorstellen en wat die kost. Verandert de zaak van omvang, dan hoort u dat op het moment dat het gebeurt.',
  },
] as const;

export default function OverOnsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Over ons"
        title={
          <>
            Juridisch werk met <span className="italic">aandacht</span> voor de mens
            erachter
          </>
        }
        lead="Wij zijn een klein juridisch adviesbureau. Dat is geen tussenfase op weg naar iets groters, maar de vorm die past bij het werk dat wij willen leveren."
      />

      <section aria-labelledby="aanpak-titel" className="bg-canvas">
        <Container>
          <div className="grid gap-14 border-b border-rose/12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
            <div className="lg:col-span-5">
              <div className="reveal relative mx-auto max-w-xs lg:max-w-none">
                <ArchFrame ratio="3 / 4" caption="Advies · Contracten · Geschillen" />
                <Seal
                  size={96}
                  tone="white"
                  uid="over-ons"
                  className="absolute -bottom-8 -left-6 shadow-[0_10px_40px_-18px_rgba(45,42,38,0.45)]"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Eyebrow index="01" className="reveal">
                Onze aanpak
              </Eyebrow>
              <h2 id="aanpak-titel" className="reveal mt-6 font-display text-title">
                Eerst begrijpen, <span className="italic">dan</span> adviseren
              </h2>
              <div className="reveal mt-7 space-y-5 text-[1.0625rem] leading-relaxed text-text-medium">
                <p>
                  De meeste juridische vragen komen niet alleen. Achter een contract dat
                  moet worden beoordeeld zit een samenwerking die u wilt behouden; achter
                  een conflict met een leverancier zit een leveringsketen die door moet
                  draaien. Wie alleen naar het juridische stuk kijkt, geeft snel een
                  antwoord dat formeel klopt en praktisch niets oplost.
                </p>
                <p>
                  Daarom begint elk dossier bij ons met luisteren. Wat speelt er, wat is er
                  al gewisseld, wat wilt u bereiken en wat wilt u vooral voorkomen? Pas als
                  dat scherp is, kijken wij naar de juridische positie — en vertellen wij u
                  eerlijk hoe sterk die is, ook wanneer dat niet het antwoord is waarop u
                  hoopte.
                </p>
                <p>
                  Vervolgens kiezen wij het lichtste middel dat werkt. Soms is dat een
                  gesprek of een goed geformuleerde brief, soms een strak onderhandelde
                  overeenkomst, en soms een procedure. Die keuze maken wij samen met u, met
                  de gevolgen en de kosten van elke route helder op tafel.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="keuzes-titel" className="border-t border-rose/10 bg-canvas">
        <Container>
          <div className="py-20 lg:py-28">
            <div className="reveal max-w-2xl">
              <Eyebrow index="02">Bewuste keuzes</Eyebrow>
              <h2 id="keuzes-titel" className="mt-6 font-display text-title">
                Wat wij <span className="italic">niet</span> doen
              </h2>
              <p className="mt-5 text-lead text-text-medium">
                Een boutique-aanpak betekent ook nee zeggen. Deze drie dingen laten wij
                bewust achterwege.
              </p>
            </div>

            <ul className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-3">
              {choices.map((choice, index) => (
                <li key={choice.title} className="reveal relative border-t border-rose/15 pt-9">
                  <span
                    aria-hidden="true"
                    className="absolute -top-2 left-0 bg-canvas pr-3 font-mono text-[0.6875rem] tracking-[0.2em] text-rose tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-heading">{choice.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-medium">
                    {choice.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <PrinciplesSection index="03" surface="canvas" />
      <ExpectationsSection index="04" />
      <ContactCta index="05" uid="over-ons-cta" />
    </>
  );
}
