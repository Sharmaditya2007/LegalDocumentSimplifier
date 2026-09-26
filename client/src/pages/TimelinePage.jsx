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
  Sparkles,
  Zap,
  ShieldCheck
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
        if (res.data?.success) {
          setTimeline(res.data.timeline || []);
        } else {
          setTimeline([]);
        }
      })
      .catch(() => {
        setTimeline([]);
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
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amberAccent-400">
            <CalendarClock className="w-4 h-4" />
            <span>Deadlines & Milestones</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mt-0.5">
            Contract Timeline Sentinel
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Track notice windows, expiration dates, and payment milestones across all active contracts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-obsidian-900 border border-white/10 text-xs self-start sm:self-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              categoryFilter === 'all' ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Dates
          </button>
          <button
            onClick={() => setCategoryFilter('Renewal')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              categoryFilter === 'Renewal' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Renewals
          </button>
          <button
            onClick={() => setCategoryFilter('Payment')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              categoryFilter === 'Payment' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Payments
          </button>
          <button
            onClick={() => setCategoryFilter('Expiration')}
            className={`px-3.5 py-1.5 rounded-xl font-medium transition-all ${
              categoryFilter === 'Expiration' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold' : 'text-slate-400 hover:text-white'
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
        <div className="glass-panel rounded-3xl p-14 text-center border border-white/10 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-slate-400 flex items-center justify-center mx-auto mb-3.5">
            <CalendarIcon className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">No deadlines found</h3>
          <p className="text-xs text-slate-400 mt-1 font-sans">Upload or load contracts to populate your deadline sentinel.</p>
        </div>
      ) : (
        <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl">
          <div className="relative border-l-2 border-amberAccent-500/30 ml-4 space-y-9 pb-4">
            {filteredTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                
                {/* Glowing Node */}
                <div
                  className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 border-obsidian-950 shadow-sm ${
                    item.urgency === 'High'
                      ? 'bg-rose-500 animate-pulse shadow-[0_0_10px_rgba(244,63,94,0.8)]'
                      : item.urgency === 'Medium'
                      ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]'
                      : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]'
                  }`}
                />

                <div className="card-3d p-6 rounded-3xl bg-obsidian-950/90 border border-white/10 hover:border-amberAccent-500/40 transition-all shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-amberAccent-400">
                        {item.date}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          item.urgency === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : item.urgency === 'Medium'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {item.urgency} Urgency
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/5 border border-white/10 text-slate-300 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <Link
                      to={`/documents/${item.documentId}`}
                      className="text-xs text-amberAccent-400 font-semibold hover:underline flex items-center gap-1 font-mono"
                    >
                      <span className="truncate max-w-[220px]">{item.documentTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>

                  <h3 className="text-base font-bold text-white font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed font-sans">
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
