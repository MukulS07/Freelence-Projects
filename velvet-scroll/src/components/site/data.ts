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
  name: "Rangoon",
  subname: "Coffee Brewery",
  tagline: "Experience Coffee Beyond Ordinary",
  established: "2011",
  address: "47 Sule Pagoda Road, Kyauktada Township, Yangon",
  phone: "+95 1 234 5678",
  email: "hello@rangooncoffee.com",
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
  { title: "The Bean",   body: "Single-estate arabica from the Shan highlands, roasted weekly." },
];

export const timeline = [
  { year: "2011", body: "First cup poured on 47 Sule Pagoda Road." },
  { year: "2016", body: "First partner-farm planted in the Shan highlands." },
  { year: "2021", body: "Awarded Best Independent Roastery, SE Asia." },
  { year: "2025", body: "New flagship opens with a slow-brew tasting bar." },
];

export const drinks = [
  { name: "Shan Highland",   tag: "Espresso · Single Origin",     img: drink1, price: "$5.50" },
  { name: "Yangon Sunrise",  tag: "Cold Brew · Palm Sugar · Lime", img: drink2, price: "$6.00" },
  { name: "Monsoon Latte",   tag: "Cardamom · Vanilla Bean",       img: drink3, price: "$6.50" },
  { name: "Golden Cortado",  tag: "Turmeric · Cane",               img: drink4, price: "$5.75" },
  { name: "Sule Flat White", tag: "Double Ristretto · Micro Foam", img: gal1,   price: "$5.80" },
  { name: "Irrawaddy Mocha", tag: "72% Cacao · Sea Salt",          img: gal2,   price: "$6.20" },
  { name: "Bagan Pour-Over", tag: "V60 · Bright · Floral",         img: gal3,   price: "$6.80" },
  { name: "Night Market",    tag: "Espresso Tonic · Citrus",       img: gal4,   price: "$6.40" },
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
    { name: "Rangoon Egg Bowl",            note: "Soft yolk, rice",     price: "9.20" },
    { name: "Buttermilk Pancakes",         note: "Wild honey, berries", price: "7.60" },
    { name: "Coconut Chia",                note: "Palm sugar, fruit",   price: "6.40" },
  ],
  Desserts: [
    { name: "Basque Cheesecake",    note: "Burnt top",                price: "6.80" },
    { name: "Dark Chocolate Torte", note: "72% single origin",        price: "7.40" },
    { name: "Tiramisu",             note: "House espresso soak",      price: "6.90" },
    { name: "Cardamom Cannelé",     note: "Rangoon spice",            price: "3.80" },
    { name: "Salted Caramel Tart",  note: "Fleur de sel",             price: "5.60" },
  ],
};

export const events = [
  { date: "Every Friday · 8pm",  title: "Live Jazz Nights",  body: "Intimate acoustic sets from Yangon's finest musicians." },
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
