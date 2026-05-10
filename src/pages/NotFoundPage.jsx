import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
      <div className="max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-soft dark:border-white/10 dark:bg-slate-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-sky dark:bg-blue-500/10">
          <Compass className="h-6 w-6" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-slate-950 dark:text-white">Page not found</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          This route is not part of the current Traveloop itinerary.
        </p>
        <Link to="/" className="primary-button mt-6">
          Back home
        </Link>
      </div>
    </div>
  );
}
