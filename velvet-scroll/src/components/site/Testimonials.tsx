import { testimonials } from "./data";

export function Testimonials() {
  const loop = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden bg-[color:var(--cream)] py-20 md:py-28">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="mb-16 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
            — Regulars
          </span>
          <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1]">
            In their
            <em className="text-[color:var(--brand)]"> words.</em>
          </h2>
        </div>
      </div>

      <div
        className="relative flex overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-track flex shrink-0 gap-6 pr-6">
          {loop.map((t, i) => (
            <figure
              key={i}
              className="w-[85vw] shrink-0 rounded-sm border border-[color:var(--border)] bg-[color:var(--surface)] p-8 md:w-[440px] md:p-10"
            >
              <div className="font-display text-3xl text-[color:var(--brand)]">
                “
              </div>
              <blockquote className="mt-4 font-display text-2xl leading-[1.25] text-[color:var(--ink)]">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-3 border-t border-[color:var(--border)] pt-6">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[color:var(--ink)] text-[color:var(--cream)] text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm">{t.name}</div>
                  <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--muted-foreground)]">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
