import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  GitCompare,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Download,
  Zap
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';

const ContractComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useNotification();

  const [documents, setDocuments] = useState([]);
  const [docAId, setDocAId] = useState(searchParams.get('docA') || '');
  const [docBId, setDocBId] = useState(searchParams.get('docB') || '');
  const [comparison, setComparison] = useState(null);
  const [comparisonsList, setComparisonsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'added', 'modified', 'critical_risk'

  useEffect(() => {
    // Fetch available documents
    api.get('/documents')
      .then(res => {
        if (res.data.success) {
          setDocuments(res.data.documents || []);
        }
      })
      .catch(() => {});

    // Fetch existing comparisons
    api.get('/comparisons')
      .then(res => {
        if (res.data.success && res.data.comparisons.length > 0) {
          setComparisonsList(res.data.comparisons);
          // Set default to first comparison if no params
          if (!searchParams.get('docA') && !comparison) {
            setComparison(res.data.comparisons[0]);
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleRunComparison = async () => {
    if (!docAId || !docBId) {
      addToast({ title: 'Select Contracts', message: 'Please select both Contract A and Contract B to compare.', type: 'warning' });
      return;
    }

    if (docAId === docBId) {
      addToast({ title: 'Invalid Selection', message: 'Please select two different contracts.', type: 'warning' });
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/comparisons', { docAId, docBId });
      if (res.data.success) {
        setComparison(res.data.comparison);
        addToast({ title: 'Comparison Completed', message: 'Side-by-side diff generated successfully.', type: 'success' });
      }
    } catch (err) {
      addToast({ title: 'Comparison Failed', message: err.response?.data?.message || 'Error running comparison.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLoadDemoComparison = () => {
    if (comparisonsList.length > 0) {
      setComparison(comparisonsList[0]);
      addToast({ title: 'Demo Comparison Loaded', message: 'Viewing Zenith Employment v1 vs v2 revision.', type: 'info' });
    }
  };

  const differences = comparison?.differences || [];
  const filteredDifferences = differences.filter(d => {
    if (filterType === 'all') return true;
    if (filterType === 'added') return d.type === 'added';
    if (filterType === 'modified') return d.type === 'modified';
    if (filterType === 'critical_risk') return d.impact === 'critical_risk' || d.impact === 'high_risk';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
            <GitCompare className="w-4 h-4" />
            <span>AI Semantic Diff Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            Contract Version Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Compare revisions, negotiate redlines, and detect newly slipped liabilities or non-competes.
          </p>
        </div>

        <button
          onClick={handleLoadDemoComparison}
          className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <Zap className="w-4 h-4 text-purple-500" />
          <span>Load Demo Comparison (v1 vs v2)</span>
        </button>
      </div>

      {/* Contract Selector Box */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* Document A Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Contract A (Baseline / Prior Version)
            </label>
            <select
              value={docAId}
              onChange={(e) => setDocAId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select Contract A...</option>
              {documents.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.title} ({d.riskLevel?.toUpperCase()} RISK)
                </option>
              ))}
            </select>
          </div>

          {/* Versus Icon */}
          <div className="text-center flex justify-center items-center pt-4 md:pt-0">
            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold font-mono text-xs">
              VS
            </div>
          </div>

          {/* Document B Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Contract B (Revised / Counterparty Markup)
            </label>
            <select
              value={docBId}
              onChange={(e) => setDocBId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select Contract B...</option>
              {documents.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.title} ({d.riskLevel?.toUpperCase()} RISK)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleRunComparison}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <GitCompare className="w-4 h-4" />
                <span>Run Semantic Comparison</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comparison Results */}
      {comparison && (
        <div className="space-y-6 animate-fade-in">
          {/* Executive Diff Banner */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-purple-500/[0.02]">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {comparison.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {comparison.summary}
            </p>

            {/* Key Metrics Strip */}
            {comparison.keyMetrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Clauses Added</span>
                  <p className="text-xl font-bold font-mono text-purple-600 dark:text-purple-400">
                    +{comparison.keyMetrics.clausesAdded}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Clauses Removed</span>
                  <p className="text-xl font-bold font-mono text-slate-600 dark:text-slate-300">
                    -{comparison.keyMetrics.clausesRemoved}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Clauses Modified</span>
                  <p className="text-xl font-bold font-mono text-amber-500">
                    {comparison.keyMetrics.clausesModified}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Risk Delta</span>
                  <p className="text-xs font-bold font-mono text-rose-500 mt-1">
                    {comparison.keyMetrics.riskScoreShift}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Identified Structural Changes ({filteredDifferences.length})
            </h4>

            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'all' ? 'bg-white dark:bg-navy-950 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                All Changes
              </button>
              <button
                onClick={() => setFilterType('critical_risk')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'critical_risk' ? 'bg-rose-500/20 text-rose-500 shadow-sm' : 'text-slate-500'
                }`}
              >
                High Risk Diffs
              </button>
              <button
                onClick={() => setFilterType('added')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'added' ? 'bg-purple-500/20 text-purple-400 shadow-sm' : 'text-slate-500'
                }`}
              >
                Added Clauses
              </button>
              <button
                onClick={() => setFilterType('modified')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === 'modified' ? 'bg-amber-500/20 text-amber-400 shadow-sm' : 'text-slate-500'
                }`}
              >
                Modified Terms
              </button>
            </div>
          </div>

          {/* Side-by-Side Clause Alignment Cards */}
          <div className="space-y-5">
            {filteredDifferences.map((diff, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        diff.type === 'added'
                          ? 'bg-purple-500/20 text-purple-400'
                          : diff.type === 'removed'
                          ? 'bg-slate-500/20 text-slate-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {diff.type}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {diff.category}
                    </span>
                  </div>

                  {diff.impact === 'critical_risk' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30">
                      Critical Risk Slipped
                    </span>
                  )}
                  {diff.impact === 'positive' && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Favorable Shift
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  {diff.title}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Contract A Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {comparison.docATitle || 'Contract A'}
                    </span>
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
                      {diff.docAText || '(No equivalent clause present)'}
                    </p>
                  </div>

                  {/* Contract B Box */}
                  <div
                    className={`p-4 rounded-2xl border ${
                      diff.impact === 'critical_risk'
                        ? 'bg-rose-500/[0.04] border-rose-500/30 text-rose-100'
                        : diff.impact === 'positive'
                        ? 'bg-emerald-500/[0.04] border-emerald-500/30 text-emerald-100'
                        : 'bg-amber-500/[0.04] border-amber-500/30'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {comparison.docBTitle || 'Contract B (Updated)'}
                    </span>
                    <p className="text-xs font-mono text-slate-800 dark:text-slate-100 leading-relaxed font-semibold">
                      {diff.docBText}
                    </p>
                  </div>
                </div>

                {/* AI Semantic Legal Impact */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Legal Analysis: </span>
                    {diff.analysis}
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

export default ContractComparisonPage;
