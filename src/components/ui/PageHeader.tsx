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
    /* pt clears the fixed site header, which is out of flow. The homepage
       hero handles its own clearance so that it can still fill the viewport. */
    <section className="relative overflow-hidden border-b border-rose/10 bg-cream pt-[70px]">
      {/* Same rose bloom that opens the homepage hero. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-[200px] -right-[200px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(207,0,68,0.06)_0%,transparent_70%)]"
      />
      <Container>
        <div className="relative py-14 lg:py-20">
          {above}
          <Eyebrow className="rise">{eyebrow}</Eyebrow>
          <h1
            className="rise mt-4 max-w-4xl font-serif text-title font-semibold text-rose"
            style={{ animationDelay: '80ms' }}
          >
            {title}
          </h1>
          {lead ? (
            <div
              className="rise mt-6 max-w-2xl text-lead text-text-medium"
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
