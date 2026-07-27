import { contact } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { DataValueOnInk } from '@/components/ui/DataValue';
import { Seal } from '@/components/ui/Seal';
import { realEmail, realPhone } from '@/lib/placeholder';

type ContactCtaProps = {
  index?: string;
  title?: string;
  text?: string;
  /** Unique suffix for the seal id when several seals share a page. */
  uid?: string;
};

export function ContactCta({
  index,
  title = 'Zullen we kennismaken?',
  text = 'Een eerste gesprek is vrijblijvend. U schetst uw situatie, wij vertellen u eerlijk of en hoe wij u verder kunnen helpen.',
  uid = 'cta',
}: ContactCtaProps) {
  const phone = realPhone();
  const email = realEmail();

  return (
    <section
      aria-labelledby="cta-titel"
      className="on-dark relative overflow-hidden bg-text-dark text-white"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-24 hidden h-[28rem] w-[24rem] border border-white/10 lg:block"
        style={{ borderRadius: '260px 260px 0 0' }}
      />

      <Container>
        <div className="relative grid items-center gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <Eyebrow index={index} tone="onDark" className="reveal">
              Contact
            </Eyebrow>
            <h2 id="cta-titel" className="reveal mt-6 font-display text-title text-white">
              {title}
            </h2>
            <p className="reveal mt-6 max-w-xl text-lead text-white/75">{text}</p>

            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="onink">
                Stuur een bericht
              </ButtonLink>
              {phone ? (
                <a
                  href={phone.href}
                  className="inline-flex min-h-11 items-center font-mono text-[0.75rem] tracking-[0.16em] text-white uppercase"
                >
                  <span className="link-rule-in">{phone.display}</span>
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.75rem] tracking-[0.16em] text-white/70 uppercase">
                  Telefoon <DataValueOnInk value={contact.phoneDisplay} />
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <div className="reveal flex items-start gap-6 border-t border-white/20 pt-8">
              <Seal size={84} tone="dark" uid={uid} />
              <dl className="text-[0.9375rem] text-white/80">
                <dt className="font-mono text-[0.625rem] tracking-[0.24em] text-cream uppercase">
                  Bereikbaarheid
                </dt>
                <dd className="mt-2">{contact.hours}</dd>
                <dt className="mt-5 font-mono text-[0.625rem] tracking-[0.24em] text-cream uppercase">
                  E-mail
                </dt>
                <dd className="mt-2 break-all">
                  {email ? (
                    <a href={`mailto:${email}`} className="link-rule-in">
                      {email}
                    </a>
                  ) : (
                    <DataValueOnInk value={contact.email} />
                  )}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
