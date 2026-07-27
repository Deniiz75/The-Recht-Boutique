import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { processSteps } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ExpectationsSection } from '@/components/sections/ExpectationsSection';
import { ContactCta } from '@/components/sections/ContactCta';

const title = 'Werkwijze';
const description =
  'Van kennismaking en analyse naar strategie en uitvoering: zo werkt The Recht Boutique. ' +
  'Vier stappen, met vooraf duidelijkheid over aanpak, kosten en doorlooptijd.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/werkwijze',
});

/** Expanded toelichting per stap, gekoppeld aan `processSteps` uit site.ts. */
const details: Record<string, { detail: string; points: readonly string[] }> = {
  '01': {
    detail:
      'Het eerste gesprek is vrijblijvend en kosteloos. U vertelt wat er speelt; wij stellen vragen tot de juridische kern zichtbaar wordt. Vaak blijkt de vraag waarmee iemand binnenkomt net iets anders te liggen dan de vraag die werkelijk beantwoord moet worden.',
    points: [
      'Telefonisch, per videogesprek of op kantoor — wat u het beste uitkomt',
      'U hoort of wij u kunnen helpen, en zo niet: waar u dan wél terechtkunt',
      'Heeft u een termijn die dreigt te verlopen, meld dat direct',
    ],
  },
  '02': {
    detail:
      'Wij nemen de stukken door, zoeken uit wat er juridisch geldt en zetten uw positie op een rij: wat pleit voor u, wat tegen u, en waar zit het risico dat u nog niet had gezien. U krijgt een eerlijk oordeel, ook wanneer dat betekent dat doorzetten weinig oplevert.',
    points: [
      'Beoordeling van contracten, correspondentie en overige stukken',
      'Inschatting van kansen, risico’s en mogelijke tegenzetten',
      'Een helder beeld van wat er op het spel staat — juridisch en praktisch',
    ],
  },
  '03': {
    detail:
      'Er is bijna altijd meer dan één route. Onderhandelen, een formele ingebrekestelling, mediation of procederen — elk met een eigen tijdlijn, kostenplaatje en effect op de relatie met de wederpartij. Wij leggen de opties naast elkaar en adviseren, maar u kiest.',
    points: [
      'Voorstel met aanpak, doorlooptijd en kosteninschatting vooraf',
      'Afspraken over uurtarief of vast tarief, afhankelijk van de zaak',
      'Duidelijkheid over wat wij doen en wat u zelf oppakt',
    ],
  },
  '04': {
    detail:
      'Wij voeren uit wat is afgesproken: stukken opstellen, onderhandelen, corresponderen of uw belangen behartigen in een procedure. U hoort uit zichzelf wanneer er iets gebeurt of wanneer een volgende stap nodig is — u hoeft nooit te vragen hoe het ervoor staat.',
    points: [
      'Eén vast aanspreekpunt gedurende het hele dossier',
      'Actieve terugkoppeling bij elke relevante ontwikkeling',
      'Wijzigt de omvang van de zaak, dan hoort u dat op dat moment',
    ],
  },
};

export default function WerkwijzePage() {
  return (
    <>
      <PageHeader
        eyebrow="Werkwijze"
        title={
          <>
            Vier stappen, van eerste gesprek tot <span className="italic">afronding</span>
          </>
        }
        lead="Onze werkwijze is bewust voorspelbaar. U weet op elk moment waar uw zaak staat, wat de volgende stap is en wat die stap kost."
      >
        <ButtonLink href="/contact">Plan een kennismaking</ButtonLink>
      </PageHeader>

      <section aria-label="De vier stappen" className="bg-white">
        <Container>
          <div className="py-16 lg:py-24">
            <ol className="border-t border-rose/15">
              {processSteps.map((step) => {
                const extra = details[step.step];
                return (
                  <li
                    key={step.step}
                    className="reveal grid gap-8 border-b border-rose/12 py-14 lg:grid-cols-12 lg:gap-12"
                  >
                    <div className="lg:col-span-4">
                      <div className="flex items-baseline gap-5">
                        <span
                          aria-hidden="true"
                          className="font-display text-[3.25rem] leading-none text-rose tabular-nums"
                        >
                          {step.step}
                        </span>
                        <h2 className="font-display text-heading">{step.title}</h2>
                      </div>
                    </div>

                    <div className="lg:col-span-7 lg:col-start-6">
                      <p className="text-lead text-text-dark">{step.text}</p>
                      {extra ? (
                        <>
                          <p className="mt-5 text-[1.0625rem] leading-relaxed text-text-medium">
                            {extra.detail}
                          </p>
                          <ul className="mt-7 space-y-3 border-t border-rose/12 pt-6">
                            {extra.points.map((point) => (
                              <li
                                key={point}
                                className="relative pl-6 text-[0.9375rem] leading-relaxed text-text-dark/85"
                              >
                                <span
                                  aria-hidden="true"
                                  className="absolute top-[0.72em] left-0 h-px w-3 bg-rose"
                                />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </section>

      <ExpectationsSection />
      <ContactCta uid="werkwijze-cta" />
    </>
  );
}
