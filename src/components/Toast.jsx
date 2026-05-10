import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-glow">
          <CheckCircle2 className="h-5 w-5 text-cyan-300" /> {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
