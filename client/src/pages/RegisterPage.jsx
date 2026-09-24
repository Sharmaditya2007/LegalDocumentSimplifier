import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, Lock, Mail, User, Building, ArrowRight } from 'lucide-react';
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <div className="w-8 h-8 rounded-lg bg-obsidian-900 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-500 shadow-glow-amber group-hover:scale-105 transition-transform">
              <Scale className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm tracking-widest uppercase text-white font-sans">
              LEGALEASE <span className="text-[#EBB87E] font-extrabold">AI</span>
            </span>
          </Link>
          <h2 className="text-xl font-semibold text-white font-sans">Create an Account</h2>
          <p className="text-xs text-slate-400 mt-0.5 font-sans">
            Start auditing contracts with plain-English AI
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10 shadow-xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs font-medium font-sans">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-sans">
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
                  placeholder="Your Name"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-sans">
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
                  placeholder="you@company.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-sans">
                Company / Organization (Optional)
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company or law firm"
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 font-sans">
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
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-white/10 bg-obsidian-950 text-white placeholder-slate-500 text-xs sm:text-sm font-sans focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-[#E85D36] hover:bg-[#ff6e47] text-white font-medium text-xs sm:text-sm shadow-glow transition-all flex items-center justify-center gap-2 mt-2 font-sans"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-xs text-slate-400 font-sans">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
