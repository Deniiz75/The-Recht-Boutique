import Link from 'next/link';
import { nav } from '@/content/site';
import { MobileMenu } from '@/components/MobileMenu';

/**
 * Fixed translucent header.
 *
 * The blur sits on a dedicated layer rather than on `<header>` itself.
 * `backdrop-filter` makes an element the containing block for any fixed
 * descendant, so putting it on the header would clip the mobile menu's
 * full-screen panel to the height of the bar. Keeping it on a sibling of the
 * nav leaves the panel anchored to the viewport.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rose/10">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cream/92 backdrop-blur-xl"
      />

      <nav
        aria-label="Hoofdnavigatie"
        className="mx-auto flex max-w-[1340px] items-center justify-between gap-4 px-6 py-4"
      >
        <Link
          href="/"
          className="font-serif text-[1.4rem] font-bold tracking-tight text-rose"
        >
          The Recht <span className="font-normal text-text-medium">Boutique</span>
        </Link>

        <ul className="flex items-center gap-9 max-lg:hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="nav-link text-[0.9rem] font-medium text-text-medium transition-colors duration-300 hover:text-rose"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rose px-6 py-2.5 text-[0.85rem] font-semibold text-white shadow-[0_4px_20px_rgba(207,0,68,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-dark"
            >
              Gratis kennismaking
            </Link>
          </li>
        </ul>

        <MobileMenu />
      </nav>
    </header>
  );
}
