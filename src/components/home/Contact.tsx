import { Clock, Mail, MapPin } from 'lucide-react';
import { contact } from '@/content/site';
import { ContactForm } from '@/components/ContactForm';

/* No phone row: contact runs through e-mail for now. */
const details = [
  { icon: Mail, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
  {
    icon: MapPin,
    label: 'Kantoor',
    value: `${contact.address.street}, ${contact.address.postalCode} ${contact.address.city}`,
    href: null,
  },
  { icon: Clock, label: 'Bereikbaar', value: contact.hours, href: null },
] as const;

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="grid grid-cols-2 items-start gap-16 max-lg:grid-cols-1">
          <div className="reveal">
            <p className="mb-3 text-[0.8rem] font-semibold tracking-[3px] text-rose-light uppercase">
              Contact
            </p>
            <h2 className="mb-5 font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-rose">
              Neem vrijblijvend contact op
            </h2>
            <p className="mb-10 text-[1.05rem] text-text-medium">
              Heeft u een juridische vraag of wilt u een afspraak maken? Wij
              reageren binnen 24 uur op uw bericht.
            </p>

            <dl>
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="mb-7 flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-soft text-rose"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <div>
                    <dt className="mb-0.5 text-[0.9rem] font-bold text-text-dark">
                      {label}
                    </dt>
                    <dd className="text-[0.9rem] text-text-medium">
                      {href ? (
                        <a href={href} className="link-rule-in">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal">
            <div className="rounded-xl border border-rose/8 bg-cream p-11 max-sm:p-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
