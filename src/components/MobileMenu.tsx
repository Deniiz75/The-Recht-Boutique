'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { nav } from '@/content/site';
import { realEmail, realPhone } from '@/lib/placeholder';
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

  const phone = realPhone();
  const email = realEmail();

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen(!open)}
        className="inline-flex h-11 min-w-11 items-center gap-2 border border-ink px-3 font-mono text-[0.6875rem] tracking-[0.18em] text-ink uppercase transition-colors hover:bg-ink hover:text-white"
      >
        {open ? (
          <X aria-hidden="true" className="h-4 w-4" />
        ) : (
          <Menu aria-hidden="true" className="h-4 w-4" />
        )}
        {open ? 'Sluiten' : 'Menu'}
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Hoofdmenu"
        className="on-dark fixed inset-0 z-100 flex flex-col overflow-y-auto bg-ink px-5 pt-6 pb-12 text-white"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[0.625rem] tracking-[0.28em] text-surface uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 min-w-11 items-center gap-2 border border-white/40 px-3 font-mono text-[0.6875rem] tracking-[0.18em] text-white uppercase transition-colors hover:bg-white hover:text-ink"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Sluiten
          </button>
        </div>

        <nav aria-label="Hoofdnavigatie (mobiel)" className="mt-10">
          <ul className="border-t border-white/15">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-white/15">
                <Link
                  href={item.href}
                  className="flex items-baseline gap-4 py-5 font-display text-[1.75rem] leading-tight text-white transition-colors hover:text-surface"
                >
                  <span
                    aria-hidden="true"
                    className="font-mono text-[0.625rem] tracking-[0.2em] text-surface/70 tabular-nums"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-b border-white/15">
              <Link
                href="/contact"
                className="flex items-baseline gap-4 py-5 font-display text-[1.75rem] leading-tight text-surface"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.625rem] tracking-[0.2em] text-surface/70 tabular-nums"
                >
                  {String(nav.length + 1).padStart(2, '0')}
                </span>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-auto pt-12">
          <p className="font-mono text-[0.625rem] tracking-[0.28em] text-surface uppercase">
            Direct contact
          </p>
          <div className="mt-4 flex flex-col gap-2 text-white/90">
            {phone ? (
              <a href={phone.href} className="link-rule w-fit py-1 text-lg">
                {phone.display}
              </a>
            ) : (
              <DataValueOnInk value={contact.phoneDisplay} />
            )}
            {email ? (
              <a href={`mailto:${email}`} className="link-rule w-fit py-1 text-lg">
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
