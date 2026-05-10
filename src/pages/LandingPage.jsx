import { motion } from "framer-motion";
import {
  CalendarCheck,
  MapPinned,
  Share2,
  WalletCards,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Navbar from "../components/Navbar.jsx";
import { landingTestimonials } from "../data/mockTrips.js";

const features = [
  {
    icon: MapPinned,
    title: "Trip workspace",
    text: "Create trips, organize destinations, and keep decisions out of scattered notes.",
  },
  {
    icon: CalendarCheck,
    title: "Timeline planning",
    text: "Build day-wise itineraries with activities, notes, costs, and city stops.",
  },
  {
    icon: WalletCards,
    title: "Budget clarity",
    text: "Track estimated costs by transport, hotels, food, and activities.",
  },
  {
    icon: Share2,
    title: "Public itinerary",
    text: "Publish a polished read-only plan that is easy to share or print.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <Navbar />

      <main>
        <section className="relative isolate min-h-[680px] overflow-hidden pt-16">
          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85"
            alt="Mountain lake destination"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950/55" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950/75" />

          <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="max-w-2xl"
            >
              <h1 className="mt-6 text-5xl font-semibold text-white sm:text-6xl">
                TravelLoop
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-100">
                A modern travel planner for trips, day-wise itineraries, budgets, and shareable public plans.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/signup" className="primary-button bg-white text-slate-950 hover:bg-slate-100">
                  Start planning
                </Link>
                <Link to="/login" className="secondary-button border-white/30 bg-white/15 text-white hover:bg-white/20">
                  Open demo
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase text-brand-teal">Product surface</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Everything a 1-day MVP needs</h2>
              <p className="mt-4 text-slate-500 dark:text-slate-400">
                The app keeps the architecture simple while making the demo feel complete across planning, analytics, and sharing.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -4 }}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-brand-sky shadow-sm dark:bg-slate-900">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 font-semibold text-slate-950 dark:text-white">{feature.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-20 dark:bg-slate-900/35">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase text-brand-coral">Visual planning</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">A clean workspace for real trip decisions</h2>
              <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
                TravelLoop uses calm dashboard patterns, readable cards, and quick actions so users can make progress without hunting through menus.
              </p>

            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <img
                src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80"
                alt="Traveler overlooking a valley"
                className="aspect-[4/5] rounded-lg object-cover shadow-soft"
              />
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=900&q=80"
                  alt="Coastal travel road"
                  className="aspect-[4/3] rounded-lg object-cover shadow-soft"
                />
                <div className="rounded-lg bg-slate-950 p-5 text-white shadow-soft dark:bg-white dark:text-slate-950">
                  <p className="text-sm opacity-70">Demo score</p>
                  <p className="mt-2 text-3xl font-semibold">8 screens</p>
                  <p className="mt-2 text-sm opacity-70">Landing, auth, dashboard, CRUD, details, budget, sharing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="bg-white py-20 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-brand-teal">Mock testimonials</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Built to feel believable in the room</h2>
              </div>
              <Link to="/signup" className="primary-button w-fit">
                Try Traveloop
              </Link>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {landingTestimonials.map((testimonial) => (
                <div key={testimonial.name} className="rounded-lg border border-slate-200 p-5 dark:border-white/10">
                  <p className="leading-7 text-slate-600 dark:text-slate-300">"{testimonial.quote}"</p>
                  <div className="mt-5">
                    <p className="font-semibold text-slate-950 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
