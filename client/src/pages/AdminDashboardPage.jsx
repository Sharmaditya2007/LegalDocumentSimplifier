import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  FileText,
  Activity,
  UserCheck,
  UserX,
  Sparkles,
  Server,
  Zap,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import StatCard from '../components/common/StatCard';
import RiskBadge from '../components/common/RiskBadge';
import { CardSkeleton } from '../components/common/SkeletonLoader';

const AdminDashboardPage = () => {
  const { user, isAdmin } = useAuth();
  const { addToast } = useNotification();

  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users'); // 'users' | 'documents' | 'system'

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
      console.error('Admin data fetch error:', err);
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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-white font-heading">Unauthorized Access</h2>
        <p className="text-sm text-slate-400 mt-2">
          Administrator privileges are required to view this console. Switch your role using the profile menu.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-400 font-mono">
          <ShieldCheck className="w-4 h-4" />
          <span>Enterprise Staff Control Plane</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading mt-0.5">
          Admin Intelligence Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Monitor platform user quotas, manage subscription tiers, audit processed contracts, and check AI engine health.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Registered Users"
          value={analytics?.totalUsers || users.length}
          change="+18% MoM"
          icon={Users}
          color="brand"
          subtitle="Enterprise & standard accounts"
        />
        <StatCard
          title="Monitored Contracts"
          value={analytics?.totalDocuments || documents.length}
          change="+32 this week"
          icon={FileText}
          color="indigo"
          subtitle="Processed through AI pipeline"
        />
        <StatCard
          title="Active Paid Tiers"
          value={analytics?.activeSubscribers || 2}
          change="Pro & Enterprise"
          icon={TrendingUp}
          color="emerald"
          subtitle="High conversion retention"
        />
        <StatCard
          title="AI API Calls Today"
          value={analytics?.apiCallsToday || 342}
          change="Optimal Latency"
          icon={Activity}
          color="amber"
          subtitle="Avg turnaround: 1.8s"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 space-x-2">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'users'
              ? 'border-purple-500 text-purple-300 bg-purple-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Management ({users.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'documents'
              ? 'border-purple-500 text-purple-300 bg-purple-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Platform Document Audit ({documents.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'system'
              ? 'border-purple-500 text-purple-300 bg-purple-500/10 rounded-t-xl'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Engine Status & Infrastructure</span>
        </button>
      </div>

      {/* TAB 1: USERS MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Role</th>
                  <th className="px-6 py-3.5">Subscription Tier</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-obsidian-850/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                          alt={u.name}
                          className="w-8 h-8 rounded-lg object-cover border border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-white">{u.name}</p>
                          <p className="text-[11px] text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateUser(u._id, { role: e.target.value })}
                        className="px-2.5 py-1 rounded-lg border border-slate-700 bg-obsidian-900 text-white text-xs font-semibold uppercase"
                      >
                        <option value="user">User</option>
                        <option value="premium">Premium Lawyer</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.subscription}
                        onChange={(e) => handleUpdateUser(u._id, { subscription: e.target.value })}
                        className="px-2.5 py-1 rounded-lg border border-slate-700 bg-obsidian-900 text-white text-xs font-semibold capitalize"
                      >
                        <option value="free">Free Starter</option>
                        <option value="pro">Pro ($29/mo)</option>
                        <option value="enterprise">Enterprise ($99/mo)</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.status === 'blocked'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}
                      >
                        {u.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {u.status === 'blocked' ? (
                        <button
                          onClick={() => handleUpdateUser(u._id, { status: 'active' })}
                          className="px-3 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-semibold transition-colors"
                        >
                          Unblock User
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateUser(u._id, { status: 'blocked' })}
                          className="px-3 py-1 rounded-lg bg-rose-500/15 text-rose-300 hover:bg-rose-500/25 border border-rose-500/30 text-xs font-semibold transition-colors"
                        >
                          Block Access
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENTS AUDIT */}
      {activeTab === 'documents' && (
        <div className="glass-panel rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-obsidian-950/80 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">Contract Title</th>
                  <th className="px-6 py-3.5">User Owner ID</th>
                  <th className="px-6 py-3.5">Risk Rating</th>
                  <th className="px-6 py-3.5">Processed Timestamp</th>
                  <th className="px-6 py-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {documents.map((d) => (
                  <tr key={d._id} className="hover:bg-obsidian-850/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-white">
                      {d.title}
                    </td>
                    <td className="px-6 py-4 font-mono text-[11px] text-slate-400">
                      {d.userId}
                    </td>
                    <td className="px-6 py-4">
                      <RiskBadge level={d.riskLevel} score={d.overallRiskScore} />
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(d.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                        Audited
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SYSTEM STATUS */}
      {activeTab === 'system' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>AI Processing Engine Pipeline</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Primary Classifier:</span>
                <span className="font-semibold text-white">
                  {analytics?.processingEngine || 'Dual Hybrid LLM (Legal)'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Average Turnaround:</span>
                <span className="font-semibold text-emerald-400">{analytics?.averageTurnaroundSeconds || 1.8}s</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Platform Uptime:</span>
                <span className="font-semibold text-emerald-400">{analytics?.uptimePercentage || 99.98}%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">OCR Layer:</span>
                <span className="font-semibold text-white">Active (Multi-format PDF/DOCX)</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-heading">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Security & Compliance Standard</span>
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Data Encryption:</span>
                <span className="font-semibold text-white">AES-256 / TLS 1.3</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Rate Limiter:</span>
                <span className="font-semibold text-emerald-400">Enabled (300 req / 15m)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-400">Data Retention:</span>
                <span className="font-semibold text-white">Zero Retention on Foundation AI</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-400">RBAC Enforcement:</span>
                <span className="font-semibold text-emerald-400">Strict JWT Middleware</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
