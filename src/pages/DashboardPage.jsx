import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CalendarClock, Map, PlaneTakeoff, Plus, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import BudgetCard from "../components/BudgetCard.jsx";
import ChartSection from "../components/ChartSection.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import TripCard from "../components/TripCard.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useTrips } from "../hooks/useTrips.js";
import { budgetCategories, currency, getBudgetChartData, summarizeTrips } from "../utils/budget.js";
import { formatDateRange, isUpcoming } from "../utils/date.js";

export default function DashboardPage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { trips, loading, publishTrip } = useTrips();
  const summary = summarizeTrips(trips);
  const recentTrips = trips.slice(0, 3);
  const nextTrip = trips.filter((trip) => isUpcoming(trip.startDate)).sort((a, b) => a.startDate.localeCompare(b.startDate))[0];
  const chartTrip = trips[0];
  const pieData = chartTrip ? getBudgetChartData(chartTrip) : [];
  const tripBudgetData = trips.slice(0, 5).map((trip) => ({
    name: trip.name.length > 12 ? `${trip.name.slice(0, 12)}...` : trip.name,
    budget: Number(trip.estimatedBudget) || 0,
  }));

  const handleShare = async (tripId) => {
    await publishTrip(tripId);
    const url = `${window.location.origin}/share/${tripId}`;
    await navigator.clipboard?.writeText(url).catch(() => undefined);
    showToast({ type: "info", title: "Copied share link", message: url });
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner label="Preparing dashboard" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg bg-slate-950 text-white shadow-soft dark:bg-white dark:text-slate-950">
        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_0.55fr] lg:p-8">
          <div>
            <p className="text-sm font-medium opacity-70">Planner dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold">Good to see you, {user?.displayName || "Traveler"}.</h1>
            <p className="mt-3 max-w-2xl leading-7 opacity-75">
              Review your upcoming trips, watch budget totals, and jump straight into the next itinerary decision.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/trips/new" className="primary-button bg-white text-slate-950 hover:bg-slate-100 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800">
                <Plus className="h-4 w-4" />
                Create trip
              </Link>
              <Link to="/trips" className="secondary-button border-white/20 bg-white/10 text-white hover:bg-white/20 dark:border-slate-200 dark:bg-white dark:text-slate-950">
                View all trips
              </Link>
            </div>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur dark:border-slate-200 dark:bg-slate-50">
            <CalendarClock className="h-6 w-6 text-brand-mint dark:text-brand-teal" />
            <p className="mt-4 text-sm font-medium opacity-70">Upcoming trip</p>
            {nextTrip ? (
              <>
                <p className="mt-2 text-2xl font-semibold">{nextTrip.name}</p>
                <p className="mt-2 text-sm opacity-75">{formatDateRange(nextTrip.startDate, nextTrip.endDate)}</p>
              </>
            ) : (
              <p className="mt-2 text-lg font-semibold">No upcoming trips yet</p>
            )}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <BudgetCard title="Trips planned" value={trips.length} icon={PlaneTakeoff} caption="Active workspaces" />
        <BudgetCard
          title="Estimated budget"
          value={currency(summary.estimated)}
          icon={WalletCards}
          accent="bg-orange-50 text-brand-coral dark:bg-orange-500/10"
          caption="Across all trips"
        />
        <BudgetCard
          title="Activity spend"
          value={currency(summary.activities)}
          icon={Map}
          accent="bg-emerald-50 text-brand-teal dark:bg-emerald-500/10"
          caption="From itinerary items"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <ChartSection title="Budget mix" subtitle={chartTrip ? chartTrip.name : "Create a trip to see cost categories"}>
          {pieData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={64} outerRadius={98} paddingAngle={4}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => currency(value)} />
              </PieChart>
            </ResponsiveContainer>
          ) : null}
        </ChartSection>

        <ChartSection title="Trip budgets" subtitle="Estimated budget by recent trip">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tripBudgetData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => currency(value)} />
              <Bar dataKey="budget" radius={[6, 6, 0, 0]}>
                {tripBudgetData.map((entry, index) => (
                  <Cell key={entry.name} fill={budgetCategories[index % budgetCategories.length].color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recent trips</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Continue from the plans you touched most recently.</p>
          </div>
          <Link to="/trips" className="secondary-button hidden sm:inline-flex">
            View all
          </Link>
        </div>
        {recentTrips.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {recentTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} onShare={handleShare} />
            ))}
          </div>
        ) : (
          <EmptyState actionLabel="Create your first trip" actionTo="/trips/new" />
        )}
      </section>
    </div>
  );
}
