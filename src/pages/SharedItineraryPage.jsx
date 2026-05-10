import { Download, ExternalLink, MapPin, Plane, Printer, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ThemeToggle from "../components/ThemeToggle.jsx";
import TimelineCard from "../components/TimelineCard.jsx";
import { getSharedTrip } from "../services/tripService.js";
import { currency, getBudgetTotal } from "../utils/budget.js";
import { formatDateRange, getTripDuration } from "../utils/date.js";

export default function SharedItineraryPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getSharedTrip(tripId)
      .then((publicTrip) => {
        if (active) setTrip(publicTrip);
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [tripId]);

  const sortedItinerary = useMemo(
    () => [...(trip?.itinerary ?? [])].sort((a, b) => Number(a.day) - Number(b.day)),
    [trip?.itinerary],
  );

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingSpinner label="Loading shared itinerary" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-center dark:bg-slate-950">
        <div className="max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-slate-900">
          <h1 className="text-2xl font-semibold text-slate-950 dark:text-white">Itinerary not found</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This public plan may not have been published yet.
          </p>
          <Link to="/" className="primary-button mt-6">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80 print:static print:bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950 print:bg-slate-950 print:text-white">
              <Plane className="h-5 w-5" />
            </span>
            Traveloop Lite
          </Link>
          <div className="flex items-center gap-2 print:hidden">
            <ThemeToggle />
            <button type="button" onClick={() => window.print()} className="secondary-button">
              <Printer className="h-4 w-4" />
              Print
            </button>
            <Link to="/signup" className="primary-button hidden sm:inline-flex">
              <ExternalLink className="h-4 w-4" />
              Plan your trip
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8 print:bg-white print:text-slate-950">
        <section className="overflow-hidden rounded-lg bg-white shadow-soft dark:bg-slate-900 print:shadow-none">
          <div className="relative min-h-72">
            <img
              src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=85"
              alt="Open road travel"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/55" />
            <div className="relative flex min-h-72 flex-col justify-end p-6 text-white sm:p-8">
              <p className="text-sm font-semibold uppercase opacity-75">Shared itinerary</p>
              <h1 className="mt-3 text-4xl font-semibold">{trip.name}</h1>
              <p className="mt-3 max-w-3xl leading-7 text-slate-100">{trip.description}</p>
            </div>
          </div>

          <div className="grid gap-4 border-b border-slate-200 p-5 dark:border-white/10 sm:grid-cols-3 print:border-slate-200">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/5 print:bg-slate-50">
              <p className="text-sm text-slate-500">Dates</p>
              <p className="mt-2 font-semibold">{formatDateRange(trip.startDate, trip.endDate)}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/5 print:bg-slate-50">
              <p className="text-sm text-slate-500">Duration</p>
              <p className="mt-2 font-semibold">{getTripDuration(trip.startDate, trip.endDate)} days</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-white/5 print:bg-slate-50">
              <p className="text-sm text-slate-500">Estimated cost</p>
              <p className="mt-2 font-semibold">{currency(trip.estimatedBudget || getBudgetTotal(trip.budget))}</p>
            </div>
          </div>

          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {(trip.destinations ?? []).map((city) => (
                <span key={city} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-brand-sky dark:bg-blue-500/10 print:bg-blue-50">
                  <MapPin className="h-4 w-4" />
                  {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-semibold">Timeline</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 print:text-slate-500">Read-only plan for travelers and collaborators.</p>
            </div>
            <div className="relative space-y-5 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200">
              {sortedItinerary.map((day) => (
                <TimelineCard key={day.id} day={day} />
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="app-card p-5 print:shadow-none">
              <h2 className="flex items-center gap-2 font-semibold">
                <WalletCards className="h-5 w-5 text-brand-coral" />
                Budget
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                {Object.entries(trip.budget ?? {}).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4">
                    <span className="capitalize text-slate-500 dark:text-slate-400 print:text-slate-500">{key}</span>
                    <span className="font-semibold">{currency(value)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="app-card p-5 print:shadow-none">
              <h2 className="flex items-center gap-2 font-semibold">
                <Download className="h-5 w-5 text-brand-teal" />
                Notes
              </h2>
              <div className="mt-4 space-y-3">
                {(trip.notes ?? []).length ? (
                  trip.notes.map((item, index) => (
                    <p key={`${item}-${index}`} className="rounded-lg bg-slate-50 p-3 text-sm leading-6 text-slate-600 dark:bg-white/5 dark:text-slate-300 print:bg-slate-50 print:text-slate-600">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No notes included.</p>
                )}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
