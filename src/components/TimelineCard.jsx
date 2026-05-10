import ActivityCard from "./ActivityCard.jsx";
import { formatDate } from "../utils/date.js";

export default function TimelineCard({ day }) {
  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border-4 border-white bg-brand-sky shadow dark:border-slate-950" />
      <div className="app-card p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-brand-sky">Day {day.day}</p>
            <h3 className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">{day.title || day.city}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {formatDate(day.date)} in {day.city || "Destination pending"}
            </p>
          </div>
          <span className="w-fit rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 dark:bg-white/10 dark:text-slate-200">
            {(day.activities ?? []).length} activities
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {(day.activities ?? []).length ? (
            day.activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)
          ) : (
            <p className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
              No activities yet for this day.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
