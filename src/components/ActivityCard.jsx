import { Clock, MapPinned } from 'lucide-react';

export default function ActivityCard({ activity, city }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="font-semibold">{activity}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Flexible</span>
        <span className="flex items-center gap-1"><MapPinned className="h-3.5 w-3.5" /> {city}</span>
      </div>
    </div>
  );
}
