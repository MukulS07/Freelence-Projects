import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { Drinks } from "@/components/site/Drinks";
import { Menu } from "@/components/site/Menu";
import { Gallery } from "@/components/site/Gallery";
import { Events } from "@/components/site/Events";
import { Reservation } from "@/components/site/Reservation";
import { Testimonials } from "@/components/site/Testimonials";
import { Location } from "@/components/site/Location";
import { Footer } from "@/components/site/Footer";
import { Loader } from "@/components/site/Loader";
import { Marquee } from "@/components/site/Marquee";
import { useLenis } from "@/components/site/useLenis";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rangoon Coffee Brewery — Experience Coffee Beyond Ordinary" },
      {
        name: "description",
        content:
          "A cinematic coffee experience in Yangon. Small-batch single-origin coffee, hand-crafted drinks, warm rooms — since 2014.",
      },
      { property: "og:title", content: "Rangoon Coffee Brewery" },
      {
        property: "og:description",
        content:
          "Premium single-origin coffee, hand-crafted in small batches. A warm room built to slow you down.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="relative bg-[color:var(--cream)] text-[color:var(--ink)]">
      <Loader />
      <Navbar />
      <Hero />
      <Story />
      <Marquee />
      <Drinks />
      <Menu />
      <Gallery />
      <Events />
      <Reservation />
      <Testimonials />
      <Location />
      <Footer />
    </main>
  );
}
