import type { Metadata, Viewport } from 'next';
import { DM_Mono, Manrope, Playfair_Display } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/jsonld';
import { OG_IMAGE } from '@/lib/metadata';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const defaultTitle = `${site.name} — ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  category: 'Juridische dienstverlening',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    images: OG_IMAGE,
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: site.description,
    images: OG_IMAGE,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#123d36',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={site.lang}
      className={`${playfair.variable} ${manrope.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper">
        <a
          href="#hoofdinhoud"
          className="sr-only font-mono text-xs tracking-[0.18em] uppercase focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:inline-flex focus:min-h-11 focus:items-center focus:border focus:border-ink focus:bg-paper focus:px-4 focus:text-ink"
        >
          Direct naar de inhoud
        </a>
        <SiteHeader />
        <main id="hoofdinhoud" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={organizationJsonLd()} id="ld-organisatie" />
        <JsonLd data={websiteJsonLd()} id="ld-website" />
      </body>
    </html>
  );
}
