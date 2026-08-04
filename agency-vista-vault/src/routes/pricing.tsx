import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronMarquee, ChevronRule } from "@/components/site/Chevron";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Eyebrow, Numeral, Section } from "@/components/site/Section";

const TITLE = "Pricing & Packages — Social, Video and Design Retainers";
const DESCRIPTION =
  "Social media management retainers, video editing packages and graphic design bundles for cafés and F&B brands. Contact us for current rates.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PricingPage,
});

const TABLES = [
  {
    n: "01",
    title: "Social Media Management",
    note: "Monthly retainer",
    head: ["Package", "Includes"],
    rows: [
      ["Starter", "Set number of posts and reels per month, content calendar"],
      ["Growth", "More posts, reel priority, basic strategy"],
      ["Premium", "Full content coverage plus light ad support"],
    ],
  },
  {
    n: "02",
    title: "Video Editing",
    note: "Per piece or bundled",
    head: ["Option", "Details"],
    rows: [
      ["Per Reel", "Single edited reel"],
      ["Monthly Package", "Four reels per month, bundled rate"],
      ["Custom AI Video", "Full AI product film"],
    ],
  },
  {
    n: "03",
    title: "Graphic Design",
    note: "Per piece or bundled",
    head: ["Option", "Details"],
    rows: [
      ["Per Post", "Single design"],
      ["Monthly Package", "Ten posts per month, bundled rate"],
    ],
  },
];

function PricingPage() {
  return (
    <>
      <Section theme="ink" className="px-5 pb-24 pt-40 md:px-10 md:pt-52">
        <Reveal>
          <Eyebrow>Packages</Eyebrow>
        </Reveal>
        <RevealLines className="display mt-6 text-[clamp(3rem,14vw,11rem)]" lines={["PRICING"]} />
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-md text-sm opacity-70">
            Straightforward packages, no bundled surprises. Rates are quoted per brand after a
            short audit call.
          </p>
        </Reveal>
      </Section>

      <Section theme="greige" className="px-5 py-24 md:px-10 md:py-36">
        <div className="space-y-24">
          {TABLES.map((table) => (
            <div key={table.n} className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="md:sticky md:top-28">
                  <Reveal>
                    <Numeral>{table.n}</Numeral>
                  </Reveal>
                  <Reveal delay={0.08}>
                    <h2 className="display text-[clamp(1.8rem,4.4vw,3.2rem)]">{table.title}</h2>
                  </Reveal>
                  <Reveal delay={0.14}>
                    <p className="eyebrow mt-4 opacity-60">{table.note}</p>
                  </Reveal>
                </div>
              </div>

              <div className="md:col-span-8">
                <Reveal>
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="eyebrow opacity-60">
                        <th className="pb-4 pr-4 font-semibold">{table.head[0]}</th>
                        <th className="pb-4 pr-4 font-semibold">{table.head[1]}</th>
                        <th className="pb-4 font-semibold">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row) => (
                        <tr key={row[0]} className="rule-line align-top">
                          <td className="py-5 pr-4 font-semibold">{row[0]}</td>
                          <td className="py-5 pr-4 opacity-75">{row[1]}</td>
                          <td className="py-5">
                            <Link to="/contact" className="story-link text-blood">
                              Contact for pricing
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Recommended bundle */}
      <Section theme="blood" className="px-5 py-28 md:px-10 md:py-40">
        <Reveal>
          <Eyebrow>Recommended</Eyebrow>
        </Reveal>
        <RevealLines
          className="display mt-6 text-[clamp(2.2rem,9vw,7rem)]"
          lines={["FULL GROWTH", "PACKAGE"]}
        />
        <ChevronRule />
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <p className="max-w-md text-sm">
              Social media management, video editing and graphic design combined into one monthly
              engagement at a discounted rate — one team, one calendar, one point of contact.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              to="/contact"
              className="eyebrow inline-flex items-center gap-1 rounded-full bg-ink px-7 py-4 text-cream transition-opacity hover:opacity-85"
            >
              Contact for pricing <ChevronMarquee />
            </Link>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
