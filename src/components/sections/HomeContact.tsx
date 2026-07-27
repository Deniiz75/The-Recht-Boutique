import { Clock, Mail, Phone } from 'lucide-react';

import { contact } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { DataValue } from '@/components/ui/DataValue';
import { Seal } from '@/components/ui/Seal';
import { ContactForm } from '@/components/ContactForm';
import { realEmail, realPhone } from '@/lib/placeholder';

type HomeContactProps = {
  index?: string;
};

/**
 * Closing contact section for the home page — the form itself rather than a
 * button through to /contact, so the page can be converted on without a
 * navigation.
 *
 * Deliberately a light section. `ContactForm` is styled for a light surface
 * (its success panel is cream, its copy is text-dark), and the `.on-dark`
 * rule in globals.css re-colours `:focus-visible` to cream — inside a light
 * panel that would put a 1.58:1 focus ring on the form's own inputs. Keeping
 * the section light avoids the nesting entirely.
 *
 * `id="contact"` is the scroll target for the mobile action bar, and
 * `scroll-mt-24` keeps the heading clear of the sticky header when jumped to.
 */
export function HomeContact({ index }: HomeContactProps) {
  const phone = realPhone();
  const email = realEmail();

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-titel"
      className="scroll-mt-24 border-t border-gold/40 bg-canvas"
    >
      <Container>
        <div className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-5">
            <Eyebrow index={index} className="reveal">
              Contact
            </Eyebrow>

            <h2 id="home-contact-titel" className="reveal mt-6 font-display text-title">
              Zullen we kennismaken?
            </h2>

            <p className="reveal mt-6 max-w-md text-lead text-ink-soft">
              Een eerste gesprek is vrijblijvend. U schetst uw situatie, wij vertellen u eerlijk
              of en hoe wij u verder kunnen helpen.
            </p>

            <dl className="reveal mt-10 border-t border-gold/50">
              <div className="flex gap-4 border-b border-gold/40 py-5">
                <Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
                    Telefoon
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem]">
                    {phone ? (
                      <a href={phone.href} className="link-rule-in">
                        {phone.display}
                      </a>
                    ) : (
                      <DataValue value={contact.phoneDisplay} />
                    )}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 border-b border-gold/40 py-5">
                <Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div className="min-w-0">
                  <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
                    E-mail
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] break-all">
                    {email ? (
                      <a href={`mailto:${email}`} className="link-rule-in">
                        {email}
                      </a>
                    ) : (
                      <DataValue value={contact.email} />
                    )}
                  </dd>
                </div>
              </div>

              <div className="flex gap-4 border-b border-gold/40 py-5">
                <Clock aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <div>
                  <dt className="font-mono text-[0.625rem] tracking-[0.2em] text-ink-soft uppercase">
                    Bereikbaarheid
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-ink-soft">{contact.hours}</dd>
                </div>
              </div>
            </dl>

            <div className="reveal mt-10 hidden lg:block">
              <Seal size={92} tone="cream" uid="home-contact" />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Eyebrow index="—" className="reveal mb-9">
              Stuur een bericht
            </Eyebrow>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
