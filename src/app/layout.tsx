import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
  /* Matches the cream the fixed header is tinted with. */
  themeColor: '#e3caab',
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream">
        <a
          href="#hoofdinhoud"
          className="sr-only text-sm font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-rose focus:px-5 focus:text-white"
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
