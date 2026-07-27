import type { Metadata } from 'next';
import { site } from '@/content/site';
import { pageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/Hero';
import { TrustBar } from '@/components/sections/TrustBar';
import { IntroTeaser } from '@/components/sections/IntroTeaser';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PullQuote } from '@/components/sections/PullQuote';
import { PrinciplesSection } from '@/components/sections/PrinciplesSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ExpectationsSection } from '@/components/sections/ExpectationsSection';
import { FaqTeaser } from '@/components/sections/FaqTeaser';
import { ContactCta } from '@/components/sections/ContactCta';

const title = `${site.name} — ${site.tagline}`;

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
      <TrustBar />
      <IntroTeaser />
      <ServicesSection />
      <PullQuote />
      <PrinciplesSection index="03" surface="white" />
      <ProcessSection index="04" surface="white" withLink />
      <ExpectationsSection index="05" />
      <FaqTeaser index="06" />
      <ContactCta index="07" uid="home-cta" />
    </>
  );
}
