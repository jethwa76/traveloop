import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import Toast from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import { createTrip } from '../services/tripService';

const initial = { name: '', startDate: '', endDate: '', destinations: '', budget: '', description: '' };

export default function CreateTripPage() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (!form.name || !form.startDate || !form.endDate || !form.destinations || !form.budget) return setError('Please complete all required trip fields.');
    const trip = {
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      destinations: form.destinations.split(',').map((item) => item.trim()).filter(Boolean),
      budget: Number(form.budget),
      description: form.description,
      status: 'Planning',
      cover: `https://source.unsplash.com/1200x800/?${encodeURIComponent(form.destinations.split(',')[0] || 'travel')}`,
      expenses: { transport: 0, hotels: 0, activities: 0, food: 0 },
      itinerary: [{ day: 1, title: 'Arrival and orientation', city: form.destinations.split(',')[0]?.trim() || 'First stop', activities: ['Check in', 'Neighborhood walk'], notes: 'Add details from the trip page.' }],
    };
    const created = await createTrip(trip, user.uid);
    setToast('Trip saved to your planner');
    setTimeout(() => navigate(`/trips/${created.id}`), 650);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6"><p className="font-bold text-cyan-600">Create trip</p><h1 className="text-4xl font-black">Map the first version of your plan.</h1></div>
      <form onSubmit={submit} className="glass-card rounded-[2rem] p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2"><span className="label">Trip name *</span><input className="input mt-2" value={form.name} onChange={update('name')} placeholder="Mediterranean launch week" /></label>
          <label className="block"><span className="label">Start date *</span><input type="date" className="input mt-2" value={form.startDate} onChange={update('startDate')} /></label>
          <label className="block"><span className="label">End date *</span><input type="date" className="input mt-2" value={form.endDate} onChange={update('endDate')} /></label>
          <label className="block md:col-span-2"><span className="label">Destination cities *</span><input className="input mt-2" value={form.destinations} onChange={update('destinations')} placeholder="Barcelona, Lisbon, Porto" /></label>
          <label className="block"><span className="label">Estimated budget *</span><input type="number" min="0" className="input mt-2" value={form.budget} onChange={update('budget')} placeholder="4200" /></label>
          <label className="block md:col-span-2"><span className="label">Trip description</span><textarea className="input mt-2 min-h-32" value={form.description} onChange={update('description')} placeholder="What makes this trip special?" /></label>
        </div>
        {error && <p className="mt-5 rounded-2xl bg-rose-50 p-3 text-sm text-rose-600 dark:bg-rose-950">{error}</p>}
        <button className="btn-primary mt-6"><Save className="h-4 w-4" /> Save trip</button>
      </form>
      <Toast message={toast} />
    </div>
  );
}
