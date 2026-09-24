import React from 'react';
import { Scale, ShieldCheck, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-obsidian-950 text-slate-400 font-sans pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-white font-heading">
                LegalEase <span className="gradient-text font-black">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              AI-powered contract intelligence. Translate legalese into plain English, audit liabilities, and compare document revisions.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Encryption
              </span>
              <span className="flex items-center gap-1 text-brand-400">
                <Lock className="w-3.5 h-3.5" /> Zero Model Training
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-heading">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/dashboard" className="hover:text-brand-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/documents" className="hover:text-brand-400 transition-colors">Document Library</Link></li>
              <li><Link to="/compare" className="hover:text-brand-400 transition-colors">Contract Comparison</Link></li>
              <li><Link to="/chat" className="hover:text-brand-400 transition-colors">Citation Copilot</Link></li>
              <li><Link to="/timeline" className="hover:text-brand-400 transition-colors">Deadlines Timeline</Link></li>
            </ul>
          </div>

          {/* Account / Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-heading">
              Account & Help
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/login" className="hover:text-brand-400 transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-brand-400 transition-colors">Create Free Account</Link></li>
              <li><Link to="/forgot-password" className="hover:text-brand-400 transition-colors">Reset Password</Link></li>
              <li><Link to="/admin" className="hover:text-brand-400 transition-colors">Admin Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© 2026 LegalEase AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational • AI Engine Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
