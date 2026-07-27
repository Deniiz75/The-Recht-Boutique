import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { services } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ContactCta } from '@/components/sections/ContactCta';

const title = 'Diensten';
const description =
  'Ondernemingsrecht, contractenrecht, privaatrecht en geschillen & procedures. ' +
  'Vier praktijkgebieden van The Recht Boutique, met één vast aanspreekpunt per dossier.';

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: '/diensten',
});

export default function DienstenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Praktijkgebieden"
        title={
          <>
            Vier gebieden waarin wij <span className="italic">thuis</span> zijn
          </>
        }
        lead="Voor ondernemers en particulieren. Kies het gebied dat bij uw vraag past — of neem contact op als u niet zeker weet waar uw situatie thuishoort."
      />

      <section aria-label="Overzicht van praktijkgebieden" className="bg-white">
        <Container>
          <div className="py-16 lg:py-24">
            <ul className="grid gap-x-14 gap-y-16 lg:grid-cols-2">
              {services.map((service, index) => (
                <li key={service.slug} className="reveal">
                  <article className="group relative flex h-full flex-col border-t border-rose/15 pt-10">
                    <span
                      aria-hidden="true"
                      className="absolute -top-2.5 left-0 bg-white pr-3 font-display text-lg leading-none text-rose tabular-nums"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <p className="font-mono text-[0.625rem] tracking-[0.22em] text-text-medium uppercase">
                      {service.audience}
                    </p>

                    <h2 className="mt-4 font-display text-heading">
                      <Link
                        href={`/diensten/${service.slug}`}
                        className="transition-colors after:absolute after:inset-0 after:content-[''] hover:text-rose-dark"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-text-medium">
                      {service.summary}
                    </p>

                    <ul className="mt-7 space-y-2.5 border-t border-rose/12 pt-6">
                      {service.topics.slice(0, 3).map((topic) => (
                        <li
                          key={topic}
                          className="relative pl-5 text-[0.9375rem] leading-relaxed text-text-dark/85"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute top-[0.7em] left-0 h-px w-2.5 bg-rose"
                          />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-8 inline-flex min-h-11 items-center gap-2 font-mono text-[0.625rem] tracking-[0.2em] text-text-dark uppercase">
                      <span className="link-rule-in">Bekijk {service.title.toLowerCase()}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-rose transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ProcessSection surface="white" withLink />
      <ContactCta uid="diensten-cta" />
    </>
  );
}
