import type { Metadata } from 'next';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { About } from '@/components/home/About';
import { Services } from '@/components/home/Services';
import { Why } from '@/components/home/Why';
import { Process } from '@/components/home/Process';
import { Reviews } from '@/components/home/Reviews';
import { ClosingCta } from '@/components/home/ClosingCta';
import { Contact } from '@/components/home/Contact';

const title = `${site.name} — Ondernemingsrecht & Privaatrecht`;

export const metadata: Metadata = pageMetadata({
  title,
  socialTitle: title,
  description: site.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <About />
      <Services />
      <Why />
      <Process />
      <Reviews />
      <ClosingCta />
      <Contact />
    </>
  );
}
