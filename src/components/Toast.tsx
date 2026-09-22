import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-lg border flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-bottom-2 ${
            t.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : t.type === 'info'
              ? 'bg-sky-50 border-sky-200 text-sky-900'
              : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}
        >
          {t.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          ) : t.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#006A4E] shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs">
            <div className="font-bold text-sm leading-tight">{t.title}</div>
            {t.description && <div className="mt-1 opacity-90">{t.description}</div>}
          </div>

          <button
            onClick={() => onDismiss(t.id)}
            className="p-1 rounded-md hover:bg-black/5 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
