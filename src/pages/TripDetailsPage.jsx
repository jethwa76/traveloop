import { CalendarDays, MapPin, NotebookPen, Plus, Share2, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BudgetCard from "../components/BudgetCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import Modal from "../components/Modal.jsx";
import TimelineCard from "../components/TimelineCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { getTrip, shareTrip, updateTrip } from "../services/tripService.js";
import { budgetCategories, currency, getBudgetTotal } from "../utils/budget.js";
import { formatDateRange, getDateForDay, getTripDuration } from "../utils/date.js";

const initialActivity = {
  day: 1,
  title: "",
  time: "",
  category: "Activities",
  cost: "",
  notes: "",
};

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activityOpen, setActivityOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [activityForm, setActivityForm] = useState(initialActivity);
  const [destination, setDestination] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!user?.uid) return;
    let active = true;
    setLoading(true);
    setTrip(null);

    getTrip(user.uid, tripId)
      .then((loadedTrip) => {
        if (!active) return;
        if (!loadedTrip) {
          showToast({ type: "error", title: "Trip not found", message: "That itinerary could not be opened." });
          navigate("/trips", { replace: true });
          return;
        }
        setTrip(loadedTrip);
        setActivityForm((current) => ({ ...current, day: loadedTrip.itinerary?.[0]?.day || 1 }));
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [navigate, showToast, tripId, user?.uid]);

  const sortedItinerary = useMemo(
    () => [...(trip?.itinerary ?? [])].sort((a, b) => Number(a.day) - Number(b.day)),
    [trip?.itinerary],
  );

  const persistTrip = async (updates, toastMessage) => {
    const nextTrip = { ...trip, ...updates };
    setTrip(nextTrip);
    await updateTrip(user.uid, trip.id, updates);
    showToast({ type: "success", title: "Trip updated", message: toastMessage });
  };

  const handleAddDestination = async (event) => {
    event.preventDefault();
    const city = destination.trim();
    if (!city || !trip) return;
    const destinations = [...(trip.destinations ?? []), city];
    await persistTrip({ destinations }, `${city} was added to this route.`);
    setDestination("");
    setDestinationOpen(false);
  };

  const handleAddNote = async (event) => {
    event.preventDefault();
    if (!note.trim() || !trip) return;
    const notes = [...(trip.notes ?? []), note.trim()];
    await persistTrip({ notes }, "Note added to the trip.");
    setNote("");
    setNoteOpen(false);
  };

  const handleAddActivity = async (event) => {
    event.preventDefault();
    if (!activityForm.title.trim() || !trip) return;

    const dayNumber = Number(activityForm.day) || 1;
    const itinerary = [...(trip.itinerary ?? [])];
    let day = itinerary.find((item) => Number(item.day) === dayNumber);

    if (!day) {
      day = {
        id: crypto.randomUUID(),
        day: dayNumber,
        date: getDateForDay(trip.startDate, dayNumber),
        city: trip.destinations?.[0] || "",
        title: `Day ${dayNumber}`,
        activities: [],
      };
      itinerary.push(day);
    }

    const activity = {
      id: crypto.randomUUID(),
      title: activityForm.title.trim(),
      time: activityForm.time,
      category: activityForm.category,
      cost: Number(activityForm.cost) || 0,
      notes: activityForm.notes.trim(),
    };

    const nextItinerary = itinerary
      .map((item) =>
        Number(item.day) === dayNumber ? { ...item, activities: [...(item.activities ?? []), activity] } : item,
      )
      .sort((a, b) => Number(a.day) - Number(b.day));

    await persistTrip({ itinerary: nextItinerary }, "Activity added to the timeline.");
    setActivityForm({ ...initialActivity, day: dayNumber });
    setActivityOpen(false);
  };

  const handleShare = async () => {
    await shareTrip(user.uid, trip.id);
    setTrip((current) => ({ ...current, isShared: true }));
    const url = `${window.location.origin}/share/${trip.id}`;
    await navigator.clipboard?.writeText(url).catch(() => undefined);
    showToast({ type: "success", title: "Share link copied", message: url });
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner label="Loading itinerary" />
      </div>
    );
  }

  if (!trip) return null;

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 p-6 text-white shadow-soft dark:bg-white dark:text-slate-950 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase opacity-70">Trip details</p>
            <h1 className="mt-2 text-3xl font-semibold">{trip.name}</h1>
            <p className="mt-3 max-w-3xl leading-7 opacity-75">{trip.description || "Add more detail to make this plan easier to share."}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {(trip.destinations ?? []).map((city) => (
                <span key={city} className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium dark:bg-slate-100">
                  <MapPin className="h-4 w-4" />
                  {city}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to={`/trips/${trip.id}/edit`} className="secondary-button border-white/20 bg-white/10 text-white hover:bg-white/20 dark:border-slate-200 dark:bg-white dark:text-slate-950">
              Edit
            </Link>
            <button type="button" onClick={handleShare} className="primary-button bg-white text-slate-950 hover:bg-slate-100 dark:bg-slate-950 dark:text-white">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <BudgetCard title="Date range" value={formatDateRange(trip.startDate, trip.endDate)} icon={CalendarDays} caption={`${getTripDuration(trip.startDate, trip.endDate)} days`} />
        <BudgetCard title="Estimated budget" value={currency(trip.estimatedBudget)} icon={WalletCards} caption={`Category plan ${currency(getBudgetTotal(trip.budget))}`} />
        <BudgetCard title="Activities" value={sortedItinerary.reduce((sum, day) => sum + (day.activities?.length || 0), 0)} icon={NotebookPen} caption={`${sortedItinerary.length} timeline days`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Day-wise itinerary</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Activities are grouped into a clean travel timeline.</p>
            </div>
            <button type="button" className="primary-button w-fit" onClick={() => setActivityOpen(true)}>
              <Plus className="h-4 w-4" />
              Add activity
            </button>
          </div>
          <div className="relative space-y-5 before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-slate-200 dark:before:bg-white/10">
            {sortedItinerary.map((day) => (
              <TimelineCard key={day.id} day={day} />
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="app-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-950 dark:text-white">Destinations</h2>
              <button type="button" onClick={() => setDestinationOpen(true)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Add destination">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-2">
              {(trip.destinations ?? []).map((city, index) => (
                <div key={`${city}-${index}`} className="flex items-center gap-3 rounded-lg bg-slate-50 p-3 text-sm font-medium text-slate-700 dark:bg-white/5 dark:text-slate-200">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-semibold text-brand-sky dark:bg-slate-950">
                    {index + 1}
                  </span>
                  {city}
                </div>
              ))}
            </div>
          </div>

          <div className="app-card p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold text-slate-950 dark:text-white">Notes</h2>
              <button type="button" onClick={() => setNoteOpen(true)} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white" aria-label="Add note">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3">
              {(trip.notes ?? []).length ? (
                trip.notes.map((item, index) => (
                  <p key={`${item}-${index}`} className="rounded-lg border border-slate-200 p-3 text-sm leading-6 text-slate-600 dark:border-white/10 dark:text-slate-300">
                    {item}
                  </p>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">No notes yet.</p>
              )}
            </div>
          </div>

          <div className="app-card p-5">
            <h2 className="font-semibold text-slate-950 dark:text-white">Budget split</h2>
            <div className="mt-4 space-y-3">
              {budgetCategories.map((category) => (
                <div key={category.key}>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">{category.label}</span>
                    <span className="font-semibold text-slate-950 dark:text-white">{currency(trip.budget?.[category.key])}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-lg bg-slate-100 dark:bg-white/10">
                    <div
                      className="h-2 rounded-lg"
                      style={{
                        width: `${Math.min(100, ((Number(trip.budget?.[category.key]) || 0) / Math.max(1, getBudgetTotal(trip.budget))) * 100)}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <Modal open={activityOpen} title="Add activity" description="Place an activity into the day-wise timeline." onClose={() => setActivityOpen(false)}>
        <form className="space-y-4" onSubmit={handleAddActivity}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-text" htmlFor="activity-day">Day</label>
              <select
                id="activity-day"
                className="input-field mt-2"
                value={activityForm.day}
                onChange={(event) => setActivityForm((current) => ({ ...current, day: event.target.value }))}
              >
                {sortedItinerary.map((day) => (
                  <option key={day.day} value={day.day}>
                    Day {day.day}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text" htmlFor="activity-time">Time</label>
              <input
                id="activity-time"
                type="time"
                className="input-field mt-2"
                value={activityForm.time}
                onChange={(event) => setActivityForm((current) => ({ ...current, time: event.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="label-text" htmlFor="activity-title">Activity</label>
            <input
              id="activity-title"
              className="input-field mt-2"
              value={activityForm.title}
              onChange={(event) => setActivityForm((current) => ({ ...current, title: event.target.value }))}
              placeholder="Museum visit, train transfer, dinner booking"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-text" htmlFor="activity-category">Category</label>
              <select
                id="activity-category"
                className="input-field mt-2"
                value={activityForm.category}
                onChange={(event) => setActivityForm((current) => ({ ...current, category: event.target.value }))}
              >
                {budgetCategories.map((category) => (
                  <option key={category.label}>{category.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text" htmlFor="activity-cost">Cost</label>
              <input
                id="activity-cost"
                type="number"
                min="0"
                className="input-field mt-2"
                value={activityForm.cost}
                onChange={(event) => setActivityForm((current) => ({ ...current, cost: event.target.value }))}
                placeholder="45"
              />
            </div>
          </div>
          <div>
            <label className="label-text" htmlFor="activity-notes">Notes</label>
            <textarea
              id="activity-notes"
              className="input-field mt-2 min-h-24"
              value={activityForm.notes}
              onChange={(event) => setActivityForm((current) => ({ ...current, notes: event.target.value }))}
              placeholder="Booking reference, dress code, timing details"
            />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="secondary-button" onClick={() => setActivityOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Add activity
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={destinationOpen} title="Add destination" description="Append another city stop to this trip." onClose={() => setDestinationOpen(false)}>
        <form className="space-y-4" onSubmit={handleAddDestination}>
          <div>
            <label htmlFor="destination" className="label-text">City name</label>
            <input
              id="destination"
              className="input-field mt-2"
              value={destination}
              onChange={(event) => setDestination(event.target.value)}
              placeholder="Nara"
              required
            />
          </div>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="secondary-button" onClick={() => setDestinationOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Add destination
            </button>
          </div>
        </form>
      </Modal>

      <Modal open={noteOpen} title="Add note" description="Keep planning details close to the itinerary." onClose={() => setNoteOpen(false)}>
        <form className="space-y-4" onSubmit={handleAddNote}>
          <textarea
            className="input-field min-h-32"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Remember to reserve seats, check visa rules, or confirm hotel check-in..."
            required
          />
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button type="button" className="secondary-button" onClick={() => setNoteOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Save note
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
