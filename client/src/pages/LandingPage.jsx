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
  FileText,
  Compass
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - card.left) / card.width - 0.5) * 14;
    const y = ((e.clientY - card.top) / card.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex flex-col items-center justify-center bg-[#030508] text-slate-100 overflow-hidden font-sans py-12 md:py-20">
      
      {/* Moonsworth Atmospheric Lunar Eclipse Arc */}
      <div className="lunar-eclipse-arc" />
      <div className="lunar-horizon-ring" />

      {/* 3D Perspective Cosmic Grid */}
      <div className="cosmic-grid" />

      {/* Floating Ambient Glowing Nebulae */}
      <div className="floating-orb absolute top-8 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 blur-[160px] pointer-events-none rounded-full" />
      <div className="floating-orb-delayed absolute top-1/4 right-1/4 w-[480px] h-[450px] bg-amberAccent-500/10 blur-[170px] pointer-events-none rounded-full" />

      {/* Main Moonsworth-Style Hero Frame with 4-Corner Reticles */}
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Outer Geometric Frame with Crosshair Reticles */}
        <div className="relative p-6 sm:p-10 rounded-3xl border border-white/10 bg-obsidian-950/40 backdrop-blur-md shadow-2xl">
          
          {/* 4 Corner Crosshair Reticles (Moonsworth Style) */}
          <div className="reticle-corner top-2 left-2 text-white/40">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8.5 0H9.5V18H8.5V0Z" fill="currentColor" />
              <path d="M18 8.5V9.5L0 9.5L0 8.5L18 8.5Z" fill="currentColor" />
            </svg>
          </div>
          <div className="reticle-corner top-2 right-2 text-white/40">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8.5 0H9.5V18H8.5V0Z" fill="currentColor" />
              <path d="M18 8.5V9.5L0 9.5L0 8.5L18 8.5Z" fill="currentColor" />
            </svg>
          </div>
          <div className="reticle-corner bottom-2 left-2 text-white/40">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8.5 0H9.5V18H8.5V0Z" fill="currentColor" />
              <path d="M18 8.5V9.5L0 9.5L0 8.5L18 8.5Z" fill="currentColor" />
            </svg>
          </div>
          <div className="reticle-corner bottom-2 right-2 text-white/40">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M8.5 0H9.5V18H8.5V0Z" fill="currentColor" />
              <path d="M18 8.5V9.5L0 9.5L0 8.5L18 8.5Z" fill="currentColor" />
            </svg>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amberAccent-500/30 bg-amberAccent-500/10 text-amberAccent-400 text-[11px] font-mono uppercase tracking-[0.2em] mb-6 shadow-glow-amber">
            <span className="w-1.5 h-1.5 rounded-full bg-amberAccent-400 animate-pulse" />
            <span>Neural Legal Intelligence Studio</span>
          </div>

          {/* Moonsworth Bold Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-none font-heading">
            Review Contracts in Seconds.{' '}
            <span className="block mt-2 title-laser-flare gradient-text-amber font-display">
              Spot Hidden Risks.
            </span>
          </h1>

          {/* Moonsworth Monospace Subtitle */}
          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-mono">
            Translate legalese into plain English, audit liabilities, compare revisions, and ask questions with clause citations.
          </p>

          {/* Moonsworth Crisp CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/register"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amberAccent-500 hover:bg-amberAccent-400 text-obsidian-950 font-bold text-xs shadow-glow-amber flex items-center justify-center gap-2 transition-all hover:scale-105 font-mono uppercase tracking-wider"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => {
                loginAsDemo('user');
                navigate('/dashboard');
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white text-xs font-semibold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-amberAccent-400" />
              <span>Instant Demo</span>
            </button>
          </div>
        </div>

        {/* 3D HUD Telemetry Showcase Preview Card */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className="mt-8 max-w-2xl mx-auto glow-laser-card hud-scanline p-5 sm:p-6 text-left rounded-2xl border border-white/15 shadow-2xl relative overflow-hidden group cursor-pointer"
          onClick={() => {
            loginAsDemo('user');
            navigate('/dashboard');
          }}
        >
          {/* Cyber Corner HUD Brackets */}
          <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400/80 uppercase tracking-widest pb-3 border-b border-white/10">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>[AI_PIPELINE: ACTIVE]</span>
            </span>
            <span className="text-amberAccent-400/80">[MODEL: NEURAL_LEGAL_V2]</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amberAccent-500/10 border border-amberAccent-500/30 flex items-center justify-center text-amberAccent-400">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">Standard SaaS Master Agreement</span>
                <span className="text-[10px] text-slate-400 font-mono">24-Month Cloud Term</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40">
              HIGH RISK (78/100)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
            <div className="p-2.5 rounded-lg bg-obsidian-950/90 border border-white/10">
              <span className="text-[10px] font-mono text-slate-400 block mb-0.5">Detected Penalty:</span>
              <p className="text-slate-200 text-[11px] font-mono">
                "100% early termination damages penalty."
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-amberAccent-500/10 border border-amberAccent-500/30">
              <span className="text-[10px] font-mono text-amberAccent-400 block mb-0.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Plain English:
              </span>
              <p className="text-slate-200 text-[11px] font-medium">
                Cancelling early requires full payment of remaining term.
              </p>
            </div>
          </div>

          {/* Prompt banner */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-cyan-400">
              <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '8s' }} /> Click to explore live in interactive dashboard
            </span>
            <span className="text-amberAccent-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              Launch <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Minimal Feature Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Instant Analysis</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 1-Click Samples</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> Private & Secure</span>
          <span className="tech-pill"><Check className="w-3 h-3 text-emerald-400" /> 100% Free</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
