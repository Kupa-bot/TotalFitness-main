import React from 'react';
import { useFitness } from '../context/FitnessContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, dismissToast } = useFitness();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let borderColor = 'border-slate-700';
        let bgColor = 'bg-slate-900/95';
        let icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;

        if (toast.type === 'success') {
          borderColor = 'border-amber-500/50';
          bgColor = 'bg-slate-900/95';
          icon = <CheckCircle2 className="w-5 h-5 text-accentgold shrink-0" />;
        } else if (toast.type === 'danger') {
          borderColor = 'border-red-500/60';
          bgColor = 'bg-red-950/90';
          icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
        } else if (toast.type === 'warning') {
          borderColor = 'border-amber-500/50';
          bgColor = 'bg-amber-950/80';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`toast-card pointer-events-auto flex items-start gap-3 p-3.5 rounded-2xl border ${borderColor} ${bgColor} text-white shadow-2xl backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3`}
          >
            {icon}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-slate-100 tracking-wide">{toast.title}</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
