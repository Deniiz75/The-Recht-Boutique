import { Container } from '@/components/ui/Container';

/**
 * A typographic value strip. These are the four qualities the firm's own
 * description already commits to — no metrics, no claims, no endorsements.
 */
const values = ['Vertrouwelijk', 'Persoonlijk', 'Helder', 'Strategisch'] as const;

export function TrustBar() {
  return (
    <section aria-labelledby="waarden-titel" className="on-dark bg-ink text-paper">
      <Container>
        <h2 id="waarden-titel" className="sr-only">
          Waar wij voor staan
        </h2>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 py-8 sm:gap-x-14 lg:py-10">
          {values.map((value, index) => (
            <li key={value} className="flex items-center gap-8 sm:gap-14">
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-1.5 w-1.5 rotate-45 bg-gold sm:block"
                />
              ) : null}
              <span className="font-display text-xl text-paper italic sm:text-2xl">
                {value}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
