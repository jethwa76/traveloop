export default function ChartSection({ title, subtitle, action, children }) {
  return (
    <section className="app-card p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">{title}</h2>
          {subtitle ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
        </div>
        {action}
      </div>
      <div className="mt-6 h-72 min-h-72">{children}</div>
    </section>
  );
}
