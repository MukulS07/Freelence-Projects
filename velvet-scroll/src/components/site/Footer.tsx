import { brand, nav } from "./data";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[color:var(--ink)] text-[color:var(--cream)]">
      <div className="container-x mx-auto max-w-[1440px] pt-24 pb-10">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="font-display text-[18vw] leading-[0.85] md:text-[10rem] tracking-tight">
              Rangoon<span className="text-[color:var(--brand)]">.</span>
            </div>
            <p className="mt-8 max-w-md text-sm text-[color:var(--cream)]/50">
              Small-batch coffee, warm rooms, slow mornings — since 2014.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--cream)]/40">
              Navigate
            </div>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm hover:text-[color:var(--brand)] transition">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.32em] text-[color:var(--cream)]/40">
              Newsletter
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="mt-5 flex items-center border-b border-[color:var(--cream)]/20 py-2">
              <input
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--cream)]/30"
              />
              <button className="text-[11px] uppercase tracking-[0.3em] text-[color:var(--brand)]">Join →</button>
            </form>
            <div className="mt-8 flex gap-4 text-[11px] uppercase tracking-[0.3em]">
              {brand.social.map((s) => (
                <a key={s.label} href={s.href} className="text-[color:var(--cream)]/60 hover:text-[color:var(--brand)] transition">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[color:var(--cream)]/10 pt-8 text-[11px] uppercase tracking-[0.28em] text-[color:var(--cream)]/40 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Rangoon Coffee Brewery. All rights reserved.</div>
          <div>Crafted with care · Yangon, Myanmar</div>
        </div>
      </div>
    </footer>
  );
}
