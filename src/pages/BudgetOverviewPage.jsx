import { Bike, Hotel, Soup, Ticket } from 'lucide-react';
import BudgetCard from '../components/BudgetCard';
import ChartSection from '../components/ChartSection';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTrips } from '../hooks/useTrips';
import { budgetCategories } from '../data/mockData';
import { formatCurrency, totalExpenses, tripDays } from '../utils/tripUtils';

export default function BudgetOverviewPage() {
  const { trips, loading } = useTrips();
  if (loading) return <LoadingSpinner />;
  const categoryTotals = trips.reduce((acc, trip) => {
    Object.entries(trip.expenses || {}).forEach(([key, value]) => { acc[key] = (acc[key] || 0) + Number(value || 0); });
    return acc;
  }, {});
  const categories = budgetCategories.map((item) => ({ ...item, value: categoryTotals[item.name.toLowerCase()] || item.value }));
  const total = categories.reduce((sum, item) => sum + item.value, 0);
  const totalDays = trips.reduce((sum, trip) => sum + tripDays(trip.startDate, trip.endDate), 0) || 1;
  return (
    <div className="space-y-8">
      <div><p className="font-bold text-cyan-600">Budget overview</p><h1 className="text-4xl font-black">Understand every dollar before departure.</h1><p className="mt-3 text-slate-500">Total estimated cost: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(total)}</span> • Daily average: <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(total / totalDays)}</span></p></div>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <BudgetCard label="Transport" amount={categories[0].value} icon={Bike} />
        <BudgetCard label="Hotels" amount={categories[1].value} icon={Hotel} tone="indigo" />
        <BudgetCard label="Activities" amount={categories[2].value} icon={Ticket} tone="rose" />
        <BudgetCard label="Food" amount={categories[3].value} icon={Soup} tone="amber" />
      </section>
      <ChartSection categories={categories} />
      <section className="glass-card rounded-3xl p-6"><h2 className="text-xl font-black">Trip budget previews</h2><div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">{trips.map((trip) => <div key={trip.id} className="flex items-center justify-between gap-4 py-4"><div><p className="font-bold">{trip.name}</p><p className="text-sm text-slate-500">{trip.destinations?.join(' • ')}</p></div><p className="font-extrabold">{formatCurrency(totalExpenses(trip) || trip.budget)}</p></div>)}</div></section>
    </div>
  );
}
