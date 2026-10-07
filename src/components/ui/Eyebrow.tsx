import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  /** Two-digit section index, set before the label. */
  index?: string;
  tone?: 'onLight' | 'onSurface' | 'onDark';
  className?: string;
  as?: 'p' | 'span' | 'div';
};

/**
 * Small letterspaced section label.
 *
 * At 0.8rem this is small text and owes 4.5:1, which decides the tint per
 * ground:
 *   onSurface — white card or band. rose-light, 4.47:1.
 *   onLight   — the cream canvas. rose-light drops to 2.83:1 there and rose
 *               to 3.56:1, so this steps down to rose-dark at 5.12:1. The
 *               reference build uses rose-light on both and is unreadable on
 *               the cream sections.
 *   onDark    — the near-black footer or panel. cream, 9.04:1.
 */
export function Eyebrow({
  children,
  index,
  tone = 'onLight',
  className,
  as: Tag = 'p',
}: EyebrowProps) {
  const color =
    tone === 'onDark'
      ? 'text-cream'
      : tone === 'onSurface'
        ? 'text-rose-light'
        : 'text-rose-dark';

  return (
    <Tag
      className={`text-[0.8rem] font-semibold tracking-[3px] uppercase ${color} ${className ?? ''}`}
    >
      {index ? (
        <span aria-hidden="true" className="tabular-nums">
          {index}
          {'\u2002'}
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
