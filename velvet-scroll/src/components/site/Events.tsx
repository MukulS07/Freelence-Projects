import { Reveal } from "./Reveal";
import { events } from "./data";

export function Events() {
  return (
    <section id="events" className="relative bg-[color:var(--ink)] text-[color:var(--cream)] py-20 md:py-28">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="mb-20 max-w-3xl">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
            — Upcoming
          </span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1]">
            Evenings you'll
            <em className="text-[color:var(--brand)]"> remember.</em>
          </h2>
        </div>

        <div className="grid gap-px bg-[color:var(--cream)]/10 md:grid-cols-2">
          {events.map((ev, i) => (
            <Reveal key={ev.title} delay={i * 0.05}>
              <article className="group relative flex h-full flex-col justify-between gap-10 bg-[color:var(--ink)] p-8 md:p-12 transition duration-700 hover:bg-[color:var(--secondary-ink,#2E211B)]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
                      {ev.date}
                    </div>
                    <h3 className="mt-6 font-display text-3xl md:text-4xl">
                      {ev.title}
                    </h3>
                  </div>
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[color:var(--cream)]/20 transition group-hover:border-[color:var(--brand)] group-hover:bg-[color:var(--brand)] group-hover:text-[color:var(--ink)]">
                    →
                  </div>
                </div>
                <p className="max-w-md text-sm leading-relaxed text-[color:var(--cream)]/60">
                  {ev.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
