import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title = "Nothing here yet",
  message = "Create your first trip to start planning.",
  actionLabel,
  actionTo,
}) {
  return (
    <div className="app-card flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-sky dark:bg-blue-500/10">
        <Compass className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-950 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">{message}</p>
      {actionLabel && actionTo ? (
        <Link to={actionTo} className="primary-button mt-6">
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
