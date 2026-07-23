import { motion } from "motion/react";

export function Marquee() {
  const words = ["Small Batch", "Single Origin", "Slow Roasted", "Hand Poured", "Warm Rooms", "Since 2014"];
  const loop = [...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-[color:var(--border)] bg-[color:var(--cream)] py-8">
      <motion.div
        className="flex whitespace-nowrap gap-16"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {loop.map((w, i) => (
          <span key={i} className="flex items-center gap-16 font-display text-4xl md:text-6xl italic">
            {w}
            <span className="text-[color:var(--brand)]">✻</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
