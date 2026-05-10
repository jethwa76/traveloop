import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Download, Plane } from 'lucide-react';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import TimelineCard from '../components/TimelineCard';
import { getTrip } from '../services/tripService';
import { formatCurrency, formatDateRange, normalizeTrip } from '../utils/tripUtils';

export default function SharedItineraryPage() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { getTrip(tripId).then((data) => { setTrip(data ? normalizeTrip(data) : null); setLoading(false); }); }, [tripId]);
  if (loading) return <LoadingSpinner />;
  if (!trip) return <p className="p-8">Shared itinerary not found.</p>;
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6"><Link to="/" className="flex items-center gap-2 text-xl font-black"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-500 text-white"><Plane /></span> Traveloop</Link><button onClick={() => window.print()} className="btn-secondary"><Download className="h-4 w-4" /> Print</button></header>
      <main className="mx-auto max-w-5xl px-4 pb-16">
        <section className="glass-card overflow-hidden rounded-[2rem]">
          <img src={trip.cover} alt="" className="h-80 w-full object-cover" />
          <div className="p-8 text-center"><p className="font-bold text-cyan-600">Public itinerary • Read-only</p><h1 className="mt-2 text-5xl font-black">{trip.name}</h1><p className="mt-4 text-slate-500">{trip.description}</p><div className="mt-6 flex flex-wrap justify-center gap-3 text-sm font-bold"><span className="rounded-full bg-white px-4 py-2 shadow-sm dark:bg-slate-900">{formatDateRange(trip.startDate, trip.endDate)}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm dark:bg-slate-900">{trip.destinations.join(' • ')}</span><span className="rounded-full bg-white px-4 py-2 shadow-sm dark:bg-slate-900">{formatCurrency(trip.budget)} planned</span></div></div>
        </section>
        <section className="mt-8 space-y-5 border-l-2 border-dashed border-cyan-200 pl-4">{trip.itinerary.map((item, index) => <TimelineCard key={`${item.day}-${index}`} item={item} />)}</section>
      </main>
      <Footer />
    </div>
  );
}
