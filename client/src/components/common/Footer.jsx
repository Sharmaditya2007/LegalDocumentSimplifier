import React from 'react';
import { Scale, ShieldCheck, Lock, Radio, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#030508]/90 text-slate-400 font-sans pt-16 pb-10 relative overflow-hidden">
      {/* Ambient background mesh halo */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-gradient-to-t from-indigo-500/10 via-purple-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-obsidian-900 border border-amberAccent-500/40 flex items-center justify-center text-amberAccent-500 shadow-[0_0_15px_rgba(235,184,126,0.25)] group-hover:scale-105 transition-transform">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-wider uppercase text-white font-heading">
                LEGALEASE <span className="text-amberAccent-500 font-black">AI</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
              Autonomous legal intelligence for contract auditing, risk detection, redline revision comparison, and plain-English legal translation.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Private
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400 text-[11px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <Radio className="w-3.5 h-3.5" /> Neural Engine Active
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-3.5 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amberAccent-400" />
              Core Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li><Link to="/dashboard" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Universe Dashboard</Link></li>
              <li><Link to="/documents" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Contract Vault</Link></li>
              <li><Link to="/compare" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Diff Engine</Link></li>
              <li><Link to="/chat" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Citation Copilot</Link></li>
              <li><Link to="/timeline" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Deadline Sentinel</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-300 mb-3.5 flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-purple-400" />
              Access & Auth
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
              <li><Link to="/login" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Launch Free Account</Link></li>
              <li><Link to="/forgot-password" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Account Recovery</Link></li>
              <li><Link to="/admin" className="hover:text-amberAccent-400 hover:translate-x-1 transition-all inline-block">Staff Console</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-sans">
          <p>© {new Date().getFullYear()} LegalEase AI Studio. Enterprise-grade open access platform.</p>
          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
