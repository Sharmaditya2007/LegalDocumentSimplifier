import React from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, Info } from 'lucide-react';

const RiskBadge = ({ level = 'low', score = null, size = 'md', showIcon = true }) => {
  const normLevel = (level || 'low').toLowerCase();

  const config = {
    critical: {
      bg: 'bg-rose-500/15 text-rose-500 border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400',
      dot: 'bg-rose-500',
      icon: ShieldAlert,
      label: 'Critical Risk',
    },
    high: {
      bg: 'bg-rose-500/15 text-rose-500 border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400',
      dot: 'bg-rose-500',
      icon: ShieldAlert,
      label: 'High Risk',
    },
    medium: {
      bg: 'bg-amber-500/15 text-amber-600 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400',
      dot: 'bg-amber-500',
      icon: AlertTriangle,
      label: 'Medium Risk',
    },
    low: {
      bg: 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400',
      dot: 'bg-emerald-500',
      icon: ShieldCheck,
      label: 'Low Risk',
    }
  };

  const item = config[normLevel] || config.low;
  const Icon = item.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold border transition-colors ${item.bg} ${sizeClasses[size] || sizeClasses.md}`}
    >
      {showIcon && <Icon className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />}
      <span>{item.label}</span>
      {score !== null && (
        <span className="opacity-80 font-mono text-[11px]">({score}/100)</span>
      )}
    </span>
  );
};

export default RiskBadge;
