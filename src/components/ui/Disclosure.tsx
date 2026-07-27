import { ChevronRight } from 'lucide-react';

type DisclosureProps = {
  question: string;
  answer: string;
  index: string;
};

/**
 * Native `<details>` disclosure — works with JavaScript disabled and is
 * announced correctly by screen readers without any ARIA plumbing.
 */
export function Disclosure({ question, answer, index }: DisclosureProps) {
  return (
    <details className="disclosure group border-b border-rose/12">
      <summary className="flex min-h-14 items-baseline gap-4 py-5 pr-2 text-text-dark transition-colors hover:text-rose-dark">
        <span
          aria-hidden="true"
          className="font-mono text-[0.6875rem] tracking-[0.2em] text-rose tabular-nums"
        >
          {index}
        </span>
        <span className="flex-1 font-display text-[1.1875rem] leading-snug sm:text-[1.3125rem]">
          {question}
        </span>
        <ChevronRight
          aria-hidden="true"
          className="disclosure-sign mt-1 h-4 w-4 shrink-0 text-rose transition-transform duration-300"
        />
      </summary>
      <div className="pr-6 pb-7 pl-9 text-[0.9375rem] leading-relaxed text-text-medium">
        <p className="max-w-2xl">{answer}</p>
      </div>
    </details>
  );
}
