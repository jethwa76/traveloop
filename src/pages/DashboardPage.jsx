import { Link } from 'react-router-dom';
import { CalendarClock, CreditCard, Plus, Route, WalletCards } from 'lucide-react';
import BudgetCard from '../components/BudgetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import TripCard from '../components/TripCard';
import { useAuth } from '../context/AuthContext';
import { useTrips } from '../hooks/useTrips';
import { totalExpenses } from '../utils/tripUtils';

export default function DashboardPage() {
  const { user } = useAuth();
  const { trips, loading, removeTrip } = useTrips();
  const totalBudget = trips.reduce((sum, trip) => sum + Number(trip.budget || 0), 0);
  const spent = trips.reduce((sum, trip) => sum + totalExpenses(trip), 0);
  if (loading) return <LoadingSpinner />;
  return (
    <div className="space-y-8">
      <section className="glass-card rounded-[2rem] p-8">
        <p className="font-bold text-cyan-600">Welcome back, {user?.displayName || 'Traveler'}</p>
        <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div><h1 className="text-4xl font-black">Your travel loop is taking shape.</h1><p className="mt-3 max-w-2xl text-slate-500">Track upcoming trips, budget health, and the next actions that move your plan forward.</p></div>
          <Link to="/trips/new" className="btn-primary"><Plus className="h-4 w-4" /> New trip</Link>
        </div>
      </section>
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <BudgetCard label="Total planned budget" amount={totalBudget} icon={WalletCards} />
        <BudgetCard label="Estimated expenses" amount={spent} icon={CreditCard} tone="rose" />
        <BudgetCard label="Upcoming trips" amount={trips.length} icon={CalendarClock} tone="indigo" />
        <BudgetCard label="Destinations" amount={trips.flatMap((trip) => trip.destinations || []).length} icon={Route} tone="amber" />
      </section>
      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-2xl font-black">Recent trips</h2><Link to="/trips" className="text-sm font-bold text-cyan-600">View all</Link></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{trips.slice(0, 3).map((trip) => <TripCard key={trip.id} trip={trip} onDelete={removeTrip} />)}</div>
      </section>
    </div>
  );
}
