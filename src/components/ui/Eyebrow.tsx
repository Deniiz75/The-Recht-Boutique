import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  /** Two-digit section index, set on the hairline before the label. */
  index?: string;
  tone?: 'onLight' | 'onSurface' | 'onDark';
  className?: string;
  as?: 'p' | 'span' | 'div';
};

/**
 * Uppercase, letterspaced section label preceded by a short rule — the
 * recurring "eyebrow" of the identity.
 *
 * Set in the body sans, not mono. The eyebrow renders both the hero's
 * `— JURIDISCH ADVIESBUREAU` and the `01`/`02`/`03` labels further down the
 * same page, so it cannot be mono in one place and sans in the other. Weight
 * goes to medium because sans at 11px uppercase is lighter than DM Mono was.
 *
 * The eyebrow is 11px, so it owes 4.5:1, and that is why there are three
 * tones rather than two:
 *   onLight   — the canvas. accent is 5.68:1 there.
 *   onSurface — a cream card or band. accent is only 3.72:1 on cream, so the
 *               eyebrow switches to ink (9.94:1). Using `onLight` on a cream
 *               surface is an AA failure, not a style preference.
 *   onDark    — a navy panel. cream on ink is 9.94:1.
 * The index numeral is only dimmed on dark, where cream at 70% is still
 * 5.22:1; dimming accent on a light surface would drop it under 4.5.
 */
export function Eyebrow({
  children,
  index,
  tone = 'onLight',
  className,
  as: Tag = 'p',
}: EyebrowProps) {
  const onDark = tone === 'onDark';
  const color =
    onDark ? 'text-surface' : tone === 'onSurface' ? 'text-ink' : 'text-accent';
  const ruleColor =
    onDark ? 'bg-surface/60' : tone === 'onSurface' ? 'bg-ink/45' : 'bg-gold/90';

  return (
    <Tag
      className={`flex items-center gap-3 font-sans text-eyebrow font-medium uppercase ${color} ${className ?? ''}`}
    >
      <span aria-hidden="true" className={`block h-px w-8 shrink-0 ${ruleColor}`} />
      {index ? (
        <span
          aria-hidden="true"
          className={`tabular-nums ${onDark ? 'opacity-70' : ''}`}
        >
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
