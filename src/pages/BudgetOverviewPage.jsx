import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Banknote, Coffee, Hotel, Plane, Utensils, WalletCards } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import BudgetCard from "../components/BudgetCard.jsx";
import ChartSection from "../components/ChartSection.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { useTrips } from "../hooks/useTrips.js";
import {
  budgetCategories,
  currency,
  getBudgetChartData,
  getBudgetTotal,
  getDailyBudgetData,
  summarizeTrips,
} from "../utils/budget.js";
import { getTripDuration } from "../utils/date.js";

const categoryIcons = {
  transport: Plane,
  hotels: Hotel,
  activities: Activity,
  food: Utensils,
};

export default function BudgetOverviewPage() {
  const { trips, loading } = useTrips();
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    if (!selectedId && trips.length) setSelectedId(trips[0].id);
  }, [selectedId, trips]);

  const selectedTrip = trips.find((trip) => trip.id === selectedId) || trips[0];
  const summary = summarizeTrips(trips);
  const categoryData = selectedTrip ? getBudgetChartData(selectedTrip) : [];
  const dailyData = selectedTrip ? getDailyBudgetData(selectedTrip) : [];
  const categoryTotal = selectedTrip ? getBudgetTotal(selectedTrip.budget) : 0;
  const tripDuration = selectedTrip ? getTripDuration(selectedTrip.startDate, selectedTrip.endDate) : 1;
  const dailyAverage = categoryTotal / Math.max(1, tripDuration);

  const costBreakdown = useMemo(() => {
    if (!selectedTrip) return [];
    return budgetCategories.map((category) => ({
      name: category.label,
      amount: Number(selectedTrip.budget?.[category.key]) || 0,
      color: category.color,
    }));
  }, [selectedTrip]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <LoadingSpinner label="Loading budgets" />
      </div>
    );
  }

  if (!trips.length) {
    return (
      <EmptyState
        title="No budgets yet"
        message="Create a trip with an estimated budget to unlock charts and daily averages."
        actionLabel="Create trip"
        actionTo="/trips/new"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase text-brand-teal">Budget overview</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Travel cost dashboard</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Visualize category spend, daily averages, and trip-level estimates.</p>
        </div>
        <select className="input-field w-full lg:w-80" value={selectedTrip?.id || ""} onChange={(event) => setSelectedId(event.target.value)}>
          {trips.map((trip) => (
            <option key={trip.id} value={trip.id}>
              {trip.name}
            </option>
          ))}
        </select>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <BudgetCard title="Total estimated" value={currency(selectedTrip?.estimatedBudget)} icon={WalletCards} caption={selectedTrip?.name} />
        <BudgetCard title="Category plan" value={currency(categoryTotal)} icon={Banknote} accent="bg-emerald-50 text-brand-teal dark:bg-emerald-500/10" caption="Transport, hotel, food, activities" />
        <BudgetCard title="Daily average" value={currency(dailyAverage)} icon={Coffee} accent="bg-orange-50 text-brand-coral dark:bg-orange-500/10" caption={`${tripDuration} day itinerary`} />
        <BudgetCard title="All trip estimate" value={currency(summary.estimated)} icon={Plane} accent="bg-blue-50 text-brand-sky dark:bg-blue-500/10" caption={`${trips.length} trips`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ChartSection title="Budget pie chart" subtitle="Category-based spending allocation">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" innerRadius={62} outerRadius={102} paddingAngle={4}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => currency(value)} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartSection>

        <ChartSection title="Cost breakdown graph" subtitle="Estimated cost by category">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costBreakdown}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => currency(value)} />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {costBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartSection>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ChartSection title="Expense trend chart" subtitle="Activity costs by itinerary day">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="dailyCost" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#2f80ed" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.04} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} />
              <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => currency(value)} />
              <Area type="monotone" dataKey="cost" stroke="#2f80ed" fill="url(#dailyCost)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartSection>

        <section className="app-card p-5">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">Category details</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">A scannable summary for the selected trip.</p>
          <div className="mt-6 space-y-4">
            {budgetCategories.map((category) => {
              const Icon = categoryIcons[category.key];
              const amount = Number(selectedTrip?.budget?.[category.key]) || 0;
              const percent = Math.round((amount / Math.max(1, categoryTotal)) * 100);
              return (
                <div key={category.key} className="rounded-lg border border-slate-200 p-4 dark:border-white/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${category.color}1A`, color: category.color }}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-slate-950 dark:text-white">{category.label}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{percent}% of category plan</p>
                      </div>
                    </div>
                    <p className="font-semibold text-slate-950 dark:text-white">{currency(amount)}</p>
                  </div>
                  <div className="mt-4 h-2 rounded-lg bg-slate-100 dark:bg-white/10">
                    <div className="h-2 rounded-lg" style={{ width: `${Math.min(100, percent)}%`, backgroundColor: category.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </div>
  );
}
