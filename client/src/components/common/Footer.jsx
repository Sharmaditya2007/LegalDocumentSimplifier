import React from 'react';
import { Scale, ShieldCheck, Lock, ArrowUpRight, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-obsidian-950 text-slate-400 font-sans pt-14 pb-8 transition-colors relative overflow-hidden">
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-brand-500/5 blur-[80px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-glow">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                LegalEase <span className="gradient-text font-black">AI</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Autonomous legal intelligence infrastructure. Decode complex contracts into plain English, audit liabilities before signing, and diff version revisions in seconds.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5 text-brand-400 font-medium">
                <Lock className="w-4 h-4" /> 256-Bit TLS Encryption
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-heading">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/dashboard" className="hover:text-brand-400 transition-colors">Executive Dashboard</Link></li>
              <li><Link to="/documents" className="hover:text-brand-400 transition-colors">Document Vault</Link></li>
              <li><Link to="/compare" className="hover:text-brand-400 transition-colors">Semantic Diff Engine</Link></li>
              <li><Link to="/chat" className="hover:text-brand-400 transition-colors">Citation Copilot</Link></li>
              <li><Link to="/timeline" className="hover:text-brand-400 transition-colors">Deadline Sentinel</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-heading">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-brand-400 transition-colors cursor-pointer">In-House Legal Teams</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Startup Founders & VC</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Procurement & Sales</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Commercial Real Estate</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">M&A Due Diligence</li>
            </ul>
          </div>

          {/* Security & System */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-heading">
              Security & Trust
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Zero Data Retention SLA</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">GDPR / CCPA Standards</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Attorney-Client Privilege</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-brand-400 transition-colors cursor-pointer">Privacy Framework</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 LegalEase AI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Operational • LLM Inference Latency 84ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
