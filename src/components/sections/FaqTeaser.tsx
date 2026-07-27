import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { faq } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Disclosure } from '@/components/ui/Disclosure';

const TEASER_COUNT = 3;

export function FaqTeaser({ index }: { index?: string }) {
  return (
    <section aria-labelledby="faq-titel" className="border-t border-rose/10 bg-white">
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Veelgestelde vragen"
              index={index}
              title={
                <span id="faq-titel">
                  Eerst even <span className="italic">weten</span>
                </span>
              }
              intro="De vragen die het vaakst gesteld worden, kort beantwoord."
            />
            <Link
              href="/veelgestelde-vragen"
              className="group reveal mt-9 inline-flex min-h-11 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.2em] text-text-dark uppercase"
            >
              <span className="link-rule-in">Alle vragen</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-rose transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="reveal lg:col-span-7 lg:col-start-6">
            <div className="border-t border-rose/12">
              {faq.slice(0, TEASER_COUNT).map((item, itemIndex) => (
                <Disclosure
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                  index={String(itemIndex + 1).padStart(2, '0')}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
