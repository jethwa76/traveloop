import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/80 py-10 backdrop-blur dark:border-white/10 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <Link to="/" className="flex items-center gap-3 font-semibold text-slate-950 dark:text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white dark:bg-white dark:text-slate-950">
              TL
            </span>
            Traveloop Lite
          </Link>
          <div className="flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
            <a href="#features" className="hover:text-slate-950 dark:hover:text-white">
              Features
            </a>
            <a href="#testimonials" className="hover:text-slate-950 dark:hover:text-white">
              Stories
            </a>
            <Link to="/login" className="hover:text-slate-950 dark:hover:text-white">
              Sign in
            </Link>
          </div>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Built for fast, polished travel planning demos. Connect Firebase to move from demo mode to production data.
        </p>
      </div>
    </footer>
  );
}
