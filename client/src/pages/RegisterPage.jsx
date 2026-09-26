import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, User, Building, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    plan: 'free'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    const res = await register(formData);
    setLoading(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setError(res.message);
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
          <h2 className="text-2xl font-extrabold text-white font-heading tracking-tight">Create an Account</h2>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Start auditing legal agreements with autonomous intelligence
          </p>
        </div>

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
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Sarah Jenkins, Esq."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amberAccent-500/50 focus:ring-1 focus:ring-amberAccent-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="counsel@firm.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amberAccent-500/50 focus:ring-1 focus:ring-amberAccent-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Company / Law Firm (Optional)
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Legal Group"
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-amberAccent-500/50 focus:ring-1 focus:ring-amberAccent-500/30"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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
                  <span>Launch Free Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-amberAccent-400 hover:text-amberAccent-300 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
