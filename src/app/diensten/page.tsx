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

      <section aria-label="Overzicht van praktijkgebieden" className="bg-cream">
        <Container>
          <div className="py-16 lg:py-24">
            <ul className="grid gap-7 lg:grid-cols-2">
              {services.map((service) => (
                <li key={service.slug} className="reveal">
                  <article className="card card-wipe card-lift group relative flex h-full flex-col overflow-hidden p-10 hover:shadow-[0_8px_30px_rgba(45,42,38,0.08)]">
                    <div
                      aria-hidden="true"
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-[14px] bg-rose-soft text-2xl"
                    >
                      {service.icon}
                    </div>

                    <h2 className="font-serif text-[1.3rem] font-semibold text-rose">
                      <Link
                        href={`/diensten/${service.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="mt-3 text-[0.95rem] leading-relaxed text-text-medium">
                      {service.summary}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {service.topics.slice(0, 3).map((topic) => (
                        <li
                          key={topic}
                          className="relative pl-5 text-[0.9rem] leading-relaxed text-text-medium"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute top-[0.7em] left-0 h-px w-2.5 bg-rose"
                          />
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.85rem] font-semibold text-rose">
                      Bekijk {service.title.toLowerCase()}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ProcessSection surface="canvas" withLink />
      <ContactCta uid="diensten-cta" />
    </>
  );
}
