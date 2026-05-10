export default function BudgetCard({ title, value, icon: Icon, accent = "bg-blue-50 text-brand-sky", caption }) {
  return (
    <div className="app-card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">{value}</p>
          {caption ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{caption}</p> : null}
        </div>
        {Icon ? (
          <span className={`flex h-11 w-11 flex-none items-center justify-center rounded-lg ${accent}`}>
            <Icon className="h-5 w-5" />
          </span>
        ) : null}
      </div>
    </div>
  );
}
