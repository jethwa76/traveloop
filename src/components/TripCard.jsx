import { motion } from 'framer-motion';
import { Calendar, MapPin, Trash2, Pencil, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDateRange } from '../utils/tripUtils';

export default function TripCard({ trip, onDelete, editable = true }) {
  return (
    <motion.article whileHover={{ y: -6 }} className="glass-card overflow-hidden rounded-3xl">
      <Link to={`/trips/${trip.id}`} className="block">
        <img src={trip.cover || `https://source.unsplash.com/1200x800/?${encodeURIComponent(trip.destinations?.[0] || 'travel')}`} alt="" className="h-44 w-full object-cover" />
      </Link>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-bold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">{trip.status || 'Planning'}</span>
          <span className="text-sm font-bold text-slate-500">{formatCurrency(trip.budget)}</span>
        </div>
        <Link to={`/trips/${trip.id}`}><h3 className="text-xl font-extrabold hover:text-cyan-600">{trip.name}</h3></Link>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">{trip.description}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{trip.destinations?.join(' • ') || 'Destinations TBD'}</p>
          <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formatDateRange(trip.startDate, trip.endDate)}</p>
        </div>
        {editable && (
          <div className="mt-5 flex gap-2">
            <Link to={`/trips/${trip.id}?edit=true`} className="btn-secondary flex-1 px-3 py-2"><Pencil className="h-4 w-4" /> Edit</Link>
            <Link to={`/share/${trip.id}`} className="btn-secondary px-3 py-2" aria-label="Share"><Share2 className="h-4 w-4" /></Link>
            <button onClick={() => onDelete?.(trip.id)} className="rounded-2xl border border-rose-100 px-3 text-rose-500 hover:bg-rose-50 dark:border-rose-900 dark:hover:bg-rose-950" aria-label="Delete trip"><Trash2 className="h-4 w-4" /></button>
          </div>
        )}
      </div>
    </motion.article>
  );
}
