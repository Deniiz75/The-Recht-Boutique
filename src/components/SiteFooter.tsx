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
    <footer className="on-dark relative mt-auto overflow-hidden bg-ink-deep text-paper/85">
      {/* Arch silhouette rising out of the footer's top edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-16 hidden h-72 w-72 border border-gold/15 md:block"
        style={{ borderRadius: '260px 260px 0 0' }}
      />

      <Container>
        <div className="relative grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <Seal size={64} tone="ink" uid="footer" />
              <p className="font-display text-2xl leading-none text-paper">
                The Recht <span className="italic">Boutique</span>
              </p>
            </div>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-paper/70">
              Een juridisch adviesbureau voor ondernemers en particulieren. Persoonlijk
              advies, heldere taal en één vast aanspreekpunt.
            </p>
          </div>

          <nav aria-label="Footernavigatie" className="md:col-span-3">
            <h2 className="font-mono text-[0.625rem] tracking-[0.28em] text-gold uppercase">
              Navigatie
            </h2>
            <ul className="mt-5 space-y-1">
              {[...nav, { href: '/contact', label: 'Contact' } as const].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 text-[0.9375rem] text-paper/80 hover:text-paper"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <h2 className="font-mono text-[0.625rem] tracking-[0.28em] text-gold uppercase">
              Praktijk
            </h2>
            <ul className="mt-5 space-y-1">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 text-[0.9375rem] text-paper/80 hover:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="font-mono text-[0.625rem] tracking-[0.28em] text-gold uppercase">
              Contact
            </h2>
            <address className="mt-5 space-y-3 text-[0.9375rem] not-italic">
              <div>
                {phone ? (
                  <a href={phone.href} className="link-rule-in inline-flex min-h-11 items-center py-1 text-paper/80 hover:text-paper">
                    {phone.display}
                  </a>
                ) : (
                  <DataValueOnInk value={contact.phoneDisplay} />
                )}
              </div>
              <div>
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    className="link-rule-in inline-flex min-h-11 items-center py-1 break-all text-paper/80 hover:text-paper"
                  >
                    {email}
                  </a>
                ) : (
                  <DataValueOnInk value={contact.email} />
                )}
              </div>
              <div className="space-y-1 text-paper/70">
                {address ? (
                  <>
                    <p>{address.street}</p>
                    <p>
                      {address.postalCode} {address.city}
                    </p>
                    <p>{address.country}</p>
                  </>
                ) : (
                  <>
                    <DataValueOnInk value={contact.address.street} />
                    <br />
                    <DataValueOnInk value={contact.address.postalCode} />{' '}
                    <DataValueOnInk value={contact.address.city} />
                    <br />
                    <span>{contact.address.country}</span>
                  </>
                )}
              </div>
              <p className="text-paper/60">{contact.hours}</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/15 py-8 font-mono text-[0.6875rem] tracking-[0.12em] text-paper/60 uppercase md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-2">
              KvK <DataValueOnInk value={legal.kvk} />
            </span>
            <span className="inline-flex items-center gap-2">
              BTW <DataValueOnInk value={legal.btw} />
            </span>
          </p>
          <Link
            href="/privacyverklaring"
            className="link-rule-in inline-flex min-h-11 items-center py-1 tracking-[0.12em] text-paper/70 hover:text-paper"
          >
            Privacyverklaring
          </Link>
        </div>
      </Container>
    </footer>
  );
}
