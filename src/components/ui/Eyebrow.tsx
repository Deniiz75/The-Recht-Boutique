import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  /** Two-digit section index, set in mono on the hairline. */
  index?: string;
  tone?: 'onLight' | 'onDark';
  className?: string;
  as?: 'p' | 'span' | 'div';
};

/**
 * Mono, uppercase, letterspaced section label preceded by a short rule —
 * the recurring "eyebrow" of the identity.
 *
 * The eyebrow is 11px, so it owes 4.5:1. On light surfaces it is always
 * rose-dark, never rose: the eyebrow lands on white (7.72:1) and on cream
 * cards (4.89:1), and rose on cream is only 3.56:1. On light surfaces the
 * index numeral is not dimmed either — rose-dark at 70% measures 3.46:1 on
 * cream. On dark surfaces cream at 70% is 5.22:1, so the dim stays there.
 */
export function Eyebrow({
  children,
  index,
  tone = 'onLight',
  className,
  as: Tag = 'p',
}: EyebrowProps) {
  const onDark = tone === 'onDark';
  const color = onDark ? 'text-cream' : 'text-rose-dark';
  const ruleColor = onDark ? 'bg-cream/60' : 'bg-rose/70';

  return (
    <Tag
      className={`flex items-center gap-3 font-mono text-eyebrow uppercase ${color} ${className ?? ''}`}
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
