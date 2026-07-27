/**
 * Placeholder guards.
 *
 * `src/content/site.ts` ships with `TODO:`-prefixed values for the contact and
 * legal details that the owner still has to supply. Those values must:
 *   • render visibly marked in the UI (so nobody mistakes them for real data);
 *   • never end up in structured data, sitemaps or mailto/tel links.
 *
 * Some fields are fake without carrying the prefix (`contact.phoneHref` is
 * `tel:+310000000000`), so the phone number is judged by its display value and
 * the address is judged as a whole block.
 */

import { contact, legal } from '@/content/site';

const PREFIX = 'TODO:';

/** True when the value is still an unfilled placeholder. */
export function isPlaceholder(value: string | null | undefined): boolean {
  return typeof value === 'string' && value.trimStart().startsWith(PREFIX);
}

/** The value without its `TODO:` marker, for display purposes. */
export function stripPlaceholder(value: string): string {
  return isPlaceholder(value) ? value.trimStart().slice(PREFIX.length).trim() : value;
}

/** Returns the value only when it is real; otherwise `undefined`. */
export function realValue(value: string | null | undefined): string | undefined {
  if (typeof value !== 'string' || value.length === 0 || isPlaceholder(value)) {
    return undefined;
  }
  return value;
}

/** The phone number is only usable if its *display* value is real. */
export function realPhone(): { display: string; href: string } | undefined {
  const display = realValue(contact.phoneDisplay);
  if (display === undefined) return undefined;
  return { display, href: contact.phoneHref };
}

/** The e-mail address, only when real. */
export function realEmail(): string | undefined {
  return realValue(contact.email);
}

/**
 * The postal address, only when street, postcode *and* city are all real.
 * A PostalAddress holding nothing but `"addressCountry": "Nederland"` is worse
 * than no address node at all.
 */
export function realAddress():
  | { street: string; postalCode: string; city: string; country: string }
  | undefined {
  const street = realValue(contact.address.street);
  const postalCode = realValue(contact.address.postalCode);
  const city = realValue(contact.address.city);
  if (street === undefined || postalCode === undefined || city === undefined) {
    return undefined;
  }
  return { street, postalCode, city, country: contact.address.country };
}

/** KvK / BTW, only when real. */
export function realKvk(): string | undefined {
  return realValue(legal.kvk);
}

export function realBtw(): string | undefined {
  return realValue(legal.btw);
}
