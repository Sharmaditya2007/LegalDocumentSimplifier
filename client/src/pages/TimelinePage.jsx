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
import { MOCK_DOCUMENTS } from '../services/mockData';

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'Payment', 'Renewal Notice', 'Expiration'

  useEffect(() => {
    // Generate fallback timeline items from mock docs
    const mockDates = [];
    MOCK_DOCUMENTS.forEach(doc => {
      if (doc.keyDates) {
        doc.keyDates.forEach((kd, idx) => {
          mockDates.push({
            id: `${doc._id}_${idx}`,
            docId: doc._id,
            docTitle: doc.originalName,
            contractType: doc.contractType,
            date: kd.date,
            description: kd.description,
            category: kd.category,
            impact: kd.impact
          });
        });
      }
    });

    api.get('/documents/timeline/all')
      .then(res => {
        if (res.data?.success && res.data.timeline?.length > 0) {
          setTimeline(res.data.timeline);
        } else {
          setTimeline(mockDates);
        }
      })
      .catch(() => {
        setTimeline(mockDates);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredTimeline = timeline.filter(t => {
    if (categoryFilter === 'all') return true;
    return (t.category || '').toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans page-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amberAccent-400 font-mono">
            <CalendarClock className="w-3.5 h-3.5" />
            <span>Deadlines & Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading mt-0.5">
            Contract Timeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track notice windows, expiration dates, and payment deadlines.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-obsidian-900 border border-slate-800 text-xs self-start sm:self-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'all' ? 'bg-brand-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Dates
          </button>
          <button
            onClick={() => setCategoryFilter('Renewal')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'Renewal' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Renewals
          </button>
          <button
            onClick={() => setCategoryFilter('Payment')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'Payment' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setCategoryFilter('Expiration')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              categoryFilter === 'Expiration' ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'text-slate-400 hover:text-white'
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
        <div className="glass-panel rounded-3xl p-12 text-center border border-slate-800 shadow-2xl">
          <CalendarIcon className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white font-heading">No deadlines found</h3>
          <p className="text-xs text-slate-400 mt-1">Upload or load contracts to populate your deadline sentinel.</p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          <div className="relative border-l-2 border-brand-500/30 ml-4 space-y-10 pb-4">
            {filteredTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                {/* Glowing Node */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-obsidian-950 shadow-sm ${
                    item.urgency === 'High'
                      ? 'bg-rose-500 animate-pulse'
                      : item.urgency === 'Medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />

                <div className="p-5 rounded-2xl bg-obsidian-950 border border-slate-800 hover:border-brand-500/40 transition-all shadow-lg">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-brand-400">
                        {item.date}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.urgency === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.urgency === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.urgency} Urgency
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-obsidian-900 border border-slate-800 text-slate-300 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <Link
                      to={`/documents/${item.documentId}`}
                      className="text-xs text-brand-400 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span className="truncate max-w-[200px]">{item.documentTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
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
