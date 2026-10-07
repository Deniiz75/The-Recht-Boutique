import { principles, pullQuote } from '@/content/site';

export function Why() {
  return (
    <section id="waarom" className="scroll-mt-24 bg-white py-24">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="grid grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-10">
          <figure className="reveal m-0">
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[20px] border border-rose/10 bg-gradient-to-br from-cream to-cream-dark p-15 max-sm:p-10">
              <blockquote className="max-w-[340px] text-center font-serif text-[1.6rem] leading-relaxed text-rose italic before:mb-4 before:block before:text-[4rem] before:leading-[0.5] before:text-rose-light before:content-['\201C']">
                {pullQuote.text}
              </blockquote>
              <figcaption className="mt-6 text-[0.85rem] font-medium text-text-medium">
                {pullQuote.attribution}
              </figcaption>
            </div>
          </figure>

          <div className="reveal">
            <p className="mb-3 text-[0.8rem] font-semibold tracking-[3px] text-rose-light uppercase">
              Waarom The Recht Boutique
            </p>
            <h2 className="mb-10 font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-rose">
              Persoonlijk, betrokken en resultaatgericht
            </h2>

            <ul className="flex list-none flex-col gap-7">
              {principles.map((principle) => (
                <li key={principle.no} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-soft font-serif text-[1.1rem] font-bold text-rose"
                  >
                    {principle.no}
                  </span>
                  <div>
                    <h3 className="mb-1.5 font-serif text-[1.1rem] font-semibold text-text-dark">
                      {principle.title}
                    </h3>
                    <p className="text-[0.93rem] text-text-medium">{principle.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
