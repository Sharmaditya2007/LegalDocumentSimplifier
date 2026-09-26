import React from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Flame } from 'lucide-react';

const RiskBadge = ({ level = 'low', score = null, size = 'md', showIcon = true }) => {
  const normLevel = (level || 'low').toLowerCase();

  const config = {
    critical: {
      bg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      dot: 'bg-rose-400',
      icon: Flame,
      label: 'Critical Risk',
    },
    high: {
      bg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      dot: 'bg-rose-400',
      icon: ShieldAlert,
      label: 'High Risk',
    },
    medium: {
      bg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
      dot: 'bg-amber-400',
      icon: AlertTriangle,
      label: 'Medium Risk',
    },
    low: {
      bg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
      dot: 'bg-emerald-400',
      icon: ShieldCheck,
      label: 'Low Risk',
    }
  };

  const item = config[normLevel] || config.low;
  const Icon = item.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-4 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-xl transition-all select-none ${item.bg} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className="w-1.5 h-1.5 rounded-full relative">
        <span className={`inline-block rounded-full h-1.5 w-1.5 ${item.dot}`} />
      </span>
      {showIcon && <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{item.label}</span>
      {score !== null && (
        <span className="opacity-80 text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-white/10">
          {score}/100
        </span>
      )}
    </span>
  );
};

export default RiskBadge;
