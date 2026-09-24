import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Check,
  Radio,
  Scale,
  Sparkles,
  ShieldAlert,
  GitCompare,
  FileText,
  Activity,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - card.left) / card.width - 0.5) * 16;
    const y = ((e.clientY - card.top) / card.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center bg-[#030508] text-slate-100 overflow-hidden font-sans py-12 md:py-20">
      {/* 3D Perspective Cosmic Grid */}
      <div className="cosmic-grid" />

      {/* Floating Ambient Glowing Orbs */}
      <div className="floating-orb absolute top-10 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="floating-orb-delayed absolute top-1/4 right-1/4 w-[500px] h-[450px] bg-amberAccent-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/3 w-[420px] h-[350px] bg-purple-600/10 blur-[170px] pointer-events-none rounded-full" />

      {/* Hero Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amberAccent-500/30 bg-amberAccent-500/10 text-amberAccent-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-glow-amber">
          <Radio className="w-3.5 h-3.5 animate-pulse text-amberAccent-400" />
          <span>Neural Legal Intelligence • Space Edition</span>
        </div>

        {/* Headline with Retro Sci-Fi Laser Flare */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight font-heading">
          Review Contracts in Seconds.{' '}
          <span className="block mt-2 title-laser-flare gradient-text-amber font-display">
            Spot Hidden Risks.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          Translate legalese into plain English, audit liabilities, compare contract revisions, and ask questions with clause citations.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amberAccent-500 hover:bg-amberAccent-400 text-obsidian-950 font-bold text-xs shadow-glow-amber flex items-center justify-center gap-2 transition-all hover:scale-105 font-heading tracking-wide"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <button
            onClick={() => {
              loginAsDemo('user');
              navigate('/dashboard');
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/15 bg-obsidian-900/90 hover:bg-obsidian-800 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 font-heading shadow-glass"
          >
            <Zap className="w-4 h-4 text-amberAccent-400" />
            <span>Instant Demo</span>
          </button>
        </div>

        {/* Interactive 3D HUD Telemetry Showcase Preview Card */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="mt-12 max-w-2xl mx-auto glow-laser-card hud-scanline p-6 sm:p-7 text-left rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden group cursor-pointer"
          onClick={() => {
            loginAsDemo('user');
            navigate('/dashboard');
          }}
        >
          {/* Cyber Corner HUD Brackets */}
          <div className="absolute top-3 left-3 text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>[AI_PIPELINE: ACTIVE]</span>
          </div>
          <div className="absolute top-3 right-3 text-[9px] font-mono text-amberAccent-400/80 uppercase tracking-widest">
            <span>[MODEL: NEURAL_LEGAL_V2]</span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amberAccent-500/10 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-400">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Standard SaaS Master Agreement</span>
                <span className="text-[10px] text-slate-400 font-mono">24-Month Cloud Term • 3 Risk Flags</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
              HIGH RISK (78/100)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-xs">
            <div className="p-3 rounded-xl bg-obsidian-950/90 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 block mb-1">Detected Unfair Term:</span>
              <p className="text-slate-200 text-[11px] font-mono leading-relaxed">
                "100% early termination liquidated damages penalty."
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amberAccent-500/10 border border-amberAccent-500/30">
              <span className="text-[10px] font-mono text-amberAccent-400 block mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Plain English Translation:
              </span>
              <p className="text-slate-200 text-[11px] font-medium leading-relaxed">
                Cancelling early requires paying for all remaining months immediately.
              </p>
            </div>
          </div>

          {/* Prompt banner */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400 font-mono text-[10px]">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} /> Click to explore live in interactive dashboard
            </span>
            <span className="text-amberAccent-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Launch <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Instant Analysis</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 1-Click Samples</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Private & Secure</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Free Open Access</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
