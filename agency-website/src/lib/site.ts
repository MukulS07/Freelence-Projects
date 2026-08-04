export const SITE = {
  name: "Our Agency Name",
  shortName: "agency",
  tagline: "AI-Powered Content & Social Growth for Cafés, Food & Beverage Brands",
  subline:
    "We create scroll-stopping video, design, and social content — built specifically for food & beverage businesses.",
  email: "hello@ouragency.com",
  whatsapp: "+91 00000 00000",
  instagram: "@ouragency",
} as const;

export const NAV = [
  { label: "Work", to: "/work" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
] as const;

export const SERVICES = [
  {
    n: "01",
    title: "AI Video Production",
    line: "Reels, product films, ad content.",
  },
  {
    n: "02",
    title: "Social Media Management",
    line: "Content planning, posting, growth.",
  },
  {
    n: "03",
    title: "Graphic Design",
    line: "Posts, banners, brand visuals.",
  },
  {
    n: "04",
    title: "Motion Graphics & Brand Ads",
    line: "Cinematic AI-driven ad content.",
  },
] as const;

export const PROCESS = [
  {
    n: "01",
    title: "Content Idea",
    body: "We study your brand and plan content around what your audience actually stops for.",
  },
  {
    n: "02",
    title: "AI-Powered Production",
    body: "Video, design, and copy created in-house — faster turnaround, lower cost than traditional shoots.",
  },
  {
    n: "03",
    title: "Post & Grow",
    body: "Scheduled, posted, and tracked, so growth is measured rather than assumed.",
  },
] as const;

export const WHY_US = [
  "In-house AI video production — faster turnaround, lower cost than traditional shoots.",
  "A dedicated content and design workflow, not ad-hoc requests.",
  "Built specifically for food & beverage brands.",
  "Real client results, not just stock templates.",
] as const;
