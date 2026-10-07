import { hero, stats } from '@/content/site';

/**
 * Opening screen: eyebrow pill, display headline, lead, two actions and the
 * three key figures.
 *
 * The figure labels are text-medium rather than the reference build's
 * text-light. At 0.85rem on cream, text-light measures 2.35:1 — unreadable
 * and well under AA. text-medium is 4.54:1 and, at this size and weight,
 * visually indistinguishable.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="hero-section relative flex min-h-screen items-center overflow-hidden pt-[120px] pb-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[200px] -right-[200px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(207,0,68,0.06)_0%,transparent_70%)]"
      />

      {/* No `w-full`: as a flex item this shrinks to its content, and `mx-auto`
          then centres the 640px column in the viewport. That is how the
          reference build positions the hero. */}
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="relative z-10 max-w-[640px]">
          <p className="rise mb-7 inline-flex items-center gap-2 rounded-full border border-rose/15 bg-rose-soft px-5 py-2 text-[0.8rem] font-semibold text-rose before:text-[0.6rem] before:content-['◆']">
            {hero.badge}
          </p>

          <h1 className="rise mb-6 font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-[1.25] font-semibold text-rose">
            {hero.titleBefore}
            <em className="text-rose-light italic">{hero.titleEmphasis}</em>
            {hero.titleAfter}
          </h1>

          <p className="rise mb-10 max-w-[520px] text-[1.15rem] leading-relaxed text-text-medium">
            {hero.lead}
          </p>

          <div className="rise flex flex-wrap gap-4 max-sm:flex-col">
            <a href="#contact" className="btn btn-primary">
              Plan een gratis gesprek <span aria-hidden="true">→</span>
            </a>
            <a href="#diensten" className="btn btn-outline">
              Bekijk onze diensten
            </a>
          </div>

          <dl className="mt-16 flex gap-12 border-t border-rose/12 pt-10 max-sm:flex-col max-sm:gap-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <strong className="block font-serif text-[2.2rem] font-bold text-rose">
                    {stat.value}
                  </strong>
                  <span
                    aria-hidden="true"
                    className="text-[0.85rem] font-medium text-text-medium"
                  >
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
