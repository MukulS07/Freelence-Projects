import { Reveal } from "./Reveal";
import { images } from "./data";

export function Gallery() {
  const items = [
    { src: images.gallery[0], span: "row-span-2", ratio: "aspect-[3/4]" },
    { src: images.gallery[1], span: "", ratio: "aspect-[4/3]" },
    { src: images.gallery[2], span: "row-span-2", ratio: "aspect-[3/4]" },
    { src: images.gallery[3], span: "", ratio: "aspect-[4/3]" },
    { src: images.gallery[4], span: "", ratio: "aspect-[3/4]" },
  ];

  return (
    <section id="gallery" className="relative bg-[color:var(--surface)] py-20 md:py-28">
      <div className="container-x mx-auto max-w-[1440px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
              — Inside Rangoon
            </span>
            <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1] max-w-2xl">
              Moments,
              <em className="text-[color:var(--brand)]"> unposed.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm text-[color:var(--muted-foreground)]">
            A room built to slow you down — warm brass, worn walnut, soft
            lantern light and the constant hush of steam.
          </p>
        </div>

        <div className="grid auto-rows-[minmax(220px,auto)] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((it, i) => (
            <Reveal
              key={i}
              delay={i * 0.05}
              className={`${it.span} overflow-hidden rounded-sm`}
            >
              <div className="group relative h-full w-full overflow-hidden">
                <img
                  src={it.src}
                  loading="lazy"
                  alt=""
                  className={`h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-110`}
                />
                <div className="absolute inset-0 bg-[color:var(--ink)]/0 transition duration-700 group-hover:bg-[color:var(--ink)]/20" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
