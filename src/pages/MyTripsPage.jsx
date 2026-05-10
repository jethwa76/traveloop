import { Grid2X2, ListFilter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Modal from "../components/Modal.jsx";
import TripCard from "../components/TripCard.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useTrips } from "../hooks/useTrips.js";

export default function MyTripsPage() {
  const { trips, loading, removeTrip, publishTrip } = useTrips();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [tripToDelete, setTripToDelete] = useState(null);

  const filteredTrips = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return trips;
    return trips.filter((trip) => {
      const cities = (trip.destinations ?? []).join(" ");
      return `${trip.name} ${trip.description} ${cities}`.toLowerCase().includes(normalized);
    });
  }, [query, trips]);

  const handleShare = async (tripId) => {
    await publishTrip(tripId);
    const url = `${window.location.origin}/share/${tripId}`;
    await navigator.clipboard?.writeText(url).catch(() => undefined);
    showToast({ type: "info", title: "Copied share link", message: url });
  };

  const confirmDelete = async () => {
    if (!tripToDelete) return;
    await removeTrip(tripToDelete.id);
    setTripToDelete(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner label="Loading trips" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-teal">My trips</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Your travel plans</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Search, edit, delete, or publish shareable itineraries.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input-field w-full pl-10 sm:w-80"
              placeholder="Search trips or cities"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <span className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
            <ListFilter className="h-4 w-4" />
            {filteredTrips.length} results
          </span>
        </div>
      </div>

      {trips.length ? (
        filteredTrips.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onDelete={setTripToDelete} onShare={handleShare} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No matching trips"
            message="Try a different destination, trip name, or description."
          />
        )
      ) : (
        <EmptyState
          title="No trips yet"
          message="Create your first trip and Traveloop will generate an editable day-by-day planning shell."
          actionLabel="Create trip"
          actionTo="/trips/new"
        />
      )}

      <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400">
        <div className="flex items-start gap-3">
          <Grid2X2 className="mt-0.5 h-5 w-5 text-brand-sky" />
          <p>
            Tip: publish any trip to create a read-only itinerary at <span className="font-medium text-slate-700 dark:text-slate-200">/share/trip-id</span>.
          </p>
        </div>
      </div>

      <Modal
        open={Boolean(tripToDelete)}
        title="Delete trip?"
        description={tripToDelete ? `This will remove ${tripToDelete.name} from your planner.` : ""}
        onClose={() => setTripToDelete(null)}
      >
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" className="secondary-button" onClick={() => setTripToDelete(null)}>
            Cancel
          </button>
          <button type="button" className="primary-button bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-400" onClick={confirmDelete}>
            Delete trip
          </button>
        </div>
      </Modal>
    </div>
  );
}
