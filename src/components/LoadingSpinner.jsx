import { Loader2 } from "lucide-react";

export default function LoadingSpinner({ label = "Loading" }) {
  return (
    <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
      <Loader2 className="h-5 w-5 animate-spin text-brand-sky" />
      <span>{label}</span>
    </div>
  );
}
