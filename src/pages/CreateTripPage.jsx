import { CalendarDays, Check, MapPin, Route, Save, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BudgetCard from "../components/BudgetCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useTrips } from "../hooks/useTrips.js";
import { getTrip } from "../services/tripService.js";
import { budgetCategories, buildBudgetFromEstimate, currency, getBudgetTotal } from "../utils/budget.js";
import { getDateForDay, getTripDuration } from "../utils/date.js";

const emptyForm = {
  name: "",
  startDate: "",
  endDate: "",
  destinations: "",
  estimatedBudget: "",
  description: "",
};

function buildItinerary(startDate, endDate, destinations) {
  const duration = Math.min(getTripDuration(startDate, endDate) || 1, 30);
  return Array.from({ length: duration }, (_, index) => {
    const day = index + 1;
    const city = destinations[Math.min(index, destinations.length - 1)] || destinations[0] || "";
    return {
      id: crypto.randomUUID(),
      day,
      date: getDateForDay(startDate, day),
      city,
      title: city ? `${city} day ${day}` : `Day ${day}`,
      activities: [],
    };
  });
}

export default function CreateTripPage() {
  const { tripId } = useParams();
  const isEditing = Boolean(tripId);
  const { user } = useAuth();
  const { showToast } = useToast();
  const { addTrip, saveTrip } = useTrips();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [budget, setBudget] = useState(buildBudgetFromEstimate(0));
  const [existingTrip, setExistingTrip] = useState(null);
  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isEditing || !user?.uid) return;

    let active = true;
    setLoading(true);
    getTrip(user.uid, tripId)
      .then((trip) => {
        if (!active) return;
        if (!trip) {
          showToast({ type: "error", title: "Trip not found", message: "The requested trip could not be loaded." });
          navigate("/trips", { replace: true });
          return;
        }
        setExistingTrip(trip);
        setForm({
          name: trip.name || "",
          startDate: trip.startDate || "",
          endDate: trip.endDate || "",
          destinations: (trip.destinations ?? []).join(", "),
          estimatedBudget: trip.estimatedBudget || "",
          description: trip.description || "",
        });
        setBudget(trip.budget || buildBudgetFromEstimate(trip.estimatedBudget));
      })
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [isEditing, navigate, showToast, tripId, user?.uid]);

  const destinationList = useMemo(
    () =>
      form.destinations
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    [form.destinations],
  );

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 3) nextErrors.name = "Trip name must be at least 3 characters.";
    if (!form.startDate) nextErrors.startDate = "Start date is required.";
    if (!form.endDate) nextErrors.endDate = "End date is required.";
    if (form.startDate && form.endDate && form.endDate < form.startDate) nextErrors.endDate = "End date must be after start date.";
    if (!destinationList.length) nextErrors.destinations = "Add at least one destination city.";
    if (Number(form.estimatedBudget) <= 0) nextErrors.estimatedBudget = "Estimated budget must be greater than zero.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleBudgetChange = (key, value) => {
    setBudget((current) => ({ ...current, [key]: Number(value) || 0 }));
  };

  const handleEstimateChange = (value) => {
    setForm((current) => ({ ...current, estimatedBudget: value }));
    setBudget(buildBudgetFromEstimate(Number(value)));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Reconcile itinerary against the new date range.
    // Always recalculate so duration changes are reflected correctly.
    const newDuration = Math.min(getTripDuration(form.startDate, form.endDate) || 1, 30);
    const existingItinerary = existingTrip?.itinerary ?? [];

    const reconciledItinerary = Array.from({ length: newDuration }, (_, index) => {
      const day = index + 1;
      const existing = existingItinerary.find((d) => Number(d.day) === day);
      if (existing) {
        // Keep the existing day with its activities, just update the date
        return { ...existing, date: getDateForDay(form.startDate, day) };
      }
      // New day beyond the old duration — create an empty day
      const city = destinationList[Math.min(index, destinationList.length - 1)] || destinationList[0] || "";
      return {
        id: crypto.randomUUID(),
        day,
        date: getDateForDay(form.startDate, day),
        city,
        title: city ? `${city} day ${day}` : `Day ${day}`,
        activities: [],
      };
    });

    const payload = {
      name: form.name.trim(),
      startDate: form.startDate,
      endDate: form.endDate,
      destinations: destinationList,
      estimatedBudget: Number(form.estimatedBudget),
      description: form.description.trim(),
      budget,
      notes: existingTrip?.notes ?? [],
      itinerary: reconciledItinerary,
    };

    try {
      const trip = isEditing ? await saveTrip(tripId, payload) : await addTrip(payload);
      navigate(`/trips/${trip.id || tripId}`);
    } catch (error) {
      showToast({ type: "error", title: "Could not save trip", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner label="Loading trip form" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-teal">{isEditing ? "Edit trip" : "Create trip"}</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
            {isEditing ? "Update travel plan" : "Start a new travel loop"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Add the core details first. You can refine day-wise itinerary items from the trip details page.
          </p>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-3">
        <BudgetCard title="Planned split" value={currency(getBudgetTotal(budget))} icon={WalletCards} caption="Category total" />
        <BudgetCard title="Trip length" value={`${getTripDuration(form.startDate, form.endDate) || 0} days`} icon={CalendarDays} caption="Based on dates" />
        <BudgetCard title="Destinations" value={destinationList.length} icon={Route} caption={destinationList.slice(0, 2).join(", ") || "Add cities"} />
      </section>

      <form onSubmit={handleSubmit} className="app-card p-5 sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="name" className="label-text">Trip name</label>
            <input
              id="name"
              className="input-field mt-2"
              placeholder="Golden Triangle Escape"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
            {errors.name ? <p className="mt-1 text-sm text-red-500">{errors.name}</p> : null}
          </div>

          <div>
            <label htmlFor="startDate" className="label-text">Start date</label>
            <input
              id="startDate"
              type="date"
              className="input-field mt-2"
              value={form.startDate}
              onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))}
            />
            {errors.startDate ? <p className="mt-1 text-sm text-red-500">{errors.startDate}</p> : null}
          </div>

          <div>
            <label htmlFor="endDate" className="label-text">End date</label>
            <input
              id="endDate"
              type="date"
              className="input-field mt-2"
              value={form.endDate}
              onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))}
            />
            {errors.endDate ? <p className="mt-1 text-sm text-red-500">{errors.endDate}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="destinations" className="label-text">Destination cities</label>
            <div className="relative mt-2">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="destinations"
                className="input-field pl-10"
                placeholder="Delhi, Agra, Jaipur"
                value={form.destinations}
                onChange={(event) => setForm((current) => ({ ...current, destinations: event.target.value }))}
              />
            </div>
            {errors.destinations ? <p className="mt-1 text-sm text-red-500">{errors.destinations}</p> : null}
          </div>

          <div>
            <label htmlFor="estimatedBudget" className="label-text">Estimated budget</label>
            <input
              id="estimatedBudget"
              type="number"
              min="0"
              className="input-field mt-2"
              placeholder="25000"
              value={form.estimatedBudget}
              onChange={(event) => handleEstimateChange(event.target.value)}
            />
            {errors.estimatedBudget ? <p className="mt-1 text-sm text-red-500">{errors.estimatedBudget}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="label-text">Trip description</label>
            <textarea
              id="description"
              className="input-field mt-2 min-h-28 resize-y"
              placeholder="A cultural and food journey across North India"
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 dark:border-white/10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Budget categories</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Auto-filled from the estimate, fully editable.</p>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Total {currency(getBudgetTotal(budget))}</p>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {budgetCategories.map((category) => (
              <div key={category.key}>
                <label htmlFor={category.key} className="label-text">{category.label}</label>
                <input
                  id={category.key}
                  type="number"
                  min="0"
                  className="input-field mt-2"
                  value={budget[category.key] ?? 0}
                  onChange={(event) => handleBudgetChange(category.key, event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => navigate(-1)} className="secondary-button">
            Cancel
          </button>
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? <Save className="h-4 w-4 animate-pulse" /> : <Check className="h-4 w-4" />}
            {submitting ? "Saving..." : isEditing ? "Save changes" : "Create trip"}
          </button>
        </div>
      </form>
    </div>
  );
}
