import type { Metadata } from 'next';
import { site } from '@/content/site';

/**
 * The generated OG image. It has to be referenced explicitly on every page:
 * a page-level `openGraph` object replaces the one it inherits, which would
 * otherwise drop the file-convention image from all interior routes.
 */
export const OG_IMAGE = [
  {
    url: '/opengraph-image',
    width: 1200,
    height: 630,
    alt: `${site.name} — ${site.tagline}`,
  },
];

type PageMetadataInput = {
  /** Page title without the site-name suffix; the layout template adds it. */
  title: string;
  description: string;
  /** Absolute path, used for the canonical URL and og:url. */
  path: string;
  /** Full title used in social cards, where no template is applied. */
  socialTitle?: string;
  type?: 'website' | 'article';
};

/** Builds a complete, self-contained metadata object for a page. */
export function pageMetadata({
  title,
  description,
  path,
  socialTitle,
  type = 'website',
}: PageMetadataInput): Metadata {
  const social = socialTitle ?? `${title} · ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: social,
      description,
      images: OG_IMAGE,
    },
    twitter: {
      card: 'summary_large_image',
      title: social,
      description,
      images: OG_IMAGE,
    },
  };
}
