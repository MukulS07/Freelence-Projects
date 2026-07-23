import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { nav, brand } from "./data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[rgb(30_22_18_/_0.55)] border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x mx-auto flex h-20 max-w-[1440px] items-center justify-between text-[color:var(--cream)]">
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--brand)]/60 font-display text-lg text-[color:var(--brand)]">
            R
          </span>
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-display text-xl">{brand.name}</span>
            <span className="text-[10px] uppercase tracking-[0.32em] opacity-70">
              {brand.subname}
            </span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-sm">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="group relative uppercase tracking-[0.22em] text-[11px] opacity-80 hover:opacity-100 transition"
            >
              {n.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[color:var(--brand)] transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#reserve"
            className="hidden md:inline-flex items-center gap-2 rounded-full border border-[color:var(--brand)]/60 bg-[color:var(--brand)]/10 px-5 py-2.5 text-[11px] uppercase tracking-[0.28em] text-[color:var(--cream)] transition hover:bg-[color:var(--brand)] hover:text-[color:var(--ink)]"
          >
            Reserve
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-white/20"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`block h-px w-4 bg-current transition ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-px w-4 bg-current transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-[color:var(--ink)]/95 backdrop-blur-xl"
          >
            <nav className="container-x mx-auto flex flex-col gap-4 py-8 text-[color:var(--cream)]">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl"
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
