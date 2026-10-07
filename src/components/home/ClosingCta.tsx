import { closingCta } from '@/content/site';

export function ClosingCta() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="reveal on-dark relative overflow-hidden rounded-[20px] bg-gradient-to-br from-rose to-rose-dark px-15 py-18 text-center max-sm:px-7 max-sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-1/2 -right-[20%] h-[500px] w-[500px] rounded-full bg-white/5"
          />
          <h2 className="relative mb-4 font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-white">
            {closingCta.title}
          </h2>
          <p className="relative mx-auto mb-9 max-w-[500px] text-[1.1rem] text-white/85">
            {closingCta.text}
          </p>
          <a href="#contact" className="btn btn-ondark relative">
            {closingCta.label} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
