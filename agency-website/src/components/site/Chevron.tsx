export function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 20"
      aria-hidden="true"
      className={`inline-block ${className}`}
      fill="currentColor"
    >
      <path d="M0 0h24L12 20z" />
    </svg>
  );
}

export function ChevronRule({ count = 28 }: { count?: number }) {
  return (
    <div
      aria-hidden="true"
      className="flex w-full items-center justify-between overflow-hidden py-6"
      style={{ color: "var(--local-accent)" }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Chevron key={i} className="h-2 w-3 shrink-0 opacity-80" />
      ))}
    </div>
  );
}

export function ChevronMarquee({ count = 8 }: { count?: number }) {
  const arrows = Array.from({ length: count })
    .map(() => "»")
    .join("");

  return (
    <span aria-hidden="true" className="inline-flex w-14 overflow-hidden">
      <span className="marquee-track tracking-[0.1em]">
        <span>{arrows}</span>
        <span>{arrows}</span>
      </span>
    </span>
  );
}
