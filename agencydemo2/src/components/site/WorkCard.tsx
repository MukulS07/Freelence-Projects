import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { Project } from "@/lib/site-content";

export function WorkCard({
  project,
  offset = false,
  index,
}: {
  project: Project;
  offset?: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <motion.div
      ref={ref}
      data-cursor="grow"
      className={`group relative ${offset ? "md:mt-32" : ""}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="overflow-hidden rounded-3xl bg-ink/5">
        <motion.img
          src={project.image}
          alt={`${project.name} project cover`}
          loading={index === 0 ? "eager" : "lazy"}
          width={1200}
          height={900}
          style={{ y: reduce ? 0 : imageY }}
          className="aspect-[4/3] w-full scale-110 object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.16]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="font-display text-2xl tracking-tight text-ink md:text-3xl">
          {project.name}
        </h3>
        <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-ink/50">
          {project.category} — {project.year}
        </span>
      </div>
      <p className="mt-2 max-w-md text-sm text-ink/60">{project.blurb}</p>
    </motion.div>
  );
}
