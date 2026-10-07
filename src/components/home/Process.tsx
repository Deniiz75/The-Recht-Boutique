import { processSteps } from '@/content/site';

export function Process() {
  return (
    <section id="werkwijze" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="reveal mx-auto mb-16 max-w-[600px] text-center">
          {/* On cream, so rose-dark rather than rose-light — see Services. */}
          <p className="mb-3 text-[0.8rem] font-semibold tracking-[3px] text-rose-dark uppercase">
            Werkwijze
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-rose">
            In vier stappen naar uw oplossing
          </h2>
          <p className="mt-4 text-[1.05rem] text-text-medium">
            Een helder en overzichtelijk proces zodat u altijd weet waar u aan toe
            bent.
          </p>
        </div>

        <ol className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {processSteps.map((step) => (
            <li key={step.step} className="reveal">
              <div className="card card-lift h-full p-10 text-center hover:shadow-[0_2px_8px_rgba(45,42,38,0.06)]">
                <span
                  aria-hidden="true"
                  className="mb-4 block font-serif text-[2.4rem] font-bold text-rose-light opacity-40"
                >
                  {step.step}
                </span>
                <h3 className="mb-2.5 font-serif text-[1.05rem] font-semibold text-text-dark">
                  {step.title}
                </h3>
                <p className="text-[0.88rem] text-text-medium">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
