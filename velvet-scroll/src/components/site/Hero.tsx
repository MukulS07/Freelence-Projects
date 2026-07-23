import { motion } from "motion/react";
import { images } from "./data";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[92svh] w-full overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]"
    >
      {/* Background image with ken-burns */}
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt="Rangoon Coffee Brewery interior at dusk"
          width={1920}
          height={1280}
          className="ken-burns h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--ink)]/45 via-[color:var(--ink)]/25 to-[color:var(--ink)]/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(30,22,18,0.42)_100%)]" />
      </div>

      {/* Top eyebrow */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="absolute top-28 left-0 right-0 z-10 hidden md:flex justify-between container-x mx-auto max-w-[1440px] text-[10px] uppercase tracking-[0.4em] text-[color:var(--cream)]/60"
      >
        <span>Est. 2011 · Yangon</span>
        <span>Single Origin · Slow Roasted · Craft Poured</span>
      </motion.div>

      <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1440px] flex-col items-start justify-end container-x pt-32 pb-20 md:pb-16">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.65 }}
          className="mb-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]"
        >
          <span className="h-px w-10 bg-[color:var(--brand)]" />
          A Rangoon Ritual
        </motion.span>

        <h1 className="font-display text-[13vw] leading-[0.95] tracking-tight text-balance md:text-[9vw] xl:text-[8rem]">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            Experience Coffee
          </motion.span>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="block italic text-[color:var(--brand)]"
          >
            Beyond Ordinary
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="mt-10 max-w-md text-lg font-light leading-relaxed text-[color:var(--cream)]/75"
        >
          Premium coffee. Warm atmosphere. Crafted experiences from the
          highlands of Shan, poured with intention.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.58, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#menu"
            className="group inline-flex items-center gap-3 rounded-full bg-[color:var(--brand)] px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-[color:var(--ink)] transition hover:bg-[color:var(--cream)]"
          >
            Explore Menu
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#reserve"
            className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--cream)]/30 px-8 py-4 text-[11px] uppercase tracking-[0.28em] text-[color:var(--cream)] transition hover:border-[color:var(--cream)]"
          >
            Reserve a Table
          </a>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 border-t border-[color:var(--cream)]/10 bg-[color:var(--ink)]/35 backdrop-blur-sm">
        <div className="container-x mx-auto grid max-w-[1440px] gap-4 py-4 text-[10px] uppercase tracking-[0.28em] text-[color:var(--cream)]/65 md:grid-cols-3">
          <span>47 Sule Pagoda Road</span>
          <span className="hidden md:block">Founded 2011</span>
          <span className="hidden text-right md:block">Open daily · 07:00 — late</span>
        </div>
      </div>
    </section>
  );
}
