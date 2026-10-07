import Link from 'next/link';
import { footerIntro, legal, services, site } from '@/content/site';

const quickLinks = [
  { href: '/#waarom', label: 'Over ons' },
  { href: '/#werkwijze', label: 'Werkwijze' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/#contact', label: 'Contact' },
  { href: '/veelgestelde-vragen', label: 'Veelgestelde vragen' },
  { href: '/privacyverklaring', label: 'Privacyverklaring' },
] as const;

/**
 * Contrast on the near-black footer, measured against #2d2a26:
 *   white/60  6.22:1  body and links
 *   white/55  5.46:1  column labels — the reference build's white/40 is
 *                     3.66:1, under AA for an 0.8rem label
 *   cream     9.04:1  link hover; rose-light is only 3.29:1, which a 0.9rem
 *                     link may not drop to
 *   rose-light 3.29:1 the wordmark only, at 1.3rem bold, where 3:1 applies
 */
export function SiteFooter() {
  return (
    <footer className="on-dark bg-text-dark pt-16 pb-8 text-white/60">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="mb-12 grid grid-cols-[2fr_1fr_1fr] gap-12 max-lg:grid-cols-1">
          <div>
            <Link
              href="/"
              className="mb-4 inline-block font-serif text-[1.3rem] font-bold text-rose-light"
            >
              The Recht <span className="font-normal">Boutique</span>
            </Link>
            <p className="max-w-[320px] text-[0.9rem] leading-relaxed">{footerIntro}</p>
          </div>

          <div>
            <h2 className="mb-5 text-[0.8rem] font-semibold tracking-widest text-white/55 uppercase">
              Diensten
            </h2>
            <ul className="list-none">
              {services.map((service) => (
                <li key={service.slug} className="mb-3">
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="text-[0.9rem] text-white/60 transition-colors duration-300 hover:text-cream"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-5 text-[0.8rem] font-semibold tracking-widest text-white/55 uppercase">
              Snelle links
            </h2>
            <ul className="list-none">
              {quickLinks.map((link) => (
                <li key={link.href} className="mb-3">
                  <Link
                    href={link.href}
                    className="text-[0.9rem] text-white/60 transition-colors duration-300 hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-7 text-[0.82rem] max-sm:flex-col max-sm:gap-3 max-sm:text-center">
          <span>
            © {new Date().getFullYear()} {site.name}. Alle rechten voorbehouden.
          </span>
          <span>
            KvK: {legal.kvk} | BTW: {legal.btw}
          </span>
        </div>
      </div>
    </footer>
  );
}
