import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, CalendarDays, Globe2, Lock, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { testimonials } from '../data/mockData';

const features = [
  { icon: CalendarDays, title: 'Day-wise itineraries', text: 'Organize cities, activities, and notes in a timeline that reads beautifully.' },
  { icon: BarChart3, title: 'Budget analytics', text: 'Estimate transport, hotels, activities, and food with chart-backed clarity.' },
  { icon: Globe2, title: 'Shareable plans', text: 'Publish a polished read-only itinerary for friends, clients, or hackathon demos.' },
  { icon: Lock, title: 'Firebase-ready auth', text: 'Login, signup, protected routes, and Firestore CRUD are wired for deployment.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-hero-mesh">
      <Navbar />
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/70 px-4 py-2 text-sm font-bold text-cyan-700 shadow-sm dark:border-cyan-900 dark:bg-slate-900/70"><Sparkles className="h-4 w-4" /> Hackathon-ready travel planning</span>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">Plan trips that feel as good as the destination.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Traveloop Lite is a polished SaaS-style travel planner for trips, itineraries, budgets, timelines, and shareable public plans — built lean enough for a one-day MVP.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/signup" className="btn-primary">Start planning <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/share/demo-paris" className="btn-secondary">View public itinerary</Link>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="glass-card rounded-[2rem] p-4">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="mb-6 flex items-center justify-between"><span className="font-bold">Kyoto Slow Travel</span><span className="rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-200">Planning</span></div>
              <img className="h-64 w-full rounded-3xl object-cover" src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80" alt="Kyoto illustration" />
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {['10 days', '$5.2k', '3 cities'].map((item) => <div key={item} className="rounded-2xl bg-white/10 p-4 text-center font-extrabold">{item}</div>)}
              </div>
            </div>
          </motion.div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, text }) => <div key={title} className="glass-card rounded-3xl p-6"><Icon className="h-8 w-8 text-cyan-600" /><h3 className="mt-5 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p></div>)}
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between"><div><p className="font-bold text-cyan-600">Loved by planners</p><h2 className="text-3xl font-black">Mock testimonials for a demo-ready landing page</h2></div><Users className="hidden h-10 w-10 text-cyan-600 sm:block" /></div>
          <div className="grid gap-5 md:grid-cols-3">{testimonials.map((item) => <div key={item.name} className="glass-card rounded-3xl p-6"><p className="text-slate-600 dark:text-slate-300">“{item.quote}”</p><p className="mt-5 font-bold">{item.name}</p><p className="text-sm text-slate-500">{item.role}</p></div>)}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
