import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, User, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loginAsDemo, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const expired = searchParams.get('expired');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    const res = await loginAsDemo(role);
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const res = await googleLogin(
      'user@legalease.ai',
      'Demo User',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    );
    setLoading(false);
    if (res.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Scale className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white font-heading">
              LegalEase <span className="gradient-text font-black">AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-bold text-white font-heading">Sign In</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Access your legal document workspace
          </p>
        </div>

        {expired && (
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs text-center font-medium">
            Your session expired. Please sign in again.
          </div>
        )}

        {/* 1-Click Demo Logins */}
        <div className="mb-5 p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-center">
          <div className="flex items-center justify-center gap-1 text-xs font-bold text-brand-400 mb-1">
            <Zap className="w-3.5 h-3.5 fill-brand-400" />
            <span>1-Click Instant Demo Login</span>
          </div>
          <p className="text-[11px] text-slate-400 mb-2.5">
            Select a role to test the platform immediately:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleDemoLogin('user')}
              disabled={loading}
              className="py-1.5 px-2 rounded-lg bg-obsidian-900 text-xs font-semibold text-slate-200 border border-slate-700/80 hover:border-brand-500 transition-all"
            >
              Standard
            </button>
            <button
              onClick={() => handleDemoLogin('premium')}
              disabled={loading}
              className="py-1.5 px-2 rounded-lg bg-amber-500/10 text-xs font-semibold text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-all"
            >
              Pro User
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              disabled={loading}
              className="py-1.5 px-2 rounded-lg bg-purple-500/10 text-xs font-semibold text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-all"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Form Card */}
        <div className="glass-panel rounded-2xl p-6 border border-slate-800 shadow-xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-obsidian-950 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-brand-400 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-700 bg-obsidian-950 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs sm:text-sm shadow-glow transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-brand-400 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
