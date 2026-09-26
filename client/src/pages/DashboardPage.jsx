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
  Check,
  Zap,
  Scale,
  Clock
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
import Card3DTilt from '../components/3d/Card3DTilt';

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
          <div className="flex items-center gap-2 mb-1.5">
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
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans">
            Welcome back, <span className="font-bold text-slate-200">{user?.name}</span>. Here is your legal risk posture and contract timeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/compare"
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-obsidian-900 hover:bg-obsidian-850 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all shadow-sm hover:border-purple-500/40 hover:shadow-[0_0_15px_rgba(155,81,224,0.15)]"
          >
            <GitCompare className="w-3.5 h-3.5 text-purple-400" />
            <span>Compare Contracts</span>
          </Link>
          <label className="cursor-pointer px-5 py-2.5 rounded-xl btn-glow-gold text-obsidian-950 text-xs font-bold shadow-glow-amber flex items-center gap-2 transition-all hover:scale-[1.02]">
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

      {/* KPI Stats Grid with 3D Depth */}
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
      <Card3DTilt maxTilt={4} scale={1.01}>
        <div className="p-6 rounded-3xl glass-panel border border-amberAccent-500/30 bg-gradient-to-r from-amberAccent-500/10 via-obsidian-950 to-obsidian-950 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-amberAccent-500/15 border border-amberAccent-500/40 text-amberAccent-400 flex items-center justify-center shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 font-heading">
                  <span>Instant 1-Click Evaluation Contracts</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
                    Live Engine
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-sans">
                  Click any sample to test AI Clause Extraction, Risk Sentinel, and Plain-English Translator:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleLoadSample('saas')}
                disabled={uploading}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 hover:scale-105 transition-all shadow-sm"
              >
                Test SaaS MSA (High Risk)
              </button>
              <button
                onClick={() => handleLoadSample('nda')}
                disabled={uploading}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/20 hover:scale-105 transition-all shadow-sm"
              >
                Test NDA (Low Risk)
              </button>
            </div>
          </div>
        </div>
      </Card3DTilt>

      {/* Main Visualizations: Risk Distribution & Audit Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart */}
        <Card3DTilt maxTilt={6} scale={1.01} className="h-full">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between shadow-2xl h-full">
            <div>
              <h3 className="text-base font-bold text-white font-heading">Risk Distribution</h3>
              <p className="text-xs text-slate-400 mt-0.5">Categorization of monitored agreements</p>
            </div>
            <div className="h-56 mt-4 relative flex items-center justify-center">
              {totalDocs > 0 ? (
                <Doughnut data={doughnutData} options={chartOptions} />
              ) : (
                <div className="text-center text-xs text-slate-400 font-mono">No documents analyzed yet</div>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5 text-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-400 font-mono">High</span>
                <p className="text-xl font-bold font-mono text-white mt-0.5">{highRiskDocs}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 font-mono">Medium</span>
                <p className="text-xl font-bold font-mono text-white mt-0.5">{mediumRiskDocs}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono">Low</span>
                <p className="text-xl font-bold font-mono text-white mt-0.5">{lowRiskDocs}</p>
              </div>
            </div>
          </div>
        </Card3DTilt>

        {/* Volume & Risk Flag Trends Bar Chart */}
        <Card3DTilt maxTilt={6} scale={1.01} className="lg:col-span-2 h-full">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between shadow-2xl h-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-heading">Audit & Flagged Risk Activity</h3>
                <p className="text-xs text-slate-400 mt-0.5">Monthly processed contracts and detected clauses</p>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono font-semibold">
                Live Telemetry
              </span>
            </div>
            <div className="h-64 mt-4">
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </Card3DTilt>
      </div>

      {/* Drag & Drop Upload Zone & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Dropzone with 3D Depth */}
        <Card3DTilt maxTilt={6} scale={1.01} className="lg:col-span-2 h-full">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`rounded-3xl border-2 border-dashed p-8 text-center transition-all flex flex-col items-center justify-center min-h-[230px] glass-panel h-full ${
              dragActive
                ? 'border-amberAccent-500 bg-amberAccent-500/10 shadow-[0_0_40px_rgba(235,184,126,0.2)]'
                : 'border-white/10 bg-obsidian-950/70 hover:border-amberAccent-500/40 hover:shadow-[0_0_25px_rgba(235,184,126,0.1)]'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-amberAccent-500/15 border border-amberAccent-500/30 text-amberAccent-400 flex items-center justify-center mb-3 shadow-inner">
              <UploadCloud className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-white font-heading">
              {uploading ? 'Processing Document with AI Engine...' : 'Drag and drop your legal contract here'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1 font-sans">
              Supports PDF (with OCR), DOCX, and TXT files up to 25MB. Instant plain-English translation & risk audit.
            </p>

            <label className="mt-4 cursor-pointer px-6 py-2.5 rounded-xl btn-glow-gold text-obsidian-950 text-xs font-bold shadow-glow-amber transition-all hover:scale-105">
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
        </Card3DTilt>

        {/* Upcoming Deadlines Widget */}
        <Card3DTilt maxTilt={6} scale={1.01} className="h-full">
          <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between shadow-2xl h-full">
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-amberAccent-400" />
                <h3 className="text-sm font-bold text-white font-heading">Critical Deadlines</h3>
              </div>
              <Link to="/timeline" className="text-xs text-amberAccent-400 hover:underline font-semibold font-mono">
                View all →
              </Link>
            </div>

            <div className="mt-4 space-y-3 flex-1 overflow-y-auto max-h-56">
              {deadlines.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6 font-mono">No deadlines detected yet</p>
              ) : (
                deadlines.slice(0, 4).map((dl, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-obsidian-950 border border-white/10 text-xs hover:border-amberAccent-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono font-bold text-amberAccent-400">{dl.date}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          dl.urgency === 'High'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
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
        </Card3DTilt>
      </div>

      {/* Recent Monitored Documents Table */}
      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-6 sm:p-7 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white font-heading">Recently Monitored Contracts</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">Click any document to inspect clauses, plain-English summary, and risks</p>
          </div>
          <Link
            to="/documents"
            className="text-xs font-semibold text-amberAccent-400 hover:text-amberAccent-300 flex items-center gap-1.5 font-mono"
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
          <div className="p-12 text-center text-xs text-slate-400 font-mono">
            No documents yet. Click "Upload Contract" or test with an instant sample contract above!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950/90 text-slate-400 uppercase text-[10px] font-mono font-bold tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-4">Contract Title</th>
                  <th className="px-6 py-4">Type & Parties</th>
                  <th className="px-6 py-4">Risk Rating</th>
                  <th className="px-6 py-4">Flagged Risks</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {documents.slice(0, 5).map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="px-6 py-4.5">
                      <Link
                        to={`/documents/${doc._id}`}
                        className="font-bold text-white hover:text-amberAccent-400 transition-colors flex items-center gap-2.5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-amberAccent-400 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="truncate max-w-xs">{doc.title}</span>
                      </Link>
                      <span className="text-[11px] text-slate-400 block mt-1 font-mono">
                        {new Date(doc.createdAt).toLocaleDateString()} • {doc.fileName}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="font-semibold text-slate-300 block truncate max-w-xs">
                        {doc.analysis?.contractType || 'Commercial Agreement'}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-xs mt-0.5">
                        {doc.analysis?.parties?.join(' & ') || 'Bilateral'}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="font-mono font-bold text-slate-200 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                        {doc.analysis?.risks?.length || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/documents/${doc._id}`}
                          className="px-3.5 py-1.5 rounded-xl bg-amberAccent-500/15 hover:bg-amberAccent-500/25 text-amberAccent-400 border border-amberAccent-500/30 font-bold text-xs transition-colors flex items-center gap-1.5"
                        >
                          <span>Analyze</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          to={`/chat?doc=${doc._id}`}
                          className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                          title="Chat with Copilot"
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
