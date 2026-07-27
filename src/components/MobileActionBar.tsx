'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Phone } from 'lucide-react';

import { realPhone } from '@/lib/placeholder';

/**
 * Sticky action bar for small screens.
 *
 * Two things it deliberately does not do:
 *
 * 1. It never renders a `tel:` link while `contact.phoneDisplay` is still a
 *    `TODO:` placeholder. `contact.phoneHref` is `tel:+310000000000`, which
 *    would dial a real-looking but wrong number — worse than offering no call
 *    action at all. Until the owner fills in the number the bar shows a single
 *    full-width message action, and the call button appears on its own once
 *    the number is real.
 *
 * 2. It does not appear on /contact, where the form is already the page, and
 *    it links to the in-page form (`#contact`) on the home page rather than
 *    navigating away from a form the visitor can already see.
 */
export function MobileActionBar() {
  const pathname = usePathname();
  const phone = realPhone();

  if (pathname === '/contact') return null;

  const messageHref = pathname === '/' ? '#contact' : '/contact';

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rose/20 bg-canvas/95 backdrop-blur-sm sm:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav aria-label="Snelle acties" className="flex items-stretch gap-px">
        {phone ? (
          <a
            href={phone.href}
            className="flex min-h-14 flex-1 items-center justify-center gap-2.5 border-r border-rose/15 font-mono text-[0.6875rem] tracking-[0.16em] text-text-dark uppercase transition-colors hover:text-rose-dark"
          >
            <Phone aria-hidden="true" className="h-4 w-4 text-rose-dark" />
            Bellen
          </a>
        ) : null}

        <Link
          href={messageHref}
          className="flex min-h-14 flex-1 items-center justify-center gap-2.5 bg-rose font-mono text-[0.6875rem] tracking-[0.16em] text-white uppercase transition-colors hover:bg-rose-dark"
        >
          <MessageSquare aria-hidden="true" className="h-4 w-4" />
          Bericht
        </Link>
      </nav>
    </div>
  );
}
