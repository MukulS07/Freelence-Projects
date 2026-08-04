import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Chevron, ChevronMarquee } from "./Chevron";
import { NAV, SITE } from "@/lib/site";
import { useSectionTheme, type SectionTheme } from "./useSectionTheme";

const TONE: Record<SectionTheme, { text: string; accent: string; border: string }> = {
  greige: { text: "text-ink", accent: "text-blood", border: "border-ink/40" },
  ink: { text: "text-cream", accent: "text-sky", border: "border-cream/40" },
  blood: { text: "text-ink", accent: "text-mint", border: "border-ink/50" },
};

function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="eyebrow tabular-nums">
      INDIA, {time ?? "--:--:--"}
    </span>
  );
}

/** Fixed UI layer that sits above all scrolling content and recolors per section. */
export function Overlay() {
  const theme = useSectionTheme();
  const tone = TONE[theme];

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 transition-colors duration-500 ${tone.text}`}
    >
      {/* top nav */}
      <div className="pointer-events-auto flex items-start justify-between px-5 pt-5 md:px-10 md:pt-7">
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <Link to="/" className="eyebrow font-bold">
            {SITE.shortName}
          </Link>
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="eyebrow opacity-70 transition-opacity hover:opacity-100"
              activeProps={{ className: `eyebrow ${tone.accent} opacity-100` }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className={`eyebrow hidden items-center gap-2 rounded-full border px-4 py-2 transition-colors md:inline-flex ${tone.border} hover:bg-current/10`}
        >
          Book audit <Chevron className="h-2 w-2.5 -rotate-90" />
        </Link>
      </div>

      {/* center-top scroll indicator */}
      <div
        className={`absolute left-1/2 top-4 -translate-x-1/2 transition-colors duration-500 ${tone.accent}`}
      >
        <Chevron className="h-4 w-5 animate-[pulse_2.4s_ease-in-out_infinite]" />
      </div>

      {/* bottom-left social dock */}
      <div className="pointer-events-auto absolute bottom-5 left-5 flex gap-3 md:bottom-7 md:left-10">
        {[
          { label: "(IG)", href: "https://instagram.com" },
          { label: "(X)", href: "https://x.com" },
          { label: "(WA)", href: "https://wa.me/" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="eyebrow opacity-70 transition-opacity hover:opacity-100"
          >
            {s.label}
          </a>
        ))}
      </div>

      {/* bottom-center live clock */}
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 opacity-70 md:block md:bottom-7">
        <LiveClock />
      </div>

      {/* bottom-right CTA with chevron marquee */}
      <Link
        to="/contact"
        className={`eyebrow pointer-events-auto absolute bottom-5 right-5 inline-flex items-center gap-1 rounded-full border px-4 py-2 transition-colors md:bottom-7 md:right-10 ${tone.border} hover:bg-current/10`}
      >
        Audit <ChevronMarquee />
      </Link>
    </div>
  );
}
