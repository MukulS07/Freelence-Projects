import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 30,
}: {
  children: ReactNode;
  delay?: number | undefined;
  className?: string | undefined;
  y?: number | undefined;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function RevealLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[];
  className?: string | undefined;
  lineClassName?: string | undefined;
}) {
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <Reveal key={line} delay={i * 0.09} className={lineClassName}>
          <span className="block">{line}</span>
        </Reveal>
      ))}
    </div>
  );
}
