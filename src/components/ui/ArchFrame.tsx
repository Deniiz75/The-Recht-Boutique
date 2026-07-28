import type { ReactNode } from 'react';

type ArchFrameProps = {
  /** Caption set along the bottom of the arch. */
  caption?: string;
  /** Optional content rendered inside the arch, above the engraving. */
  children?: ReactNode;
  /** Aspect ratio of the frame, e.g. `4 / 5`. */
  ratio?: string;
  className?: string;
};

/**
 * The signature arch: a rounded-top panel filled with a layered ink gradient,
 * fine engraved hairlines and a receding arcade of nested arch outlines.
 * Entirely CSS/SVG — the site uses no photography.
 */
export function ArchFrame({
  caption,
  children,
  ratio = '4 / 5',
  className,
}: ArchFrameProps) {
  return (
    <div
      className={`arch arch-fill engrave relative isolate overflow-hidden ${className ?? ''}`}
      style={{ aspectRatio: ratio }}
    >
      {/* Receding arcade — the arch motif repeated inward. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[7%] border border-surface/35"
        style={{ borderRadius: '220px 220px 0 0' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[15%] border border-white/15"
        style={{ borderRadius: '180px 180px 0 0' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[24%] border border-white/10"
        style={{ borderRadius: '140px 140px 0 0' }}
      />

      {/* Keystone hairline dropping from the crown. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[7%] left-1/2 h-[46%] w-px -translate-x-1/2 bg-linear-to-b from-surface/50 to-transparent"
      />

      {children ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          {children}
        </div>
      ) : null}

      {caption ? (
        <p className="absolute inset-x-0 bottom-6 z-10 px-6 text-center font-sans text-[0.6875rem] font-medium tracking-[0.1em] text-surface uppercase">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
