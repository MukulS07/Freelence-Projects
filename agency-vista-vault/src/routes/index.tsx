import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { GlitchHero } from "@/components/site/GlitchHero";
import { Chevron, ChevronMarquee, ChevronRule } from "@/components/site/Chevron";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Eyebrow, Numeral, Section } from "@/components/site/Section";
import { PROCESS, SERVICES, SITE, WHY_US } from "@/lib/site";

const TITLE = "AI Content & Social Growth for Café & F&B Brands";
const DESCRIPTION =
  "We produce AI-powered video, design and social content for cafés, food and beverage brands — scroll-stopping reels, product films and managed social growth.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function Index() {
  const reduced = useReducedMotion();
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wordmarkRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <>
      {/* HERO */}
      <div data-section-theme="ink">
        <GlitchHero>
          <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center text-cream">
            <Reveal>
              <p className="eyebrow opacity-80">Unlocking café growth</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="display mt-6 text-[clamp(3rem,13vw,11rem)] lowercase">
                {SITE.shortName}
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-balance text-base opacity-90 md:text-lg">
                {SITE.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mx-auto mt-4 max-w-md text-sm opacity-70">{SITE.subline}</p>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="eyebrow inline-flex items-center gap-1 rounded-full bg-cream px-6 py-3 text-ink transition-opacity hover:opacity-85"
                >
                  Book a free content audit <ChevronMarquee />
                </Link>
                <Link
                  to="/work"
                  className="eyebrow inline-flex items-center gap-2 rounded-full border border-cream/50 px-6 py-3 transition-colors hover:bg-cream/10"
                >
                  See our work <Chevron className="h-2 w-2.5 -rotate-90" />
                </Link>
              </div>
            </Reveal>
          </div>
        </GlitchHero>
      </div>

      {/* STATEMENT */}
      <Section theme="ink" className="px-5 py-32 md:px-10 md:py-44">
        <Reveal>
          <p className="mx-auto max-w-2xl text-center text-sm opacity-70">
            We are a content studio built for food and beverage brands — video, design and social,
            produced in one place.
          </p>
        </Reveal>
        <RevealLines
          className="display mt-12 text-center text-[clamp(2.4rem,9vw,7.5rem)]"
          lines={["THE HEART", "OF YOUR BRAND"]}
        />
        <RevealLines
          className="mx-auto mt-14 max-w-md space-y-1 text-center text-sm opacity-75"
          lines={[
            "Attention, beyond reach.",
            "A feed opens the door.",
            "What matters is the craving that follows.",
          ]}
        />
      </Section>

      {/* SERVICES */}
      <Section theme="greige" id="services" className="px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <Eyebrow>What we do</Eyebrow>
        </Reveal>
        <RevealLines
          className="display mt-6 text-[clamp(2.6rem,11vw,9rem)]"
          lines={["SERVICES"]}
        />
        <ChevronRule />
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.06}>
              <Link to="/pricing" className="group block rule-line pt-6">
                <Numeral>{service.n}</Numeral>
                <h2 className="display mt-2 text-[clamp(1.6rem,3.4vw,2.6rem)]">
                  {service.title}
                </h2>
                <p className="mt-3 max-w-sm text-sm opacity-70">{service.line}</p>
                <span className="eyebrow mt-5 inline-flex items-center gap-1 text-blood">
                  See pricing <ChevronMarquee count={5} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* PROCESS — parallax cropped wordmark behind numbered pillars */}
      <Section theme="ink" id="process" className="px-5 py-28 md:px-10 md:py-40">
        <div ref={wordmarkRef} className="relative">
          <motion.div
            aria-hidden="true"
            style={reduced ? {} : { y: parallaxY }}
            className="pointer-events-none absolute inset-x-0 -top-10 -z-10 select-none text-center opacity-10"
          >
            <span className="display text-[clamp(8rem,28vw,24rem)]">PROCESS</span>
          </motion.div>

          <Reveal>
            <Eyebrow>How it works</Eyebrow>
          </Reveal>

          <div className="mt-16 space-y-20">
            {PROCESS.map((step, i) => (
              <div key={step.n} className="rule-line grid gap-6 pt-8 md:grid-cols-12">
                <Reveal delay={0} className="md:col-span-3">
                  <Chevron className="h-4 w-5 text-blood" />
                  <Numeral>{step.n}</Numeral>
                </Reveal>
                <Reveal delay={0.08} className="md:col-span-5">
                  <h2 className="display text-[clamp(1.9rem,5vw,3.6rem)]">{step.title}</h2>
                </Reveal>
                <Reveal delay={0.16} className="md:col-span-4">
                  <p className="max-w-sm text-sm opacity-75">{step.body}</p>
                </Reveal>
                <span className="sr-only">{`Step ${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* WHY US */}
      <Section theme="blood" id="why-us" className="px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <Eyebrow>Why us</Eyebrow>
        </Reveal>
        <RevealLines
          className="display mt-6 text-[clamp(2.4rem,10vw,8rem)]"
          lines={["NOT TEMPLATES.", "EXPRESSIONS."]}
        />
        <ChevronRule />
        <ul className="grid gap-8 md:grid-cols-2">
          {WHY_US.map((item, i) => (
            <Reveal key={item} delay={i * 0.06}>
              <li className="rule-line flex gap-4 pt-6">
                <Chevron className="mt-1 h-3 w-4 shrink-0" />
                <span className="max-w-sm text-sm">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <Section theme="greige" className="px-5 py-32 text-center md:px-10 md:py-44">
        <RevealLines
          className="display text-[clamp(2.2rem,9vw,7rem)]"
          lines={["LET'S GROW YOUR", "CAFÉ'S PRESENCE"]}
        />
        <Reveal delay={0.2}>
          <Link
            to="/contact"
            className="eyebrow mt-12 inline-flex items-center gap-1 rounded-full bg-ink px-7 py-4 text-cream transition-opacity hover:opacity-85"
          >
            Book a free content audit <ChevronMarquee />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
