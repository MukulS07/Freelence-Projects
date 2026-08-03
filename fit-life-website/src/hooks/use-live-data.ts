import { useEffect, useRef, useState } from "react";

/**
 * Tween helpers for the dashboard's "live data" motion layer.
 * Everything is client-side mock data — no backend involved.
 */

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

function usePageVisible() {
  const [visible, setVisible] = useState(
    typeof document === "undefined" ? true : !document.hidden,
  );
  useEffect(() => {
    const onChange = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return visible;
}

export type LiveSeriesOpts = {
  length: number;
  min: number;
  max: number;
  /** Max per-tick fluctuation as fraction of (max-min). */
  drift?: number;
  /** How often to push a new snapshot. */
  intervalMs?: number;
  /** Ease duration between snapshots. */
  tweenMs?: number;
  /** Sliding window (shift + push) vs. in-place drift on all values. */
  slide?: boolean;
  /** External pause switch (in addition to page visibility). */
  paused?: boolean;
  /** Seed values so first paint is stable. */
  seed?: number[];
  /**
   * Emit one snapshot per interval and let CSS handle the easing.
   * Avoids 60fps re-renders (and the resulting flicker) for bar charts.
   */
  cssTween?: boolean;
};

/**
 * Returns a live-updating array of numbers that eases between snapshots.
 * Safe on SSR — mounts return the seed until the effect runs.
 */
export function useLiveSeries(opts: LiveSeriesOpts): number[] {
  const {
    length,
    min,
    max,
    drift = 0.08,
    intervalMs = 2000,
    tweenMs = 700,
    slide = false,
    paused = false,
    seed,
    cssTween = false,
  } = opts;

  const visible = usePageVisible();
  const active = visible && !paused;

  const initial = useRef<number[]>(
    seed && seed.length === length
      ? seed.slice()
      : Array.from({ length }, () => min + Math.random() * (max - min)),
  );
  const [display, setDisplay] = useState<number[]>(initial.current);

  // Authoritative values live in a ref so the interval never depends on
  // (or mutates) state during render — that double-fire was the flicker.
  const valuesRef = useRef<number[]>(initial.current);
  const fromRef = useRef<number[]>(initial.current);
  const toRef = useRef<number[]>(initial.current);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const clamp = (v: number) => Math.max(min, Math.min(max, v));
    const range = max - min;

    const animate = () => {
      const now = performance.now();
      const p = Math.min(1, (now - startRef.current) / tweenMs);
      const eased = easeOutCubic(p);
      const next = fromRef.current.map(
        (f, i) => f + (toRef.current[i] - f) * eased,
      );
      valuesRef.current = next;
      setDisplay(next);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };

    const tick = () => {
      const current = valuesRef.current;
      let from = current.slice();
      let to: number[];
      if (slide) {
        const last = current[current.length - 1] ?? min;
        const nv = clamp(last + (Math.random() * 2 - 1) * drift * range);
        to = [...current.slice(1), nv];
        from = [...current.slice(1), last];
      } else {
        to = current.map((v) =>
          clamp(v + (Math.random() * 2 - 1) * drift * range),
        );
      }

      if (cssTween) {
        valuesRef.current = to;
        setDisplay(to);
        return;
      }

      fromRef.current = from;
      toRef.current = to;
      valuesRef.current = from;
      setDisplay(from);
      startRef.current = performance.now();
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    };

    const iv = setInterval(tick, intervalMs);
    return () => {
      clearInterval(iv);
      cancelAnimationFrame(rafRef.current);
    };
  }, [active, intervalMs, tweenMs, min, max, drift, slide, cssTween]);

  return display;
}


/**
 * Rolls a numeric display through intermediate values whenever `value` changes.
 */
export function useCountUp(value: number, durationMs = 700): number {
  const [display, setDisplay] = useState(value);
  const fromRef = useRef(value);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    fromRef.current = display;
    startRef.current = performance.now();
    const tick = () => {
      const p = Math.min(1, (performance.now() - startRef.current) / durationMs);
      const eased = easeOutCubic(p);
      setDisplay(fromRef.current + (value - fromRef.current) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, durationMs]);

  return display;
}

/**
 * A single live-drifting number, useful for KPI cards.
 */
export function useLiveValue({
  base,
  jitter = 0.015,
  intervalMs = 2400,
  paused = false,
}: {
  base: number;
  jitter?: number;
  intervalMs?: number;
  paused?: boolean;
}) {
  const visible = usePageVisible();
  const active = visible && !paused;
  const [target, setTarget] = useState(base);
  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => {
      setTarget((prev) => {
        const swing = base * jitter;
        // gently anchor toward base so it doesn't drift away
        const pull = (base - prev) * 0.25;
        const noise = (Math.random() * 2 - 1) * swing;
        return prev + pull + noise;
      });
    }, intervalMs);
    return () => clearInterval(iv);
  }, [active, base, jitter, intervalMs]);
  return target;
}
