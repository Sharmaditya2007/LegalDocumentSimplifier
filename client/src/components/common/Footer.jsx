import React from 'react';
import { Scale, ShieldCheck, Lock, Radio } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#030508] text-slate-400 font-sans pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-obsidian-900 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-500 shadow-glow-amber">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-bold text-base tracking-widest uppercase text-white font-display">
                LEGALEASE <span className="text-amberAccent-500 font-black">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Neural legal intelligence for contract auditing, risk detection, draft version diffing, and citation-backed legal analysis.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono">
                <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Private
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono">
                <Radio className="w-3.5 h-3.5" /> Neural Engine Online
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-3">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/dashboard" className="hover:text-amberAccent-400 transition-colors">Universe Overview</Link></li>
              <li><Link to="/documents" className="hover:text-amberAccent-400 transition-colors">Contract Library</Link></li>
              <li><Link to="/compare" className="hover:text-amberAccent-400 transition-colors">Diff Engine</Link></li>
              <li><Link to="/chat" className="hover:text-amberAccent-400 transition-colors">Citation Copilot</Link></li>
              <li><Link to="/timeline" className="hover:text-amberAccent-400 transition-colors">Deadline Sentinel</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-3">
              Access & Admin
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/login" className="hover:text-amberAccent-400 transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-amberAccent-400 transition-colors">Launch Free Account</Link></li>
              <li><Link to="/admin" className="hover:text-amberAccent-400 transition-colors">Staff Console</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LegalEase AI. 100% Free & Open Access Platform.</p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-amberAccent-500/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Normal • Space Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
