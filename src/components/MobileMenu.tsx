'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { nav } from '@/content/site';
import { realEmail } from '@/lib/placeholder';
import { DataValueOnInk } from '@/components/ui/DataValue';
import { contact } from '@/content/site';

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Mobile navigation as a real disclosure: `aria-expanded` / `aria-controls`,
 * Escape to close, focus trapped inside the panel, focus returned to the
 * trigger on close and the page behind it locked from scrolling.
 */
export function MobileMenu() {
  const panelId = `mobile-menu-${useId().replace(/:/g, '')}`;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  /* The menu is open *for a specific route*. A navigation therefore closes it
     without needing an effect that sets state. */
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor !== null && openFor === pathname;
  const setOpen = (next: boolean) => setOpenFor(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0,
      );

    getFocusable()[0]?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenFor(null);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !panel.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (trigger && document.body.contains(trigger)) {
        trigger.focus();
      }
    };
  }, [open]);

  const email = realEmail();

  /* Every link closes the panel explicitly. The route-based close above only
     fires when the pathname changes, and on a one-pager the nav is entirely
     same-page anchors — without this the menu stays open over the section it
     just scrolled to. */
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'Menu sluiten' : 'Menu openen'}
        onClick={() => setOpen(!open)}
        className="relative z-[1001] inline-flex h-11 w-11 items-center justify-center rounded-full text-rose transition-colors hover:bg-rose-soft"
      >
        {open ? (
          <X aria-hidden="true" className="h-6 w-6" />
        ) : (
          <Menu aria-hidden="true" className="h-6 w-6" />
        )}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Hoofdmenu"
        className="fixed inset-0 z-[999] flex flex-col overflow-y-auto bg-cream px-6 pt-6 pb-12"
      >
        <div className="flex items-center justify-between">
          <span className="font-serif text-[1.3rem] font-bold text-rose">
            The Recht <span className="font-normal text-text-medium">Boutique</span>
          </span>
          <button
            type="button"
            onClick={close}
            aria-label="Menu sluiten"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-rose transition-colors hover:bg-rose-soft"
          >
            <X aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <nav
          aria-label="Hoofdnavigatie (mobiel)"
          className="flex flex-1 flex-col justify-center"
        >
          <ul className="flex flex-col items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="font-serif text-[1.6rem] font-semibold text-text-medium transition-colors hover:text-rose"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/#contact"
                onClick={close}
                className="inline-flex min-h-12 items-center rounded-full bg-rose px-7 py-3 text-[0.9rem] font-semibold text-white shadow-[0_4px_20px_rgba(207,0,68,0.35)] transition-colors hover:bg-rose-dark"
              >
                Gratis kennismaking
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto border-t border-rose/12 pt-8 text-center">
          <p className="text-[0.8rem] font-semibold tracking-[3px] text-rose-dark uppercase">
            Direct contact
          </p>
          <div className="mt-4 flex flex-col gap-2 text-text-medium">
            {email ? (
              <a
                href={`mailto:${email}`}
                className="link-rule mx-auto w-fit py-1 text-lg"
              >
                {email}
              </a>
            ) : (
              <DataValueOnInk value={contact.email} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
