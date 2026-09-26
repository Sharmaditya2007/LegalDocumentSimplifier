import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import api from '../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setSubmitted(true);
    } catch (err) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative font-sans page-fade-in">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-amberAccent-500/10 via-purple-600/5 to-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />

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
          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight">Account Recovery</h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            We will send you an encrypted token to reset your password
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-panel rounded-3xl p-7 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Check your inbox</h3>
              <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed font-sans">
                If an account exists for <span className="font-semibold text-amberAccent-400">{email}</span>, password reset instructions have been dispatched.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-xl btn-glow-gold text-obsidian-950 text-xs font-bold shadow-glow-amber transition-all hover:scale-105"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="counsel@firm.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amberAccent-500/50 focus:ring-1 focus:ring-amberAccent-500/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-2xl btn-glow-gold text-obsidian-950 font-bold text-xs sm:text-sm shadow-glow-amber transition-all flex items-center justify-center gap-2 mt-3 font-sans hover:scale-[1.02]"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>

              <div className="text-center pt-3">
                <Link to="/login" className="text-xs text-slate-400 hover:text-amberAccent-400 inline-flex items-center gap-1 font-mono">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to login</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
