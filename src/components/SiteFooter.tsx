import Link from 'next/link';
import { contact, legal, nav, services, site } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Seal } from '@/components/ui/Seal';
import { DataValueOnInk } from '@/components/ui/DataValue';
import { realAddress, realEmail, realPhone } from '@/lib/placeholder';

export function SiteFooter() {
  const phone = realPhone();
  const email = realEmail();
  const address = realAddress();
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative mt-auto overflow-hidden bg-ink text-white/85">
      {/* Arch silhouette rising out of the footer's top edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 hidden h-72 w-72 border border-surface/15 lg:block"
        style={{ borderRadius: '260px 260px 0 0' }}
      />

      <Container>
        <div className="relative grid gap-12 py-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-8 lg:py-20">
          <div className="sm:col-span-2 lg:col-span-4">
            <div className="flex items-center gap-4">
              <Seal size={64} tone="dark" uid="footer" />
              <p className="font-display text-2xl leading-none text-white">
                The Recht <span className="italic">Boutique</span>
              </p>
            </div>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
              Een juridisch adviesbureau voor ondernemers en particulieren. Persoonlijk
              advies, heldere taal en één vast aanspreekpunt.
            </p>
          </div>

          <nav aria-label="Footernavigatie" className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] tracking-[0.28em] text-surface uppercase">
              Navigatie
            </h2>
            <ul className="mt-5 space-y-1">
              {[...nav, { href: '/contact', label: 'Contact' } as const].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 text-[0.9375rem] text-white/80 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[0.625rem] tracking-[0.28em] text-surface uppercase">
              Praktijk
            </h2>
            <ul className="mt-5 space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 text-[0.9375rem] text-white/80 hover:text-white"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-mono text-[0.625rem] tracking-[0.28em] text-surface uppercase">
              Contact
            </h2>
            {/* Contact details run in the body font at body size, placeholder or
                not — the footer repeats on every page, so a marker here reads as
                noise. DataValueOnInk keeps its title/sr-only warning. */}
            <address className="mt-5 space-y-3 text-[0.9375rem] not-italic">
              <div>
                {phone ? (
                  <a
                    href={phone.href}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 text-white/80 hover:text-white"
                  >
                    {phone.display}
                  </a>
                ) : (
                  <DataValueOnInk
                    variant="plain"
                    value={contact.phoneDisplay}
                    className="text-white/80"
                  />
                )}
              </div>
              <div>
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 text-white/80 wrap-anywhere hover:text-white"
                  >
                    {email}
                  </a>
                ) : (
                  <DataValueOnInk
                    variant="plain"
                    value={contact.email}
                    className="text-white/80"
                  />
                )}
              </div>
              {/* Three fixed lines: street + number, postcode + city, country.
                  Same shape whether the values are real or still placeholders,
                  so the block never reflows once they are filled in. */}
              <div className="space-y-1 text-white/70">
                <p>
                  {address ? (
                    address.street
                  ) : (
                    <DataValueOnInk variant="plain" value={contact.address.street} />
                  )}
                </p>
                <p>
                  {address ? (
                    `${address.postalCode} ${address.city}`
                  ) : (
                    <>
                      <DataValueOnInk variant="plain" value={contact.address.postalCode} />{' '}
                      <DataValueOnInk variant="plain" value={contact.address.city} />
                    </>
                  )}
                </p>
                <p>{contact.address.country}</p>
              </div>
              <p className="text-white/60">{contact.hours}</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-8 font-mono text-[0.6875rem] tracking-[0.12em] text-white/60 uppercase md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              KvK <DataValueOnInk variant="plain" value={legal.kvk} />
            </span>
            <span className="inline-flex items-center gap-2">
              BTW <DataValueOnInk variant="plain" value={legal.btw} />
            </span>
          </p>
          <Link
            href="/privacyverklaring"
            className="link-rule-in inline-flex min-h-11 items-center py-1 tracking-[0.12em] text-white/70 hover:text-white"
          >
            Privacyverklaring
          </Link>
        </div>
      </Container>
    </footer>
  );
}
