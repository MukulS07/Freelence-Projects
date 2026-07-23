import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { menu } from "./data";

const cats = Object.keys(menu) as (keyof typeof menu)[];

export function Menu() {
  const [active, setActive] = useState<keyof typeof menu>("Coffee");

  return (
    <section id="menu" className="relative bg-[color:var(--cream)] py-20 md:py-28">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
              — The Menu
            </span>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1] max-w-2xl">
              A short list,
              <br />
              <em className="text-[color:var(--brand)]">endlessly refined.</em>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full px-6 py-3 text-[11px] uppercase tracking-[0.28em] transition ${
                  active === c
                    ? "bg-[color:var(--ink)] text-[color:var(--cream)]"
                    : "border border-[color:var(--border)] bg-transparent text-[color:var(--ink)] hover:border-[color:var(--brand)]"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-x-16 gap-y-2 md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="contents"
            >
              {menu[active].map((item, i) => (
                <Reveal key={item.name} delay={i * 0.04}>
                  <div className="group flex items-baseline gap-4 border-b border-[color:var(--border)] py-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-display text-2xl">{item.name}</h3>
                        <span className="hidden flex-1 border-b border-dashed border-[color:var(--border)] pb-1 sm:block" />
                        <div className="font-display text-xl text-[color:var(--brand)] whitespace-nowrap">
                          {item.price} <span className="text-xs text-[color:var(--muted-foreground)]">Ks</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
