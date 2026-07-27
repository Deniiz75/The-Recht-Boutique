# The Recht Boutique

Website van **The Recht Boutique**, een juridisch adviesbureau voor ondernemers en
particulieren. Nederlandstalig (`nl-NL`), statisch gegenereerd en gebouwd met
Next.js 16 (App Router), React 19 en Tailwind CSS v4.

## Stack

| Onderdeel   | Keuze                                                            |
| ----------- | ---------------------------------------------------------------- |
| Framework   | Next.js 16.2 (App Router, Turbopack)                             |
| UI          | React 19, Server Components als standaard                        |
| Styling     | Tailwind CSS v4, config-less (`@theme` in `src/app/globals.css`)  |
| Typografie  | Playfair Display, Manrope, DM Mono via `next/font/google`         |
| Iconen      | lucide-react                                                      |
| E-mail      | Resend REST API via `fetch` (geen extra dependency)               |

## Aan de slag

```bash
npm install
cp .env.example .env.local   # vul de waarden in (zie hieronder)
npm run dev                  # http://localhost:3000
```

Controles die groen moeten blijven:

```bash
npm run build     # productiebuild + statische generatie
npx tsc --noEmit  # types
npm run lint      # ESLint 9 (flat config)
```

## Omgevingsvariabelen

Alle drie zijn nodig om het contactformulier te laten werken. Zie `.env.example`.

| Variabele            | Omschrijving                                                  |
| -------------------- | ------------------------------------------------------------- |
| `RESEND_API_KEY`     | API-sleutel van [Resend](https://resend.com), begint met `re_`. |
| `CONTACT_TO_EMAIL`   | Mailbox die de formulierinzendingen ontvangt.                  |
| `CONTACT_FROM_EMAIL` | Afzenderadres; het domein moet in Resend geverifieerd zijn.    |

**Ontbreekt er één?** Dan geeft `POST /api/contact` bewust HTTP 503 terug en toont het
formulier een eerlijke foutmelding met telefoonnummer en `mailto:`-alternatief. Het
formulier toont nóóit een succesmelding voor een bericht dat niet verstuurd is.

## Structuur

```
src/
  app/
    layout.tsx              root layout: fonts, metadata, header/footer, JSON-LD
    page.tsx                home
    over-ons/               aanpak en uitgangspunten van het kantoor
    diensten/               overzicht + [slug] detailpagina's (generateStaticParams)
    werkwijze/              de vier stappen, uitgebreid
    veelgestelde-vragen/    native <details> disclosures + FAQPage JSON-LD
    contact/                contactgegevens + formulier
    privacyverklaring/      AVG-verklaring
    api/contact/route.ts    formulierafhandeling (Node runtime)
    opengraph-image.tsx     OG-afbeelding (next/og)
    icon.svg, apple-icon.tsx
    sitemap.ts, robots.ts, not-found.tsx
  components/
    sections/               paginasecties (hero, diensten, werkwijze, …)
    ui/                     primitieven (Container, Seal, ArchFrame, knoppen, …)
    SiteHeader / SiteFooter / MobileMenu / ContactForm
  content/site.ts           enige bron van waarheid voor alle teksten
  lib/                      placeholder-guards, JSON-LD, metadata, OG-font
```

Alleen `MobileMenu` en `ContactForm` zijn client components; de rest rendert op de
server. Elke route behalve `/api/contact` wordt statisch gegenereerd.

## Inhoudelijke uitgangspunten

Deze site is bewust terughoudend met claims. Bij het aanvullen van teksten geldt:

- **geen** cliëntreviews, testimonials of quotes van cliënten;
- **geen** statistieken ("15+ jaar", "500+ cliënten", percentages, tellers);
- **geen** registratie- of certificeringsclaims;
- **niet** de term *advocaat* gebruiken voor het kantoor of zijn mensen — dat is in
  Nederland een beschermde titel. De enige toegestane vermelding staat in het
  FAQ-antwoord in `src/content/site.ts` en moet ongewijzigd blijven;
- **geen** foto's van personen (ook geen stockportretten);
- **geen** logo's van cliënten, "as seen in" of awards.

Alle teksten staan in `src/content/site.ts`. Pas die aan in plaats van de componenten.

## Vormgeving

Editorial/letterpress-identiteit: diepgroene inkt op warm papier, gouden accenten op
donkere vlakken, haarlijnen met mono-nummers en vierkante hoeken op knoppen en
formuliervelden. Terugkerende motieven zijn de **boog**
(`border-radius: 260px 260px 0 0`) en het **zegel** met de weegschaal. De boog op de
homepage en alle andere beeldvlakken zijn volledig met CSS/SVG opgebouwd — er wordt
geen fotografie gebruikt.

Kleurtokens staan in `src/app/globals.css` onder `@theme`.

> Let op: `rust` (#BD5D3E) haalt met 4,27:1 op papier géén WCAG AA voor kleine tekst.
> Gebruik daarvoor **`rust-deep`** (#A2452A, 5,99:1). `rust` is uitsluitend decoratief
> of voor grote koppen. Ook `muted` op `sand` (3,84:1) is te licht voor bodytekst.

## Toegankelijkheid

Gericht op WCAG 2.2 AA: skip-link, semantische landmarks, één `<h1>` per pagina,
zichtbare `:focus-visible`-ringen, aanraakdoelen van minimaal 44 px, een echt
disclosure-mobielmenu (`aria-expanded`/`aria-controls`, Escape, focus trap, focus terug
naar de knop, scroll lock) en respect voor `prefers-reduced-motion`.

## SEO

`metadataBase`, een titel-template, unieke titels en beschrijvingen per pagina,
volledige Open Graph- en Twitter-kaarten, `sitemap.ts`, `robots.ts` en JSON-LD
(`LegalService`, `WebSite`, `FAQPage`, `BreadcrumbList`, `Service`). Placeholderwaarden
worden nooit als structured data gepubliceerd.

---

## ✅ Voor livegang

Onderstaande waarden staan nog als `TODO:`-placeholder in `src/content/site.ts`. Ze
worden op de site zichtbaar gemarkeerd (streepjeslijn + tooltip) en bewust weggelaten
uit JSON-LD, `tel:`- en `mailto:`-links. Vul ze in vóór publicatie.

| #  | Veld in `src/content/site.ts` | Waarde                           | Huidige placeholder             |
| -- | ----------------------------- | -------------------------------- | ------------------------------- |
| 1  | *(env)* `NEXT_PUBLIC_SITE_URL` | Definitief domein, zonder `/`   | leeg → valt terug op Vercel-URL |
| 2  | `contact.phoneDisplay`        | Telefoonnummer (weergave)        | `TODO: +31 (0)00 000 0000`      |
| 3  | `contact.phoneHref`           | Zelfde nummer in E.164           | `tel:+310000000000`             |
| 4  | `contact.email`               | E-mailadres                      | `TODO: info@therechtboutique.nl` |
| 5  | `contact.address.street`      | Straat en huisnummer             | `TODO: straat en huisnummer`    |
| 6  | `contact.address.postalCode`  | Postcode                         | `TODO: 0000 AA`                 |
| 7  | `contact.address.city`        | Plaats                           | `TODO: plaats`                  |
| 8  | `legal.kvk`                   | KvK-nummer (wettelijk verplicht) | `TODO: 00000000`                |
| 9  | `legal.btw`                   | BTW-identificatienummer          | `TODO: NL000000000B00`          |

Let op bij nummer 2 en 3: `phoneHref` bevat géén `TODO:`-markering maar is wél een
placeholder. De site toont het nummer pas als link zodra `phoneDisplay` echt is.

Nummer 1 staat bewust níet in `site.ts` maar in een omgevingsvariabele. Deze waarde
bepaalt élke canonical-tag, `og:url`, `sitemap.xml`, `robots.txt` en de JSON-LD `@id`;
een fout hier zet foutieve canonicals op alle 19 routes. Zolang de variabele leeg is,
gebruikt de site automatisch `VERCEL_PROJECT_PRODUCTION_URL` (het productiedomein van
het Vercel-project), zodat previews niet hun eigen canonical claimen. Zet
`NEXT_PUBLIC_SITE_URL` zodra het eigen domein live staat.

Daarnaast vóór livegang:

- [ ] `contact.hours` controleren (nu: maandag t/m vrijdag, 09:00 – 17:30).
- [ ] `legal.privacyUpdated` bijwerken zodra de privacyverklaring wijzigt.
- [ ] Privacyverklaring laten nalezen: bewaartermijnen, verwerkers (Resend, Vercel) en
      de verwerkersovereenkomsten moeten met de praktijk overeenkomen.
- [ ] `RESEND_API_KEY`, `CONTACT_TO_EMAIL` en `CONTACT_FROM_EMAIL` in Vercel zetten en
      een testbericht via het formulier sturen — controleer dat de mail écht aankomt.
- [ ] Afzenderdomein in Resend verifiëren (SPF/DKIM).
- [ ] Na het invullen van het domein opnieuw `npm run build` draaien en `sitemap.xml`,
      `robots.txt` en de canonical-URL's nalopen.
