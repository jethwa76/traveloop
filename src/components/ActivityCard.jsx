import { Clock, DollarSign, StickyNote } from "lucide-react";
import { currency } from "../utils/budget.js";

export default function ActivityCard({ activity }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-soft dark:border-white/10 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-semibold text-slate-950 dark:text-white">{activity.title}</p>
          {activity.notes ? (
            <p className="mt-1 flex items-start gap-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              <StickyNote className="mt-0.5 h-4 w-4 flex-none" />
              {activity.notes}
            </p>
          ) : null}
        </div>
        <span className="w-fit rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-200">
          {activity.category || "Activities"}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {activity.time || "Flexible"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <DollarSign className="h-4 w-4" />
          {currency(activity.cost)}
        </span>
      </div>
    </div>
  );
}
