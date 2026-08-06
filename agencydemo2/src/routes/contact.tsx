import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { agency, socials } from "@/lib/site-content";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Blobs } from "@/components/site/Blobs";

const title = "Contact — agencydemo2";
const description = "Tell us about your project. We reply to every enquiry within two days.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

const fieldClass =
  "w-full border-b border-ink/20 bg-transparent py-3 text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-spot-clay";

function ContactPage() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
    toast.success("Thanks — your message is ready to send.", {
      description: "Hook this form up to Lovable Cloud to start receiving enquiries.",
    });
  }

  return (
    <section className="relative overflow-hidden">
      <Blobs />
      <div className="relative mx-auto max-w-[1400px] px-6 pb-32 pt-16 md:px-10 md:pb-44 md:pt-24">
        <h1 className="font-display text-[15vw] leading-[0.86] tracking-tight text-ink md:text-[10vw]">
          <RevealText text="Say hello" />
        </h1>

        <div className="mt-16 grid gap-16 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal delay={0.3}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/45">Name</span>
                  <input required name="name" placeholder="[Your name]" className={fieldClass} />
                </label>
                <label className="block">
                  <span className="text-xs uppercase tracking-[0.2em] text-ink/45">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="[you@company.com]"
                    className={fieldClass}
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-ink/45">Company</span>
                <input name="company" placeholder="[Company name]" className={fieldClass} />
              </label>
              <label className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-ink/45">Project</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder="[Tell us what you're working on]"
                  className={`${fieldClass} resize-none`}
                />
              </label>
              <button
                type="submit"
                data-cursor="grow"
                className="rounded-full bg-ink px-8 py-4 text-xs uppercase tracking-[0.22em] text-canvas transition-colors hover:bg-spot-clay"
              >
                {sent ? "Sent" : "Send message"}
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.45} className="space-y-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Email</p>
              <p className="mt-2 font-display text-2xl tracking-tight text-ink">{agency.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Phone</p>
              <p className="mt-2 text-ink/80">{agency.phone}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Studio</p>
              <p className="mt-2 text-ink/80">{agency.address}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-ink/45">Follow</p>
              <ul className="mt-2 space-y-1">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="link-underline text-ink/80">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
