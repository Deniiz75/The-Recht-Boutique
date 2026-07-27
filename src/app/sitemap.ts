import type { MetadataRoute } from 'next';
import { services, site } from '@/content/site';

const staticRoutes = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/over-ons', priority: 0.8, changeFrequency: 'yearly' },
  { path: '/diensten', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/werkwijze', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/veelgestelde-vragen', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/privacyverklaring', priority: 0.3, changeFrequency: 'yearly' },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path === '/' ? '' : route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: `${site.url}/diensten/${service.slug}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
