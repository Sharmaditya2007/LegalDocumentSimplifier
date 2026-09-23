import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, color = 'brand', subtitle }) => {
  const colorMap = {
    brand: 'text-brand-500 bg-brand-500/10 dark:text-brand-400 dark:bg-brand-500/15',
    rose: 'text-rose-500 bg-rose-500/10 dark:text-rose-400 dark:bg-rose-500/15',
    amber: 'text-amber-500 bg-amber-500/10 dark:text-amber-400 dark:bg-amber-500/15',
    emerald: 'text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-500/15',
    indigo: 'text-indigo-500 bg-indigo-500/10 dark:text-indigo-400 dark:bg-indigo-500/15',
  };

  return (
    <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${colorMap[color] || colorMap.brand}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
          {value}
        </span>
        {change && (
          <span
            className={`inline-flex items-center text-xs font-medium ${
              changeType === 'positive'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400'
            }`}
          >
            {changeType === 'positive' ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
      )}

      {/* Subtle background glow */}
      <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-brand-500/5 blur-2xl pointer-events-none" />
    </div>
  );
};

export default StatCard;
