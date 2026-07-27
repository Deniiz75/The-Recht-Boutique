import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { faq } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Disclosure } from '@/components/ui/Disclosure';
import { Seal } from '@/components/ui/Seal';
import { ContactCta } from '@/components/sections/ContactCta';
import { JsonLd, faqJsonLd } from '@/lib/jsonld';

const title = 'Veelgestelde vragen';
const description =
  'Antwoorden op de vragen die ons het vaakst worden gesteld: kosten, tarieven, ' +
  'doorlooptijd, werken op afstand en hoe wij met uw gegevens omgaan.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/veelgestelde-vragen',
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Veelgestelde vragen"
        title={
          <>
            Antwoorden, <span className="italic">voordat</span> u belt
          </>
        }
        lead="Staat uw vraag er niet bij? Stel hem gerust — een eerste gesprek is vrijblijvend."
      />

      <section aria-label="Vragen en antwoorden" className="bg-paper">
        <Container>
          <div className="grid gap-12 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div className="lg:col-span-8">
              <div className="border-t border-ink/25">
                {faq.map((item, index) => (
                  <Disclosure
                    key={item.q}
                    question={item.q}
                    answer={item.a}
                    index={String(index + 1).padStart(2, '0')}
                  />
                ))}
              </div>
            </div>

            <aside className="lg:col-span-3 lg:col-start-10">
              <div
                className="reveal border border-line bg-cream px-6 pt-10 pb-8 text-center lg:sticky lg:top-32"
                style={{ borderRadius: '120px 120px 0 0' }}
              >
                <Seal size={72} tone="gold" uid="faq" className="mx-auto" />
                <h2 className="mt-6 font-display text-[1.25rem] leading-snug">
                  Nog een vraag over uw situatie?
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  Leg hem voor. U hoort binnen één werkdag van ons wat wij voor u kunnen
                  betekenen.
                </p>
                <Link href="/contact" className="btn btn-primary mt-7 w-full">
                  Stel uw vraag
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <ContactCta uid="faq-cta" />

      <JsonLd data={faqJsonLd()} id="ld-faq" />
    </>
  );
}
