import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldAlert,
  Sparkles,
  Calendar,
  MessageSquare,
  GitCompare,
  Download,
  ArrowLeft,
  Building,
  Search,
  Scale,
  Copy,
  Check
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { MOCK_DOCUMENTS } from '../services/mockData';

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useNotification();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('summary');
  const [rawSearch, setRawSearch] = useState('');
  const [copiedSummary, setCopiedSummary] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await api.get(`/documents/${id}`);
        if (res?.data?.success && res.data.document) {
          setDocument(res.data.document);
          setLoading(false);
          return;
        }
      } catch (err) {
        const fallback = MOCK_DOCUMENTS.find(d => d._id === id) || MOCK_DOCUMENTS[0];
        if (fallback) {
          setDocument(fallback);
          setLoading(false);
          return;
        }
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
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 space-y-6">
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

  const copyPlainEnglish = () => {
    if (analysis.plainEnglish) {
      navigator.clipboard.writeText(analysis.plainEnglish);
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000);
      addToast({ title: 'Copied to Clipboard', message: 'Plain-English summary copied.', type: 'success' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
      
      {/* Top Breadcrumb & Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link
            to="/documents"
            className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-slate-400 hover:text-white transition-all"
            title="Back to Contract Library"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">
                {analysis.contractType || 'Legal Agreement'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-500">{document.fileName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
              {document.title}
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={`/chat?doc=${document._id}`}
            className="px-5 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold flex items-center gap-2"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Copilot</span>
          </Link>

          <Link
            to={`/compare?docA=${document._id}`}
            className="px-5 py-2.5 rounded-full btn-luxury-secondary text-xs font-medium flex items-center gap-2"
          >
            <GitCompare className="w-3.5 h-3.5 text-slate-400" />
            <span>Compare Revisions</span>
          </Link>

          <button
            onClick={handleDownload}
            className="px-5 py-2.5 rounded-full btn-luxury-secondary text-xs font-medium flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* High-Level Executive Risk Gauge & Metadata Banner */}
      <div className="glass-luxury rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        
        {/* Risk Gauge */}
        <div className="md:col-span-1 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-center">
          <span className="text-xs font-medium text-slate-400 mb-1">
            Overall Risk Rating
          </span>
          <div className="flex items-baseline gap-1 my-1.5">
            <span
              className={`text-4xl font-bold ${
                score >= 60 ? 'text-rose-400' : score >= 35 ? 'text-amber-400' : 'text-emerald-400'
              }`}
            >
              {score}
            </span>
            <span className="text-xs text-slate-500">/ 100</span>
          </div>
          <RiskBadge level={document.riskLevel} size="md" />

          {/* Mini progress bar */}
          <div className="w-full bg-white/[0.04] border border-white/[0.06] h-2 rounded-full overflow-hidden mt-4">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                score >= 60 ? 'bg-rose-500' : score >= 35 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Metadata Details */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">
              Parties Bound
            </span>
            <div className="space-y-1.5">
              {(analysis.parties || []).map((party, i) => (
                <div key={i} className="text-xs font-medium text-slate-200 flex items-center gap-2">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{party}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">
              Key Dates
            </span>
            <div className="text-xs space-y-1.5 text-slate-300">
              <p><span className="text-slate-500">Effective:</span> {analysis.effectiveDate || 'Upon execution'}</p>
              <p><span className="text-slate-500">Expiration:</span> {analysis.expiryDate || 'Fixed term / At-will'}</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block mb-2">
              Risk Sentinel Flags
            </span>
            <div className="text-xs text-slate-300">
              <span className="text-2xl font-bold text-rose-400">
                {risks.filter(r => r.level === 'high' || r.level === 'critical').length}
              </span>
              <span className="text-slate-400 ml-2">High-Risk clauses flagged for counter-proposals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-white/[0.06] overflow-x-auto space-x-2 pb-1">
        {[
          { id: 'summary', label: 'Summary', icon: Sparkles },
          { id: 'risks', label: `Risks (${risks.length})`, icon: ShieldAlert },
          { id: 'clauses', label: `Clauses (${clauses.length})`, icon: FileText },
          { id: 'obligations', label: `Duties (${obligations.length})`, icon: Scale },
          { id: 'timeline', label: `Timeline (${deadlines.length})`, icon: Calendar },
          { id: 'raw', label: 'Raw Text', icon: Search }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-5 text-xs font-medium border-b-2 whitespace-nowrap transition-all rounded-t-xl ${
                active
                  ? 'border-white text-white font-semibold bg-white/[0.04]'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
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
            <div className="glass-luxury rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-base font-semibold">Plain-English Translation</h3>
                </div>
                <button
                  onClick={copyPlainEnglish}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-xs"
                  title="Copy Plain English"
                >
                  {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSummary ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-normal bg-white/[0.02] p-5 rounded-2xl border border-white/[0.04]">
                {analysis.plainEnglish || 'No plain English translation generated.'}
              </p>
            </div>

            {/* Executive Legal Summary */}
            <div className="glass-luxury rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-white mb-4">
                <FileText className="w-4 h-4 text-slate-400" />
                <h3 className="text-base font-semibold">Executive Legal Summary</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-5 rounded-2xl border border-white/[0.04]">
                {analysis.executiveSummary || 'No executive summary generated.'}
              </p>
            </div>
          </div>

          {/* Payment Terms & Renewal Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-luxury rounded-3xl p-6">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Payment Terms & Invoicing
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {analysis.paymentTerms || 'Standard invoicing terms apply.'}
              </p>
            </div>

            <div className="glass-luxury rounded-3xl p-6">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Renewal & Cancellation Rules
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {analysis.renewalConditions || 'Standard renewal terms apply.'}
              </p>
            </div>

            <div className="glass-luxury rounded-3xl p-6">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Compliance & Jurisdiction
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {analysis.complianceRequirements || 'Governed by designated state laws.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RISK SENTINEL ENGINE */}
      {activeTab === 'risks' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-4">
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-rose-300">
                Risk Engine Detected {risks.length} Clauses Requiring Attention
              </h4>
              <p className="text-xs text-rose-200/80 mt-1 leading-relaxed">
                Review these flagged risks carefully before signing. Each item includes an actionable recommendation for counter-proposals or contract redlining.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {risks.map((risk, index) => (
              <div
                key={risk.id || index}
                className="glass-luxury rounded-3xl p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <RiskBadge level={risk.level} />
                    <span className="text-xs font-medium text-slate-400">
                      {risk.category}
                    </span>
                  </div>
                  {risk.clauseRef && (
                    <span className="px-3 py-1 rounded-full text-[11px] bg-white/[0.03] text-slate-300 border border-white/[0.06]">
                      {risk.clauseRef}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-white">
                  {risk.title}
                </h3>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Explanation */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-[11px] uppercase font-medium text-slate-400 block mb-1">
                      Legal Impact & Why It's Risky:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {risk.explanation}
                    </p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-5 rounded-2xl bg-indigo-500/[0.04] border border-indigo-500/20">
                    <span className="text-[11px] uppercase font-medium text-indigo-300 block mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Recommended Redline / Action:
                    </span>
                    <p className="text-xs text-slate-100 leading-relaxed font-normal">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clauses.map((clause, i) => (
            <div
              key={i}
              className="glass-luxury rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-medium text-slate-400">
                    {clause.section}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-300">
                    {clause.impact}
                  </span>
                </div>
                <h4 className="text-base font-semibold text-white">
                  {clause.name}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed font-normal">
                  {clause.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: OBLIGATIONS & DUTIES */}
      {activeTab === 'obligations' && (
        <div className="glass-luxury rounded-3xl border border-white/[0.08] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-white/[0.06]">
            <h3 className="text-base font-semibold text-white">Extracted Contractual Obligations</h3>
            <p className="text-xs text-slate-400 mt-0.5">Categorized breakdown of binding covenants per party</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th className="px-6 py-4">Obligated Party</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Covenant / Duty Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {obligations.map((ob, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4.5 font-semibold text-white whitespace-nowrap">
                      {ob.party}
                    </td>
                    <td className="px-6 py-4.5 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/[0.03] border border-white/[0.06] text-slate-300">
                        {ob.type}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-slate-300 leading-relaxed font-normal">
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
        <div className="glass-luxury rounded-3xl p-6 sm:p-8">
          <h3 className="text-base font-semibold text-white mb-6">Contract Milestone & Notice Timeline</h3>
          <div className="relative border-l border-white/10 ml-4 space-y-8 pb-4">
            {deadlines.map((dl, index) => (
              <div key={index} className="relative pl-8 group">
                <div
                  className={`absolute -left-[7px] top-1.5 w-3 h-3 rounded-full ${
                    dl.urgency === 'High'
                      ? 'bg-rose-500'
                      : dl.urgency === 'Medium'
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                />
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/15 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-white">
                      {dl.date}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${
                        dl.urgency === 'High'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {dl.urgency} Urgency • {dl.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {dl.title}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">
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
        <div className="glass-luxury rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-semibold text-white">Raw Extracted Contract Text</h3>
              <p className="text-xs text-slate-400">Verbatim document text indexed by the parser</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={rawSearch}
                onChange={(e) => setRawSearch(e.target.value)}
                placeholder="Search raw text..."
                className="w-full pl-10 pr-4 py-2 rounded-full text-xs bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-slate-300 font-mono text-xs overflow-x-auto max-h-[600px] overflow-y-auto leading-relaxed whitespace-pre-wrap select-text">
            {rawSearch ? (
              document.extractedText
                ?.split(new RegExp(`(${rawSearch})`, 'gi'))
                .map((part, i) =>
                  part.toLowerCase() === rawSearch.toLowerCase() ? (
                    <mark key={i} className="bg-white text-black font-semibold rounded px-1">
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
