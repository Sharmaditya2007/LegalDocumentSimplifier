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

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative font-sans page-fade-in">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amberAccent-500/10 via-cyan-500/5 to-purple-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-9 h-9 rounded-xl bg-obsidian-900 border border-amberAccent-500/40 flex items-center justify-center text-amberAccent-500 shadow-[0_0_20px_rgba(235,184,126,0.25)] group-hover:scale-105 transition-transform">
              <Scale className="w-4.5 h-4.5" />
            </div>
            <span className="font-extrabold text-base tracking-wider uppercase text-white font-heading">
              LEGALEASE <span className="text-amberAccent-500 font-black">AI</span>
            </span>
          </Link>
          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight">Sign In to Universe</h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Access your encrypted legal intelligence workspace
          </p>
        </div>

        {expired && (
          <div className="mb-4 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-center font-medium font-sans">
            Your session expired. Please sign in again.
          </div>
        )}

        {/* Form Card */}
        <div className="glass-panel rounded-3xl p-7 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {error && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="counsel@company.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amberAccent-500/50 focus:ring-1 focus:ring-amberAccent-500/30"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-medium text-amberAccent-400 hover:text-amberAccent-300"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amberAccent-500/50 focus:ring-1 focus:ring-amberAccent-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl btn-glow-gold text-obsidian-950 font-bold text-xs sm:text-sm shadow-glow-amber transition-all flex items-center justify-center gap-2 mt-3 font-sans hover:scale-[1.02]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-obsidian-950/30 border-t-obsidian-950 rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Evaluation Demo Sessions */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider text-center mb-3">
              ⚡ Instant 1-Click Evaluation Login
            </p>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                disabled={loading}
                className="px-2.5 py-2.5 rounded-2xl bg-obsidian-950 border border-white/10 hover:border-amberAccent-500/40 text-[11px] font-semibold text-slate-300 hover:text-white transition-all flex flex-col items-center gap-1 shadow-sm hover:scale-105"
              >
                <User className="w-4 h-4 text-amberAccent-400" />
                <span>Demo User</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('premium')}
                disabled={loading}
                className="px-2.5 py-2.5 rounded-2xl bg-obsidian-950 border border-white/10 hover:border-purple-500/40 text-[11px] font-semibold text-slate-300 hover:text-white transition-all flex flex-col items-center gap-1 shadow-sm hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Legal Pro</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="px-2.5 py-2.5 rounded-2xl bg-obsidian-950 border border-white/10 hover:border-cyan-500/40 text-[11px] font-semibold text-slate-300 hover:text-white transition-all flex flex-col items-center gap-1 shadow-sm hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Admin Staff</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400 font-sans">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-amberAccent-400 hover:text-amberAccent-300 hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
