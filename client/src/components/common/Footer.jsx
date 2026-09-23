import React from 'react';
import { Scale, ShieldCheck, Lock, Award, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-navy-950/50 backdrop-blur-md pt-14 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center text-white shadow-glow">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                LegalEase <span className="gradient-text font-black">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Enterprise legal document intelligence. Translate complex contracts into plain English, catch predatory clauses before signing, and compare revisions in seconds.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-medium">
                <Lock className="w-4 h-4" /> 256-Bit TLS Encryption
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/dashboard" className="hover:text-brand-500 transition-colors">Executive Dashboard</Link></li>
              <li><Link to="/documents" className="hover:text-brand-500 transition-colors">Document Library</Link></li>
              <li><Link to="/compare" className="hover:text-brand-500 transition-colors">Contract Comparison</Link></li>
              <li><Link to="/chat" className="hover:text-brand-500 transition-colors">Conversational Copilot</Link></li>
              <li><Link to="/timeline" className="hover:text-brand-500 transition-colors">Deadline Sentinel</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">In-House Legal Teams</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Startup Founders</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Procurement & Sales</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Law Firms & Solos</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Real Estate Investors</span></li>
            </ul>
          </div>

          {/* Legal & Security */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Security & Trust
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Zero Data Retention Option</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">GDPR / CCPA Compliance</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Attorney-Client Privilege</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-brand-500 transition-colors cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <p>© 2026 LegalEase AI Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with modern legal intelligence for lawyers & founders.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
