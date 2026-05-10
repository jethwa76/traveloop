import { ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../utils/tripUtils';

export default function BudgetCard({ label, amount, icon: Icon, tone = 'cyan' }) {
  const tones = {
    cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-200',
    rose: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-200',
    indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-200',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-200',
  };
  return (
    <div className="glass-card rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-glow">
      <div className="flex items-center justify-between">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${tones[tone]}`}><Icon className="h-5 w-5" /></div>
        <ArrowUpRight className="h-5 w-5 text-slate-400" />
      </div>
      <p className="mt-5 text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{formatCurrency(amount)}</p>
    </div>
  );
}
