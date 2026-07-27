import { faq, services, site } from '@/content/site';
import { realAddress, realEmail, realPhone } from '@/lib/placeholder';

type JsonLdObject = Record<string, unknown>;

/**
 * Renders a JSON-LD block. `<` is escaped so the payload can never break out
 * of the script element.
 */
export function JsonLd({ data, id }: { data: JsonLdObject; id?: string }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/**
 * The organisation itself. Placeholder contact data is omitted entirely —
 * publishing `TODO:` values as structured data would be worse than publishing
 * nothing at all.
 */
export function organizationJsonLd(): JsonLdObject {
  const address = realAddress();
  const phone = realPhone();
  const email = realEmail();

  const data: JsonLdObject = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': `${site.url}/#organisatie`,
    name: site.name,
    description: site.description,
    url: site.url,
    slogan: site.tagline,
    areaServed: { '@type': 'Country', name: 'NL' },
    availableLanguage: ['nl'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Praktijkgebieden',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          url: `${site.url}/diensten/${service.slug}`,
        },
      })),
    },
  };

  if (address) {
    data.address = {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: 'NL',
    };
  }
  if (phone) data.telephone = phone.display;
  if (email) data.email = email;

  /* `openingHours` is deliberately omitted: schema.org expects the machine
     format ("Mo-Fr 09:00-17:30") and `contact.hours` is Dutch prose that
     cannot be converted reliably. The opening hours are shown in the UI. */

  return data;
}

export function websiteJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: 'nl-NL',
    publisher: { '@id': `${site.url}/#organisatie` },
  };
}

export function faqJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: ReadonlyArray<{ name: string; path: string }>,
): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}
