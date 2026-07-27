import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { contact, legal, site } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { DataValue } from '@/components/ui/DataValue';
import { realAddress, realEmail, realPhone } from '@/lib/placeholder';

const title = 'Privacyverklaring';
const description =
  'Hoe The Recht Boutique persoonsgegevens verwerkt: welke gegevens wij ontvangen via het ' +
  'contactformulier, met welk doel en op welke grondslag, hoe lang wij ze bewaren en welke rechten u heeft.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/privacyverklaring',
});

const updated = new Intl.DateTimeFormat('nl-NL', { dateStyle: 'long' }).format(
  new Date(legal.privacyUpdated),
);

export default function PrivacyPage() {
  const phone = realPhone();
  const email = realEmail();
  const address = realAddress();

  return (
    <>
      <PageHeader
        eyebrow="Privacyverklaring"
        title={
          <>
            Hoe wij omgaan met uw <span className="italic">gegevens</span>
          </>
        }
        lead="Deze verklaring beschrijft welke persoonsgegevens The Recht Boutique verwerkt, waarom wij dat doen en welke rechten u daarbij heeft."
      >
        <p className="font-mono text-[0.625rem] tracking-[0.2em] text-muted uppercase">
          Laatst bijgewerkt: {updated}
        </p>
      </PageHeader>

      <section aria-label="Privacyverklaring" className="bg-paper">
        <Container width="narrow">
          <article className="prose-legal py-16 lg:py-24">
            <h2 id="verwerkingsverantwoordelijke" className="!mt-0">
              1. Wie verwerkt uw gegevens?
            </h2>
            <p>
              De verwerkingsverantwoordelijke voor de gegevens die via deze website worden
              verzameld is {site.name}, een juridisch adviesbureau gevestigd in Nederland.
              U bereikt ons via:
            </p>
            <ul>
              <li>
                E-mail:{' '}
                {email ? (
                  <a href={`mailto:${email}`}>{email}</a>
                ) : (
                  <DataValue value={contact.email} />
                )}
              </li>
              <li>
                Telefoon:{' '}
                {phone ? (
                  <a href={phone.href}>{phone.display}</a>
                ) : (
                  <DataValue value={contact.phoneDisplay} />
                )}
              </li>
              <li>
                Adres:{' '}
                {address ? (
                  <>
                    {address.street}, {address.postalCode} {address.city},{' '}
                    {address.country}
                  </>
                ) : (
                  <>
                    <DataValue value={contact.address.street} />,{' '}
                    <DataValue value={contact.address.postalCode} />{' '}
                    <DataValue value={contact.address.city} />, {contact.address.country}
                  </>
                )}
              </li>
              <li>
                KvK-nummer: <DataValue value={legal.kvk} />
              </li>
              <li>
                BTW-identificatienummer: <DataValue value={legal.btw} />
              </li>
            </ul>

            <h2 id="welke-gegevens">2. Welke gegevens verwerken wij?</h2>
            <h3>Gegevens die u zelf verstrekt</h3>
            <p>
              Wanneer u het contactformulier op deze website invult, verwerken wij de
              gegevens die u daarin opgeeft:
            </p>
            <ul>
              <li>uw naam;</li>
              <li>uw e-mailadres;</li>
              <li>uw telefoonnummer, als u dat invult (optioneel);</li>
              <li>het gekozen onderwerp of praktijkgebied (optioneel);</li>
              <li>de inhoud van uw bericht.</li>
            </ul>
            <p>
              Wat u in uw bericht schrijft, bepaalt u zelf. Wij vragen u geen bijzondere
              persoonsgegevens (zoals gegevens over gezondheid of strafrechtelijke
              gegevens) via het formulier te delen; die bespreken wij liever telefonisch of
              in persoon. Verstrekt u ze toch, dan verwerken wij ze uitsluitend om uw vraag
              te kunnen beantwoorden.
            </p>

            <h3>Technische gegevens</h3>
            <p>
              Om misbruik van het contactformulier tegen te gaan, houdt onze server
              tijdelijk bij hoeveel berichten vanaf een IP-adres worden verstuurd. Dit
              gebeurt in het werkgeheugen van de server en verdwijnt uiterlijk na tien
              minuten of bij een herstart. Daarnaast legt onze hostingpartij standaard
              technische logbestanden aan, waaronder IP-adressen en tijdstippen van
              bezoeken.
            </p>
            <p>
              Deze website gebruikt geen tracking-cookies, geen advertentiepixels en geen
              analytische scripts van derden.
            </p>

            <h2 id="doelen-en-grondslagen">3. Doeleinden en grondslagen</h2>
            <p>
              Wij verwerken uw gegevens alleen voor de hieronder genoemde doelen, met de
              daarbij vermelde grondslag uit artikel 6 van de Algemene verordening
              gegevensbescherming (AVG):
            </p>
            <ul>
              <li>
                <strong>Beantwoorden van uw bericht en beoordelen of wij u kunnen
                helpen.</strong>{' '}
                Grondslag: uitvoering van een overeenkomst dan wel het op uw verzoek nemen
                van precontractuele maatregelen (artikel 6 lid 1 sub b AVG).
              </li>
              <li>
                <strong>Uitvoeren van een opdracht wanneer u cliënt wordt.</strong>{' '}
                Grondslag: uitvoering van de overeenkomst van opdracht (artikel 6 lid 1 sub
                b AVG).
              </li>
              <li>
                <strong>Beveiliging van de website en het voorkomen van misbruik van het
                formulier.</strong>{' '}
                Grondslag: ons gerechtvaardigd belang bij een werkende en veilige
                dienstverlening (artikel 6 lid 1 sub f AVG).
              </li>
              <li>
                <strong>Voeren van onze administratie en facturatie.</strong> Grondslag:
                het voldoen aan een wettelijke verplichting, waaronder de fiscale
                bewaarplicht (artikel 6 lid 1 sub c AVG).
              </li>
            </ul>
            <p>
              Wij gebruiken uw gegevens niet voor geautomatiseerde besluitvorming of
              profilering, en versturen geen commerciële nieuwsbrieven op basis van uw
              contactverzoek.
            </p>

            <h2 id="bewaartermijnen">4. Hoe lang bewaren wij uw gegevens?</h2>
            <p>
              Wij bewaren uw gegevens niet langer dan nodig is voor de doelen waarvoor ze
              zijn verzameld:
            </p>
            <ul>
              <li>
                <strong>Contactverzoeken die niet tot een opdracht leiden:</strong>{' '}
                maximaal twaalf maanden na het laatste contact, zodat wij de kwestie kunnen
                terugvinden als u er later op terugkomt.
              </li>
              <li>
                <strong>Dossiers van cliënten:</strong> gedurende de looptijd van de
                opdracht en daarna zolang dat noodzakelijk is, in beginsel zeven jaar na
                afronding, aansluitend op de wettelijke bewaartermijnen voor onze
                administratie.
              </li>
              <li>
                <strong>Technische logbestanden van de hosting:</strong> een beperkte
                periode, conform de standaardinstellingen van onze hostingpartij.
              </li>
              <li>
                <strong>Gegevens voor het tegengaan van formuliermisbruik:</strong>{' '}
                uiterlijk tien minuten.
              </li>
            </ul>

            <h2 id="derden">5. Wie ontvangen uw gegevens?</h2>
            <p>
              Alles wat u ons vertelt is vertrouwelijk. Wij verkopen uw gegevens niet en
              delen ze niet met derden voor commerciële doeleinden. Voor het technisch
              functioneren van deze website schakelen wij de volgende dienstverleners in,
              die uitsluitend in onze opdracht handelen (verwerkers):
            </p>
            <ul>
              <li>
                <strong>Onze e-mailbezorgdienst.</strong> Berichten uit het contactformulier
                worden via een externe bezorgdienst voor transactionele e-mail (Resend) naar
                onze mailbox gestuurd. Deze partij verwerkt daarbij de gegevens die u in het
                formulier invult.
              </li>
              <li>
                <strong>Onze hostingpartij.</strong> Deze website draait op de infrastructuur
                van Vercel, die de website uitlevert en daarbij technische logbestanden
                aanmaakt.
              </li>
            </ul>
            <p>
              Met deze partijen zijn verwerkersovereenkomsten gesloten. Voor zover daarbij
              persoonsgegevens buiten de Europese Economische Ruimte worden verwerkt,
              gebeurt dat op basis van passende waarborgen, zoals de standaardcontractbepalingen
              van de Europese Commissie.
            </p>
            <p>
              Daarnaast kunnen wij gegevens delen wanneer dat noodzakelijk is voor de
              behandeling van uw zaak — bijvoorbeeld met een wederpartij, een deskundige of
              de rechtbank — maar uitsluitend in overleg met u. Ook kan een wettelijke
              verplichting ons dwingen gegevens te verstrekken.
            </p>

            <h2 id="beveiliging">6. Beveiliging</h2>
            <p>
              Deze website wordt uitsluitend via een versleutelde verbinding (HTTPS)
              aangeboden en het contactformulier verstuurt uw gegevens over diezelfde
              versleutelde verbinding. Toegang tot onze mailbox en dossiers is beperkt tot
              de personen die daar voor hun werk bij moeten kunnen. Merkt u toch een
              kwetsbaarheid op, laat het ons dan weten.
            </p>

            <h2 id="uw-rechten">7. Uw rechten</h2>
            <p>
              U heeft op grond van de AVG de volgende rechten met betrekking tot uw
              persoonsgegevens:
            </p>
            <ul>
              <li>
                <strong>Inzage.</strong> U mag opvragen welke gegevens wij van u verwerken.
              </li>
              <li>
                <strong>Rectificatie.</strong> Kloppen gegevens niet, dan corrigeren of
                vullen wij ze aan.
              </li>
              <li>
                <strong>Verwijdering.</strong> U kunt vragen uw gegevens te wissen, voor
                zover wij ze niet nodig hebben voor een lopende opdracht of moeten bewaren
                op grond van de wet.
              </li>
              <li>
                <strong>Beperking van de verwerking.</strong> U kunt vragen de verwerking
                tijdelijk stil te leggen, bijvoorbeeld zolang de juistheid van gegevens ter
                discussie staat.
              </li>
              <li>
                <strong>Bezwaar.</strong> U kunt bezwaar maken tegen verwerkingen die
                gebaseerd zijn op ons gerechtvaardigd belang.
              </li>
              <li>
                <strong>Dataportabiliteit.</strong> U kunt de gegevens die u zelf aan ons
                heeft verstrekt in een gangbaar digitaal formaat ontvangen of laten
                overdragen.
              </li>
              <li>
                <strong>Intrekken van toestemming.</strong> Heeft u ergens toestemming voor
                gegeven, dan kunt u die op elk moment intrekken. Dat raakt niet de
                rechtmatigheid van de verwerking daarvóór.
              </li>
            </ul>
            <p>
              Een verzoek kunt u indienen via{' '}
              {email ? (
                <a href={`mailto:${email}`}>{email}</a>
              ) : (
                <DataValue value={contact.email} />
              )}
              . Wij reageren binnen één maand. Om te voorkomen dat wij gegevens aan de
              verkeerde persoon verstrekken, kunnen wij u vragen uw identiteit aan te tonen.
            </p>

            <h2 id="klacht">8. Klacht indienen</h2>
            <p>
              Bent u van mening dat wij niet zorgvuldig met uw gegevens omgaan, dan horen
              wij dat graag eerst zelf — vaak is het snel opgelost. U heeft daarnaast altijd
              het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens, de
              Nederlandse toezichthouder, via{' '}
              <a
                href="https://www.autoriteitpersoonsgegevens.nl"
                rel="noopener noreferrer"
                target="_blank"
              >
                autoriteitpersoonsgegevens.nl
              </a>
              .
            </p>

            <h2 id="wijzigingen">9. Wijzigingen in deze verklaring</h2>
            <p>
              Wij passen deze privacyverklaring aan wanneer onze dienstverlening of de
              regelgeving daartoe aanleiding geeft. De actuele versie staat altijd op deze
              pagina, met de datum van de laatste wijziging bovenaan. Deze versie is van{' '}
              {updated}.
            </p>
            <p>
              Heeft u na het lezen nog vragen, neem dan gerust{' '}
              <Link href="/contact">contact</Link> met ons op.
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}
