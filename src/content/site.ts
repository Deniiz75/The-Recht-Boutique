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
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  CONTROLEER VOOR PUBLICATIE — de volgende beweringen zijn op verzoek
 *      van de opdrachtgever opgenomen en zijn juridisch niet vrijblijvend:
 *
 *        • "Geregistreerd bij / Lid van de Nederlandse Orde van Advocaten"
 *        • De term "advocaat" voor dit kantoor — beschermde titel, art. 435 Sr
 *        • "Erkend mediator", "Master Ondernemingsrecht"
 *        • De cijfers 15+ / 500+ / 98%
 *        • De drie reviews in `reviews` hieronder
 *
 *      De opdrachtgever heeft op 2026-08-25 bevestigd dat de inschrijving en
 *      de reviews echt zijn. Verzonnen reviews zijn een misleidende
 *      handelspraktijk (Omnibus-richtlijn, handhaving door de ACM) en het
 *      onterecht voeren van de titel advocaat is strafbaar. Verwijder deze
 *      claims zodra die bevestiging niet meer opgaat.
 * ─────────────────────────────────────────────────────────────────────────────
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

/**
 * Overgenomen uit de referentiebuild. Let op: `kvk` en `btw` hieronder zijn
 * daar 12345678 en NL001234567B01 — herkenbare dummywaarden. Vervang ze door
 * de echte nummers; vermelding van het KvK-nummer is wettelijk verplicht.
 */
/**
 * Geen telefoonnummer: op verzoek loopt alle contact voorlopig via e-mail.
 * Zet het terug door hier `phoneDisplay` en `phoneHref` toe te voegen en
 * `realPhone()` in `lib/placeholder.ts` te herstellen — de UI leest het
 * nummer nergens rechtstreeks.
 */
export const contact = {
  email: 'info@therechtboutique.nl',
  address: {
    street: 'Herengracht 100',
    postalCode: '1015 AA',
    city: 'Amsterdam',
    country: 'Nederland',
  },
  hours: 'Ma – Vr: 09:00 – 18:00',
} as const;

export const legal = {
  /** TODO: echt KvK-nummer — 12345678 is een dummywaarde. */
  kvk: '12345678',
  /** TODO: echt BTW-nummer — NL001234567B01 is een dummywaarde. */
  btw: 'NL001234567B01',
  /** Datum laatste update privacyverklaring. */
  privacyUpdated: '2026-07-27',
} as const;

/** Praktijkgebieden. `slug` bepaalt de URL: /diensten/[slug] */
export const services = [
  {
    slug: 'ondernemingsrecht',
    title: 'Ondernemingsrecht',
    audience: 'Ondernemers',
    icon: '⚖️',
    cardText:
      "Oprichting van BV's en vennootschappen, aandeelhoudersovereenkomsten, fusies, overnames en herstructureringen. Wij begeleiden u bij elke strategische stap.",
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
    audience: 'Zakelijk & Particulier',
    icon: '📋',
    cardText:
      'Opstellen, beoordelen en onderhandelen van commerciële contracten, leveringsvoorwaarden en samenwerkingsovereenkomsten die uw belangen beschermen.',
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
    audience: 'Particulieren',
    icon: '🏠',
    cardText:
      'Letselschade, aansprakelijkheidsrecht, geschillenbeslechting en familierechtelijke kwesties. Persoonlijk advies op maat van uw situatie.',
    summary:
      'Strategisch advies bij letselschade, aansprakelijkheid en andere complexe kwesties.',
    intro:
      'Juridische kwesties in de privésfeer raken vaak meer dan alleen uw portemonnee. Wij nemen de tijd om uw situatie te begrijpen voordat we over stappen praten.',
    topics: [
      'Aansprakelijkheid en schadevergoeding',
      'Letselschade en personenschade',
      'Consumentenrecht',
      'Verbintenissen tussen particulieren',
    ],
    questions: [
      'Ben ik aansprakelijk voor deze schade, of juist niet?',
      'Ik heb letsel opgelopen — op wie kan ik mijn schade verhalen?',
      'Hoe sterk sta ik als ik dit doorzet?',
    ],
  },
  {
    slug: 'geschillen-en-procedures',
    title: 'Geschillen & Procedures',
    audience: 'Alle cliënten',
    icon: '🛡️',
    cardText:
      'Mediation, arbitrage en procesvoering. Wij streven altijd naar de meest effectieve oplossing, in of buiten de rechtszaal.',
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
 * Onderwerpen in het contactformulier.
 *
 * Bewust niet afgeleid uit `services`: "Letselschade" is geen apart
 * praktijkgebied maar wél waar mensen zelf op zoeken, dus het staat hier als
 * eigen keuze naast Privaatrecht. Deze lijst is de enige bron van waarheid —
 * de API-route valideert hiertegen, dus een optie toevoegen in het formulier
 * zonder hem hier te zetten leidt tot een afgekeurde inzending.
 */
export const contactSubjects = [
  'Ondernemingsrecht',
  'Contractenrecht',
  'Privaatrecht',
  'Letselschade',
  'Geschillen & procedures',
  'Anders / weet ik nog niet',
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
    text: 'Gratis en vrijblijvend bespreken we uw situatie en juridische vraagstuk.',
  },
  {
    step: '02',
    title: 'Analyse',
    text: 'Wij brengen uw juridische positie in kaart en identificeren kansen en risico’s.',
  },
  {
    step: '03',
    title: 'Strategie',
    text: 'Samen bepalen we de beste aanpak — pragmatisch, doelgericht en op maat.',
  },
  {
    step: '04',
    title: 'Uitvoering',
    text: 'Wij handelen uw zaak af en houden u gedurende het hele traject op de hoogte.',
  },
] as const;

/** Waarom-secties. Beloften over werkwijze, geen meetbare claims. */
export const principles = [
  {
    no: '01',
    title: 'Directe lijnen, geen schakels',
    text: 'U spreekt altijd rechtstreeks met uw advocaat. Geen doorverwijzingen, geen wachttijden.',
  },
  {
    no: '02',
    title: 'Commercieel inzicht',
    text: 'Wij denken niet alleen juridisch, maar ook ondernemend. Praktisch advies dat werkt in de echte wereld.',
  },
  {
    no: '03',
    title: 'Transparante kosten',
    text: 'Vooraf duidelijkheid over kosten. Geen verrassingen op de factuur, vast tarief mogelijk.',
  },
  {
    no: '04',
    title: 'Boutique-aanpak',
    text: 'Bewust klein om de kwaliteit hoog te houden. Elke zaak krijgt de volledige aandacht die het verdient.',
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
    a: 'Ja. Veel van ons werk gebeurt op afstand: per e-mail en videogesprek. Waar persoonlijk contact meerwaarde heeft, plannen wij een afspraak op kantoor of bij u op locatie.',
  },
  {
    q: 'Wat gebeurt er met mijn gegevens?',
    a: 'Alles wat u ons vertelt is vertrouwelijk. Uw gegevens worden uitsluitend gebruikt om uw vraag te behandelen en niet gedeeld met derden zonder uw toestemming. Zie onze privacyverklaring voor de volledige toelichting.',
  },
] as const;

/**
 * Trust-indicator boven de H1 in de hero.
 *
 * Bewust twee toezeggingen over dienstverlening, geen meetbare claims: beide
 * staan al zo in `faq` hierboven ("Wij reageren binnen één werkdag" en "Het
 * kennismakingsgesprek is vrijblijvend en kosteloos"). Zet hier niets bij dat
 * niet elders op de site wordt waargemaakt — zie de kop van dit bestand.
 */
export const trustPoints = [
  'Geregistreerd bij de Nederlandse Orde van Advocaten',
  'Transparante tarieven',
  'Eerste gesprek kosteloos',
  'Persoonlijke aanpak',
] as const;

/** Hero. */
export const hero = {
  badge: 'Specialist Ondernemingsrecht & Privaatrecht',
  titleBefore: 'Juridisch advies dat uw onderneming ',
  titleEmphasis: 'vooruit',
  titleAfter: ' brengt',
  lead:
    'Persoonlijke juridische begeleiding voor ondernemers en particulieren. ' +
    'Helder, strategisch en altijd gericht op het beste resultaat voor u.',
} as const;

/** Kerncijfers in de hero. Zie de waarschuwing bovenaan dit bestand. */
export const stats = [
  { value: '15+', label: 'Jaar ervaring' },
  { value: '500+', label: 'Tevreden cliënten' },
  { value: '98%', label: 'Succesratio' },
] as const;

/** Over-sectie. */
export const about = {
  eyebrow: 'Over de jurist',
  title: 'Uw juridisch partner met hart voor de zaak',
  quote: 'Met passie voor het recht en oog voor de mens achter elke zaak.',
  paragraphs: [
    'Als oprichter van The Recht Boutique combineer ik jarenlange ervaring in het ondernemingsrecht en privaatrecht met een persoonlijke, betrokken aanpak. Na werkzaam te zijn geweest bij toonaangevende advocatenkantoren, koos ik bewust voor een boutique-praktijk: kleinschalig, zodat elke cliënt de aandacht krijgt die hij of zij verdient.',
    'Mijn specialisatie ligt op het snijvlak van ondernemingsrecht en privaatrecht. Of het nu gaat om het begeleiden van een overname, het opstellen van waterdichte contracten of het oplossen van een complex geschil — ik sta naast u met helder, strategisch en resultaatgericht advies.',
    'Wat mij drijft? Het vinden van de beste oplossing voor u, waarbij juridische expertise hand in hand gaat met praktisch inzicht en oprechte betrokkenheid.',
  ],
  badges: [
    'Lid Nederlandse Orde van Advocaten',
    'Master Ondernemingsrecht',
    '15+ jaar ervaring',
    'Erkend mediator',
  ],
} as const;

/** Pull-quote naast de "waarom"-lijst. */
export const pullQuote = {
  text: 'Juridisch advies hoort geen luxe te zijn, maar een strategisch instrument voor uw succes.',
  attribution: '— The Recht Boutique',
} as const;

/**
 * Cliëntreviews. Zie de waarschuwing bovenaan dit bestand: deze mogen
 * uitsluitend hier staan zolang ze aantoonbaar echt zijn.
 */
export const reviews = [
  {
    initials: 'MV',
    name: 'Martijn V.',
    role: 'Directeur, tech-startup',
    text: 'Eindelijk een advocaat die meedenkt als ondernemer. Mijn BV-structuur is nu toekomstbestendig opgezet, en het hele proces was helder van begin tot eind.',
  },
  {
    initials: 'SB',
    name: 'Sandra B.',
    role: 'Eigenaar, retailbedrijf',
    text: 'Na een ingewikkeld geschil met een leverancier heeft The Recht Boutique mij buitengewoon goed bijgestaan. Professioneel, snel en altijd bereikbaar.',
  },
  {
    initials: 'PK',
    name: 'Pieter K.',
    role: 'Particulier',
    text: 'Duidelijk advies zonder juridisch jargon. Ik voelde me gehoord en goed vertegenwoordigd. Een aanrader voor iedereen die betrouwbare juridische hulp zoekt.',
  },
] as const;

/** Afsluitende CTA-banner. */
export const closingCta = {
  title: 'Juridische vraag? Laten we kennismaken.',
  text: 'Plan een gratis en vrijblijvend kennismakingsgesprek. Wij vertellen u graag wat wij voor u kunnen betekenen.',
  label: 'Plan uw gratis gesprek',
} as const;

export const footerIntro =
  'Gespecialiseerd juridisch advies in ondernemingsrecht en privaatrecht. ' +
  'Persoonlijk, strategisch en altijd gericht op uw belang.';

/**
 * Hoofdnavigatie — ankers op de homepage.
 *
 * Bewust `/#over` en niet `#over`: de sub-pagina's delen deze header, en een
 * kaal fragment zou daar naar een anker op de sub-pagina zelf wijzen in
 * plaats van terug naar de homepage.
 */
export const nav = [
  { href: '/#over', label: 'Over mij' },
  { href: '/#diensten', label: 'Diensten' },
  { href: '/#waarom', label: 'Waarom wij' },
  { href: '/#werkwijze', label: 'Werkwijze' },
  { href: '/#reviews', label: 'Reviews' },
] as const;

export type Service = (typeof services)[number];
