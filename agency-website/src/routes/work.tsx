import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronMarquee, ChevronRule } from "@/components/site/Chevron";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Eyebrow, Numeral, Section } from "@/components/site/Section";
import workBrand from "@/assets/work-brand.jpg";
import workProduct from "@/assets/work-ai-product.jpg";
import workSocial from "@/assets/work-social.jpg";

const TITLE = "Our Work — Café & F&B Content, Reels and AI Product Films";
const DESCRIPTION =
  "Brand video production, AI-generated product storytelling and ongoing social media management for food and beverage brands.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: WorkPage,
});

const CATEGORIES = [
  {
    n: "01",
    label: "Brand Work",
    theme: "greige" as const,
    image: workBrand,
    alt: "Barista pouring latte art in a modern café",
    lead: "Video and production pieces delivered for established food and beverage brands.",
    items: [
      "Video Production for a national beverage brand",
      "Video Production for a packaged drinks label",
      "Video Production for a specialty coffee chain",
    ],
  },
  {
    n: "02",
    label: "AI Product Content",
    theme: "ink" as const,
    image: workProduct,
    alt: "Studio product film still of a premium cold brew bottle in mist",
    lead: "AI-generated product storytelling — full product films built without a shoot day.",
    items: [
      "AI-Generated Product Storytelling — bottled cold brew",
      "AI-Generated Product Storytelling — seasonal launch film",
      "AI-Generated Product Storytelling — signature blend teaser",
    ],
  },
  {
    n: "03",
    label: "Live Client Results",
    theme: "blood" as const,
    image: workSocial,
    alt: "Flat lay of a phone showing a food brand social feed surrounded by props",
    lead: "Before-and-after growth from ongoing retainers — posts, reels and reach.",
    items: [
      "Ongoing Social Media Management — café, since month one",
      "Reach and reel views up across the first quarter",
      "Consistent weekly posting calendar maintained end-to-end",
    ],
  },
];

function WorkPage() {
  return (
    <>
      <Section theme="ink" className="px-5 pb-24 pt-40 md:px-10 md:pt-52">
        <Reveal>
          <Eyebrow>Portfolio</Eyebrow>
        </Reveal>
        <RevealLines className="display mt-6 text-[clamp(3rem,14vw,11rem)]" lines={["OUR WORK"]} />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-md text-sm opacity-70">
            Brand-only framing. No individual credits — the work speaks for the brands it was
            made for.
          </p>
        </Reveal>
      </Section>

      {CATEGORIES.map((cat) => (
        <Section
          key={cat.n}
          theme={cat.theme}
          className="px-5 py-24 md:px-10 md:py-36"
        >
          <div className="grid gap-12 md:grid-cols-12">
            {/* pinned category headline */}
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28">
                <Reveal>
                  <Numeral>{cat.n}</Numeral>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="display text-[clamp(2rem,5.5vw,4rem)]">{cat.label}</h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-5 max-w-sm text-sm opacity-75">{cat.lead}</p>
                </Reveal>
              </div>
            </div>

            <div className="md:col-span-7">
              <Reveal>
                <img
                  src={cat.image}
                  alt={cat.alt}
                  width={900}
                  height={1200}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </Reveal>
              <ul className="mt-10 space-y-6">
                {cat.items.map((item, i) => (
                  <Reveal key={item} delay={0.06 * i}>
                    <li className="rule-line pt-5 text-sm opacity-85">{item}</li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
          <ChevronRule />
        </Section>
      ))}

      <Section theme="greige" className="px-5 py-28 text-center md:px-10 md:py-40">
        <RevealLines
          className="display text-[clamp(2rem,8vw,6rem)]"
          lines={["WANT THIS", "FOR YOUR BRAND?"]}
        />
        <Reveal delay={0.2}>
          <Link
            to="/contact"
            className="eyebrow mt-10 inline-flex items-center gap-1 rounded-full bg-ink px-7 py-4 text-cream transition-opacity hover:opacity-85"
          >
            Book a free content audit <ChevronMarquee />
          </Link>
        </Reveal>
      </Section>
    </>
  );
}
