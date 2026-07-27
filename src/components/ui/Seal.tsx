import { Scale } from 'lucide-react';

type SealProps = {
  /** Rendered diameter in CSS pixels. */
  size?: number;
  tone?: 'ink' | 'paper' | 'gold';
  /** Unique suffix for the internal SVG path id — required when more than one
   *  seal appears on the same page. */
  uid?: string;
  className?: string;
};

const LEGEND = 'THE RECHT BOUTIQUE · JURIDISCH ADVIES · ';

const tones = {
  ink: {
    surface: 'var(--color-ink-deep)',
    ring: 'color-mix(in oklab, var(--color-gold) 70%, transparent)',
    hair: 'color-mix(in oklab, var(--color-gold) 40%, transparent)',
    text: 'var(--color-gold)',
    icon: 'text-gold',
  },
  paper: {
    surface: 'var(--color-paper)',
    ring: 'var(--color-ink)',
    hair: 'color-mix(in oklab, var(--color-ink) 35%, transparent)',
    text: 'var(--color-ink)',
    icon: 'text-ink',
  },
  gold: {
    surface: 'var(--color-sand)',
    ring: 'var(--color-ink-deep)',
    hair: 'color-mix(in oklab, var(--color-ink-deep) 35%, transparent)',
    text: 'var(--color-ink-deep)',
    icon: 'text-ink-deep',
  },
} as const;

/**
 * The house seal: a circular badge with the scales mark and the firm's name
 * set on a circular baseline. Decorative — the firm name is already in the
 * page's text, so it is hidden from assistive technology.
 */
export function Seal({ size = 116, tone = 'ink', uid = 'seal', className }: SealProps) {
  const t = tones[tone];
  const pathId = `seal-path-${uid}`;

  return (
    <div
      aria-hidden="true"
      className={`relative shrink-0 rounded-full select-none ${className ?? ''}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id={pathId}
            fill="none"
            d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0"
          />
        </defs>
        <circle cx="60" cy="60" r="59" fill={t.surface} stroke={t.ring} strokeWidth="1" />
        <circle cx="60" cy="60" r="36.5" fill="none" stroke={t.hair} strokeWidth="0.75" />
        <circle
          cx="60"
          cy="60"
          r="34"
          fill="none"
          stroke={t.hair}
          strokeWidth="0.5"
          strokeDasharray="1 3"
        />
        <text
          fill={t.text}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 7.6, fontWeight: 500 }}
        >
          <textPath href={`#${pathId}`} startOffset="0" textLength="282" lengthAdjust="spacing">
            {LEGEND}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <Scale
          className={t.icon}
          strokeWidth={1.1}
          style={{ width: size * 0.3, height: size * 0.3 }}
        />
      </span>
    </div>
  );
}
