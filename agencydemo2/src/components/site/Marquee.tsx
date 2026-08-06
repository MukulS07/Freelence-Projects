export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];

  return (
    <div className="group relative overflow-hidden border-y border-ink/15 py-6">
      <div className="marquee-track flex w-max gap-10 group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-10">
            {row.map((item, i) => (
              <span key={`${copy}-${i}`} className="flex items-center gap-10">
                <span className="font-display text-4xl tracking-tight text-ink md:text-6xl">
                  {item}
                </span>
                <span className="text-3xl text-spot-clay">&bull;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
