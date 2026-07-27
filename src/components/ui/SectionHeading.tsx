import type { ReactNode } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';

type SectionHeadingProps = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: 'onLight' | 'onDark';
  align?: 'start' | 'center';
  className?: string;
};

/** Eyebrow + display heading + optional lead, used to open every section. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  intro,
  tone = 'onLight',
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
        className={`mt-6 font-display text-title ${tone === 'onDark' ? 'text-white' : 'text-text-dark'}`}
      >
        {title}
      </h2>
      {intro ? (
        <div
          className={`mt-5 text-lead ${tone === 'onDark' ? 'text-white/75' : 'text-text-medium'}`}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}
