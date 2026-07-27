import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Rendered above the eyebrow — used for breadcrumbs. */
  above?: ReactNode;
  /** Rendered beneath the lead — used for buttons or meta rows. */
  children?: ReactNode;
};

/** The opening masthead of every interior page. */
export function PageHeader({ eyebrow, title, lead, above, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      {/* Faint arch outline anchoring the masthead. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-0 hidden h-[22rem] w-[19rem] border border-line lg:block"
        style={{ borderRadius: '260px 260px 0 0' }}
      />
      <Container>
        <div className="relative py-14 lg:py-20">
          {above}
          <Eyebrow className="rise">{eyebrow}</Eyebrow>
          <h1
            className="rise mt-6 max-w-4xl font-display text-title"
            style={{ animationDelay: '80ms' }}
          >
            {title}
          </h1>
          {lead ? (
            <div
              className="rise mt-6 max-w-2xl text-lead text-muted"
              style={{ animationDelay: '160ms' }}
            >
              {lead}
            </div>
          ) : null}
          {children ? (
            <div className="rise mt-9" style={{ animationDelay: '240ms' }}>
              {children}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
