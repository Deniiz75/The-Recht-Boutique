import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { services, site } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { PageHeader } from '@/components/ui/PageHeader';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { ContactCta } from '@/components/sections/ContactCta';
import { JsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';

type ServiceRouteProps = {
  params: Promise<{ slug: string }>;
};

/** Every practice area is prerendered; unknown slugs 404 instead of rendering. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: ServiceRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return { title: 'Praktijkgebied niet gevonden' };
  }

  const description = `${service.summary} ${service.audience} — juridisch advies van The Recht Boutique.`;

  return pageMetadata({
    title: service.title,
    socialTitle: `${service.title} · ${site.name}`,
    description,
    path: `/diensten/${service.slug}`,
    type: 'article',
  });
}

export default async function ServiceDetailPage({ params }: ServiceRouteProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const others = services.filter((item) => item.slug !== service.slug);

  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Diensten', path: '/diensten' },
    { name: service.title, path: `/diensten/${service.slug}` },
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow={service.audience}
        title={service.title}
        lead={service.intro}
        above={
          <nav aria-label="Kruimelpad" className="mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.625rem] tracking-[0.18em] text-text-medium uppercase">
              {trail.map((crumb, index) => {
                const isLast = index === trail.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {index > 0 ? (
                      <ChevronRight aria-hidden="true" className="h-3 w-3 text-text-light" />
                    ) : null}
                    {isLast ? (
                      <span aria-current="page" className="text-text-dark">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="link-rule-in inline-flex min-h-6 items-center hover:text-text-dark"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/contact">Bespreek uw situatie</ButtonLink>
          <ButtonLink href="/werkwijze" variant="outline">
            Onze werkwijze
          </ButtonLink>
        </div>
      </PageHeader>

      <section aria-labelledby="onderwerpen-titel" className="bg-canvas">
        <Container>
          <div className="grid gap-14 py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
            <div className="lg:col-span-7">
              <Eyebrow index="01" className="reveal">
                Waar wij mee helpen
              </Eyebrow>
              <h2
                id="onderwerpen-titel"
                className="reveal mt-6 font-display text-heading"
              >
                Onderwerpen binnen {service.title.toLowerCase()}
              </h2>

              <ol className="mt-10 border-t border-rose/12">
                {service.topics.map((topic, index) => (
                  <li
                    key={topic}
                    className="reveal flex items-baseline gap-5 border-b border-rose/12 py-5"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.6875rem] tracking-[0.2em] text-rose tabular-nums"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[1.0625rem] leading-relaxed text-text-dark">
                      {topic}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5">
              <div
                className="reveal border border-rose/25 bg-cream px-7 pt-12 pb-10 lg:sticky lg:top-32"
                style={{ borderRadius: '140px 140px 0 0' }}
              >
                <Eyebrow index="02" className="justify-center">
                  Vragen die wij horen
                </Eyebrow>
                <ul className="mt-8 space-y-6">
                  {service.questions.map((question) => (
                    <li key={question}>
                      <p className="font-display text-[1.1875rem] leading-snug text-text-dark">
                        “{question}”
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-9 border-t border-rose/25 pt-6 text-[0.9375rem] leading-relaxed text-text-dark">
                  Herkent u uw eigen vraag hierin niet helemaal? Dat hoeft ook niet — leg
                  ons uw situatie voor, dan zoeken wij samen uit wat er speelt.
                </p>
                <div className="mt-7">
                  <ButtonLink href="/contact" className="w-full">
                    Neem contact op
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="andere-titel" className="border-t border-rose/12 bg-canvas">
        <Container>
          <div className="py-20 lg:py-24">
            <div className="reveal">
              <Eyebrow index="03">Ook binnen ons bereik</Eyebrow>
              <h2 id="andere-titel" className="mt-6 font-display text-title">
                Andere <span className="italic">praktijkgebieden</span>
              </h2>
            </div>

            <ul className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other, index) => (
                <li key={other.slug} className="reveal">
                  <ServiceCard
                    service={other}
                    index={String(index + 1).padStart(2, '0')}
                    surface="canvas"
                  />
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <ContactCta uid={`service-${service.slug}`} />

      <JsonLd data={breadcrumbJsonLd(trail)} id={`ld-kruimelpad-${service.slug}`} />
      <JsonLd
        id={`ld-dienst-${service.slug}`}
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.title,
          description: service.summary,
          url: `${site.url}/diensten/${service.slug}`,
          serviceType: service.title,
          areaServed: { '@type': 'Country', name: 'NL' },
          provider: { '@id': `${site.url}/#organisatie` },
        }}
      />
    </>
  );
}
