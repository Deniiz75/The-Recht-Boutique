import { about } from '@/content/site';

/**
 * Portrait frame stands in for the reference build's `/foto-profiel.jpg`,
 * which was a stock photograph of an identifiable person presented as the
 * firm's lawyer. Built from type and CSS so it needs no image rights and
 * makes no claim about who is pictured — replace with a real photograph of
 * the actual jurist when one exists.
 */
function PortraitFrame() {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] border border-rose/10 bg-cream-dark">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.5)_0%,transparent_60%)]"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-5 px-8 text-center">
        <svg
          aria-hidden="true"
          viewBox="0 0 64 64"
          className="h-16 w-16 text-rose"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M32 14v38" />
          <path d="M13 21h38" />
          <path d="M22 55h20" />
          <path d="M6 37l7-16 7 16" />
          <path d="M44 37l7-16 7 16" />
          <circle cx="32" cy="12" r="3" fill="currentColor" stroke="none" />
        </svg>
        <p className="font-serif text-[1.6rem] leading-tight font-semibold text-rose">
          The Recht <span className="font-normal italic">Boutique</span>
        </p>
        <p className="text-[0.8rem] font-medium tracking-[0.2em] text-text-medium uppercase">
          Amsterdam
        </p>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-3 -bottom-3 -z-10 h-[120px] w-[120px] rounded-[20px] bg-rose-soft"
      />
    </div>
  );
}

export function About() {
  return (
    <section id="over" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="grid grid-cols-[400px_1fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-10">
          <div className="reveal max-lg:mx-auto max-lg:max-w-[340px]">
            <PortraitFrame />
          </div>

          <div className="reveal">
            <p className="mb-3 text-[0.8rem] font-semibold tracking-[3px] text-rose-light uppercase">
              {about.eyebrow}
            </p>
            <h2 className="mb-5 font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-rose">
              {about.title}
            </h2>
            <p className="mb-6 font-serif text-[1.15rem] leading-relaxed text-rose italic">
              {about.quote}
            </p>

            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-[0.97rem] text-text-medium">
                {paragraph}
              </p>
            ))}

            <ul className="mt-7 flex flex-wrap gap-3">
              {about.badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-rose/12 bg-rose-soft px-4 py-2 text-[0.82rem] font-semibold text-rose"
                >
                  <span aria-hidden="true">✓</span>
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
