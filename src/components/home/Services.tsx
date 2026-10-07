import Link from 'next/link';
import { services } from '@/content/site';

/**
 * The four practice areas.
 *
 * Each title links through to its `/diensten/[slug]` page. The reference
 * build is a single page and its cards go nowhere; keeping the detail routes
 * is the whole point of the hybrid structure, and a stretched pseudo-element
 * makes the entire card the target without nesting interactive elements.
 */
export function Services() {
  return (
    <section id="diensten" className="scroll-mt-24 py-24">
      <div className="mx-auto max-w-[1340px] px-6">
        <div className="reveal mx-auto mb-16 max-w-[600px] text-center">
          {/* rose-dark, not the reference's rose-light: this section sits on
              cream, where rose-light is 2.83:1 at 0.8rem. */}
          <p className="mb-3 text-[0.8rem] font-semibold tracking-[3px] text-rose-dark uppercase">
            Onze expertise
          </p>
          <h2 className="font-serif text-[clamp(1.8rem,3.5vw,2.6rem)] leading-[1.25] font-semibold text-rose">
            Gespecialiseerd in wat u nodig heeft
          </h2>
          <p className="mt-4 text-[1.05rem] text-text-medium">
            Van het oprichten van uw onderneming tot het oplossen van complexe
            geschillen — wij staan naast u.
          </p>
        </div>

        <ul className="grid grid-cols-4 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {services.map((service) => (
            <li key={service.slug} className="reveal">
              <article className="card card-wipe card-lift group relative h-full overflow-hidden p-10 hover:shadow-[0_8px_30px_rgba(45,42,38,0.08)]">
                <div
                  aria-hidden="true"
                  className="mb-6 flex h-14 w-14 items-center justify-center rounded-[14px] bg-rose-soft text-2xl"
                >
                  {service.icon}
                </div>

                <h3 className="mb-3 font-serif text-[1.3rem] font-semibold text-rose">
                  <Link
                    href={`/diensten/${service.slug}`}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {service.title}
                  </Link>
                </h3>

                <p className="text-[0.95rem] leading-relaxed text-text-medium">
                  {service.cardText}
                </p>

                <span className="mt-5 inline-block rounded-full bg-rose-soft px-3.5 py-1.5 text-[0.8rem] font-semibold text-rose">
                  {service.audience}
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
