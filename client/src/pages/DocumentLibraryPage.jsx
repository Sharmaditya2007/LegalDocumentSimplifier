import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  Grid,
  List,
  UploadCloud,
  Download,
  Trash2,
  Archive,
  MessageSquare,
  GitCompare,
  ArrowRight,
  ExternalLink,
  Plus,
  Sparkles
} from 'lucide-react';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import RiskBadge from '../components/common/RiskBadge';
import Modal from '../components/common/Modal';
import { CardSkeleton } from '../components/common/SkeletonLoader';
import { MOCK_DOCUMENTS } from '../services/mockData';

const DocumentLibraryPage = () => {
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [showArchived, setShowArchived] = useState(false);

  // Upload modal state
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchDocuments = async () => {
    try {
      const res = await api.get('/documents', {
        params: {
          search: searchTerm,
          risk: riskFilter,
          archived: showArchived
        }
      });
      if (res?.data?.success && res.data.documents.length > 0) {
        setDocuments(res.data.documents);
      } else {
        let filtered = [...MOCK_DOCUMENTS];
        if (riskFilter !== 'all') filtered = filtered.filter(d => d.riskLevel === riskFilter);
        if (searchTerm) filtered = filtered.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setDocuments(filtered);
      }
    } catch (err) {
      let filtered = [...MOCK_DOCUMENTS];
      if (riskFilter !== 'all') filtered = filtered.filter(d => d.riskLevel === riskFilter);
      if (searchTerm) filtered = filtered.filter(d => d.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setDocuments(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [searchTerm, riskFilter, showArchived]);

  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));

    setUploading(true);
    try {
      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        addToast({
          title: 'Document Uploaded & Analyzed',
          message: `"${res.data.document.title}" added to your library.`,
          type: 'success'
        });
        setUploadModalOpen(false);
        fetchDocuments();
        navigate(`/documents/${res.data.document._id}`);
      }
    } catch (err) {
      addToast({
        title: 'Upload Failed',
        message: err.response?.data?.message || 'Error parsing file.',
        type: 'error'
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await api.delete(`/documents/${id}`);
      if (res.data.success) {
        addToast({ title: 'Deleted', message: 'Document removed from library.', type: 'info' });
        setDocuments(prev => prev.filter(d => d._id !== id));
      }
    } catch (err) {
      addToast({ title: 'Error', message: 'Could not delete document.', type: 'error' });
    }
  };

  const handleToggleArchive = async (doc) => {
    try {
      const newStatus = !doc.isArchived;
      const res = await api.patch(`/documents/${doc._id}`, { isArchived: newStatus });
      if (res.data.success) {
        addToast({
          title: newStatus ? 'Archived' : 'Restored',
          message: `Document has been ${newStatus ? 'archived' : 'restored to active'}.`,
          type: 'info'
        });
        fetchDocuments();
      }
    } catch (err) {
      addToast({ title: 'Error', message: 'Failed to update archive status.', type: 'error' });
    }
  };

  const handleDownloadReport = (docId) => {
    const apiBase = import.meta.env.VITE_API_URL || '/api';
    window.open(`${apiBase}/documents/${docId}/download-report`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Encrypted Document Vault
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search, filter, audit, and compare contracts stored in your zero-retention repository.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-glow flex items-center justify-center gap-2 transition-all self-start sm:self-auto hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Contract</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, parties, or clauses..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-obsidian-950 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Filter Badges & View Switcher */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Risk Filters */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-obsidian-900 border border-slate-800 text-xs">
            <button
              onClick={() => setRiskFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                riskFilter === 'all' ? 'bg-brand-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setRiskFilter('high')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                riskFilter === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              High Risk
            </button>
            <button
              onClick={() => setRiskFilter('medium')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                riskFilter === 'medium' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setRiskFilter('low')}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                riskFilter === 'low' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Low
            </button>
          </div>

          {/* Archived Toggle */}
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors flex items-center gap-1.5 ${
              showArchived
                ? 'bg-brand-500/20 border-brand-500/40 text-brand-300'
                : 'border-slate-800 bg-obsidian-900 text-slate-400 hover:text-white'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Archived</span>
          </button>

          {/* Grid/List View Switch */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-obsidian-900 border border-slate-800 text-slate-400">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-brand-600 text-white shadow-glow' : 'hover:text-white'}`}
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-brand-600 text-white shadow-glow' : 'hover:text-white'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : documents.length === 0 ? (
        <div className="glass-panel rounded-3xl p-14 text-center border border-slate-800 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white font-heading">No documents match your query</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try resetting your search filters or upload a new agreement to audit.
          </p>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="mt-5 px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-glow"
          >
            Upload Contract
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between hover:border-brand-500/50 transition-all group shadow-xl"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link
                  to={`/documents/${doc._id}`}
                  className="font-bold text-base text-white hover:text-brand-400 transition-colors line-clamp-2 font-heading"
                >
                  {doc.title}
                </Link>

                <p className="text-xs font-medium text-brand-400 mt-1 truncate">
                  {doc.analysis?.contractType || 'Commercial Agreement'}
                </p>

                <p className="text-xs text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {doc.analysis?.plainEnglish || doc.analysis?.executiveSummary || 'No analysis available.'}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                  {(doc.analysis?.parties || []).map((party, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] bg-obsidian-950 border border-slate-800 text-slate-300 font-medium truncate max-w-[140px]"
                    >
                      {party}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link
                  to={`/documents/${doc._id}`}
                  className="px-3.5 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/20 hover:bg-brand-500/20 text-brand-400 font-semibold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Full Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-1">
                  <Link
                    to={`/chat?doc=${doc._id}`}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-brand-400 hover:bg-obsidian-900 transition-colors"
                    title="Chat with Document"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDownloadReport(doc._id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-obsidian-900 transition-colors"
                    title="Download Audit Report"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleToggleArchive(doc)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-obsidian-900 transition-colors"
                    title={doc.isArchived ? 'Restore' : 'Archive'}
                  >
                    <Archive className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(doc._id, doc.title)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-obsidian-900 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Contract</th>
                  <th className="px-6 py-3.5">Type & Parties</th>
                  <th className="px-6 py-3.5">Risk Rating</th>
                  <th className="px-6 py-3.5">Risks Flagged</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-obsidian-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link
                        to={`/documents/${doc._id}`}
                        className="font-bold text-white hover:text-brand-400 transition-colors block truncate max-w-sm font-heading"
                      >
                        {doc.title}
                      </Link>
                      <span className="text-[11px] text-slate-400">{doc.fileName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-200 block truncate max-w-xs">
                        {doc.analysis?.contractType || 'Commercial'}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate max-w-xs">
                        {doc.analysis?.parties?.join(' & ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-200">
                        {doc.analysis?.risks?.length || 0} flagged
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/documents/${doc._id}`}
                          className="px-3 py-1 rounded-lg bg-brand-500/10 text-brand-400 font-semibold text-xs hover:bg-brand-500/20"
                        >
                          View
                        </Link>
                        <Link
                          to={`/chat?doc=${doc._id}`}
                          className="p-1.5 text-slate-400 hover:text-brand-400"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDownloadReport(doc._id)}
                          className="p-1.5 text-slate-400 hover:text-white"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(doc._id, doc.title)}
                          className="p-1.5 text-slate-400 hover:text-rose-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      <Modal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        title="Upload Legal Agreement for AI Audit"
      >
        <div className="p-4 text-center">
          <label className="border-2 border-dashed border-slate-700 rounded-2xl p-10 block cursor-pointer hover:border-brand-500 transition-colors bg-obsidian-950">
            <UploadCloud className="w-12 h-12 text-brand-400 mx-auto mb-3" />
            <h4 className="text-sm font-bold text-white font-heading">
              {uploading ? 'Analyzing Document with AI...' : 'Click to select or drag PDF, DOCX, or TXT file'}
            </h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Maximum file size: 25MB. Text extraction and risk sentinel analyze immediately.
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
              disabled={uploading}
              onChange={(e) => handleFileUpload(e.target.files)}
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentLibraryPage;
