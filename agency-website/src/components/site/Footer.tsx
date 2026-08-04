import { Link } from "@tanstack/react-router";
import { Chevron } from "./Chevron";
import { NAV, SERVICES, SITE } from "@/lib/site";

const SCATTER = Array.from({ length: 26 }).map((_, i) => ({
  top: `${(i * 37) % 95}%`,
  left: `${(i * 61) % 92}%`,
  rotate: ((i * 47) % 40) - 20,
  scale: 0.6 + ((i * 13) % 10) / 10,
  isChevron: i % 3 === 0,
}));

export function Footer() {
  return (
    <footer
      data-section-theme="ink"
      className="theme-ink relative isolate overflow-hidden px-5 pb-28 pt-24 md:px-10"
    >
      {/* ambient drifting wordmark + triangle wallpaper */}
      <div aria-hidden="true" className="drift-slow absolute inset-0 -z-10 opacity-[0.14]">
        {SCATTER.map((item, i) => (
          <span
            key={i}
            className="absolute whitespace-nowrap"
            style={{
              top: item.top,
              left: item.left,
              transform: `rotate(${item.rotate}deg) scale(${item.scale})`,
            }}
          >
            {item.isChevron ? (
              <Chevron className="h-8 w-10 text-blood" />
            ) : (
              <span className="display text-4xl lowercase text-cream">{SITE.shortName}</span>
            )}
          </span>
        ))}
      </div>

      <div className="grid gap-14 md:grid-cols-3">
        <div>
          <p className="display text-4xl lowercase">{SITE.shortName}</p>
          <p className="mt-4 max-w-xs text-sm opacity-70">{SITE.tagline}</p>
        </div>

        <div>
          <p className="eyebrow opacity-60">Services</p>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.title} className="opacity-80">
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow opacity-60">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="story-link" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </li>
            <li className="opacity-80">WhatsApp {SITE.whatsapp}</li>
            <li className="opacity-80">Instagram {SITE.instagram}</li>
          </ul>
          <nav className="mt-8 flex gap-5">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="eyebrow text-mint">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <p className="mt-16 text-xs opacity-50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </p>
    </footer>
  );
}
