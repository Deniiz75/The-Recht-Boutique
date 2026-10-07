import { trustPoints } from '@/content/site';

/**
 * Reassurance band between the hero and the about section.
 *
 * Labels are text-dark, not the reference build's text-light: on the
 * cream-dark band that measures 2.01:1, which is not readable text by any
 * standard. Size, weight and spacing are unchanged.
 */
export function TrustStrip() {
  return (
    <div className="border-y border-rose/8 bg-cream-dark py-10">
      <div className="mx-auto max-w-[1340px] px-6">
        <ul className="flex flex-wrap items-center justify-center gap-12 max-sm:gap-6">
          {trustPoints.map((point) => (
            <li
              key={point}
              className="flex items-center gap-2.5 text-[0.85rem] font-medium text-text-dark"
            >
              <span aria-hidden="true" className="text-[1.2rem] text-rose">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
