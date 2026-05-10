import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Plus, Share2, StickyNote } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import TimelineCard from '../components/TimelineCard';
import { useAuth } from '../context/AuthContext';
import { getTrip, updateTrip } from '../services/tripService';
import { formatCurrency, formatDateRange, normalizeTrip, tripDays } from '../utils/tripUtils';

export default function TripDetailsPage() {
  const { tripId } = useParams();
  const { user } = useAuth();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [activity, setActivity] = useState({ day: 1, city: '', title: '', activity: '', notes: '' });

  useEffect(() => {
    getTrip(tripId, user?.uid).then((data) => { setTrip(data ? normalizeTrip(data) : null); setLoading(false); });
  }, [tripId, user?.uid]);

  const days = useMemo(() => tripDays(trip?.startDate, trip?.endDate), [trip]);
  if (loading) return <LoadingSpinner />;
  if (!trip) return <p>Trip not found.</p>;

  const addActivity = async (event) => {
    event.preventDefault();
    const itinerary = [...trip.itinerary, { day: Number(activity.day), title: activity.title, city: activity.city, activities: [activity.activity], notes: activity.notes }].sort((a, b) => a.day - b.day);
    setTrip({ ...trip, itinerary });
    await updateTrip(trip.id, { itinerary });
    setModal(false);
    setActivity({ day: 1, city: '', title: '', activity: '', notes: '' });
  };

  return (
    <div className="space-y-8">
      <section className="glass-card overflow-hidden rounded-[2rem]">
        <div className="grid lg:grid-cols-[.85fr_1.15fr]">
          <img src={trip.cover} alt="" className="h-full min-h-72 w-full object-cover" />
          <div className="p-8">
            <p className="font-bold text-cyan-600">{formatDateRange(trip.startDate, trip.endDate)}</p>
            <h1 className="mt-2 text-4xl font-black">{trip.name}</h1>
            <p className="mt-4 text-slate-500">{trip.description}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">Cities</p><p className="font-bold">{trip.destinations.join(', ')}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">Days</p><p className="font-bold">{days}</p></div>
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"><p className="text-sm text-slate-500">Budget</p><p className="font-bold">{formatCurrency(trip.budget)}</p></div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3"><button onClick={() => setModal(true)} className="btn-primary"><Plus className="h-4 w-4" /> Add activity</button><Link to={`/share/${trip.id}`} className="btn-secondary"><Share2 className="h-4 w-4" /> Share</Link></div>
          </div>
        </div>
      </section>
      <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5 border-l-2 border-dashed border-cyan-200 pl-4">{trip.itinerary.map((item, index) => <TimelineCard key={`${item.day}-${item.title}-${index}`} item={item} />)}</div>
        <aside className="glass-card h-fit rounded-3xl p-6"><StickyNote className="h-7 w-7 text-cyan-600" /><h2 className="mt-4 text-xl font-black">Trip notes</h2><p className="mt-3 text-sm leading-6 text-slate-500">Keep confirmation numbers, packing reminders, reservations, and local tips attached to each day using the Add activity flow.</p></aside>
      </section>
      <Modal open={modal} onClose={() => setModal(false)} title="Add destination activity">
        <form onSubmit={addActivity} className="grid gap-4">
          <input className="input" type="number" min="1" max={days} value={activity.day} onChange={(e) => setActivity({ ...activity, day: e.target.value })} placeholder="Day" required />
          <input className="input" value={activity.city} onChange={(e) => setActivity({ ...activity, city: e.target.value })} placeholder="City" required />
          <input className="input" value={activity.title} onChange={(e) => setActivity({ ...activity, title: e.target.value })} placeholder="Timeline title" required />
          <input className="input" value={activity.activity} onChange={(e) => setActivity({ ...activity, activity: e.target.value })} placeholder="Activity" required />
          <textarea className="input" value={activity.notes} onChange={(e) => setActivity({ ...activity, notes: e.target.value })} placeholder="Notes" />
          <button className="btn-primary">Add to itinerary</button>
        </form>
      </Modal>
    </div>
  );
}
