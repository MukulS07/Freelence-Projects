import { Link } from "@tanstack/react-router";
import { agency, socials } from "@/lib/site-content";
import { Reveal } from "./Reveal";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-canvas">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-canvas/50">
            [Let&apos;s work together]
          </p>
          <Link
            to="/contact"
            data-cursor="grow"
            className="mt-6 block font-display text-[13vw] leading-[0.9] tracking-tight text-canvas transition-colors hover:text-spot-yellow md:text-[9vw]"
          >
            Start a project
          </Link>
        </Reveal>

        <div className="mt-24 grid gap-10 border-t border-canvas/15 pt-10 md:grid-cols-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-canvas/45">Email</p>
            <p className="mt-2 text-canvas/90">{agency.email}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-canvas/45">Phone</p>
            <p className="mt-2 text-canvas/90">{agency.phone}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-canvas/45">Studio</p>
            <p className="mt-2 text-canvas/90">{agency.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-canvas/45">Follow</p>
            <ul className="mt-2 space-y-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="link-underline text-canvas/90">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-12 text-xs text-canvas/40">
          &copy; {agency.foundedYear}&ndash;present {agency.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
