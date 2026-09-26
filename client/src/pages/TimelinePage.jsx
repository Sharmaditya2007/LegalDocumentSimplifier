import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarClock,
  ArrowRight,
  FileText
} from 'lucide-react';
import api from '../services/api';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { MOCK_DOCUMENTS } from '../services/mockData';

const TimelinePage = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    const mockDates = [];
    MOCK_DOCUMENTS.forEach(doc => {
      if (doc.keyDates) {
        doc.keyDates.forEach((kd, idx) => {
          mockDates.push({
            id: `${doc._id}_${idx}`,
            docId: doc._id,
            docTitle: doc.title,
            contractType: doc.analysis?.contractType,
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
    <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Timeline
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-normal">
            Track notice windows, expiration dates, and payment milestones across all active contracts.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs self-start sm:self-auto">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              categoryFilter === 'all' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Dates
          </button>
          <button
            onClick={() => setCategoryFilter('Renewal')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              categoryFilter === 'Renewal' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Renewals
          </button>
          <button
            onClick={() => setCategoryFilter('Payment')}
            className={`px-4 py-1.5 rounded-full font-medium transition-all ${
              categoryFilter === 'Payment' ? 'bg-amber-500 text-black font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Payments
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
        <div className="glass-luxury rounded-3xl p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center mx-auto mb-4">
            <CalendarClock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No active deadlines detected</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Upload contracts with effective dates or notice provisions to populate your automated timeline.
          </p>
          <Link
            to="/documents"
            className="mt-6 px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold inline-flex items-center gap-2"
          >
            <span>Go to Vault</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="relative border-l border-white/10 ml-6 space-y-8 pb-10">
          {filteredTimeline.map((item, index) => (
            <div key={index} className="relative pl-8 group">
              {/* Timeline Indicator Dot */}
              <div
                className={`absolute -left-[7px] top-2 w-3 h-3 rounded-full ${
                  (item.impact || '').toLowerCase().includes('high') || (item.category || '').toLowerCase().includes('renewal')
                    ? 'bg-rose-500'
                    : 'bg-white'
                }`}
              />

              <div className="glass-luxury glass-luxury-hover rounded-3xl p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-semibold text-white">
                    {item.date}
                  </span>
                  <span
                    className={`px-3 py-0.5 rounded-full text-[11px] font-medium border ${
                      (item.category || '').toLowerCase().includes('renewal')
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        : 'bg-white/[0.03] text-slate-300 border-white/[0.06]'
                    }`}
                  >
                    {item.category || 'Milestone'}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white mb-1">
                  {item.title || item.docTitle}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {item.description}
                </p>

                {item.docId && (
                  <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.docTitle}</span>
                    </span>
                    <Link
                      to={`/documents/${item.docId}`}
                      className="text-xs font-semibold text-white hover:text-slate-300 flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;
