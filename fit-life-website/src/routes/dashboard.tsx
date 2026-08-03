import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users2,
  BarChart3,
  Dumbbell,
  HelpCircle,
  Settings,
  Sun,
  Moon,
  Bell,
  Mail,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Pencil,
  X,
  Plus,
  Search,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  TrendingUp,
  UserPlus,
  Filter,
} from "lucide-react";

import coach1 from "@/assets/coach-1.jpg";
import coach2 from "@/assets/coach-2.jpg";
import coach3 from "@/assets/coach-3.jpg";
import program1 from "@/assets/program-1.jpg";
import program2 from "@/assets/program-2.jpg";
import program3 from "@/assets/program-3.jpg";
import program4 from "@/assets/program-4.jpg";
import { useCountUp, useLiveSeries, useLiveValue } from "@/hooks/use-live-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Spatial Dashboard — Your Gym Brand CRM" },
      {
        name: "description",
        content:
          "A spatial CRM for gym managers — members, classes, trainers, timelines and challenges in one glass workspace.",
      },
      { property: "og:title", content: "Spatial Dashboard — Your Gym Brand CRM" },
      {
        property: "og:description",
        content:
          "Manage members, classes, trainers and challenges from a cinematic spatial workspace.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

type SectionId = "Dashboard" | "Members" | "Analytics" | "Settings";

/* ------------------------------------------------------------------ */
/* Glass panel                                                         */
/* ------------------------------------------------------------------ */
function Glass({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-[28px] border border-white/15 bg-white/[0.06] p-5 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl backdrop-saturate-150 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-b from-white/10 to-transparent opacity-60" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sidebar                                                             */
/* ------------------------------------------------------------------ */
function Sidebar({
  active,
  onChange,
}: {
  active: SectionId;
  onChange: (id: SectionId) => void;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const nav: { icon: typeof LayoutDashboard; label: SectionId; badge?: number }[] = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users2, label: "Members" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <Glass className="flex h-full w-[240px] shrink-0 flex-col">
      <div className="mb-8 flex items-center gap-2.5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/90">
          <Dumbbell className="h-4 w-4 text-primary-foreground" />
        </div>
        <div>
          <div className="text-[15px] font-semibold text-white">FitnessUp</div>
          <div className="text-[10px] uppercase tracking-[0.16em] text-white/50">
            Workspace
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {nav.map((n) => (
          <button
            key={n.label}
            onClick={() => onChange(n.label)}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
              active === n.label
                ? "bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_hsl(0_0%_0%/0.6),inset_0_1px_0_rgba(255,255,255,0.2)]"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            <n.icon className="h-4 w-4" />
            <span className="flex-1 text-left">{n.label}</span>
            {n.badge ? (
              <span
                className={`grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[10px] font-semibold ${
                  active === n.label
                    ? "bg-white/25 text-white"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {n.badge}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-1 pt-6">
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white">
          <HelpCircle className="h-4 w-4" /> Help
        </button>
        <button className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white">
          <Settings className="h-4 w-4" /> Setting
        </button>

        <div className="mt-4 flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1">
          <button
            onClick={() => setTheme("light")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs transition-all ${
              theme === "light" ? "bg-white text-black" : "text-white/70"
            }`}
          >
            <Sun className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-1.5 text-xs transition-all ${
              theme === "dark" ? "bg-white text-black" : "text-white/70"
            }`}
          >
            <Moon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Glass>
  );
}

/* ------------------------------------------------------------------ */
/* Members chart                                                       */
/* ------------------------------------------------------------------ */
function MembersChart() {
  const [range, setRange] = useState<"weekly" | "monthly">("weekly");
  const [hover, setHover] = useState<number | null>(3);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const values = useLiveSeries({
    length: 7,
    min: 30,
    max: 96,
    drift: 0.12,
    intervalMs: 2600,
    cssTween: true,
    seed: [62, 74, 48, 92, 40, 82, 66],
  });


  return (
    <Glass className="flex-1">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-[15px] font-semibold text-white">Members counting</div>
          <span className="pulse-dot inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Live
          </span>
        </div>
        <button
          onClick={() => setRange(range === "weekly" ? "monthly" : "weekly")}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80 hover:bg-white/15"
        >
          {range}
          <ChevronRight className="h-3 w-3 rotate-90" />
        </button>
      </div>

      <div className="relative h-[190px]">
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="border-t border-dashed border-white/15" />
          ))}
        </div>

        <div className="relative flex h-full items-end justify-between gap-2 pt-4">
          {values.map((v, i) => {
            const count = Math.round(150 + v * 3);
            return (
              <div
                key={months[i]}
                className="group relative flex h-full flex-1 flex-col items-center justify-end"
                onMouseEnter={() => setHover(i)}
              >
                {hover === i && (
                  <div className="absolute -top-9 z-10 whitespace-nowrap rounded-lg border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                    <span className="text-white/50">{months[i]}</span>{" "}
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />{" "}
                    {count} members
                  </div>
                )}
                <div
                  className={`w-full rounded-t-md will-change-[height] ${
                    hover === i ? "bg-primary" : "bg-white/85"
                  }`}
                  style={{
                    height: `${v}%`,
                    transition: `height 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 60}ms, background-color 200ms`,
                  }}
                />

                <div className="mt-1.5 text-[10px] text-white/50">{months[i]}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Glass>
  );
}

function PopularClasses() {
  const items = [
    { img: program1, title: "Routine Workout" },
    { img: program2, title: "Bodybuilding" },
  ];
  return (
    <Glass className="w-[280px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[15px] font-semibold text-white">Popular Classes</div>
        <button className="text-white/60 hover:text-white">
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((i) => (
          <div key={i.title} className="group relative overflow-hidden rounded-2xl">
            <img
              src={i.img}
              alt={i.title}
              width={480}
              height={200}
              loading="lazy"
              className="h-24 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-2 left-3 text-sm font-semibold text-white">
              {i.title}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-2">
          {[coach1, coach2, coach3].map((c, idx) => (
            <img
              key={idx}
              src={c}
              alt=""
              width={40}
              height={40}
              loading="lazy"
              className="h-7 w-7 rounded-full border-2 border-white/80 object-cover"
            />
          ))}
          <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-white/80 bg-white/80 text-[10px] font-semibold text-black">
            +25
          </span>
        </div>
        <button className="rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:brightness-110">
          See all
        </button>
      </div>
    </Glass>
  );
}

function Timeline() {
  const days = [
    { d: "S", n: 27, m: "MAR" },
    { d: "M", n: 28, m: "MAR" },
    { d: "T", n: 29, m: "MAR" },
    { d: "W", n: 30, m: "MAR" },
    { d: "T", n: 31, m: "MAR", active: true },
    { d: "F", n: 1, m: "APR" },
    { d: "S", n: 2, m: "APR" },
    { d: "S", n: 3, m: "APR" },
    { d: "M", n: 4, m: "APR" },
    { d: "T", n: 5, m: "APR" },
    { d: "W", n: 6, m: "APR" },
    { d: "T", n: 7, m: "APR" },
    { d: "F", n: 8, m: "APR" },
  ];

  const events = [
    { title: "Cycling", time: "8 AM to 10 AM", col: 4, span: 3, color: "bg-primary", text: "text-primary-foreground" },
    { title: "Yoga Flow", time: "11 AM to 12 PM", col: 8, span: 2, color: "bg-white/85", text: "text-black" },
    { title: "Boxing", time: "5 PM to 6 PM", col: 11, span: 2, color: "bg-primary", text: "text-primary-foreground" },
  ];

  return (
    <Glass className="mt-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[15px] font-semibold text-white">Timeline</div>
        <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-1 py-0.5 text-[11px] text-white/80">
          <button className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/10">
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>
          <span className="px-2 font-medium tracking-wider">APR, 2022</span>
          <button className="grid h-6 w-6 place-items-center rounded-full hover:bg-white/10">
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1 text-[10px] text-white/50">
        {days.map((d, i) => {
          const showMonth = i === 0 || days[i - 1]?.m !== d.m;
          return (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`mb-1 h-3 text-[10px] font-semibold uppercase tracking-wider ${
                  showMonth ? "text-white/70" : "text-transparent"
                }`}
              >
                {d.m}
              </div>
              <div
                className={`flex items-baseline gap-1 rounded-md px-1.5 py-0.5 ${
                  d.active ? "bg-white/15 text-white" : ""
                }`}
              >
                <span>{d.d}</span>
                <span className="font-semibold">{d.n}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative">
        <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1">
          {days.map((_, i) => (
            <div key={i} className="h-24 rounded-lg bg-white/[0.04]" />
          ))}
        </div>

        <div
          className="pointer-events-none absolute top-0 h-full w-px bg-primary"
          style={{ left: "calc((100%/13) * 4.5)" }}
        />

        <div className="pointer-events-none absolute inset-0 grid grid-cols-[repeat(13,minmax(0,1fr))] items-center gap-1 p-2">
          {events.map((e) => (
            <div
              key={e.title}
              className={`pointer-events-auto flex h-14 flex-col justify-center rounded-lg border-l-2 border-primary px-2.5 ${e.color} ${e.text}`}
              style={{ gridColumn: `${e.col} / span ${e.span}` }}
            >
              <div className="text-xs font-semibold">{e.title}</div>
              <div className="text-[10px] opacity-70">{e.time}</div>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  );
}

function ClassEditor() {
  return (
    <Glass className="w-[340px]">
      <div className="mb-4 flex items-center justify-between">
        <button className="text-sm text-white/70 hover:text-white">Close</button>
        <input
          defaultValue="Body"
          className="mx-3 flex-1 border-b border-white/20 bg-transparent text-center text-[15px] font-semibold text-white outline-none focus:border-white/60"
        />
        <button className="text-white/60 hover:text-white">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {["Bodybuilding", "Body balance"].map((t) => (
          <span
            key={t}
            className="rounded-full bg-white/12 px-3 py-1.5 text-[11px] font-medium text-white"
          >
            {t}
          </span>
        ))}
        <button className="grid h-7 w-7 place-items-center rounded-full border border-dashed border-white/30 text-white/60 hover:text-white">
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-3 text-[12px]">
        <Row label="Date">
          <span className="text-white">Monday, 23 April</span>
          <span className="text-white/50">10:00 – 12:00 AM</span>
          <Pencil className="h-3.5 w-3.5 text-white/50" />
        </Row>
        <Row label="Location">
          <button className="flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-white">
            Salon 2 <ChevronRight className="h-3 w-3 rotate-90" />
          </button>
        </Row>
        <Row label="Trainers">
          <div className="flex -space-x-2">
            <img src={coach2} alt="" width={40} height={40} className="h-6 w-6 rounded-full border-2 border-white/70 object-cover" />
            <img src={coach3} alt="" width={40} height={40} className="h-6 w-6 rounded-full border-2 border-white/70 object-cover" />
          </div>
        </Row>
        <Row label="Members">
          <div className="flex -space-x-2">
            {[coach1, coach2, coach3, coach1].map((c, i) => (
              <img key={i} src={c} alt="" width={40} height={40} className="h-6 w-6 rounded-full border-2 border-white/70 object-cover" />
            ))}
            <span className="grid h-6 w-6 place-items-center rounded-full border-2 border-white/70 bg-white/10 text-[9px] text-white">+8</span>
          </div>
        </Row>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button className="rounded-full px-4 py-1.5 text-xs text-white/70 hover:text-white">Cancel</button>
        <button className="rounded-full bg-primary px-5 py-1.5 text-xs font-semibold text-primary-foreground hover:brightness-110">
          OK
        </button>
      </div>
    </Glass>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-white/8 pb-2 last:border-0">
      <span className="text-white/50">{label}</span>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section views                                                       */
/* ------------------------------------------------------------------ */
function DashboardView() {
  return (
    <div key="dash" className="animate-fade-in space-y-4">
      <div className="flex gap-4">
        <MembersChart />
        <PopularClasses />
      </div>
      <Timeline />
      <div className="grid grid-cols-4 gap-3">
        <Kpi label="Active Members" base={1284} format={(n) => Math.round(n).toLocaleString()} delta="+12.4%" jitter={0.008} intervalMs={2100} />
        <Kpi label="Revenue (MTD)" base={48900} format={(n) => `$${(n / 1000).toFixed(1)}K`} delta="+6.1%" jitter={0.012} intervalMs={2600} />
        <Kpi label="Check-ins today" base={342} format={(n) => Math.round(n).toString()} delta="+18" jitter={0.02} intervalMs={1800} />
        <Kpi label="Retention" base={94} format={(n) => `${n.toFixed(1)}%`} delta="+1.2%" jitter={0.004} intervalMs={3000} />
      </div>
    </div>
  );
}

function SettingsView() {
  const staff = [
    { name: "Jakob Dorwart", role: "Owner / Manager", img: coach1, access: "Full access" },
    { name: "Mara Vidal", role: "Head Strength Coach", img: coach2, access: "Classes & members" },
    { name: "Aiko Tanaka", role: "Mobility Coach", img: coach3, access: "Classes only" },
  ];
  const toggles = [
    { label: "Email booking confirmations", on: true },
    { label: "Auto-renew memberships", on: true },
    { label: "Waitlist when class is full", on: true },
    { label: "Weekly owner report", on: false },
  ];
  return (
    <div key="set" className="animate-fade-in grid grid-cols-2 gap-4">
      <Glass>
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <div className="text-[15px] font-semibold text-white">Staff & access</div>
        </div>
        <div className="flex flex-col gap-2">
          {staff.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
              <img src={s.img} alt="" className="h-9 w-9 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-white">{s.name}</div>
                <div className="text-[10.5px] text-white/50">{s.role}</div>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] text-white/70">{s.access}</span>
            </div>
          ))}
          <button className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl border border-dashed border-white/20 py-2.5 text-[11.5px] text-white/60 hover:text-white">
            <UserPlus className="h-3.5 w-3.5" /> Invite staff member
          </button>
        </div>
      </Glass>
      <Glass>
        <div className="mb-4 text-[15px] font-semibold text-white">Gym preferences</div>
        <div className="flex flex-col gap-2.5">
          {toggles.map((t) => (
            <div key={t.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-3.5 py-3">
              <span className="text-[12.5px] text-white/85">{t.label}</span>
              <span className={`relative h-5 w-9 rounded-full transition-colors ${t.on ? "bg-primary" : "bg-white/15"}`}>
                <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${t.on ? "left-[18px]" : "left-0.5"}`} />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3.5 text-[12px] text-white/70">
          <div className="mb-1 text-[10.5px] uppercase tracking-wider text-white/45">Billing plan</div>
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold text-white">Business · 1,500 members</span>
            <button className="rounded-full bg-primary px-3.5 py-1.5 text-[11px] font-semibold text-primary-foreground">Manage</button>
          </div>
        </div>
      </Glass>
    </div>
  );
}

function RevenueChart() {
  const max = 160;
  const line = useLiveSeries({
    length: 24,
    min: 20,
    max: 150,
    drift: 0.09,
    intervalMs: 2000,
    tweenMs: 1200,
    slide: true,
    seed: [30, 42, 38, 55, 48, 62, 55, 70, 66, 78, 72, 88, 82, 96, 92, 110, 104, 118, 112, 128, 122, 138, 132, 145],
  });
  const trend = useLiveValue({ base: 38.4, jitter: 0.02, intervalMs: 2400 });
  const trendDisplay = useCountUp(trend, 600);
  const points = line
    .map((v, i) => `${(i / (line.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");
  return (
      <Glass>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <div className="text-[15px] font-semibold text-white">Revenue Trend</div>
              <div className="text-[11px] text-white/50">Last 12 months · streaming</div>
            </div>
            <span className="pulse-dot ml-2 inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Live
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-semibold text-primary">
            <TrendingUp className="h-3.5 w-3.5" /> +{trendDisplay.toFixed(1)}%
          </div>
        </div>
        <div className="relative h-[220px]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
            <defs>
              <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.6 0.24 27)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="oklch(0.6 0.24 27)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points={`0,100 ${points} 100,100`}
              fill="url(#grad)"
              stroke="none"
            />
            <polyline
              points={points}
              fill="none"
              stroke="oklch(0.6 0.24 27)"
              strokeWidth="0.8"
              vectorEffect="non-scaling-stroke"
            />
            {line.length > 0 && (
              <circle
                cx={100}
                cy={100 - (line[line.length - 1] / max) * 100}
                r="1.1"
                fill="oklch(0.6 0.24 27)"
                className="pulse-dot"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>
        </div>
      </Glass>
  );
}

function AnalyticView() {
  return (
    <div key="an" className="animate-fade-in space-y-4">
      <RevenueChart />
      <div className="grid grid-cols-4 gap-3">

        <Kpi label="MRR" base={48900} format={(n) => `$${(n / 1000).toFixed(1)}K`} delta="+6.1%" jitter={0.012} intervalMs={2200} />
        <Kpi label="Churn" base={2.1} format={(n) => `${n.toFixed(2)}%`} delta="-0.4%" jitter={0.05} intervalMs={2700} />
        <Kpi label="LTV" base={1842} format={(n) => `$${Math.round(n).toLocaleString()}`} delta="+9.2%" jitter={0.008} intervalMs={2400} />
        <Kpi label="CAC" base={62} format={(n) => `$${Math.round(n)}`} delta="-3.1%" jitter={0.02} intervalMs={2000} />
      </div>
    </div>
  );
}

function MembersView() {
  const members = [
    { name: "Elena Rodriguez", plan: "Elite", status: "Active", visits: 24, since: "2022", img: coach2 },
    { name: "Diego Perez", plan: "Pro", status: "Active", visits: 18, since: "2023", img: coach1 },
    { name: "Aiko Tanaka", plan: "Elite", status: "Active", visits: 31, since: "2021", img: coach3 },
    { name: "Marcus Reid", plan: "Basic", status: "Paused", visits: 4, since: "2024", img: coach1 },
    { name: "Priya Shah", plan: "Pro", status: "Active", visits: 22, since: "2023", img: coach2 },
  ];
  return (
    <div key="mem" className="animate-fade-in space-y-4">
      <Glass>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="text-[15px] font-semibold text-white">All Members</div>
            <div className="text-[11px] text-white/50">1,284 total · 342 checked in today</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] text-white/80">
              <Filter className="h-3.5 w-3.5" /> Filter
            </button>
            <button className="flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
              <UserPlus className="h-3.5 w-3.5" /> Add member
            </button>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
            <div>Member</div><div>Plan</div><div>Status</div><div>Visits/mo</div><div>Since</div>
          </div>
          {members.map((m) => (
            <div key={m.name} className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-2 border-b border-white/5 px-4 py-3 text-[12.5px] text-white/90 last:border-0 hover:bg-white/[0.03]">
              <div className="flex items-center gap-2.5">
                <img src={m.img} className="h-8 w-8 rounded-full object-cover" alt="" />
                <span className="font-medium">{m.name}</span>
              </div>
              <div>
                <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${m.plan === "Elite" ? "bg-primary/20 text-primary" : m.plan === "Pro" ? "bg-white/10 text-white" : "bg-white/5 text-white/60"}`}>{m.plan}</span>
              </div>
              <div className={`text-[11.5px] ${m.status === "Active" ? "text-emerald-300" : "text-amber-300"}`}>● {m.status}</div>
              <div>{m.visits}</div>
              <div className="text-white/60">{m.since}</div>
            </div>
          ))}
        </div>
      </Glass>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right operations panel (scheduling / ops calendar)                  */
/* ------------------------------------------------------------------ */
function OpsPanel() {
  const [selected, setSelected] = useState(5);
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  const todays = [
    { time: "06:00", title: "Crossfit", coach: "Mara", filled: 18, cap: 20 },
    { time: "09:30", title: "Yoga Flow", coach: "Aiko", filled: 12, cap: 18 },
    { time: "12:00", title: "HIIT", coach: "Diego", filled: 22, cap: 24 },
    { time: "18:00", title: "Boxing", coach: "Mara", filled: 15, cap: 16 },
  ];

  const availability = [
    { name: "Mara Vidal", role: "Head Strength", img: coach2, state: "On floor" },
    { name: "Diego Perez", role: "Conditioning", img: coach1, state: "Class 12:00" },
    { name: "Aiko Tanaka", role: "Mobility", img: coach3, state: "Off today" },
  ];

  return (
    <Glass className="flex h-full w-[300px] shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="text-[13px] font-semibold uppercase tracking-wider text-white/80">
          Operations
        </div>
        <button className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
          Schedule
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white/[0.06] p-3 text-center">
        <Stat top="Classes" value="12" />
        <Stat top="Booked" value="86%" />
        <Stat top="Staff on" value="5" />
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-[12px] font-semibold text-white/80">Booking calendar</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] text-white/70">
            <ChevronLeft className="h-3.5 w-3.5" />
            <span className="font-semibold">April</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
          <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] text-white/40">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <div key={i}>{d}</div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-[10.5px]">
            {days.map((d) => (
              <button
                key={d}
                onClick={() => setSelected(d)}
                className={`mx-auto grid h-6 w-6 place-items-center rounded-full transition-colors ${
                  selected === d
                    ? "bg-primary text-primary-foreground"
                    : d === 3 || d === 7
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-[12px] font-semibold text-white/80">Today's schedule</div>
        <div className="flex flex-col gap-1.5">
          {todays.map((t) => {
            const pct = Math.round((t.filled / t.cap) * 100);
            return (
              <div
                key={t.time}
                className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12px] font-semibold text-white">
                    <Clock className="h-3.5 w-3.5 text-white/50" />
                    {t.time} · {t.title}
                  </div>
                  <span className="text-[10.5px] text-white/50">{t.coach}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-primary transition-[width] duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] tabular-nums text-white/60">
                    {t.filled}/{t.cap}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5">
        <div className="mb-2 text-[12px] font-semibold text-white/80">Trainer availability</div>
        <div className="flex flex-col gap-1.5">
          {availability.map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.05] p-2"
            >
              <img src={a.img} alt="" className="h-8 w-8 rounded-full object-cover" />
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12px] font-semibold text-white">{a.name}</div>
                <div className="text-[10.5px] text-white/50">{a.role}</div>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${
                  a.state === "Off today"
                    ? "bg-white/8 text-white/50"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {a.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Glass>
  );
}

function Stat({ top, value }: { top: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-white/50">{top}</div>
      <div className="mt-1 text-[13px] font-semibold text-white">{value}</div>
    </div>
  );
}

function Kpi({
  label,
  base,
  format,
  delta,
  jitter = 0.015,
  intervalMs = 2400,
}: {
  label: string;
  base: number;
  format: (n: number) => string;
  delta: string;
  jitter?: number;
  intervalMs?: number;
}) {
  const target = useLiveValue({ base, jitter, intervalMs });
  const smooth = useCountUp(target, 650);
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.05] p-3 transition-colors hover:bg-white/[0.07]">
      <div className="text-[10.5px] uppercase tracking-wider text-white/50">{label}</div>
      <div className="mt-1 flex items-end justify-between">
        <div className="text-xl font-semibold text-white tabular-nums">{format(smooth)}</div>
        <div className="flex items-center gap-0.5 text-[11px] text-emerald-300">
          <ArrowUpRight className="h-3 w-3" /> {delta}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
const TITLES: Record<SectionId, { title: string; sub: string }> = {
  Dashboard: { title: "Welcome Jakob!", sub: "Here's what's happening at your gym today" },
  Members: { title: "Members", sub: "Manage everyone in your gym" },
  Analytics: { title: "Analytics", sub: "Business performance & growth" },
  Settings: { title: "Settings", sub: "Account, staff access & billing preferences" },
};

function DashboardPage() {
  const [section, setSection] = useState<SectionId>("Dashboard");
  const [step, setStep] = useState(0); // 0=none,1=center,2=sidebar,3=profile,4=editor
  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 80),
      setTimeout(() => setStep(2), 520),
      setTimeout(() => setStep(3), 900),
      setTimeout(() => setStep(4), 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);
  const date = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    weekday: "long",
  });
  const meta = TITLES[section];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Plain themed background with subtle red glow — no photo */}
      <div className="pointer-events-none fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 40% at 20% 10%, color-mix(in oklab, var(--primary) 22%, transparent) 0%, transparent 60%), radial-gradient(50% 50% at 85% 90%, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Top corner nav */}
      <div className="relative z-20 flex items-center justify-between px-8 py-5">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-white backdrop-blur-md hover:bg-white/15"
        >
          <ChevronLeft className="h-3.5 w-3.5" /> Back to site
        </Link>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] text-white/80 backdrop-blur-md">
          <Search className="h-3.5 w-3.5" /> Command palette
          <span className="ml-2 rounded bg-white/10 px-1.5 py-0.5 text-[10px]">⌘K</span>
        </div>
      </div>

      {/* Spatial workspace */}
      <div className="relative z-10 mx-auto flex max-w-[1500px] items-stretch gap-5 px-6 pb-16 pt-4">
        <div className="hidden lg:block" style={{ perspective: 1400 }}>
          <div
            className="h-full transition-all duration-[900ms] ease-out"
            style={{
              transformOrigin: "right center",
              transformStyle: "preserve-3d",
              transform:
                step >= 2
                  ? "rotateY(14deg) rotateX(1deg) translateX(0)"
                  : "rotateY(95deg) rotateX(1deg) translateX(-40px)",
              opacity: step >= 2 ? 1 : 0,
            }}
          >
            <Sidebar active={section} onChange={setSection} />
          </div>
        </div>

        <div className="flex-1" style={{ perspective: 1400 }}>
          <div
            className="transition-all duration-[700ms] ease-out"
            style={{
              transformOrigin: "center top",
              transform:
                step >= 1
                  ? "rotateX(0deg) translateY(0) scale(1)"
                  : "rotateX(-18deg) translateY(-30px) scale(0.96)",
              opacity: step >= 1 ? 1 : 0,
            }}
          >
            <Glass>
              <div className="mb-5 flex items-start justify-between">
                <div key={section} className="animate-fade-in">
                  <h1 className="text-2xl font-semibold text-white">{meta.title}</h1>
                  <div className="text-[12px] text-white/60">
                    {section === "Dashboard" ? date : meta.sub}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 hover:bg-white/15">
                    <Bell className="h-4 w-4" />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
                  </button>
                  <button className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 hover:bg-white/15">
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {section === "Dashboard" && <DashboardView />}
              {section === "Members" && <MembersView />}
              {section === "Analytics" && <AnalyticView />}
              {section === "Settings" && <SettingsView />}
            </Glass>
          </div>

          {section === "Dashboard" && step >= 4 && (
            <div className="pointer-events-none absolute left-1/2 top-[calc(100%-40px)] hidden -translate-x-1/2 xl:block">
              <div
                className="pointer-events-auto"
                style={{
                  transform: "translateZ(40px)",
                  animation: "fade-in 0.5s ease-out both, scale-in 0.5s ease-out both",
                }}
              >
                <ClassEditor />
              </div>
            </div>
          )}
        </div>

        <div className="hidden lg:block" style={{ perspective: 1400 }}>
          <div
            className="h-full transition-all duration-[900ms] ease-out"
            style={{
              transformOrigin: "left center",
              transformStyle: "preserve-3d",
              transform:
                step >= 3
                  ? "rotateY(-14deg) rotateX(1deg) translateX(0)"
                  : "rotateY(-95deg) rotateX(1deg) translateX(40px)",
              opacity: step >= 3 ? 1 : 0,
            }}
          >
            <OpsPanel />
          </div>
        </div>
      </div>

      {/* silence unused import warnings for spare assets */}
      <div className="hidden">
        <img src={program3} alt="" />
        <img src={program4} alt="" />
      </div>
    </main>
  );
}
