import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { projects } from "@/lib/site-content";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { WorkCard } from "@/components/site/WorkCard";

const title = "Work — agencydemo2";
const description =
  "Selected projects: branding, campaigns, digital and content work for ambitious brands.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div className="mx-auto max-w-[1400px] px-6 pb-32 pt-16 md:px-10 md:pb-44 md:pt-24">
      <h1 className="font-display text-[16vw] leading-[0.86] tracking-tight text-ink md:text-[11vw]">
        <RevealText text="Work" />
      </h1>

      <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
              active === cat
                ? "border-ink bg-ink text-canvas"
                : "border-ink/20 text-ink/60 hover:border-ink/50 hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </Reveal>

      <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-x-12">
        {visible.map((project, i) => (
          <WorkCard key={project.slug} project={project} index={i} offset={i % 2 === 1} />
        ))}
      </div>
    </div>
  );
}
