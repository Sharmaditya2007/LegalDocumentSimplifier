import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  Calendar,
  MessageSquare,
  GitCompare,
  Download,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Building,
  HelpCircle,
  ExternalLink,
  Search,
  Scale
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary', 'risks', 'clauses', 'obligations', 'timeline', 'raw'
  const [rawSearch, setRawSearch] = useState('');

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await api.get(`/documents/${id}`);
        if (res.data.success) {
          setDocument(res.data.document);
        }
      } catch (err) {
        addToast({ title: 'Error', message: 'Could not load document analysis.', type: 'error' });
        navigate('/documents');
      } finally {
        setLoading(false);
      }
    };
    fetchDoc();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (!document) return null;

  const analysis = document.analysis || {};
  const risks = analysis.risks || [];
  const clauses = analysis.clauses || [];
  const obligations = analysis.obligations || [];
  const deadlines = analysis.deadlines || [];
  const score = document.overallRiskScore || 50;

  const handleDownload = () => {
    const apiBase = import.meta.env.VITE_API_URL || '/api';
    window.open(`${apiBase}/documents/${document._id}/download-report`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/documents"
            className="p-2.5 rounded-xl bg-obsidian-900 border border-slate-700/80 text-slate-400 hover:text-white hover:border-brand-500/50 transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-400 font-mono">
                {analysis.contractType || 'Legal Agreement'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">{document.fileName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mt-0.5">
              {document.title}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to={`/chat?doc=${document._id}`}
            className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Citation Copilot</span>
          </Link>

          <Link
            to={`/compare?docA=${document._id}`}
            className="px-3.5 py-2.5 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all hover:border-brand-500/40"
          >
            <GitCompare className="w-4 h-4 text-purple-400" />
            <span>Compare Revisions</span>
          </Link>

          <button
            onClick={handleDownload}
            className="px-3.5 py-2.5 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Audit PDF Report</span>
          </button>
        </div>
      </div>

      {/* High-Level Executive Risk Gauge & Metadata Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 grid grid-cols-1 md:grid-cols-4 gap-6 items-center shadow-2xl">
        {/* Risk Gauge */}
        <div className="md:col-span-1 flex flex-col items-center justify-center p-5 rounded-2xl bg-obsidian-950 border border-slate-800 text-center shadow-inner">
          <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-1">
            Overall Risk Rating
          </span>
          <div className="flex items-baseline gap-1 my-1">
            <span
              className={`text-4xl font-extrabold font-mono ${
                score >= 60 ? 'text-rose-400' : score >= 35 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {score}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <RiskBadge level={document.riskLevel} size="md" />

          {/* Mini progress bar */}
          <div className="w-full bg-obsidian-900 border border-slate-800 h-2.5 rounded-full overflow-hidden mt-3.5 p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                score >= 60 ? 'bg-rose-500' : score >= 35 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Metadata Details */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Parties Bound
            </span>
            <div className="space-y-1">
              {(analysis.parties || []).map((party, i) => (
                <div key={i} className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                  <span className="truncate">{party}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Key Dates
            </span>
            <div className="text-xs space-y-1 text-slate-300">
              <p><span className="text-slate-400">Effective:</span> {analysis.effectiveDate || 'Upon execution'}</p>
              <p><span className="text-slate-400">Expiration:</span> {analysis.expiryDate || 'Fixed term / At-will'}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Risk Sentinel Flags
            </span>
            <div className="text-xs text-slate-300">
              <span className="font-mono text-base font-bold text-rose-400">
                {risks.filter(r => r.level === 'high' || r.level === 'critical').length}
              </span>
              <span className="text-slate-400 ml-1">High-Risk clauses requiring redlines</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 overflow-x-auto space-x-2">
        {[
          { id: 'summary', label: 'Plain-English & Summary', icon: Sparkles },
          { id: 'risks', label: `Risk Sentinel Engine (${risks.length})`, icon: ShieldAlert },
          { id: 'clauses', label: `Important Clauses (${clauses.length})`, icon: FileText },
          { id: 'obligations', label: `Obligations & Duties (${obligations.length})`, icon: Scale },
          { id: 'timeline', label: `Deadlines & Timeline (${deadlines.length})`, icon: Calendar },
          { id: 'raw', label: 'Original Extracted Text', icon: Search }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 whitespace-nowrap transition-all ${
                active
                  ? 'border-brand-500 text-brand-400 bg-brand-500/10 rounded-t-xl'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Panes */}

      {/* TAB 1: SUMMARY & PLAIN ENGLISH */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Plain English Translation */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-brand-500/30 bg-gradient-to-br from-brand-950/40 via-obsidian-900 to-obsidian-950 shadow-xl">
              <div className="flex items-center gap-2 text-brand-400 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-base font-bold font-heading">Plain-English Translation</h3>
              </div>
              <p className="text-sm text-slate-100 leading-relaxed font-normal">
                {analysis.plainEnglish || 'No plain English translation generated.'}
              </p>
            </div>

            {/* Executive Legal Summary */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-white mb-4">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold font-heading">Executive Legal Summary</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {analysis.executiveSummary || 'No executive summary generated.'}
              </p>
            </div>
          </div>

          {/* Payment Terms & Renewal Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                Payment Terms & Invoicing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.paymentTerms || 'Standard invoicing terms apply.'}
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                Renewal & Cancellation Rules
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.renewalConditions || 'Standard renewal terms apply.'}
              </p>
            </div>

            <div className="glass-panel rounded-2xl p-5 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                Compliance & Jurisdiction
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.complianceRequirements || 'Governed by designated state laws.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RISK SENTINEL ENGINE */}
      {activeTab === 'risks' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-rose-300 font-heading">
                Risk Engine Detected {risks.length} Clauses Requiring Attention
              </h4>
              <p className="text-xs text-rose-200/80 mt-0.5">
                Review these flagged risks carefully before signing. Each item includes a practical recommendation for redlining or counter-proposals.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {risks.map((risk, index) => (
              <div
                key={risk.id || index}
                className="glass-panel rounded-3xl p-6 sm:p-7 border border-slate-800 hover:border-brand-500/40 transition-all shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <RiskBadge level={risk.level} />
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      {risk.category}
                    </span>
                  </div>
                  {risk.clauseRef && (
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-obsidian-950 text-slate-300 border border-slate-800">
                      {risk.clauseRef}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white font-heading">
                  {risk.title}
                </h3>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Explanation */}
                  <div className="p-4 rounded-xl bg-obsidian-950 border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Legal Impact & Why It's Risky:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {risk.explanation}
                    </p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-xl bg-brand-950/30 border border-brand-500/30">
                    <span className="text-[10px] uppercase font-bold text-brand-400 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended Redline / Action:
                    </span>
                    <p className="text-xs text-slate-100 leading-relaxed font-medium">
                      {risk.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: IMPORTANT CLAUSES */}
      {activeTab === 'clauses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {clauses.map((clause, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono font-semibold text-brand-400">
                  {clause.section}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded bg-obsidian-950 border border-slate-800 text-slate-300 font-medium">
                  {clause.impact}
                </span>
              </div>
              <h4 className="text-base font-bold text-white font-heading">
                {clause.name}
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {clause.summary}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: OBLIGATIONS & DUTIES */}
      {activeTab === 'obligations' && (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-base font-bold text-white font-heading">Extracted Contractual Obligations</h3>
            <p className="text-xs text-slate-400 mt-0.5">Categorized breakdown of binding covenants per party</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Obligated Party</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">Covenant / Duty Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {obligations.map((ob, idx) => (
                  <tr key={idx} className="hover:bg-obsidian-850/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white whitespace-nowrap">
                      {ob.party}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-brand-500/10 border border-brand-500/20 text-brand-400">
                        {ob.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-300 leading-relaxed">
                      {ob.obligation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: DEADLINES & TIMELINE */}
      {activeTab === 'timeline' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
          <h3 className="text-base font-bold text-white mb-6 font-heading">Contract Milestone & Notice Timeline</h3>
          <div className="relative border-l-2 border-brand-500/30 ml-4 space-y-8 pb-4">
            {deadlines.map((dl, index) => (
              <div key={index} className="relative pl-7 group">
                {/* Dot */}
                <div
                  className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-obsidian-950 ${
                    dl.urgency === 'High'
                      ? 'bg-rose-500 animate-pulse'
                      : dl.urgency === 'Medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />
                <div className="p-4 rounded-2xl bg-obsidian-950 border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-brand-400">
                      {dl.date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dl.urgency === 'High'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {dl.urgency} Urgency • {dl.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {dl.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {dl.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: RAW EXTRACTED TEXT */}
      {activeTab === 'raw' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white font-heading">Raw Extracted Contract Text</h3>
              <p className="text-xs text-slate-400">Verbatim document text indexed by the parser</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder="Search raw text..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-obsidian-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-950 border border-slate-800 text-slate-300 font-mono text-xs overflow-x-auto max-h-[600px] overflow-y-auto leading-relaxed whitespace-pre-wrap select-text">
            {rawSearch ? (
              document.extractedText
                ?.split(new RegExp(`(${rawSearch})`, 'gi'))
                .map((part, i) =>
                  part.toLowerCase() === rawSearch.toLowerCase() ? (
                    <mark key={i} className="bg-brand-500 text-white font-bold rounded px-0.5">
                      {part}
                    </mark>
                  ) : (
                    part
                  )
                )
            ) : (
              document.extractedText || 'No extracted text available.'
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetailPage;
