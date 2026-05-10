import { motion } from 'framer-motion';
import { BarChart3, Home, Map, PlusCircle, Route } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/trips', label: 'My Trips', icon: Map },
  { to: '/trips/new', label: 'Create Trip', icon: PlusCircle },
  { to: '/budget', label: 'Budget', icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <motion.aside initial={{ x: -18, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="hidden w-72 shrink-0 border-r border-slate-200/70 bg-white/60 p-5 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/60 lg:block">
      <div className="rounded-3xl bg-hero-mesh p-5">
        <Route className="mb-6 h-8 w-8 text-cyan-600" />
        <h2 className="text-lg font-black">Travel command center</h2>
        <p className="mt-2 text-sm text-slate-500">Plan the loop, visualize spend, share the story.</p>
      </div>
      <div className="mt-6 space-y-2">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${isActive ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900'}`}>
            <Icon className="h-5 w-5" /> {label}
          </NavLink>
        ))}
      </div>
    </motion.aside>
  );
}
