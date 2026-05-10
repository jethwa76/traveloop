import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export default function EmptyState({ title = 'No trips yet', description = 'Create your first travel plan and start mapping the details.', action = '/trips/new' }) {
  return (
    <div className="glass-card rounded-3xl p-10 text-center">
      <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-3xl bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200">
        <PlusCircle />
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{description}</p>
      <Link to={action} className="btn-primary mt-6">Create trip</Link>
    </div>
  );
}
