import React from 'react';
import { Scale, ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030305] text-slate-400 font-sans pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-semibold text-base tracking-tight text-white">
                LegalEase <span className="text-slate-400 font-normal">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              Autonomous legal intelligence for contract auditing, risk detection, revision comparison, and plain-English translation.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1.5 text-slate-300 text-xs px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> End-to-End Privacy
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Platform
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link to="/documents" className="hover:text-white transition-colors">Contract Library</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Diff Engine</Link></li>
              <li><Link to="/chat" className="hover:text-white transition-colors">AI Copilot</Link></li>
              <li><Link to="/timeline" className="hover:text-white transition-colors">Timeline</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Access
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link to="/forgot-password" className="hover:text-white transition-colors">Password Reset</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Staff Console</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LegalEase AI. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
