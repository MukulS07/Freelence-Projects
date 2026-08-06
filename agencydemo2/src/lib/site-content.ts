// ---------------------------------------------------------------------------
// ALL EDITABLE COPY LIVES HERE.
// Every value in [square brackets] is a placeholder — replace with your own.
// ---------------------------------------------------------------------------

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import studio from "@/assets/studio.jpg";

export const studioImage = studio;

export const agency = {
  name: "agencydemo2",
  taglineLineOne: "[Your Tagline]",
  taglineLineTwo: "[Line Two]",
  foundedYear: "[Year]",
  email: "[your@email.com]",
  phone: "[+00 000 000 0000]",
  address: "[Street Address], [City], [Country]",
  intro:
    "[One sentence describing what your agency does and who it does it for. Keep it short and confident.]",
};

export const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Dribbble", href: "#" },
];

export const clients = [
  "[Client One]",
  "[Client Two]",
  "[Client Three]",
  "[Client Four]",
  "[Client Five]",
  "[Client Six]",
  "[Client Seven]",
  "[Client Eight]",
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  blurb: string;
  image: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    name: "[Project One]",
    category: "Branding",
    year: "[2025]",
    blurb: "[One line about the work and the result it delivered.]",
    image: work1,
  },
  {
    slug: "project-two",
    name: "[Project Two]",
    category: "Campaign",
    year: "[2025]",
    blurb: "[One line about the work and the result it delivered.]",
    image: work2,
  },
  {
    slug: "project-three",
    name: "[Project Three]",
    category: "Digital",
    year: "[2024]",
    blurb: "[One line about the work and the result it delivered.]",
    image: work3,
  },
  {
    slug: "project-four",
    name: "[Project Four]",
    category: "Content",
    year: "[2024]",
    blurb: "[One line about the work and the result it delivered.]",
    image: work4,
  },
  {
    slug: "project-five",
    name: "[Project Five]",
    category: "Campaign",
    year: "[2023]",
    blurb: "[One line about the work and the result it delivered.]",
    image: work5,
  },
  {
    slug: "project-six",
    name: "[Project Six]",
    category: "Branding",
    year: "[2023]",
    blurb: "[One line about the work and the result it delivered.]",
    image: work1,
  },
];

export const services = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy",
    summary:
      "[Describe how you help brands find direction — research, positioning, and planning grounded in real goals.]",
    deliverables: [
      "[Brand positioning]",
      "[Audience research]",
      "[Messaging framework]",
      "[Naming]",
      "[Competitive audit]",
    ],
  },
  {
    id: "creative",
    number: "02",
    title: "Creative",
    summary:
      "[Describe the creative work you make — identity systems, campaigns, content that connects with people.]",
    deliverables: [
      "[Visual identity]",
      "[Art direction]",
      "[Campaign concepts]",
      "[Packaging]",
      "[Motion & film]",
    ],
  },
  {
    id: "marketing",
    number: "03",
    title: "Marketing",
    summary:
      "[Describe how you bring the work to market — channels, launch support, and measurement.]",
    deliverables: [
      "[Media planning]",
      "[Social content]",
      "[Web & digital]",
      "[Email & CRM]",
      "[Performance reporting]",
    ],
  },
];

export const values = [
  { title: "[Value One]", body: "[A sentence on what this means in practice.]" },
  { title: "[Value Two]", body: "[A sentence on what this means in practice.]" },
  { title: "[Value Three]", body: "[A sentence on what this means in practice.]" },
  { title: "[Value Four]", body: "[A sentence on what this means in practice.]" },
];

export const team = [
  { name: "[Your Name]", role: "[Founder / Creative Director]" },
  { name: "[Team Member]", role: "[Strategy Lead]" },
  { name: "[Team Member]", role: "[Design Director]" },
  { name: "[Team Member]", role: "[Producer]" },
  { name: "[Team Member]", role: "[Copywriter]" },
  { name: "[Team Member]", role: "[Account Lead]" },
];
