import type { ReactNode } from 'react';

type EyebrowProps = {
  children: ReactNode;
  /** Two-digit section index, set in mono on the hairline. */
  index?: string;
  tone?: 'ink' | 'paper';
  className?: string;
  as?: 'p' | 'span' | 'div';
};

/**
 * Mono, uppercase, letterspaced section label preceded by a short rule —
 * the recurring "eyebrow" of the identity.
 */
export function Eyebrow({
  children,
  index,
  tone = 'ink',
  className,
  as: Tag = 'p',
}: EyebrowProps) {
  const color = tone === 'paper' ? 'text-gold' : 'text-rust-deep';
  const ruleColor = tone === 'paper' ? 'bg-gold/60' : 'bg-rust/70';

  return (
    <Tag
      className={`flex items-center gap-3 font-mono text-eyebrow uppercase ${color} ${className ?? ''}`}
    >
      <span aria-hidden="true" className={`block h-px w-8 shrink-0 ${ruleColor}`} />
      {index ? (
        <span aria-hidden="true" className="tabular-nums opacity-70">
          {index}
        </span>
      ) : null}
      <span>{children}</span>
    </Tag>
  );
}
