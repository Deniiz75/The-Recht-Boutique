import { reviews } from '@/content/site';

/**
 * Client testimonials.
 *
 * These may only ship while they are genuinely attributable — see the notice
 * at the top of `content/site.ts`. Marked up as `<figure>`/`<blockquote>`
 * with the attribution in `<figcaption>` so the quote and its author stay
 * associated, and the star row carries a text alternative rather than
 * leaving five bare glyphs to a screen reader.
 */
export function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="reveal mx-auto mb-16 max-w-[600px] text-center">
          <p className="mb-3 text-[0.8rem] font-semibold tracking-[3px] text-rose-light uppercase">
            Wat cliënten zeggen
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-rose">
            Vertrouwd door ondernemers en particulieren
          </h2>
        </div>

        <ul className="grid grid-cols-3 gap-7 max-lg:grid-cols-1">
          {reviews.map((review) => (
            <li key={review.initials} className="reveal">
              <figure className="relative m-0 h-full rounded-xl border border-rose/8 bg-cream p-9">
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-7 font-serif text-[4rem] leading-none text-rose-light opacity-30"
                >
                  “
                </span>

                <p className="mb-4 text-[0.85rem] tracking-widest text-rose">
                  <span aria-hidden="true">★★★★★</span>
                  <span className="sr-only">5 van de 5 sterren</span>
                </p>

                <blockquote className="relative z-10 mb-5 pt-2 text-[0.95rem] leading-relaxed text-text-medium">
                  {review.text}
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-rose-light to-rose text-[0.9rem] font-semibold text-white"
                  >
                    {review.initials}
                  </span>
                  <span>
                    <strong className="block text-[0.9rem] text-text-dark">
                      {review.name}
                    </strong>
                    <span className="text-[0.8rem] text-text-medium">
                      {review.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
