import EmptyState from '../components/EmptyState';
import LoadingSpinner from '../components/LoadingSpinner';
import TripCard from '../components/TripCard';
import { useTrips } from '../hooks/useTrips';

export default function MyTripsPage() {
  const { trips, loading, removeTrip } = useTrips();
  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div><p className="font-bold text-cyan-600">My trips</p><h1 className="text-4xl font-black">All planned travel loops</h1></div>
        <p className="text-sm text-slate-500">{trips.length} trip{trips.length === 1 ? '' : 's'} in your workspace</p>
      </div>
      {trips.length ? <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{trips.map((trip) => <TripCard key={trip.id} trip={trip} onDelete={removeTrip} />)}</div> : <EmptyState />}
    </div>
  );
}
