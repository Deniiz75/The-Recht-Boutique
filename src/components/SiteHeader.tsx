import Link from 'next/link';
import { nav } from '@/content/site';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/Logo';
import { MobileMenu } from '@/components/MobileMenu';

export function SiteHeader() {
  return (
    /* Solid background on purpose: a backdrop-filter here would become the
       containing block for the mobile menu's `position: fixed` panel and clip
       it to the header's height. */
    <header className="sticky top-0 z-50 border-b border-gold/50 bg-surface">
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-4 lg:h-24">
          <Logo uid="header" />

          <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-rule-in flex h-11 items-center px-3 font-mono text-[0.6875rem] tracking-[0.18em] text-ink uppercase"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="btn btn-primary min-h-11 px-6 py-3 text-[0.6875rem]"
            >
              Contact opnemen
            </Link>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
