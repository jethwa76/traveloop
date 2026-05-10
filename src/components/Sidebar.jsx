import { BarChart3, CalendarPlus, Home, Map, Plane, WalletCards } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/trips", label: "My Trips", icon: Map },
  { to: "/trips/new", label: "Create Trip", icon: CalendarPlus },
  { to: "/budget", label: "Budget", icon: WalletCards },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="flex h-full flex-col border-r border-slate-200 bg-white px-4 py-5 dark:border-white/10 dark:bg-slate-950">
      <NavLink to="/dashboard" onClick={onNavigate} className="flex items-center gap-3 px-2 text-slate-950 dark:text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950">
          <Plane className="h-5 w-5" />
        </span>
        <div>
          <p className="font-semibold">Traveloop</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Lite planner</p>
        </div>
      </NavLink>

      <div className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>

    </aside>
  );
}
