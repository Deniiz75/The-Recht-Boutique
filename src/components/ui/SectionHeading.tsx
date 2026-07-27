import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';

type SectionHeadingProps = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'ink' | 'paper';
  align?: 'start' | 'center';
  className?: string;
};

/** Eyebrow + display heading + optional lead, used to open every section. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  tone = 'ink',
  align = 'start',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={`reveal ${align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className ?? ''}`}
    >
      <Eyebrow
        index={index}
        tone={tone}
        className={align === 'center' ? 'justify-center' : undefined}
      >
        {eyebrow}
      </Eyebrow>
      <h2
        className={`mt-6 font-display text-title ${tone === 'paper' ? 'text-paper' : 'text-ink-deep'}`}
      >
        {title}
      </h2>
      {intro ? (
        <div
          className={`mt-5 text-lead ${tone === 'paper' ? 'text-paper/75' : 'text-muted'}`}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
