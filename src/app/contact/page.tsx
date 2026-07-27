import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contact } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Seal } from '@/components/ui/Seal';
import { DataValue } from '@/components/ui/DataValue';
import { ContactForm } from '@/components/ContactForm';
import { realAddress, realEmail, realPhone } from '@/lib/placeholder';

const title = 'Contact';
const description =
  'Neem contact op met The Recht Boutique. Een eerste kennismakingsgesprek is ' +
  'vrijblijvend; u ontvangt binnen één werkdag antwoord op uw bericht.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/contact',
});

export default function ContactPage() {
  const phone = realPhone();
  const email = realEmail();
  const address = realAddress();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Leg uw situatie <span className="italic">voor</span>
          </>
        }
        lead="Vertel kort wat er speelt. U hoort binnen één werkdag van ons wat wij voor u kunnen betekenen — en of een gesprek zinvol is."
      />

      <section aria-label="Contactgegevens en formulier" className="bg-white">
        <Container>
          <div className="grid gap-14 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div className="lg:col-span-7">
              <Eyebrow index="01" className="mb-9">
                Stuur een bericht
              </Eyebrow>
              <ContactForm />
            </div>

            <aside className="lg:col-span-4 lg:col-start-9">
              <Eyebrow index="02" className="mb-9">
                Rechtstreeks
              </Eyebrow>

              <dl className="border-t border-rose/15">
                <div className="flex gap-4 border-b border-rose/12 py-6">
                  <Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-rose" />
                  <div>
                    <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-text-medium uppercase">
                      Telefoon
                    </dt>
                    <dd className="mt-2 text-[1.0625rem]">
                      {phone ? (
                        <a href={phone.href} className="link-rule-in text-text-dark">
                          {phone.display}
                        </a>
                      ) : (
                        <DataValue value={contact.phoneDisplay} />
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-rose/12 py-6">
                  <Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-rose" />
                  <div className="min-w-0">
                    <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-text-medium uppercase">
                      E-mail
                    </dt>
                    <dd className="mt-2 text-[1.0625rem] break-words">
                      {email ? (
                        <a href={`mailto:${email}`} className="link-rule-in text-text-dark">
                          {email}
                        </a>
                      ) : (
                        <DataValue value={contact.email} />
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-rose/12 py-6">
                  <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-rose" />
                  <div>
                    <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-text-medium uppercase">
                      Bezoekadres
                    </dt>
                    <dd className="mt-2 space-y-1 text-[1.0625rem] text-text-dark">
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
                          <p>
                            <DataValue value={contact.address.street} />
                          </p>
                          <p className="flex flex-wrap gap-2">
                            <DataValue value={contact.address.postalCode} />
                            <DataValue value={contact.address.city} />
                          </p>
                          <p>{contact.address.country}</p>
                        </>
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex gap-4 border-b border-rose/12 py-6">
                  <Clock aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-rose" />
                  <div>
                    <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-text-medium uppercase">
                      Bereikbaarheid
                    </dt>
                    <dd className="mt-2 text-[1.0625rem] text-text-dark">{contact.hours}</dd>
                  </div>
                </div>
              </dl>

              <div
                className="mt-12 border border-rose/25 bg-cream px-6 pt-10 pb-8 text-center"
                style={{ borderRadius: '110px 110px 0 0' }}
              >
                <Seal size={68} tone="cream" uid="contact" className="mx-auto" />
                <p className="mt-6 font-display text-[1.1875rem] leading-snug text-text-dark">
                  Spoed? Zet het in uw bericht.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-text-dark">
                  Dreigt er een termijn te verlopen of heeft u een dagvaarding ontvangen,
                  vermeld dat dan meteen — dan pakken wij het met voorrang op.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
