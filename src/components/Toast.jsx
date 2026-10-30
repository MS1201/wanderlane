import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-md">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold text-white transition-all transform animate-fade-in ${
              isSuccess
                ? 'bg-slate-900/95 border border-emerald-500/40 text-emerald-100 backdrop-blur-md'
                : isError
                ? 'bg-rose-900/95 border border-rose-500/40 text-white backdrop-blur-md'
                : 'bg-slate-900/95 border border-slate-700/60 text-slate-100 backdrop-blur-md'
            }`}
          >
            {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
            {isError && <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
            {!isSuccess && !isError && <Info className="w-4 h-4 text-brand-400 flex-shrink-0" />}
            <span>{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
}

