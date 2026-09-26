import React from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Flame } from 'lucide-react';

const RiskBadge = ({ level = 'low', score = null, size = 'md', showIcon = true }) => {
  const normLevel = (level || 'low').toLowerCase();

  const config = {
    critical: {
      bg: 'bg-rose-500/15 text-rose-300 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
      dot: 'bg-rose-400',
      icon: Flame,
      label: 'Critical Risk',
    },
    high: {
      bg: 'bg-rose-500/15 text-rose-300 border-rose-500/35 shadow-[0_0_12px_rgba(244,63,94,0.2)]',
      dot: 'bg-rose-400',
      icon: ShieldAlert,
      label: 'High Risk',
    },
    medium: {
      bg: 'bg-amber-500/15 text-amber-300 border-amber-500/35 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      dot: 'bg-amber-400',
      icon: AlertTriangle,
      label: 'Medium Risk',
    },
    low: {
      bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
      dot: 'bg-emerald-400',
      icon: ShieldCheck,
      label: 'Low Risk',
    }
  };

  const item = config[normLevel] || config.low;
  const Icon = item.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1 font-mono',
    md: 'text-xs px-3 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-4 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-105 select-none ${item.bg} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className="flex h-1.5 w-1.5 relative">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${item.dot}`} />
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${item.dot}`} />
      </span>
      {showIcon && <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{item.label}</span>
      {score !== null && (
        <span className="opacity-90 font-mono text-[10px] ml-0.5 px-1.5 py-0.2 rounded bg-white/10">
          {score}/100
        </span>
      )}
    </span>
  );
};

export default RiskBadge;
