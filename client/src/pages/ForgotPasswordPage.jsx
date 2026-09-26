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
          <h2 className="text-3xl font-bold text-white tracking-tight">Account Recovery</h2>
          <p className="text-sm text-slate-400 mt-1 font-normal">
            We will send you an encrypted link to reset your password
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-luxury rounded-3xl p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-white">Check your inbox</h3>
              <p className="text-xs text-slate-300 mt-2 max-w-xs mx-auto leading-relaxed">
                If an account exists for <span className="font-semibold text-white">{email}</span>, password reset instructions have been dispatched.
              </p>
              <Link
                to="/login"
                className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-full btn-luxury-primary text-xs font-semibold"
              >
                Return to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="counsel@firm.com"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03] text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-full btn-luxury-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 mt-4"
              >
                {loading ? 'Sending link...' : 'Send Password Reset Link'}
              </button>

              <div className="text-center pt-3">
                <Link to="/login" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1">
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
