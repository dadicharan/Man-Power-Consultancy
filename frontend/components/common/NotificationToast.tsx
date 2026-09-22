import React from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationToast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />;
      default:
        return <Info className="w-5 h-5 text-blue-400 shrink-0" />;
    }
  };

  const getBg = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-[#04111F] border-emerald-500/50 text-white';
      case 'error':
        return 'bg-[#04111F] border-red-500/50 text-white';
      default:
        return 'bg-[#04111F] border-blue-500/50 text-white';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-short max-w-sm w-full">
      <div className={`p-4 rounded-xl shadow-2xl border flex items-center gap-3 ${getBg()}`}>
        {getIcon()}
        <span className="text-xs font-semibold flex-1 leading-snug">
          {toast.message}
        </span>
      </div>
    </div>
  );
};
