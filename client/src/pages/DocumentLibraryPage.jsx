import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  Search,
  Grid,
  List,
  UploadCloud,
  Download,
  Trash2,
  Archive,
  MessageSquare,
  GitCompare,
  ArrowRight,
  Plus
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
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);

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
      if (res?.data?.success) {
        setDocuments(res.data.documents || []);
      } else {
        setDocuments([]);
      }
    } catch (err) {
      setDocuments([]);
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
    formData.append('document', file);
    formData.append('title', file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '));

    setUploading(true);
    try {
      const res = await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        addToast({
          title: 'Document Uploaded & Analyzed',
          message: `"${res.data.document.title}" added to your vault.`,
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
        addToast({ title: 'Deleted', message: 'Document removed from vault.', type: 'info' });
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
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Contract Library
          </h1>
          <p className="text-sm text-slate-400 mt-1 font-normal">
            Search, filter, audit, and compare contracts stored in your zero-retention repository.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Contract</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-luxury rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contracts..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
          />
        </div>

        {/* Filter Badges & View Switcher */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Risk Filters */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
            <button
              onClick={() => setRiskFilter('all')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                riskFilter === 'all' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setRiskFilter('high')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                riskFilter === 'high' ? 'bg-rose-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              High Risk
            </button>
            <button
              onClick={() => setRiskFilter('medium')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                riskFilter === 'medium' ? 'bg-amber-500 text-black font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => setRiskFilter('low')}
              className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                riskFilter === 'low' ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Low
            </button>
          </div>

          {/* Archived Toggle */}
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`px-4 py-2 rounded-full border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              showArchived
                ? 'bg-white text-black border-white font-semibold'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:text-white'
            }`}
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Archived</span>
          </button>

          {/* Grid/List View Switch */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-slate-400">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white text-black' : 'hover:text-white'}`}
              title="Grid View"
            >
              <Grid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white text-black' : 'hover:text-white'}`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Document Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : documents.length === 0 ? (
        <div className="glass-luxury rounded-3xl p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-white flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No contracts found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto font-normal">
            Upload your first legal document or try evaluating one of the instant sample contracts.
          </p>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="mt-6 px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Contract</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div
              key={doc._id}
              className="glass-luxury glass-luxury-hover rounded-3xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                  <span className="text-[11px] text-slate-500">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <Link
                  to={`/documents/${doc._id}`}
                  className="font-semibold text-base text-white hover:text-slate-300 transition-colors block line-clamp-1"
                >
                  {doc.title}
                </Link>

                <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                  {doc.analysis?.contractType || 'Legal Agreement'} • {doc.analysis?.parties?.join(' & ') || 'Bilateral'}
                </p>

                <p className="text-xs text-slate-300 mt-4 line-clamp-2 leading-relaxed font-normal bg-white/[0.02] p-3 rounded-2xl border border-white/[0.04]">
                  {doc.analysis?.plainEnglish || doc.analysis?.summary || 'AI analysis generated.'}
                </p>
              </div>

              {/* Card Footer Actions */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <Link
                  to={`/documents/${doc._id}`}
                  className="text-xs font-semibold text-white hover:text-slate-300 flex items-center gap-1"
                >
                  <span>Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/chat?doc=${doc._id}`}
                    className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                    title="Chat with AI Copilot"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleDownloadReport(doc._id)}
                    className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                    title="Export Audit Report"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleToggleArchive(doc)}
                    className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.04] transition-colors"
                    title={doc.isArchived ? 'Restore' : 'Archive'}
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(doc._id, doc.title)}
                    className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/[0.04] transition-colors"
                    title="Delete Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="glass-luxury rounded-3xl border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th className="px-6 py-4">Contract Title</th>
                  <th className="px-6 py-4">Type & Parties</th>
                  <th className="px-6 py-4">Risk Rating</th>
                  <th className="px-6 py-4">Flags</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4.5">
                      <Link
                        to={`/documents/${doc._id}`}
                        className="font-semibold text-white hover:text-slate-300 transition-colors block truncate max-w-xs"
                      >
                        {doc.title}
                      </Link>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        {new Date(doc.createdAt).toLocaleDateString()} • {doc.fileName}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="font-medium text-slate-300 block truncate max-w-xs">
                        {doc.analysis?.contractType || 'Legal Agreement'}
                      </span>
                      <span className="text-[11px] text-slate-500 block truncate max-w-xs">
                        {doc.analysis?.parties?.join(' & ') || 'Bilateral'}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="text-slate-300 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                        {doc.analysis?.risks?.length || 0} risks
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/documents/${doc._id}`}
                          className="px-3 py-1.5 rounded-full btn-luxury-primary text-xs font-semibold"
                        >
                          Audit
                        </Link>
                        <button
                          onClick={() => handleDelete(doc._id, doc.title)}
                          className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-white/[0.04] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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
        title="Upload Legal Contract"
      >
        <div className="space-y-6">
          <div className="border border-dashed border-white/20 hover:border-white/40 rounded-3xl p-10 text-center bg-white/[0.02]">
            <UploadCloud className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-white">Select a contract file to audit</h4>
            <p className="text-xs text-slate-400 mt-1">Supports PDF (with OCR), DOCX, and TXT (up to 25MB)</p>

            <label className="mt-6 cursor-pointer px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold inline-block">
              <span>Choose File</span>
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                disabled={uploading}
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </label>
          </div>

          {uploading && (
            <div className="text-center text-xs text-slate-400">
              Processing document with AI neural engine...
            </div>
          )}
        </div>
      </Modal>

    </div>
  );
};

export default DocumentLibraryPage;
