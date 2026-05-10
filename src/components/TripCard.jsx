import { motion } from "framer-motion";
import { CalendarDays, Edit3, MapPin, Share2, Trash2, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import { currency } from "../utils/budget.js";
import { formatDateRange, getTripDuration } from "../utils/date.js";

export default function TripCard({ trip, onDelete, onShare }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="app-card overflow-hidden"
    >
      <Link to={`/trips/${trip.id}`} className="block">
        <div className="h-2 bg-gradient-to-r from-brand-sky via-brand-teal to-brand-coral" />
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-sm font-medium text-brand-teal">
                <MapPin className="h-4 w-4" />
                {(trip.destinations ?? []).slice(0, 2).join(", ") || "Destinations pending"}
              </p>
              <h3 className="mt-2 truncate text-xl font-semibold text-slate-950 dark:text-white">{trip.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {trip.description || "No description added yet."}
              </p>
            </div>
            {trip.isShared ? (
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-200">
                Shared
              </span>
            ) : null}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 p-3 dark:bg-white/5">
              <CalendarDays className="h-4 w-4 text-brand-sky" />
              {formatDateRange(trip.startDate, trip.endDate)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg bg-slate-50 p-3 dark:bg-white/5">
              <WalletCards className="h-4 w-4 text-brand-coral" />
              {currency(trip.estimatedBudget)}
            </span>
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-300">
            {getTripDuration(trip.startDate, trip.endDate)} day plan
          </p>
        </div>
      </Link>

      <div className="flex items-center justify-between border-t border-slate-200 px-5 py-3 dark:border-white/10">
        <div className="flex gap-2">
          <Link
            to={`/trips/${trip.id}/edit`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
            title="Edit trip"
            aria-label={`Edit ${trip.name}`}
          >
            <Edit3 className="h-4 w-4" />
          </Link>
          {onShare ? (
            <button
              type="button"
              onClick={() => onShare(trip.id)}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              title="Share itinerary"
              aria-label={`Share ${trip.name}`}
            >
              <Share2 className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        {onDelete ? (
          <button
            type="button"
            onClick={() => onDelete(trip)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
            title="Delete trip"
            aria-label={`Delete ${trip.name}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    </motion.article>
  );
}
