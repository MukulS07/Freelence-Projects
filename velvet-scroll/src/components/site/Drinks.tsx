import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { drinks } from "./data";

export function Drinks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const compute = () => {
      if (!trackRef.current) return;
      const d = trackRef.current.scrollWidth - window.innerWidth;
      setDistance(Math.max(0, d));
    };
    compute();
    window.addEventListener("resize", compute);
    const t = setTimeout(compute, 300); // after images/fonts settle
    return () => {
      window.removeEventListener("resize", compute);
      clearTimeout(t);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      id="drinks"
      ref={sectionRef}
      className="relative bg-[color:var(--ink)] text-[color:var(--cream)]"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="container-x mx-auto w-full max-w-[1440px] pt-16 md:pt-20">
          <div className="flex w-full items-end justify-between gap-8">
            <div>
              <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
                — Signature Drinks
              </span>
              <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1] md:text-6xl">
                The house
                <em className="text-[color:var(--brand)]"> pours.</em>
              </h2>
            </div>
            <p className="hidden max-w-xs text-sm leading-relaxed text-[color:var(--cream)]/60 md:block">
              Eight house signatures, built from Shan highland beans and Rangoon
              spice. Scroll to explore.
            </p>
          </div>
        </div>

        <div className="relative mt-8 flex flex-1 items-center overflow-hidden md:mt-10">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 pl-[6vw] pr-[6vw] will-change-transform"
          >
            {drinks.map((d, i) => (
              <article
                key={d.name}
                className="group relative flex h-[62vh] w-[78vw] shrink-0 flex-col overflow-hidden rounded-sm border border-[color:var(--cream)]/10 md:h-[68vh] md:w-[38vw]"
              >
                <img
                  src={d.img}
                  width={1000}
                  height={1300}
                  loading="lazy"
                  alt={d.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink)] via-[color:var(--ink)]/20 to-transparent" />
                <div className="relative z-10 mt-auto p-8 md:p-10">
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
                        No. {String(i + 1).padStart(2, "0")}
                      </div>
                      <h3 className="mt-3 font-display text-4xl md:text-5xl">
                        {d.name}
                      </h3>
                      <div className="mt-2 text-xs uppercase tracking-[0.28em] text-[color:var(--cream)]/60">
                        {d.tag}
                      </div>
                    </div>
                    <div className="whitespace-nowrap font-display text-2xl text-[color:var(--brand)]">
                      {d.price}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
