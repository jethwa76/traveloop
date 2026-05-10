export default function LoadingSpinner({ label = 'Loading your travel loop...' }) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center gap-4 text-slate-500">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-100 border-t-cyan-500" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
