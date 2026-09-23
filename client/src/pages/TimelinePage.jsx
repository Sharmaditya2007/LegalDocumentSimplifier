import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  Clock,
  ArrowRight,
  FileText,
  AlertCircle,
  Filter,
  Calendar as CalendarIcon,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import api from '../services/api';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'Payment', 'Renewal Notice', 'Expiration'

  useEffect(() => {
    api.get('/documents/timeline/all')
      .then(res => {
        if (res.data.success) {
          setTimeline(res.data.timeline || []);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredTimeline = timeline.filter(t => {
    if (categoryFilter === 'all') return true;
    return (t.category || '').toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            <CalendarClock className="w-4 h-4" />
            <span>Obligation & Deadline Sentinel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Contract Deadlines & Milestone Timeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Aggregated cross-contract timeline to prevent missed non-renewal windows and unexpected renewals.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'all' ? 'bg-white dark:bg-navy-950 text-brand-500 shadow-sm' : 'text-slate-500'
            }`}
          >
            All Dates
          </button>
          <button
            onClick={() => setCategoryFilter('Renewal')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'Renewal' ? 'bg-rose-500/20 text-rose-500 shadow-sm' : 'text-slate-500'
            }`}
          >
            Renewals
          </button>
          <button
            onClick={() => setCategoryFilter('Payment')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'Payment' ? 'bg-amber-500/20 text-amber-500 shadow-sm' : 'text-slate-500'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setCategoryFilter('Expiration')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'Expiration' ? 'bg-indigo-500/20 text-indigo-400 shadow-sm' : 'text-slate-500'
            }`}
          >
            Expirations
          </button>
        </div>
      </div>

      {/* Timeline Stream */}
      {loading ? (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredTimeline.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
          <CalendarIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No deadlines found</h3>
          <p className="text-xs text-slate-400 mt-1">Upload or load contracts to populate your deadline sentinel.</p>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="relative border-l-2 border-brand-500/30 ml-4 space-y-10 pb-4">
            {filteredTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Glowing Node */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-white dark:border-navy-950 shadow-sm ${
                    item.urgency === 'High'
                      ? 'bg-rose-500 animate-pulse'
                      : item.urgency === 'Medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 hover:border-brand-500/40 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400">
                        {item.date}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.urgency === 'High'
                            ? 'bg-rose-500/20 text-rose-500'
                            : item.urgency === 'Medium'
                            ? 'bg-amber-500/20 text-amber-500'
                            : 'bg-emerald-500/20 text-emerald-500'
                        }`}
                      >
                        {item.urgency} Urgency
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <Link
                      to={`/documents/${item.documentId}`}
                      className="text-xs text-brand-600 dark:text-brand-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span className="truncate max-w-[200px]">{item.documentTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelinePage;
