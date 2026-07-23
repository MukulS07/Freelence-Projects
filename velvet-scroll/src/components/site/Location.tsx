import { Reveal } from "./Reveal";
import { brand } from "./data";

export function Location() {
  return (
    <section id="visit" className="relative bg-[color:var(--surface)] py-20 md:py-28">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
                — Find Us
              </span>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1]">
                Come sit
                <br />
                <em className="text-[color:var(--brand)]">a while.</em>
              </h2>
            </Reveal>

            <div className="mt-14 space-y-10">
              <Reveal>
                <Row label="Address" value={brand.address} />
              </Reveal>
              <Reveal>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted-foreground)] mb-3">
                    Opening Hours
                  </div>
                  <ul className="space-y-2">
                    {brand.hours.map((h) => (
                      <li key={h.day} className="flex items-baseline gap-6 border-b border-dashed border-[color:var(--border)] pb-2 font-display text-lg">
                        <span className="w-32 text-[color:var(--muted-foreground)] text-sm uppercase tracking-[0.2em]">{h.day}</span>
                        <span className="flex-1 text-right">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal>
                <div className="grid grid-cols-2 gap-6">
                  <Row label="Phone" value={brand.phone} />
                  <Row label="Email" value={brand.email} />
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm md:aspect-[3/4]">
                {/* Stylised map — no external API */}
                <div className="absolute inset-0 bg-[color:var(--ink)]" />
                <svg viewBox="0 0 400 500" className="absolute inset-0 h-full w-full">
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#F6F2EC" strokeOpacity="0.05" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="500" fill="url(#grid)" />
                  <path d="M 0 220 Q 100 200 200 240 T 400 260" stroke="#B98952" strokeOpacity="0.4" strokeWidth="1" fill="none" />
                  <path d="M 40 60 L 60 500" stroke="#F6F2EC" strokeOpacity="0.12" strokeWidth="40" fill="none" />
                  <path d="M 340 0 L 320 500" stroke="#F6F2EC" strokeOpacity="0.08" strokeWidth="24" fill="none" />
                  <path d="M 0 340 L 400 320" stroke="#F6F2EC" strokeOpacity="0.1" strokeWidth="30" fill="none" />
                  <circle cx="200" cy="250" r="60" fill="#B98952" fillOpacity="0.1">
                    <animate attributeName="r" values="40;80;40" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.15;0;0.15" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="200" cy="250" r="8" fill="#B98952" />
                  <circle cx="200" cy="250" r="14" fill="none" stroke="#B98952" strokeWidth="1" />
                </svg>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-sm bg-[color:var(--cream)]/10 backdrop-blur-md px-5 py-4 text-[color:var(--cream)]">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] opacity-60">Rangoon Coffee Brewery</div>
                    <div className="mt-1 font-display text-lg">Sule Pagoda Road · Yangon</div>
                  </div>
                  <a
                    href="#"
                    className="text-[11px] uppercase tracking-[0.28em] text-[color:var(--brand)] hover:underline"
                  >
                    Directions →
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--muted-foreground)]">
        {label}
      </div>
      <div className="mt-2 font-display text-2xl">{value}</div>
    </div>
  );
}
