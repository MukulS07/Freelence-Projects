import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { images, experiences, timeline } from "./data";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative bg-[color:var(--cream)] py-20 md:py-28"
    >
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-6 md:sticky md:top-32 md:self-start">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
              — Our Story · Founded 2011
            </span>
            <h2 className="mt-6 font-display text-5xl leading-[1] md:text-7xl">
              A ritual of
              <br />
              <em className="text-[color:var(--brand)]">warmth and craft.</em>
            </h2>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-[color:var(--muted-foreground)]">
              <Reveal>
                <p>
                  Rangoon began in a small wooden room off Sule Pagoda Road
                  with a single roaster and a stubborn belief — that a cup of
                  coffee can be an event, not an errand.
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <p>
                  A decade on, two brothers still roast every bean by hand,
                  still source from farms they've walked, and still serve every
                  cup with intention.
                </p>
              </Reveal>
            </div>

            {/* Timeline */}
            <div className="mt-14 border-t border-[color:var(--border)] pt-10">
              <div className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted-foreground)] mb-8">
                A short timeline
              </div>
              <ol className="relative space-y-8 pl-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-[color:var(--brand)]/30">
                {timeline.map((t, i) => (
                  <Reveal key={t.year} delay={i * 0.05}>
                    <li className="relative">
                      <span className="absolute -left-8 top-2 grid h-4 w-4 place-items-center">
                        <span className="h-3 w-3 rounded-full bg-[color:var(--brand)]" />
                      </span>
                      <div className="font-display text-3xl text-[color:var(--brand)] leading-none">
                        {t.year}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                        {t.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <div className="md:col-span-6">
            <div className="relative overflow-hidden rounded-sm">
              <motion.img
                src={images.story}
                width={1400}
                height={1600}
                loading="lazy"
                alt="Roasted coffee beans"
                style={{ y, scale }}
                className="h-[70vh] w-full object-cover md:h-[85vh]"
              />
              <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                <div className="rounded-sm bg-[color:var(--ink)]/70 backdrop-blur-md px-5 py-4 text-[color:var(--cream)]">
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">
                    Origin
                  </div>
                  <div className="mt-1 font-display text-xl">
                    Shan Highlands, 1,400m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Craft — Four rituals. One devotion. */}
        <div id="craft" className="mt-32 md:mt-40">
          <div className="mb-16 max-w-3xl">
            <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
              — The Craft
            </span>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1]">
              Four rituals.
              <br />
              <em className="text-[color:var(--brand)]">One devotion.</em>
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--muted-foreground)]">
              Every drink is a small ceremony. Watch, taste, linger. There is
              no rush inside a cup.
            </p>
          </div>
          <div id="experience" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {experiences.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-[28px] border border-[color:var(--border)] bg-[color:var(--surface)] p-8 transition duration-700 hover:-translate-y-1 hover:border-[color:var(--brand)]/50 hover:shadow-[0_30px_60px_-30px_rgba(36,25,20,0.35)]">
                  <div className="font-display text-6xl text-[color:var(--brand)]/40 leading-none">
                    0{i + 1}
                  </div>
                  <h3 className="mt-8 font-display text-2xl">{e.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                    {e.body}
                  </p>
                  <div className="mt-10 h-px w-full origin-left scale-x-0 bg-[color:var(--brand)] transition-transform duration-700 group-hover:scale-x-100" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
