import { createFileRoute } from "@tanstack/react-router";
import { agency, studioImage, team, values } from "@/lib/site-content";
import { Reveal, RevealText } from "@/components/site/Reveal";

const title = "About — agencydemo2";
const description =
  "Who we are, what we believe, and the people behind the work at our creative studio.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[1400px] px-6 pt-16 md:px-10 md:pt-24">
        <h1 className="font-display text-[15vw] leading-[0.86] tracking-tight text-ink md:text-[10vw]">
          <RevealText text="About us" />
        </h1>
        <Reveal delay={0.35} className="mt-10 grid gap-10 md:grid-cols-2">
          <p className="text-2xl leading-snug text-ink md:text-3xl">
            [A short, bold statement about your point of view as a studio.]
          </p>
          <div className="space-y-4 text-ink/70">
            <p>[Paragraph about how the studio started and why.]</p>
            <p>[Paragraph about how you work with clients day to day.]</p>
            <p className="text-xs uppercase tracking-[0.24em] text-ink/40">
              Since {agency.foundedYear}
            </p>
          </div>
        </Reveal>
      </section>

      <Reveal className="mx-auto mt-20 max-w-[1400px] px-6 md:px-10">
        <div className="overflow-hidden rounded-3xl">
          <img
            src={studioImage}
            alt="Inside the studio during a working session"
            loading="lazy"
            width={1400}
            height={1000}
            className="w-full object-cover"
          />
        </div>
      </Reveal>

      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-36">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-ink/45">What we believe</p>
        </Reveal>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, i) => (
            <Reveal key={value.title + i} delay={i * 0.1}>
              <h2 className="font-display text-2xl tracking-tight text-ink">{value.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10">
        <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.24em] text-ink/45">The team</p>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name + i} delay={i * 0.06} y={20}>
                <div className="h-full bg-canvas p-8">
                  <span
                    className={`block h-10 w-10 rounded-full ${
                      ["bg-spot-yellow", "bg-spot-clay", "bg-spot-olive", "bg-spot-blue"][i % 4]
                    }`}
                  />
                  <h3 className="mt-6 font-display text-xl tracking-tight text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink/50">
                    {member.role}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
