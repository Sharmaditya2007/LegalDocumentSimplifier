import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GitCompare,
  Sparkles,
  RefreshCw,
  PlusCircle,
  MinusCircle,
  Zap
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
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
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    api.get('/documents')
      .then(res => {
        if (res.data?.success && res.data.documents?.length > 0) {
          setDocuments(res.data.documents);
        }
      })
      .catch(() => {});

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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Diff Engine
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-normal">
            Compare revisions side-by-side, negotiate redlines, and detect newly slipped liabilities or sneaky alterations.
          </p>
        </div>

        <button
          onClick={handleLoadDemoComparison}
          className="px-5 py-2.5 rounded-full btn-luxury-secondary text-xs font-medium flex items-center gap-2 self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5 text-slate-400" />
          <span>Load Demo Diff (v1 vs v2)</span>
        </button>
      </div>

      {/* Contract Selector Box */}
      <div className="glass-luxury rounded-3xl p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          
          {/* Document A Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Contract A (Baseline / Prior Version)
            </label>
            <select
              value={docAId}
              onChange={(e) => setDocAId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-white text-xs font-medium focus:outline-none focus:border-white/30"
            >
              <option value="" className="bg-[#0a0a10]">Select Contract A...</option>
              {documents.map((d) => (
                <option key={d._id} value={d._id} className="bg-[#0a0a10]">
                  {d.title} ({d.riskLevel?.toUpperCase()} RISK)
                </option>
              ))}
            </select>
          </div>

          {/* Versus Indicator */}
          <div className="text-center flex justify-center items-center pt-2 md:pt-6">
            <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 text-slate-300 flex items-center justify-center font-medium text-xs">
              vs
            </div>
          </div>

          {/* Document B Selector */}
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
              Contract B (Revised / Counterparty Markup)
            </label>
            <select
              value={docBId}
              onChange={(e) => setDocBId(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-white text-xs font-medium focus:outline-none focus:border-white/30"
            >
              <option value="" className="bg-[#0a0a10]">Select Contract B...</option>
              {documents.map((d) => (
                <option key={d._id} value={d._id} className="bg-[#0a0a10]">
                  {d.title} ({d.riskLevel?.toUpperCase()} RISK)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleRunComparison}
            disabled={loading}
            className="w-full sm:w-auto px-8 py-3 rounded-full btn-luxury-primary text-xs font-semibold flex items-center justify-center gap-2"
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
        <div className="space-y-6">
          
          {/* Executive Diff Banner */}
          <div className="glass-luxury rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Diff Engine Analysis
            </div>
            <h3 className="text-xl font-semibold text-white">
              {comparison.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
              {comparison.summary}
            </p>

            {/* Key Metrics Strip */}
            {comparison.keyMetrics && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/[0.06] text-center">
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Clauses Added</span>
                  <p className="text-2xl font-bold text-white mt-1">
                    +{comparison.keyMetrics.clausesAdded}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Clauses Removed</span>
                  <p className="text-2xl font-bold text-slate-400 mt-1">
                    -{comparison.keyMetrics.clausesRemoved}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Clauses Modified</span>
                  <p className="text-2xl font-bold text-amber-400 mt-1">
                    {comparison.keyMetrics.clausesModified}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Risk Delta</span>
                  <p className="text-xs font-semibold text-rose-400 mt-2">
                    {comparison.keyMetrics.riskScoreShift}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h4 className="text-base font-semibold text-white">
              Identified Structural Changes ({filteredDifferences.length})
            </h4>

            <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === 'all' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Changes
              </button>
              <button
                onClick={() => setFilterType('added')}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === 'added' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Added
              </button>
              <button
                onClick={() => setFilterType('modified')}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === 'modified' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Modified
              </button>
              <button
                onClick={() => setFilterType('critical_risk')}
                className={`px-4 py-1.5 rounded-full font-medium transition-all ${
                  filterType === 'critical_risk' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                High Risk
              </button>
            </div>
          </div>

          {/* Diff Cards List */}
          <div className="space-y-4">
            {filteredDifferences.map((diff, index) => (
              <div
                key={index}
                className="glass-luxury rounded-3xl p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${
                        diff.type === 'added'
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                          : diff.type === 'removed'
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      }`}
                    >
                      {diff.type === 'added' ? (
                        <PlusCircle className="w-3.5 h-3.5" />
                      ) : diff.type === 'removed' ? (
                        <MinusCircle className="w-3.5 h-3.5" />
                      ) : (
                        <GitCompare className="w-3.5 h-3.5" />
                      )}
                      <span className="capitalize">{diff.type}</span>
                    </span>

                    <span className="text-xs font-semibold text-white">
                      {diff.section}
                    </span>
                  </div>

                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${
                      diff.impact === 'critical_risk' || diff.impact === 'high_risk'
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/20 font-medium'
                        : 'bg-white/[0.03] text-slate-400 border-white/[0.06]'
                    }`}
                  >
                    {diff.impact === 'critical_risk' ? 'Critical Risk' : diff.impact === 'high_risk' ? 'High Risk' : 'Moderate'}
                  </span>
                </div>

                <h4 className="text-base font-semibold text-white mb-4">
                  {diff.title}
                </h4>

                {/* Side-by-side Clause Diff Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Baseline Text */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[11px] uppercase font-medium text-slate-400 block mb-2">
                      Original Clause (Contract A)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {diff.textA || '(Clause did not exist in Baseline)'}
                    </p>
                  </div>

                  {/* Revised Text */}
                  <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[11px] uppercase font-medium text-slate-300 block mb-2">
                      Revised Clause (Contract B)
                    </span>
                    <p className="text-xs text-slate-100 leading-relaxed font-normal">
                      {diff.textB || '(Clause removed in Markup)'}
                    </p>
                  </div>
                </div>

                {/* AI Diff Assessment */}
                <div className="mt-4 p-4 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-indigo-300">AI Risk Assessment: </span>
                  {diff.analysis}
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
