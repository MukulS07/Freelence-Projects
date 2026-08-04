import { useEffect, useRef, useState } from "react";
import heroPour from "@/assets/hero-pour.jpg";

/**
 * Full-bleed hero background with a one-time chromatic-aberration / RGB-split
 * glitch wipe fired when the hero scrolls out toward the statement section.
 */
export function GlitchHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glitching, setGlitching] = useState(false);
  const fired = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const el = ref.current;
      if (!el || fired.current) return;
      const progress = -el.getBoundingClientRect().top / window.innerHeight;
      if (progress > 0.35) {
        fired.current = true;
        setGlitching(true);
        window.setTimeout(() => setGlitching(false), 900);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative isolate min-h-screen overflow-hidden">
      <img
        src={heroPour}
        alt="Macro shot of coffee and cream swirling in slow motion"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/45" />

      {glitching ? (
        <>
          <div
            aria-hidden="true"
            className="glitch-layer pointer-events-none absolute inset-0 -z-10 bg-[oklch(0.55_0.24_25)] [animation:rgb-split_0.9s_steps(9)_1]"
          />
          <div
            aria-hidden="true"
            className="glitch-layer pointer-events-none absolute inset-0 -z-10 bg-[oklch(0.7_0.16_200)] [animation:rgb-split_0.9s_steps(7)_reverse_1]"
          />
        </>
      ) : null}

      {children}
    </div>
  );
}
