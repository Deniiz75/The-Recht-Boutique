import { isPlaceholder, stripPlaceholder } from '@/lib/placeholder';

type DataValueProps = {
  /** Raw value from `site.ts`, possibly still `TODO:`-prefixed. */
  value: string;
  className?: string;
};

const MARK_TITLE = 'Placeholder — deze gegevens worden vóór livegang ingevuld.';

/**
 * Renders a content value. Real values render plainly; unfilled `TODO:` values
 * render inside a dashed outline with an explanatory `title`, so a placeholder
 * can never be mistaken for genuine firm data.
 */
export function DataValue({ value, className }: DataValueProps) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-dashed border-accent/70 px-1.5 py-px font-mono text-[0.82em] text-accent ${className ?? ''}`}
      title={MARK_TITLE}
    >
      <span aria-hidden="true" className="text-[0.85em] opacity-70">
        ✎
      </span>
      {stripPlaceholder(value)}
      <span className="sr-only"> (nog in te vullen)</span>
    </span>
  );
}

/**
 * Same as `DataValue`, but tuned for dark (ink) surfaces where the rust accent
 * would not carry enough contrast.
 */
export function DataValueOnInk({ value, className }: DataValueProps) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 border border-dashed border-surface/70 px-1.5 py-px font-mono text-[0.82em] text-surface ${className ?? ''}`}
      title={MARK_TITLE}
    >
      <span aria-hidden="true" className="text-[0.85em] opacity-70">
        ✎
      </span>
      {stripPlaceholder(value)}
      <span className="sr-only"> (nog in te vullen)</span>
    </span>
  );
}
