import { Link, NavLink } from 'react-router-dom';
import { Moon, Plane, Sun } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-black"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-rose-400 text-white shadow-glow"><Plane /></span> Traveloop</Link>
        <div className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <NavLink to="/dashboard" className="hover:text-cyan-600">Dashboard</NavLink>
          <NavLink to="/trips" className="hover:text-cyan-600">Trips</NavLink>
          <NavLink to="/budget" className="hover:text-cyan-600">Budget</NavLink>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800" aria-label="Toggle theme">{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>
          {user ? <button onClick={logout} className="btn-secondary hidden px-4 py-2 sm:inline-flex">Sign out</button> : <Link to="/login" className="btn-primary px-4 py-2">Login</Link>}
        </div>
      </nav>
    </header>
  );
}
