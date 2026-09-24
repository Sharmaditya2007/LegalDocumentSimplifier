import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Zap,
  Check,
  Radio,
  Scale,
  Sparkles,
  ShieldAlert,
  GitCompare
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { loginAsDemo } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-center bg-[#030508] text-slate-100 overflow-hidden font-sans py-16">
      {/* 3D Perspective Cosmic Grid & Starfield */}
      <div className="cosmic-grid" />
      <div className="starfield-canvas" />

      {/* Floating Ambient Glowing Orbs */}
      <div className="floating-orb absolute top-12 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="floating-orb-delayed absolute top-1/4 right-1/4 w-[450px] h-[350px] bg-amberAccent-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[300px] bg-purple-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Hero Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amberAccent-500/30 bg-amberAccent-500/10 text-amberAccent-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-glow-amber">
          <Radio className="w-3.5 h-3.5 animate-pulse text-amberAccent-400" />
          <span>Neural Legal Intelligence</span>
        </div>

        {/* Headline */}
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
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-white/15 bg-obsidian-900/90 hover:bg-obsidian-800 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2 font-heading"
          >
            <Zap className="w-4 h-4 text-amberAccent-400" />
            <span>Instant Demo</span>
          </button>
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
