/**
 * Single source of truth for all site content.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  TODO VOOR LIVEGANG — vul onderstaande `contact` en `legal` velden in.
 *      Alles met de waarde die begint met "TODO:" is een placeholder en moet
 *      vervangen worden vóór de site publiek gaat. Zoek op "TODO:" in dit
 *      bestand — dit is de enige plek waar het staat.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Bewust WEGGELATEN (en niet terugzetten zonder aantoonbare onderbouwing):
 *   • Cliëntreviews/testimonials — mogen niet verzonnen worden.
 *   • Statistieken ("15+ jaar", "500+ cliënten", "98% beveelt aan").
 *   • Registratieclaims ("geregistreerd juridisch adviseur").
 *   • De term "advocaat" — beschermde titel in Nederland (art. 435 Sr).
 *     Gebruik uitsluitend "juridisch adviseur" tenzij inschrijving bij de
 *     Nederlandse Orde van Advocaten is bevestigd.
 */

/**
 * Canonieke basis-URL. Bepaalt metadataBase, alle canonicals, og:url,
 * sitemap.xml, robots.txt en de @id's in de JSON-LD. Een verkeerde waarde
 * hier zet foute canonicals op élke pagina, dus hardcoden we hem niet.
 *
 * Volgorde:
 *  1. NEXT_PUBLIC_SITE_URL — zet deze zodra het eigen domein live is.
 *     Dit is de enige juiste waarde voor productie op een eigen domein.
 *  2. VERCEL_PROJECT_PRODUCTION_URL — door Vercel geïnjecteerd. Wijst altijd
 *     naar het productiedomein van het project (dus niet naar de wisselende
 *     preview-URL), waardoor previews niet hun eigen canonical claimen.
 *  3. localhost — lokale ontwikkeling.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, '')}`;

  return 'http://localhost:3000';
}

export const site = {
  name: 'The Recht Boutique',
  /** Gebruikt in <title> en OG-tags. */
  tagline: 'Persoonlijk juridisch advies',
  description:
    'The Recht Boutique biedt persoonlijk juridisch advies aan ondernemers en particulieren. ' +
    'Ondernemingsrecht, contractenrecht, privaatrecht en geschillen — helder uitgelegd, strategisch waar het telt.',
  /** Zie resolveSiteUrl(). Nooit hardcoden — zet NEXT_PUBLIC_SITE_URL. */
  url: resolveSiteUrl(),
  locale: 'nl_NL',
  lang: 'nl',
} as const;

export const contact = {
  /** TODO: echt telefoonnummer. Formaat voor weergave. */
  phoneDisplay: 'TODO: +31 (0)00 000 0000',
  /** TODO: echt telefoonnummer in E.164 voor de tel: link. */
  phoneHref: 'tel:+310000000000',
  /** TODO: echt e-mailadres. */
  email: 'TODO: info@therechtboutique.nl',
  /** TODO: echt vestigingsadres. */
  address: {
    street: 'TODO: straat en huisnummer',
    postalCode: 'TODO: 0000 AA',
    city: 'TODO: plaats',
    country: 'Nederland',
  },
  /** Openingstijden — pas aan indien afwijkend. */
  hours: 'Maandag t/m vrijdag, 09:00 – 17:30',
} as const;

export const legal = {
  /** TODO: KvK-nummer (verplicht te vermelden op zakelijke NL-websites). */
  kvk: 'TODO: 00000000',
  /** TODO: BTW-identificatienummer. */
  btw: 'TODO: NL000000000B00',
  /** Datum laatste update privacyverklaring. */
  privacyUpdated: '2026-07-27',
} as const;

/** Praktijkgebieden. `slug` bepaalt de URL: /diensten/[slug] */
export const services = [
  {
    slug: 'ondernemingsrecht',
    title: 'Ondernemingsrecht',
    audience: 'Voor ondernemers',
    summary:
      'Van oprichting en aandeelhoudersafspraken tot groei, overname en herstructurering.',
    intro:
      'Elke beslissing over de structuur van uw onderneming werkt jaren door. Wij helpen u die keuzes vooraf goed te maken, zodat u later niet hoeft te repareren wat vermijdbaar was.',
    topics: [
      'Oprichting, rechtsvormkeuze en statuten',
      'Aandeelhoudersovereenkomsten en governance',
      'Bestuurdersaansprakelijkheid en interne verhoudingen',
      'Overname, fusie en bedrijfsopvolging',
      'Herstructurering en ontvlechting',
    ],
    /** Concrete vragen waar cliënten mee komen — gebruikt op de detailpagina. */
    questions: [
      'Welke rechtsvorm past bij mijn plannen op vijf jaar?',
      'Wat spreken mijn medeaandeelhouder en ik af als één van ons wil uitstappen?',
      'Loop ik als bestuurder persoonlijk risico?',
    ],
  },
  {
    slug: 'contractenrecht',
    title: 'Contractenrecht',
    audience: 'Zakelijk & particulier',
    summary:
      'Heldere overeenkomsten die uw afspraken vastleggen en uw belangen beschermen.',
    intro:
      'Een goed contract is niet het contract met de meeste artikelen, maar het contract dat doet wat u ervan verwacht op het moment dat het misgaat. Daar schrijven wij naartoe.',
    topics: [
      'Opstellen en beoordelen van overeenkomsten',
      'Algemene voorwaarden en werking daarvan',
      'Samenwerkings- en distributieovereenkomsten',
      'Inkoop- en leveringsvoorwaarden',
      'Beëindiging, ontbinding en nakoming',
    ],
    questions: [
      'Klopt dit contract dat mij is voorgelegd, en wat teken ik precies?',
      'Zijn mijn algemene voorwaarden wel rechtsgeldig van toepassing?',
      'Kan ik onder deze overeenkomst uit, en wat kost mij dat?',
    ],
  },
  {
    slug: 'privaatrecht',
    title: 'Privaatrecht',
    audience: 'Voor particulieren',
    summary:
      'Strategisch advies bij aansprakelijkheid, vastgoed en andere complexe kwesties.',
    intro:
      'Juridische kwesties in de privésfeer raken vaak meer dan alleen uw portemonnee. Wij nemen de tijd om uw situatie te begrijpen voordat we over stappen praten.',
    topics: [
      'Aansprakelijkheid en schadevergoeding',
      'Vastgoed, koop en huur',
      'Burenrecht en eigendomskwesties',
      'Consumentenrecht',
      'Verbintenissen tussen particulieren',
    ],
    questions: [
      'Ben ik aansprakelijk voor deze schade, of juist niet?',
      'De verkoper verzweeg een gebrek — wat kan ik nu nog?',
      'Hoe sterk sta ik als ik dit doorzet?',
    ],
  },
  {
    slug: 'geschillen-en-procedures',
    title: 'Geschillen & procedures',
    audience: 'Voor iedere cliënt',
    summary:
      'Doelgerichte begeleiding bij onderhandeling, mediation en procesvoering.',
    intro:
      'Niet elk geschil hoort bij de rechter. Wij beginnen met de vraag wat u werkelijk wilt bereiken, en kiezen daarna pas het middel — soms is dat een brief, soms een procedure.',
    topics: [
      'Beoordeling van uw juridische positie',
      'Onderhandeling en schikking',
      'Mediation en alternatieve geschilbeslechting',
      'Procesvoering en begeleiding bij de rechter',
      'Incasso en nakoming van vonnissen',
    ],
    questions: [
      'Heeft procederen in mijn geval kans van slagen?',
      'Wat kost een procedure en hoe lang duurt het?',
      'Kan ik dit oplossen zonder de rechtbank?',
    ],
  },
] as const;

/**
 * Werkwijze — vier stappen.
 *
 * Heet bewust `processSteps` en niet `process`: een module-scope `export const
 * process` overschaduwt binnen dit bestand de globale Node `process`, waardoor
 * `process.env` stilzwijgend naar deze array verwijst in plaats van naar de
 * omgevingsvariabelen. Niet hernoemen naar `process`.
 */
export const processSteps = [
  {
    step: '01',
    title: 'Kennismaken',
    text: 'Een vrijblijvend gesprek waarin u uw situatie schetst en wij verhelderen wat uw vraag juridisch precies is.',
  },
  {
    step: '02',
    title: 'Analyse',
    text: 'Wij brengen uw positie, kansen en risico’s in kaart en vertellen u eerlijk hoe sterk u staat.',
  },
  {
    step: '03',
    title: 'Strategie',
    text: 'Samen kiezen we een aanpak die past bij uw doel, uw tijdlijn en wat u bereid bent te investeren.',
  },
  {
    step: '04',
    title: 'Uitvoering',
    text: 'Wij voeren uit en houden u actief op de hoogte — u hoeft nooit te vragen hoe het ervoor staat.',
  },
] as const;

/** Waarom-secties. Beloften over werkwijze, geen meetbare claims. */
export const principles = [
  {
    no: '01',
    title: 'Directe lijnen',
    text: 'U heeft één vast aanspreekpunt en spreekt altijd met de jurist die uw dossier kent.',
  },
  {
    no: '02',
    title: 'Praktisch inzicht',
    text: 'Juridisch scherp, met oog voor de commerciële en persoonlijke werkelijkheid erachter.',
  },
  {
    no: '03',
    title: 'Vooraf duidelijkheid over kosten',
    text: 'U krijgt voor aanvang een heldere inschatting van aanpak, kosten en doorlooptijd.',
  },
  {
    no: '04',
    title: 'Persoonlijke aandacht',
    text: 'Een boutique-aanpak: minder dossiers, meer ruimte voor uw verhaal en uw belang.',
  },
] as const;

/**
 * "Wat u kunt verwachten" — vervangt de verwijderde reviewsectie.
 * Dit zijn toezeggingen over dienstverlening, geen claims over resultaat.
 */
export const expectations = [
  {
    title: 'Reactie binnen één werkdag',
    text: 'U hoort van ons wanneer u iets kunt verwachten — ook als het antwoord tijd nodig heeft.',
  },
  {
    title: 'Een eerlijk oordeel',
    text: 'Als uw zaak zwak staat of een procedure niet loont, horen we u dat liever aan het begin zeggen dan aan het eind.',
  },
  {
    title: 'Taal die u begrijpt',
    text: 'Wij leggen uit wat er staat en wat het voor u betekent, zonder onnodig jargon.',
  },
  {
    title: 'U houdt de regie',
    text: 'Wij adviseren en voeren uit; de beslissingen over uw zaak blijven bij u.',
  },
] as const;

/** FAQ — vervangt de verwijderde statistiekensectie en is goed voor SEO. */
export const faq = [
  {
    q: 'Wat kost een eerste gesprek?',
    a: 'Het kennismakingsgesprek is vrijblijvend en kosteloos. We bespreken uw situatie en u hoort of en hoe wij u kunnen helpen. Pas daarna maken we afspraken over kosten.',
  },
  {
    q: 'Hoe worden de kosten berekend?',
    a: 'Voordat wij aan het werk gaan, ontvangt u een heldere inschatting van de aanpak en de kosten. Afhankelijk van de zaak werken we op uurbasis of tegen een vast tarief. U wordt niet verrast door de factuur.',
  },
  {
    q: 'Is The Recht Boutique een advocatenkantoor?',
    a: 'The Recht Boutique is een juridisch adviesbureau. Wij adviseren, stellen overeenkomsten op en begeleiden u bij onderhandeling en geschillen. Voor procedures waarvoor verplichte procesvertegenwoordiging door een advocaat geldt, werken wij samen met een advocaat en blijven wij betrokken bij uw dossier.',
  },
  {
    q: 'Hoe snel kunt u aan de slag?',
    a: 'Wij reageren binnen één werkdag op uw bericht. Bij spoed — een termijn die dreigt te verlopen of een dagvaarding — laat u dat weten in uw bericht, dan pakken we het met voorrang op.',
  },
  {
    q: 'Werkt u ook buiten uw regio?',
    a: 'Ja. Veel van ons werk gebeurt op afstand: per e-mail, telefoon en videogesprek. Waar persoonlijk contact meerwaarde heeft, plannen wij een afspraak op kantoor of bij u op locatie.',
  },
  {
    q: 'Wat gebeurt er met mijn gegevens?',
    a: 'Alles wat u ons vertelt is vertrouwelijk. Uw gegevens worden uitsluitend gebruikt om uw vraag te behandelen en niet gedeeld met derden zonder uw toestemming. Zie onze privacyverklaring voor de volledige toelichting.',
  },
] as const;

/** Hoofdnavigatie. */
export const nav = [
  { href: '/over-ons', label: 'Over ons' },
  { href: '/diensten', label: 'Diensten' },
  { href: '/werkwijze', label: 'Werkwijze' },
  { href: '/veelgestelde-vragen', label: 'Veelgestelde vragen' },
] as const;

export type Service = (typeof services)[number];
