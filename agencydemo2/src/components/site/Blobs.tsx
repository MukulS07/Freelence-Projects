import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

type Blob = {
  className: string;
  size: number;
  x: string;
  y: string;
  duration: number;
  depth: number;
};

const BLOBS: Blob[] = [
  { className: "bg-spot-yellow", size: 190, x: "6%", y: "12%", duration: 14, depth: -120 },
  { className: "bg-spot-clay", size: 110, x: "82%", y: "20%", duration: 11, depth: 90 },
  { className: "bg-spot-olive", size: 70, x: "70%", y: "72%", duration: 17, depth: -60 },
  { className: "bg-spot-blue", size: 140, x: "14%", y: "78%", duration: 13, depth: 140 },
  { className: "bg-spot-yellow", size: 46, x: "46%", y: "8%", duration: 9, depth: 60 },
];

export function Blobs() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <BlobDot key={i} blob={blob} scrollY={scrollY} reduce={!!reduce} />
      ))}
    </div>
  );
}

function BlobDot({
  blob,
  scrollY,
  reduce,
}: {
  blob: Blob;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
  reduce: boolean;
}) {
  const parallax = useTransform(scrollY, [0, 900], [0, blob.depth]);

  return (
    <motion.span
      className={`absolute rounded-full opacity-90 blur-[0.5px] ${blob.className}`}
      style={{
        width: blob.size,
        height: blob.size,
        left: blob.x,
        top: blob.y,
        y: reduce ? 0 : parallax,
      }}
      animate={reduce ? undefined : { x: [0, 18, -12, 0], scale: [1, 1.06, 0.97, 1] }}
      transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
