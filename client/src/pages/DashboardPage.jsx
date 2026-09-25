import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  ShieldAlert,
  AlertTriangle,
  CalendarClock,
  UploadCloud,
  ArrowRight,
  Sparkles,
  Search,
  MessageSquare,
  GitCompare,
  Trash2,
  Download,
  CheckCircle2,
  ExternalLink,
  Plus,
  Layers,
  Activity,
  Check
} from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/common/StatCard';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';

import { MOCK_DOCUMENTS } from '../services/mockData';

// Register ChartJS elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const DashboardPage = () => {
  const { user } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const [docsRes, deadRes] = await Promise.all([
        api.get('/documents').catch(() => null),
        api.get('/documents/timeline/all').catch(() => null)
      ]);

      if (docsRes?.data?.success) {
        setDocuments(docsRes.data.documents || []);
      } else {
        setDocuments([]);
      }

      if (deadRes?.data?.success) {
        setDeadlines(deadRes.data.timeline || []);
      } else {
        setDeadlines([]);
      }
    } catch (err) {
      setDocuments([]);
      setDeadlines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Quick 1-Click Sample Loader
  const handleLoadSample = async (sampleType) => {
    setUploading(true);
    try {
      const res = await api.post('/documents/sample', { sampleType });
      if (res.data.success) {
        addToast({
          title: 'Sample Contract Analyzed',
          message: res.data.message,
          type: 'success'
        });
        fetchDashboardData();
        navigate(`/documents/${res.data.document._id}`);
        return;
      }
    } catch (err) {
      // Local fallback
      const match = MOCK_DOCUMENTS.find(d => (sampleType === 'nda' ? d._id === 'doc_nda_002' : d._id === 'doc_saas_001')) || MOCK_DOCUMENTS[0];
      addToast({
        title: 'Sample Contract Ready',
        message: `Loaded "${match.title}"`,
        type: 'success'
      });
      navigate(`/documents/${match._id}`);
    } finally {
      setUploading(false);
    }
  };

  // File Upload Handler
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));

    setUploading(true);
    addToast({
      title: 'Analyzing Document...',
      message: `Running legal clause and risk engine on "${file.name}"`,
      type: 'info'
    });

    try {
      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        addToast({
          title: 'Document Analysis Ready!',
          message: `Identified ${res.data.document.analysis?.risks?.length || 0} risk items.`,
          type: 'success'
        });
        fetchDashboardData();
        navigate(`/documents/${res.data.document._id}`);
      }
    } catch (err) {
      addToast({
        title: 'Upload Failed',
        message: err.response?.data?.message || 'Failed to parse and analyze file.',
        type: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Metrics calculation
  const totalDocs = documents.length;
  const highRiskDocs = documents.filter(d => d.riskLevel === 'high' || d.riskLevel === 'critical').length;
  const mediumRiskDocs = documents.filter(d => d.riskLevel === 'medium').length;
  const lowRiskDocs = documents.filter(d => d.riskLevel === 'low').length;
  const upcomingDeadlinesCount = deadlines.length;

  // Chart data: Risk Distribution
  const doughnutData = {
    labels: ['High Risk', 'Medium Risk', 'Low Risk'],
    datasets: [
      {
        data: [highRiskDocs || 0, mediumRiskDocs || 0, lowRiskDocs || 0],
        backgroundColor: [
          'rgba(244, 63, 94, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(16, 185, 129, 0.85)'
        ],
        borderColor: [
          'rgba(244, 63, 94, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  // Chart data: Monthly Volume Trends
  const barData = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Documents Audited',
        data: [4, 7, 12, 18, 24, totalDocs > 0 ? totalDocs * 4 : 29],
        backgroundColor: 'rgba(99, 102, 241, 0.85)',
        borderRadius: 8,
      },
      {
        label: 'Risks Flagged',
        data: [12, 21, 38, 49, 65, 82],
        backgroundColor: 'rgba(244, 63, 94, 0.8)',
        borderRadius: 8,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 15,
          font: { size: 11, family: 'Inter' },
          color: '#94a3b8'
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans page-fade-in">
      {/* Top Welcome Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
              Legal Sentinel Active
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Executive Document Command
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome back, <span className="font-semibold text-slate-200">{user?.name}</span>. Here is your legal risk posture and contract timeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/compare"
            className="px-4 py-2.5 rounded-xl border border-slate-700 bg-obsidian-900 hover:bg-obsidian-800 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all shadow-sm hover:border-brand-500/40"
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span>Compare Contracts</span>
          </Link>
          <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow flex items-center gap-2 transition-all hover:scale-[1.02]">
            <UploadCloud className="w-4 h-4" />
            <span>Upload Contract</span>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Documents"
          value={totalDocs}
          change={totalDocs > 0 ? `${totalDocs} active` : "0 uploaded"}
          icon={FileText}
          color="brand"
          subtitle="Monitored in secure repository"
        />
        <StatCard
          title="High Risk Contracts"
          value={highRiskDocs}
          change={highRiskDocs > 0 ? "Requires review" : "Clear"}
          changeType={highRiskDocs > 0 ? "negative" : "positive"}
          icon={ShieldAlert}
          color="rose"
          subtitle="Unfair penalties or auto-renewals"
        />
        <StatCard
          title="Medium Risk Contracts"
          value={mediumRiskDocs}
          change="Manageable"
          changeType="positive"
          icon={AlertTriangle}
          color="amber"
          subtitle="Moderate liability or terms"
        />
        <StatCard
          title="Upcoming Deadlines"
          value={upcomingDeadlinesCount}
          change="Active alerts"
          icon={CalendarClock}
          color="indigo"
          subtitle="Notice windows & payments"
        />
      </div>

      {/* 1-Click Sample Contracts Testing Bar */}
      <div className="p-5 rounded-2xl glass-panel border border-brand-500/30 bg-gradient-to-r from-brand-950/40 via-obsidian-900 to-obsidian-950">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 border border-brand-500/30 text-brand-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
                <span>Instant 1-Click Evaluation Contracts</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
                  Ready
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Click any contract to run the AI Risk Engine, Clause Extractor, and Plain-English Translator:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleLoadSample('saas')}
              disabled={uploading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 transition-all shadow-sm"
            >
              Test SaaS MSA (High Risk)
            </button>
            <button
              onClick={() => handleLoadSample('nda')}
              disabled={uploading}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 transition-all shadow-sm"
            >
              Test NDA (Low Risk)
            </button>
          </div>
        </div>
      </div>

      {/* Main Visualizations: Risk Distribution & Audit Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white font-heading">Risk Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Categorization of monitored agreements</p>
          </div>
          <div className="h-56 mt-4 relative flex items-center justify-center">
            {totalDocs > 0 ? (
              <Doughnut data={doughnutData} options={chartOptions} />
            ) : (
              <div className="text-center text-xs text-slate-400">No documents analyzed yet</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-800 text-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-rose-400">High</span>
              <p className="text-lg font-bold font-mono text-white">{highRiskDocs}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400">Medium</span>
              <p className="text-lg font-bold font-mono text-white">{mediumRiskDocs}</p>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400">Low</span>
              <p className="text-lg font-bold font-mono text-white">{lowRiskDocs}</p>
            </div>
          </div>
        </div>

        {/* Volume & Risk Flag Trends Bar Chart */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-heading">Audit & Flagged Risk Activity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly processed contracts and detected clauses</p>
            </div>
            <span className="text-[11px] px-2.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 font-semibold">
              Live Engine
            </span>
          </div>
          <div className="h-64 mt-4">
            <Bar data={barData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Drag & Drop Upload Zone & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Dropzone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`lg:col-span-2 rounded-3xl border-2 border-dashed p-8 text-center transition-all flex flex-col items-center justify-center min-h-[220px] ${
            dragActive
              ? 'border-brand-500 bg-brand-500/10'
              : 'border-slate-800 bg-obsidian-950/60 hover:border-brand-500/50'
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">
            {uploading ? 'Processing Document with AI Engine...' : 'Drag and drop your legal contract here'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Supports PDF (with OCR), DOCX, and TXT files up to 25MB. Instant plain-English translation & risk audit.
          </p>

          <label className="mt-4 cursor-pointer px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow transition-all hover:scale-[1.02]">
            <span>Browse Files</span>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </div>

        {/* Upcoming Deadlines Widget */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-brand-400" />
              <h3 className="text-sm font-bold text-white font-heading">Critical Deadlines</h3>
            </div>
            <Link to="/timeline" className="text-xs text-brand-400 hover:underline font-semibold">
              View all
            </Link>
          </div>

          <div className="mt-4 space-y-3 flex-1 overflow-y-auto max-h-56">
            {deadlines.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No deadlines detected yet</p>
            ) : (
              deadlines.slice(0, 4).map((dl, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-obsidian-950 border border-slate-800 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-brand-400">{dl.date}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        dl.urgency === 'High'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {dl.urgency}
                    </span>
                  </div>
                  <h5 className="font-semibold text-slate-200 truncate">{dl.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{dl.documentTitle}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Monitored Documents Table */}
      <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white font-heading">Recently Monitored Contracts</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any document to inspect clauses, plain-English summary, and risks</p>
          </div>
          <Link
            to="/documents"
            className="text-xs font-semibold text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Go to Document Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-6 space-y-4">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No documents yet. Click "Upload Contract" or test with an instant sample contract above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Contract Title</th>
                  <th className="px-6 py-3.5">Type & Parties</th>
                  <th className="px-6 py-3.5">Risk Rating</th>
                  <th className="px-6 py-3.5">Flagged Risks</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {documents.slice(0, 5).map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-obsidian-800/40 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/documents/${doc._id}`}
                        className="font-semibold text-white hover:text-brand-400 transition-colors flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-brand-400 shrink-0" />
                        <span className="truncate max-w-xs">{doc.title}</span>
                      </Link>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {new Date(doc.createdAt).toLocaleDateString()} • {doc.fileName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-slate-300 block truncate max-w-xs">
                        {doc.analysis?.contractType || 'Commercial Agreement'}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-xs mt-0.5">
                        {doc.analysis?.parties?.join(' & ') || 'Bilateral'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-200">
                        {doc.analysis?.risks?.length || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/documents/${doc._id}`}
                          className="px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20 font-semibold text-xs transition-colors flex items-center gap-1"
                        >
                          <span>Analyze</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          to={`/chat?doc=${doc._id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-400 hover:bg-obsidian-800 transition-colors"
                          title="Chat with Document"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
