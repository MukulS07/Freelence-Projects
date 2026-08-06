import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/site-content";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Blobs } from "@/components/site/Blobs";

const title = "Services — agencydemo2";
const description =
  "Strategy, creative and marketing services built to move brands from insight to impact.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Blobs />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-16 pt-16 md:px-10 md:pt-24">
          <h1 className="font-display text-[15vw] leading-[0.86] tracking-tight text-ink md:text-[10vw]">
            <RevealText text="Services" />
          </h1>
          <Reveal delay={0.35}>
            <p className="mt-8 max-w-xl text-lg text-ink/70">
              [Introduce how you work with clients — the shape of an engagement, what a partnership
              with you feels like.]
            </p>
          </Reveal>
        </div>
      </section>

      {services.map((service, i) => (
        <section
          key={service.id}
          className={`border-t border-ink/10 ${i % 2 === 1 ? "bg-ink/[0.03]" : ""}`}
        >
          <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-28">
            <div className="md:sticky md:top-28 md:self-start">
              <Reveal>
                <span className="text-xs uppercase tracking-[0.24em] text-ink/40">
                  {service.number}
                </span>
                <h2 className="mt-4 font-display text-5xl leading-none tracking-tight text-ink md:text-7xl">
                  {service.title}
                </h2>
              </Reveal>
            </div>
            <div>
              <Reveal>
                <p className="max-w-xl text-lg leading-relaxed text-ink/70">{service.summary}</p>
              </Reveal>
              <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
                {service.deliverables.map((item, j) => (
                  <Reveal key={item + j} delay={j * 0.06} y={16}>
                    <li className="flex items-baseline gap-6 py-4">
                      <span className="text-xs tabular-nums text-ink/35">
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-xl tracking-tight text-ink">{item}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
