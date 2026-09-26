import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Scale, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, loginAsDemo } = useAuth();
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

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12 relative font-sans">
      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <Scale className="w-4.5 h-4.5" />
            </div>
            <span className="font-semibold text-base tracking-tight text-white">
              LegalEase <span className="text-slate-400 font-normal">AI</span>
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-white tracking-tight">Sign In</h2>
          <p className="text-sm text-slate-400 mt-1 font-normal">
            Access your encrypted legal intelligence workspace
          </p>
        </div>

        {expired && (
          <div className="mb-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs text-center font-medium">
            Your session expired. Please sign in again.
          </div>
        )}

        {/* Form Card */}
        <div className="glass-luxury rounded-3xl p-8">
          {error && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsel@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full btn-luxury-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Evaluation Demo Sessions */}
          <div className="mt-8 pt-6 border-t border-white/[0.06]">
            <p className="text-xs font-medium text-slate-400 text-center mb-3">
              Instant 1-Click Demo Access
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                disabled={loading}
                className="px-2.5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] text-xs font-medium text-slate-300 hover:text-white transition-all flex flex-col items-center gap-1.5"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>Demo User</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('premium')}
                disabled={loading}
                className="px-2.5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] text-xs font-medium text-slate-300 hover:text-white transition-all flex flex-col items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Legal Pro</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="px-2.5 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] text-xs font-medium text-slate-300 hover:text-white transition-all flex flex-col items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                <span>Admin Staff</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-white hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
