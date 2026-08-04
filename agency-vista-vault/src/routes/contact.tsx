import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ChevronMarquee, ChevronRule } from "@/components/site/Chevron";
import { Reveal, RevealLines } from "@/components/site/Reveal";
import { Eyebrow, Section } from "@/components/site/Section";
import { SITE } from "@/lib/site";

const TITLE = "Contact — Book a Free Content Audit";
const DESCRIPTION =
  "Tell us about your café or F&B brand and we'll send back a free content audit with a sample direction for your next reel.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

const FIELDS = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "brand", label: "Brand name", type: "text", required: true },
  { name: "instagram", label: "Instagram handle", type: "text", required: false },
] as const;

function ContactPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
    toast.success("Thanks — we'll be in touch within one working day.");
    event.currentTarget.reset();
  }

  return (
    <>
      <Section theme="blood" className="px-5 pb-24 pt-40 md:px-10 md:pt-52">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
        </Reveal>
        <RevealLines
          className="display mt-6 text-[clamp(2.4rem,10vw,8rem)]"
          lines={["LET'S GROW YOUR", "CAFÉ'S PRESENCE"]}
        />
        <ChevronRule />
        <Reveal>
          <p className="max-w-md text-sm">
            Send us your brand and handle. We'll reply with a free content audit — and a sample
            video direction built for your product.
          </p>
        </Reveal>
      </Section>

      <Section theme="greige" className="px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow opacity-60">Direct</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a className="story-link" href={`mailto:${SITE.email}`}>
                    {SITE.email}
                  </a>
                </li>
                <li className="opacity-75">WhatsApp {SITE.whatsapp}</li>
                <li className="opacity-75">Instagram {SITE.instagram}</li>
              </ul>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal>
              <form onSubmit={onSubmit} className="space-y-8">
                {FIELDS.map((field) => (
                  <div key={field.name} className="rule-line pt-5">
                    <label htmlFor={field.name} className="eyebrow opacity-60">
                      {field.label}
                      {field.required ? " *" : ""}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      required={field.required}
                      className="mt-3 w-full bg-transparent text-base outline-none placeholder:opacity-40 focus:ring-0"
                      placeholder="—"
                    />
                  </div>
                ))}

                <div className="rule-line pt-5">
                  <label htmlFor="message" className="eyebrow opacity-60">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-3 w-full resize-none bg-transparent text-base outline-none placeholder:opacity-40"
                    placeholder="What are you trying to grow?"
                  />
                </div>

                <button
                  type="submit"
                  className="eyebrow inline-flex items-center gap-1 rounded-full bg-ink px-7 py-4 text-cream transition-opacity hover:opacity-85"
                >
                  {sent ? "Sent" : "Send request"} <ChevronMarquee />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
