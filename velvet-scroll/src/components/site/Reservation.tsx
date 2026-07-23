import { useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "./Reveal";

export function Reservation() {
  const [form, setForm] = useState({
    name: "",
    guests: "2",
    date: "",
    time: "19:00",
    note: "",
  });
  const [sent, setSent] = useState(false);

  return (
    <section
      id="reserve"
      className="relative overflow-hidden bg-[color:var(--ink)] py-20 md:py-28 text-[color:var(--cream)]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[color:var(--brand)]/20 blur-[120px]" />
      </div>

      <div className="container-x mx-auto max-w-[1440px]">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[11px] uppercase tracking-[0.4em] text-[color:var(--brand)]">
                — Reserve
              </span>
              <h2 className="mt-6 font-display text-5xl md:text-7xl leading-[1]">
                Save your
                <br />
                <em className="text-[color:var(--brand)]">seat.</em>
              </h2>
              <p className="mt-8 max-w-sm text-[color:var(--cream)]/60 leading-relaxed">
                A quiet booth, a corner by the window, or the barista counter —
                let us know. We'll take care of the rest.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="relative rounded-sm p-8 md:p-12"
                style={{
                  background: "rgba(255, 253, 249, 0.04)",
                  backdropFilter: "blur(24px) saturate(140%)",
                  border: "1px solid rgba(255, 253, 249, 0.08)",
                }}
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Name">
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Guests">
                    <select
                      value={form.guests}
                      onChange={(e) => setForm({ ...form, guests: e.target.value })}
                      className="input"
                    >
                      {["1", "2", "3", "4", "5", "6", "7", "8+"].map((n) => (
                        <option key={n}>{n}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Date">
                    <input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Time">
                    <input
                      type="time"
                      value={form.time}
                      onChange={(e) => setForm({ ...form, time: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Special request">
                      <textarea
                        rows={3}
                        value={form.note}
                        onChange={(e) => setForm({ ...form, note: e.target.value })}
                        className="input resize-none"
                        placeholder="Occasion, seating preference, dietary notes…"
                      />
                    </Field>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="mt-10 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[color:var(--brand)] py-4 text-[11px] uppercase tracking-[0.32em] text-[color:var(--ink)] transition hover:bg-[color:var(--cream)] md:w-auto md:px-16"
                >
                  {sent ? "Request Sent ✓" : "Request Table"}
                  {!sent && <span>→</span>}
                </motion.button>
              </form>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(246, 242, 236, 0.15);
          padding: 0.75rem 0;
          color: var(--cream);
          font-family: inherit;
          font-size: 1rem;
          transition: border-color 0.3s;
          outline: none;
        }
        .input:focus {
          border-color: var(--brand);
        }
        .input::placeholder { color: rgba(246, 242, 236, 0.35); }
        select.input option { background: #1E1612; color: #F6F2EC; }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.32em] text-[color:var(--cream)]/50">
        {label}
      </span>
      {children}
    </label>
  );
}
