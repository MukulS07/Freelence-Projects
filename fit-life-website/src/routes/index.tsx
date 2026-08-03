import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Check,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Youtube,
  Twitter,
  Menu,
  X,
  Flame,
  Activity,
  TrendingUp,
  Zap,
} from "lucide-react";
import heroGym from "@/assets/hero-gym.jpg";
import liftVideo from "@/assets/lift.mp4.asset.json";
import liftWebm from "@/assets/lift.webm.asset.json";

import liftPoster from "@/assets/lift-poster.jpg.asset.json";
import philoVideo from "@/assets/philo.mp4.asset.json";
import philoWebm from "@/assets/philo.webm.asset.json";
import philoPoster from "@/assets/philo-poster.jpg.asset.json";

import program1 from "@/assets/program-1.jpg";
import program2 from "@/assets/program-2.jpg";
import program3 from "@/assets/program-3.jpg";
import program4 from "@/assets/program-4.jpg";
import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coach3 from "@/assets/coach-3.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

/* ---------- Hooks ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .draw-line");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounter(target: number, duration = 1600, start: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return n;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

/* ---------- Nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["Programs", "#programs"],
    ["Coaches", "#coaches"],
    ["Dashboard", "/dashboard"],
    ["Plans", "#plans"],
    ["Contact", "#contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b hair" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center bg-primary text-primary-foreground font-display text-lg">
            Y
          </span>
          <span className="mono-label text-foreground/90">Your Gym Brand</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {links.map(([l, h]) => (
            <a key={l} href={h} className="text-sm text-foreground/70 hover:text-foreground transition-colors">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#join"
            className="hidden md:inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Book a Session <ArrowRight className="h-4 w-4" />
          </a>
          <button
            className="md:hidden text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t hair bg-background">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="py-2 text-foreground/80">
                {l}
              </a>
            ))}
            <a href="#join" onClick={() => setOpen(false)} className="mt-2 bg-primary px-4 py-3 text-center text-primary-foreground">
              Book a Session
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function HeroVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.playbackRate = 0.85;
    const play = () => el.play().catch(() => {});
    play();
    const onVisibility = () => (document.hidden ? el.pause() : play());
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <video
      ref={ref}
      poster={liftPoster.url}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src={liftWebm.url} type="video/webm" />
      <source src={liftVideo.url} type="video/mp4" />
    </video>

  );
}

function Hero() {

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-background pt-24">
      {/* Cinematic video backdrop — poster paints instantly, video fades in on play */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={liftPoster.url}
          alt="Athlete lifting weights in a dark gym"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full scale-105 object-cover"
        />
        <HeroVideo />
        {/* Grade: keep the lifter visible, protect the type on the left */}
        <div className="absolute inset-0 bg-background/15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/35 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_82%_25%,color-mix(in_oklab,var(--primary)_16%,transparent),transparent)]" />

        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
          }}
        />
      </div>


      <div className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1440px] grid-cols-12 gap-6 px-6 pb-16 lg:px-10">
        {/* Left rail */}
        <div className="col-span-12 flex items-end justify-between md:col-span-8">
          <div className="reveal max-w-3xl">
            <div className="mb-8 flex items-center gap-3">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="mono-label">Now enrolling — Winter Intake 2026</span>
            </div>
            <h1 className="font-display text-[16vw] leading-[0.85] tracking-tight md:text-[9.5rem] lg:text-[11rem]">
              TRAIN
              <br />
              BEYOND
              <br />
              <span className="text-primary">LIMITS.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base text-foreground/70 md:text-lg">
              A signature strength &amp; performance studio built around every member — cinematic space,
              elite coaching, and an AI dashboard that tracks the work between sessions.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#join"
                className="group inline-flex items-center gap-3 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                Start Your Free Trial
                <span className="grid h-8 w-8 place-items-center bg-background/20">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
              <a
                href="#plans"
                className="inline-flex items-center gap-2 border hair px-5 py-4 text-sm text-foreground/90 hover:bg-foreground/5"
              >
                <Play className="h-4 w-4" /> View Membership Plans
              </a>
            </div>
          </div>
        </div>

        {/* Right stat card */}
        <div className="col-span-12 hidden md:col-span-4 md:flex md:items-end">
          <div className="reveal w-full border hair bg-background/40 p-5 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="mono-label">Live · session floor</span>
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-primary" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Now", "42"],
                ["Peak", "128"],
                ["Streaks", "312"],
              ].map(([k, v]) => (
                <div key={k}>
                  <div className="font-display text-3xl">{v}</div>
                  <div className="mono-label mt-1">{k}</div>
                </div>
              ))}
            </div>
            <div className="my-4 h-px bg-border" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground/60">Today's signature</span>
              <span className="font-medium">Barbell Complex · 60min</span>
            </div>
          </div>
        </div>
      </div>

      {/* bottom ticker */}
      <div className="absolute bottom-0 inset-x-0 border-y hair overflow-hidden bg-background/60 backdrop-blur">
        <div className="flex whitespace-nowrap marquee-track py-3">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
              {["Strength", "Conditioning", "Hyrox Prep", "Boxing", "Mobility", "Recovery", "Nutrition", "Community"].map(
                (t) => (
                  <span key={t + k} className="mono-label flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-primary" /> {t}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Section header helper ---------- */
function SectionMeta({ index, label }: { index: string; label: string }) {
  return (
    <div className="mb-10 flex items-center justify-between border-b hair pb-4">
      <span className="mono-label">
        {index} / {label}
      </span>
      <span className="mono-label">— scroll</span>
    </div>
  );
}

/* ---------- About ---------- */
function About() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stats = [
    { end: 2400, suffix: "+", label: "Members Trained" },
    { end: 12, suffix: "", label: "Years in Operation" },
    { end: 84, suffix: "", label: "Classes / Week" },
    { end: 96, suffix: "%", label: "Retention Rate" },
  ];
  return (
    <section id="about" className="bg-background px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <SectionMeta index="01" label="The Studio" />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <PhilosophyVideo />
          </div>
          <div className="col-span-12 md:col-span-7 md:pl-6">
            <div className="reveal">
              <div className="mono-label text-primary">— Our Philosophy</div>
              <h2 className="mt-4 font-display text-6xl leading-[0.95] md:text-8xl">
                Built for the
                <br /> ones who
                <br /> <span className="text-primary">show up.</span>
              </h2>
              <p className="mt-8 max-w-xl text-foreground/70">
                We are not a chain. We are a training floor — deliberately dark, purposefully loud, and
                obsessively coached. Every session is programmed. Every rep is measured. Every member has
                a coach who knows their name and their numbers.
              </p>
              <div ref={ref} className="mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((s) => (
                  <StatBlock key={s.label} {...s} start={inView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function StatBlock({ end, suffix, label, start }: { end: number; suffix: string; label: string; start: boolean }) {
  const n = useCounter(end, 1800, start);
  return (
    <div className="border-t hair pt-4">
      <div className="font-display text-5xl">
        {n}
        <span className="text-primary">{suffix}</span>
      </div>
      <div className="mono-label mt-2">{label}</div>
    </div>
  );
}

/* ---------- Philosophy cinematic video ---------- */
function PhilosophyVideo() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);

  // Lazy-load + entrance
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLoad(true);
            setEntered(true);
          }
        }
      },
      { rootMargin: "300px 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Scroll parallax + scale (rAF, GPU transforms)
  useEffect(() => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (reduced || !desktop) return;

    let raf = 0;
    let current = 0;
    let target = 0;

    const compute = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when entering from bottom -> 1 when leaving at top
      target = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
    };

    let running = false;
    const loop = () => {
      const diff = target - current;
      current += diff * 0.12; // smooth easing
      const scale = 1 + 0.12 * current;
      const y = -28 * current;
      inner.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
      if (Math.abs(diff) < 0.0005) {
        running = false;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    // Only react to scroll while the section is anywhere near the viewport
    let near = true;
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting;
        if (near) {
          compute();
          kick();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    const onScroll = () => {
      if (!near) return;
      compute();
      kick();
    };
    compute();
    current = target;
    kick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [load]);


  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;
    const play = () => v.play().catch(() => {});
    play();
    const onVis = () => (document.hidden ? v.pause() : play());
    document.addEventListener("visibilitychange", onVis);
    // Don't decode frames while the section is offscreen — keeps scrolling at 60fps
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting && !document.hidden ? play() : v.pause()),
      { threshold: 0.01 },
    );
    io.observe(v);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [load]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[4/5] overflow-hidden rounded-sm will-change-transform"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "scale(1)" : "scale(0.96)",
        transition: "opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)",
      }}
    >
      <div ref={innerRef} className="absolute inset-0 will-change-transform">
        {load && (
          <video
            ref={videoRef}
            poster={philoPoster.url}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            disablePictureInPicture
            preload="metadata"
            aria-hidden="true"
            onCanPlay={() => setReady(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          >
            <source src={philoWebm.url} type="video/webm" />
            <source src={philoVideo.url} type="video/mp4" />
          </video>
        )}
        <img
          src={philoPoster.url}
          alt="Athlete training on the studio floor"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
        />
      </div>
      {/* Premium dark grade */}
      <div className="pointer-events-none absolute inset-0 bg-background/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
    </div>
  );
}



/* ---------- Programs ---------- */
function Programs() {
  const items = [
    {
      img: program1,
      code: "S1",
      title: "Signature Class",
      desc: "Full-body strength complex — pull, press, carry. Coached in cohorts of 12.",
      duration: "60 MIN",
      intensity: 4,
    },
    {
      img: program2,
      code: "S2",
      title: "Strength Program",
      desc: "12-week barbell block. Squat, bench, deadlift, and accessory volume.",
      duration: "75 MIN",
      intensity: 5,
    },
    {
      img: program3,
      code: "S3",
      title: "HIIT Session",
      desc: "Timed rounds, mixed modality. Built to spike heart rate and sharpen output.",
      duration: "45 MIN",
      intensity: 5,
    },
    {
      img: program4,
      code: "S4",
      title: "Conditioning Lab",
      desc: "Treadmill intervals, ski erg, and rower — with real-time power tracking.",
      duration: "50 MIN",
      intensity: 4,
    },
  ];
  return (
    <section id="programs" className="bg-background px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <SectionMeta index="02" label="Programs" />
        <div className="reveal mb-14 flex items-end justify-between gap-8">
          <h2 className="font-display text-6xl md:text-8xl">
            Four floors of
            <br /> deliberate <span className="text-primary">work.</span>
          </h2>
          <a href="#plans" className="hidden md:inline-flex items-center gap-2 mono-label hover:text-primary">
            View full schedule <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <article
              key={p.code}
              className="reveal group relative overflow-hidden border hair bg-card"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute left-4 top-4 mono-label">{p.code}</div>
                <div className="absolute right-4 top-4 mono-label">{p.duration}</div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-3xl">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground/65">{p.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <span
                        key={k}
                        className={`h-1.5 w-4 ${k < p.intensity ? "bg-primary" : "bg-foreground/15"}`}
                      />
                    ))}
                  </div>
                  <span className="mono-label opacity-0 transition-opacity group-hover:opacity-100">
                    Book →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Coaches ---------- */
function Coaches() {
  const list = [
    { img: coach1, name: "Trainer Name", role: "Head Coach", cred: "S&C · 10 yrs" },
    { img: coach2, name: "Trainer Name", role: "Strength Specialist", cred: "USAW L2" },
    { img: coach3, name: "Trainer Name", role: "Boxing & Conditioning", cred: "Amateur Boxing Assoc." },
  ];
  return (
    <section id="coaches" className="bg-background px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <SectionMeta index="03" label="Coaches" />
        <div className="reveal mb-12">
          <h2 className="font-display text-6xl md:text-8xl">
            Coached, not
            <br /> <span className="text-primary">supervised.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {list.map((c, i) => (
            <div
              key={i}
              className="reveal group relative overflow-hidden border hair"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={c.img}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-all duration-[1200ms] group-hover:grayscale-0 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
                <div className="mono-label text-primary">0{i + 1}</div>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <div className="font-display text-3xl">{c.name}</div>
                    <div className="text-sm text-foreground/70">{c.role}</div>
                  </div>
                  <div className="mono-label">{c.cred}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Dashboard Showcase ---------- */
function Dashboard() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const consistency = useCounter(87, 1800, inView);
  const volume = useCounter(24280, 2000, inView);
  const streak = useCounter(42, 1400, inView);
  const [tab, setTab] = useState<"Progress" | "Classes" | "Nutrition">("Progress");

  const chartPoints = [12, 18, 14, 22, 19, 28, 24, 34, 30, 38, 42, 48];
  const max = 50;
  const w = 560;
  const h = 180;
  const step = w / (chartPoints.length - 1);
  const line = chartPoints
    .map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${h - (v / max) * h}`)
    .join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;

  return (
    <section id="dashboard" className="relative bg-background px-6 py-28 lg:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(700px_400px_at_20%_50%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionMeta index="04" label="Member Dashboard" />
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <div className="reveal">
              <div className="mono-label text-primary">— Signature Feature</div>
              <h2 className="mt-4 font-display text-6xl leading-[0.95] md:text-7xl">
                Every member
                <br /> gets an
                <br /> <span className="text-primary">AI dashboard.</span>
              </h2>
              <p className="mt-6 max-w-md text-foreground/70">
                Track every session, streak, and body metric in one place. Your coach sees the same view —
                so programming adapts to the work you actually put in.
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {[
                  "Session-by-session strength and conditioning trend lines",
                  "Auto-detected streaks, PRs, and deload alerts",
                  "Weekly AI insights delivered every Monday",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    <span className="text-foreground/80">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mock dashboard */}
          <div className="col-span-12 md:col-span-7">
            <div
              ref={ref}
              className="reveal relative border hair bg-card/60 backdrop-blur"
            >
              {/* window bar */}
              <div className="flex items-center justify-between border-b hair px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-foreground/25" />
                  <span className="h-2 w-2 rounded-full bg-foreground/25" />
                  <span className="h-2 w-2 rounded-full bg-primary pulse-dot" />
                </div>
                <div className="mono-label">yourgymbrand.app / dashboard</div>
                <div className="mono-label flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary pulse-dot" /> LIVE
                </div>
              </div>

              {/* tabs */}
              <div className="flex gap-1 border-b hair px-4 pt-3">
                {(["Progress", "Classes", "Nutrition"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`relative px-4 py-2 text-sm transition-colors ${
                      tab === t ? "text-foreground" : "text-foreground/50 hover:text-foreground/80"
                    }`}
                  >
                    {t}
                    {tab === t && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 p-4">
                <MetricCard
                  icon={<Flame className="h-4 w-4" />}
                  label="Consistency"
                  value={`${consistency}%`}
                  hint="+18% vs last month"
                />
                <MetricCard
                  icon={<Activity className="h-4 w-4" />}
                  label="Volume (kg)"
                  value={volume.toLocaleString()}
                  hint="12-week trend"
                />
                <MetricCard
                  icon={<Zap className="h-4 w-4" />}
                  label="Streak"
                  value={`${streak} days`}
                  hint="Personal best"
                />
              </div>

              <div className="mx-4 mb-4 border hair p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="mono-label">Session output · last 12 weeks</div>
                  <div className="mono-label text-primary">+42%</div>
                </div>
                <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="var(--primary)" stopOpacity="0.35" />
                      <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* grid */}
                  {[0, 1, 2, 3].map((i) => (
                    <line
                      key={i}
                      x1="0"
                      x2={w}
                      y1={(h / 3) * i}
                      y2={(h / 3) * i}
                      stroke="currentColor"
                      strokeOpacity="0.08"
                    />
                  ))}
                  <path d={area} fill="url(#g)" />
                  <path
                    d={line}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2"
                    className="draw-line"
                  />
                  {chartPoints.map((v, i) => (
                    <circle
                      key={i}
                      cx={i * step}
                      cy={h - (v / max) * h}
                      r="2.5"
                      fill="var(--primary)"
                    />
                  ))}
                </svg>
                <div className="mt-2 flex justify-between mono-label">
                  <span>W1</span><span>W4</span><span>W8</span><span>W12</span>
                </div>
              </div>

              <div className="mx-4 mb-4 flex items-start gap-3 border hair bg-primary/5 p-4">
                <div className="grid h-8 w-8 shrink-0 place-items-center bg-primary text-primary-foreground">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <div className="mono-label text-primary">AI Insight · Mon 09:14</div>
                  <div className="mt-1 text-sm text-foreground/85">
                    Your consistency this month is up 18%. Volume is trending ahead — schedule a deload
                    session this Friday to protect the streak.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="border hair p-4">
      <div className="flex items-center gap-2 text-foreground/70">
        <span className="text-primary">{icon}</span>
        <span className="mono-label">{label}</span>
      </div>
      <div className="mt-3 font-display text-4xl">{value}</div>
      <div className="mt-1 text-xs text-foreground/50">{hint}</div>
    </div>
  );
}

/* ---------- Plans ---------- */
function Plans() {
  const tiers = [
    {
      name: "Starter Plan",
      price: "49",
      tag: "For the first 30 days",
      features: ["4 group sessions / month", "Access to open floor", "Base dashboard access"],
      cta: "Choose Starter",
      featured: false,
    },
    {
      name: "Pro Plan",
      price: "129",
      tag: "Most popular",
      features: [
        "Unlimited group sessions",
        "Monthly 1:1 with a coach",
        "Full AI dashboard + weekly insights",
        "Guest passes (2 / month)",
      ],
      cta: "Choose Pro",
      featured: true,
    },
    {
      name: "Elite Plan",
      price: "289",
      tag: "Programmed for you",
      features: [
        "Everything in Pro",
        "Weekly 1:1 coaching",
        "Custom periodized program",
        "InBody scan + nutrition plan",
      ],
      cta: "Choose Elite",
      featured: false,
    },
  ];
  return (
    <section id="plans" className="bg-paper text-ink px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-10 flex items-center justify-between border-b hair-ink pb-4">
          <span className="mono-label-ink">05 / Membership</span>
          <span className="mono-label-ink">— pick your track</span>
        </div>
        <div className="reveal mb-14 max-w-3xl">
          <h2 className="font-display text-6xl leading-[0.95] md:text-8xl">
            Simple pricing.
            <br /> <span className="text-primary">Serious training.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className={`reveal relative flex flex-col border p-8 ${
                t.featured
                  ? "border-primary bg-ink text-paper md:-translate-y-4 md:scale-[1.02]"
                  : "border-ink/15 bg-paper"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {t.featured && (
                <div className="absolute -top-3 left-8 bg-primary px-3 py-1 mono-label text-primary-foreground">
                  Most Popular
                </div>
              )}
              <div className="mono-label" style={t.featured ? { color: "color-mix(in oklab, var(--paper) 65%, transparent)" } : undefined}>
                {t.tag}
              </div>
              <div className="mt-3 font-display text-4xl">{t.name}</div>
              <div className="mt-6 flex items-end gap-1">
                <span className="font-display text-7xl leading-none">${t.price}</span>
                <span className={`pb-2 text-sm ${t.featured ? "text-paper/60" : "text-ink/60"}`}>/mo</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 ${t.featured ? "text-primary" : "text-primary"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#join"
                className={`mt-10 inline-flex items-center justify-center gap-2 px-5 py-4 text-sm font-medium transition-transform hover:scale-[1.02] ${
                  t.featured ? "bg-primary text-primary-foreground" : "bg-ink text-paper"
                }`}
              >
                {t.cta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery ---------- */
function Gallery() {
  const shots = [
    { src: gallery1, span: "md:col-span-8", aspect: "aspect-[16/10]" },
    { src: gallery2, span: "md:col-span-4", aspect: "aspect-[3/4]" },
    { src: program4, span: "md:col-span-4", aspect: "aspect-[3/4]" },
    { src: gallery3, span: "md:col-span-8", aspect: "aspect-[16/10]" },
  ];
  return (
    <section id="gallery" className="bg-background px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <SectionMeta index="06" label="Facility" />
        <div className="reveal mb-10">
          <h2 className="font-display text-6xl md:text-8xl">
            The <span className="text-primary">floor.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {shots.map((s, i) => (
            <div
              key={i}
              className={`reveal overflow-hidden ${s.span}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`${s.aspect} overflow-hidden`}>
                <img
                  src={s.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  const quotes = [
    {
      q: "Dropped 9kg and pulled my first 180kg deadlift in six months. The dashboard kept me honest.",
      n: "Rhea M.",
      r: "Pro member since 2023",
    },
    {
      q: "It doesn't feel like a gym. It feels like a team. The coaches actually program for you.",
      n: "Arjun T.",
      r: "Elite member since 2022",
    },
    {
      q: "I've trained in five cities. This is the first place that treated my training like a project.",
      n: "Maya K.",
      r: "Pro member since 2024",
    },
  ];
  return (
    <section className="bg-background px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <SectionMeta index="07" label="Members" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {quotes.map((t, i) => (
            <figure
              key={i}
              className="reveal border hair p-8"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="font-display text-6xl text-primary">"</div>
              <blockquote className="mt-2 text-lg leading-snug text-foreground/90">{t.q}</blockquote>
              <figcaption className="mt-8 flex items-center justify-between border-t hair pt-4">
                <span className="text-sm font-medium">{t.n}</span>
                <span className="mono-label">{t.r}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Join CTA ---------- */
function Join() {
  return (
    <section id="join" className="relative overflow-hidden bg-primary text-primary-foreground px-6 py-28 lg:px-10">
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <img src={heroGym} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-7">
          <div className="mono-label" style={{ color: "color-mix(in oklab, white 75%, transparent)" }}>
            08 / Start
          </div>
          <h2 className="mt-4 font-display text-6xl leading-[0.9] md:text-9xl">
            Book a free
            <br /> intro session.
          </h2>
          <p className="mt-6 max-w-md opacity-85">
            One session. One coach. No pressure. Walk out with a training plan built around you — and
            decide from there.
          </p>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="col-span-12 md:col-span-5 border border-white/20 bg-black/25 p-6 backdrop-blur"
        >
          <div className="mono-label" style={{ color: "color-mix(in oklab, white 75%, transparent)" }}>
            Lead capture
          </div>
          <div className="mt-4 space-y-3">
            <input
              placeholder="Your name"
              className="w-full border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/60 focus:outline-none focus:border-white"
            />
            <input
              placeholder="Phone / WhatsApp"
              className="w-full border border-white/25 bg-transparent px-4 py-3 text-sm placeholder:text-white/60 focus:outline-none focus:border-white"
            />
            <select className="w-full border border-white/25 bg-transparent px-4 py-3 text-sm text-white/90 focus:outline-none focus:border-white [&>option]:text-ink">
              <option>Preferred class — Signature</option>
              <option>Preferred class — Strength</option>
              <option>Preferred class — HIIT</option>
              <option>Preferred class — Conditioning</option>
            </select>
            <button className="group inline-flex w-full items-center justify-center gap-3 bg-white px-5 py-4 text-sm font-medium text-primary transition-transform hover:scale-[1.02]">
              Book my free trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  return (
    <section id="contact" className="bg-background px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <SectionMeta index="09" label="Visit" />
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-5">
            <h2 className="font-display text-6xl md:text-7xl">
              Find the <span className="text-primary">floor.</span>
            </h2>
            <ul className="mt-10 space-y-6">
              {[
                { icon: <MapPin className="h-5 w-5" />, k: "Address", v: "123 Your Street, Your City" },
                { icon: <Phone className="h-5 w-5" />, k: "Phone", v: "+91 00000 00000" },
                { icon: <Mail className="h-5 w-5" />, k: "Email", v: "hello@yourgymbrand.com" },
              ].map((r) => (
                <li key={r.k} className="flex items-start gap-4 border-b hair pb-6">
                  <span className="mt-1 text-primary">{r.icon}</span>
                  <div>
                    <div className="mono-label">{r.k}</div>
                    <div className="mt-1 text-lg">{r.v}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex items-center gap-3">
              {[Instagram, Twitter, Youtube].map((I, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center border hair hover:border-primary hover:text-primary"
                >
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden border hair">
              {/* Stylized dark map */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "oklch(0.14 0.008 20)",
                  backgroundImage:
                    "linear-gradient(color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px)",
                  backgroundSize: "48px 48px, 48px 48px",
                }}
              />
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 300" preserveAspectRatio="none">
                <path d="M0,180 C80,120 160,220 240,150 S400,80 400,140" fill="none" stroke="color-mix(in oklab, var(--foreground) 15%, transparent)" strokeWidth="1.5" />
                <path d="M0,60 L120,80 L200,40 L320,90 L400,60" fill="none" stroke="color-mix(in oklab, var(--foreground) 12%, transparent)" strokeWidth="1" />
                <path d="M40,300 L60,220 L120,200 L180,240 L220,180 L280,220 L340,180 L400,220" fill="none" stroke="color-mix(in oklab, var(--foreground) 10%, transparent)" strokeWidth="1" />
              </svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="relative">
                  <span className="absolute inset-0 -m-4 rounded-full bg-primary/30 blur-xl" />
                  <span className="relative grid h-10 w-10 place-items-center bg-primary text-primary-foreground">
                    <MapPin className="h-5 w-5" />
                  </span>
                </div>
                <div className="mt-3 mono-label">Your Gym Brand · Your City</div>
              </div>
              <div className="absolute bottom-4 left-4 border hair bg-background/70 px-3 py-2 backdrop-blur">
                <div className="mono-label">Hours</div>
                <div className="text-sm">Mon–Fri 05:00 – 23:00 · Sat 06:00 – 20:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="bg-background px-6 pt-16 pb-10 lg:px-10 border-t hair">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center bg-primary text-primary-foreground font-display text-lg">Y</span>
              <span className="font-display text-3xl">YOUR GYM BRAND</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-foreground/60">
              A signature strength &amp; performance studio in Your City. Coached programming, cinematic
              space, and an AI dashboard for every member.
            </p>
          </div>
          {[
            { t: "Studio", l: ["About", "Programs", "Coaches", "Facility"] },
            { t: "Members", l: ["Dashboard", "Plans", "Guest Pass", "Login"] },
            { t: "Contact", l: ["hello@yourgymbrand.com", "+91 00000 00000", "@yourgymbrand"] },
          ].map((c) => (
            <div key={c.t} className="col-span-6 md:col-span-2">
              <div className="mono-label">{c.t}</div>
              <ul className="mt-4 space-y-2 text-sm">
                {c.l.map((x) => (
                  <li key={x}>
                    <a href="#" className="text-foreground/75 hover:text-foreground">
                      {x}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-12 md:col-span-1 flex items-start justify-end">
            <a
              href="#top"
              className="grid h-10 w-10 place-items-center border hair hover:border-primary hover:text-primary"
              aria-label="Back to top"
            >
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t hair pt-6 md:flex-row md:items-center">
          <span className="mono-label">© {new Date().getFullYear()} Your Gym Brand. All rights reserved.</span>
          <span className="mono-label">Designed for the ones who show up.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */
function Landing() {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <About />
      <Programs />
      <Coaches />
      <Dashboard />
      <Plans />
      <Gallery />
      <Testimonials />
      <Join />
      <Contact />
      <Footer />
    </main>
  );
}
