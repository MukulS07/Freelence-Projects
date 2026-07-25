import hero from "@/assets/hero.jpg";
import story from "@/assets/story.jpg";
import drink1 from "@/assets/drink-1.jpg";
import drink2 from "@/assets/drink-2.jpg";
import drink3 from "@/assets/drink-3.jpg";
import drink4 from "@/assets/drink-4.jpg";
import gal1 from "@/assets/gallery-1.jpg";
import gal2 from "@/assets/gallery-2.jpg";
import gal3 from "@/assets/gallery-3.jpg";
import gal4 from "@/assets/gallery-4.jpg";
import gal5 from "@/assets/gallery-5.jpg";

export const brand = {
  name: "Your Cafe",
  subname: "Coffee Brewery",
  tagline: "Experience Coffee Beyond Ordinary",
  established: "2020",
  address: "123 Main Street, Your City, Country",
  shortLocation: "Main Street · Your City",
  city: "Your City",
  phone: "+1 (555) 000-0000",
  email: "hello@yourcafe.com",
  hours: [
    { day: "Mon — Fri", time: "07:00 — 22:30" },
    { day: "Sat — Sun", time: "08:00 — 23:00" },
  ],
  social: [
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "TikTok", href: "#" },
  ],
};

export const images = {
  hero, story,
  drinks: [drink1, drink2, drink3, drink4],
  gallery: [gal1, gal2, gal3, gal4, gal5],
};

export const nav = [
  { label: "Story", href: "#story" },
  { label: "Craft", href: "#craft" },
  { label: "Drinks", href: "#drinks" },
  { label: "Menu", href: "#menu" },
  { label: "Moments", href: "#gallery" },
  { label: "Happenings", href: "#events" },
  { label: "Visit", href: "#visit" },
];

// "Four rituals. One devotion." — process, not products
export const experiences = [
  { title: "Espresso",   body: "Nine grams. Twenty-five seconds. A shot of pure origin." },
  { title: "Pour-Over",  body: "Water becomes a slow, deliberate conversation with the bean." },
  { title: "Latte Art",  body: "Silk-textured milk, poured with a steady hand and quiet focus." },
  { title: "The Bean",   body: "Single-estate arabica from high-altitude estates, roasted weekly." },
];

export const timeline = [
  { year: "2020", body: "First cup poured at our flagship location on Main Street." },
  { year: "2022", body: "First partner-farm planted in high-altitude soil." },
  { year: "2024", body: "Awarded Best Independent Roastery." },
  { year: "2025", body: "New flagship opens with a slow-brew tasting bar." },
];

export const drinks = [
  { name: "Highland Espresso", tag: "Espresso · Single Origin",     img: drink1, price: "$5.50" },
  { name: "Sunrise Cold Brew", tag: "Cold Brew · Palm Sugar · Lime", img: drink2, price: "$6.00" },
  { name: "Monsoon Latte",     tag: "Cardamom · Vanilla Bean",       img: drink3, price: "$6.50" },
  { name: "Golden Cortado",    tag: "Turmeric · Cane",               img: drink4, price: "$5.75" },
  { name: "Signature Flat White", tag: "Double Ristretto · Micro Foam", img: gal1, price: "$5.80" },
  { name: "Artisan Mocha",     tag: "72% Cacao · Sea Salt",          img: gal2,   price: "$6.20" },
  { name: "Single Origin Pour", tag: "V60 · Bright · Floral",        img: gal3,   price: "$6.80" },
  { name: "Citrus Espresso Tonic", tag: "Espresso Tonic · Citrus",   img: gal4,   price: "$6.40" },
];

export const menu = {
  Coffee: [
    { name: "Espresso",       note: "Rich, thick crema",               price: "4.50" },
    { name: "Flat White",     note: "Silk-steamed micro-foam",         price: "5.50" },
    { name: "Cortado",        note: "Espresso met with warm milk",     price: "5.25" },
    { name: "V60 Pour-Over",  note: "Rotating single origins",         price: "6.50" },
    { name: "Cold Brew",      note: "18-hour slow steep",              price: "6.00" },
    { name: "Aeropress",      note: "Bright, clean, expressive",       price: "6.50" },
  ],
  Breakfast: [
    { name: "Sourdough & Cultured Butter", note: "House sourdough",     price: "4.80" },
    { name: "Avocado Toast",               note: "Chili, lime, feta",   price: "8.50" },
    { name: "Breakfast Egg Bowl",          note: "Soft yolk, rice",     price: "9.20" },
    { name: "Buttermilk Pancakes",         note: "Wild honey, berries", price: "7.60" },
    { name: "Coconut Chia",                note: "Palm sugar, fruit",   price: "6.40" },
  ],
  Desserts: [
    { name: "Basque Cheesecake",    note: "Burnt top",                price: "6.80" },
    { name: "Dark Chocolate Torte", note: "72% single origin",        price: "7.40" },
    { name: "Tiramisu",             note: "House espresso soak",      price: "6.90" },
    { name: "Cardamom Cannelé",     note: "House spice",              price: "3.80" },
    { name: "Salted Caramel Tart",  note: "Fleur de sel",             price: "5.60" },
  ],
};

export const events = [
  { date: "Every Friday · 8pm",  title: "Live Jazz Nights",  body: "Intimate acoustic sets from fine local musicians." },
  { date: "Saturdays · 10am",    title: "Barista Workshop",  body: "Learn extraction, dialling-in and latte art from our head roaster." },
  { date: "Sundays · 11am",      title: "Weekend Cupping",   body: "A guided tasting of this week's single origins." },
  { date: "Once a month",        title: "Seasonal Supper",   body: "A four-course tasting menu paired with rare micro-lots." },
];

export const testimonials = [
  { name: "Emma L.",  role: "Food Critic, Nikkei", quote: "The only place in the city where the room feels as considered as the coffee." },
  { name: "Kenji T.", role: "Architect",           quote: "A love letter to slow craft. The lighting alone is worth the visit." },
  { name: "Priya S.", role: "Q-Grader",            quote: "Their light-roast Yirgacheffe is one of the best pours I've had this year." },
  { name: "Marco D.", role: "Traveller",           quote: "Better than most flagships I've been to in Melbourne or Tokyo. Genuinely." },
  { name: "Ava K.",   role: "Roaster",             quote: "Impeccable sourcing. You can taste the intention in every cup." },
  { name: "Nu Nu H.", role: "Writer",              quote: "I come here to think. Everything is quiet, warm and exactly in its place." },
];
