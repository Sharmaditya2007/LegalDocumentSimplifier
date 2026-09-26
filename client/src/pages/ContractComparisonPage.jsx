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
  Zap,
  Layers,
  Scale,
  Check
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { MOCK_DOCUMENTS, MOCK_COMPARISONS } from '../services/mockData';

const ContractComparisonPage = () => {
  const [searchParams] = useSearchParams();
  const { addToast } = useNotification();

  const [documents, setDocuments] = useState(MOCK_DOCUMENTS);
  const [docAId, setDocAId] = useState(searchParams.get('docA') || MOCK_DOCUMENTS[0]?._id || '');
  const [docBId, setDocBId] = useState(searchParams.get('docB') || MOCK_DOCUMENTS[1]?._id || '');
  const [comparison, setComparison] = useState(MOCK_COMPARISONS[0]);
  const [comparisonsList, setComparisonsList] = useState(MOCK_COMPARISONS);
  const [loading, setLoading] = useState(false);
  const [filterType, setFilterType] = useState('all'); // 'all', 'added', 'modified', 'critical_risk'

  useEffect(() => {
    // Fetch available documents
    api.get('/documents')
      .then(res => {
        if (res.data?.success && res.data.documents?.length > 0) {
          setDocuments(res.data.documents);
        }
      })
      .catch(() => {});

    // Fetch existing comparisons
    api.get('/comparisons')
      .then(res => {
        if (res.data?.success && res.data.comparisons?.length > 0) {
          setComparisonsList(res.data.comparisons);
          if (!searchParams.get('docA')) {
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
      addToast({ title: 'Sample Comparison Loaded', message: 'Viewing Executive Employment Agreement v1 vs v2 revision.', type: 'info' });
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans page-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
            <GitCompare className="w-4 h-4" />
            <span>AI Semantic Diff Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mt-0.5">
            Contract Version Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Compare revisions, negotiate redlines, and detect newly slipped liabilities or sneaky alterations.
          </p>
        </div>

        <button
          onClick={handleLoadDemoComparison}
          className="px-4 py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 text-xs font-semibold flex items-center gap-2 transition-all self-start sm:self-auto shadow-sm hover:scale-105"
        >
          <Zap className="w-4 h-4 text-purple-400" />
          <span>Load Demo Comparison (v1 vs v2)</span>
        </button>
      </div>

      {/* Contract Selector Box */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          
          {/* Document A Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Contract A (Baseline / Prior Version)
            </label>
            <select
              value={docAId}
              onChange={(e) => setDocAId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-obsidian-950 text-white text-xs font-medium focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
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
          <div className="text-center flex justify-center items-center pt-2 md:pt-6">
            <div className="w-11 h-11 rounded-2xl bg-obsidian-900 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold font-mono text-xs shadow-[0_0_20px_rgba(155,81,224,0.2)]">
              VS
            </div>
          </div>

          {/* Document B Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
              Contract B (Revised / Counterparty Markup)
            </label>
            <select
              value={docBId}
              onChange={(e) => setDocBId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-obsidian-950 text-white text-xs font-medium focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30"
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
            className="w-full sm:w-auto px-7 py-3 rounded-xl btn-glow-gold text-obsidian-950 font-bold text-xs shadow-glow-amber transition-all flex items-center justify-center gap-2 hover:scale-105"
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
        <div className="space-y-6 page-fade-in">
          
          {/* Executive Diff Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-gradient-to-b from-purple-950/20 via-obsidian-950 to-obsidian-950 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              Diff Engine Analysis
            </div>
            <h3 className="text-xl font-bold text-white font-heading">
              {comparison.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans">
              {comparison.summary}
            </p>

            {/* Key Metrics Strip */}
            {comparison.keyMetrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10 text-center">
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Clauses Added</span>
                  <p className="text-2xl font-bold font-mono text-purple-400 mt-1">
                    +{comparison.keyMetrics.clausesAdded}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Clauses Removed</span>
                  <p className="text-2xl font-bold font-mono text-slate-300 mt-1">
                    -{comparison.keyMetrics.clausesRemoved}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Clauses Modified</span>
                  <p className="text-2xl font-bold font-mono text-amber-400 mt-1">
                    {comparison.keyMetrics.clausesModified}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10">
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400">Risk Delta</span>
                  <p className="text-xs font-bold font-mono text-rose-400 mt-2">
                    {comparison.keyMetrics.riskScoreShift}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="text-base font-bold text-white font-heading">
              Identified Structural Changes ({filteredDifferences.length})
            </h4>

            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-obsidian-900 border border-white/10 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'all' ? 'bg-amberAccent-500 text-obsidian-950 font-bold shadow-glow-amber' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Changes
              </button>
              <button
                onClick={() => setFilterType('critical_risk')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'critical_risk' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                High Risk Diffs
              </button>
              <button
                onClick={() => setFilterType('added')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'added' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Added Clauses
              </button>
              <button
                onClick={() => setFilterType('modified')}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  filterType === 'modified' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
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
                className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl card-3d"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        diff.type === 'added'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : diff.type === 'removed'
                          ? 'bg-slate-700/50 text-slate-300 border border-slate-700'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {diff.type}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400">
                      {diff.category}
                    </span>
                  </div>

                  {diff.impact === 'critical_risk' && (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                      Critical Risk Slipped
                    </span>
                  )}
                  {diff.impact === 'positive' && (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Favorable Shift
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold text-white font-heading">
                  {diff.title}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Contract A Box */}
                  <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {comparison.docATitle || 'Contract A'}
                    </span>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed">
                      {diff.docAText || '(No equivalent clause present)'}
                    </p>
                  </div>

                  {/* Contract B Box */}
                  <div
                    className={`p-4 rounded-2xl border ${
                      diff.impact === 'critical_risk'
                        ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                        : diff.impact === 'positive'
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      {comparison.docBTitle || 'Contract B (Updated)'}
                    </span>
                    <p className="text-xs font-mono leading-relaxed font-semibold">
                      {diff.docBText}
                    </p>
                  </div>
                </div>

                {/* AI Semantic Legal Impact */}
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amberAccent-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    <strong className="font-semibold text-white">Legal Analysis: </strong>
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
