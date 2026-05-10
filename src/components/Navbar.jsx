import { Menu, Plane, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  { to: "/#features", label: "Features" },
  { to: "/#testimonials", label: "Stories" },
];

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-white/30 bg-white/75 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-slate-950 dark:text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
            <Plane className="h-5 w-5" />
          </span>
          <span className="font-semibold">Traveloop Lite</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.label} href={link.to} className="text-sm font-medium text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <NavLink to={user ? "/dashboard" : "/login"} className="secondary-button">
            {user ? "Dashboard" : "Log in"}
          </NavLink>
          <NavLink to={user ? "/trips/new" : "/signup"} className="primary-button">
            {user ? "New trip" : "Start free"}
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-slate-950 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a key={link.label} href={link.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10">
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <ThemeToggle />
              <Link to={user ? "/dashboard" : "/login"} className="secondary-button flex-1" onClick={() => setOpen(false)}>
                {user ? "Dashboard" : "Log in"}
              </Link>
              <Link to={user ? "/trips/new" : "/signup"} className="primary-button flex-1" onClick={() => setOpen(false)}>
                {user ? "New trip" : "Start free"}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
