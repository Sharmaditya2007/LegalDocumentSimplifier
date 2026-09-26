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
  GitCompare,
  MessageSquare
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

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append('document', file);

    setUploading(true);
    addToast('Uploading and analyzing document with AI...', 'info');

    try {
      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data.success) {
        addToast('Document analyzed successfully!', 'success');
        navigate(`/documents/${res.data.document._id}`);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error uploading document';
      addToast(errorMsg, 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleLoadSample = (sampleType) => {
    const mock = sampleType === 'saas' ? MOCK_DOCUMENTS[0] : MOCK_DOCUMENTS[1];
    setDocuments((prev) => [mock, ...prev]);
    addToast(`Loaded ${mock.title} into your dashboard!`, 'success');
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const totalDocs = documents.length;
  const highRiskDocs = documents.filter((d) => (d.riskLevel || '').toLowerCase() === 'high' || (d.riskLevel || '').toLowerCase() === 'critical').length;
  const mediumRiskDocs = documents.filter((d) => (d.riskLevel || '').toLowerCase() === 'medium').length;
  const lowRiskDocs = documents.filter((d) => (d.riskLevel || '').toLowerCase() === 'low').length;
  const upcomingDeadlinesCount = deadlines.length;

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
        borderColor: 'rgba(3, 3, 5, 1)',
        borderWidth: 3,
      },
    ],
  };

  const barData = {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    datasets: [
      {
        label: 'Documents Audited',
        data: [4, 7, 12, 18, 24, totalDocs > 0 ? totalDocs * 4 : 29],
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
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
          font: { size: 11 },
          color: '#94a3b8'
        }
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
      
      {/* Top Welcome Header & Quick Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-normal">
            Welcome back, <span className="text-white font-medium">{user?.name}</span>. Here is your contract portfolio and risk overview.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/compare"
            className="px-5 py-2.5 rounded-full btn-luxury-secondary text-xs font-medium flex items-center gap-2"
          >
            <GitCompare className="w-3.5 h-3.5 text-slate-400" />
            <span>Compare Revisions</span>
          </Link>
          <label className="cursor-pointer px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold flex items-center gap-2">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Documents"
          value={totalDocs}
          change={totalDocs > 0 ? `${totalDocs} active` : "0 uploaded"}
          icon={FileText}
          subtitle="Monitored in secure repository"
        />
        <StatCard
          title="High Risk Contracts"
          value={highRiskDocs}
          change={highRiskDocs > 0 ? "Requires review" : "Clear"}
          changeType={highRiskDocs > 0 ? "negative" : "positive"}
          icon={ShieldAlert}
          subtitle="Unilateral liability or auto-renewals"
        />
        <StatCard
          title="Medium Risk Contracts"
          value={mediumRiskDocs}
          change="Manageable"
          changeType="positive"
          icon={AlertTriangle}
          subtitle="Moderate terms & clauses"
        />
        <StatCard
          title="Upcoming Deadlines"
          value={upcomingDeadlinesCount}
          change="Active alerts"
          icon={CalendarClock}
          subtitle="Notice windows & milestones"
        />
      </div>

      {/* 1-Click Sample Contracts Testing Bar */}
      <div className="p-6 sm:p-8 rounded-3xl glass-luxury flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Instant Sample Evaluation
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-normal">
              Test AI Clause Extraction, Risk Sentinel, and Plain-English Translator:
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => handleLoadSample('saas')}
            disabled={uploading}
            className="px-4 py-2 rounded-full text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
          >
            Test SaaS MSA (High Risk)
          </button>
          <button
            onClick={() => handleLoadSample('nda')}
            disabled={uploading}
            className="px-4 py-2 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all"
          >
            Test Standard NDA (Safe)
          </button>
        </div>
      </div>

      {/* Main Visualizations: Risk Distribution & Audit Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut Chart */}
        <div className="glass-luxury rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-white">Risk Distribution</h3>
            <p className="text-xs text-slate-400 mt-0.5">Categorization of monitored agreements</p>
          </div>
          <div className="h-56 mt-4 relative flex items-center justify-center">
            {totalDocs > 0 ? (
              <Doughnut data={doughnutData} options={chartOptions} />
            ) : (
              <div className="text-center text-xs text-slate-400 font-normal">No documents analyzed yet</div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/[0.06] text-center">
            <div>
              <span className="text-[11px] font-medium text-rose-400">High</span>
              <p className="text-xl font-bold text-white mt-0.5">{highRiskDocs}</p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-amber-400">Medium</span>
              <p className="text-xl font-bold text-white mt-0.5">{mediumRiskDocs}</p>
            </div>
            <div>
              <span className="text-[11px] font-medium text-emerald-400">Low</span>
              <p className="text-xl font-bold text-white mt-0.5">{lowRiskDocs}</p>
            </div>
          </div>
        </div>

        {/* Volume & Risk Flag Trends Bar Chart */}
        <div className="glass-luxury rounded-3xl p-6 sm:p-8 lg:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-white">Audit & Flagged Risk Activity</h3>
              <p className="text-xs text-slate-400 mt-0.5">Monthly processed contracts and detected clauses</p>
            </div>
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
          className={`rounded-3xl border border-dashed p-8 text-center transition-all flex flex-col items-center justify-center min-h-[240px] glass-luxury lg:col-span-2 ${
            dragActive
              ? 'border-white bg-white/[0.06]'
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">
            {uploading ? 'Processing Document with AI Engine...' : 'Drag and drop your legal contract here'}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1 font-normal">
            Supports PDF (with OCR), DOCX, and TXT files up to 25MB. Instant plain-English translation & risk audit.
          </p>

          <label className="mt-5 cursor-pointer px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold">
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
        <div className="glass-luxury rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-slate-300" />
              <h3 className="text-sm font-semibold text-white">Critical Deadlines</h3>
            </div>
            <Link to="/timeline" className="text-xs text-slate-400 hover:text-white transition-colors">
              View all →
            </Link>
          </div>

          <div className="mt-4 space-y-3 flex-1 overflow-y-auto max-h-56">
            {deadlines.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No deadlines detected yet</p>
            ) : (
              deadlines.slice(0, 4).map((dl, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs hover:border-white/15 transition-all"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold text-white">{dl.date}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        dl.urgency === 'High'
                          ? 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {dl.urgency}
                    </span>
                  </div>
                  <h5 className="font-medium text-slate-200 truncate">{dl.title}</h5>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{dl.documentTitle}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Monitored Documents Table */}
      <div className="glass-luxury rounded-3xl border border-white/[0.08] overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Recently Monitored Contracts</h3>
            <p className="text-xs text-slate-400 mt-0.5">Click any document to inspect clauses, plain-English summary, and risks</p>
          </div>
          <Link
            to="/documents"
            className="text-xs font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <span>Document Library</span>
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
            No documents yet. Click "Upload Contract" or test with an instant sample contract above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th className="px-6 py-4">Contract Title</th>
                  <th className="px-6 py-4">Type & Parties</th>
                  <th className="px-6 py-4">Risk Rating</th>
                  <th className="px-6 py-4">Flagged Risks</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {documents.slice(0, 5).map((doc) => (
                  <tr
                    key={doc._id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4.5">
                      <Link
                        to={`/documents/${doc._id}`}
                        className="font-semibold text-white hover:text-slate-300 transition-colors flex items-center gap-2.5"
                      >
                        <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="truncate max-w-xs">{doc.title}</span>
                      </Link>
                      <span className="text-[11px] text-slate-500 block mt-1">
                        {new Date(doc.createdAt).toLocaleDateString()} • {doc.fileName}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="font-medium text-slate-300 block truncate max-w-xs">
                        {doc.analysis?.contractType || 'Commercial Agreement'}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-xs mt-0.5">
                        {doc.analysis?.parties?.join(' & ') || 'Bilateral'}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="text-slate-300 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                        {doc.analysis?.risks?.length || 0} items
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/documents/${doc._id}`}
                          className="px-3.5 py-1.5 rounded-full btn-luxury-primary text-xs font-semibold flex items-center gap-1.5"
                        >
                          <span>Analyze</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <Link
                          to={`/chat?doc=${doc._id}`}
                          className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
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
