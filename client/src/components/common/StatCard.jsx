import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, subtitle }) => {
  return (
    <div className="glass-luxury glass-luxury-hover rounded-3xl p-6 flex flex-col justify-between h-full min-h-[160px] relative overflow-hidden">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">
            {title}
          </span>
          {Icon && (
            <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white">
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-3xl font-bold tracking-tight text-white">
            {value}
          </span>
          {change && (
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                changeType === 'positive'
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
              }`}
            >
              {changeType === 'positive' ? (
                <ArrowUpRight className="w-3 h-3 mr-0.5" />
              ) : (
                <ArrowDownRight className="w-3 h-3 mr-0.5" />
              )}
              {change}
            </span>
          )}
        </div>
      </div>

      {subtitle && (
        <p className="mt-3 text-xs text-slate-500 leading-relaxed font-normal">{subtitle}</p>
      )}
    </div>
  );
};

export default StatCard;
