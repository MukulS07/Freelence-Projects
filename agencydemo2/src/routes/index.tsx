import { createFileRoute, Link } from "@tanstack/react-router";
import { agency, clients, projects, services, studioImage } from "@/lib/site-content";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Blobs } from "@/components/site/Blobs";
import { Marquee } from "@/components/site/Marquee";
import { WorkCard } from "@/components/site/WorkCard";

const title = "agencydemo2 — Creative agency";
const description =
  "A creative agency blending strategy, design and storytelling to help brands grow with clarity.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <Blobs />
        <div className="relative mx-auto max-w-[1400px] px-6 pb-24 pt-20 md:px-10 md:pb-40 md:pt-32">
          <h1 className="font-display text-[15vw] leading-[0.86] tracking-tight text-ink md:text-[11vw]">
            <RevealText text={agency.taglineLineOne} />
            <span className="block pl-[8vw] text-spot-clay md:pl-[18vw]">
              <RevealText text={agency.taglineLineTwo} delay={0.2} />
            </span>
          </h1>

          <Reveal delay={0.5} className="mt-14 grid gap-8 md:grid-cols-2">
            <p className="max-w-md text-lg text-ink/70">{agency.intro}</p>
            <div className="md:justify-self-end md:self-end">
              <Link
                to="/work"
                data-cursor="grow"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-xs uppercase tracking-[0.22em] text-canvas transition-colors hover:bg-spot-clay"
              >
                See the work
                <span aria-hidden>&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pb-28 md:px-10 md:pb-40">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-ink/45">Highlights</p>
        </Reveal>
        <div className="mt-10 grid gap-16 md:grid-cols-2 md:gap-x-12">
          {projects.slice(0, 3).map((project, i) => (
            <WorkCard key={project.slug} project={project} index={i} offset={i % 2 === 1} />
          ))}
        </div>
        <Reveal className="mt-16">
          <Link to="/work" className="link-underline text-sm uppercase tracking-[0.22em] text-ink">
            View all work
          </Link>
        </Reveal>
      </section>

      <Marquee items={clients} />

      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <h2 className="font-display text-5xl leading-none tracking-tight text-ink md:text-7xl">
              Our services
            </h2>
          </Reveal>
          <div className="grid gap-12 sm:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.12}>
                <span
                  className={`block h-16 w-16 rounded-full ${
                    i === 0 ? "bg-spot-yellow" : i === 1 ? "bg-spot-clay" : "bg-spot-olive"
                  }`}
                />
                <h3 className="mt-6 font-display text-2xl tracking-tight text-ink">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">{service.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="mt-16">
          <Link
            to="/services"
            className="link-underline text-sm uppercase tracking-[0.22em] text-ink"
          >
            Learn more
          </Link>
        </Reveal>
      </section>

      <section className="bg-ink text-canvas">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 py-24 md:grid-cols-2 md:px-10 md:py-36">
          <Reveal>
            <div className="overflow-hidden rounded-3xl">
              <img
                src={studioImage}
                alt="The studio team reviewing printed layouts together"
                loading="lazy"
                width={1400}
                height={1000}
                className="w-full object-cover transition-transform duration-[900ms] hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-6xl">
              Thoughtful creative.
              <span className="block text-spot-yellow">Real impact.</span>
            </h2>
            <p className="mt-8 max-w-lg text-canvas/70">
              [Two or three sentences about who you are and how you work. Mention the kinds of
              brands you partner with.]
            </p>
            <p className="mt-4 max-w-lg text-canvas/70">
              [Since {agency.foundedYear}, describe the range of work you have delivered —
              campaigns, digital storytelling, production, creative direction.]
            </p>
            <Link
              to="/about"
              className="link-underline mt-10 inline-block text-sm uppercase tracking-[0.22em] text-canvas"
            >
              More about {agency.name}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
