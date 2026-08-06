import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { agency } from "@/lib/site-content";

const NAV = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-canvas/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="font-display text-lg tracking-tight text-ink">
          {agency.name}
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="link-underline text-sm uppercase tracking-[0.18em] text-ink/70 hover:text-ink"
              activeProps={{ className: "text-ink" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm uppercase tracking-[0.18em] text-ink md:hidden"
          aria-expanded={open}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink/10 bg-canvas px-6 pb-6 pt-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="block py-3 font-display text-3xl tracking-tight text-ink"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="h-px origin-left bg-spot-clay"
      />
    </header>
  );
}
