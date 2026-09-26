import React from 'react';
import { ArrowUpRight, ArrowDownRight, Sparkles } from 'lucide-react';
import Card3DTilt from '../3d/Card3DTilt';

const StatCard = ({ title, value, change, changeType = 'positive', icon: Icon, color = 'brand', subtitle }) => {
  const colorMap = {
    brand: {
      iconBg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.25)]',
      glow: 'from-indigo-500/10',
      borderHover: 'hover:border-indigo-500/40',
      accent: 'text-indigo-400'
    },
    rose: {
      iconBg: 'bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.25)]',
      glow: 'from-rose-500/10',
      borderHover: 'hover:border-rose-500/40',
      accent: 'text-rose-400'
    },
    amber: {
      iconBg: 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]',
      glow: 'from-amber-500/10',
      borderHover: 'hover:border-amber-500/40',
      accent: 'text-amber-400'
    },
    emerald: {
      iconBg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]',
      glow: 'from-emerald-500/10',
      borderHover: 'hover:border-emerald-500/40',
      accent: 'text-emerald-400'
    },
    indigo: {
      iconBg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(0,210,255,0.25)]',
      glow: 'from-cyan-500/10',
      borderHover: 'hover:border-cyan-500/40',
      accent: 'text-cyan-400'
    },
  };

  const scheme = colorMap[color] || colorMap.brand;

  return (
    <Card3DTilt maxTilt={10} scale={1.02} className="h-full">
      <div className={`glass-card rounded-2xl p-5 relative overflow-hidden group border border-white/10 ${scheme.borderHover} h-full flex flex-col justify-between`}>
        {/* Background Ambient Glow Gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${scheme.glow} to-transparent blur-2xl rounded-full pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />
        
        <div>
          {/* Top Bar with Title and Icon */}
          <div className="flex items-center justify-between relative z-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-300 transition-colors">
              {title}
            </span>
            {Icon && (
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 ${scheme.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Main Metric Value & Trend */}
          <div className="mt-3.5 flex items-baseline gap-2.5 relative z-10">
            <span className="text-3xl font-extrabold tracking-tight text-white font-mono">
              {value}
            </span>
            {change && (
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  changeType === 'positive'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.15)]'
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

        {/* Subtitle / Context */}
        {subtitle && (
          <p className="mt-2 text-xs text-slate-400 relative z-10 leading-relaxed font-sans">{subtitle}</p>
        )}

        {/* 3D bottom edge accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-amberAccent-500/40 transition-colors" />
      </div>
    </Card3DTilt>
  );
};

export default StatCard;
