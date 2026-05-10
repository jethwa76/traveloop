import ActivityCard from './ActivityCard';

export default function TimelineCard({ item }) {
  return (
    <div className="relative pl-9">
      <div className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full bg-cyan-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/30">{item.day}</div>
      <div className="glass-card rounded-3xl p-5">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-600">Day {item.day} • {item.city}</p>
        <h3 className="mt-1 text-xl font-extrabold">{item.title}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {item.activities?.map((activity) => <ActivityCard key={activity} activity={activity} city={item.city} />)}
        </div>
        {item.notes && <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500 dark:bg-slate-950">Note: {item.notes}</p>}
      </div>
    </div>
  );
}
