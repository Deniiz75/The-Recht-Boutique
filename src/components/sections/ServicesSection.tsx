import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { services } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ui/ServiceCard';

export function ServicesSection() {
  return (
    <section aria-labelledby="diensten-titel" className="bg-canvas">
      <Container>
        <div className="py-20 lg:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Praktijkgebieden"
              index="02"
              title={
                <span id="diensten-titel">
                  Vier gebieden, <span className="italic">één</span> aanspreekpunt
                </span>
              }
            />
            <Link
              href="/diensten"
              className="group reveal inline-flex min-h-11 shrink-0 items-center gap-3 font-mono text-[0.6875rem] tracking-[0.2em] text-text-dark uppercase"
            >
              <span className="link-rule-in">Alle diensten</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 text-rose transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <ul className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <li key={service.slug} className="reveal">
                <ServiceCard
                  service={service}
                  index={String(index + 1).padStart(2, '0')}
                  surface="canvas"
                />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
