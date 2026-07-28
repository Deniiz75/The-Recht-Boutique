import { isPlaceholder, stripPlaceholder } from '@/lib/placeholder';

type DataValueProps = {
  /** Raw value from `site.ts`, possibly still `TODO:`-prefixed. */
  value: string;
  className?: string;
  /**
   * `marked` (default) draws the dashed outline and pencil, so a placeholder
   * cannot be mistaken for genuine firm data.
   *
   * `plain` renders the value as ordinary text in the surrounding font and
   * size. Used in the footer, where the marker repeats on every page and reads
   * as visual noise rather than as information. The `title` and the screen
   * reader suffix stay in both variants — they carry the same warning without
   * costing anything visually, so a placeholder is never silently unmarked.
   */
  variant?: 'marked' | 'plain';
};

const MARK_TITLE = 'Placeholder — deze gegevens worden vóór livegang ingevuld.';

/** Screen reader suffix, identical across variants. */
function Note() {
  return <span className="sr-only"> (nog in te vullen)</span>;
}

/**
 * Renders a content value. Real values render plainly; unfilled `TODO:` values
 * render marked, unless the caller asks for the `plain` variant.
 */
export function DataValue({ value, className, variant = 'marked' }: DataValueProps) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>;
  }

  if (variant === 'plain') {
    return (
      <span className={className} title={MARK_TITLE}>
        {stripPlaceholder(value)}
        <Note />
      </span>
    );
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
      <Note />
    </span>
  );
}

/**
 * Same as `DataValue`, but tuned for dark (ink) surfaces where the bronze
 * accent would not carry enough contrast.
 */
export function DataValueOnInk({ value, className, variant = 'marked' }: DataValueProps) {
  if (!isPlaceholder(value)) {
    return <span className={className}>{value}</span>;
  }

  if (variant === 'plain') {
    return (
      <span className={className} title={MARK_TITLE}>
        {stripPlaceholder(value)}
        <Note />
      </span>
    );
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
      <Note />
    </span>
  );
}
