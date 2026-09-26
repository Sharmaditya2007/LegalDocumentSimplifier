import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  FileText,
  Activity,
  AlertTriangle,
  Radio,
  Server
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/common/StatCard';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';

const AdminDashboardPage = () => {
  const { isAdmin } = useAuth();
  const { addToast } = useNotification();

  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');

  const fetchData = async () => {
    try {
      const [uRes, dRes, aRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/documents'),
        api.get('/admin/analytics')
      ]);

      if (uRes.data.success) setUsers(uRes.data.users || []);
      if (dRes.data.success) setDocuments(dRes.data.documents || []);
      if (aRes.data.success) setAnalytics(aRes.data.analytics || null);
    } catch (err) {
      addToast({ title: 'Access Error', message: 'Failed to load admin data.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateUser = async (userId, updates) => {
    try {
      const res = await api.patch(`/admin/users/${userId}`, updates);
      if (res.data.success) {
        addToast({ title: 'Success', message: 'User updated successfully.', type: 'success' });
        setUsers(prev => prev.map(u => u._id === userId ? { ...u, ...updates } : u));
      }
    } catch (err) {
      addToast({ title: 'Error', message: 'Failed to update user.', type: 'error' });
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center font-sans">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-rose-400 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-white">Unauthorized Access</h2>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto font-normal">
          Administrator privileges are required to view this console. Switch your role using the profile menu or demo login.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 space-y-10 font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Admin Console
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-normal">
          Monitor platform user quotas, manage subscription tiers, audit processed contracts, and check AI engine health.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={analytics?.totalUsers || users.length}
          change="+12% this week"
          icon={Users}
          subtitle="Registered accounts"
        />
        <StatCard
          title="Audited Contracts"
          value={analytics?.totalDocuments || documents.length}
          change="+24 processed"
          icon={FileText}
          subtitle="Total files ingested"
        />
        <StatCard
          title="System Throughput"
          value="99.9%"
          change="Optimal"
          icon={Activity}
          subtitle="Server uptime"
        />
        <StatCard
          title="Neural AI Engine"
          value="Online"
          change="Latency 1.2s"
          icon={Radio}
          subtitle="Gemini LLM inference"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-white/[0.06] space-x-2">
        {[
          { id: 'users', label: `Users (${users.length})`, icon: Users },
          { id: 'documents', label: `Documents (${documents.length})`, icon: FileText },
          { id: 'system', label: 'System Health', icon: Server }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3 px-5 text-xs font-medium border-b-2 transition-all rounded-t-xl ${
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

      {/* TAB 1: USERS */}
      {activeTab === 'users' && (
        <div className="glass-luxury rounded-3xl border border-white/[0.08] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-white/[0.06]">
            <h3 className="text-base font-semibold text-white">Registered Users & Role Management</h3>
            <p className="text-xs text-slate-400 mt-0.5">Control administrative rights and active user accounts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center font-semibold text-white text-xs">
                          {u.name?.[0] || 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{u.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                        u.role === 'admin' ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-white/[0.03] text-slate-300 border-white/[0.06]'
                      }`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                        u.isActive !== false ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {u.isActive !== false ? 'Active' : 'Suspended'}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-slate-500">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4.5 text-right">
                      <button
                        onClick={() => handleUpdateUser(u._id, { role: u.role === 'admin' ? 'user' : 'admin' })}
                        className="px-3.5 py-1.5 rounded-full btn-luxury-secondary text-xs font-medium"
                      >
                        {u.role === 'admin' ? 'Revoke Admin' : 'Make Admin'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="glass-luxury rounded-3xl border border-white/[0.08] overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-white/[0.06]">
            <h3 className="text-base font-semibold text-white">System Document Repository</h3>
            <p className="text-xs text-slate-400 mt-0.5">All analyzed agreements uploaded across all accounts</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] text-slate-400 uppercase text-[10px] font-medium tracking-wider border-b border-white/[0.06]">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Risk Rating</th>
                  <th className="px-6 py-4">Uploaded By</th>
                  <th className="px-6 py-4">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {documents.map((doc) => (
                  <tr key={doc._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-6 py-4.5">
                      <p className="font-semibold text-white">{doc.title}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{doc.fileName}</p>
                    </td>
                    <td className="px-6 py-4.5">
                      <RiskBadge level={doc.riskLevel} score={doc.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4.5 text-slate-300">
                      {doc.user?.name || 'User'}
                    </td>
                    <td className="px-6 py-4.5 text-slate-500">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-luxury rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-white">Engine Specifications</h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-slate-500">AI Core:</span>
                <span className="font-medium text-white">Gemini 2.5 Flash Native</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-slate-500">Database Engine:</span>
                <span className="font-medium text-white">MongoDB Atlas Cluster</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/[0.06]">
                <span className="text-slate-500">OCR Pipeline:</span>
                <span className="font-medium text-white">pdf-parse / Tesseract Dual Engine</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Encryption Standard:</span>
                <span className="font-medium text-white">AES-256 GCM</span>
              </div>
            </div>
          </div>

          <div className="glass-luxury rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="text-base font-semibold text-white">Operational Status</h3>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <div>
                <p className="font-semibold text-white">All microservices operational</p>
                <p className="text-slate-500">Zero active alerts</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
